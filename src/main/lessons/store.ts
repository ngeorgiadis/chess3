import fs from 'node:fs'
import path from 'node:path'
import { getDb, uid, now, logEvent } from '../db'
import { validateLesson, validateCourse } from './validate'
import { broadcast } from '../events'
import type {
  CourseRecord,
  LessonProgressRecord,
  LessonRecord,
  LessonValidationReport
} from '@shared/types'

function rowToLesson(row: Record<string, unknown>): LessonRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    version: row.version as string,
    targetRatingMin: (row.target_rating_min as number) ?? null,
    targetRatingMax: (row.target_rating_max as number) ?? null,
    lessonJson: JSON.parse(row.lesson_json as string),
    validationReport: row.validation_report_json ? JSON.parse(row.validation_report_json as string) : null,
    createdBy: row.created_by as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string
  }
}

export function listLessons(): LessonRecord[] {
  const rows = getDb().prepare('SELECT * FROM lessons ORDER BY created_at').all() as Array<Record<string, unknown>>
  return rows.map(rowToLesson)
}

export function getLesson(idOrSlug: string): LessonRecord | null {
  const row = getDb().prepare('SELECT * FROM lessons WHERE id = ? OR slug = ?').get(idOrSlug, idOrSlug) as
    | Record<string, unknown>
    | undefined
  return row ? rowToLesson(row) : null
}

export function publishLesson(
  lessonJson: unknown,
  createdBy: 'user' | 'ai' | 'seed'
): { lesson: LessonRecord | null; report: LessonValidationReport } {
  const report = validateLesson(lessonJson)
  if (!report.schemaValid || !report.chessValid) {
    return { lesson: null, report }
  }
  const l = lessonJson as {
    id: string
    slug: string
    title: string
    schemaVersion: string
    targetRating: { min: number; max: number }
  }
  const db = getDb()
  db.prepare(
    `INSERT INTO lessons (id, slug, title, version, target_rating_min, target_rating_max, lesson_json, validation_report_json, created_by, created_at, updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?)
     ON CONFLICT(id) DO UPDATE SET
       slug = excluded.slug, title = excluded.title, version = excluded.version,
       target_rating_min = excluded.target_rating_min, target_rating_max = excluded.target_rating_max,
       lesson_json = excluded.lesson_json, validation_report_json = excluded.validation_report_json,
       updated_at = excluded.updated_at`
  ).run(
    l.id,
    l.slug,
    l.title,
    l.schemaVersion,
    l.targetRating.min,
    l.targetRating.max,
    JSON.stringify(lessonJson),
    JSON.stringify(report),
    createdBy,
    now(),
    now()
  )
  logEvent('lesson.published', 'lesson', l.id, { createdBy })
  broadcast({ type: 'lessons:changed', payload: null })
  return { lesson: getLesson(l.id), report }
}

export function listCourses(): CourseRecord[] {
  const rows = getDb().prepare('SELECT * FROM courses ORDER BY created_at').all() as Array<Record<string, unknown>>
  return rows.map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    courseJson: JSON.parse(row.course_json as string),
    createdAt: row.created_at as string
  }))
}

export function getProgress(lessonId: string): LessonProgressRecord {
  const row = getDb().prepare('SELECT * FROM lesson_progress WHERE lesson_id = ?').get(lessonId) as
    | Record<string, unknown>
    | undefined
  if (!row) {
    return { lessonId, status: 'not-started', completedStepIds: [], score: null, updatedAt: now() }
  }
  return {
    lessonId,
    status: row.status as LessonProgressRecord['status'],
    completedStepIds: JSON.parse(row.completed_step_ids_json as string),
    score: (row.score as number) ?? null,
    updatedAt: row.updated_at as string
  }
}

export function setProgress(progress: LessonProgressRecord): LessonProgressRecord {
  getDb()
    .prepare(
      `INSERT INTO lesson_progress (lesson_id, status, completed_step_ids_json, score, updated_at) VALUES (?,?,?,?,?)
       ON CONFLICT(lesson_id) DO UPDATE SET status = excluded.status,
         completed_step_ids_json = excluded.completed_step_ids_json, score = excluded.score, updated_at = excluded.updated_at`
    )
    .run(progress.lessonId, progress.status, JSON.stringify(progress.completedStepIds), progress.score, now())
  return getProgress(progress.lessonId)
}

export function listAllProgress(): LessonProgressRecord[] {
  const rows = getDb().prepare('SELECT * FROM lesson_progress').all() as Array<Record<string, unknown>>
  return rows.map((row) => ({
    lessonId: row.lesson_id as string,
    status: row.status as LessonProgressRecord['status'],
    completedStepIds: JSON.parse(row.completed_step_ids_json as string),
    score: (row.score as number) ?? null,
    updatedAt: row.updated_at as string
  }))
}

/** Seed the example lesson and course on first run (10_ACCEPTANCE_TESTS.md lesson tests). */
export function seedContent(resourcesDir: string): void {
  const db = getDb()
  const lessonCount = (db.prepare('SELECT COUNT(*) AS c FROM lessons').get() as { c: number }).c
  if (lessonCount > 0) return

  const seedDir = path.join(resourcesDir, 'seed')
  if (!fs.existsSync(seedDir)) return

  for (const file of fs.readdirSync(seedDir)) {
    const full = path.join(seedDir, file)
    try {
      const json = JSON.parse(fs.readFileSync(full, 'utf8'))
      if (file.endsWith('.lesson.json')) {
        const { lesson, report } = publishLesson(json, 'seed')
        if (!lesson) console.error(`Seed lesson ${file} failed validation:`, report.errors)
      } else if (file.endsWith('.course.json')) {
        const check = validateCourse(json)
        if (!check.valid) {
          console.error(`Seed course ${file} failed validation:`, check.errors)
          continue
        }
        db.prepare(
          'INSERT INTO courses (id, slug, title, course_json, created_at) VALUES (?,?,?,?,?) ON CONFLICT(id) DO NOTHING'
        ).run(json.id, json.slug, json.title, JSON.stringify(json), now())
      }
    } catch (e) {
      console.error(`Failed to seed ${file}:`, e)
    }
  }
}
