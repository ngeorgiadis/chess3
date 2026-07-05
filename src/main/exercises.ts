import { getDb, uid, now, logEvent } from './db'
import { broadcast } from './events'
import type { ExerciseRecord } from '@shared/types'

function rowToExercise(row: Record<string, unknown>): ExerciseRecord {
  return {
    id: row.id as string,
    originType: row.origin_type as ExerciseRecord['originType'],
    originId: (row.origin_id as string) ?? null,
    type: row.type as string,
    title: row.title as string,
    prompt: row.prompt as string,
    fen: row.fen as string,
    solution: JSON.parse(row.solution_json as string),
    hints: JSON.parse(row.hints_json as string),
    difficulty: row.difficulty as number,
    tags: JSON.parse(row.tags_json as string),
    dueAt: (row.due_at as string) ?? null,
    intervalDays: row.interval_days as number,
    ease: row.ease as number,
    createdAt: row.created_at as string
  }
}

export function listExercises(limit = 200): ExerciseRecord[] {
  const rows = getDb()
    .prepare('SELECT * FROM exercises ORDER BY created_at DESC LIMIT ?')
    .all(limit) as Array<Record<string, unknown>>
  return rows.map(rowToExercise)
}

export function dueExercises(limit = 50): ExerciseRecord[] {
  const rows = getDb()
    .prepare('SELECT * FROM exercises WHERE due_at IS NOT NULL AND due_at <= ? ORDER BY due_at LIMIT ?')
    .all(now(), limit) as Array<Record<string, unknown>>
  return rows.map(rowToExercise)
}

export function countDueExercises(): number {
  return (
    getDb().prepare('SELECT COUNT(*) AS c FROM exercises WHERE due_at IS NOT NULL AND due_at <= ?').get(now()) as {
      c: number
    }
  ).c
}

/** SM-2-style scheduling: correct answers grow the interval, wrong answers reset it. */
export function attemptExercise(id: string, correct: boolean): ExerciseRecord {
  const db = getDb()
  const row = db.prepare('SELECT * FROM exercises WHERE id = ?').get(id) as Record<string, unknown> | undefined
  if (!row) throw new Error('Exercise not found')
  const ex = rowToExercise(row)

  let ease = ex.ease
  let intervalDays: number
  if (correct) {
    ease = Math.min(3.0, ease + 0.05)
    intervalDays = ex.intervalDays <= 0 ? 1 : Math.round(ex.intervalDays * ease * 10) / 10
  } else {
    ease = Math.max(1.3, ease - 0.2)
    intervalDays = 0
  }
  const dueAt = correct
    ? new Date(Date.now() + intervalDays * 86_400_000).toISOString()
    : new Date(Date.now() + 10 * 60_000).toISOString() // retry in 10 minutes

  db.prepare(
    'UPDATE exercises SET ease = ?, interval_days = ?, due_at = ?, attempts = attempts + 1, correct = correct + ? WHERE id = ?'
  ).run(ease, intervalDays, dueAt, correct ? 1 : 0, id)
  logEvent('exercise.completed', 'exercise', id, { correct })
  broadcast({ type: 'exercises:changed', payload: null })
  return rowToExercise(db.prepare('SELECT * FROM exercises WHERE id = ?').get(id) as Record<string, unknown>)
}

/** One-click "convert position to exercise" from the review screen. */
export function createExerciseFromMistake(mistakeId: string): ExerciseRecord {
  const db = getDb()
  const existing = db
    .prepare("SELECT * FROM exercises WHERE origin_type = 'mistake' AND origin_id = ?")
    .get(mistakeId) as Record<string, unknown> | undefined
  if (existing) return rowToExercise(existing)

  const mistake = db.prepare('SELECT * FROM mistakes WHERE id = ?').get(mistakeId) as
    | Record<string, unknown>
    | undefined
  if (!mistake) throw new Error('Mistake not found')
  const move = db
    .prepare('SELECT * FROM moves WHERE game_id = ? AND ply = ?')
    .get(mistake.game_id as string, mistake.ply as number) as Record<string, unknown> | undefined
  if (!move) throw new Error('Move not found for mistake')

  // Pull the engine PV from stored analysis at the position before the mistake
  const analysis = db
    .prepare('SELECT result_json FROM engine_analysis WHERE game_id = ? AND ply = ? ORDER BY created_at DESC LIMIT 1')
    .get(mistake.game_id as string, (mistake.ply as number) - 1) as { result_json: string } | undefined
  let moves: Array<{ moveUci: string; moveSan?: string }> = []
  if (analysis) {
    const best = JSON.parse(analysis.result_json).multiPv?.[0]
    if (best) {
      moves = (best.pvUci as string[]).slice(0, 3).map((u: string, i: number) => ({
        moveUci: u,
        moveSan: best.pvSan?.[i]
      }))
    }
  }
  if (moves.length === 0 && mistake.better_move_uci) {
    moves = [{ moveUci: mistake.better_move_uci as string, moveSan: (mistake.better_move_san as string) ?? undefined }]
  }
  if (moves.length === 0) throw new Error('No solution line available for this mistake')

  const id = uid('ex')
  const sideToMove = (move.color as string) === 'white' ? 'White' : 'Black'
  db.prepare(
    `INSERT INTO exercises (id, origin_type, origin_id, type, title, prompt, fen, solution_json, hints_json, difficulty, tags_json, due_at, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(
    id,
    'mistake',
    mistakeId,
    'best_move',
    'Position from your game',
    `${sideToMove} to move. Find the move you missed (you played ${move.san}).`,
    move.fen_before as string,
    JSON.stringify({
      moves,
      explanation: `${mistake.human_summary} ${mistake.why_bad ?? ''}`.trim()
    }),
    JSON.stringify(['Look for forcing moves: checks, captures, threats.']),
    3,
    mistake.theme_tags_json as string,
    now(),
    now()
  )
  broadcast({ type: 'exercises:changed', payload: null })
  return rowToExercise(db.prepare('SELECT * FROM exercises WHERE id = ?').get(id) as Record<string, unknown>)
}
