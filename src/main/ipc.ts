import { ipcMain, dialog, BrowserWindow } from 'electron'
import fs from 'node:fs'
import { getDb } from './db'
import { getSettings, setSettings } from './settings'
import { backfillUserColors } from './identity'
import { listGames, getGame, getMoves, deleteGame, exportPgn } from './games'
import { importPgnText, splitPgn } from './importers/pgn'
import { detectSource } from './importers/detect'
import { addEngine, listEngines, removeEngine, reverifyEngine, listProfiles, saveProfile } from './engines/store'
import { getAnalysisForGame, getMistakesForGame } from './engines/analysis'
import { enqueueJob, cancelJob, listJobs } from './jobs/queue'
import {
  listLessons,
  getLesson,
  publishLesson,
  listCourses,
  getProgress,
  setProgress,
  listAllProgress
} from './lessons/store'
import { validateLesson } from './lessons/validate'
import { listExercises, dueExercises, attemptExercise, createExerciseFromMistake } from './exercises'
import {
  listNodes,
  addNode,
  addLineFromGame,
  addOpeningLine,
  dueNodes,
  attemptNode,
  setNodePriority,
  deleteNode
} from './repertoire'
import { liveEval } from './engines/live-eval'
import { playVsEngine } from './engines/play'
import { computeTodayPlan } from './plan/study-plan'
import { generateOutline, generateLesson } from './ai/lesson-agent'
import type {
  AppSettings,
  EngineProfileRecord,
  GameFilters,
  ImportChessComArgs,
  ImportLichessArgs,
  ImportPgnArgs,
  LessonProgressRecord,
  AiOutlineArgs,
  AiGenerateArgs,
  RepertoireNodeRecord,
  PlayStartArgs
} from '@shared/types'

type Envelope = { ok: true; data: unknown } | { ok: false; error: { message: string; detail?: string } }

function handle(channel: string, fn: (args: never) => unknown | Promise<unknown>): void {
  ipcMain.handle(channel, async (_event, args): Promise<Envelope> => {
    try {
      return { ok: true, data: await fn(args as never) }
    } catch (e) {
      const err = e as Error
      return { ok: false, error: { message: err.message || 'Unexpected error', detail: err.stack } }
    }
  })
}

/** Resolve the engine profile to use for analysis: explicit > settings default > first fast-review. */
function resolveProfileId(explicit?: string): string {
  if (explicit) return explicit
  const settings = getSettings()
  const profiles = listProfiles()
  if (settings.defaultProfileId && profiles.some((p) => p.id === settings.defaultProfileId)) {
    return settings.defaultProfileId
  }
  const fast = profiles.find((p) => p.useCase === 'fast-review') ?? profiles[0]
  if (!fast) throw new Error('No engine profile available. Add a UCI engine first (Engines screen).')
  return fast.id
}

export function queueAnalysis(gameIds: string[], profileId?: string): string[] {
  const resolved = resolveProfileId(profileId)
  const db = getDb()
  const jobIds: string[] = []
  for (const gameId of gameIds) {
    const game = db.prepare('SELECT ongoing, variant, analysis_status FROM games WHERE id = ?').get(gameId) as
      | { ongoing: number; variant: string; analysis_status: string }
      | undefined
    if (!game || game.ongoing || game.variant !== 'chess') continue
    if (game.analysis_status === 'queued' || game.analysis_status === 'running') continue
    db.prepare('UPDATE games SET analysis_status = ? WHERE id = ?').run('queued', gameId)
    const job = enqueueJob('analyze-game', { gameId, profileId: resolved })
    jobIds.push(job.id)
  }
  return jobIds
}

