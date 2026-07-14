import { useEffect, useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { api } from '../api'
import { useStore } from '../store'
import { Board } from '../components/Board'
import { PlayOut } from '../components/PlayOut'
import { SEVERITY_GLYPH, SEVERITY_LABEL } from '../severity'
import type { GameRecord, MistakeRecord, MoveRecord, PositionAnalysis, PvLine } from '@shared/types'

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

/** White-perspective eval label for a whole position, e.g. "+1.86" or "#4". */
function evalLabel(a: PositionAnalysis): string {
  const best = a.multiPv[0]
  if (!best) return '—'
  if (best.score.type === 'mate') {
    const m = a.sideToMove === 'w' ? best.score.value : -best.score.value
    return `#${m}`
  }
  const cp = whiteCp(a)
  return (cp >= 0 ? '+' : '') + (cp / 100).toFixed(2)
}

/** White-perspective eval label for one PV line at a given side-to-move. */
function pvScoreLabel(pv: PvLine, sideToMove: 'w' | 'b'): string {
  if (pv.score.type === 'mate') {
    const m = sideToMove === 'w' ? pv.score.value : -pv.score.value
    return `#${m}`
  }
  const cp = sideToMove === 'w' ? pv.score.value : -pv.score.value
  return (cp >= 0 ? '+' : '') + (cp / 100).toFixed(2)
}

/** Move-numbered continuation text after the first (already-highlighted) PV move, e.g. "14…Nc6 15.Ne4 Na5". */
function pvContinuationText(pv: PvLine, baseFen: string): string {
  const sans = pv.pvSan && pv.pvSan.length ? pv.pvSan : pv.pvUci
  const rest = sans.slice(1, 7)
  if (rest.length === 0) return ''
  const parts = baseFen.split(' ')
  const baseSide = (parts[1] as 'w' | 'b') ?? 'w'
  const baseFullmove = parseInt(parts[5] ?? '1', 10) || 1
  let side: 'w' | 'b' = baseSide === 'w' ? 'b' : 'w'
  let moveNum = baseSide === 'w' ? baseFullmove : baseFullmove + 1
  const out: string[] = []
  rest.forEach((san, i) => {
    if (side === 'w') out.push(`${moveNum}.${san}`)
    else out.push(i === 0 ? `${moveNum}…${san}` : san)
    if (side === 'b') moveNum += 1
    side = side === 'w' ? 'b' : 'w'
  })
  return out.join(' ')
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
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
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

  const indexFromEvent = (e: React.MouseEvent<SVGSVGElement>): number => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const frac = (e.clientX - rect.left) / rect.width
    return Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1))))
  }

  const hover = hoverIdx != null ? analyses[hoverIdx] : null
  const hoverLabelX = hover ? Math.min(Math.max(xOf(hoverIdx!) - 43, 2), width - 88) : 0

  return (
    <svg
      className="eval-graph"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      onClick={(e) => onSelect(indexFromEvent(e))}
      onMouseMove={(e) => setHoverIdx(indexFromEvent(e))}
      onMouseLeave={() => setHoverIdx(null)}
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
      {hover && hoverIdx != null && (
        <g pointerEvents="none">
          <line x1={xOf(hoverIdx)} y1={0} x2={xOf(hoverIdx)} y2={height} stroke="var(--text-faint)" strokeWidth={1} strokeDasharray="3,3" />
          <g transform={`translate(${hoverLabelX}, 4)`}>
            <rect width={86} height={16} rx={3} fill="var(--bg-panel)" stroke="var(--border)" />
            <text x={6} y={11.5} fontSize={10} fill="var(--text)">
              Move {Math.ceil(hover.ply / 2)} · {evalLabel(hover)}
            </text>
          </g>
        </g>
      )}
    </svg>
  )
}

