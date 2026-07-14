import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useStore } from '../store'
import { openingLabel } from '@shared/eco-names'
import type { AccuracyPoint, RatingPoint, ResultsSplit, StatsOverview } from '@shared/types'

const TIME_CLASS_LABEL: Record<string, string> = {
  bullet: 'Bullet',
  blitz: 'Blitz',
  rapid: 'Rapid',
  classical: 'Classical',
  daily: 'Daily',
  unknown: 'Other'
}

function LineChart({
  points,
  yOf,
  height = 130,
  color = 'var(--info)'
}: {
  points: Array<{ x: number; y: number; title: string }>
  yOf: (v: number) => number
  height?: number
  color?: string
}): React.JSX.Element {
  void yOf
  const width = 800
  if (points.length < 2) {
    return (
      <div className="muted" style={{ padding: '20px 0' }}>
        Not enough data yet.
      </div>
    )
  }
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const xSpan = maxX - minX || 1
  const ySpan = maxY - minY || 1
  const px = (x: number): number => ((x - minX) / xSpan) * (width - 12) + 6
  const py = (y: number): number => height - 10 - ((y - minY) / ySpan) * (height - 20)
  const line = points.map((p) => `${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(' ')

  return (
    <svg className="eval-graph" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ height }}>
      <polyline points={line} fill="none" stroke={color} strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={px(p.x)} cy={py(p.y)} r={2.5} fill={color}>
          <title>{p.title}</title>
        </circle>
      ))}
    </svg>
  )
}

function ResultsBar({ split }: { split: ResultsSplit }): React.JSX.Element {
  const total = split.wins + split.losses + split.draws
  if (total === 0) return <div className="muted">No results yet.</div>
  const w = (split.wins / total) * 100
  const d = (split.draws / total) * 100
  const l = (split.losses / total) * 100
  return (
    <div>
      <div
        className="row"
        style={{ height: 14, borderRadius: 7, overflow: 'hidden', border: '1px solid var(--border)', gap: 0, alignItems: 'stretch' }}
      >
        <div style={{ width: `${w}%`, height: '100%', background: 'var(--accent)' }} title={`${split.wins} wins`} />
        <div style={{ width: `${d}%`, height: '100%', background: 'var(--warn)' }} title={`${split.draws} draws`} />
        <div style={{ width: `${l}%`, height: '100%', background: 'var(--danger)' }} title={`${split.losses} losses`} />
      </div>
      <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
        {split.wins}W · {split.draws}D · {split.losses}L · {((split.wins / total) * 100).toFixed(0)}% score
      </div>
    </div>
  )
}

function ratingPoint(p: RatingPoint, i: number): { x: number; y: number; title: string } {
  return { x: i, y: p.rating, title: `${p.date} · ${p.rating}` }
}

function accuracyPoint(p: AccuracyPoint, i: number): { x: number; y: number; title: string } {
  return { x: i, y: p.accuracy, title: `${p.date} · ${p.accuracy.toFixed(1)}%` }
}

export function Insights(): React.JSX.Element {
  const navigate = useStore((s) => s.navigate)
  const [stats, setStats] = useState<StatsOverview | null>(null)
  const [timeClassFilter, setTimeClassFilter] = useState<string | null>(null)

  useEffect(() => {
    void api.stats.overview().then(setStats)
  }, [])

  const timeClasses = useMemo(() => {
    if (!stats) return []
    const s = new Set<string>()
    for (const p of stats.ratingHistory) s.add(p.timeClass ?? 'unknown')
    return [...s]
  }, [stats])

  const filteredRating = useMemo(() => {
    if (!stats) return []
    return timeClassFilter ? stats.ratingHistory.filter((p) => (p.timeClass ?? 'unknown') === timeClassFilter) : stats.ratingHistory
  }, [stats, timeClassFilter])

  if (!stats) return <div className="muted">Loading…</div>

  if (stats.gamesTotal === 0) {
    return (
      <div>
        <h1>Insights</h1>
        <p className="subtitle">Trends from your imported games — rating, accuracy, openings, and where your mistakes happen.</p>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p>Import games to see your trends here.</p>
        </div>
      </div>
    )
  }

  const phase = stats.mistakesByPhase
  const phaseMax = Math.max(phase.opening, phase.middlegame, phase.endgame, 1)

  return (
    <div>
      <h1>Insights</h1>
      <p className="subtitle">Trends from your imported games — rating, accuracy, openings, and where your mistakes happen.</p>

      <div className="row" style={{ alignItems: 'stretch', gap: 14, flexWrap: 'wrap', marginBottom: 14 }}>
        <div className="card" style={{ flex: 2, minWidth: 380 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h3>Rating trend</h3>
            {timeClasses.length > 1 && (
              <div className="row" style={{ gap: 4 }}>
                <button className={`small ${timeClassFilter === null ? 'primary' : ''}`} onClick={() => setTimeClassFilter(null)}>
                  All
                </button>
                {timeClasses.map((tc) => (
                  <button key={tc} className={`small ${timeClassFilter === tc ? 'primary' : ''}`} onClick={() => setTimeClassFilter(tc)}>
                    {TIME_CLASS_LABEL[tc] ?? tc}
                  </button>
                ))}
              </div>
            )}
          </div>
          <LineChart points={filteredRating.map(ratingPoint)} yOf={(v) => v} />
        </div>

        <div className="card" style={{ flex: 1, minWidth: 260 }}>
          <h3>Results</h3>
          <ResultsBar split={stats.resultsOverall} />
          {Object.keys(stats.resultsByTimeClass).length > 1 && (
            <div className="col" style={{ gap: 8, marginTop: 12 }}>
              {Object.entries(stats.resultsByTimeClass).map(([tc, split]) => {
                const total = split.wins + split.losses + split.draws
                return (
                  <div key={tc} className="row" style={{ justifyContent: 'space-between' }}>
                    <span className="muted">{TIME_CLASS_LABEL[tc] ?? tc}</span>
                    <span className="muted">
                      {split.wins}W {split.draws}D {split.losses}L ({total} games)
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="row" style={{ alignItems: 'stretch', gap: 14, flexWrap: 'wrap', marginBottom: 14 }}>
        <div className="card" style={{ flex: 2, minWidth: 380 }}>
          <h3>Accuracy trend</h3>
          {stats.gamesAnalyzed === 0 ? (
            <div className="muted">Analyze games to see your accuracy trend.</div>
          ) : (
            <LineChart points={stats.accuracyHistory.map(accuracyPoint)} yOf={(v) => v} color="var(--accent)" />
          )}
        </div>

        <div className="card" style={{ flex: 1, minWidth: 260 }}>
          <h3>Mistakes by phase</h3>
          {phase.opening + phase.middlegame + phase.endgame === 0 ? (
            <div className="muted">No classified mistakes yet.</div>
          ) : (
            <div className="col" style={{ gap: 8 }}>
              {(
                [
                  ['Opening', phase.opening],
                  ['Middlegame', phase.middlegame],
                  ['Endgame', phase.endgame]
                ] as const
              ).map(([label, count]) => (
                <div key={label}>
                  <div className="row" style={{ justifyContent: 'space-between', fontSize: 12.5, marginBottom: 2 }}>
                    <span className="muted">{label}</span>
                    <span className="muted">{count}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-panel)', overflow: 'hidden' }}>
                    <div style={{ width: `${(count / phaseMax) * 100}%`, height: '100%', background: 'var(--info)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Your openings</h3>
        {stats.openings.length === 0 ? (
          <div className="muted">No openings recorded yet.</div>
        ) : (
          <table className="data">
            <thead>
              <tr>
                <th>Opening</th>
                <th>As</th>
                <th>Games</th>
                <th>Score</th>
                <th>Avg accuracy</th>
                <th>Last played</th>
              </tr>
            </thead>
            <tbody>
              {stats.openings.map((o) => {
                const total = o.games
                const score = total > 0 ? ((o.wins + o.draws * 0.5) / total) * 100 : 0
                return (
                  <tr
                    key={`${o.ecoCode}-${o.color}`}
                    className="clickable"
                    onClick={() => navigate({ name: 'games', ecoFilter: o.ecoCode })}
                  >
                    <td>
                      {openingLabel(o)} <span className="muted mono">{o.ecoCode}</span>
                    </td>
                    <td className="muted">{o.color}</td>
                    <td className="muted">{o.games}</td>
                    <td className="muted">
                      {score.toFixed(0)}% <span style={{ fontSize: 11 }}>({o.wins}W {o.draws}D {o.losses}L)</span>
                    </td>
                    <td className="muted">{o.avgAccuracy != null ? `${o.avgAccuracy.toFixed(1)}%` : '—'}</td>
                    <td className="muted">{o.lastPlayed}</td>
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
