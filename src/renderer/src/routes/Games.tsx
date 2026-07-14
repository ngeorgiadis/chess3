import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'
import { useStore, useAppEvent } from '../store'
import { Board } from '../components/Board'
import { openingLabel } from '@shared/eco-names'
import type { GameFilters, GameRecord } from '@shared/types'

function resultBadge(game: GameRecord): React.JSX.Element {
  const r = game.result
  let cls = ''
  let label = r ?? '?'
  if (r === '1/2-1/2') {
    cls = 'yellow'
    label = '½–½'
  } else if (
    (game.userColor === 'white' && r === '1-0') ||
    (game.userColor === 'black' && r === '0-1')
  ) {
    cls = 'green'
    label = 'Win'
  } else if (
    (game.userColor === 'white' && r === '0-1') ||
    (game.userColor === 'black' && r === '1-0')
  ) {
    cls = 'red'
    label = 'Loss'
  }
  return <span className={`badge ${cls}`}>{label}</span>
}

const STATUS_BADGE: Record<string, { cls: string; label: string }> = {
  none: { cls: '', label: 'not analyzed' },
  queued: { cls: 'blue', label: 'queued' },
  running: { cls: 'blue', label: 'analyzing…' },
  done: { cls: 'green', label: 'analyzed' },
  failed: { cls: 'red', label: 'failed' }
}

function canAnalyze(g: GameRecord): boolean {
  return !g.ongoing && (g.analysisStatus === 'none' || g.analysisStatus === 'failed')
}

function accuracyCell(g: GameRecord): React.JSX.Element {
  if (g.accuracyWhite == null && g.accuracyBlack == null) return <span className="muted">—</span>
  if (g.userColor === 'white') return <span className="mono">{g.accuracyWhite != null ? `${g.accuracyWhite.toFixed(1)}%` : '—'}</span>
  if (g.userColor === 'black') return <span className="mono">{g.accuracyBlack != null ? `${g.accuracyBlack.toFixed(1)}%` : '—'}</span>
  return (
    <span className="mono muted">
      W {g.accuracyWhite != null ? `${g.accuracyWhite.toFixed(0)}%` : '—'} / B {g.accuracyBlack != null ? `${g.accuracyBlack.toFixed(0)}%` : '—'}
    </span>
  )
}

