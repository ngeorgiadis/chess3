import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { useStore } from '../store'
import { Board } from '../components/Board'
import type { GameRecord, MistakeRecord, MistakeSeverity, MoveRecord, PositionAnalysis } from '@shared/types'

const SEVERITY_LABEL: Record<string, string> = {
  blunder: 'Blunder',
  mistake: 'Mistake',
  inaccuracy: 'Inaccuracy',
  'missed-win': 'Missed win',
  'missed-draw': 'Missed draw'
}

const SEVERITY_GLYPH: Record<MistakeSeverity, { glyph: string; cls: string }> = {
  blunder: { glyph: '??', cls: 'sev-blunder' },
  'missed-win': { glyph: '??', cls: 'sev-blunder' },
  mistake: { glyph: '?', cls: 'sev-mistake' },
  'missed-draw': { glyph: '?', cls: 'sev-mistake' },
  inaccuracy: { glyph: '?!', cls: 'sev-inaccuracy' }
}

/** White-perspective centipawns for the eval graph / bars. */
function whiteCp(a: PositionAnalysis): number {
  const best = a.multiPv[0]
  if (!best) return 0
  let cp = best.score.type === 'mate' ? (best.score.value > 0 ? 1000 : -1000) : best.score.value
  if (a.sideToMove === 'b') cp = -cp
  return Math.max(-800, Math.min(800, cp))
}

/** 0..100 white win-share for a static eval bar, same squash curve as the sidebar live-eval bar. */
function whitePct(a: PositionAnalysis | undefined): number {
  if (!a) return 50
  const cp = whiteCp(a)
  return 50 + 50 * (2 / (1 + Math.exp(-cp / 400)) - 1)
}

function EvalGraph({
  analyses,
  mistakes,
  currentPly,
  onSelect
}: {
  analyses: PositionAnalysis[]
  mistakes: MistakeRecord[]
  currentPly: number
  onSelect: (ply: number) => void
}): React.JSX.Element {
  const width = 800
  const height = 140
  const n = analyses.length
  if (n < 2) return <div className="muted">No evaluation data.</div>
  const yOf = (a: PositionAnalysis): number => height / 2 - (whiteCp(a) / 800) * (height / 2 - 6)
  const xOf = (i: number): number => (i / (n - 1)) * width
  const points = analyses.map((a, i) => `${xOf(i).toFixed(1)},${yOf(a).toFixed(1)}`)
  const areaPoints = [`0,${height / 2}`, ...points, `${width},${height / 2}`].join(' ')
  const cursorX = xOf(currentPly)

  const dots = mistakes
    .map((m) => {
      const idx = analyses.findIndex((a) => a.ply === m.ply)
      if (idx < 0) return null
      const sev = SEVERITY_GLYPH[m.severity]
      const color =
        sev.cls === 'sev-blunder' ? 'var(--danger)' : sev.cls === 'sev-mistake' ? 'var(--warn)' : 'var(--info)'
      return { x: xOf(idx), y: yOf(analyses[idx]), color, m }
    })
    .filter((d): d is { x: number; y: number; color: string; m: MistakeRecord } => d !== null)

  return (
    <svg
      className="eval-graph"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      onClick={(e) => {
        const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
        const frac = (e.clientX - rect.left) / rect.width
        onSelect(Math.round(frac * (n - 1)))
      }}
      style={{ cursor: 'pointer' }}
    >
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="var(--border)" strokeWidth={1} />
      <polygon points={areaPoints} fill="var(--info)" opacity={0.16} stroke="none" />
      <polyline points={points.join(' ')} fill="none" stroke="var(--info)" strokeWidth={2} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={4.5} fill={d.color} stroke="var(--bg-raised)" strokeWidth={1.5}>
          <title>
            Move {Math.ceil(d.m.ply / 2)} · {SEVERITY_LABEL[d.m.severity]}
          </title>
        </circle>
      ))}
      <line x1={cursorX} y1={0} x2={cursorX} y2={height} stroke="var(--accent)" strokeWidth={2} />
    </svg>
  )
}

