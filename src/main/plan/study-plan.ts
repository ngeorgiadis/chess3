import { getDb, now } from '../db'
import { countDueExercises } from '../exercises'
import { countDueNodes } from '../repertoire'
import { listLessons, listAllProgress } from '../lessons/store'
import { listEngines } from '../engines/store'
import type { PlanTask, TodayPlan } from '@shared/types'

const ACTION_LABELS: Record<string, string> = {
  tactics: 'Tactical awareness',
  opening: 'Opening preparation',
  endgame: 'Endgame technique',
  calculation: 'Calculation depth',
  strategy: 'Strategic judgment',
  'time-management': 'Time management'
}

function trainingDays(): string[] {
  const rows = getDb()
    .prepare(
      `SELECT DISTINCT substr(created_at, 1, 10) AS day FROM app_events
       WHERE event_type IN ('exercise.completed', 'game.analyzed', 'lesson.published') ORDER BY day DESC LIMIT 60`
    )
    .all() as Array<{ day: string }>
  return rows.map((r) => r.day)
}

/** Consecutive days (ending today or yesterday) with any training event. */
function computeStreak(days: string[]): number {
  if (days.length === 0) return 0
  const today = new Date()
  let streak = 0
  for (let i = 0; i < 60; i++) {
    const d = new Date(today.getTime() - i * 86_400_000).toISOString().slice(0, 10)
    if (days.includes(d)) streak++
    else if (i > 0) break // allow "today not yet trained"
  }
  return streak
}

/** Last 28 days (oldest first) with a flag for whether any training happened that day. */
function computeActiveDays(days: string[]): string[] {
  const today = new Date()
  const out: string[] = []
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86_400_000).toISOString().slice(0, 10)
    if (days.includes(d)) out.push(d)
  }
  return out
}

export function computeTodayPlan(): TodayPlan {
  const db = getDb()
  const tasks: PlanTask[] = []

  const gameCount = (db.prepare('SELECT COUNT(*) AS c FROM games').get() as { c: number }).c
  const engineCount = listEngines().filter((e) => e.status === 'available').length
  const dueEx = countDueExercises()
  const dueRep = countDueNodes()
  const unreviewed = (
    db.prepare("SELECT COUNT(*) AS c FROM games WHERE analysis_status = 'done'").get() as { c: number }
  ).c
  const unanalyzed = (
    db
      .prepare("SELECT COUNT(*) AS c FROM games WHERE analysis_status = 'none' AND ongoing = 0 AND variant = 'chess'")
      .get() as { c: number }
  ).c

  // Weakness diagnosis from recent mistakes (last 30 days)
  const since = new Date(Date.now() - 30 * 86_400_000).toISOString()
  const weaknessRows = db
    .prepare(
      `SELECT training_action AS tag, COUNT(*) AS count, SUM(COALESCE(eval_loss_cp, 0)) AS impact
       FROM mistakes WHERE created_at >= ? GROUP BY training_action ORDER BY impact DESC LIMIT 5`
    )
    .all(since) as Array<{ tag: string; count: number; impact: number }>
  const weaknesses = weaknessRows.map((w) => {
    const avgPawns = w.count > 0 ? w.impact / 100 / w.count : 0
    return {
      tag: w.tag,
      count: w.count,
      evidence: `${w.count} mistake${w.count === 1 ? '' : 's'} across your recent games, avg ${avgPawns.toFixed(1)} pawns each`
    }
  })

  // Build 3–5 tasks in priority order (01_APP_SPEC.md §2.8)
  if (gameCount === 0) {
    tasks.push({
      id: 'task-import',
      kind: 'import',
      title: 'Import your games',
      detail: 'Import your recent Chess.com or Lichess games to build a personalized training plan.'
    })
  }
  if (engineCount === 0) {
    tasks.push({
      id: 'task-engine',
      kind: 'setup-engine',
      title: 'Add a UCI engine',
      detail: 'Add a local UCI engine (e.g. Stockfish) so your games can be analyzed on this machine.'
    })
  }
  if (dueEx > 0) {
    tasks.push({
      id: 'task-exercises',
      kind: 'exercises',
      title: `Solve ${Math.min(dueEx, 10)} due exercises`,
      detail: 'Personalized puzzles from your own mistakes, scheduled by spaced repetition.',
      count: Math.min(dueEx, 10)
    })
  }
  if (dueRep > 0) {
    tasks.push({
      id: 'task-openings',
      kind: 'opening-review',
      title: `Review ${Math.min(dueRep, 10)} opening moves`,
      detail: 'Repertoire lines due for recall practice today.',
      count: Math.min(dueRep, 10)
    })
  }
  if (unanalyzed > 0 && engineCount > 0 && tasks.length < 5) {
    tasks.push({
      id: 'task-analyze',
      kind: 'game-review',
      title: `Analyze ${Math.min(unanalyzed, 5)} recent games`,
      detail: 'Queue engine analysis so mistakes become training material.',
      count: Math.min(unanalyzed, 5)
    })
  }
  if (unreviewed > 0 && tasks.length < 5) {
    const nextGame = db
      .prepare("SELECT id FROM games WHERE analysis_status = 'done' ORDER BY ended_at DESC LIMIT 1")
      .get() as { id: string } | undefined
    tasks.push({
      id: 'task-review',
      kind: 'game-review',
      title: 'Review one analyzed game',
      detail: 'Walk through the critical moments of a recent game (target: under 12 minutes).',
      targetId: nextGame?.id
    })
  }
  if (tasks.length < 5) {
    const progress = new Map(listAllProgress().map((p) => [p.lessonId, p.status]))
    const nextLesson = listLessons().find((l) => progress.get(l.id) !== 'completed')
    if (nextLesson) {
      tasks.push({
        id: 'task-lesson',
        kind: 'lesson',
        title: `Continue lesson: ${nextLesson.title}`,
        detail: 'Structured study with board examples and exercises.',
        targetId: nextLesson.id
      })
    }
  }

  const weeklyTheme = weaknesses[0]
    ? `${ACTION_LABELS[weaknesses[0].tag] ?? weaknesses[0].tag}: your biggest leak this month`
    : 'Build the habit: import, analyze, practice'

  const days = trainingDays()
  return {
    date: now().slice(0, 10),
    weeklyTheme,
    tasks: tasks.slice(0, 5),
    weaknesses,
    streakDays: computeStreak(days),
    activeDays: computeActiveDays(days),
    dueExercises: dueEx,
    dueRepertoire: dueRep,
    unreviewedGames: unreviewed
  }
}
