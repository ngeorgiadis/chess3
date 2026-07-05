export type DetectedSource =
  | { kind: 'chesscom-user'; username: string }
  | { kind: 'lichess-user'; username: string }
  | { kind: 'lichess-game'; gameId: string }
  | { kind: 'chesscom-game'; url: string }
  | { kind: 'pgn'; pgn: string }
  | { kind: 'unknown' }

/** Detect what a pasted string is (05_IMPORTERS_SPEC.md URL patterns). */
export function detectSource(input: string): DetectedSource {
  const text = input.trim()
  if (!text) return { kind: 'unknown' }
  if (text.startsWith('[') || /^1\.\s/.test(text)) return { kind: 'pgn', pgn: text }

  let url: URL | null = null
  try {
    url = new URL(text)
  } catch {
    // not a URL — maybe a bare username; caller decides platform
    return { kind: 'unknown' }
  }

  const host = url.hostname.toLowerCase()
  const parts = url.pathname.split('/').filter(Boolean)

  if (host === 'www.chess.com' || host === 'chess.com' || host === 'api.chess.com') {
    if (parts[0] === 'member' && parts[1]) return { kind: 'chesscom-user', username: parts[1] }
    if (parts[0] === 'games' && parts[1] === 'archive' && parts[2])
      return { kind: 'chesscom-user', username: parts[2] }
    if (parts[0] === 'pub' && parts[1] === 'player' && parts[2])
      return { kind: 'chesscom-user', username: parts[2] }
    if (parts[0] === 'game' || parts[0] === 'live' || parts[0] === 'daily')
      return { kind: 'chesscom-game', url: text }
    return { kind: 'unknown' }
  }

  if (host === 'lichess.org' || host === 'www.lichess.org') {
    if (parts[0] === '@' || parts[0]?.startsWith('@')) {
      const username = parts[0] === '@' ? parts[1] : parts[0].slice(1)
      if (username) return { kind: 'lichess-user', username }
    }
    if (parts[0] === 'api' && parts[1] === 'games' && parts[2] === 'user' && parts[3])
      return { kind: 'lichess-user', username: parts[3] }
    if (parts[0] === 'game' && parts[1] === 'export' && parts[2])
      return { kind: 'lichess-game', gameId: parts[2].slice(0, 8) }
    if (parts[0] && /^[a-zA-Z0-9]{8,12}$/.test(parts[0]))
      return { kind: 'lichess-game', gameId: parts[0].slice(0, 8) }
    return { kind: 'unknown' }
  }

  return { kind: 'unknown' }
}
