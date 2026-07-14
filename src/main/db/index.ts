import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'

let db: DatabaseSync | null = null

export function uid(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`
}

export function now(): string {
  return new Date().toISOString()
}

export function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex')
}

const MIGRATIONS: string[] = [
  // v1 — initial schema (08_DATA_MODEL.md)
  `
  CREATE TABLE settings (
    key TEXT PRIMARY KEY,
    value_json TEXT NOT NULL
  );

  CREATE TABLE games (
    id TEXT PRIMARY KEY,
    source_platform TEXT,
    source_game_id TEXT,
    source_game_url TEXT,
    raw_pgn TEXT NOT NULL,
    normalized_pgn TEXT,
    pgn_hash TEXT NOT NULL,
    white_name TEXT,
    black_name TEXT,
    white_rating INTEGER,
    black_rating INTEGER,
    result TEXT,
    user_color TEXT NOT NULL DEFAULT 'unknown' CHECK(user_color IN ('white','black','unknown')),
    time_control TEXT,
    time_class TEXT,
    variant TEXT NOT NULL DEFAULT 'chess',
    eco_code TEXT,
    opening_name TEXT,
    started_at TEXT,
    ended_at TEXT,
    imported_at TEXT NOT NULL,
    source_metadata_json TEXT NOT NULL DEFAULT '{}',
    analysis_status TEXT NOT NULL DEFAULT 'none',
    ply_count INTEGER NOT NULL DEFAULT 0,
    ongoing INTEGER NOT NULL DEFAULT 0,
    UNIQUE(pgn_hash)
  );
  CREATE UNIQUE INDEX idx_games_source ON games(source_platform, source_game_id)
    WHERE source_platform IS NOT NULL AND source_game_id IS NOT NULL;
  CREATE INDEX idx_games_ended_at ON games(ended_at);
  CREATE INDEX idx_games_time_class ON games(time_class);

  CREATE TABLE moves (
    id TEXT PRIMARY KEY,
    game_id TEXT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    ply INTEGER NOT NULL,
    move_number INTEGER NOT NULL,
    color TEXT NOT NULL CHECK(color IN ('white','black')),
    san TEXT NOT NULL,
    uci TEXT NOT NULL,
    fen_before TEXT NOT NULL,
    fen_after TEXT NOT NULL,
    comment TEXT,
    clock_ms INTEGER,
    UNIQUE(game_id, ply)
  );
  CREATE INDEX idx_moves_game_ply ON moves(game_id, ply);

  CREATE TABLE engines (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    author TEXT,
    protocol TEXT NOT NULL DEFAULT 'uci',
    executable_path TEXT NOT NULL,
    detected_options_json TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    last_verified_at TEXT
  );

  CREATE TABLE engine_profiles (
    id TEXT PRIMARY KEY,
    engine_id TEXT NOT NULL REFERENCES engines(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    use_case TEXT NOT NULL,
    options_json TEXT NOT NULL DEFAULT '{}',
    limits_json TEXT NOT NULL DEFAULT '{}'
  );

  CREATE TABLE engine_analysis (
    id TEXT PRIMARY KEY,
    game_id TEXT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    ply INTEGER NOT NULL,
    fen TEXT NOT NULL,
    engine_id TEXT NOT NULL,
    engine_profile_id TEXT NOT NULL,
    depth INTEGER,
    nodes INTEGER,
    time_ms INTEGER,
    result_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(game_id, ply, engine_profile_id)
  );

  CREATE TABLE mistakes (
    id TEXT PRIMARY KEY,
    game_id TEXT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    ply INTEGER NOT NULL,
    severity TEXT NOT NULL,
    eval_loss_cp INTEGER,
    theme_tags_json TEXT NOT NULL DEFAULT '[]',
    human_summary TEXT NOT NULL,
    why_bad TEXT,
    better_move_san TEXT,
    better_move_uci TEXT,
    training_action TEXT NOT NULL,
    confidence TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX idx_mistakes_game ON mistakes(game_id);

  CREATE TABLE exercises (
    id TEXT PRIMARY KEY,
    origin_type TEXT NOT NULL,
    origin_id TEXT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    prompt TEXT NOT NULL,
    fen TEXT NOT NULL,
    solution_json TEXT NOT NULL,
    hints_json TEXT NOT NULL DEFAULT '[]',
    difficulty INTEGER NOT NULL DEFAULT 3,
    tags_json TEXT NOT NULL DEFAULT '[]',
    due_at TEXT,
    interval_days REAL NOT NULL DEFAULT 0,
    ease REAL NOT NULL DEFAULT 2.5,
    attempts INTEGER NOT NULL DEFAULT 0,
    correct INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE INDEX idx_exercises_due ON exercises(due_at);

  CREATE TABLE lessons (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    version TEXT NOT NULL,
    target_rating_min INTEGER,
    target_rating_max INTEGER,
    lesson_json TEXT NOT NULL,
    validation_report_json TEXT,
    created_by TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE courses (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    course_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE lesson_progress (
    lesson_id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'not-started',
    completed_step_ids_json TEXT NOT NULL DEFAULT '[]',
    score REAL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE repertoire_nodes (
    id TEXT PRIMARY KEY,
    color TEXT NOT NULL CHECK(color IN ('white','black')),
    parent_id TEXT,
    fen_before TEXT NOT NULL,
    move_uci TEXT NOT NULL,
    move_san TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal',
    status TEXT NOT NULL DEFAULT 'learning',
    comment TEXT,
    source_json TEXT NOT NULL DEFAULT '{}',
    due_at TEXT,
    interval_days REAL NOT NULL DEFAULT 0,
    ease REAL NOT NULL DEFAULT 2.5,
    UNIQUE(color, fen_before, move_uci)
  );

  CREATE TABLE jobs (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    priority INTEGER NOT NULL DEFAULT 0,
    payload_json TEXT NOT NULL,
    progress_current INTEGER NOT NULL DEFAULT 0,
    progress_total INTEGER NOT NULL DEFAULT 0,
    progress_label TEXT,
    result_json TEXT,
    error_json TEXT,
    created_at TEXT NOT NULL,
    started_at TEXT,
    completed_at TEXT
  );
  CREATE INDEX idx_jobs_status_priority ON jobs(status, priority, created_at);

  CREATE TABLE app_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    payload_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL
  );

  CREATE TABLE http_cache (
    url TEXT PRIMARY KEY,
    etag TEXT,
    last_modified TEXT,
    body TEXT NOT NULL,
    cached_at TEXT NOT NULL
  );
  `,
  // v2 — accuracy columns + repertoire line labels (UX improvement pass)
  `
  ALTER TABLE games ADD COLUMN accuracy_white REAL;
  ALTER TABLE games ADD COLUMN accuracy_black REAL;
  ALTER TABLE repertoire_nodes ADD COLUMN opening_name TEXT;
  ALTER TABLE repertoire_nodes ADD COLUMN line_name TEXT;
  `,
  // v3 — AI commentary agents: position explanations, per-game annotations, coach reports
  `
  CREATE TABLE annotations (
    id TEXT PRIMARY KEY,
    game_id TEXT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    ply INTEGER,
    kind TEXT NOT NULL CHECK(kind IN ('explain','move','narrative')),
    text TEXT NOT NULL,
    model TEXT NOT NULL,
    verified INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
  CREATE INDEX idx_annotations_game ON annotations(game_id, kind, ply);

  CREATE TABLE coach_reports (
    id TEXT PRIMARY KEY,
    summary TEXT NOT NULL,
    report_json TEXT NOT NULL,
    games_considered INTEGER NOT NULL,
    model TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE INDEX idx_coach_reports_created ON coach_reports(created_at);
  `
]

/** True when the games table (if present) matches this app's schema. */
function isOurSchema(candidate: DatabaseSync): boolean {
  const hasGames = candidate
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='games'")
    .get()
  if (!hasGames) return true // empty/new DB
  const cols = candidate.prepare('PRAGMA table_info(games)').all() as Array<{ name: string }>
  const names = new Set(cols.map((c) => c.name))
  return names.has('pgn_hash') && names.has('ongoing')
}

export function initDb(dataDir: string): DatabaseSync {
  fs.mkdirSync(dataDir, { recursive: true })
  const dbPath = path.join(dataDir, 'app.db')
  db = new DatabaseSync(dbPath)

  // A DB created by another tool/older prototype: move it aside rather than destroy it.
  if (!isOurSchema(db)) {
    db.close()
    const backup = path.join(dataDir, `app.db.incompatible-${Date.now()}.bak`)
    fs.renameSync(dbPath, backup)
    for (const suffix of ['-wal', '-shm']) {
      const side = dbPath + suffix
      if (fs.existsSync(side)) fs.renameSync(side, backup + suffix)
    }
    console.warn(`Existing database had an incompatible schema; moved to ${backup}`)
    db = new DatabaseSync(dbPath)
  }

  db.exec('PRAGMA journal_mode = WAL;')
  db.exec('PRAGMA foreign_keys = ON;')

  const row = db.prepare('PRAGMA user_version').get() as { user_version: number }
  let version = Number(row.user_version ?? 0)
  for (let i = version; i < MIGRATIONS.length; i++) {
    db.exec('BEGIN')
    try {
      db.exec(MIGRATIONS[i])
      db.exec(`PRAGMA user_version = ${i + 1}`)
      db.exec('COMMIT')
    } catch (e) {
      db.exec('ROLLBACK')
      throw e
    }
  }
  ensureColumns()
  return db
}

/**
 * Defensive, idempotent column additions that don't depend on the `user_version` counter
 * lining up — some real-world databases (e.g. from an earlier prototype) already carry an
 * unrelated `user_version`, which would silently skip a purely counter-driven migration.
 */
function ensureColumns(): void {
  const d = db!
  const add = (table: string, column: string, ddl: string): void => {
    const cols = d.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>
    if (!cols.some((c) => c.name === column)) d.exec(`ALTER TABLE ${table} ADD COLUMN ${ddl}`)
  }
  add('games', 'accuracy_white', 'accuracy_white REAL')
  add('games', 'accuracy_black', 'accuracy_black REAL')
  add('repertoire_nodes', 'opening_name', 'opening_name TEXT')
  add('repertoire_nodes', 'line_name', 'line_name TEXT')
}

export function getDb(): DatabaseSync {
  if (!db) throw new Error('Database not initialized')
  return db
}

export function logEvent(eventType: string, entityType?: string, entityId?: string, payload: unknown = {}): void {
  getDb()
    .prepare(
      'INSERT INTO app_events (id, event_type, entity_type, entity_id, payload_json, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(uid('evt'), eventType, entityType ?? null, entityId ?? null, JSON.stringify(payload), now())
}
