import { chat, parseJsonLoose } from './provider'
import { buildGameDossierBundle, formatDossierForPrompt } from './grounding'
import { verifyExplanation, verifyNarrative } from './verify'
import { rowToAnnotation } from './explain-agent'
import { getDb, uid, now } from '../db'
import { getSettings } from '../settings'
import { getMistakesForGame, gamePhase } from '../engines/analysis'
import { openingLabel } from '@shared/eco-names'
import { broadcast } from '../events'
import type { JobContext } from '../jobs/queue'
import type { GameAnnotations, PositionDossier } from '@shared/types'

const MAX_KEY_PLIES = 14

const SYSTEM_PROMPT = `You are The Chess Master Coach, a patient but demanding chess instructor reviewing a
student's game. You are given a set of key positions from the game, each annotated with engine facts (recent
moves, the move actually played, and the engine's top lines). Use ONLY these facts — never invent a move,
evaluation, or line that isn't shown to you.

Write practical, concrete, board-oriented commentary. No engine jargon like "depth" or "nodes". No markdown.`

/** Mistake plies (worst first) + one marker ply per phase transition, capped and deduplicated. */
function selectKeyPlies(gameId: string): number[] {
  const db = getDb()
  const moveCount = (db.prepare('SELECT COUNT(*) AS c FROM moves WHERE game_id = ?').get(gameId) as { c: number }).c
  const mistakes = [...getMistakesForGame(gameId)].sort((a, b) => (b.evalLossCp ?? 0) - (a.evalLossCp ?? 0))

  const set = new Set<number>()
  for (const m of mistakes) {
    if (set.size >= MAX_KEY_PLIES) break
    set.add(m.ply)
  }
  if (set.size < MAX_KEY_PLIES) {
    let lastPhase: string | null = null
    for (let ply = 0; ply <= moveCount && set.size < MAX_KEY_PLIES; ply++) {
      const phase = gamePhase(ply, moveCount)
      if (phase !== lastPhase) {
        if (lastPhase !== null) set.add(ply)
        lastPhase = phase
      }
    }
  }
  return [...set].sort((a, b) => a - b)
}

interface GameHeaderRow {
  white_name: string | null
  black_name: string | null
  result: string | null
  eco_code: string | null
  opening_name: string | null
  user_color: 'white' | 'black' | 'unknown'
  analysis_status: string
}

export interface AnnotateGameResult {
  moveCount: number
  narrativeGenerated: boolean
}

interface ParsedCommentary {
  narrative?: string
  moves?: Array<{ ply: number; text: string }>
}