export function registerIpc(): void {
  // ---- Settings ----
  handle('settings:get', () => getSettings())
  handle('settings:set', (patch: Partial<AppSettings>) => setSettings(patch))
  handle('identity:backfill', () => backfillUserColors())

  // ---- Games ----
  handle('games:list', (filters: GameFilters) => listGames(filters ?? {}))
  handle('games:get', (id: string) => getGame(id))
  handle('games:moves', (id: string) => getMoves(id))
  handle('games:delete', (id: string) => deleteGame(id))
  handle('games:exportPgn', async (ids: string[]) => {
    const pgn = exportPgn(ids)
    const win = BrowserWindow.getFocusedWindow()
    const res = await dialog.showSaveDialog(win!, {
      defaultPath: 'games.pgn',
      filters: [{ name: 'PGN', extensions: ['pgn'] }]
    })
    if (res.canceled || !res.filePath) return null
    fs.writeFileSync(res.filePath, pgn, 'utf8')
    return res.filePath
  })

  // ---- Import ----
  handle('import:detect', (text: string) => detectSource(text))
  handle('import:previewPgn', (text: string) => ({ games: splitPgn(text).length }))
  handle('import:chesscom', (args: ImportChessComArgs) =>
    enqueueJob('import', { kind: 'chesscom', args })
  )
  handle('import:lichess', (args: ImportLichessArgs) => enqueueJob('import', { kind: 'lichess', args }))
  handle('import:lichessGame', (args: { gameId: string; analyzeAfterImport?: boolean }) =>
    enqueueJob('import', { kind: 'lichess-game', args })
  )
  handle('import:pgn', (args: ImportPgnArgs) => {
    if (args.filePath) {
      if (!fs.existsSync(args.filePath)) throw new Error(`File not found: ${args.filePath}`)
      return enqueueJob('import', { kind: 'pgn-file', args })
    }
    if (!args.pgn?.trim()) throw new Error('No PGN provided')
    // Pasted PGN is usually small — run synchronously for instant feedback
    const result = importPgnText(args.pgn, 'pasted-pgn')
    if (args.analyzeAfterImport && result.createdGameIds.length) {
      queueAnalysis(result.createdGameIds)
    }
    return result
  })
  handle('import:pickPgnFile', async () => {
    const win = BrowserWindow.getFocusedWindow()
    const res = await dialog.showOpenDialog(win!, {
      filters: [{ name: 'PGN files', extensions: ['pgn', 'txt'] }],
      properties: ['openFile']
    })
    return res.canceled ? null : res.filePaths[0]
  })

  // ---- Engines ----
  handle('engines:list', () => listEngines())
  handle('engines:add', (path: string) => addEngine(path))
  handle('engines:remove', (id: string) => removeEngine(id))
  handle('engines:verify', (id: string) => reverifyEngine(id))
  handle('engines:pickExecutable', async () => {
    const win = BrowserWindow.getFocusedWindow()
    const res = await dialog.showOpenDialog(win!, {
      title: 'Select a UCI engine executable',
      filters: [{ name: 'Executables', extensions: ['exe', ''] }],
      properties: ['openFile']
    })
    return res.canceled ? null : res.filePaths[0]
  })
  handle('engines:profiles', (engineId?: string) => listProfiles(engineId))
  handle('engines:saveProfile', (profile: EngineProfileRecord) => saveProfile(profile))

  // ---- Live evaluation ----
  handle('eval:setEnabled', (on: boolean) => liveEval.setEnabled(on))
  handle('eval:status', () => liveEval.status())
  handle('eval:position', (fen: string) => {
    liveEval.evaluate(fen)
  })

  // ---- Play vs engine ----
  handle('play:start', async (args: PlayStartArgs) => {
    // avoid two engine processes fighting for CPU on the same machine
    await liveEval.setEnabled(false)
    return playVsEngine.start(args.fen, args.userColor, args.eloTarget)
  })
  handle('play:move', (uci: string) => playVsEngine.userMove(uci))
  handle('play:stop', () => playVsEngine.stop())
  handle('play:status', () => playVsEngine.status())

  // ---- Analysis ----
  handle('analysis:queue', (args: { gameIds: string[]; profileId?: string }) =>
    queueAnalysis(args.gameIds, args.profileId)
  )
  handle('analysis:cancel', (jobId: string) => cancelJob(jobId))
  handle('analysis:forGame', (gameId: string) => getAnalysisForGame(gameId))
  handle('mistakes:forGame', (gameId: string) => getMistakesForGame(gameId))

  // ---- Jobs ----
  handle('jobs:list', () => listJobs())

  // ---- Lessons ----
  handle('lessons:list', () => listLessons())
  handle('lessons:get', (idOrSlug: string) => getLesson(idOrSlug))
  handle('lessons:validate', (json: unknown) => validateLesson(json))
  handle('lessons:publish', (json: unknown) => publishLesson(json, 'user'))
  handle('lessons:progress:get', (lessonId: string) => getProgress(lessonId))
  handle('lessons:progress:set', (progress: LessonProgressRecord) => setProgress(progress))
  handle('lessons:progress:all', () => listAllProgress())
  handle('courses:list', () => listCourses())

  // ---- Exercises ----
  handle('exercises:list', () => listExercises())
  handle('exercises:due', () => dueExercises())
  handle('exercises:attempt', (args: { id: string; correct: boolean }) => attemptExercise(args.id, args.correct))
  handle('exercises:fromMistake', (mistakeId: string) => createExerciseFromMistake(mistakeId))

  // ---- Repertoire ----
  handle('repertoire:list', (color?: 'white' | 'black') => listNodes(color))
  handle('repertoire:add', (args: Parameters<typeof addNode>[0]) => addNode(args))
  handle('repertoire:addLineFromGame', (args: { gameId: string; uptoPly: number }) =>
    addLineFromGame(args.gameId, args.uptoPly)
  )
  handle('repertoire:addOpeningLine', (args: Parameters<typeof addOpeningLine>[0]) => addOpeningLine(args))
  handle('repertoire:due', () => dueNodes())
  handle('repertoire:attempt', (args: { id: string; correct: boolean }) => attemptNode(args.id, args.correct))
  handle('repertoire:setPriority', (args: { id: string; priority: RepertoireNodeRecord['priority'] }) =>
    setNodePriority(args.id, args.priority)
  )
  handle('repertoire:delete', (id: string) => deleteNode(id))

  // ---- Study plan ----
  handle('plan:today', () => computeTodayPlan())

  // ---- AI ----
  handle('ai:outline', (args: AiOutlineArgs) => generateOutline(args))
  handle('ai:generateLesson', (args: AiGenerateArgs) => generateLesson(args))
}
