import { getDb } from './db'
import type { AppSettings } from '@shared/types'

const DEFAULTS: AppSettings = {
  displayName: '',
  chesscomUsername: '',
  lichessUsername: '',
  ratingCurrent: 1500,
  ratingGoal: 1800,
  preferredTimeControls: ['rapid', 'blitz'],
  userAgentContact: '',
  aiConfig: { mode: 'manual', baseUrl: 'https://api.openai.com/v1', apiKey: '', model: '' },
  defaultProfileId: null,
  boardTheme: 'green',
  pieceSet: 'standard'
}

export function getSettings(): AppSettings {
  const rows = getDb().prepare('SELECT key, value_json FROM settings').all() as Array<{
    key: string
    value_json: string
  }>
  const stored: Record<string, unknown> = {}
  for (const r of rows) {
    try {
      stored[r.key] = JSON.parse(r.value_json)
    } catch {
      /* ignore corrupt values, fall back to default */
    }
  }
  return { ...DEFAULTS, ...stored, aiConfig: { ...DEFAULTS.aiConfig, ...(stored.aiConfig as object | undefined) } }
}

export function setSettings(patch: Partial<AppSettings>): AppSettings {
  const db = getDb()
  const stmt = db.prepare('INSERT INTO settings (key, value_json) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json')
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue
    stmt.run(key, JSON.stringify(value))
  }
  return getSettings()
}

export function userAgent(): string {
  const contact = getSettings().userAgentContact
  return `ChessMentorStudio/0.1 (+local-desktop-app${contact ? `; contact: ${contact}` : ''})`
}
