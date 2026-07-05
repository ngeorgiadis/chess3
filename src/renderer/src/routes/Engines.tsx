import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'
import { useStore, useAppEvent } from '../store'
import type { EngineProfileRecord, EngineRecord } from '@shared/types'

export function Engines(): React.JSX.Element {
  const settings = useStore((s) => s.settings)
  const refreshSettings = useStore((s) => s.refreshSettings)
  const [engines, setEngines] = useState<EngineRecord[]>([])
  const [profiles, setProfiles] = useState<EngineProfileRecord[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  const refresh = useCallback(() => {
    void api.engines.list().then(setEngines)
    void api.engines.profiles().then(setProfiles)
  }, [])
  useEffect(refresh, [refresh])
  useAppEvent(['engine:status'], refresh)

  async function pick(): Promise<void> {
    setError(null)
    const path = await api.engines.pickExecutable()
    if (path) setPendingPath(path)
  }

  async function confirmAdd(): Promise<void> {
    if (!pendingPath) return
    setBusy(true)
    setError(null)
    try {
      await api.engines.add(pendingPath)
      setPendingPath(null)
      refresh()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function verify(id: string): Promise<void> {
    setBusy(true)
    setError(null)
    try {
      await api.engines.verify(id)
      refresh()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function setDefaultProfile(profileId: string): Promise<void> {
    await api.settings.set({ defaultProfileId: profileId })
    await refreshSettings()
  }

  return (
    <div>
      <h1>Engines</h1>
      <p className="subtitle">
        Pluggable UCI engines run locally on your machine. Analysis is transparent: engine, depth, and time are always
        recorded.
      </p>

      {error && <div className="callout error" style={{ marginBottom: 10 }}>{error}</div>}

      {pendingPath && (
        <div className="callout warn" style={{ marginBottom: 12 }}>
          <b>Security check:</b> adding an engine runs a local executable on your computer. Only continue if you trust
          this file:
          <div className="mono" style={{ margin: '6px 0', wordBreak: 'break-all' }}>{pendingPath}</div>
          <div className="row">
            <button className="primary" disabled={busy} onClick={() => void confirmAdd()}>
              {busy ? 'Verifying handshake…' : 'Trust and add engine'}
            </button>
            <button disabled={busy} onClick={() => setPendingPath(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {engines.length === 0 && !pendingPath && (
        <div className="card" style={{ textAlign: 'center', padding: 36, marginBottom: 14 }}>
          <p>Add a UCI engine to analyze games locally.</p>
          <p className="muted">
            Stockfish is free (stockfishchess.org). Download it, then point the app at the executable.
          </p>
          <button className="primary" onClick={() => void pick()}>
            Add engine…
          </button>
        </div>
      )}

      <div className="card-grid">
        {engines.map((engine) => {
          const engineProfiles = profiles.filter((p) => p.engineId === engine.id)
          return (
            <div key={engine.id} className="card">
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <h3>{engine.name}</h3>
                <span className={`badge ${engine.status === 'available' ? 'green' : 'red'}`}>{engine.status}</span>
              </div>
              {engine.author && <div className="muted">by {engine.author}</div>}
              <div className="muted mono" style={{ fontSize: 11, wordBreak: 'break-all', margin: '6px 0' }}>
                {engine.executablePath}
              </div>
              <div className="muted">
                protocol: UCI · {engine.detectedOptions.length} options detected
                {engine.lastVerifiedAt && <> · verified {engine.lastVerifiedAt.slice(0, 10)}</>}
              </div>
              <div style={{ marginTop: 10 }}>
                <b style={{ fontSize: 12.5 }}>Profiles</b>
                <div className="col" style={{ gap: 4, marginTop: 4 }}>
                  {engineProfiles.map((p) => (
                    <div key={p.id} className="row" style={{ justifyContent: 'space-between' }}>
                      <span>
                        {p.name}{' '}
                        <span className="muted" style={{ fontSize: 11 }}>
                          {p.limits.depth ? `depth ${p.limits.depth}` : ''}
                          {p.limits.moveTimeMs ? `${p.limits.moveTimeMs}ms/move` : ''}
                          {p.limits.multiPv ? ` · ${p.limits.multiPv} lines` : ''}
                        </span>
                      </span>
                      {settings?.defaultProfileId === p.id ? (
                        <span className="badge green">default</span>
                      ) : (
                        <button className="small" onClick={() => void setDefaultProfile(p.id)}>
                          Set default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="row" style={{ marginTop: 12 }}>
                <button className="small" disabled={busy} onClick={() => void verify(engine.id)}>
                  Verify
                </button>
                <button
                  className="small danger"
                  onClick={() => {
                    void api.engines.remove(engine.id).then(refresh)
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {engines.length > 0 && (
        <button style={{ marginTop: 14 }} onClick={() => void pick()}>
          + Add another engine
        </button>
      )}
    </div>
  )
}
