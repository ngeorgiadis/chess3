import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useAppEvent } from '../store'
import { PuzzleBoard } from '../components/PuzzleBoard'
import { playSound } from '../sound'
import type { ExerciseRecord } from '@shared/types'

export function Exercises({ initialTag }: { initialTag?: string }): React.JSX.Element {
  const [all, setAll] = useState<ExerciseRecord[]>([])
  const [tagFilter, setTagFilter] = useState<string | null>(initialTag ?? null)
  const [session, setSession] = useState<ExerciseRecord[] | null>(null)
  const [idx, setIdx] = useState(0)
  const [solvedCount, setSolvedCount] = useState(0)
  /** Per-puzzle outcome so far this session, in order — drives the progress dots. */
  const [results, setResults] = useState<Array<'correct' | 'missed'>>([])
  const [attempted, setAttempted] = useState(false)

  const refresh = useCallback(() => {
    void api.exercises.list().then(setAll)
  }, [])
  useEffect(refresh, [refresh])
  useAppEvent(['exercises:changed'], refresh)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    for (const e of all) for (const t of e.tags) s.add(t)
    return [...s].sort()
  }, [all])

  const filtered = useMemo(() => (tagFilter ? all.filter((e) => e.tags.includes(tagFilter)) : all), [all, tagFilter])

  async function beginSession(items: ExerciseRecord[]): Promise<void> {
    setSession(items)
    setIdx(0)
    setSolvedCount(0)
    setResults([])
    setAttempted(false)
  }

  async function startSession(): Promise<void> {
    const due = await api.exercises.due()
    const scoped = tagFilter ? due.filter((e) => e.tags.includes(tagFilter)) : due
    await beginSession(scoped.slice(0, 10))
  }

  /** When nothing is due, let the user practice ahead anyway rather than hitting a dead end. */
  async function practiceAnyway(): Promise<void> {
    const items = [...filtered].sort((a, b) => (a.dueAt ?? '').localeCompare(b.dueAt ?? '')).slice(0, 10)
    await beginSession(items)
  }

  function goToNext(): void {
    setIdx((i) => i + 1)
    setAttempted(false)
  }

  const sessionJustFinished = session !== null && idx >= session.length
  useEffect(() => {
    if (sessionJustFinished) playSound('complete')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionJustFinished])

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
            <div className="row" style={{ justifyContent: 'center', gap: 4, margin: '10px 0' }}>
              {results.map((r, i) => (
                <span
                  key={i}
                  title={r === 'correct' ? 'Solved first try' : 'Missed or needed a hint'}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: r === 'correct' ? 'var(--accent-strong)' : 'var(--danger)'
                  }}
                />
              ))}
            </div>
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
        <div className="row" style={{ gap: 4, marginBottom: 10 }}>
          {session.map((_, i) => (
            <span
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background:
                  i < results.length
                    ? results[i] === 'correct'
                      ? 'var(--accent-strong)'
                      : 'var(--danger)'
                    : i === idx
                      ? 'var(--info)'
                      : 'var(--border)'
              }}
            />
          ))}
        </div>
        <PuzzleBoard
          key={current.id}
          fen={current.fen}
          solution={current.solution.moves}
          prompt={current.prompt}
          hints={current.hints}
          explanation={current.solution.explanation}
          onComplete={(firstTry) => {
            void api.exercises.attempt(current.id, firstTry)
            setAttempted(true)
            setResults((r) => [...r, firstTry ? 'correct' : 'missed'])
            playSound(firstTry ? 'correct' : 'wrong')
            if (firstTry) setSolvedCount((c) => c + 1)
          }}
        />
        <div className="row" style={{ marginTop: 14 }}>
          <button disabled={!attempted} title={attempted ? undefined : 'Solve or reveal the solution first'} onClick={goToNext}>
            Next puzzle →
          </button>
          <button onClick={() => setSession(null)}>End session</button>
        </div>
      </div>
    )
  }

  const dueNow = filtered.filter((e) => e.dueAt && e.dueAt <= new Date().toISOString())

  return (
    <div>
      <h1>Exercises</h1>
      <p className="subtitle">Personalized puzzles generated from your own mistakes, scheduled by spaced repetition.</p>

      {allTags.length > 0 && (
        <div className="row" style={{ flexWrap: 'wrap', marginBottom: 12, gap: 6 }}>
          <span className="muted">Focus:</span>
          <button className={`small ${tagFilter === null ? 'primary' : ''}`} onClick={() => setTagFilter(null)}>
            All
          </button>
          {allTags.map((t) => (
            <button key={t} className={`small ${tagFilter === t ? 'primary' : ''}`} onClick={() => setTagFilter(t)}>
              {t.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="stat-big">{dueNow.length}</div>
            <div className="muted">
              due now{tagFilter ? ` · ${tagFilter.replace(/-/g, ' ')}` : ''} · {filtered.length} total
            </div>
          </div>
          {dueNow.length > 0 ? (
            <button className="primary" onClick={() => void startSession()}>
              Start session
            </button>
          ) : (
            filtered.length > 0 && (
              <button className="primary" onClick={() => void practiceAnyway()}>
                Practice anyway
              </button>
            )
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 36 }}>
          <p>No exercises {tagFilter ? `tagged “${tagFilter}”` : 'yet'}.</p>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="clickable" onClick={() => void beginSession([e])}>
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
                <td>
                  <button className="small" onClick={(ev) => { ev.stopPropagation(); void beginSession([e]) }}>
                    Solve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
