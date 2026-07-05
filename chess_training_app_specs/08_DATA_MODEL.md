# 08 — Data Model

## Core entities

- UserProfile
- PlatformAccount
- Game
- Move
- Position
- Engine
- EngineProfile
- EngineAnalysis
- Mistake
- Exercise
- Course
- Lesson
- LessonProgress
- Repertoire
- RepertoireNode
- StudyPlan
- Job
- SourceDocument

## SQLite schema outline

### users

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  display_name TEXT,
  rating_chesscom INTEGER,
  rating_lichess INTEGER,
  target_rating INTEGER,
  preferred_time_controls TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### platform_accounts

```sql
CREATE TABLE platform_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK(platform IN ('chesscom','lichess','other')),
  username TEXT NOT NULL,
  profile_url TEXT,
  last_imported_at TEXT,
  settings_json TEXT NOT NULL DEFAULT '{}',
  UNIQUE(platform, username)
);
```

### games

```sql
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
  user_color TEXT CHECK(user_color IN ('white','black','unknown')),
  time_control TEXT,
  time_class TEXT,
  variant TEXT DEFAULT 'chess',
  eco_code TEXT,
  opening_name TEXT,
  started_at TEXT,
  ended_at TEXT,
  imported_at TEXT NOT NULL,
  source_metadata_json TEXT NOT NULL DEFAULT '{}',
  analysis_status TEXT NOT NULL DEFAULT 'none',
  UNIQUE(source_platform, source_game_id),
  UNIQUE(pgn_hash)
);
```

### moves

```sql
CREATE TABLE moves (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  ply INTEGER NOT NULL,
  move_number INTEGER NOT NULL,
  color TEXT NOT NULL CHECK(color IN ('white','black')),
  san TEXT NOT NULL,
  uci TEXT,
  fen_before TEXT NOT NULL,
  fen_after TEXT NOT NULL,
  nags_json TEXT DEFAULT '[]',
  comment TEXT,
  clock_ms INTEGER,
  source_eval_json TEXT,
  UNIQUE(game_id, ply)
);
```

### engines

```sql
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
```

### engine_profiles

```sql
CREATE TABLE engine_profiles (
  id TEXT PRIMARY KEY,
  engine_id TEXT NOT NULL,
  name TEXT NOT NULL,
  use_case TEXT NOT NULL,
  options_json TEXT NOT NULL DEFAULT '{}',
  limits_json TEXT NOT NULL DEFAULT '{}'
);
```

### engine_analysis

```sql
CREATE TABLE engine_analysis (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
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
```

### mistakes

```sql
CREATE TABLE mistakes (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  ply INTEGER NOT NULL,
  severity TEXT NOT NULL,
  eval_loss_cp INTEGER,
  theme_tags_json TEXT NOT NULL DEFAULT '[]',
  human_summary TEXT NOT NULL,
  why_bad TEXT,
  better_move_san TEXT,
  better_move_uci TEXT,
  training_action TEXT,
  confidence TEXT NOT NULL,
  created_at TEXT NOT NULL
);
```

### exercises

```sql
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
  feedback_json TEXT NOT NULL DEFAULT '{}',
  difficulty INTEGER,
  tags_json TEXT NOT NULL DEFAULT '[]',
  due_at TEXT,
  interval_days REAL DEFAULT 0,
  ease REAL DEFAULT 2.5,
  created_at TEXT NOT NULL
);
```

### lessons

```sql
CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  target_rating_min INTEGER,
  target_rating_max INTEGER,
  lesson_json TEXT NOT NULL,
  validation_report_json TEXT,
  source_document_id TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### lesson_progress

```sql
CREATE TABLE lesson_progress (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  completed_step_ids_json TEXT NOT NULL DEFAULT '[]',
  score REAL,
  last_position TEXT,
  started_at TEXT,
  completed_at TEXT,
  updated_at TEXT NOT NULL,
  UNIQUE(lesson_id, user_id)
);
```

### repertoire_nodes

```sql
CREATE TABLE repertoire_nodes (
  id TEXT PRIMARY KEY,
  repertoire_id TEXT NOT NULL,
  parent_id TEXT,
  fen_before TEXT NOT NULL,
  move_uci TEXT NOT NULL,
  move_san TEXT NOT NULL,
  color TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  status TEXT NOT NULL DEFAULT 'learning',
  comment TEXT,
  source_json TEXT NOT NULL DEFAULT '{}',
  stats_json TEXT NOT NULL DEFAULT '{}',
  due_at TEXT,
  interval_days REAL DEFAULT 0,
  ease REAL DEFAULT 2.5,
  UNIQUE(repertoire_id, fen_before, move_uci)
);
```

### jobs

```sql
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  payload_json TEXT NOT NULL,
  progress_current INTEGER DEFAULT 0,
  progress_total INTEGER DEFAULT 0,
  error_json TEXT,
  created_at TEXT NOT NULL,
  started_at TEXT,
  completed_at TEXT
);
```

### source_documents

```sql
CREATE TABLE source_documents (
  id TEXT PRIMARY KEY,
  title TEXT,
  source_type TEXT NOT NULL,
  rights_mode TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  content_ref TEXT,
  notes TEXT,
  created_at TEXT NOT NULL
);
```

## Indexes

```sql
CREATE INDEX idx_games_ended_at ON games(ended_at);
CREATE INDEX idx_games_opening ON games(eco_code, opening_name);
CREATE INDEX idx_games_time_class ON games(time_class);
CREATE INDEX idx_moves_game_ply ON moves(game_id, ply);
CREATE INDEX idx_mistakes_tags ON mistakes(training_action);
CREATE INDEX idx_exercises_due ON exercises(due_at);
CREATE INDEX idx_jobs_status_priority ON jobs(status, priority, created_at);
```

## Full-text search

Use SQLite FTS5 for:

- Game comments.
- Lesson titles/content.
- Mistake summaries.
- User notes.

## Event log

For auditability, optionally store major actions:

```sql
CREATE TABLE app_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  payload_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);
```

Events:

- `game.imported`
- `game.analyzed`
- `mistake.created`
- `exercise.completed`
- `lesson.generated`
- `lesson.published`
- `engine.added`
- `job.failed`
