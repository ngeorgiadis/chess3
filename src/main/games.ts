import { getDb } from './db'
import { broadcast } from './events'
import type { GameFilters, GameRecord, MoveRecord } from '@shared/types'

function rowToGame(row: Record<string, unknown>): GameRecord {
  return {
    id: row.id as string,
    sourcePlatform: (row.source_platform as GameRecord['sourcePlatform']) ?? null,
    sourceGameId: (row.source_game_id as string) ?? null,
    sourceGameUrl: (row.source_game_url as string) ?? null,
    rawPgn: row.raw_pgn as string,
    whiteName: (row.white_name as string) ?? null,
    blackName: (row.black_name as string) ?? null,
    whiteRating: (row.white_rating as number) ?? null,
    blackRating: (row.black_rating as number) ?? null,
    result: (row.result as string) ?? null,
    userColor: row.user_color as GameRecord['userColor'],
    timeControl: (row.time_control as string) ?? null,
    timeClass: (row.time_class as string) ?? null,
    variant: row.variant as string,
    ecoCode: (row.eco_code as string) ?? null,
    openingName: (row.opening_name as string) ?? null,
    startedAt: (row.started_at as string) ?? null,
    endedAt: (row.ended_at as string) ?? null,
    importedAt: row.imported_at as string,
    analysisStatus: row.analysis_status as GameRecord['analysisStatus'],
    plyCount: row.ply_count as number,
    mistakeCount: (row.mistake_count as number) ?? 0,
    ongoing: Boolean(row.ongoing)
  }
}

export function listGames(filters: GameFilters = {}): GameRecord[] {
  const clauses: string[] = []
  const params: Array<string | number> = []

  if (filters.text) {
    clauses.push('(white_name LIKE ? OR black_name LIKE ? OR opening_name LIKE ? OR eco_code LIKE ?)')
    const like = `%${filters.text}%`
    params.push(like, like, like, like)
  }
  if (filters.platform) {
    clauses.push('source_platform = ?')
    params.push(filters.platform)
  }
  if (filters.timeClass) {
    clauses.push('time_class = ?')
    params.push(filters.timeClass)
  }
  if (filters.color && filters.color !== undefined) {
    clauses.push('user_color = ?')
    params.push(filters.color)
  }
  if (filters.result) {
    // interpret relative to user color when known
    if (filters.result === 'draw') clauses.push("result = '1/2-1/2'")
    else if (filters.result === 'win')
      clauses.push(
        "((user_color = 'white' AND result = '1-0') OR (user_color = 'black' AND result = '0-1'))"
      )
    else
      clauses.push(
        "((user_color = 'white' AND result = '0-1') OR (user_color = 'black' AND result = '1-0'))"
      )
  }
  if (filters.analyzed !== undefined) {
    clauses.push(filters.analyzed ? "analysis_status = 'done'" : "analysis_status != 'done'")
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const limit = Math.min(filters.limit ?? 200, 1000)
  const offset = filters.offset ?? 0
  const rows = getDb()
    .prepare(
      `SELECT g.*, (SELECT COUNT(*) FROM mistakes m WHERE m.game_id = g.id) AS mistake_count
       FROM games g ${where}
       ORDER BY COALESCE(g.ended_at, g.imported_at) DESC LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset) as Array<Record<string, unknown>>
  return rows.map(rowToGame)
}

export function getGame(id: string): GameRecord | null {
  const row = getDb()
    .prepare('SELECT g.*, (SELECT COUNT(*) FROM mistakes m WHERE m.game_id = g.id) AS mistake_count FROM games g WHERE g.id = ?')
    .get(id) as Record<string, unknown> | undefined
  return row ? rowToGame(row) : null
}

export function getMoves(gameId: string): MoveRecord[] {
  const rows = getDb()
    .prepare('SELECT * FROM moves WHERE game_id = ? ORDER BY ply')
    .all(gameId) as Array<Record<string, unknown>>
  return rows.map((row) => ({
    gameId: row.game_id as string,
    ply: row.ply as number,
    moveNumber: row.move_number as number,
    color: row.color as 'white' | 'black',
    san: row.san as string,
    uci: row.uci as string,
    fenBefore: row.fen_before as string,
    fenAfter: row.fen_after as string,
    comment: (row.comment as string) ?? null,
    clockMs: (row.clock_ms as number) ?? null
  }))
}

export function deleteGame(id: string): void {
  getDb().prepare('DELETE FROM games WHERE id = ?').run(id)
  broadcast({ type: 'games:changed', payload: null })
}

export function exportPgn(gameIds: string[]): string {
  const stmt = getDb().prepare('SELECT raw_pgn FROM games WHERE id = ?')
  return gameIds
    .map((id) => (stmt.get(id) as { raw_pgn: string } | undefined)?.raw_pgn)
    .filter(Boolean)
    .join('\n\n')
}
