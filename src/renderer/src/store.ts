import { create } from 'zustand'
import { useEffect } from 'react'
import { api } from './api'
import { setSoundEnabled } from './sound'
import type { AppEvent, AppSettings, JobRecord, LiveEvalUpdate } from '@shared/types'

export type Route =
  | { name: 'today' }
  | { name: 'games'; ecoFilter?: string }
  | { name: 'insights' }
  | { name: 'review'; gameId: string }
  | { name: 'openings' }
  | { name: 'lessons' }
  | { name: 'lesson'; lessonId: string }
  | { name: 'exercises'; tag?: string }
  | { name: 'ai-studio' }
  | { name: 'engines' }
  | { name: 'settings' }

interface AppState {
  route: Route
  settings: AppSettings | null
  jobs: JobRecord[]
  importModalOpen: boolean
  onboardingOpen: boolean
  /** Live engine evaluation of the currently visible board. */
  evalEnabled: boolean
  evalError: string | null
  evalUpdate: LiveEvalUpdate | null
  evalFen: string | null
  navigate: (route: Route) => void
  setImportModalOpen: (open: boolean) => void
  setOnboardingOpen: (open: boolean) => void
  refreshSettings: () => Promise<void>
  refreshJobs: () => Promise<void>
  setEvalEnabled: (on: boolean) => Promise<void>
  /** Boards report the position the user is currently looking at. */
  reportEvalFen: (fen: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  route: { name: 'today' },
  settings: null,
  jobs: [],
  importModalOpen: false,
  onboardingOpen: false,
  evalEnabled: false,
  evalError: null,
  evalUpdate: null,
  evalFen: null,
  navigate: (route) => set({ route }),
  setImportModalOpen: (open) => set({ importModalOpen: open }),
  setOnboardingOpen: (open) => set({ onboardingOpen: open }),
  refreshSettings: async () => {
    const settings = await api.settings.get()
    setSoundEnabled(settings.soundEnabled)
    set({ settings })
  },
  refreshJobs: async () => set({ jobs: await api.jobs.list() }),
  setEvalEnabled: async (on) => {
    try {
      const status = await api.eval.setEnabled(on)
      set({ evalEnabled: status.enabled, evalError: null, evalUpdate: on ? get().evalUpdate : null })
      const fen = get().evalFen
      if (status.enabled && fen) void api.eval.position(fen)
    } catch (e) {
      set({ evalEnabled: false, evalError: (e as Error).message })
    }
  },
  reportEvalFen: (fen) => {
    if (fen === get().evalFen) return
    set({ evalFen: fen })
    if (get().evalEnabled) void api.eval.position(fen)
  }
}))

let wired = false
export function wireEvents(): void {
  if (wired) return
  wired = true
  void useStore.getState().refreshSettings()
  void useStore.getState().refreshJobs()
  api.onEvent((event) => {
    if (event.type.startsWith('job:')) void useStore.getState().refreshJobs()
    if (event.type === 'engine:eval') {
      const update = event.payload as LiveEvalUpdate
      // ignore stale results for a board we already navigated away from
      if (update.fen === useStore.getState().evalFen) useStore.setState({ evalUpdate: update })
    }
    if (event.type === 'engine:status') {
      const payload = event.payload as { liveEvalError?: string } | null
      if (payload?.liveEvalError) {
        useStore.setState({ evalEnabled: false, evalError: payload.liveEvalError })
      }
    }
    for (const cb of listeners) cb(event)
  })
}

const listeners = new Set<(e: AppEvent) => void>()

/** Subscribe a component to app events (games:changed etc.) for data refresh. */
export function useAppEvent(types: Array<AppEvent['type']>, callback: () => void): void {
  useEffect(() => {
    const cb = (e: AppEvent): void => {
      if (types.includes(e.type)) callback()
    }
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types.join(','), callback])
}

/** Report the fen of the main board on screen so the live engine follows it. */
export function useEvalTarget(fen: string | null | undefined): void {
  const report = useStore((s) => s.reportEvalFen)
  useEffect(() => {
    if (fen) report(fen)
  }, [fen, report])
}
