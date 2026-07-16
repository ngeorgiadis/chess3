import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { api } from '../api'
import type { ImportResult, JobRecord } from '@shared/types'

type Tab = 'username' | 'url' | 'pgn'

function ResultSummary({
  result,
  alreadyQueued,
  onAnalyze,
  onViewGames
}: {
  result: ImportResult
  alreadyQueued: boolean
  onAnalyze: () => void
  onViewGames: () => void
}): React.JSX.Element {
  const [analyzing, setAnalyzing] = useState(false)
  const upToDate = result.syncedFrom && result.gamesSeen === 0
  return (
    <div className={`callout ${upToDate ? '' : result.gamesImported > 0 ? 'success' : 'warn'}`}>
      {upToDate && (
        <div style={{ marginBottom: 4 }}>
          Already up to date — no new games since {result.syncedFrom}.
        </div>
      )}
      {result.syncedFrom && !upToDate && (
        <div className="muted" style={{ marginBottom: 4, fontSize: 12 }}>
          Synced new games since {result.syncedFrom}.
        </div>
      )}
      <b>{result.gamesImported}</b> games imported, <b>{result.duplicatesSkipped}</b> duplicates skipped
      {result.failed.length > 0 && (
        <>
          , <b>{result.failed.length}</b> failed
          <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
            {result.failed.slice(0, 5).map((f, i) => (
              <li key={i}>
                {f.sourceRef}: {f.reason}
              </li>
            ))}
            {result.failed.length > 5 && <li>…and {result.failed.length - 5} more</li>}
          </ul>
        </>
      )}
      {result.createdGameIds.length > 0 && (
        <div className="row" style={{ marginTop: 10, flexWrap: 'wrap' }}>
          {!alreadyQueued && (
            <button
              className="small primary"
              disabled={analyzing}
              onClick={() => {
                setAnalyzing(true)
                onAnalyze()
              }}
            >
              {analyzing ? 'Queuing…' : `Analyze ${result.createdGameIds.length} game${result.createdGameIds.length === 1 ? '' : 's'} now`}
            </button>
          )}
          <button className="small" onClick={onViewGames}>
            View games
          </button>
        </div>
      )}
    </div>
  )
}