/** A2 — batch per-game annotator: one narrative + short comments on the key positions of a game. */
export async function annotateGame(gameId: string, ctx: JobContext): Promise<AnnotateGameResult> {
  const db = getDb()
  const game = db
    .prepare(
      'SELECT white_name, black_name, result, eco_code, opening_name, user_color, analysis_status FROM games WHERE id = ?'
    )
    .get(gameId) as GameHeaderRow | undefined
  if (!game) throw new Error('Game not found.')
  if (game.analysis_status !== 'done') throw new Error('Analyze this game before generating AI commentary.')

  const settings = getSettings()
  const model = settings.aiConfig.model || settings.aiConfig.mode
  const targetMin = settings.ratingCurrent - 150
  const targetMax = settings.ratingCurrent + 150

  ctx.setProgress(0, 3, 'Selecting key positions')
  const plies = selectKeyPlies(gameId)
  const bundle = buildGameDossierBundle(gameId, plies, targetMin, targetMax)
  if (bundle.dossiers.length === 0) throw new Error('No analyzed positions available to annotate.')

  const header = `Game: ${game.white_name ?? '?'} vs ${game.black_name ?? '?'}, result ${game.result ?? '?'}${
    game.eco_code ? `, opening ${openingLabel({ openingName: game.opening_name, ecoCode: game.eco_code })}` : ''
  }. The user played ${game.user_color}.`
  const positionsText = bundle.dossiers
    .map((d, i) => `--- Position ${i + 1} (ply ${d.ply}) ---\n${formatDossierForPrompt(d)}`)
    .join('\n\n')

  const user = `${header}

Below are ${bundle.dossiers.length} key positions from this game, each with engine facts. Using ONLY the moves and
evaluations shown for each position, write:
1. "narrative": whole-game commentary (3-5 short paragraphs separated by blank lines) covering the opening, the
   turning point(s), a brief note per phase, ending with "Three things to remember:" followed by three concrete,
   concise lessons.
2. "moves": for EACH position listed above, a 1-2 sentence comment on what mattered there, keyed by its exact ply
   number.

${positionsText}

Output a single JSON object: { "narrative": string, "moves": [{ "ply": number, "text": string }, ...] } with one
moves entry per position above. Output ONLY the JSON object.`

  ctx.setProgress(1, 3, 'Generating commentary')
  let rawText = await chat({ system: SYSTEM_PROMPT, user, expectJson: true, temperature: 0.4 })
  let parsed = parseJsonLoose(rawText) as ParsedCommentary | null

  const dossierByPly = new Map<number, PositionDossier>(bundle.dossiers.map((d) => [d.ply, d]))
  const verifyAll = (p: ParsedCommentary | null): { narrativeIssues: string[]; moveIssues: Map<number, string[]> } => {
    const narrativeIssues = p?.narrative ? verifyNarrative(bundle.allSanMoves, bundle.dossiers, p.narrative).issues : []
    const moveIssues = new Map<number, string[]>()
    for (const m of p?.moves ?? []) {
      const d = dossierByPly.get(m.ply)
      if (!d) continue
      const r = verifyExplanation(d, m.text)
      if (!r.verified) moveIssues.set(m.ply, r.issues)
    }
    return { narrativeIssues, moveIssues }
  }

  let { narrativeIssues, moveIssues } = verifyAll(parsed)

  if (parsed && (narrativeIssues.length > 0 || moveIssues.size > 0)) {
    const issueLines: string[] = []
    if (narrativeIssues.length) issueLines.push(`- narrative mentioned unverifiable moves: ${narrativeIssues.join('; ')}`)
    for (const [ply, issues] of moveIssues) {
      issueLines.push(`- move comment for ply ${ply} mentioned unverifiable moves: ${issues.join('; ')}`)
    }
    const repairUser = `${user}

Your previous JSON mentioned moves that are not among the given facts:
${issueLines.join('\n')}

Rewrite, using ONLY moves shown in each position's facts above. Output the corrected JSON object only.`
    ctx.setProgress(2, 3, 'Repairing commentary')
    rawText = await chat({ system: SYSTEM_PROMPT, user: repairUser, expectJson: true, temperature: 0.2 })
    const repaired = parseJsonLoose(rawText) as ParsedCommentary | null
    if (repaired) {
      parsed = repaired
      ;({ narrativeIssues, moveIssues } = verifyAll(parsed))
    }
  }

  // Upsert-by-replace: drop previous AI annotations for this game before inserting fresh ones.
  db.prepare(`DELETE FROM annotations WHERE game_id = ? AND kind IN ('move','narrative')`).run(gameId)
  const insert = db.prepare(
    `INSERT INTO annotations (id, game_id, ply, kind, text, model, verified, created_at) VALUES (?,?,?,?,?,?,?,?)`
  )

  let narrativeGenerated = false
  if (parsed?.narrative && narrativeIssues.length === 0) {
    insert.run(uid('ann'), gameId, null, 'narrative', parsed.narrative, model, 1, now())
    narrativeGenerated = true
  }

  const mistakesByPly = new Map(getMistakesForGame(gameId).map((m) => [m.ply, m]))
  let moveCount = 0
  for (const m of parsed?.moves ?? []) {
    if (!dossierByPly.has(m.ply)) continue
    if (!moveIssues.has(m.ply)) {
      insert.run(uid('ann'), gameId, m.ply, 'move', m.text, model, 1, now())
      moveCount++
      continue
    }
    // Verification failed even after repair: fall back to the existing deterministic mistake
    // text (trustworthy by construction) when one exists; otherwise drop rather than show an
    // unverified claim.
    const mistake = mistakesByPly.get(m.ply)
    if (mistake) {
      const fallbackText = [mistake.humanSummary, mistake.whyBad].filter(Boolean).join(' ')
      insert.run(uid('ann'), gameId, m.ply, 'move', fallbackText, 'template', 1, now())
      moveCount++
    }
  }

  ctx.setProgress(3, 3, 'Done')
  broadcast({ type: 'annotations:changed', payload: { gameId } })
  return { moveCount, narrativeGenerated }
}

export function getAnnotationsForGame(gameId: string): GameAnnotations {
  const db = getDb()
  const narrativeRow = db
    .prepare(`SELECT * FROM annotations WHERE game_id = ? AND kind = 'narrative' ORDER BY created_at DESC LIMIT 1`)
    .get(gameId) as Record<string, unknown> | undefined
  const moveRows = db
    .prepare(`SELECT * FROM annotations WHERE game_id = ? AND kind = 'move' ORDER BY ply ASC`)
    .all(gameId) as Array<Record<string, unknown>>
  return {
    narrative: narrativeRow ? rowToAnnotation(narrativeRow) : null,
    moves: moveRows.map(rowToAnnotation)
  }
}
