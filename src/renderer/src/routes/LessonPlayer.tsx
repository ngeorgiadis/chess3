import { useEffect, useState } from 'react'
import { api } from '../api'
import { useStore } from '../store'
import { LessonView } from '../components/LessonView'
import type { CourseRecord, LessonProgressRecord, LessonRecord } from '@shared/types'
import type { LessonJson } from '../lesson-types'

interface CourseJson {
  title: string
  summary: string
  modules: Array<{ id: string; title: string; summary: string; lessonRefs: string[] }>
}

/** The next lesson id after `lessonId` in whichever course module contains it, if any. */
function findNextInCourse(lessonId: string, courses: CourseRecord[]): string | null {
  for (const course of courses) {
    const cj = course.courseJson as CourseJson
    for (const mod of cj.modules) {
      const idx = mod.lessonRefs.indexOf(lessonId)
      if (idx >= 0 && idx < mod.lessonRefs.length - 1) return mod.lessonRefs[idx + 1]
    }
  }
  return null
}

export function LessonPlayer({ lessonId }: { lessonId: string }): React.JSX.Element {
  const navigate = useStore((s) => s.navigate)
  const [lesson, setLesson] = useState<LessonRecord | null>(null)
  const [progress, setProgress] = useState<LessonProgressRecord | null>(null)
  const [courses, setCourses] = useState<CourseRecord[]>([])
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setFinished(false)
    void api.lessons.get(lessonId).then(setLesson)
    void api.lessons.getProgress(lessonId).then(setProgress)
    void api.courses.list().then(setCourses)
  }, [lessonId])

  if (!lesson || !progress) return <div className="muted">Loading lesson…</div>
  const lj = lesson.lessonJson as LessonJson

  function saveProgress(patch: Partial<LessonProgressRecord>): void {
    const next = { ...progress!, ...patch }
    setProgress(next)
    void api.lessons.setProgress(next)
  }

  if (finished) {
    const nextLessonId = findNextInCourse(lessonId, courses)
    return (
      <div>
        <div className="card" style={{ textAlign: 'center', padding: 36 }}>
          <h2 style={{ marginTop: 0 }}>Lesson complete</h2>
          <p className="muted">
            {lj.title} · {lj.steps.length} step{lj.steps.length === 1 ? '' : 's'}
            {lj.exercises.length > 0 ? ` · ${lj.exercises.length} exercise${lj.exercises.length === 1 ? '' : 's'}` : ''}
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 8, marginTop: 14 }}>
            {nextLessonId && (
              <button className="primary" onClick={() => navigate({ name: 'lesson', lessonId: nextLessonId })}>
                Next lesson →
              </button>
            )}
            <button onClick={() => navigate({ name: 'lessons' })}>Back to Lessons</button>
          </div>
        </div>
      </div>
    )
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
          setFinished(true)
        }}
      />
    </div>
  )
}
