import type {
  AiGenerateArgs,
  AiOutlineArgs,
  AppEvent,
  AppSettings,
  AnalysisSummary,
  BackfillResult,
  CoachReportRecord,
  EngineProfileRecord,
  EngineRecord,
  ExerciseRecord,
  GameAnnotations,
  GameFilters,
  GameRecord,
  LiveEvalStatus,
  PlayGameState,
  PlayMoveResult,
  PlayStartArgs,
  StatsOverview,
  ImportChessComArgs,
  ImportLichessArgs,
  ImportPgnArgs,
  ImportResult,
  JobRecord,
  LessonProgressRecord,
  LessonRecord,
  LessonValidationReport,
  CourseRecord,
  MistakeRecord,
  MoveRecord,
  PositionAnalysis,
  RepertoireNodeRecord,
  TodayPlan
} from '@shared/types'

type RawApi = Record<string, (args?: unknown) => Promise<unknown>> & {
  onEvent: (cb: (event: AppEvent) => void) => () => void
}

const raw = (window as unknown as { api: RawApi }).api

export const api = {
  settings: {
    get: () => raw['settings:get']() as Promise<AppSettings>,
    set: (patch: Partial<AppSettings>) => raw['settings:set'](patch) as Promise<AppSettings>
  },
  identity: {
    backfill: () => raw['identity:backfill']() as Promise<BackfillResult>
  },
  games: {
    list: (filters?: GameFilters) => raw['games:list'](filters) as Promise<GameRecord[]>,
    get: (id: string) => raw['games:get'](id) as Promise<GameRecord | null>,
    moves: (id: string) => raw['games:moves'](id) as Promise<MoveRecord[]>,
    delete: (id: string) => raw['games:delete'](id) as Promise<void>,
    exportPgn: (ids: string[]) => raw['games:exportPgn'](ids) as Promise<string | null>
  },
  import: {
    detect: (text: string) => raw['import:detect'](text) as Promise<{ kind: string; [k: string]: unknown }>,
    previewPgn: (text: string) => raw['import:previewPgn'](text) as Promise<{ games: number }>,
    chesscom: (args: ImportChessComArgs) => raw['import:chesscom'](args) as Promise<JobRecord>,
    lichess: (args: ImportLichessArgs) => raw['import:lichess'](args) as Promise<JobRecord>,
    lichessGame: (args: { gameId: string; analyzeAfterImport?: boolean }) =>
      raw['import:lichessGame'](args) as Promise<JobRecord>,
    pgn: (args: ImportPgnArgs) => raw['import:pgn'](args) as Promise<ImportResult | JobRecord>,
    pickPgnFile: () => raw['import:pickPgnFile']() as Promise<string | null>
  },
  engines: {
    list: () => raw['engines:list']() as Promise<EngineRecord[]>,
    add: (path: string) => raw['engines:add'](path) as Promise<EngineRecord>,
    remove: (id: string) => raw['engines:remove'](id) as Promise<void>,
    verify: (id: string) => raw['engines:verify'](id) as Promise<EngineRecord>,
    pickExecutable: () => raw['engines:pickExecutable']() as Promise<string | null>,
    profiles: (engineId?: string) => raw['engines:profiles'](engineId) as Promise<EngineProfileRecord[]>,
    saveProfile: (p: EngineProfileRecord) => raw['engines:saveProfile'](p) as Promise<EngineProfileRecord>
  },
  eval: {
    setEnabled: (on: boolean) => raw['eval:setEnabled'](on) as Promise<LiveEvalStatus>,
    status: () => raw['eval:status']() as Promise<LiveEvalStatus>,
    position: (fen: string) => raw['eval:position'](fen) as Promise<void>
  },
  play: {
    start: (args: PlayStartArgs) => raw['play:start'](args) as Promise<PlayMoveResult>,
    move: (uci: string) => raw['play:move'](uci) as Promise<PlayMoveResult>,
    stop: () => raw['play:stop']() as Promise<void>,
    status: () => raw['play:status']() as Promise<PlayGameState | null>
  },
  analysis: {
    queue: (gameIds: string[], profileId?: string) =>
      raw['analysis:queue']({ gameIds, profileId }) as Promise<string[]>,
    cancel: (jobId: string) => raw['analysis:cancel'](jobId) as Promise<void>,
    forGame: (gameId: string) => raw['analysis:forGame'](gameId) as Promise<PositionAnalysis[]>,
    mistakes: (gameId: string) => raw['mistakes:forGame'](gameId) as Promise<MistakeRecord[]>
  },
  jobs: {
    list: () => raw['jobs:list']() as Promise<JobRecord[]>
  },
  lessons: {
    list: () => raw['lessons:list']() as Promise<LessonRecord[]>,
    get: (idOrSlug: string) => raw['lessons:get'](idOrSlug) as Promise<LessonRecord | null>,
    validate: (json: unknown) => raw['lessons:validate'](json) as Promise<LessonValidationReport>,
    publish: (json: unknown) =>
      raw['lessons:publish'](json) as Promise<{ lesson: LessonRecord | null; report: LessonValidationReport }>,
    getProgress: (lessonId: string) => raw['lessons:progress:get'](lessonId) as Promise<LessonProgressRecord>,
    setProgress: (p: LessonProgressRecord) => raw['lessons:progress:set'](p) as Promise<LessonProgressRecord>,
    allProgress: () => raw['lessons:progress:all']() as Promise<LessonProgressRecord[]>
  },
  courses: {
    list: () => raw['courses:list']() as Promise<CourseRecord[]>
  },
  exercises: {
    list: () => raw['exercises:list']() as Promise<ExerciseRecord[]>,
    due: () => raw['exercises:due']() as Promise<ExerciseRecord[]>,
    attempt: (id: string, correct: boolean) => raw['exercises:attempt']({ id, correct }) as Promise<ExerciseRecord>,
    fromMistake: (mistakeId: string) => raw['exercises:fromMistake'](mistakeId) as Promise<ExerciseRecord>
  },
  repertoire: {
    list: (color?: 'white' | 'black') => raw['repertoire:list'](color) as Promise<RepertoireNodeRecord[]>,
    add: (args: { color: 'white' | 'black'; fenBefore: string; moveUci: string; comment?: string }) =>
      raw['repertoire:add'](args) as Promise<RepertoireNodeRecord>,
    addLineFromGame: (gameId: string, uptoPly: number) =>
      raw['repertoire:addLineFromGame']({ gameId, uptoPly }) as Promise<RepertoireNodeRecord[]>,
    addOpeningLine: (args: {
      color: 'white' | 'black'
      sanMoves: string[]
      openingName: string
      lineName?: string
      comment?: string
    }) => raw['repertoire:addOpeningLine'](args) as Promise<RepertoireNodeRecord[]>,
    due: () => raw['repertoire:due']() as Promise<RepertoireNodeRecord[]>,
    attempt: (id: string, correct: boolean) => raw['repertoire:attempt']({ id, correct }) as Promise<RepertoireNodeRecord>,
    setPriority: (id: string, priority: RepertoireNodeRecord['priority']) =>
      raw['repertoire:setPriority']({ id, priority }) as Promise<void>,
    delete: (id: string) => raw['repertoire:delete'](id) as Promise<void>
  },
  plan: {
    today: () => raw['plan:today']() as Promise<TodayPlan>
  },
  stats: {
    overview: () => raw['stats:overview']() as Promise<StatsOverview>
  },
  clipboard: {
    write: (text: string) => raw['clipboard:write'](text) as Promise<void>
  },
  ai: {
    outline: (args: AiOutlineArgs) => raw['ai:outline'](args) as Promise<string>,
    generateLesson: (args: AiGenerateArgs) =>
      raw['ai:generateLesson'](args) as Promise<{
        lessonJson: unknown | null
        rawText: string
        report: LessonValidationReport | null
        error?: string
      }>,
    explainPosition: (gameId: string, ply: number) =>
      raw['ai:explainPosition']({ gameId, ply }) as Promise<{
        text: string
        verified: boolean
        cached: boolean
        model: string
      }>,
    annotateGame: (gameId: string) => raw['ai:annotateGame'](gameId) as Promise<JobRecord>,
    annotationsForGame: (gameId: string) => raw['ai:annotationsForGame'](gameId) as Promise<GameAnnotations>,
    coachReport: {
      generate: () => raw['ai:coachReport:generate']() as Promise<CoachReportRecord>,
      latest: () => raw['ai:coachReport:latest']() as Promise<CoachReportRecord | null>
    }
  },
  onEvent: raw.onEvent
}

export type { AnalysisSummary }