export function ImportModal(): React.JSX.Element {
  const setOpen = useStore((s) => s.setImportModalOpen)
  const navigate = useStore((s) => s.navigate)
  const jobs = useStore((s) => s.jobs)
  const settings = useStore((s) => s.settings)
  const refreshSettings = useStore((s) => s.refreshSettings)

  const [tab, setTab] = useState<Tab>('username')
  const [platform, setPlatform] = useState<'chesscom' | 'lichess'>('chesscom')
  const [username, setUsername] = useState(settings?.chesscomUsername ?? '')
  const [maxGames, setMaxGames] = useState(100)
  const [fromMonth, setFromMonth] = useState('')
  const [toMonth, setToMonth] = useState('')
  const [timeClasses, setTimeClasses] = useState<string[]>(['rapid', 'blitz'])
  const [analyzeAfter, setAnalyzeAfter] = useState(false)
  const [urlText, setUrlText] = useState('')
  const [pgnText, setPgnText] = useState('')
  const [pgnPreview, setPgnPreview] = useState<number | null>(null)
  const [watchedJobId, setWatchedJobId] = useState<string | null>(null)
  const [directResult, setDirectResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const watchedJob = jobs.find((j) => j.id === watchedJobId) ?? null
  const jobResult = watchedJob?.status === 'completed' ? (watchedJob.result as ImportResult | null) : null

  function toggleTimeClass(tc: string): void {
    setTimeClasses((prev) => (prev.includes(tc) ? prev.filter((x) => x !== tc) : [...prev, tc]))
  }

  async function run(fn: () => Promise<void>): Promise<void> {
    setError(null)
    setDirectResult(null)
    setBusy(true)
    try {
      await fn()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function saveUsernameIfNeeded(p: 'chesscom' | 'lichess', name: string): Promise<void> {
    const key = p === 'chesscom' ? 'chesscomUsername' : 'lichessUsername'
    if (settings?.[key] === name) return
    await api.settings.set({ [key]: name })
    await refreshSettings()
    // Games imported earlier under this same identity may have been recorded as 'unknown'.
    await api.identity.backfill()
  }

  const startUsernameImport = (): Promise<void> =>
    run(async () => {
      const name = username.trim()
      if (!name) throw new Error('Enter a username first.')
      await saveUsernameIfNeeded(platform, name)
      let job: JobRecord
      if (platform === 'chesscom') {
        job = await api.import.chesscom({
          username: name,
          maxGames,
          fromMonth: fromMonth || undefined,
          toMonth: toMonth || undefined,
          timeClasses: timeClasses.length ? timeClasses : undefined,
          analyzeAfterImport: analyzeAfter
        })
      } else {
        job = await api.import.lichess({
          username: name,
          max: maxGames,
          perfTypes: timeClasses.filter((t) => t !== 'daily'),
          analyzeAfterImport: analyzeAfter
        })
      }
      setWatchedJobId(job.id)
    })

  const startUrlImport = (): Promise<void> =>
    run(async () => {
      const detected = await api.import.detect(urlText)
      switch (detected.kind) {
        case 'chesscom-user': {
          await saveUsernameIfNeeded('chesscom', detected.username as string)
          const job = await api.import.chesscom({
            username: detected.username as string,
            maxGames,
            analyzeAfterImport: analyzeAfter
          })
          setWatchedJobId(job.id)
          break
        }
        case 'lichess-user': {
          await saveUsernameIfNeeded('lichess', detected.username as string)
          const job = await api.import.lichess({
            username: detected.username as string,
            max: maxGames,
            analyzeAfterImport: analyzeAfter
          })
          setWatchedJobId(job.id)
          break
        }
        case 'lichess-game': {
          const job = await api.import.lichessGame({
            gameId: detected.gameId as string,
            analyzeAfterImport: analyzeAfter
          })
          setWatchedJobId(job.id)
          break
        }
        case 'pgn': {
          const result = (await api.import.pgn({
            pgn: detected.pgn as string,
            analyzeAfterImport: analyzeAfter
          })) as ImportResult
          setDirectResult(result)
          break
        }
        case 'chesscom-game':
          throw new Error(
            'Single Chess.com game URLs cannot be fetched via the public API. Import the month via your username instead, or paste the PGN.'
          )
        default:
          throw new Error('Could not recognize this URL. Supported: Chess.com/Lichess profiles and Lichess games.')
      }
    })

  const startPgnImport = (): Promise<void> =>
    run(async () => {
      if (!pgnText.trim()) throw new Error('Paste PGN text or drop a .pgn file first.')
      const result = (await api.import.pgn({ pgn: pgnText, analyzeAfterImport: analyzeAfter })) as ImportResult
      setDirectResult(result)
    })

  const pickFile = (): Promise<void> =>
    run(async () => {
      const path = await api.import.pickPgnFile()
      if (!path) return
      const job = (await api.import.pgn({ filePath: path, analyzeAfterImport: analyzeAfter })) as JobRecord
      setWatchedJobId(job.id)
    })

  async function onDrop(e: React.DragEvent): Promise<void> {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    const text = await file.text()
    setPgnText(text)
    const preview = await api.import.previewPgn(text)
    setPgnPreview(preview.games)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && !busy) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, setOpen])

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Import games</h2>
        <label className="row" style={{ gap: 6, marginBottom: 10 }}>
          <input type="checkbox" checked={analyzeAfter} onChange={(e) => setAnalyzeAfter(e.target.checked)} />
          Analyze after import (requires a configured engine)
        </label>
        <div className="tabs">
          <button className={tab === 'username' ? 'active' : ''} onClick={() => setTab('username')}>
            Username
          </button>
          <button className={tab === 'url' ? 'active' : ''} onClick={() => setTab('url')}>
            URL / paste
          </button>
          <button className={tab === 'pgn' ? 'active' : ''} onClick={() => setTab('pgn')}>
            PGN
          </button>
        </div>

        {tab === 'username' && (
          <div className="col">
            <div className="row">
              <label className="field" style={{ width: 140 }}>
                Platform
                <select value={platform} onChange={(e) => setPlatform(e.target.value as 'chesscom' | 'lichess')}>
                  <option value="chesscom">Chess.com</option>
                  <option value="lichess">Lichess</option>
                </select>
              </label>
              <label className="field" style={{ flex: 1 }}>
                Username
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your-username" />
              </label>
              <label className="field" style={{ width: 110 }}>
                Max games
                <input
                  type="number"
                  value={maxGames}
                  min={1}
                  max={2000}
                  onChange={(e) => setMaxGames(parseInt(e.target.value) || 100)}
                />
              </label>
            </div>
            {platform === 'chesscom' && (
              <div className="row">
                <label className="field">
                  From month
                  <input
                    type="month"
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                    placeholder="auto"
                  />
                </label>
                <label className="field">
                  To month
                  <input type="month" value={toMonth} onChange={(e) => setToMonth(e.target.value)} />
                </label>
              </div>
            )}
            <div className="row" style={{ flexWrap: 'wrap' }}>
              <span className="muted">Time controls:</span>
              {['rapid', 'blitz', 'bullet', platform === 'chesscom' ? 'daily' : 'classical'].map((tc) => (
                <label key={tc} className="row" style={{ gap: 4 }}>
                  <input type="checkbox" checked={timeClasses.includes(tc)} onChange={() => toggleTimeClass(tc)} />
                  {tc}
                </label>
              ))}
            </div>
            <div className="muted">
              Fetches {platform === 'chesscom' ? 'monthly archives sequentially from the public Chess.com API' : 'a streamed NDJSON export from the Lichess API'}
              . Only public, finished games are imported. Repeat imports sync automatically — only games newer
              than what you already have are fetched, unless you set {platform === 'chesscom' ? 'a "From month"' : 'a date range'} above.
            </div>
            <button className="primary" disabled={busy} onClick={() => void startUsernameImport()}>
              Start import
            </button>
          </div>
        )}

        {tab === 'url' && (
          <div className="col">
            <label className="field">
              Profile URL, game URL, or pasted PGN
              <textarea
                rows={4}
                value={urlText}
                onChange={(e) => setUrlText(e.target.value)}
                placeholder="https://www.chess.com/member/…  |  https://lichess.org/@/…  |  https://lichess.org/AbCdEfGh"
              />
            </label>
            <button className="primary" disabled={busy || !urlText.trim()} onClick={() => void startUrlImport()}>
              Detect and import
            </button>
          </div>
        )}

        {tab === 'pgn' && (
          <div className="col">
            <textarea
              rows={8}
              value={pgnText}
              onChange={(e) => {
                setPgnText(e.target.value)
                setPgnPreview(null)
              }}
              onDrop={(e) => void onDrop(e)}
              onDragOver={(e) => e.preventDefault()}
              placeholder='Paste PGN here or drop a .pgn file onto this area…&#10;&#10;[Event "…"]'
            />
            {pgnPreview !== null && <div className="muted">{pgnPreview} game(s) detected — confirm to import.</div>}
            <div className="row">
              <button className="primary" disabled={busy || !pgnText.trim()} onClick={() => void startPgnImport()}>
                Import pasted PGN
              </button>
              <button disabled={busy} onClick={() => void pickFile()}>
                Choose .pgn file…
              </button>
            </div>
          </div>
        )}

        <div className="col" style={{ marginTop: 14 }}>
          {error && <div className="callout error">{error}</div>}
          {directResult && (
            <ResultSummary
              result={directResult}
              alreadyQueued={analyzeAfter}
              onAnalyze={() => void api.analysis.queue(directResult.createdGameIds)}
              onViewGames={() => {
                navigate({ name: 'games' })
                setOpen(false)
              }}
            />
          )}
          {watchedJob && watchedJob.status === 'running' && (
            <div>
              <div className="muted" style={{ marginBottom: 4 }}>
                {watchedJob.progressLabel ?? 'Working…'} ({watchedJob.progressCurrent}/{watchedJob.progressTotal || '?'})
              </div>
              <div className="progress-outer">
                <div
                  className="progress-inner"
                  style={{
                    width: watchedJob.progressTotal
                      ? `${(watchedJob.progressCurrent / watchedJob.progressTotal) * 100}%`
                      : '15%'
                  }}
                />
              </div>
              <button className="small" style={{ marginTop: 6 }} onClick={() => void api.analysis.cancel(watchedJob.id)}>
                Cancel import
              </button>
            </div>
          )}
          {jobResult && (
            <ResultSummary
              result={jobResult}
              alreadyQueued={analyzeAfter}
              onAnalyze={() => void api.analysis.queue(jobResult.createdGameIds)}
              onViewGames={() => {
                navigate({ name: 'games' })
                setOpen(false)
              }}
            />
          )}
          {watchedJob?.status === 'failed' && (
            <div className="callout error">{watchedJob.error?.message ?? 'Import failed.'}</div>
          )}
          {watchedJob?.status === 'cancelled' && <div className="callout warn">Import cancelled.</div>}

          <div className="row" style={{ justifyContent: 'flex-end' }}>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
