import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useStore, useAppEvent } from '../store'
import type { TodayPlan, PlanTask, RatingPoint } from '@shared/types'

const ACTION_LABELS: Record<string, string> = {
  tactics: 'Tactics',
  opening: 'Openings',
  endgame: 'Endgames',
  calculation: 'Calculation',
  strategy: 'Strategy',
  'time-management': 'Time management'
}

interface StoredTask {
  id: string
  title: string
}

function planStorageKey(date: string): string {
  return `cms-today-plan-${date}`
}

/** Remember the plan tasks first seen today, so completed ones (now gone from the live plan) still show with a checkmark. */
function loadOrInitStoredTasks(plan: TodayPlan): StoredTask[] {
  const key = planStorageKey(plan.date)
  try {
    const raw = window.localStorage.getItem(key)
    if (raw) {
      const stored = JSON.parse(raw) as StoredTask[]
      // merge in any tasks that appeared later in the day (e.g. a new game to review)
      const known = new Set(stored.map((t) => t.id))
      const merged = [...stored, ...plan.tasks.filter((t) => !known.has(t.id)).map((t) => ({ id: t.id, title: t.title }))]
      if (merged.length !== stored.length) window.localStorage.setItem(key, JSON.stringify(merged))
      return merged
    }
  } catch {
    /* ignore corrupt storage */
  }
  const fresh = plan.tasks.map((t) => ({ id: t.id, title: t.title }))
  try {
    window.localStorage.setItem(key, JSON.stringify(fresh))
  } catch {
    /* storage unavailable — completion tracking just won't persist */
  }
  return fresh
}

function StreakCalendar({ activeDays, streakDays }: { activeDays: string[]; streakDays: number }): React.JSX.Element {
  const active = useMemo(() => new Set(activeDays), [activeDays])
  const todayStr = new Date().toISOString().slice(0, 10)
  const days = useMemo(() => {
    const out: string[] = []
    for (let i = 27; i >= 0; i--) out.push(new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10))
    return out
  }, [])
  return (
    <div>
      <div className="row" style={{ gap: 3, flexWrap: 'wrap' }}>
        {days.map((d) => (
          <span
            key={d}
            title={`${d}${active.has(d) ? ' · trained' : ''}`}
            style={{
              width: 11,
              height: 11,
              borderRadius: 3,
              background: active.has(d) ? 'var(--accent)' : 'var(--bg-panel)',
              border: d === todayStr ? '1px solid var(--accent-strong)' : '1px solid var(--border)'
            }}
          />
        ))}
      </div>
      <div className="muted" style={{ marginTop: 4 }}>
        {streakDays > 0 ? `${streakDays} day streak — keep it going` : 'Train today to start a streak'}
      </div>
    </div>
  )
}

