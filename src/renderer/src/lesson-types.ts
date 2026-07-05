// Shape of lesson JSON per src/shared/schemas/lesson.schema.json

export interface LessonPosition {
  id: string
  title: string
  fen: string
  sideToMove: 'white' | 'black'
  orientation?: 'white' | 'black' | 'side-to-move'
  tags?: string[]
  highlights?: Array<{ square: string; label: string }>
  arrows?: Array<{ from: string; to: string; label: string }>
  verification?: { status: string; note?: string }
}

export interface LessonMove {
  moveUci: string
  moveSan?: string
  comment?: string
}

export interface LessonSolution {
  moves: LessonMove[]
  explanation: string
  remember?: string
}

export interface LessonStep {
  id: string
  type:
    | 'concept'
    | 'demonstration'
    | 'guided_question'
    | 'move_input'
    | 'evaluation_choice'
    | 'model_game_segment'
    | 'reflection'
    | 'review_checkpoint'
  title: string
  content: string
  positionRef?: string
  prompt?: string
  expectedAnswer?: string
  solution?: LessonSolution
  feedback?: string
  line?: LessonMove[]
}

export interface LessonExercise {
  id: string
  type: string
  title: string
  prompt: string
  positionRef: string
  solution: LessonSolution
  hints?: string[]
  difficulty: number
  tags: string[]
}

export interface LessonJson {
  schemaVersion: string
  id: string
  title: string
  slug: string
  summary: string
  targetRating: { min: number; max: number }
  estimatedMinutes: number
  objectives: string[]
  prerequisites?: string[]
  tags?: string[]
  source?: { type?: string; rightsMode?: string; title?: string; transformationNote?: string }
  positions: LessonPosition[]
  steps: LessonStep[]
  exercises: LessonExercise[]
  review: { keyTakeaways: string[]; selfTest: string[]; nextLessons?: string[] }
}
