import { useEffect, useState } from 'react'
import { useStore, useAppEvent, type Route } from '../store'
import { api } from '../api'
import type { LiveEvalUpdate, PvLine } from '@shared/types'

const NAV: Array<{ route: Route; label: string; icon: string }> = [
  { route: { name: 'today' }, label: 'Today', icon: '☀' },
  { route: { name: 'games' }, label: 'Games', icon: '♟' },
  { route: { name: 'openings' }, label: 'Openings', icon: '⇶' },
  { route: { name: 'lessons' }, label: 'Lessons', icon: '📖' },
  { route: { name: 'exercises' }, label: 'Exercises', icon: '🧩' },
  { route: { name: 'ai-studio' }, label: 'AI Studio', icon: '✦' },
  { route: { name: 'engines' }, label: 'Engines', icon: '⚙' },
  { route: { name: 'settings' }, label: 'Settings', icon: '⚒' }
]

/** Score of the best line in white-perspective centipawns (mate mapped to ±10000). */
function whiteScore(update: LiveEvalUpdate): { cp: number; label: string } {
  const best = update.multiPv[0]
  if (!best) return { cp: 0, label: '…' }
  const sign = update.sideToMove === 'w' ? 1 : -1
  if (best.score.type === 'mate') {
    const mate = best.score.value * sign
    return { cp: mate > 0 ? 10000 : -10000, label: `#${Math.abs(best.score.value)}${mate > 0 ? '' : ' (Black)'}` }
  }
  const cp = best.score.value * sign
  return { cp, label: (cp >= 0 ? '+' : '') + (cp / 100).toFixed(2) }
}

function pvText(pv: PvLine): string {
  return (pv.pvSan && pv.pvSan.length ? pv.pvSan : pv.pvUci).slice(1, 7).join(' ')
}

function EvalPanel(): React.JSX.Element {
  const evalEnabled = useStore((s) => s.evalEnabled)
  const evalError = useStore((s) => s.evalError)
  const evalUpdate = useStore((s) => s.evalUpdate)
  const evalFen = useStore((s) => s.evalFen)
  const setEvalEnabled = useStore((s) => s.setEvalEnabled)
  const [busy, setBusy] = useState(false)

  const toggle = async (): Promise<void> => {
    setBusy(true)
    try {
      await setEvalEnabled(!evalEnabled)
    } finally {
      setBusy(false)
    }
  }

  const current = evalEnabled && evalUpdate && evalUpdate.fen === evalFen ? evalUpdate : null
  const score = current ? whiteScore(current) : null
  // squash cp to a 0..100% white share for the bar
  const whitePct = score ? 50 + 50 * (2 / (1 + Math.exp(-score.cp / 400)) - 1) : 50

  return (
    <div className="eval-panel">
      <div className="row" style={{ gap: 8 }}>
        <label className="switch" title="Evaluate the currently visible board with your engine">
          <input type="checkbox" checked={evalEnabled} disabled={busy} onChange={() => void toggle()} />
          <span className="slider" />
        </label>
        <span style={{ color: 'var(--text-dim)' }}>Live engine</span>
        {current && <span className="eval-score" style={{ marginLeft: 'auto' }}>{score!.label}</span>}
      </div>
      {evalError && (
        <div style={{ color: 'var(--danger)', fontSize: 11 }}>{evalError}</div>
      )}
      {evalEnabled && (
        <>
          <div className="eval-bar-outer" title="White ↔ Black">
            <div className="eval-bar-white" style={{ width: `${whitePct}%` }} />
          </div>
          {current ? (
            <>
              {current.multiPv.slice(0, 2).map((pv) => (
                <div key={pv.rank} className="eval-line" title={pvText(pv)}>
                  <b>{pv.moveSan ?? pv.moveUci}</b> {pvText(pv)}
                </div>
              ))}
              <div style={{ color: 'var(--text-faint)', fontSize: 10.5 }}>
                depth {current.depth} · {current.engineName}
                {current.final ? '' : ' · thinking…'}
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-faint)', fontSize: 11 }}>
              {evalFen ? 'evaluating…' : 'open a board to evaluate'}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function Sidebar(): React.JSX.Element {
  const route = useStore((s) => s.route)
  const navigate = useStore((s) => s.navigate)
  const setImportModalOpen = useStore((s) => s.setImportModalOpen)
  const jobs = useStore((s) => s.jobs)
  const settings = useStore((s) => s.settings)
  const [engineCount, setEngineCount] = useState<number | null>(null)

  const refreshEngines = (): void => {
    void api.engines.list().then((list) => setEngineCount(list.filter((e) => e.status === 'available').length))
  }
  useEffect(refreshEngines, [])
  useAppEvent(['engine:status'], refreshEngines)

  const activeJob = jobs.find((j) => j.status === 'running')
  const pendingCount = jobs.filter((j) => j.status === 'pending').length

  return (
    <nav className="sidebar">
      <div className="logo">
        Chess Mentor <span>Studio</span>
      </div>
      {NAV.map((item) => (
        <button
          key={item.label}
          className={`nav-item ${route.name === item.route.name ? 'active' : ''}`}
          onClick={() => navigate(item.route)}
        >
          <span style={{ width: 18, textAlign: 'center' }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
      <div style={{ padding: '12px 6px' }}>
        <button className="primary" style={{ width: '100%' }} onClick={() => setImportModalOpen(true)}>
          + Import games
        </button>
      </div>
      <div className="spacer" />
      {activeJob && (
        <div className="status-line">
          <div style={{ marginBottom: 3 }}>
            {activeJob.type === 'analyze-game' ? 'Analyzing…' : 'Importing…'}
            {pendingCount > 0 ? ` (+${pendingCount} queued)` : ''}
          </div>
          <div className="progress-outer">
            <div
              className="progress-inner"
              style={{
                width: activeJob.progressTotal
                  ? `${Math.round((activeJob.progressCurrent / activeJob.progressTotal) * 100)}%`
                  : '10%'
              }}
            />
          </div>
          <button className="small" style={{ marginTop: 5 }} onClick={() => void api.analysis.cancel(activeJob.id)}>
            Cancel
          </button>
        </div>
      )}
      <EvalPanel />
      <div className="status-line">
        Engine: {engineCount === null ? '…' : engineCount > 0 ? `${engineCount} ready` : 'none'}
      </div>
      <div className="status-line">
        AI: {settings?.aiConfig.mode === 'manual' ? 'manual mode' : (settings?.aiConfig.model || 'configured')}
      </div>
    </nav>
  )
}
