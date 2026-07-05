import { getDb, uid, now, logEvent } from '../db'
import { verifyEngine } from './uci'
import { broadcast } from '../events'
import type { EngineProfileRecord, EngineRecord, EngineUseCase } from '@shared/types'

function rowToEngine(row: Record<string, unknown>): EngineRecord {
  return {
    id: row.id as string,
    name: row.name as string,
    author: (row.author as string) ?? null,
    protocol: 'uci',
    executablePath: row.executable_path as string,
    detectedOptions: JSON.parse(row.detected_options_json as string),
    status: row.status as EngineRecord['status'],
    createdAt: row.created_at as string,
    lastVerifiedAt: (row.last_verified_at as string) ?? null
  }
}

function rowToProfile(row: Record<string, unknown>): EngineProfileRecord {
  return {
    id: row.id as string,
    engineId: row.engine_id as string,
    name: row.name as string,
    useCase: row.use_case as EngineUseCase,
    options: JSON.parse(row.options_json as string),
    limits: JSON.parse(row.limits_json as string)
  }
}

const DEFAULT_PROFILES: Array<{
  name: string
  useCase: EngineUseCase
  limits: EngineProfileRecord['limits']
}> = [
  { name: 'Fast Review', useCase: 'fast-review', limits: { moveTimeMs: 300, multiPv: 2 } },
  { name: 'Deep Review', useCase: 'deep-review', limits: { moveTimeMs: 1500, multiPv: 2 } },
  { name: 'Opening Check', useCase: 'opening', limits: { depth: 16, multiPv: 3 } },
  { name: 'Puzzle Validate', useCase: 'puzzle-validation', limits: { depth: 20, multiPv: 5 } },
  { name: 'Endgame Check', useCase: 'endgame', limits: { depth: 22, multiPv: 2 } }
]

export async function addEngine(executablePath: string): Promise<EngineRecord> {
  const db = getDb()
  const existing = db.prepare('SELECT id FROM engines WHERE executable_path = ?').get(executablePath)
  if (existing) throw new Error('This engine executable is already registered.')

  const meta = await verifyEngine(executablePath)
  const id = uid('eng')
  db.prepare(
    'INSERT INTO engines (id, name, author, protocol, executable_path, detected_options_json, status, created_at, last_verified_at) VALUES (?,?,?,?,?,?,?,?,?)'
  ).run(id, meta.name, meta.author, 'uci', executablePath, JSON.stringify(meta.options), 'available', now(), now())

  const profileStmt = db.prepare(
    'INSERT INTO engine_profiles (id, engine_id, name, use_case, options_json, limits_json) VALUES (?,?,?,?,?,?)'
  )
  for (const p of DEFAULT_PROFILES) {
    profileStmt.run(uid('prof'), id, p.name, p.useCase, '{}', JSON.stringify(p.limits))
  }
  logEvent('engine.added', 'engine', id, { name: meta.name })
  broadcast({ type: 'engine:status', payload: null })
  return getEngine(id)!
}

export function getEngine(id: string): EngineRecord | null {
  const row = getDb().prepare('SELECT * FROM engines WHERE id = ?').get(id) as Record<string, unknown> | undefined
  return row ? rowToEngine(row) : null
}

export function listEngines(): EngineRecord[] {
  const rows = getDb().prepare('SELECT * FROM engines ORDER BY created_at').all() as Array<Record<string, unknown>>
  return rows.map(rowToEngine)
}

export function removeEngine(id: string): void {
  getDb().prepare('DELETE FROM engines WHERE id = ?').run(id)
  broadcast({ type: 'engine:status', payload: null })
}

export async function reverifyEngine(id: string): Promise<EngineRecord> {
  const engine = getEngine(id)
  if (!engine) throw new Error('Engine not found')
  try {
    const meta = await verifyEngine(engine.executablePath)
    getDb()
      .prepare('UPDATE engines SET name = ?, author = ?, detected_options_json = ?, status = ?, last_verified_at = ? WHERE id = ?')
      .run(meta.name, meta.author, JSON.stringify(meta.options), 'available', now(), id)
  } catch (e) {
    getDb().prepare('UPDATE engines SET status = ? WHERE id = ?').run('invalid', id)
    broadcast({ type: 'engine:status', payload: null })
    throw e
  }
  broadcast({ type: 'engine:status', payload: null })
  return getEngine(id)!
}

export function listProfiles(engineId?: string): EngineProfileRecord[] {
  const rows = (
    engineId
      ? getDb().prepare('SELECT * FROM engine_profiles WHERE engine_id = ?').all(engineId)
      : getDb().prepare('SELECT * FROM engine_profiles').all()
  ) as Array<Record<string, unknown>>
  return rows.map(rowToProfile)
}

export function getProfile(id: string): EngineProfileRecord | null {
  const row = getDb().prepare('SELECT * FROM engine_profiles WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  return row ? rowToProfile(row) : null
}

export function saveProfile(profile: EngineProfileRecord): EngineProfileRecord {
  const db = getDb()
  const id = profile.id || uid('prof')
  db.prepare(
    `INSERT INTO engine_profiles (id, engine_id, name, use_case, options_json, limits_json) VALUES (?,?,?,?,?,?)
     ON CONFLICT(id) DO UPDATE SET name = excluded.name, use_case = excluded.use_case,
       options_json = excluded.options_json, limits_json = excluded.limits_json`
  ).run(id, profile.engineId, profile.name, profile.useCase, JSON.stringify(profile.options), JSON.stringify(profile.limits))
  return getProfile(id)!
}
