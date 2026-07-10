import { useState } from 'react'
import { useStore } from '../store'
import { api } from '../api'

export const ONBOARDING_DONE_KEY = 'cms-onboarding-done'

type Step = 'identity' | 'import' | 'engine' | 'done'

export function Onboarding(): React.JSX.Element {
  const settings = useStore((s) => s.settings)
  const refreshSettings = useStore((s) => s.refreshSettings)
  const setOnboardingOpen = useStore((s) => s.setOnboardingOpen)
  const setImportModalOpen = useStore((s) => s.setImportModalOpen)
  const navigate = useStore((s) => s.navigate)

  const [step, setStep] = useState<Step>('identity')
  const [chesscomUsername, setChesscomUsername] = useState(settings?.chesscomUsername ?? '')
  const [lichessUsername, setLichessUsername] = useState(settings?.lichessUsername ?? '')
  const [ratingCurrent, setRatingCurrent] = useState(settings?.ratingCurrent ?? 1500)
  const [saving, setSaving] = useState(false)

  function finish(): void {
    try {
      window.localStorage.setItem(ONBOARDING_DONE_KEY, 'true')
    } catch {
      /* ignore */
    }
    setOnboardingOpen(false)
  }

  async function saveIdentity(): Promise<void> {
    setSaving(true)
    try {
      await api.settings.set({
        chesscomUsername: chesscomUsername.trim(),
        lichessUsername: lichessUsername.trim(),
        ratingCurrent
      })
      await refreshSettings()
      if (chesscomUsername.trim() || lichessUsername.trim()) await api.identity.backfill()
      setStep('import')
    } finally {
      setSaving(false)
    }
  }

  const steps: Step[] = ['identity', 'import', 'engine']
  const stepIndex = steps.indexOf(step)

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ width: 520 }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 style={{ margin: 0 }}>Welcome to Chess Mentor Studio</h2>
          <button className="small" onClick={finish}>
            Skip setup
          </button>
        </div>
        <div className="muted" style={{ marginBottom: 16 }}>
          Step {stepIndex + 1} of {steps.length}
        </div>

        {step === 'identity' && (
          <div className="col">
            <p>
              Tell us who you are so we can tell your games apart from your opponents' — this drives everything
              else (which side to review, whose mistakes to train).
            </p>
            <label className="field">
              Chess.com username
              <input
                value={chesscomUsername}
                onChange={(e) => setChesscomUsername(e.target.value)}
                placeholder="your-username (optional)"
              />
            </label>
            <label className="field">
              Lichess username
              <input
                value={lichessUsername}
                onChange={(e) => setLichessUsername(e.target.value)}
                placeholder="your-username (optional)"
              />
            </label>
            <label className="field" style={{ width: 140 }}>
              Current rating
              <input
                type="number"
                value={ratingCurrent}
                onChange={(e) => setRatingCurrent(parseInt(e.target.value) || 1500)}
              />
            </label>
            <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="primary" disabled={saving} onClick={() => void saveIdentity()}>
                {saving ? 'Saving…' : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {step === 'import' && (
          <div className="col">
            <p>Import your recent games from Chess.com or Lichess, or paste a PGN — this builds your training plan.</p>
            <div className="row">
              <button
                className="primary"
                onClick={() => {
                  setImportModalOpen(true)
                  setStep('engine')
                }}
              >
                Import my games…
              </button>
              <button onClick={() => setStep('engine')}>Skip for now</button>
            </div>
          </div>
        )}

        {step === 'engine' && (
          <div className="col">
            <p>
              Add a local UCI engine (e.g. Stockfish, free at stockfishchess.org) so imported games can be analyzed
              for mistakes on this machine. Nothing is sent anywhere — analysis runs locally.
            </p>
            <div className="row">
              <button
                className="primary"
                onClick={() => {
                  navigate({ name: 'engines' })
                  finish()
                }}
              >
                Set up an engine…
              </button>
              <button onClick={finish}>Skip for now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
