import { chat } from './provider'
import { buildPositionDossier, formatDossierForPrompt } from './grounding'
import { verifyExplanation } from './verify'
import { getDb, uid, now } from '../db'
import { getSettings } from '../settings'
import type { AnnotationRecord } from '@shared/types'

const SYSTEM_PROMPT = `You are The Chess Master Coach, a patient but demanding chess instructor. You explain a
single chess position to a student using ONLY the facts given to you: the FEN, recent moves, and the engine's
lines. Never invent a move, evaluation, or line that isn't shown to you — if you want to discuss what a side
should do, use one of the given engine lines.

Write 2-4 short sentences: what the position calls for, why the top engine line works, and — if a mistake was
just played — concretely what it allowed and what to check next time. Practical, concrete, board-oriented.
No engine jargon like "depth" or "nodes". Output plain text only, no markdown, no move-number-only lists.`

function findCached(gameId: string, ply: number, model: string): AnnotationRecord | null {
  const row = getDb()
    .prepare(
      `SELECT * FROM annotations WHERE game_id = ? AND ply = ? AND kind = 'explain' AND model = ? ORDER BY created_at DESC LIMIT 1`
    )
    .get(gameId, ply, model) as Record<string, unknown> | undefined
  return row ? rowToAnnotation(row) : null
}

export function rowToAnnotation(row: Record<string, unknown>): AnnotationRecord {
  return {
    id: row.id as string,
    gameId: row.game_id as string,
    ply: (row.ply as number) ?? null,
    kind: row.kind as AnnotationRecord['kind'],
    text: row.text as string,
    model: row.model as string,
    verified: Boolean(row.verified),
    createdAt: row.created_at as string
  }
}

export interface ExplainResult {
  text: string
  verified: boolean
  cached: boolean
  model: string
}

/** A1 — on-demand position explainer, grounded + verified (A4), cached per (game, ply, model). */
export async function explainPosition(gameId: string, ply: number): Promise<ExplainResult> {
  const settings = getSettings()
  const model = settings.aiConfig.model || settings.aiConfig.mode

  const cached = findCached(gameId, ply, model)
  if (cached) return { text: cached.text, verified: cached.verified, cached: true, model }

  const dossier = buildPositionDossier(gameId, ply, settings.ratingCurrent - 150, settings.ratingCurrent + 150)
  if (!dossier) throw new Error('No engine analysis available for this position yet. Analyze the game first.')
  if (dossier.lines.length === 0) throw new Error('No engine lines available for this position.')

  const prompt = formatDossierForPrompt(dossier)
  let text = await chat({ system: SYSTEM_PROMPT, user: prompt, temperature: 0.4 })
  let result = verifyExplanation(dossier, text)

  if (!result.verified) {
    const repairUser = `${prompt}

Your previous explanation mentioned moves that are not among the facts above and could not be verified: ${result.issues.join('; ')}.
Rewrite the explanation using ONLY the recent moves and engine lines listed above. Output only the corrected explanation.`
    text = await chat({ system: SYSTEM_PROMPT, user: repairUser, temperature: 0.2 })
    result = verifyExplanation(dossier, text)
  }

  if (!result.verified) {
    throw new Error(
      'Could not produce a verified explanation for this position (the model kept naming unverifiable moves). Try again, or rely on the engine lines above.'
    )
  }

  const id = uid('ann')
  getDb()
    .prepare(
      `INSERT INTO annotations (id, game_id, ply, kind, text, model, verified, created_at) VALUES (?,?,?,?,?,?,?,?)`
    )
    .run(id, gameId, ply, 'explain', text, model, 1, now())

  return { text, verified: true, cached: false, model }
}
