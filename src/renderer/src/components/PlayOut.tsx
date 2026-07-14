import { useEffect, useRef, useState } from 'react'
import { api } from '../api'
import { Board } from './Board'
import { playSound } from '../sound'
import type { PlayGameState } from '@shared/types'

const STRENGTH_PRESETS: Array<{ label: string; elo: number | undefined }> = [
  { label: 'Club (1200)', elo: 1200 },
  { label: 'Strong club (1600)', elo: 1600 },
  { label: 'Expert (2000)', elo: 2000 },
  { label: 'Full strength', elo: undefined }
]

function resultLabel(state: PlayGameState, userColor: 'white' | 'black'): string {
  if (!state.result) return 'Game over.'
  if (state.result === '1/2-1/2') return `Draw by ${state.reason ?? 'agreement'}.`
  const userWon = (userColor === 'white' && state.result === '1-0') || (userColor === 'black' && state.result === '0-1')
  return userWon ? `You won by ${state.reason}.` : `The engine won by ${state.reason}.`
}

export function PlayOut({
  fen,
  userColor,
  onExit
}: {
  fen: string
  userColor: 'white' | 'black'
  onExit: () => void
}): React.JSX.Element {
  const [state, setState] = useState<PlayGameState | null>(null)
  const [started, setStarted] = useState(false)
  const [starting, setStarting] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [elo, setElo] = useState<number | undefined>(1200)
  const stoppedRef = useRef(false)

  useEffect(() => {
    stoppedRef.current = false
    return () => {
      stoppedRef.current = true
      void api.play.stop()
    }
  }, [])

  async function begin(): Promise<void> {
    setStarting(true)
    setError(null)
    try {
      const res = await api.play.start({ fen, userColor, eloTarget: elo })
      if (stoppedRef.current) return
      setState(res.state)
      setStarted(true)
      if (res.engineMove) playSound(res.engineMove.san.includes('x') ? 'capture' : 'move')
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setStarting(false)
    }
  }

  async function handleMove(uci: string): Promise<void> {
    setThinking(true)
    setError(null)
    try {
      const res = await api.play.move(uci)
      if (stoppedRef.current) return
      setState(res.state)
      if (res.engineMove) playSound(res.engineMove.san.includes('x') ? 'capture' : 'move')
      if (res.state.over) playSound('complete')
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setThinking(false)
    }
  }

  const lastMoveEntry = state?.moves[state.moves.length - 1]
  const lastMove = lastMoveEntry ? { from: lastMoveEntry.uci.slice(0, 2), to: lastMoveEntry.uci.slice(2, 4) } : null
  const isUsersTurn = state ? state.turn === (userColor === 'white' ? 'w' : 'b') : false

  if (!started) {
    return (
      <div className="card">
        <h3>Play it out</h3>
        <p className="muted">Play this position against the engine. Pick a strength, then make your move on the board.</p>
        {error && (
          <div className="callout error" style={{ marginBottom: 8 }}>
            {error}
          </div>
        )}
        <div className="row" style={{ flexWrap: 'wrap', marginBottom: 10 }}>
          {STRENGTH_PRESETS.map((p) => (
            <button key={p.label} className={`small ${elo === p.elo ? 'primary' : ''}`} onClick={() => setElo(p.elo)}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="row">
          <button className="primary" disabled={starting} onClick={() => void begin()}>
            {starting ? 'Starting…' : 'Start game'}
          </button>
          <button onClick={onExit}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Board
        fen={state?.fen ?? fen}
        orientation={userColor}
        interactive={!state?.over && !thinking}
        onMove={(uci) => void handleMove(uci)}
        lastMove={lastMove}
        evalTarget={false}
        maxWidth={440}
      />
      <div className="row" style={{ marginTop: 10, justifyContent: 'space-between' }}>
        <div className="muted">
          {state?.over
            ? resultLabel(state, userColor)
            : thinking
              ? 'Engine is thinking…'
              : isUsersTurn
                ? 'Your move.'
                : 'Waiting for the engine…'}
        </div>
        <button className="small" onClick={onExit}>
          {state?.over ? 'Back to review' : 'Exit'}
        </button>
      </div>
      {error && (
        <div className="callout error" style={{ marginTop: 8 }}>
          {error}
        </div>
      )}
    </div>
  )
}