export function Games({ initialText }: { initialText?: string }): React.JSX.Element {
  const navigate = useStore((s) => s.navigate)
  const setImportModalOpen = useStore((s) => s.setImportModalOpen)
  const [games, setGames] = useState<GameRecord[]>([])
  const [filters, setFilters] = useState<GameFilters>(initialText ? { text: initialText } : {})
  const [selected, setSelected] = useState<GameRecord | null>(null)
  const [previewFen, setPreviewFen] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [bulkBusy, setBulkBusy] = useState(false)

  const refresh = useCallback(() => {
    void api.games.list(filters).then(setGames)
  }, [filters])
  useEffect(refresh, [refresh])
  useAppEvent(['games:changed', 'job:completed'], refresh)
  useEffect(() => setChecked(new Set()), [filters])

  useEffect(() => {
    setPreviewFen(null)
    if (!selected) return
    void api.games.moves(selected.id).then((moves) => {
      setPreviewFen(moves.length ? moves[moves.length - 1].fenAfter : null)
    })
  }, [selected])

  async function analyzeSelected(game: GameRecord): Promise<void> {
    setError(null)
    try {
      await api.analysis.queue([game.id])
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const analyzable = games.filter(canAnalyze)
  const allChecked = analyzable.length > 0 && analyzable.every((g) => checked.has(g.id))

  function toggleSelectAll(): void {
    setChecked(allChecked ? new Set() : new Set(analyzable.map((g) => g.id)))
  }

  function toggleOne(id: string): void {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function bulkAnalyze(): Promise<void> {
    setError(null)
    setBulkBusy(true)
    try {
      await api.analysis.queue([...checked])
      setChecked(new Set())
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBulkBusy(false)
    }
  }

  return (
    <div>
      <h1>Games</h1>
      <p className="subtitle">Your imported game library. Analyze games to turn mistakes into training.</p>

      <div className="row" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          placeholder="Search opponent / opening…"
          style={{ width: 220 }}
          value={filters.text ?? ''}
          onChange={(e) => setFilters({ ...filters, text: e.target.value || undefined })}
        />
        <select
          value={filters.platform ?? ''}
          onChange={(e) => setFilters({ ...filters, platform: e.target.value || undefined })}
        >
          <option value="">All sources</option>
          <option value="chesscom">Chess.com</option>
          <option value="lichess">Lichess</option>
          <option value="pgn-file">PGN file</option>
          <option value="pasted-pgn">Pasted</option>
        </select>
        <select
          value={filters.timeClass ?? ''}
          onChange={(e) => setFilters({ ...filters, timeClass: e.target.value || undefined })}
        >
          <option value="">All speeds</option>
          <option value="bullet">Bullet</option>
          <option value="blitz">Blitz</option>
          <option value="rapid">Rapid</option>
          <option value="classical">Classical</option>
          <option value="daily">Daily</option>
        </select>
        <select
          value={filters.result ?? ''}
          onChange={(e) =>
            setFilters({ ...filters, result: (e.target.value || undefined) as GameFilters['result'] })
          }
        >
          <option value="">All results</option>
          <option value="win">Wins</option>
          <option value="loss">Losses</option>
          <option value="draw">Draws</option>
        </select>
        <select
          value={filters.analyzed === undefined ? '' : String(filters.analyzed)}
          onChange={(e) =>
            setFilters({ ...filters, analyzed: e.target.value === '' ? undefined : e.target.value === 'true' })
          }
        >
          <option value="">Analyzed + not</option>
          <option value="true">Analyzed</option>
          <option value="false">Not analyzed</option>
        </select>
      </div>

      {error && <div className="callout error" style={{ marginBottom: 10 }}>{error}</div>}

      {games.length > 0 && analyzable.length > 0 && (
        <div className="row" style={{ marginBottom: 10, justifyContent: 'space-between' }}>
          <label className="row" style={{ gap: 6 }}>
            <input type="checkbox" checked={allChecked} onChange={toggleSelectAll} />
            <span className="muted">Select all unanalyzed ({analyzable.length})</span>
          </label>
          {checked.size > 0 && (
            <button className="small primary" disabled={bulkBusy} onClick={() => void bulkAnalyze()}>
              {bulkBusy ? 'Queuing…' : `Analyze ${checked.size} selected`}
            </button>
          )}
        </div>
      )}

      {games.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p>Import your games to build a personalized training plan.</p>
          <button className="primary" onClick={() => setImportModalOpen(true)}>
            Import games
          </button>
        </div>
      ) : (
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <table className="data">
              <thead>
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>White</th>
                  <th>Black</th>
                  <th>Result</th>
                  <th>Speed</th>
                  <th>Opening</th>
                  <th>Mistakes</th>
                  <th>Accuracy</th>
                  <th>Analysis</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {games.map((g) => {
                  const st = STATUS_BADGE[g.analysisStatus] ?? STATUS_BADGE.none
                  return (
                    <tr
                      key={g.id}
                      className={`clickable ${selected?.id === g.id ? 'selected' : ''}`}
                      onClick={() => setSelected(g)}
                    >
                      <td onClick={(e) => e.stopPropagation()}>
                        {canAnalyze(g) && (
                          <input type="checkbox" checked={checked.has(g.id)} onChange={() => toggleOne(g.id)} />
                        )}
                      </td>
                      <td className="muted">{(g.endedAt ?? g.importedAt).slice(0, 10)}</td>
                      <td>{g.whiteName ?? '?'} {g.whiteRating ? <span className="muted">({g.whiteRating})</span> : null}</td>
                      <td>{g.blackName ?? '?'} {g.blackRating ? <span className="muted">({g.blackRating})</span> : null}</td>
                      <td>{resultBadge(g)}</td>
                      <td className="muted">{g.timeClass ?? '—'}</td>
                      <td className="muted" title={g.ecoCode ?? undefined}>{openingLabel(g)}</td>
                      <td>{g.mistakeCount > 0 ? <span className="badge yellow">{g.mistakeCount}</span> : <span className="muted">—</span>}</td>
                      <td>{accuracyCell(g)}</td>
                      <td>
                        <span className={`badge ${st.cls}`}>{st.label}</span>
                        {g.ongoing && <span className="badge red" style={{ marginLeft: 4 }}>ongoing</span>}
                      </td>
                      <td>
                        <div className="row" style={{ gap: 4 }}>
                          {g.analysisStatus === 'done' ? (
                            <button
                              className="small primary"
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate({ name: 'review', gameId: g.id })
                              }}
                            >
                              Review
                            </button>
                          ) : (
                            <button
                              className="small"
                              disabled={g.ongoing || g.analysisStatus === 'queued' || g.analysisStatus === 'running'}
                              onClick={(e) => {
                                e.stopPropagation()
                                void analyzeSelected(g)
                              }}
                            >
                              Analyze
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="card" style={{ width: 300, flexShrink: 0 }}>
              <h3>
                {selected.whiteName} vs {selected.blackName}
              </h3>
              {previewFen && (
                <Board fen={previewFen} maxWidth={268} showCoordinates={false} evalTarget={false} allowFlip={false} />
              )}
              <div className="col" style={{ gap: 4, marginTop: 10 }}>
                <div className="muted">{selected.timeControl ?? ''} · {selected.plyCount} plies</div>
                {selected.sourceGameUrl && (
                  <div className="muted mono" style={{ fontSize: 11, wordBreak: 'break-all' }}>
                    {selected.sourceGameUrl}
                  </div>
                )}
                <div className="row" style={{ marginTop: 6, flexWrap: 'wrap' }}>
                  <button className="small" onClick={() => navigate({ name: 'review', gameId: selected.id })}>
                    Open review
                  </button>
                  <button className="small" onClick={() => void api.games.exportPgn([selected.id])}>
                    Export PGN
                  </button>
                  <button
                    className="small danger"
                    onClick={() => {
                      if (!window.confirm(`Delete this game (${selected.whiteName} vs ${selected.blackName})? This also removes its analysis, mistakes, and exercises. This cannot be undone.`)) return
                      void api.games.delete(selected.id).then(() => setSelected(null))
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
