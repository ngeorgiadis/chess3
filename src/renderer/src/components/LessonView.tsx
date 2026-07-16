import { useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { Board } from './Board'
import { PuzzleBoard } from './PuzzleBoard'
import { useBoardSize } from '../boardSize'
import type { LessonJson, LessonPosition, LessonStep } from '../lesson-types'

interface LessonViewProps {
  lesson: LessonJson
  completedStepIds?: string[]
  onStepComplete?: (stepId: string) => void
  onFinished?: () => void
}

function orientationOf(pos: LessonPosition): 'white' | 'black' {
  if (!pos.orientation || pos.orientation === 'side-to-move') return pos.sideToMove
  return pos.orientation
}

function DemonstrationStep({ step, position }: { step: LessonStep; position: LessonPosition }): React.JSX.Element {
  const [idx, setIdx] = useState(0)
  const [boardSize, setBoardSize] = useBoardSize('lesson-demo', 440)
  const line = step.line ?? []

  const { fen, lastMove, comment } = useMemo(() => {
    const chess = new Chess(position.fen)
    let last: { from: string; to: string } | null = null
    let cmt: string | undefined
    for (let i = 0; i < idx && i < line.length; i++) {
      const uci = line[i].moveUci
      try {
        chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
        last = { from: uci.slice(0, 2), to: uci.slice(2, 4) }
        cmt = line[i].comment
      } catch {
        break
      }
    }
    return { fen: chess.fen(), lastMove: last, comment: cmt }
  }, [idx, line, position.fen])

  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 18 }}>
      <div style={{ flex: `0 1 ${boardSize}px`, minWidth: 300 }}>
        <Board
          fen={fen}
          orientation={orientationOf(position)}
          lastMove={lastMove}
          arrows={idx === 0 ? position.arrows : []}
          markedSquares={idx === 0 ? position.highlights?.map((h) => h.square) : []}
          maxWidth={boardSize}
          resizable
          onResize={setBoardSize}
        />
        <div className="row" style={{ marginTop: 8, justifyContent: 'center' }}>
          <button className="small" onClick={() => setIdx(0)}>⏮</button>
          <button className="small" onClick={() => setIdx(Math.max(0, idx - 1))}>◀</button>
          <span className="muted">
            {idx}/{line.length}
          </span>
          <button className="small" onClick={() => setIdx(Math.min(line.length, idx + 1))}>▶</button>
        </div>
      </div>
      <div className="col" style={{ flex: 1 }}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{step.content}</p>
        {line.length > 0 && (
          <div className="muted mono">
            Line: {line.map((m) => m.moveSan ?? m.moveUci).join(' ')}
          </div>
        )}
        {comment && <div className="callout">{comment}</div>}
      </div>
    </div>
  )
}

function GuidedQuestionStep({ step }: { step: LessonStep }): React.JSX.Element {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="col">
      <p style={{ whiteSpace: 'pre-wrap' }}>{step.content}</p>
      {step.prompt && <div className="callout">{step.prompt}</div>}
      {!revealed ? (
        <button style={{ alignSelf: 'flex-start' }} onClick={() => setRevealed(true)}>
          Reveal answer
        </button>
      ) : (
        <div className="callout success">
          {step.expectedAnswer ?? step.solution?.explanation ?? 'See the explanation in the next step.'}
          {step.feedback && <div style={{ marginTop: 6 }}>{step.feedback}</div>}
        </div>
      )}
    </div>
  )
}

