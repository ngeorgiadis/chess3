import { getDb } from './db'
import { getSettings } from './settings'
import { broadcast } from './events'
import { reclassifyGame } from './engines/analysis'

export interface BackfillResult {
  updatedGames: number
  reclassifiedGames: number
}

/**
 * Re-detect user_color for games imported before the player's identity was known
 * (e.g. a username typed into the import modal that wasn't yet saved to settings).
 * Games that already have engine analysis are reclassified from stored evaluations
 * — no engine re-run needed.
 */
export function backfillUserColors(): BackfillResult {
  const db = getDb()
  const settings = getSettings()
  const names = [settings.chesscomUsername, settings.lichessUsername, settings.displayName]
    .filter(Boolean)
    .map((n) => n.toLowerCase())
  if (names.length === 0) return { updatedGames: 0, reclassifiedGames: 0 }

  const rows = db
    .prepare("SELECT id, white_name, black_name, analysis_status FROM games WHERE user_color = 'unknown'")
    .all() as Array<{ id: string; white_name: string | null; black_name: string | null; analysis_status: string }>

  let updated = 0
  let reclassified = 0
  for (const row of rows) {
    const white = (row.white_name ?? '').toLowerCase()
    const black = (row.black_name ?? '').toLowerCase()
    let color: 'white' | 'black' | null = null
    if (names.includes(white)) color = 'white'
    else if (names.includes(black)) color = 'black'
    if (!color) continue

    db.prepare('UPDATE games SET user_color = ? WHERE id = ?').run(color, row.id)
    updated++
    if (row.analysis_status === 'done') {
      try {
        reclassifyGame(row.id)
        reclassified++
      } catch {
        // leave classification as-is; the user can re-analyze manually
      }
    }
  }
  if (updated > 0) broadcast({ type: 'games:changed', payload: null })
  return { updatedGames: updated, reclassifiedGames: reclassified }
}

/**
 * One-time catch-up for games analyzed before per-side accuracy was tracked: recompute
 * from the engine evaluations already stored, no engine re-run needed.
 */
export function backfillMissingAccuracy(): number {
  const db = getDb()
  const rows = db
    .prepare(
      "SELECT id FROM games WHERE analysis_status = 'done' AND accuracy_white IS NULL AND accuracy_black IS NULL"
    )
    .all() as Array<{ id: string }>
  let fixed = 0
  for (const row of rows) {
    try {
      reclassifyGame(row.id)
      fixed++
    } catch {
      // leave as-is; the user can re-analyze manually
    }
  }
  if (fixed > 0) broadcast({ type: 'games:changed', payload: null })
  return fixed
}
