import { contextBridge, ipcRenderer } from 'electron'

type Envelope = { ok: true; data: unknown } | { ok: false; error: { message: string; detail?: string } }

async function invoke(channel: string, args?: unknown): Promise<unknown> {
  const res = (await ipcRenderer.invoke(channel, args)) as Envelope
  if (!res.ok) {
    const err = new Error(res.error.message)
    ;(err as Error & { detail?: string }).detail = res.error.detail
    throw err
  }
  return res.data
}

// Minimal typed surface — no raw ipcRenderer exposure (04_TECH_ARCHITECTURE.md).
const CHANNELS = [
  'settings:get',
  'settings:set',
  'identity:backfill',
  'games:list',
  'games:get',
  'games:moves',
  'games:delete',
  'games:exportPgn',
  'import:detect',
  'import:previewPgn',
  'import:chesscom',
  'import:lichess',
  'import:lichessGame',
  'import:pgn',
  'import:pickPgnFile',
  'engines:list',
  'engines:add',
  'engines:remove',
  'engines:verify',
  'engines:pickExecutable',
  'engines:profiles',
  'engines:saveProfile',
  'eval:setEnabled',
  'eval:status',
  'eval:position',
  'play:start',
  'play:move',
  'play:stop',
  'play:status',
  'analysis:queue',
  'analysis:cancel',
  'analysis:forGame',
  'mistakes:forGame',
  'jobs:list',
  'lessons:list',
  'lessons:get',
  'lessons:validate',
  'lessons:publish',
  'lessons:progress:get',
  'lessons:progress:set',
  'lessons:progress:all',
  'courses:list',
  'exercises:list',
  'exercises:due',
  'exercises:attempt',
  'exercises:fromMistake',
  'repertoire:list',
  'repertoire:add',
  'repertoire:addLineFromGame',
  'repertoire:addOpeningLine',
  'repertoire:due',
  'repertoire:attempt',
  'repertoire:setPriority',
  'repertoire:delete',
  'plan:today',
  'ai:outline',
  'ai:generateLesson'
] as const

const api: Record<string, unknown> = {}
for (const channel of CHANNELS) {
  api[channel] = (args?: unknown) => invoke(channel, args)
}

api.onEvent = (callback: (event: unknown) => void): (() => void) => {
  const listener = (_e: unknown, payload: unknown): void => callback(payload)
  ipcRenderer.on('app:event', listener as never)
  return () => ipcRenderer.removeListener('app:event', listener as never)
}

contextBridge.exposeInMainWorld('api', api)
