import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { api } from '../api'
import { Board } from '../components/Board'
import type { AppSettings, BoardColorScheme, PieceSet } from '@shared/types'

const BOARD_THEMES: Array<{ value: BoardColorScheme; label: string }> = [
  { value: 'green', label: 'Green' },
  { value: 'brown', label: 'Brown (chess club)' },
  { value: 'blue', label: 'Blue' },
  { value: 'gray', label: 'Gray (black & white)' },
  { value: 'classic', label: 'Classic' },
  { value: 'contrast', label: 'High contrast' }
]

const PIECE_SETS: Array<{ value: PieceSet; label: string }> = [
  { value: 'standard', label: 'Standard' },
  { value: 'staunty', label: 'Staunty' }
]

const PREVIEW_FEN = 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5'

export function Settings(): React.JSX.Element {
  const settings = useStore((s) => s.settings)
  const refreshSettings = useStore((s) => s.refreshSettings)
  const [draft, setDraft] = useState<AppSettings | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (settings) setDraft(JSON.parse(JSON.stringify(settings)) as AppSettings)
  }, [settings])

  if (!draft) return <div className="muted">Loading…</div>

  async function save(): Promise<void> {
    await api.settings.set(draft!)
    await refreshSettings()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const set = <K extends keyof AppSettings>(key: K, value: AppSettings[K]): void =>
    setDraft({ ...draft, [key]: value })

  return (
    <div style={{ maxWidth: 720 }}>
      <h1>Settings</h1>
      <p className="subtitle">Profile, platforms, AI provider, and privacy. Everything is stored locally.</p>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3>Profile and rating goal</h3>
        <div className="col">
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <label className="field" style={{ flex: 1, minWidth: 180 }}>
              Display name
              <input value={draft.displayName} onChange={(e) => set('displayName', e.target.value)} />
            </label>
            <label className="field" style={{ width: 130 }}>
              Current rating
              <input
                type="number"
                value={draft.ratingCurrent}
                onChange={(e) => set('ratingCurrent', parseInt(e.target.value) || 1500)}
              />
            </label>
            <label className="field" style={{ width: 130 }}>
              Goal rating
              <input
                type="number"
                value={draft.ratingGoal}
                onChange={(e) => set('ratingGoal', parseInt(e.target.value) || 1800)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3>Appearance</h3>
        <div className="muted" style={{ marginBottom: 8 }}>
          Board color scheme and chess pieces, used on every board in the app.
        </div>
        <div className="row" style={{ alignItems: 'flex-start', gap: 18 }}>
          <div className="col" style={{ flex: 1, minWidth: 200 }}>
            <label className="field">
              Board colors
              <select
                value={draft.boardTheme}
                onChange={(e) => set('boardTheme', e.target.value as BoardColorScheme)}
              >
                {BOARD_THEMES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Piece set
              <select value={draft.pieceSet} onChange={(e) => set('pieceSet', e.target.value as PieceSet)}>
                {PIECE_SETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="muted">The preview updates immediately; click “Save settings” to apply everywhere.</div>
          </div>
          <div style={{ width: 240, flexShrink: 0 }}>
            <Board
              fen={PREVIEW_FEN}
              maxWidth={240}
              showCoordinates={false}
              evalTarget={false}
              allowFlip={false}
              themeOverride={draft.boardTheme}
              pieceSetOverride={draft.pieceSet}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3>Platforms</h3>
        <div className="muted" style={{ marginBottom: 8 }}>
          Used to detect which side you played in imported games and to prefill imports.
        </div>
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <label className="field" style={{ flex: 1, minWidth: 180 }}>
            Chess.com username
            <input value={draft.chesscomUsername} onChange={(e) => set('chesscomUsername', e.target.value)} />
          </label>
          <label className="field" style={{ flex: 1, minWidth: 180 }}>
            Lichess username
            <input value={draft.lichessUsername} onChange={(e) => set('lichessUsername', e.target.value)} />
          </label>
        </div>
        <label className="field" style={{ marginTop: 8 }}>
          Contact for API User-Agent (recommended for large imports)
          <input
            value={draft.userAgentContact}
            onChange={(e) => set('userAgentContact', e.target.value)}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3>AI provider</h3>
        <div className="muted" style={{ marginBottom: 8 }}>
          Optional. Your games and notes are only sent when you explicitly generate a lesson. Local-only mode: choose
          “Manual”.
        </div>
        <div className="col">
          <label className="field" style={{ width: 260 }}>
            Mode
            <select
              value={draft.aiConfig.mode}
              onChange={(e) => set('aiConfig', { ...draft.aiConfig, mode: e.target.value as AppSettings['aiConfig']['mode'] })}
            >
              <option value="manual">Manual (no AI)</option>
              <option value="openai-compatible">OpenAI-compatible API</option>
              <option value="local-http">Local model (HTTP)</option>
            </select>
          </label>
          {draft.aiConfig.mode !== 'manual' && (
            <>
              <label className="field">
                Base URL
                <input
                  value={draft.aiConfig.baseUrl}
                  onChange={(e) => set('aiConfig', { ...draft.aiConfig, baseUrl: e.target.value })}
                  placeholder={
                    draft.aiConfig.mode === 'local-http' ? 'http://localhost:11434/v1' : 'https://api.openai.com/v1'
                  }
                />
              </label>
              <div className="row" style={{ flexWrap: 'wrap' }}>
                <label className="field" style={{ flex: 1, minWidth: 200 }}>
                  API key {draft.aiConfig.mode === 'local-http' && <span className="muted">(often not needed)</span>}
                  <input
                    type="password"
                    value={draft.aiConfig.apiKey}
                    onChange={(e) => set('aiConfig', { ...draft.aiConfig, apiKey: e.target.value })}
                  />
                </label>
                <label className="field" style={{ flex: 1, minWidth: 200 }}>
                  Model
                  <input
                    value={draft.aiConfig.model}
                    onChange={(e) => set('aiConfig', { ...draft.aiConfig, model: e.target.value })}
                    placeholder="model name"
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3>Privacy</h3>
        <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
          <li>All games, analysis, and lessons live in a local SQLite database.</li>
          <li>Network calls: Chess.com/Lichess public APIs during import, and your AI provider only on request.</li>
          <li>Ongoing games are never queued for engine analysis.</li>
        </ul>
      </div>

      <div className="row">
        <button className="primary" onClick={() => void save()}>
          Save settings
        </button>
        {saved && <span className="badge green">Saved</span>}
      </div>
    </div>
  )
}