function AccuracySummary({ game, mistakes }: { game: GameRecord; mistakes: MistakeRecord[] }): React.JSX.Element | null {
  if (game.accuracyWhite == null && game.accuracyBlack == null) return null
  const counts: Partial<Record<MistakeSeverity, number>> = {}
  for (const m of mistakes) counts[m.severity] = (counts[m.severity] ?? 0) + 1
  const summaryBits: string[] = []
  if (counts.blunder || counts['missed-win']) summaryBits.push(`${(counts.blunder ?? 0) + (counts['missed-win'] ?? 0)} blunder(s)`)
  if (counts.mistake || counts['missed-draw']) summaryBits.push(`${(counts.mistake ?? 0) + (counts['missed-draw'] ?? 0)} mistake(s)`)
  if (counts.inaccuracy) summaryBits.push(`${counts.inaccuracy} inaccuracy(-ies)`)

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div className="accuracy-row">
        <div>
          <div className="accuracy-pill">{game.accuracyWhite != null ? game.accuracyWhite.toFixed(1) : '—'}</div>
          <div className="muted">White accuracy</div>
        </div>
        <div>
          <div className="accuracy-pill">{game.accuracyBlack != null ? game.accuracyBlack.toFixed(1) : '—'}</div>
          <div className="muted">Black accuracy</div>
        </div>
        <div className="muted">{summaryBits.length > 0 ? summaryBits.join(' · ') : 'No flagged mistakes'}</div>
      </div>
    </div>
  )
}

