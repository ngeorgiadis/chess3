import { useEffect, useState } from 'react'
import { api } from '../api'
import { useStore } from '../store'
import { LessonView } from '../components/LessonView'
import type { LessonProgressRecord, LessonRecord } from '@shared/types'
import type { LessonJson } from '../lesson-types'

export function LessonPlayer({ lessonId }: { lessonId: string }): React.JSX.Element {
  const navigate = useStore((s) => s.navigate)
  const [lesson, setLesson] = useState<LessonRecord | null>(null)
  const [progress, setProgress] = useState<LessonProgressRecord | null>(null)

  useEffect(() => {
    void api.lessons.get(lessonId).then(setLesson)
    void api.lessons.getProgress(lessonId).then(setProgress)
  }, [lessonId])

  if (!lesson || !progress) return <div className="muted">Loading lesson…</div>
  const lj = lesson.lessonJson as LessonJson

  function saveProgress(patch: Partial<LessonProgressRecord>): void {
    const next = { ...progress!, ...patch }
    setProgress(next)
    void api.lessons.setProgress(next)
  }

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1>{lj.title}</h1>
          <p className="subtitle">
            {lj.summary} · ~{lj.estimatedMinutes} min · rating {lj.targetRating.min}–{lj.targetRating.max}
          </p>
        </div>
        <button onClick={() => navigate({ name: 'lessons' })}>← Lessons</button>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3>Objectives</h3>
        <ul style={{ margin: 0 }}>
          {lj.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      <LessonView
        lesson={lj}
        completedStepIds={progress.completedStepIds}
        onStepComplete={(stepId) => {
          const ids = progress.completedStepIds.includes(stepId)
            ? progress.completedStepIds
            : [...progress.completedStepIds, stepId]
          saveProgress({
            completedStepIds: ids,
            status: 'in-progress',
            lessonId
          })
        }}
        onFinished={() => {
          saveProgress({ status: 'completed', lessonId })
          navigate({ name: 'lessons' })
        }}
      />
    </div>
  )
}
