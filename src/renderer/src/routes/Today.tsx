import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'
import { useStore, useAppEvent } from '../store'
import type { TodayPlan, PlanTask } from '@shared/types'

const ACTION_LABELS: Record<string, string> = {
  tactics: 'Tactics',
  opening: 'Openings',
  endgame: 'Endgames',
  calculation: 'Calculation',
  strategy: 'Strategy',
  'time-management': 'Time management'
}

export function Today(): React.JSX.Element {
  const [plan, setPlan] = useState<TodayPlan | null>(null)
  const navigate = useStore((s) => s.navigate)
  const setImportModalOpen = useStore((s) => s.setImportModalOpen)
  const settings = useStore((s) => s.settings)

  const refresh = useCallback(() => {
    void api.plan.today().then(setPlan)
  }, [])
  useEffect(refresh, [refresh])
  useAppEvent(['games:changed', 'exercises:changed', 'repertoire:changed', 'lessons:changed', 'job:completed'], refresh)

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

  return (
    <div>
      <h1>Today</h1>
      <p className="subtitle">
        {plan.date} · Weekly theme: <b>{plan.weeklyTheme}</b>
      </p>

      <div className="row" style={{ alignItems: 'stretch', marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 2, minWidth: 340 }}>
          <h3>Today's training plan</h3>
          {plan.tasks.length === 0 && (
            <div className="muted">
              Nothing due right now. Import games or start a lesson to build your plan.
            </div>
          )}
          <div className="col">
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
            <div>
              <div className="stat-big">
                {settings?.ratingCurrent ?? 1500}→{settings?.ratingGoal ?? 1800}
              </div>
              <div className="muted">rating goal</div>
            </div>
          </div>
          <div className="col" style={{ marginTop: 12, gap: 4 }}>
            <div className="muted">{plan.dueExercises} exercises due</div>
            <div className="muted">{plan.dueRepertoire} opening moves due</div>
            <div className="muted">{plan.unreviewedGames} analyzed games to review</div>
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
              <div key={w.tag} className="row" style={{ justifyContent: 'space-between' }}>
                <span>
                  <span className="badge yellow">{ACTION_LABELS[w.tag] ?? w.tag}</span>
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
