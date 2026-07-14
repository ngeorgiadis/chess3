import { getDb } from '../db'
import { getAnalysisForGame, getMistakesForGame, gamePhase, scoreToCp } from '../engines/analysis'
import { openingLabel } from '@shared/eco-names'
import type { DossierLine, PositionDossier } from '@shared/types'

interface MoveRow {
  ply: number
  move_number: number
  color: 'white' | 'black'
  san: string
  uci: string
}

function loadMoveRows(gameId: string): MoveRow[] {
  return getDb()
    .prepare('SELECT ply, move_number, color, san, uci FROM moves WHERE game_id = ? ORDER BY ply')
    .all(gameId) as unknown as MoveRow[]
}

/** Move-numbered text for a run of plies, e.g. "10.Bg5 Bxg5 11.Nxg5 h6". */
function formatMoveRun(moves: MoveRow[]): string {
  if (moves.length === 0) return '(start of game)'
  const parts: string[] = []
  for (const m of moves) {
    if (m.color === 'white') parts.push(`${m.move_number}.${m.san}`)
    else if (parts.length === 0) parts.push(`${m.move_number}…${m.san}`)
    else parts.push(m.san)
  }
  return parts.join(' ')
}

/** Side-to-move-perspective eval label, e.g. "+1.20" or "#4". */
function evalLabel(score: { type: 'cp' | 'mate'; value: number }): string {
  if (score.type === 'mate') return `#${score.value}`
  return (score.value >= 0 ? '+' : '') + (score.value / 100).toFixed(2)
}

/**
 * Compact, engine-grounded dossier for one position in an analyzed game. This is the only
 * source of chess facts (moves, evals, motifs) that AI commentary agents are allowed to draw
 * from — the model narrates these facts, it never computes chess itself (AI_COMMENTARY_AGENTS_PROPOSAL.md).
 */
export function buildPositionDossier(
  gameId: string,
  ply: number,
  targetRatingMin = 1300,
  targetRatingMax = 1700
): PositionDossier | null {
  const db = getDb()
  const game = db
    .prepare(
      'SELECT white_name, black_name, white_rating, black_rating, user_color, eco_code, opening_name FROM games WHERE id = ?'
    )
    .get(gameId) as
    | {
        white_name: string | null
        black_name: string | null
        white_rating: number | null
        black_rating: number | null
        user_color: 'white' | 'black' | 'unknown'
        eco_code: string | null
        opening_name: string | null
      }
    | undefined
  if (!game) return null

  const moves = loadMoveRows(gameId)
  const analyses = getAnalysisForGame(gameId)
  const analysis = analyses.find((a) => a.ply === ply)
  if (!analysis) return null
  const mistakes = getMistakesForGame(gameId)
  const mistake = mistakes.find((m) => m.ply === ply) ?? null

  const playedMoveRow = ply > 0 ? moves[ply - 1] : undefined
  const playedMove = playedMoveRow ? { san: playedMoveRow.san, uci: playedMoveRow.uci } : null

  const recentMoves = moves.slice(Math.max(0, ply - 6), ply)
  const recentMovesText = formatMoveRun(recentMoves)

  const lines: DossierLine[] = analysis.multiPv.slice(0, 3).map((pv) => ({
    rank: pv.rank,
    san: pv.moveSan ?? pv.moveUci,
    evalLabel: evalLabel(pv.score),
    evalCp: scoreToCp(pv.score),
    continuationText: (pv.pvSan && pv.pvSan.length ? pv.pvSan : pv.pvUci).slice(1, 6).join(' ')
  }))

  return {
    gameId,
    ply,
    fen: analysis.fen,
    sideToMove: analysis.sideToMove,
    moveNumber: playedMoveRow ? playedMoveRow.move_number : Math.floor(ply / 2) + 1,
    phase: gamePhase(ply, moves.length),
    openingName: game.eco_code ? openingLabel({ openingName: game.opening_name, ecoCode: game.eco_code }) : null,
    players: {
      white: game.white_name,
      black: game.black_name,
      whiteRating: game.white_rating,
      blackRating: game.black_rating,
      userColor: game.user_color
    },
    recentMovesText,
    playedMove,
    mistake: mistake
      ? { severity: mistake.severity, evalLossCp: mistake.evalLossCp, themeTags: mistake.themeTags }
      : null,
    lines,
    targetRatingMin,
    targetRatingMax
  }
}

/** Render a dossier as a compact prompt block. The model is instructed to use only these facts. */
export function formatDossierForPrompt(d: PositionDossier): string {
  const sideName = d.sideToMove === 'w' ? 'White' : 'Black'
  const lines = [
    `Position: move ${d.moveNumber}, ${sideName} to move. Phase: ${d.phase}.${d.openingName ? ` Opening: ${d.openingName}.` : ''}`,
    `FEN: ${d.fen}`,
    `Recent moves: ${d.recentMovesText}`,
    d.playedMove ? `The move actually played to reach this position: ${d.playedMove.san}` : '',
    d.mistake
      ? `This move was flagged as a ${d.mistake.severity}${d.mistake.evalLossCp != null ? ` (lost ~${(d.mistake.evalLossCp / 100).toFixed(1)} pawns of evaluation)` : ''}. Themes: ${d.mistake.themeTags.join(', ') || 'none'}.`
      : '',
    'Engine lines (side-to-move perspective, already verified legal — use ONLY these moves and continuations when naming specific moves):',
    ...d.lines.map(
      (l) => `  ${l.rank}. ${l.san} (${l.evalLabel})${l.continuationText ? ` — continues ${l.continuationText}` : ''}`
    ),
    `Players: White ${d.players.white ?? '?'}${d.players.whiteRating ? ` (${d.players.whiteRating})` : ''}, Black ${d.players.black ?? '?'}${d.players.blackRating ? ` (${d.players.blackRating})` : ''}. The user played ${d.players.userColor}.`,
    `Target audience: a chess player rated ${d.targetRatingMin}-${d.targetRatingMax}. Keep it concrete and practical, not academic.`
  ]
  return lines.filter(Boolean).join('\n')
}

export interface GameDossierBundle {
  allSanMoves: string[]
  dossiers: PositionDossier[]
}

/** Dossiers for a set of key plies in one game, plus the full played-move list (for narrative allowlisting). */
export function buildGameDossierBundle(
  gameId: string,
  plies: number[],
  targetRatingMin = 1300,
  targetRatingMax = 1700
): GameDossierBundle {
  const allSanMoves = loadMoveRows(gameId).map((r) => r.san)
  const dossiers = plies
    .map((ply) => buildPositionDossier(gameId, ply, targetRatingMin, targetRatingMax))
    .filter((d): d is PositionDossier => d !== null)
  return { allSanMoves, dossiers }
}
