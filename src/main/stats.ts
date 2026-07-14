import { getDb } from './db'
import type { StatsOverview, ResultsSplit, OpeningStat, RatingPoint, AccuracyPoint } from '@shared/types'

const RATING_HISTORY_LIMIT = 300
const OPENINGS_TOP_N = 15

function outcome(userColor: 'white' | 'black', result: string | null): 'win' | 'loss' | 'draw' | null {
  if (!result) return null
  if (result === '1/2-1/2') return 'draw'
  if ((userColor === 'white' && result === '1-0') || (userColor === 'black' && result === '0-1')) return 'win'
  if ((userColor === 'white' && result === '0-1') || (userColor === 'black' && result === '1-0')) return 'loss'
  return null
}

function emptySplit(): ResultsSplit {
  return { wins: 0, losses: 0, draws: 0 }
}

function addOutcome(split: ResultsSplit, o: 'win' | 'loss' | 'draw' | null): void {
  if (o === 'win') split.wins++
  else if (o === 'loss') split.losses++
  else if (o === 'draw') split.draws++
}

function ratingHistory(): RatingPoint[] {
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT ended_at AS date, time_class,
         CASE WHEN user_color = 'white' THEN white_rating ELSE black_rating END AS rating
       FROM games
       WHERE user_color IN ('white','black') AND ended_at IS NOT NULL
         AND (CASE WHEN user_color = 'white' THEN white_rating ELSE black_rating END) IS NOT NULL
       ORDER BY ended_at DESC LIMIT ?`
    )
    .all(RATING_HISTORY_LIMIT) as Array<{ date: string; time_class: string | null; rating: number }>
  return rows.reverse().map((r) => ({ date: r.date.slice(0, 10), rating: r.rating, timeClass: r.time_class }))
}

function accuracyHistory(): AccuracyPoint[] {
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT id AS game_id, ended_at AS date,
         CASE WHEN user_color = 'white' THEN accuracy_white ELSE accuracy_black END AS accuracy
       FROM games
       WHERE analysis_status = 'done' AND user_color IN ('white','black') AND ended_at IS NOT NULL
         AND (CASE WHEN user_color = 'white' THEN accuracy_white ELSE accuracy_black END) IS NOT NULL
       ORDER BY ended_at ASC`
    )
    .all() as Array<{ game_id: string; date: string; accuracy: number }>
  return rows.map((r) => ({ date: r.date.slice(0, 10), accuracy: r.accuracy, gameId: r.game_id }))
}

function resultsSplits(): { overall: ResultsSplit; byTimeClass: Record<string, ResultsSplit> } {
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT user_color, result, COALESCE(time_class, 'unknown') AS time_class
       FROM games WHERE user_color IN ('white','black') AND result IS NOT NULL AND ongoing = 0`
    )
    .all() as Array<{ user_color: 'white' | 'black'; result: string; time_class: string }>
  const overall = emptySplit()
  const byTimeClass: Record<string, ResultsSplit> = {}
  for (const r of rows) {
    const o = outcome(r.user_color, r.result)
    addOutcome(overall, o)
    if (!byTimeClass[r.time_class]) byTimeClass[r.time_class] = emptySplit()
    addOutcome(byTimeClass[r.time_class], o)
  }
  return { overall, byTimeClass }
}

function openingStats(): OpeningStat[] {
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT eco_code, opening_name, user_color, result, ended_at,
         CASE WHEN user_color = 'white' THEN accuracy_white ELSE accuracy_black END AS accuracy
       FROM games
       WHERE user_color IN ('white','black') AND eco_code IS NOT NULL AND ongoing = 0`
    )
    .all() as Array<{
    eco_code: string
    opening_name: string | null
    user_color: 'white' | 'black'
    result: string | null
    ended_at: string | null
    accuracy: number | null
  }>

  interface Group {
    ecoCode: string
    openingName: string | null
    color: 'white' | 'black'
    split: ResultsSplit
    accuracySum: number
    accuracyCount: number
    lastPlayed: string
  }
  const groups = new Map<string, Group>()
  for (const r of rows) {
    const key = `${r.eco_code}|||${r.user_color}`
    let g = groups.get(key)
    if (!g) {
      g = { ecoCode: r.eco_code, openingName: r.opening_name, color: r.user_color, split: emptySplit(), accuracySum: 0, accuracyCount: 0, lastPlayed: '' }
      groups.set(key, g)
    }
    if (!g.openingName && r.opening_name) g.openingName = r.opening_name
    addOutcome(g.split, outcome(r.user_color, r.result))
    if (r.accuracy != null) {
      g.accuracySum += r.accuracy
      g.accuracyCount++
    }
    if (r.ended_at && r.ended_at > g.lastPlayed) g.lastPlayed = r.ended_at
  }

  return [...groups.values()]
    .map((g) => ({
      ecoCode: g.ecoCode,
      openingName: g.openingName,
      color: g.color,
      games: g.split.wins + g.split.losses + g.split.draws,
      wins: g.split.wins,
      losses: g.split.losses,
      draws: g.split.draws,
      avgAccuracy: g.accuracyCount > 0 ? g.accuracySum / g.accuracyCount : null,
      lastPlayed: g.lastPlayed.slice(0, 10)
    }))
    .sort((a, b) => b.games - a.games)
    .slice(0, OPENINGS_TOP_N)
}

function mistakesByPhase(): { opening: number; middlegame: number; endgame: number } {
  const db = getDb()
  const rows = db
    .prepare(`SELECT m.ply AS ply, g.ply_count AS ply_count FROM mistakes m JOIN games g ON g.id = m.game_id`)
    .all() as Array<{ ply: number; ply_count: number }>
  let opening = 0
  let middlegame = 0
  let endgame = 0
  for (const r of rows) {
    if (r.ply <= 20) opening++
    else if (r.ply_count > 0 && r.ply >= r.ply_count * 0.7) endgame++
    else middlegame++
  }
  return { opening, middlegame, endgame }
}

export function getStatsOverview(): StatsOverview {
  const db = getDb()
  const gamesTotal = (db.prepare('SELECT COUNT(*) AS c FROM games').get() as { c: number }).c
  const gamesAnalyzed = (
    db.prepare("SELECT COUNT(*) AS c FROM games WHERE analysis_status = 'done'").get() as { c: number }
  ).c
  const { overall, byTimeClass } = resultsSplits()
  return {
    ratingHistory: ratingHistory(),
    accuracyHistory: accuracyHistory(),
    resultsOverall: overall,
    resultsByTimeClass: byTimeClass,
    openings: openingStats(),
    mistakesByPhase: mistakesByPhase(),
    gamesAnalyzed,
    gamesTotal
  }
}
