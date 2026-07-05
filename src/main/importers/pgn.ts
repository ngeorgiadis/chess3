import { Chess } from 'chess.js'
import { getDb, uid, now, sha256, logEvent } from '../db'
import { getSettings } from '../settings'
import { broadcast } from '../events'
import type { ImportResult, Platform } from '@shared/types'

export interface ParsedMove {
  ply: number
  moveNumber: number
  color: 'white' | 'black'
  san: string
  uci: string
  fenBefore: string
  fenAfter: string
  comment: string | null
  clockMs: number | null
}

export interface ParsedGame {
  headers: Record<string, string>
  moves: ParsedMove[]
  rawPgn: string
  normalizedMovetext: string
}

/** Split a multi-game PGN text into individual game strings. */
export function splitPgn(text: string): string[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const games: string[] = []
  let current: string[] = []
  let inMoves = false
  for (const line of lines) {
    const isHeader = /^\s*\[\w+\s+"/.test(line)
    if (isHeader && inMoves) {
      // a new game starts
      if (current.join('\n').trim()) games.push(current.join('\n').trim())
      current = []
      inMoves = false
    }
    if (!isHeader && line.trim() !== '') inMoves = true
    current.push(line)
  }
  if (current.join('\n').trim()) games.push(current.join('\n').trim())
  return games
}

export function parseHeaders(pgn: string): Record<string, string> {
  const headers: Record<string, string> = {}
  const re = /^\s*\[(\w+)\s+"((?:[^"\\]|\\.)*)"\]/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(pgn)) !== null) {
    headers[m[1]] = m[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }
  return headers
}

function parseClockComment(comment: string): number | null {
  const m = /\[%clk\s+(\d+):(\d+):(\d+(?:\.\d+)?)\]/.exec(comment)
  if (!m) return null
  return Math.round((parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseFloat(m[3])) * 1000)
}

/** Parse a single PGN game into headers + per-ply move data. Throws on unparseable movetext. */
export function parsePgnGame(pgn: string): ParsedGame {
  const headers = parseHeaders(pgn)
  const chess = new Chess()
  chess.loadPgn(pgn, { strict: false })

  const commentsByFen = new Map<string, string>()
  for (const c of chess.getComments()) commentsByFen.set(c.fen, c.comment)

  const history = chess.history({ verbose: true })
  const moves: ParsedMove[] = []
  let ply = 0
  for (const mv of history) {
    ply++
    const comment = commentsByFen.get(mv.after) ?? null
    moves.push({
      ply,
      moveNumber: Math.ceil(ply / 2),
      color: mv.color === 'w' ? 'white' : 'black',
      san: mv.san,
      uci: mv.from + mv.to + (mv.promotion ?? ''),
      fenBefore: mv.before,
      fenAfter: mv.after,
      comment,
      clockMs: comment ? parseClockComment(comment) : null
    })
  }

  return {
    headers,
    moves,
    rawPgn: pgn,
    normalizedMovetext: moves.map((m) => m.san).join(' ')
  }
}

export function inferTimeClass(timeControl: string | undefined): string | null {
  if (!timeControl) return null
  if (/^\d+\/\d+/.test(timeControl) || timeControl === '-') return 'daily'
  const m = /^(\d+)(?:\+(\d+))?/.exec(timeControl)
  if (!m) return null
  const base = parseInt(m[1])
  const inc = m[2] ? parseInt(m[2]) : 0
  const estimate = base + inc * 40
  if (estimate < 180) return 'bullet'
  if (estimate < 600) return 'blitz'
  if (estimate < 1800) return 'rapid'
  return 'classical'
}

function detectUserColor(headers: Record<string, string>): 'white' | 'black' | 'unknown' {
  const s = getSettings()
  const names = [s.chesscomUsername, s.lichessUsername, s.displayName]
    .filter(Boolean)
    .map((n) => n.toLowerCase())
  if (names.length === 0) return 'unknown'
  const white = (headers.White ?? '').toLowerCase()
  const black = (headers.Black ?? '').toLowerCase()
  if (names.includes(white)) return 'white'
  if (names.includes(black)) return 'black'
  return 'unknown'
}

export interface InsertGameInput {
  parsed: ParsedGame
  sourcePlatform: Platform
  sourceGameId?: string | null
  sourceGameUrl?: string | null
  sourceMetadata?: unknown
  overrides?: Partial<{
    whiteRating: number | null
    blackRating: number | null
    timeClass: string | null
    openingName: string | null
    ecoCode: string | null
    startedAt: string | null
    endedAt: string | null
    ongoing: boolean
  }>
}

export type InsertOutcome = { status: 'inserted'; gameId: string } | { status: 'duplicate' }