function AccuracySummary({ game, mistakes }: { game: GameRecord; mistakes: MistakeRecord[] }): React.JSX.Element | null {
  if (game.accuracyWhite == null && game.accuracyBlack == null) return null
  const counts: Partial<Record<string, number>> = {}
  for (const m of mistakes) counts[m.severity] = (counts[m.severity] ?? 0) + 1
  const summaryBits: string[] = []
  if (counts.blunder || counts['missed-win']) summaryBits.push(`${(counts.blunder ?? 0) + (counts['missed-win'] ?? 0)} blunder(s)`)
  if (counts.mistake || counts['missed-draw']) summaryBits.push(`${(counts.mistake ?? 0) + (counts['missed-draw'] ?? 0)} mistake(s)`)
  if (counts.inaccuracy) summaryBits.push(`${counts.inaccuracy} inaccuracy(-ies)`)

  const sides: Array<{ label: string; value: number | null; isUser: boolean }> = [
    { label: game.whiteName ?? 'White', value: game.accuracyWhite, isUser: game.userColor === 'white' },
    { label: game.blackName ?? 'Black', value: game.accuracyBlack, isUser: game.userColor === 'black' }
  ]
  sides.sort((a, b) => Number(b.isUser) - Number(a.isUser))

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div className="accuracy-row">
        {sides.map((s) => (
          <div key={s.label}>
            <div className="accuracy-pill">{s.value != null ? `${s.value.toFixed(1)}%` : '—'}</div>
            <div className="muted">
              {s.label}
              {s.isUser ? ' (you)' : ''}
            </div>
          </div>
        ))}
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
  /** Previewing an engine PV line: which multiPv rank, and how many of its moves are played. */
  const [previewRank, setPreviewRank] = useState<number | null>(null)
  const [previewIdx, setPreviewIdx] = useState(0)
  /** Set to a fen to swap the board area for a playable game vs the engine from that position. */
  const [playFen, setPlayFen] = useState<string | null>(null)

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
    setPreviewRank(null)
    setPreviewIdx(0)
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

  const baseFen =
    currentPly === 0
      ? moves[0]?.fenBefore ?? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      : moves[currentPly - 1].fenAfter
  const baseLastMove =
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

  // Engine-line preview: step through a clicked PV from the current position
  const previewPv = previewRank != null ? positionAnalysis?.multiPv.find((p) => p.rank === previewRank) : null
  const previewSteps: Array<{ fen: string; lastMove: { from: string; to: string } | null }> = []
  if (previewPv) {
    const chess = new Chess(baseFen)
    previewSteps.push({ fen: chess.fen(), lastMove: null })
    for (const uci of previewPv.pvUci.slice(0, 8)) {
      try {
        const mv = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
        previewSteps.push({ fen: chess.fen(), lastMove: { from: mv.from, to: mv.to } })
      } catch {
        break
      }
    }
  }
  const previewing = previewSteps.length > 0
  const previewStep = previewing ? previewSteps[Math.min(previewIdx, previewSteps.length - 1)] : null

  const fen = previewStep ? previewStep.fen : baseFen
  const lastMove = previewStep ? previewStep.lastMove : baseLastMove

  // After revealing a critical moment: compare the game move (red) with the better move (green)
  const playedNext = upcomingMistake && revealed ? moves[currentPly] : null
  const boardArrows =
    !previewing && playedNext
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

  function startPreview(rank: number, steps: number): void {
    setPreviewRank(rank)
    setPreviewIdx(steps)
  }

  function exitPreview(): void {
    setPreviewRank(null)
    setPreviewIdx(0)
  }

  /** Board fen right before the given ply was played (ply is 1-indexed into `moves`). */
  function fenAtPly(ply: number): string {
    if (ply <= 0) return moves[0]?.fenBefore ?? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    return moves[ply - 1].fenAfter
  }

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
        <div className="card" style={{ width: 220, flexShrink: 0, maxHeight: 500, overflowY: 'auto' }}>
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
        <div style={{ flex: '0 1 460px', minWidth: 300 }}>
          {playFen ? (
            <PlayOut fen={playFen} userColor={orientation} onExit={() => setPlayFen(null)} />
          ) : (
            <>
              <div className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
                <div
                  className="eval-bar-vert-outer"
                  style={{ height: 'min(44vh, 400px)' }}
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
                    lastMoveSeverity={previewing ? null : mistakeHere?.severity ?? null}
                    arrows={boardArrows}
                    maxWidth={440}
                  />
                </div>
              </div>
              {previewing && (
                <div className="row" style={{ marginTop: 6, justifyContent: 'center', gap: 6 }}>
                  <button className="small" disabled={previewIdx === 0} onClick={() => setPreviewIdx((i) => Math.max(0, i - 1))}>◀</button>
                  <span className="muted" style={{ fontSize: 11.5 }}>
                    Previewing line · step {previewIdx} of {previewSteps.length - 1}
                  </span>
                  <button
                    className="small"
                    disabled={previewIdx >= previewSteps.length - 1}
                    onClick={() => setPreviewIdx((i) => Math.min(previewSteps.length - 1, i + 1))}
                  >
                    ▶
                  </button>
                  <button className="small" onClick={exitPreview}>Exit preview</button>
                </div>
              )}
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
                <span className="muted" style={{ minWidth: 110, textAlign: 'center' }}>
                  {currentPly === 0 ? 'Start position' : `Move ${Math.ceil(currentPly / 2)} of ${Math.ceil(moves.length / 2)}`}
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
                <div style={{ marginTop: 6 }}>
                  <EvalGraph analyses={analyses} mistakes={mistakes} currentPly={currentPly} onSelect={setCurrentPly} />
                </div>
              )}
            </>
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
                <button onClick={() => setPlayFen(baseFen)}>Play it out from here</button>
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
                <button className="small" onClick={() => setPlayFen(fenAtPly(mistakeHere.ply - 1))}>
                  Play it out from here
                </button>
              </div>
            </div>
          )}

          {(revealed || mistakeHere || !upcomingMistake) && bestHere && (
            <div className="card">
              <h3>What the engine saw</h3>
              {positionAnalysis!.multiPv.slice(0, 3).map((pv) => (
                <div
                  key={pv.rank}
                  className="muted"
                  style={{
                    marginBottom: 4,
                    cursor: 'pointer',
                    borderRadius: 4,
                    padding: '2px 4px',
                    background: previewRank === pv.rank ? 'var(--bg-panel)' : undefined
                  }}
                  title="Click to preview this line on the board"
                  onClick={() => startPreview(pv.rank, 1)}
                >
                  <b className="mono">{pv.moveSan ?? pv.moveUci}</b>{' '}
                  <span className="mono">{pvScoreLabel(pv, positionAnalysis!.sideToMove)}</span>{' '}
                  <span style={{ fontSize: 11 }}>{pvContinuationText(pv, positionAnalysis!.fen)}</span>
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
