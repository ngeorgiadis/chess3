import { getDb, now } from '../db'
import { userAgent } from '../settings'
import { broadcast } from '../events'
import { parsePgnGame, insertGame } from './pgn'
import type { JobContext } from '../jobs/queue'
import type { ImportChessComArgs, ImportResult } from '@shared/types'

const API = 'https://api.chess.com/pub'

async function fetchJson(url: string): Promise<unknown> {
  const db = getDb()
  const cached = db.prepare('SELECT etag, body FROM http_cache WHERE url = ?').get(url) as
    | { etag: string | null; body: string }
    | undefined

  for (let attempt = 0; attempt < 4; attempt++) {
    const headers: Record<string, string> = { 'User-Agent': userAgent() }
    if (cached?.etag) headers['If-None-Match'] = cached.etag
    const res = await fetch(url, { headers })
    if (res.status === 304 && cached) return JSON.parse(cached.body)
    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('retry-after') ?? '0') || 15 * (attempt + 1)
      await new Promise((r) => setTimeout(r, retryAfter * 1000))
      continue
    }
    if (res.status === 404) throw new Error(`Not found on Chess.com: ${url}. Check the username.`)
    if (!res.ok) throw new Error(`Chess.com API error ${res.status} for ${url}`)
    const body = await res.text()
    const etag = res.headers.get('etag')
    db.prepare(
      'INSERT INTO http_cache (url, etag, last_modified, body, cached_at) VALUES (?,?,?,?,?) ON CONFLICT(url) DO UPDATE SET etag=excluded.etag, body=excluded.body, cached_at=excluded.cached_at'
    ).run(url, etag, res.headers.get('last-modified'), body, now())
    return JSON.parse(body)
  }
  throw new Error('Chess.com API rate limit persisted after retries. Try again later.')
}

interface ChessComGame {
  url?: string
  pgn?: string
  time_control?: string
  time_class?: string
  rules?: string
  end_time?: number
  rated?: boolean
  white?: { username?: string; rating?: number; result?: string }
  black?: { username?: string; rating?: number; result?: string }
  eco?: string
  accuracies?: { white?: number; black?: number }
}

export async function importChessCom(args: ImportChessComArgs, ctx: JobContext): Promise<ImportResult> {
  const username = args.username.trim().toLowerCase()
  if (!/^[a-z0-9_-]{2,50}$/.test(username)) throw new Error(`Invalid Chess.com username: ${args.username}`)

  const result: ImportResult = {
    source: 'chesscom',
    gamesSeen: 0,
    gamesImported: 0,
    duplicatesSkipped: 0,
    failed: [],
    createdGameIds: []
  }

  ctx.setProgress(0, 1, 'Fetching archive list…')
  const archivesResp = (await fetchJson(`${API}/player/${username}/games/archives`)) as { archives: string[] }
  let archives = archivesResp.archives ?? []

  // Filter by month range (archive URLs end in /YYYY/MM)
  const monthOf = (u: string): string => {
    const m = /\/(\d{4})\/(\d{2})$/.exec(u)
    return m ? `${m[1]}-${m[2]}` : ''
  }
  if (args.fromMonth) archives = archives.filter((a) => monthOf(a) >= args.fromMonth!)
  if (args.toMonth) archives = archives.filter((a) => monthOf(a) <= args.toMonth!)
  // newest first so maxGames takes recent games
  archives = archives.slice().reverse()

  const maxGames = args.maxGames ?? Infinity
  let archiveIdx = 0
  for (const archiveUrl of archives) {
    if (ctx.isCancelled() || result.gamesImported >= maxGames) break
    archiveIdx++
    ctx.setProgress(archiveIdx, archives.length, `Fetching ${monthOf(archiveUrl)}…`)
    let games: ChessComGame[]
    try {
      const data = (await fetchJson(archiveUrl)) as { games: ChessComGame[] }
      games = data.games ?? []
    } catch (e) {
      result.failed.push({ sourceRef: archiveUrl, reason: (e as Error).message })
      continue
    }
    for (const g of games) {
      if (ctx.isCancelled() || result.gamesImported >= maxGames) break
      result.gamesSeen++
      if (g.rules && g.rules !== 'chess') continue
      if (args.timeClasses?.length && g.time_class && !args.timeClasses.includes(g.time_class)) continue
      if (!g.pgn) {
        result.failed.push({ sourceRef: g.url ?? 'unknown', reason: 'No PGN in archive entry' })
        continue
      }
      try {
        const parsed = parsePgnGame(g.pgn)
        const gameId = g.url ? g.url.split('/').pop() ?? null : null
        const outcome = insertGame({
          parsed,
          sourcePlatform: 'chesscom',
          sourceGameId: gameId,
          sourceGameUrl: g.url ?? null,
          sourceMetadata: { accuracies: g.accuracies, rated: g.rated },
          overrides: {
            whiteRating: g.white?.rating ?? null,
            blackRating: g.black?.rating ?? null,
            timeClass: g.time_class ?? null,
            endedAt: g.end_time ? new Date(g.end_time * 1000).toISOString() : null,
            ongoing: false, // archives only contain finished games
            knownUsername: username
          }
        })
        if (outcome.status === 'inserted') {
          result.gamesImported++
          result.createdGameIds.push(outcome.gameId)
        } else {
          result.duplicatesSkipped++
        }
      } catch (e) {
        result.failed.push({ sourceRef: g.url ?? 'unknown', reason: (e as Error).message })
      }
    }
  }
  broadcast({ type: 'games:changed', payload: null })
  return result
}
