import { useCallback, useEffect, useState } from 'react'
import { api } from '../api'
import { useAppEvent } from '../store'
import { PuzzleBoard } from '../components/PuzzleBoard'
import type { ExerciseRecord } from '@shared/types'

export function Exercises(): React.JSX.Element {
  const [all, setAll] = useState<ExerciseRecord[]>([])
  const [session, setSession] = useState<ExerciseRecord[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [solvedCount, setSolvedCount] = useState(0)

  const refresh = useCallback(() => {
    void api.exercises.list().then(setAll)
  }, [])
  useEffect(refresh, [refresh])
  useAppEvent(['exercises:changed'], refresh)

  async function startSession(): Promise<void> {
    const due = await api.exercises.due()
    setSession(due.slice(0, 10))
    setIdx(0)
    setSolvedCount(0)
  }

  if (session) {
    const current = session[idx]
    if (!current) {
      return (
        <div>
          <h1>Exercises</h1>
          <div className="card" style={{ textAlign: 'center', padding: 36 }}>
            <p>
              Session complete: <b>{solvedCount}</b> of {session.length} solved on the first try.
            </p>
            <p className="muted">You solved positions you missed in real games. Scheduling updated.</p>
            <button className="primary" onClick={() => setSession(null)}>
              Done
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <h1>Exercises</h1>
        <p className="subtitle">
          Puzzle {idx + 1} of {session.length} · {current.title}
        </p>
        <PuzzleBoard
          key={current.id}
          fen={current.fen}
          solution={current.solution.moves}
          prompt={current.prompt}
          hints={current.hints}
          explanation={current.solution.explanation}
          onComplete={(firstTry) => {
            void api.exercises.attempt(current.id, firstTry)
            if (firstTry) setSolvedCount((c) => c + 1)
          }}
        />
        <div className="row" style={{ marginTop: 14 }}>
          <button onClick={() => setIdx(idx + 1)}>Next puzzle →</button>
          <button onClick={() => setSession(null)}>End session</button>
        </div>
      </div>
    )
  }

  const dueNow = all.filter((e) => e.dueAt && e.dueAt <= new Date().toISOString())

  return (
    <div>
      <h1>Exercises</h1>
      <p className="subtitle">Personalized puzzles generated from your own mistakes, scheduled by spaced repetition.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="stat-big">{dueNow.length}</div>
            <div className="muted">due now · {all.length} total</div>
          </div>
          <button className="primary" disabled={dueNow.length === 0} onClick={() => void startSession()}>
            Start session
          </button>
        </div>
      </div>

      {all.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 36 }}>
          <p>No exercises yet.</p>
          <p className="muted">Analyze your games — every classified mistake becomes a training position.</p>
        </div>
      ) : (
        <table className="data">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Tags</th>
              <th>Difficulty</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {all.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td className="muted">{e.type.replace(/_/g, ' ')}</td>
                <td>
                  {e.tags.slice(0, 3).map((t) => (
                    <span key={t} className="badge" style={{ marginRight: 4 }}>
                      {t}
                    </span>
                  ))}
                </td>
                <td className="muted">{'★'.repeat(e.difficulty)}</td>
                <td className="muted">{e.dueAt ? e.dueAt.slice(0, 10) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
