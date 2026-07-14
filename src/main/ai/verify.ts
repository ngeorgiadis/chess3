import { Chess } from 'chess.js'
import type { PositionDossier } from '@shared/types'

export interface VerifyResult {
  verified: boolean
  issues: string[]
}

// SAN-shaped tokens: piece letter/file/rank disambiguators + destination square, or castling.
// No trailing \b: a move ending in +/# followed by punctuation (e.g. "Qxh7#,") has no word
// boundary there (both sides non-word), which would otherwise silently drop the suffix.
const SAN_TOKEN = /\b(?:O-O-O|O-O|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?[+#]?)/g
/** A bare two-character square ("e4", "h7") with no piece/capture/promotion/check marker — this
 * is at least as likely to be prose referring to a square ("controls e4") as a move claim, so we
 * don't hold it to move-verification (unlike "e4+", "exd5", "Qxh7#", which unambiguously claim a move). */
const AMBIGUOUS_SQUARE_ONLY = /^[a-h][1-8]$/

export function extractSanTokens(text: string): string[] {
  const tokens = text.match(SAN_TOKEN) ?? []
  return [...new Set(tokens.filter((t) => !AMBIGUOUS_SQUARE_ONLY.test(t)))]
}

/** Every SAN token that appears anywhere in a dossier — moves the model was actually shown. */
function dossierAllowlist(d: PositionDossier): Set<string> {
  const set = new Set<string>()
  if (d.playedMove) set.add(d.playedMove.san)
  for (const token of extractSanTokens(d.recentMovesText)) set.add(token)
  for (const line of d.lines) {
    set.add(line.san)
    for (const token of extractSanTokens(line.continuationText)) set.add(token)
  }
  return set
}

/** Is `san` a legal move from `fen`? Cheap single-ply legality check, independent of any dossier. */
function isLegalFrom(fen: string, san: string): boolean {
  try {
    return new Chess(fen).moves().includes(san)
  } catch {
    return false
  }
}

const WHITE_WINNING = /\bwhite\s+(?:is|was)\s+(?:clearly\s+|completely\s+|much\s+)?winning\b/i
const BLACK_WINNING = /\bblack\s+(?:is|was)\s+(?:clearly\s+|completely\s+|much\s+)?winning\b/i
const EVAL_MISMATCH_THRESHOLD_CP = 250

/** Loose sanity check: a strong "X is winning" claim shouldn't contradict the dossier's own best line. */
function checkEvalDirection(d: PositionDossier, text: string): string | null {
  const best = d.lines[0]
  if (!best) return null
  // best.evalCp is side-to-move perspective; convert to White perspective.
  const whiteCp = d.sideToMove === 'w' ? best.evalCp : -best.evalCp
  if (WHITE_WINNING.test(text) && whiteCp < -EVAL_MISMATCH_THRESHOLD_CP) {
    return `Text claims White is winning, but the engine's best line favors Black (${best.evalLabel} for the side to move).`
  }
  if (BLACK_WINNING.test(text) && whiteCp > EVAL_MISMATCH_THRESHOLD_CP) {
    return `Text claims Black is winning, but the engine's best line favors White (${best.evalLabel} for the side to move).`
  }
  return null
}

/**
 * A4 — deterministic commentary validator. Every SAN-looking move mentioned in `text` must
 * either come from the dossier (recent moves, played move, or engine lines) or be independently
 * legal from the dossier's own FEN; anything else is treated as a possible hallucination.
 */
export function verifyExplanation(dossier: PositionDossier, text: string): VerifyResult {
  const allowlist = dossierAllowlist(dossier)
  const issues: string[] = []
  for (const token of extractSanTokens(text)) {
    if (allowlist.has(token)) continue
    if (isLegalFrom(dossier.fen, token)) continue
    issues.push(token)
  }
  const evalIssue = checkEvalDirection(dossier, text)
  if (evalIssue) issues.push(evalIssue)
  return { verified: issues.length === 0, issues }
}

/**
 * Whole-game variant for the A2 narrative: allows any move actually played in the game (always
 * legal by construction) plus every move shown across the selected key-position dossiers.
 */
export function verifyNarrative(allSanMoves: string[], dossiers: PositionDossier[], text: string): VerifyResult {
  const allowlist = new Set(allSanMoves)
  for (const d of dossiers) for (const token of dossierAllowlist(d)) allowlist.add(token)
  const issues: string[] = []
  for (const token of extractSanTokens(text)) {
    if (allowlist.has(token)) continue
    // Whole-game narrative has no single FEN to fall back to for legality — an unlisted token is
    // simply flagged, since we can't cheaply verify it against an arbitrary mid-game position.
    issues.push(token)
  }
  return { verified: issues.length === 0, issues }
}