function RatingSparkline({ points }: { points: RatingPoint[] }): React.JSX.Element | null {
  const recent = points.slice(-10)
  if (recent.length < 2) return null
  const width = 100
  const height = 26
  const ratings = recent.map((p) => p.rating)
  const min = Math.min(...ratings)
  const max = Math.max(...ratings)
  const span = max - min || 1
  const line = recent
    .map((p, i) => `${((i / (recent.length - 1)) * (width - 4) + 2).toFixed(1)},${(height - 2 - ((p.rating - min) / span) * (height - 4)).toFixed(1)}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ display: 'block' }}>
      <polyline points={line} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
    </svg>
  )
}

export function Today(): React.JSX.Element {
  const [plan, setPlan] = useState<TodayPlan | null>(null)
  const [storedTasks, setStoredTasks] = useState<StoredTask[]>([])
  const [ratingHistory, setRatingHistory] = useState<RatingPoint[]>([])
  const navigate = useStore((s) => s.navigate)
  const setImportModalOpen = useStore((s) => s.setImportModalOpen)
  const settings = useStore((s) => s.settings)

  const refresh = useCallback(() => {
    void api.plan.today().then((p) => {
      setPlan(p)
      setStoredTasks(loadOrInitStoredTasks(p))
    })
    void api.stats.overview().then((s) => setRatingHistory(s.ratingHistory))
  }, [])
  useEffect(refresh, [refresh])
  useAppEvent(['games:changed', 'exercises:changed', 'repertoire:changed', 'lessons:changed', 'job:completed'], refresh)

  const latestRating = ratingHistory.length > 0 ? ratingHistory[ratingHistory.length - 1].rating : null

  function openTask(task: PlanTask): void {
    switch (task.kind) {
      case 'import':
        setImportModalOpen(true)
        break
      case 'setup-engine':
        navigate({ name: 'engines' })
        break
      case 'exercises':
        navigate({ name: 'exercises' })
        break
      case 'opening-review':
        navigate({ name: 'openings' })
        break
      case 'game-review':
        if (task.targetId) navigate({ name: 'review', gameId: task.targetId })
        else navigate({ name: 'games' })
        break
      case 'lesson':
        if (task.targetId) navigate({ name: 'lesson', lessonId: task.targetId })
        else navigate({ name: 'lessons' })
        break
    }
  }

  if (!plan) return <div className="muted">Loading your plan…</div>

  const firstTask = plan.tasks[0]
  const liveIds = new Set(plan.tasks.map((t) => t.id))
  const completedToday = storedTasks.filter((t) => !liveIds.has(t.id))
  const totalToday = storedTasks.length

  return (
    <div>
      <h1>Today</h1>
      <p className="subtitle">
        {plan.date} · Weekly theme: <b>{plan.weeklyTheme}</b>
      </p>

      <div className="row" style={{ alignItems: 'stretch', marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 2, minWidth: 340 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h3>Today's training plan</h3>
            {totalToday > 0 && (
              <span className="badge green">
                {completedToday.length} of {totalToday} done
              </span>
            )}
          </div>
          {plan.tasks.length === 0 && completedToday.length === 0 && (
            <div className="muted">
              Nothing due right now. Import games or start a lesson to build your plan.
            </div>
          )}
          {plan.tasks.length === 0 && completedToday.length > 0 && (
            <div className="callout success" style={{ marginBottom: 10 }}>
              Today's plan is complete. Nice work — come back tomorrow, or keep training below.
            </div>
          )}
          <div className="col">
            {completedToday.map((t) => (
              <div key={t.id} className="row" style={{ justifyContent: 'space-between', opacity: 0.55 }}>
                <div style={{ textDecoration: 'line-through' }}>✓ {t.title}</div>
              </div>
            ))}
            {plan.tasks.map((task, i) => (
              <div key={task.id} className="row" style={{ justifyContent: 'space-between' }}>
                <div>
                  <div>
                    <b>
                      {i + 1}. {task.title}
                    </b>
                  </div>
                  <div className="muted">{task.detail}</div>
                </div>
                <button className="small" onClick={() => openTask(task)}>
                  Open
                </button>
              </div>
            ))}
          </div>
          {firstTask && (
            <button className="primary" style={{ marginTop: 14 }} onClick={() => openTask(firstTask)}>
              Start today's session
            </button>
          )}
        </div>

        <div className="card" style={{ flex: 1, minWidth: 220 }}>
          <h3>Progress</h3>
          <div className="row" style={{ gap: 24 }}>
            <div>
              <div className="stat-big">{plan.streakDays}</div>
              <div className="muted">day streak</div>
            </div>
            <div className="row clickable" style={{ cursor: 'pointer', gap: 10 }} onClick={() => navigate({ name: 'insights' })}>
              <div>
                <div className="stat-big">
                  {latestRating ?? settings?.ratingCurrent ?? 1500}→{settings?.ratingGoal ?? 1800}
                </div>
                <div className="muted">{latestRating != null ? 'rating (latest game) → goal' : 'rating goal'}</div>
              </div>
              <RatingSparkline points={ratingHistory} />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <StreakCalendar activeDays={plan.activeDays} streakDays={plan.streakDays} />
          </div>
          <div className="col" style={{ marginTop: 12, gap: 4 }}>
            <div className="muted">
              {plan.dueExercises} exercise{plan.dueExercises === 1 ? '' : 's'} due
            </div>
            <div className="muted">
              {plan.dueRepertoire} opening move{plan.dueRepertoire === 1 ? '' : 's'} due
            </div>
            <div className="muted">
              {plan.unreviewedGames} analyzed game{plan.unreviewedGames === 1 ? '' : 's'} to review
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Current weaknesses by impact</h3>
        {plan.weaknesses.length === 0 ? (
          <div className="muted">
            No diagnosis yet. Import and analyze games — mistakes become your personal curriculum.
          </div>
        ) : (
          <div className="col" style={{ gap: 6 }}>
            {plan.weaknesses.map((w) => (
              <div
                key={w.tag}
                className="row clickable"
                style={{ gap: 10, cursor: 'pointer' }}
                onClick={() => navigate({ name: 'exercises', tag: w.tag })}
                title={`Practice ${ACTION_LABELS[w.tag] ?? w.tag} exercises`}
              >
                <span className="badge yellow" style={{ flexShrink: 0 }}>
                  {ACTION_LABELS[w.tag] ?? w.tag}
                </span>
                <span className="muted">{w.evidence}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