function StepBody({
  step,
  position,
  onSolved
}: {
  step: LessonStep
  position: LessonPosition | null
  onSolved: () => void
}): React.JSX.Element {
  switch (step.type) {
    case 'move_input':
      if (position && step.solution) {
        return (
          <div className="col">
            <p style={{ whiteSpace: 'pre-wrap' }}>{step.content}</p>
            <PuzzleBoard
              fen={position.fen}
              solution={step.solution.moves}
              prompt={step.prompt}
              explanation={step.solution.explanation}
              onComplete={() => onSolved()}
              maxWidth={440}
            />
          </div>
        )
      }
      return <p>{step.content}</p>
    case 'demonstration':
    case 'model_game_segment':
      if (position) return <DemonstrationStep step={step} position={position} />
      return <p style={{ whiteSpace: 'pre-wrap' }}>{step.content}</p>
    case 'guided_question':
    case 'evaluation_choice':
      return <GuidedQuestionStep step={step} />
    case 'reflection':
      return (
        <div className="col">
          <p style={{ whiteSpace: 'pre-wrap' }}>{step.content}</p>
          {step.prompt && <div className="callout">{step.prompt}</div>}
          <textarea rows={4} placeholder="Write your own rule or summary here…" />
        </div>
      )
    default:
      // concept, review_checkpoint
      return (
        <div className="row" style={{ alignItems: 'flex-start', gap: 18 }}>
          {position && (
            <div style={{ flex: '0 1 400px', minWidth: 280 }}>
              <Board
                fen={position.fen}
                orientation={orientationOf(position)}
                arrows={position.arrows}
                markedSquares={position.highlights?.map((h) => h.square)}
                maxWidth={400}
              />
              {position.highlights?.map((h) => (
                <div key={h.square} className="muted" style={{ marginTop: 4 }}>
                  <b className="mono">{h.square}</b>: {h.label}
                </div>
              ))}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{step.content}</p>
            {step.prompt && <div className="callout">{step.prompt}</div>}
          </div>
        </div>
      )
  }
}

export function LessonView({ lesson, completedStepIds = [], onStepComplete, onFinished }: LessonViewProps): React.JSX.Element {
  // Resume at the first incomplete step rather than always restarting from the top.
  const [stepIdx, setStepIdx] = useState(() => {
    const doneAtMount = new Set(completedStepIds)
    const firstIncomplete = lesson.steps.findIndex((s) => !doneAtMount.has(s.id))
    return firstIncomplete >= 0 ? firstIncomplete : 0
  })
  const [exerciseMode, setExerciseMode] = useState(false)
  const [exerciseIdx, setExerciseIdx] = useState(0)

  const positions = useMemo(() => new Map(lesson.positions.map((p) => [p.id, p])), [lesson])
  const steps = lesson.steps
  const step = steps[stepIdx]
  const done = new Set(completedStepIds)

  function completeStep(): void {
    if (step && !done.has(step.id)) onStepComplete?.(step.id)
  }

  function next(): void {
    completeStep()
    if (stepIdx < steps.length - 1) setStepIdx(stepIdx + 1)
    else if (lesson.exercises.length > 0) setExerciseMode(true)
    else onFinished?.()
  }

  if (exerciseMode) {
    const ex = lesson.exercises[exerciseIdx]
    if (!ex) {
      return (
        <div className="card">
          <h3>Key takeaways</h3>
          <ul>
            {lesson.review.keyTakeaways.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <h3>Test yourself</h3>
          <ul>
            {lesson.review.selfTest.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <button className="primary" onClick={() => onFinished?.()}>
            Finish lesson
          </button>
        </div>
      )
    }
    const pos = positions.get(ex.positionRef)
    return (
      <div className="col">
        <div className="muted">
          Exercise {exerciseIdx + 1} of {lesson.exercises.length} · {ex.title} · {'★'.repeat(ex.difficulty)}
        </div>
        {pos ? (
          <PuzzleBoard
            key={ex.id}
            fen={pos.fen}
            solution={ex.solution.moves}
            prompt={ex.prompt}
            hints={ex.hints}
            explanation={
              ex.solution.remember ? `${ex.solution.explanation} Remember: ${ex.solution.remember}` : ex.solution.explanation
            }
            maxWidth={440}
          />
        ) : (
          <div className="callout error">Missing position: {ex.positionRef}</div>
        )}
        <div className="row">
          <button onClick={() => setExerciseIdx(exerciseIdx + 1)}>Next →</button>
        </div>
      </div>
    )
  }

  if (!step) return <div className="muted">This lesson has no steps.</div>
  const position = step.positionRef ? positions.get(step.positionRef) ?? null : null

  return (
    <div className="col">
      {/* Stepper */}
      <div className="row" style={{ flexWrap: 'wrap', gap: 4 }}>
        {steps.map((s, i) => (
          <button
            key={s.id}
            className="small"
            style={{
              opacity: i === stepIdx ? 1 : 0.6,
              borderColor: done.has(s.id) ? 'var(--accent)' : undefined
            }}
            onClick={() => setStepIdx(i)}
            title={s.title}
          >
            {i + 1}
          </button>
        ))}
        {lesson.exercises.length > 0 && (
          <button className="small" style={{ opacity: 0.6 }} onClick={() => setExerciseMode(true)}>
            🧩 exercises
          </button>
        )}
      </div>

      <div className="card">
        <div className="muted" style={{ marginBottom: 4 }}>
          {step.type.replace(/_/g, ' ')} · step {stepIdx + 1} of {steps.length}
        </div>
        <h3 style={{ fontSize: 16 }}>{step.title}</h3>
        <StepBody step={step} position={position} onSolved={completeStep} />
      </div>

      <div className="row">
        <button disabled={stepIdx === 0} onClick={() => setStepIdx(stepIdx - 1)}>
          ← Back
        </button>
        <button className="primary" onClick={next}>
          {stepIdx < steps.length - 1 ? 'Continue →' : lesson.exercises.length > 0 ? 'Go to exercises →' : 'Finish'}
        </button>
      </div>
    </div>
  )
}
