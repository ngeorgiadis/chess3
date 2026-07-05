import Ajv2020 from 'ajv/dist/2020'
import addFormats from 'ajv-formats'
import { Chess } from 'chess.js'
import lessonSchema from '@shared/schemas/lesson.schema.json'
import courseSchema from '@shared/schemas/course.schema.json'
import type { LessonValidationIssue, LessonValidationReport } from '@shared/types'

const ajv = new Ajv2020({ allErrors: true, strict: false })
addFormats(ajv)
const validateLessonSchema = ajv.compile(lessonSchema)
const validateCourseSchema = ajv.compile(courseSchema)

interface LessonJson {
  id: string
  positions?: Array<{
    id: string
    fen: string
    sideToMove: 'white' | 'black'
    verification?: { status: string }
  }>
  steps?: Array<{
    id: string
    type: string
    positionRef?: string
    line?: Array<{ moveUci: string; moveSan?: string }>
    solution?: { moves: Array<{ moveUci: string; moveSan?: string }> }
  }>
  exercises?: Array<{
    id: string
    positionRef: string
    solution: { moves: Array<{ moveUci: string; moveSan?: string }>; verification?: { status: string } }
  }>
  source?: { rightsMode?: string }
}

function checkMoveSequence(
  fen: string,
  moves: Array<{ moveUci: string; moveSan?: string }>,
  path: string,
  errors: LessonValidationIssue[]
): void {
  let chess: Chess
  try {
    chess = new Chess(fen)
  } catch {
    return // FEN error already reported for the position itself
  }
  for (let i = 0; i < moves.length; i++) {
    const uci = moves[i].moveUci
    try {
      const mv = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
      if (moves[i].moveSan && mv.san !== moves[i].moveSan) {
        errors.push({
          code: 'san-mismatch',
          message: `Move ${i + 1}: SAN "${moves[i].moveSan}" does not match UCI ${uci} (expected ${mv.san})`,
          path: `${path}/moves/${i}`
        })
      }
    } catch {
      errors.push({
        code: 'illegal-move',
        message: `Move ${i + 1} (${uci}) is illegal in this position`,
        path: `${path}/moves/${i}`
      })
      return
    }
  }
}

export function validateLesson(lessonJson: unknown): LessonValidationReport {
  const errors: LessonValidationIssue[] = []
  const warnings: LessonValidationIssue[] = []

  const schemaValid = validateLessonSchema(lessonJson) as boolean
  if (!schemaValid) {
    for (const err of validateLessonSchema.errors ?? []) {
      errors.push({
        code: 'schema',
        message: `${err.instancePath || '/'} ${err.message ?? 'invalid'}`,
        path: err.instancePath
      })
    }
    return { schemaValid: false, chessValid: false, engineVerified: false, warnings, errors }
  }

  const lesson = lessonJson as LessonJson
  const positionsById = new Map<string, { fen: string; sideToMove: string }>()

  for (const pos of lesson.positions ?? []) {
    try {
      const chess = new Chess(pos.fen)
      const turn = chess.turn() === 'w' ? 'white' : 'black'
      if (turn !== pos.sideToMove) {
        errors.push({
          code: 'side-mismatch',
          message: `Position "${pos.id}": sideToMove is ${pos.sideToMove} but FEN says ${turn} to move`,
          path: `/positions/${pos.id}`
        })
      }
      positionsById.set(pos.id, { fen: pos.fen, sideToMove: pos.sideToMove })
    } catch (e) {
      errors.push({
        code: 'illegal-fen',
        message: `Position "${pos.id}": invalid FEN — ${(e as Error).message}`,
        path: `/positions/${pos.id}`
      })
    }
    if (!pos.verification || pos.verification.status === 'unverified') {
      warnings.push({
        code: 'unverified-position',
        message: `Position "${pos.id}" is not verified. Mark it engine-checked or human-checked before publishing.`,
        path: `/positions/${pos.id}`
      })
    }
  }

  const resolveRef = (ref: string | undefined, path: string): string | null => {
    if (!ref) return null
    const pos = positionsById.get(ref)
    if (!pos) {
      errors.push({ code: 'missing-position-ref', message: `Unknown positionRef "${ref}"`, path })
      return null
    }
    return pos.fen
  }

  for (const step of lesson.steps ?? []) {
    const fen = resolveRef(step.positionRef, `/steps/${step.id}`)
    if (fen && step.line?.length) checkMoveSequence(fen, step.line, `/steps/${step.id}`, errors)
    if (fen && step.solution?.moves?.length) checkMoveSequence(fen, step.solution.moves, `/steps/${step.id}/solution`, errors)
    if ((step.type === 'move_input' || step.type === 'demonstration') && !step.positionRef) {
      warnings.push({
        code: 'step-no-position',
        message: `Step "${step.id}" (${step.type}) has no positionRef — the board cannot show anything.`,
        path: `/steps/${step.id}`
      })
    }
  }

  for (const ex of lesson.exercises ?? []) {
    const fen = resolveRef(ex.positionRef, `/exercises/${ex.id}`)
    if (fen) checkMoveSequence(fen, ex.solution.moves, `/exercises/${ex.id}/solution`, errors)
    const status = ex.solution.verification?.status
    if (!status || status === 'unverified') {
      warnings.push({
        code: 'unverified-solution',
        message: `Exercise "${ex.id}" solution is not engine/human verified.`,
        path: `/exercises/${ex.id}`
      })
    }
  }

  const rightsMode = lesson.source?.rightsMode
  if (!rightsMode || rightsMode === 'unknown') {
    warnings.push({
      code: 'copyright',
      message:
        'Source rights mode is unknown. Only publish transformed, original explanations — no long verbatim extracts.'
    })
  }

  const engineVerified = (lesson.positions ?? []).some((p) => p.verification?.status === 'engine-checked')
  return {
    schemaValid: true,
    chessValid: errors.length === 0,
    engineVerified,
    warnings,
    errors
  }
}

export function validateCourse(courseJson: unknown): { valid: boolean; errors: LessonValidationIssue[] } {
  const valid = validateCourseSchema(courseJson) as boolean
  return {
    valid,
    errors: (validateCourseSchema.errors ?? []).map((err) => ({
      code: 'schema',
      message: `${err.instancePath || '/'} ${err.message ?? 'invalid'}`,
      path: err.instancePath
    }))
  }
}
