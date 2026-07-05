// Shared types between main, preload and renderer.

export type Platform = 'chesscom' | 'lichess' | 'pgn-file' | 'pasted-pgn' | 'other'
export type TimeClass = 'rapid' | 'blitz' | 'bullet' | 'daily' | 'classical' | 'correspondence' | 'unknown'
export type AnalysisStatus = 'none' | 'queued' | 'running' | 'done' | 'failed'

export interface GameRecord {
  id: string
  sourcePlatform: Platform | null
  sourceGameId: string | null
  sourceGameUrl: string | null
  rawPgn: string
  whiteName: string | null
  blackName: string | null
  whiteRating: number | null
  blackRating: number | null
  result: string | null
  userColor: 'white' | 'black' | 'unknown'
  timeControl: string | null
  timeClass: string | null
  variant: string
  ecoCode: string | null
  openingName: string | null
  startedAt: string | null
  endedAt: string | null
  importedAt: string
  analysisStatus: AnalysisStatus
  plyCount: number
  mistakeCount: number
  ongoing: boolean
}

export interface MoveRecord {
  gameId: string
  ply: number
  moveNumber: number
  color: 'white' | 'black'
  san: string
  uci: string
  fenBefore: string
  fenAfter: string
  comment: string | null
  clockMs: number | null
}

export interface GameFilters {
  text?: string
  platform?: string
  timeClass?: string
  color?: 'white' | 'black'
  result?: 'win' | 'loss' | 'draw'
  analyzed?: boolean
  limit?: number
  offset?: number
}

export interface ImportResult {
  source: Platform
  gamesSeen: number
  gamesImported: number
  duplicatesSkipped: number
  failed: Array<{ sourceRef: string; reason: string }>
  createdGameIds: string[]
}

export interface ImportChessComArgs {
  username: string
  fromMonth?: string // YYYY-MM
  toMonth?: string // YYYY-MM
  timeClasses?: string[]
  maxGames?: number
  analyzeAfterImport?: boolean
}

export interface ImportLichessArgs {
  username: string
  max?: number
  since?: string // ISO date
  until?: string // ISO date
  perfTypes?: string[]
  rated?: boolean
  color?: 'white' | 'black'
  analyzeAfterImport?: boolean
}

export interface ImportPgnArgs {
  pgn?: string
  filePath?: string
  analyzeAfterImport?: boolean
}

// ---- Engines ----

export type UciOption =
  | { name: string; type: 'check'; default?: boolean }
  | { name: string; type: 'spin'; default?: number; min?: number; max?: number }
  | { name: string; type: 'combo'; default?: string; vars: string[] }
  | { name: string; type: 'button' }
  | { name: string; type: 'string'; default?: string }

export interface EngineRecord {
  id: string
  name: string
  author: string | null
  protocol: 'uci'
  executablePath: string
  detectedOptions: UciOption[]
  status: 'available' | 'missing' | 'invalid' | 'blocked'
  createdAt: string
  lastVerifiedAt: string | null
}

export type EngineUseCase = 'fast-review' | 'deep-review' | 'opening' | 'puzzle-validation' | 'endgame'

export interface EngineProfileRecord {
  id: string
  engineId: string
  name: string
  useCase: EngineUseCase
  options: Record<string, string | number | boolean>
  limits: { depth?: number; nodes?: number; moveTimeMs?: number; multiPv?: number }
}

export interface PvLine {
  rank: number
  moveUci: string
  moveSan?: string
  score: { type: 'cp' | 'mate'; value: number; perspective: 'side-to-move' }
  pvUci: string[]
  pvSan?: string[]
}

export interface PositionAnalysis {
  gameId: string
  ply: number
  fen: string
  sideToMove: 'w' | 'b'
  engineId: string
  engineProfileId: string
  depth?: number
  nodes?: number
  timeMs?: number
  multiPv: PvLine[]
  createdAt: string
}

export type MistakeSeverity = 'inaccuracy' | 'mistake' | 'blunder' | 'missed-win' | 'missed-draw'
export type TrainingAction = 'tactics' | 'opening' | 'endgame' | 'calculation' | 'strategy' | 'time-management'

export interface MistakeRecord {
  id: string
  gameId: string
  ply: number
  severity: MistakeSeverity
  evalLossCp: number | null
  themeTags: string[]
  humanSummary: string
  whyBad: string | null
  betterMoveSan: string | null
  betterMoveUci: string | null
  trainingAction: TrainingAction
  confidence: 'low' | 'medium' | 'high'
  createdAt: string
}

// ---- Exercises ----

export interface SolutionMove {
  moveUci: string
  moveSan?: string
  comment?: string
}

