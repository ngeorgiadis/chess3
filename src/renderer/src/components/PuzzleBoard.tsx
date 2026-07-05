import { useEffect, useMemo, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { Board } from './Board'
import type { SolutionMove } from '@shared/types'

export interface PuzzleBoardProps {
  fen: string
  solution: SolutionMove[]
  prompt?: string
  hints?: string[]
  explanation?: string
  /** Called once when the puzzle is finished. firstTry = solved without any wrong move or hint. */
  onComplete?: (firstTry: boolean) => void
  maxWidth?: number
}

type Status = 'solving' | 'wrong' | 'solved'

/**
 * Interactive puzzle: the user must play the solution moves for the side to move;
 * the opponent's replies from the solution line are played automatically.
 */
export function PuzzleBoard({
  fen,
  solution,
  prompt,
  hints = [],
  explanation,
  onComplete,
  maxWidth = 480
}: PuzzleBoardProps): React.JSX.Element {
  const [position, setPosition] = useState(fen)
  const [solutionIdx, setSolutionIdx] = useState(0)
  const [status, setStatus] = useState<Status>('solving')
  const [failedOnce, setFailedOnce] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null)
  const completedRef = useRef(false)

  // Reset when the puzzle changes
  useEffect(() => {
    setPosition(fen)
    setSolutionIdx(0)
    setStatus('solving')
    setFailedOnce(false)
    setHintsShown(0)
    setLastMove(null)
    completedRef.current = false
  }, [fen, solution])

  const orientation = useMemo(() => {
    try {
      return new Chess(fen).turn() === 'w' ? 'white' : 'black'
    } catch {
      return 'white'
    }
  }, [fen])

  function applyMove(pos: string, uci: string): string {
    const chess = new Chess(pos)
    chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
    setLastMove({ from: uci.slice(0, 2), to: uci.slice(2, 4) })
    return chess.fen()
  }

  function finish(): void {
    setStatus('solved')
    if (!completedRef.current) {
      completedRef.current = true
      onComplete?.(!failedOnce && hintsShown === 0)
    }
  }

  function handleMove(uci: string): void {
    if (status === 'solved') return
    const expected = solution[solutionIdx]?.moveUci
    if (!expected) return
    if (uci === expected) {
      let next = applyMove(position, uci)
      let idx = solutionIdx + 1
      // auto-play opponent reply if present
      if (idx < solution.length) {
        const reply = solution[idx].moveUci
        try {
          next = applyMove(next, reply)
          idx++
        } catch {
          // reply illegal (shouldn't happen with validated content) — end here
          idx = solution.length
        }
      }
      setPosition(next)
      setSolutionIdx(idx)
      setStatus('solving')
      if (idx >= solution.length) finish()
    } else {
      setFailedOnce(true)
      setStatus('wrong')
    }
  }

  function showSolution(): void {
    setFailedOnce(true)
    let pos = position
    for (let i = solutionIdx; i < solution.length; i++) {
      try {
        pos = applyMove(pos, solution[i].moveUci)
      } catch {
        break
      }
    }
    setPosition(pos)
    setSolutionIdx(solution.length)
    finish()
  }

  const sideLabel = orientation === 'white' ? 'White' : 'Black'

  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 18 }}>
      <div style={{ flex: `0 1 ${maxWidth}px`, minWidth: 300 }}>
        <Board
          fen={position}
          orientation={orientation}
          interactive={status !== 'solved'}
          lastMove={lastMove}
          onMove={handleMove}
          maxWidth={maxWidth}
        />
      </div>
      <div className="col" style={{ flex: 1, minWidth: 220 }}>
        <div>{prompt ?? `${sideLabel} to move. Find the best continuation.`}</div>
        {status === 'wrong' && (
          <div className="callout warn">
            Not this one — that move loses the thread. Take another look at forcing moves.
            <div className="row" style={{ marginTop: 6 }}>
              <button className="small" onClick={() => setStatus('solving')}>
                Try again
              </button>
              <button className="small" onClick={showSolution}>
                Show solution
              </button>
            </div>
          </div>
        )}
        {status === 'solving' && hintsShown < hints.length && (
          <button className="small" style={{ alignSelf: 'flex-start' }} onClick={() => setHintsShown(hintsShown + 1)}>
            Hint ({hintsShown + 1}/{hints.length})
          </button>
        )}
        {hints.slice(0, hintsShown).map((h, i) => (
          <div key={i} className="callout">
            {h}
          </div>
        ))}
        {status === 'solved' && (
          <div className="callout success">
            <b>{failedOnce || hintsShown > 0 ? 'Solved (with help).' : 'Correct!'}</b>
            <div style={{ marginTop: 4 }}>
              Solution: <span className="mono">{solution.map((m) => m.moveSan ?? m.moveUci).join(' ')}</span>
            </div>
            {explanation && <div style={{ marginTop: 6 }}>{explanation}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
