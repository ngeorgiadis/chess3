import { userAgent } from '../settings'
import { broadcast } from '../events'
import { parsePgnGame, insertGame } from './pgn'
import type { JobContext } from '../jobs/queue'
import type { ImportLichessArgs, ImportResult } from '@shared/types'

interface LichessGame {
  id: string
  rated?: boolean
  variant?: string
  speed?: string
  perf?: string
  status?: string
  createdAt?: number
  lastMoveAt?: number
  players?: {
    white?: { user?: { name?: string }; rating?: number }
    black?: { user?: { name?: string }; rating?: number }
  }
  opening?: { eco?: string; name?: string }
  pgn?: string
  clock?: { initial: number; increment: number }
}

const ONGOING_STATUSES = new Set(['created', 'started'])

function handleGame(g: LichessGame, result: ImportResult): void {
  result.gamesSeen++
  if (g.variant && g.variant !== 'standard') return
  if (!g.pgn) {
    result.failed.push({ sourceRef: g.id, reason: 'No PGN in export (pgnInJson missing?)' })
    return
  }
  if (ONGOING_STATUSES.has(g.status ?? '')) {
    result.failed.push({ sourceRef: g.id, reason: 'Game is ongoing — skipped (no live-game analysis)' })
    return
  }
  try {
    const parsed = parsePgnGame(g.pgn)
    const outcome = insertGame({
      parsed,
      sourcePlatform: 'lichess',
      sourceGameId: g.id,
      sourceGameUrl: `https://lichess.org/${g.id}`,
      sourceMetadata: { rated: g.rated, status: g.status },
      overrides: {
        whiteRating: g.players?.white?.rating ?? null,
        blackRating: g.players?.black?.rating ?? null,
        timeClass: g.speed ?? g.perf ?? null,
        ecoCode: g.opening?.eco ?? null,
        openingName: g.opening?.name ?? null,
        startedAt: g.createdAt ? new Date(g.createdAt).toISOString() : null,
        endedAt: g.lastMoveAt ? new Date(g.lastMoveAt).toISOString() : null,
        ongoing: false
      }
    })
    if (outcome.status === 'inserted') {
      result.gamesImported++
      result.createdGameIds.push(outcome.gameId)
    } else {
      result.duplicatesSkipped++
    }
  } catch (e) {
    result.failed.push({ sourceRef: g.id, reason: (e as Error).message })
  }
}

/** Stream the Lichess NDJSON export line-by-line (05_IMPORTERS_SPEC.md). */
export async function importLichess(args: ImportLichessArgs, ctx: JobContext): Promise<ImportResult> {
  const username = args.username.trim()
  if (!/^[a-zA-Z0-9_-]{2,30}$/.test(username)) throw new Error(`Invalid Lichess username: ${args.username}`)

  const result: ImportResult = {
    source: 'lichess',
    gamesSeen: 0,
    gamesImported: 0,
    duplicatesSkipped: 0,
    failed: [],
    createdGameIds: []
  }

  const params = new URLSearchParams()
  const max = args.max ?? 100
  params.set('max', String(max))
  params.set('pgnInJson', 'true')
  params.set('tags', 'true')
  params.set('clocks', 'true')
  params.set('opening', 'true')
  params.set('sort', 'dateDesc')
  if (args.perfTypes?.length) params.set('perfType', args.perfTypes.join(','))
  if (args.rated !== undefined) params.set('rated', String(args.rated))
  if (args.color) params.set('color', args.color)
  if (args.since) params.set('since', String(new Date(args.since).getTime()))
  if (args.until) params.set('until', String(new Date(args.until).getTime()))

  const url = `https://lichess.org/api/games/user/${username}?${params.toString()}`
  const abort = new AbortController()
  ctx.setProgress(0, max, 'Connecting to Lichess…')

  const res = await fetch(url, {
    headers: { Accept: 'application/x-ndjson', 'User-Agent': userAgent() },
    signal: abort.signal
  })
  if (res.status === 404) throw new Error(`Lichess user not found: ${username}`)
  if (res.status === 429) throw new Error('Lichess rate limit hit. Wait a minute and retry.')
  if (!res.ok || !res.body) throw new Error(`Lichess API error ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  try {
    for (;;) {
      if (ctx.isCancelled()) {
        abort.abort()
        break
      }
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      let nl: number
      while ((nl = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, nl).trim()
        buffer = buffer.slice(nl + 1)
        if (!line) continue
        try {
          handleGame(JSON.parse(line) as LichessGame, result)
        } catch (e) {
          result.failed.push({ sourceRef: 'ndjson-line', reason: (e as Error).message })
        }
        ctx.setProgress(result.gamesSeen, max, `Imported ${result.gamesImported} games…`)
      }
    }
    if (buffer.trim()) handleGame(JSON.parse(buffer.trim()) as LichessGame, result)
  } catch (e) {
    if ((e as Error).name !== 'AbortError') throw e
  }

  broadcast({ type: 'games:changed', payload: null })
  return result
}

/** Import a single Lichess game by ID. */
export async function importLichessGame(gameId: string): Promise<ImportResult> {
  const result: ImportResult = {
    source: 'lichess',
    gamesSeen: 0,
    gamesImported: 0,
    duplicatesSkipped: 0,
    failed: [],
    createdGameIds: []
  }
  const url = `https://lichess.org/game/export/${gameId}?pgnInJson=true&tags=true&clocks=true&opening=true`
  const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': userAgent() } })
  if (res.status === 404) throw new Error(`Lichess game not found: ${gameId}`)
  if (!res.ok) throw new Error(`Lichess API error ${res.status}`)
  handleGame((await res.json()) as LichessGame, result)
  broadcast({ type: 'games:changed', payload: null })
  return result
}