export interface ExerciseRecord {
  id: string
  originType: 'mistake' | 'lesson' | 'manual'
  originId: string | null
  type: string
  title: string
  prompt: string
  fen: string
  solution: { moves: SolutionMove[]; explanation: string; remember?: string }
  hints: string[]
  difficulty: number
  tags: string[]
  dueAt: string | null
  intervalDays: number
  ease: number
  createdAt: string
}

// ---- Lessons ----

export interface LessonValidationIssue {
  code: string
  message: string
  path?: string
}

export interface LessonValidationReport {
  schemaValid: boolean
  chessValid: boolean
  engineVerified: boolean
  warnings: LessonValidationIssue[]
  errors: LessonValidationIssue[]
}

export interface LessonRecord {
  id: string
  slug: string
  title: string
  version: string
  targetRatingMin: number | null
  targetRatingMax: number | null
  lessonJson: unknown
  validationReport: LessonValidationReport | null
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface LessonProgressRecord {
  lessonId: string
  status: 'not-started' | 'in-progress' | 'completed'
  completedStepIds: string[]
  score: number | null
  updatedAt: string
}

export interface CourseRecord {
  id: string
  slug: string
  title: string
  courseJson: unknown
  createdAt: string
}

// ---- Repertoire ----

export interface RepertoireNodeRecord {
  id: string
  color: 'white' | 'black'
  parentId: string | null
  fenBefore: string
  moveUci: string
  moveSan: string
  priority: 'must-know' | 'normal' | 'optional' | 'avoid' | 'experimental'
  status: 'learning' | 'known' | 'lapsed'
  comment: string | null
  source: { type: string; gameId?: string }
  dueAt: string | null
  intervalDays: number
  ease: number
}

// ---- Jobs ----

export type JobType = 'import' | 'analyze-game' | 'generate-lesson'
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export interface JobRecord {
  id: string
  type: JobType
  status: JobStatus
  priority: number
  payload: unknown
  progressCurrent: number
  progressTotal: number
  progressLabel: string | null
  result: unknown | null
  error: { message: string; detail?: string; retryable?: boolean } | null
  createdAt: string
  startedAt: string | null
  completedAt: string | null
}

export interface AppEvent {
  type:
    | 'job:created'
    | 'job:progress'
    | 'job:completed'
    | 'job:failed'
    | 'engine:status'
    | 'engine:eval'
    | 'games:changed'
    | 'lessons:changed'
    | 'exercises:changed'
    | 'repertoire:changed'
  payload: unknown
}

// ---- Live evaluation ----

/** Streaming evaluation of the currently visible board position. */
export interface LiveEvalUpdate {
  fen: string
  sideToMove: 'w' | 'b'
  depth: number
  multiPv: PvLine[]
  engineName: string
  /** True when the engine finished (bestmove received) rather than still deepening. */
  final: boolean
}

export interface LiveEvalStatus {
  enabled: boolean
  available: boolean
  engineName: string | null
  error: string | null
}

// ---- Study plan ----

export interface PlanTask {
  id: string
  kind: 'exercises' | 'opening-review' | 'game-review' | 'lesson' | 'import' | 'setup-engine'
  title: string
  detail: string
  count?: number
  targetId?: string
}

export interface TodayPlan {
  date: string
  weeklyTheme: string
  tasks: PlanTask[]
  weaknesses: Array<{ tag: string; count: number; evidence: string }>
  streakDays: number
  dueExercises: number
  dueRepertoire: number
  unreviewedGames: number
}

// ---- AI ----

export interface AiConfig {
  mode: 'openai-compatible' | 'local-http' | 'manual'
  baseUrl: string
  apiKey: string
  model: string
}

export interface AiOutlineArgs {
  sourceText: string
  goal: string
  targetRatingMin: number
  targetRatingMax: number
  rightsMode: 'user-owned' | 'licensed' | 'public-domain' | 'notes-only' | 'unknown'
}

export interface AiGenerateArgs extends AiOutlineArgs {
  outline: string
}

// ---- Settings ----

export type BoardColorScheme = 'green' | 'brown' | 'blue' | 'gray' | 'classic' | 'contrast'
export type PieceSet = 'standard' | 'staunty'

export interface AppSettings {
  displayName: string
  chesscomUsername: string
  lichessUsername: string
  ratingCurrent: number
  ratingGoal: number
  preferredTimeControls: string[]
  userAgentContact: string
  aiConfig: AiConfig
  defaultProfileId: string | null
  boardTheme: BoardColorScheme
  pieceSet: PieceSet
}

export interface AnalysisSummary {
  positions: PositionAnalysis[]
  mistakes: MistakeRecord[]
}
