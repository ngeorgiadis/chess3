import { getDb } from '../db'
import type { Platform } from '@shared/types'

/**
 * Most recent already-imported game for this exact platform+username, used to make repeat
 * imports incremental ("sync new games only") instead of always re-fetching full history. Only
 * consulted as a *default* when the caller hasn't pinned an explicit start — an explicit
 * fromMonth/since always wins, so a deliberate historical re-import still works unchanged.
 */
export function latestSyncedGameEndedAt(platform: Platform, username: string): string | null {
  const row = getDb()
    .prepare(
      `SELECT MAX(ended_at) AS ended_at FROM games
       WHERE source_platform = ? AND (LOWER(white_name) = LOWER(?) OR LOWER(black_name) = LOWER(?))`
    )
    .get(platform, username, username) as { ended_at: string | null } | undefined
  return row?.ended_at ?? null
}