/** Insert a parsed game with deduplication. */
export function insertGame(input: InsertGameInput): InsertOutcome {
  const db = getDb()
  const { parsed, sourcePlatform, sourceGameId, sourceGameUrl, overrides = {} } = input
  const h = parsed.headers

  const hashBasis = [
    h.White ?? '',
    h.Black ?? '',
    h.Date ?? h.UTCDate ?? '',
    h.Result ?? '',
    parsed.normalizedMovetext
  ].join('|')
  const pgnHash = sha256(hashBasis)

  // Dedup keys in priority order (05_IMPORTERS_SPEC.md)
  if (sourcePlatform && sourceGameId) {
    const existing = db
      .prepare('SELECT id FROM games WHERE source_platform = ? AND source_game_id = ?')
      .get(sourcePlatform, sourceGameId)
    if (existing) return { status: 'duplicate' }
  }
  if (sourceGameUrl) {
    const existing = db.prepare('SELECT id FROM games WHERE source_game_url = ?').get(sourceGameUrl)
    if (existing) return { status: 'duplicate' }
  }
  const existingHash = db.prepare('SELECT id FROM games WHERE pgn_hash = ?').get(pgnHash)
  if (existingHash) return { status: 'duplicate' }

  const id = uid('game')
  const result = h.Result ?? null
  const ongoing = overrides.ongoing ?? result === '*'
  const timeControl = h.TimeControl ?? null
  const date = (h.UTCDate ?? h.Date ?? '').replace(/\./g, '-')
  const time = h.UTCTime ?? h.StartTime ?? null
  const startedAt =
    overrides.startedAt ?? (date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T${time ?? '00:00:00'}` : null)

  db.prepare(
    `INSERT INTO games (
      id, source_platform, source_game_id, source_game_url, raw_pgn, normalized_pgn, pgn_hash,
      white_name, black_name, white_rating, black_rating, result, user_color,
      time_control, time_class, variant, eco_code, opening_name,
      started_at, ended_at, imported_at, source_metadata_json, analysis_status, ply_count, ongoing
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(
    id,
    sourcePlatform,
    sourceGameId ?? null,
    sourceGameUrl ?? null,
    parsed.rawPgn,
    parsed.normalizedMovetext,
    pgnHash,
    h.White ?? null,
    h.Black ?? null,
    overrides.whiteRating ?? (h.WhiteElo ? parseInt(h.WhiteElo) || null : null),
    overrides.blackRating ?? (h.BlackElo ? parseInt(h.BlackElo) || null : null),
    result,
    detectUserColor(h),
    timeControl,
    overrides.timeClass ?? inferTimeClass(timeControl ?? undefined),
    (h.Variant ?? 'chess').toLowerCase() === 'standard' ? 'chess' : (h.Variant ?? 'chess').toLowerCase(),
    overrides.ecoCode ?? h.ECO ?? null,
    overrides.openingName ?? h.Opening ?? null,
    startedAt,
    overrides.endedAt ?? h.EndDate ?? startedAt,
    now(),
    JSON.stringify(input.sourceMetadata ?? {}),
    'none',
    parsed.moves.length,
    ongoing ? 1 : 0
  )

  const moveStmt = db.prepare(
    `INSERT INTO moves (id, game_id, ply, move_number, color, san, uci, fen_before, fen_after, comment, clock_ms)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  )
  for (const mv of parsed.moves) {
    moveStmt.run(
      uid('mv'),
      id,
      mv.ply,
      mv.moveNumber,
      mv.color,
      mv.san,
      mv.uci,
      mv.fenBefore,
      mv.fenAfter,
      mv.comment,
      mv.clockMs
    )
  }
  logEvent('game.imported', 'game', id, { sourcePlatform })
  return { status: 'inserted', gameId: id }
}

/** Import a multi-game PGN text (pasted or from file). */
export function importPgnText(
  text: string,
  source: Platform,
  onProgress?: (current: number, total: number) => void
): ImportResult {
  const chunks = splitPgn(text)
  const result: ImportResult = {
    source,
    gamesSeen: chunks.length,
    gamesImported: 0,
    duplicatesSkipped: 0,
    failed: [],
    createdGameIds: []
  }
  let i = 0
  for (const chunk of chunks) {
    i++
    try {
      const parsed = parsePgnGame(chunk)
      if (parsed.moves.length === 0) {
        result.failed.push({ sourceRef: `game ${i}`, reason: 'No moves found' })
        continue
      }
      const h = parsed.headers
      const url = h.Link ?? (h.Site?.startsWith('http') ? h.Site : null)
      const outcome = insertGame({
        parsed,
        sourcePlatform: source,
        sourceGameUrl: url
      })
      if (outcome.status === 'inserted') {
        result.gamesImported++
        result.createdGameIds.push(outcome.gameId)
      } else {
        result.duplicatesSkipped++
      }
    } catch (e) {
      result.failed.push({ sourceRef: `game ${i}`, reason: (e as Error).message })
    }
    onProgress?.(i, chunks.length)
  }
  broadcast({ type: 'games:changed', payload: null })
  return result
}
