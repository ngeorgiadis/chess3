import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'
import { useStore, useAppEvent } from '../store'
import type { CourseRecord, LessonProgressRecord, LessonRecord } from '@shared/types'
import type { LessonJson } from '../lesson-types'

interface CourseJson {
  title: string
  summary: string
  modules: Array<{ id: string; title: string; summary: string; lessonRefs: string[] }>
}

export function Lessons(): React.JSX.Element {
  const navigate = useStore((s) => s.navigate)
  const [lessons, setLessons] = useState<LessonRecord[]>([])
  const [courses, setCourses] = useState<CourseRecord[]>([])
  const [progress, setProgress] = useState<Map<string, LessonProgressRecord>>(new Map())

  const refresh = useCallback(() => {
    void api.lessons.list().then(setLessons)
    void api.courses.list().then(setCourses)
    void api.lessons.allProgress().then((all) => setProgress(new Map(all.map((p) => [p.lessonId, p]))))
  }, [])
  useEffect(refresh, [refresh])
  useAppEvent(['lessons:changed'], refresh)

  const lessonsById = new Map(lessons.map((l) => [l.id, l]))

  function statusBadge(lessonId: string): React.JSX.Element {
    const p = progress.get(lessonId)
    if (!p || p.status === 'not-started') return <span className="badge">new</span>
    if (p.status === 'completed') return <span className="badge green">completed</span>
    return <span className="badge blue">in progress</span>
  }

  return (
    <div>
      <h1>Lessons</h1>
      <p className="subtitle">Structured courses and lessons. Every lesson leads to moves on a board.</p>

      {courses.map((course) => {
        const cj = course.courseJson as CourseJson
        return (
          <div key={course.id} className="card" style={{ marginBottom: 16 }}>
            <h3>{cj.title}</h3>
            <p className="muted">{cj.summary}</p>
            {cj.modules.map((mod) => (
              <div key={mod.id} style={{ marginBottom: 10 }}>
                <b>{mod.title}</b> <span className="muted">— {mod.summary}</span>
                <div className="col" style={{ gap: 4, marginTop: 6 }}>
                  {mod.lessonRefs.map((ref) => {
                    const lesson = lessonsById.get(ref)
                    return (
                      <div key={ref} className="row" style={{ justifyContent: 'space-between' }}>
                        <span className={lesson ? '' : 'muted'}>
                          {lesson ? lesson.title : `${ref} (not yet in library)`}
                        </span>
                        {lesson ? (
                          <span className="row" style={{ gap: 8 }}>
                            {statusBadge(lesson.id)}
                            <button className="small primary" onClick={() => navigate({ name: 'lesson', lessonId: lesson.id })}>
                              Study
                            </button>
                          </span>
                        ) : (
                          <span className="badge">planned</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )
      })}

      <div className="card">
        <h3>Lesson library</h3>
        {lessons.length === 0 ? (
          <p className="muted">No lessons yet. Generate one in AI Studio or import lesson JSON.</p>
        ) : (
          <table className="data">
            <thead>
              <tr>
                <th>Title</th>
                <th>Rating band</th>
                <th>Minutes</th>
                <th>Created by</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((l) => {
                const lj = l.lessonJson as LessonJson
                return (
                  <tr key={l.id}>
                    <td>{l.title}</td>
                    <td className="muted">
                      {l.targetRatingMin}–{l.targetRatingMax}
                    </td>
                    <td className="muted">{lj.estimatedMinutes}</td>
                    <td className="muted">{l.createdBy}</td>
                    <td>{statusBadge(l.id)}</td>
                    <td>
                      <button className="small primary" onClick={() => navigate({ name: 'lesson', lessonId: l.id })}>
                        Study
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
