import { chat, parseJsonLoose } from './provider'
import { getDb, uid, now } from '../db'
import { getSettings } from '../settings'
import type { CoachReportRecord, DiagnosisPlanDay, DiagnosisWeakness, TrainingAction } from '@shared/types'

const GAMES_CONSIDERED = 20
const ALLOWED_TAGS: TrainingAction[] = ['tactics', 'opening', 'endgame', 'calculation', 'strategy', 'time-management']

interface CandidateWeakness {
  tag: TrainingAction
  count: number
  totalLossCp: number
  impact: 'low' | 'medium' | 'high'
  evidence: string[]
  linkedExerciseIds: string[]
}

interface MistakeJoinRow {
  ply: number
  eval_loss_cp: number | null
  human_summary: string
  training_action: TrainingAction
  white_name: string | null
  black_name: string | null
  user_color: 'white' | 'black' | 'unknown'
  ended_at: string | null
}

function recentAnalyzedGameIds(): string[] {
  const rows = getDb()
    .prepare(`SELECT id FROM games WHERE analysis_status = 'done' ORDER BY ended_at DESC LIMIT ?`)
    .all(GAMES_CONSIDERED) as Array<{ id: string }>
  return rows.map((r) => r.id)
}

function linkedExerciseIds(tag: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT id FROM exercises WHERE tags_json LIKE ? ORDER BY (due_at IS NULL), due_at ASC LIMIT 3`
    )
    .all(`%"${tag}"%`) as Array<{ id: string }>
  return rows.map((r) => r.id)
}

function computeCandidateWeaknesses(gameIds: string[]): CandidateWeakness[] {
  if (gameIds.length === 0) return []
  const placeholders = gameIds.map(() => '?').join(',')
  const rows = getDb()
    .prepare(
      `SELECT m.ply, m.eval_loss_cp, m.human_summary, m.training_action, g.white_name, g.black_name, g.user_color, g.ended_at
       FROM mistakes m JOIN games g ON g.id = m.game_id
       WHERE m.game_id IN (${placeholders}) AND m.confidence != 'low'
       ORDER BY m.eval_loss_cp DESC`
    )
    .all(...gameIds) as unknown as MistakeJoinRow[]

  const groups = new Map<TrainingAction, { count: number; totalLossCp: number; evidence: string[] }>()
  for (const r of rows) {
    let g = groups.get(r.training_action)
    if (!g) {
      g = { count: 0, totalLossCp: 0, evidence: [] }
      groups.set(r.training_action, g)
    }
    g.count++
    g.totalLossCp += r.eval_loss_cp ?? 0
    if (g.evidence.length < 3) {
      const opponent = (r.user_color === 'white' ? r.black_name : r.white_name) ?? 'opponent'
      const date = r.ended_at ? r.ended_at.slice(0, 10) : 'unknown date'
      g.evidence.push(`vs ${opponent} (${date}), move ${Math.ceil(r.ply / 2)}: ${r.human_summary}`)
    }
  }

  const sorted = [...groups.entries()].sort((a, b) => b[1].totalLossCp - a[1].totalLossCp)
  return sorted.map(([tag, g], i) => ({
    tag,
    count: g.count,
    totalLossCp: g.totalLossCp,
    impact: i === 0 ? 'high' : i <= 2 ? 'medium' : 'low',
    evidence: g.evidence,
    linkedExerciseIds: linkedExerciseIds(tag)
  }))
}

const SYSTEM_PROMPT = `You are The Chess Master Coach. You are given a set of ALREADY-COMPUTED, factual weakness
candidates from a student's real recent games (tag, how often it recurs, and real evidence quotes) — you have no
access to the raw games yourself. Never invent evidence, opponents, or game details; only what is listed exists.
Your job is to prioritize, explain motivatingly, and build a practical 7-day plan from these given facts.`

interface ParsedReport {
  summary?: string
  topWeaknesses?: Array<{ tag: string; recommendedAction: string }>
  sevenDayPlan?: Array<{ day: number; tasks: Array<{ type: string; title: string; minutes: number }> }>
}

function verifyReportShape(
  parsed: unknown,
  candidatesByTag: Map<string, CandidateWeakness>
): { verified: boolean; issues: string[] } {
  const issues: string[] = []
  if (!parsed || typeof parsed !== 'object') return { verified: false, issues: ['Response was not a JSON object.'] }
  const p = parsed as ParsedReport
  if (typeof p.summary !== 'string' || !p.summary.trim()) issues.push('missing "summary"')

  if (!Array.isArray(p.topWeaknesses) || p.topWeaknesses.length === 0) {
    issues.push('missing "topWeaknesses"')
  } else {
    for (const w of p.topWeaknesses) {
      if (!w || typeof w.tag !== 'string' || !candidatesByTag.has(w.tag)) {
        issues.push(`weakness tag "${w?.tag}" is not one of the given candidate tags`)
      }
      if (!w || typeof w.recommendedAction !== 'string' || !w.recommendedAction.trim()) {
        issues.push(`weakness "${w?.tag}" is missing "recommendedAction"`)
      }
    }
  }

  const allowedTaskTypes = new Set<string>([...ALLOWED_TAGS, 'game-review', 'opening-review', 'lesson', 'rest'])
  if (!Array.isArray(p.sevenDayPlan) || p.sevenDayPlan.length === 0) {
    issues.push('missing "sevenDayPlan"')
  } else {
    for (const day of p.sevenDayPlan) {
      if (typeof day.day !== 'number') issues.push('a plan day is missing a numeric "day"')
      if (!Array.isArray(day.tasks)) {
        issues.push(`day ${day.day} is missing "tasks"`)
        continue
      }
      for (const t of day.tasks) {
        if (!t || typeof t.type !== 'string' || !allowedTaskTypes.has(t.type)) {
          issues.push(`task type "${t?.type}" on day ${day.day} is not an allowed type`)
        }
        if (!t || typeof t.minutes !== 'number') issues.push(`a task on day ${day.day} is missing "minutes"`)
      }
    }
  }
  return { verified: issues.length === 0, issues }
}

/** A3 — cross-game weakness diagnosis + 7-day plan, built from deterministic evidence the model can only narrate. */
export async function generateCoachReport(): Promise<CoachReportRecord> {
  const gameIds = recentAnalyzedGameIds()
  const candidates = computeCandidateWeaknesses(gameIds)
  if (candidates.length === 0) {
    throw new Error('No mistakes found in your analyzed games yet — analyze a few games first.')
  }
  const top = candidates.slice(0, 8)
  const candidatesByTag = new Map<string, CandidateWeakness>(top.map((c) => [c.tag, c]))

  const settings = getSettings()
  const model = settings.aiConfig.model || settings.aiConfig.mode

  const candidatesText = top
    .map(
      (c, i) =>
        `${i + 1}. tag: "${c.tag}" — recurs ${c.count} time(s), impact: ${c.impact}\n   evidence:\n${c.evidence.map((e) => `   - ${e}`).join('\n')}`
    )
    .join('\n\n')

  const user = `Games considered: ${gameIds.length} most recently analyzed games.

Candidate weaknesses (already computed from real mistakes — do not add, remove, or rename tags):
${candidatesText}

Task:
- Pick the 3-5 most important weaknesses (prefer high impact and recurring ones). Use the EXACT tag spelling given.
- For each chosen weakness, write "recommendedAction": one or two concrete, motivating sentences on what to do about it.
- Write "summary": 2-3 sentences, an honest but encouraging overall assessment.
- Write "sevenDayPlan": 7 entries (day 1-7), each with 1-3 tasks. Each task has "type" (one of the chosen weakness
  tags, or "game-review", "opening-review", "lesson", "rest"), "title" (short, specific, actionable), and "minutes"
  (realistic, 10-30).

Output a single JSON object: { "summary": string, "topWeaknesses": [{ "tag": string, "recommendedAction": string }],
"sevenDayPlan": [{ "day": number, "tasks": [{ "type": string, "title": string, "minutes": number }] }] }.
Output ONLY the JSON object.`

  let rawText = await chat({ system: SYSTEM_PROMPT, user, expectJson: true, temperature: 0.4 })
  let parsed = parseJsonLoose(rawText) as ParsedReport | null
  let check = verifyReportShape(parsed, candidatesByTag)

  if (!check.verified) {
    const repairUser = `${user}

Your previous JSON had problems:
${check.issues.map((i) => `- ${i}`).join('\n')}

Fix ALL problems, using ONLY the candidate tags listed above. Output the corrected JSON object only.`
    rawText = await chat({ system: SYSTEM_PROMPT, user: repairUser, expectJson: true, temperature: 0.2 })
    parsed = parseJsonLoose(rawText) as ParsedReport | null
    check = verifyReportShape(parsed, candidatesByTag)
  }

  if (!check.verified || !parsed) {
    throw new Error(`Could not produce a valid coach report (${check.issues.slice(0, 3).join('; ')}).`)
  }

  const topWeaknesses: DiagnosisWeakness[] = parsed.topWeaknesses!.map((w) => {
    const cand = candidatesByTag.get(w.tag)!
    return {
      tag: w.tag,
      evidence: cand.evidence,
      impact: cand.impact,
      recommendedAction: w.recommendedAction,
      linkedExerciseIds: cand.linkedExerciseIds
    }
  })
  const sevenDayPlan: DiagnosisPlanDay[] = parsed.sevenDayPlan!.map((d) => ({
    day: d.day,
    tasks: d.tasks.map((t) => ({ type: t.type, title: t.title, minutes: t.minutes }))
  }))

  const record: CoachReportRecord = {
    id: uid('coach'),
    summary: parsed.summary!,
    topWeaknesses,
    sevenDayPlan,
    gamesConsidered: gameIds.length,
    model,
    createdAt: now()
  }

  getDb()
    .prepare(
      `INSERT INTO coach_reports (id, summary, report_json, games_considered, model, created_at) VALUES (?,?,?,?,?,?)`
    )
    .run(
      record.id,
      record.summary,
      JSON.stringify({ topWeaknesses: record.topWeaknesses, sevenDayPlan: record.sevenDayPlan }),
      record.gamesConsidered,
      record.model,
      record.createdAt
    )

  return record
}

export function getLatestCoachReport(): CoachReportRecord | null {
  const row = getDb().prepare(`SELECT * FROM coach_reports ORDER BY created_at DESC LIMIT 1`).get() as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const parsed = JSON.parse(row.report_json as string) as {
    topWeaknesses: DiagnosisWeakness[]
    sevenDayPlan: DiagnosisPlanDay[]
  }
  return {
    id: row.id as string,
    summary: row.summary as string,
    topWeaknesses: parsed.topWeaknesses,
    sevenDayPlan: parsed.sevenDayPlan,
    gamesConsidered: row.games_considered as number,
    model: row.model as string,
    createdAt: row.created_at as string
  }
}