export function Review({ gameId }: { gameId: string }): React.JSX.Element {
  const navigate = useStore((s) => s.navigate)
  const [game, setGame] = useState<GameRecord | null>(null)
  const [moves, setMoves] = useState<MoveRecord[]>([])
  const [analyses, setAnalyses] = useState<PositionAnalysis[]>([])
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([])
  const [currentPly, setCurrentPly] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [tryMode, setTryMode] = useState(false)
  const [tryFeedback, setTryFeedback] = useState<string | null>(null)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    void api.games.get(gameId).then(setGame)
    void api.games.moves(gameId).then(setMoves)
    void api.analysis.forGame(gameId).then(setAnalyses)
    void api.analysis.mistakes(gameId).then(setMistakes)
  }, [gameId])

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowLeft') setCurrentPly((p) => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setCurrentPly((p) => Math.min(moves.length, p + 1))
      if (e.key === 'Home') setCurrentPly(0)
      if (e.key === 'End') setCurrentPly(moves.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [moves.length])

  useEffect(() => {
    setRevealed(false)
    setTryMode(false)
    setTryFeedback(null)
  }, [currentPly])

  // autoplay
  useEffect(() => {
    if (!autoplay) return
    if (currentPly >= moves.length) {
      setAutoplay(false)
      return
    }
    const t = setTimeout(() => setCurrentPly((p) => Math.min(moves.length, p + 1)), 900)
    return () => clearTimeout(t)
  }, [autoplay, currentPly, moves.length])

  const mistakeByPly = useMemo(() => new Map(mistakes.map((m) => [m.ply, m])), [mistakes])
  const analysisByPly = useMemo(() => new Map(analyses.map((a) => [a.ply, a])), [analyses])

  if (!game) return <div className="muted">Loading…</div>

  const fen =
    currentPly === 0
      ? moves[0]?.fenBefore ?? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      : moves[currentPly - 1].fenAfter
  const lastMove =
    currentPly > 0
      ? { from: moves[currentPly - 1].uci.slice(0, 2), to: moves[currentPly - 1].uci.slice(2, 4) }
      : null
  const orientation = game.userColor === 'black' ? 'black' : 'white'

  // Coaching context: the mistake at the move we just stepped past
  const mistakeHere = mistakeByPly.get(currentPly)
  // "Find the better move" mode: position before an upcoming mistake
  const upcomingMistake = mistakeByPly.get(currentPly + 1)
  const positionAnalysis = analysisByPly.get(currentPly)
  const bestHere = positionAnalysis?.multiPv[0]

  // After revealing a critical moment: compare the game move (red) with the better move (green)
  const playedNext = upcomingMistake && revealed ? moves[currentPly] : null
  const boardArrows = playedNext
    ? [
        { from: playedNext.uci.slice(0, 2), to: playedNext.uci.slice(2, 4), color: 'red' },
        ...(upcomingMistake!.betterMoveUci
          ? [
              {
                from: upcomingMistake!.betterMoveUci.slice(0, 2),
                to: upcomingMistake!.betterMoveUci.slice(2, 4),
                color: 'green'
              }
            ]
          : [])
      ]
    : []

  function jumpToMistake(direction: 1 | -1): void {
    if (direction === 1) {
      const next = mistakes.find((m) => m.ply > currentPly)
      if (next) setCurrentPly(next.ply)
    } else {
      const prevMs = [...mistakes].reverse().find((m) => m.ply < currentPly)
      if (prevMs) setCurrentPly(prevMs.ply)
    }
  }

  function handleTryMove(uci: string, san: string): void {
    if (!upcomingMistake) return
    if (uci === upcomingMistake.betterMoveUci) {
      setTryFeedback(`✓ Correct — ${san} was the engine's top choice.`)
      setRevealed(true)
      setTryMode(false)
    } else {
      setTryFeedback(`${san} isn't the engine's top choice. Try again, or reveal what happened.`)
    }
  }

  async function createExercise(m: MistakeRecord): Promise<void> {
    try {
      await api.exercises.fromMistake(m.id)
      setNotice('Exercise created — it will appear in Exercises, due today.')
    } catch (e) {
      setNotice((e as Error).message)
    }
  }

  async function addLineToRepertoire(uptoPly: number): Promise<void> {
    try {
      const nodes = await api.repertoire.addLineFromGame(gameId, uptoPly)
      setNotice(`Added ${nodes.length} of your moves to the ${orientation} repertoire.`)
    } catch (e) {
      setNotice((e as Error).message)
    }
  }

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <h1>
            {game.whiteName} vs {game.blackName}{' '}
            <span className="muted" style={{ fontSize: 14 }}>
              {game.result} · {game.timeClass ?? ''}
            </span>
          </h1>
          <p className="subtitle">{game.openingName ?? game.ecoCode ?? ''}</p>
        </div>
        <button onClick={() => navigate({ name: 'games' })}>← Games</button>
      </div>

      {analyses.length === 0 && (
        <div className="callout warn" style={{ marginBottom: 12 }}>
          This game has no engine analysis yet. Queue it from the Games screen to see mistakes and coaching.
        </div>
      )}
      {analyses.length > 0 && <AccuracySummary game={game} mistakes={mistakes} />}
      {notice && (
        <div className="callout" style={{ marginBottom: 12 }}>
          {notice}
        </div>
      )}

      <div className="row" style={{ alignItems: 'flex-start', gap: 16 }}>
        {/* Move list */}
        <div className="card" style={{ width: 230, flexShrink: 0, maxHeight: 560, overflowY: 'auto' }}>
          <h3>Moves</h3>
          <div className="move-list">
            {moves.map((m) => {
              const mk = mistakeByPly.get(m.ply)
              const before = analysisByPly.get(m.ply - 1)
              const isBest = !mk && before?.multiPv[0]?.moveUci === m.uci
              const glyph = mk ? SEVERITY_GLYPH[mk.severity] : isBest ? { glyph: '✓', cls: 'sev-best' } : null
              return (
                <span key={m.ply}>
                  {m.color === 'white' && <span className="num">{m.moveNumber}.</span>}
                  <span
                    className={`mv ${currentPly === m.ply ? 'current' : ''} ${mk ? mk.severity.replace('missed-win', 'blunder').replace('missed-draw', 'blunder') : ''}`}
                    onClick={() => setCurrentPly(m.ply)}
                    title={mk ? SEVERITY_LABEL[mk.severity] : isBest ? 'Best move' : undefined}
                  >
                    {m.san}
                    {glyph && <span className={`mv-glyph ${glyph.cls}`}>{glyph.glyph}</span>}
                  </span>
                </span>
              )
            })}
          </div>
        </div>

        {/* Board */}
        <div style={{ flex: '0 1 520px', minWidth: 320 }}>
          <div className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
            <div
              className="eval-bar-vert-outer"
              style={{ height: 'min(52vh, 480px)' }}
              title="Static eval from stored analysis (White ↔ Black)"
            >
              <div className="eval-bar-vert-white" style={{ height: `${whitePct(positionAnalysis)}%` }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Board
                fen={fen}
                orientation={orientation}
                interactive={tryMode}
                onMove={tryMode ? handleTryMove : undefined}
                lastMove={lastMove}
                lastMoveSeverity={mistakeHere?.severity ?? null}
                arrows={boardArrows}
                maxWidth={500}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="small" onClick={() => setCurrentPly(0)}>⏮</button>
            <button className="small" onClick={() => setCurrentPly(Math.max(0, currentPly - 1))}>◀</button>
            <button
              className="small"
              title="Previous critical moment"
              disabled={!mistakes.some((m) => m.ply < currentPly)}
              onClick={() => jumpToMistake(-1)}
            >
              ⏴!
            </button>
            <span className="muted" style={{ minWidth: 90, textAlign: 'center' }}>
              Move {currentPly}/{moves.length}
            </span>
            <button
              className="small"
              title="Next critical moment"
              disabled={!mistakes.some((m) => m.ply > currentPly)}
              onClick={() => jumpToMistake(1)}
            >
              !⏵
            </button>
            <button className="small" onClick={() => setCurrentPly(Math.min(moves.length, currentPly + 1))}>▶</button>
            <button className="small" onClick={() => setCurrentPly(moves.length)}>⏭</button>
            <button className={`small ${autoplay ? 'primary' : ''}`} onClick={() => setAutoplay((a) => !a)}>
              {autoplay ? '⏸ Pause' : '▶ Autoplay'}
            </button>
          </div>
          {analyses.length > 1 && (
            <div style={{ marginTop: 8 }}>
              <EvalGraph analyses={analyses} mistakes={mistakes} currentPly={currentPly} onSelect={setCurrentPly} />
            </div>
          )}
        </div>

        {/* Coaching panel */}
        <div className="col" style={{ flex: 1, minWidth: 260 }}>
          {upcomingMistake && !revealed && (
            <div className="card">
              <h3>Critical moment ahead</h3>
              <p>
                {upcomingMistake.severity === 'blunder' ? 'This was the critical mistake in your game.' : 'You went wrong on the next move.'}{' '}
                Before revealing: find your candidate moves. What is forcing? What changed after the last move?
              </p>
              {tryFeedback && (
                <div className={`callout ${tryFeedback.startsWith('✓') ? 'success' : 'warn'}`} style={{ marginBottom: 8 }}>
                  {tryFeedback}
                </div>
              )}
              <div className="row" style={{ flexWrap: 'wrap' }}>
                {!tryMode && (
                  <button className="primary" onClick={() => setTryMode(true)}>
                    Try it on the board
                  </button>
                )}
                <button onClick={() => setRevealed(true)}>Compare with what happened</button>
              </div>
            </div>
          )}

          {mistakeHere && (
            <div className="card">
              <h3>
                <span className={`badge ${mistakeHere.severity === 'inaccuracy' ? 'blue' : mistakeHere.severity === 'mistake' ? 'yellow' : 'red'}`}>
                  {SEVERITY_LABEL[mistakeHere.severity]}
                </span>{' '}
                Move {Math.ceil(mistakeHere.ply / 2)}
              </h3>
              <p>{mistakeHere.humanSummary}</p>
              {mistakeHere.whyBad && <p className="muted">{mistakeHere.whyBad}</p>}
              <div className="muted" style={{ marginBottom: 8 }}>
                Better: <b className="mono">{mistakeHere.betterMoveSan ?? mistakeHere.betterMoveUci}</b>
                {mistakeHere.evalLossCp != null && <> · cost ≈ {(mistakeHere.evalLossCp / 100).toFixed(1)} pawns</>}
                {' · '}confidence: {mistakeHere.confidence}
              </div>
              <div className="row" style={{ flexWrap: 'wrap' }}>
                <button className="small primary" onClick={() => void createExercise(mistakeHere)}>
                  Create exercise
                </button>
                <button className="small" onClick={() => setCurrentPly(mistakeHere.ply - 1)}>
                  Go to position before
                </button>
              </div>
            </div>
          )}

          {(revealed || mistakeHere || !upcomingMistake) && bestHere && (
            <div className="card">
              <h3>What the engine saw</h3>
              {positionAnalysis!.multiPv.slice(0, 3).map((pv) => (
                <div key={pv.rank} className="muted" style={{ marginBottom: 4 }}>
                  <b className="mono">{pv.moveSan ?? pv.moveUci}</b>{' '}
                  <span className="mono">
                    {pv.score.type === 'mate' ? `#${pv.score.value}` : (pv.score.value / 100).toFixed(2)}
                  </span>{' '}
                  <span style={{ fontSize: 11 }}>{(pv.pvSan ?? pv.pvUci).slice(0, 6).join(' ')}</span>
                </div>
              ))}
              <div className="muted" style={{ fontSize: 11 }}>
                depth {positionAnalysis!.depth ?? '?'} · engine is a verifier, not the teacher
              </div>
            </div>
          )}

          <div className="card">
            <h3>Turn this into training</h3>
            <div className="row" style={{ flexWrap: 'wrap' }}>
              <button
                className="small"
                disabled={currentPly === 0}
                onClick={() => void addLineToRepertoire(Math.min(currentPly, 20))}
              >
                Add opening line to repertoire
              </button>
            </div>
          </div>

          {mistakes.length > 0 && (
            <div className="card" style={{ maxHeight: 240, overflowY: 'auto' }}>
              <h3>Critical moments ({mistakes.length})</h3>
              <div className="col" style={{ gap: 6 }}>
                {mistakes.map((m) => (
                  <div
                    key={m.id}
                    className="row"
                    style={{ justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => setCurrentPly(m.ply)}
                  >
                    <span>
                      Move {Math.ceil(m.ply / 2)} ·{' '}
                      <span className={`badge ${m.severity === 'inaccuracy' ? 'blue' : m.severity === 'mistake' ? 'yellow' : 'red'}`}>
                        {SEVERITY_LABEL[m.severity]}
                      </span>
                    </span>
                    <span className="muted mono">{m.betterMoveSan}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
