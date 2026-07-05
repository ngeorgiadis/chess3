import { getDb, uid, now, logEvent } from '../db'
import { broadcast } from '../events'
import type { JobRecord, JobStatus, JobType } from '@shared/types'

export interface JobContext {
  jobId: string
  setProgress: (current: number, total: number, label?: string) => void
  isCancelled: () => boolean
}

type JobHandler = (payload: unknown, ctx: JobContext) => Promise<unknown>

const handlers = new Map<JobType, JobHandler>()
const cancelRequested = new Set<string>()
let running = false

export function registerJobHandler(type: JobType, handler: JobHandler): void {
  handlers.set(type, handler)
}

function rowToJob(row: Record<string, unknown>): JobRecord {
  return {
    id: row.id as string,
    type: row.type as JobType,
    status: row.status as JobStatus,
    priority: row.priority as number,
    payload: JSON.parse(row.payload_json as string),
    progressCurrent: row.progress_current as number,
    progressTotal: row.progress_total as number,
    progressLabel: (row.progress_label as string) ?? null,
    result: row.result_json ? JSON.parse(row.result_json as string) : null,
    error: row.error_json ? JSON.parse(row.error_json as string) : null,
    createdAt: row.created_at as string,
    startedAt: (row.started_at as string) ?? null,
    completedAt: (row.completed_at as string) ?? null
  }
}

export function listJobs(limit = 50): JobRecord[] {
  const rows = getDb()
    .prepare('SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?')
    .all(limit) as Array<Record<string, unknown>>
  return rows.map(rowToJob)
}

export function getJob(id: string): JobRecord | null {
  const row = getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(id) as Record<string, unknown> | undefined
  return row ? rowToJob(row) : null
}

export function enqueueJob(type: JobType, payload: unknown, priority = 0): JobRecord {
  const id = uid('job')
  getDb()
    .prepare(
      'INSERT INTO jobs (id, type, status, priority, payload_json, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(id, type, 'pending', priority, JSON.stringify(payload), now())
  const job = getJob(id)!
  broadcast({ type: 'job:created', payload: job })
  void tick()
  return job
}

export function cancelJob(id: string): void {
  cancelRequested.add(id)
  const job = getJob(id)
  if (job && job.status === 'pending') {
    finishJob(id, 'cancelled')
  }
}

function updateJob(id: string, fields: Record<string, string | number | null>): void {
  const keys = Object.keys(fields)
  const sql = `UPDATE jobs SET ${keys.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`
  getDb().prepare(sql).run(...keys.map((k) => fields[k]), id)
}

function finishJob(
  id: string,
  status: JobStatus,
  error?: { message: string; detail?: string; retryable?: boolean },
  result?: unknown
): void {
  updateJob(id, {
    status,
    completed_at: now(),
    result_json: result !== undefined ? JSON.stringify(result) : null,
    error_json: error ? JSON.stringify(error) : null
  })
  cancelRequested.delete(id)
  const job = getJob(id)!
  if (status === 'failed') {
    logEvent('job.failed', 'job', id, { error })
    broadcast({ type: 'job:failed', payload: job })
  } else {
    broadcast({ type: 'job:completed', payload: job })
  }
}

/** On startup: re-queue interrupted analysis jobs (safe to re-run), fail the rest. */
export function recoverJobs(): void {
  const rows = getDb().prepare("SELECT id, type FROM jobs WHERE status = 'running'").all() as Array<{
    id: string
    type: string
  }>
  for (const r of rows) {
    if (r.type === 'analyze-game') {
      updateJob(r.id, { status: 'pending', started_at: null })
    } else {
      finishJob(r.id, 'failed', { message: 'Interrupted by app shutdown', retryable: true })
    }
  }
}

export async function tick(): Promise<void> {
  if (running) return
  running = true
  try {
    for (;;) {
      const row = getDb()
        .prepare("SELECT * FROM jobs WHERE status = 'pending' ORDER BY priority DESC, created_at ASC LIMIT 1")
        .get() as Record<string, unknown> | undefined
      if (!row) break
      const job = rowToJob(row)
      const handler = handlers.get(job.type)
      if (!handler) {
        finishJob(job.id, 'failed', { message: `No handler for job type ${job.type}`, retryable: false })
        continue
      }
      updateJob(job.id, { status: 'running', started_at: now() })
      broadcast({ type: 'job:progress', payload: getJob(job.id) })

      let lastEmit = 0
      const ctx: JobContext = {
        jobId: job.id,
        setProgress: (current, total, label) => {
          updateJob(job.id, {
            progress_current: current,
            progress_total: total,
            progress_label: label ?? null
          })
          const t = Date.now()
          if (t - lastEmit > 150) {
            lastEmit = t
            broadcast({ type: 'job:progress', payload: getJob(job.id) })
          }
        },
        isCancelled: () => cancelRequested.has(job.id)
      }

      try {
        const result = await handler(job.payload, ctx)
        finishJob(job.id, ctx.isCancelled() ? 'cancelled' : 'completed', undefined, result)
      } catch (e) {
        const err = e as Error
        finishJob(job.id, ctx.isCancelled() ? 'cancelled' : 'failed', {
          message: err.message || 'Job failed',
          detail: err.stack,
          retryable: true
        })
      }
    }
  } finally {
    running = false
  }
}
