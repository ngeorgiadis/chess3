import { useEffect, useState } from 'react'
import { useStore } from './store'
import { api } from './api'
import { Sidebar } from './components/Sidebar'
import { ImportModal } from './components/ImportModal'
import { Onboarding, ONBOARDING_DONE_KEY } from './components/Onboarding'
import { Today } from './routes/Today'
import { Games } from './routes/Games'
import { Insights } from './routes/Insights'
import { Review } from './routes/Review'
import { Openings } from './routes/Openings'
import { Lessons } from './routes/Lessons'
import { LessonPlayer } from './routes/LessonPlayer'
import { Exercises } from './routes/Exercises'
import { AiStudio } from './routes/AiStudio'
import { Engines } from './routes/Engines'
import { Settings } from './routes/Settings'

function SessionBanner(): React.JSX.Element | null {
  const sessionQueue = useStore((s) => s.sessionQueue)
  const sessionIndex = useStore((s) => s.sessionIndex)
  const advanceSession = useStore((s) => s.advanceSession)
  const endSession = useStore((s) => s.endSession)
  if (sessionQueue.length === 0) return null
  const task = sessionQueue[sessionIndex]
  const isLast = sessionIndex >= sessionQueue.length - 1
  return (
    <div className="session-banner">
      <span>
        Task {sessionIndex + 1} of {sessionQueue.length} — <b>{task.title}</b>
      </span>
      <div className="row" style={{ gap: 6 }}>
        <button className="small primary" onClick={advanceSession}>
          {isLast ? 'Finish session' : 'Next →'}
        </button>
        <button className="small" onClick={endSession} title="End guided session">
          ✕
        </button>
      </div>
    </div>
  )
}

const SHORTCUT_GROUPS: Array<{ title: string; items: Array<[string, string]> }> = [
  { title: 'Global', items: [['?', 'Show/hide this shortcuts help']] },
  {
    title: 'Review',
    items: [
      ['← / →', 'Step one move back / forward'],
      ['Home / End', 'Jump to the start / end of the game'],
      ['[ / ]', 'Previous / next critical moment'],
      ['Space', 'Toggle autoplay']
    ]
  },
  { title: 'Opening practice', items: [['Enter / Space', 'Advance after answering a position']] }
]

function ShortcutsOverlay({ onClose }: { onClose: () => void }): React.JSX.Element {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: 420 }} onClick={(e) => e.stopPropagation()}>
        <h2>Keyboard shortcuts</h2>
        <div className="col" style={{ gap: 14 }}>
          {SHORTCUT_GROUPS.map((g) => (
            <div key={g.title}>
              <div className="muted" style={{ marginBottom: 6, fontWeight: 600 }}>
                {g.title}
              </div>
              <div className="col" style={{ gap: 4 }}>
                {g.items.map(([key, desc]) => (
                  <div key={key} className="row" style={{ justifyContent: 'space-between' }}>
                    <span className="mono badge">{key}</span>
                    <span className="muted">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button className="primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export function App(): React.JSX.Element {
  const route = useStore((s) => s.route)
  const importModalOpen = useStore((s) => s.importModalOpen)
  const onboardingOpen = useStore((s) => s.onboardingOpen)
  const setOnboardingOpen = useStore((s) => s.setOnboardingOpen)
  const settings = useStore((s) => s.settings)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === '?') setShortcutsOpen((o) => !o)
      else if (e.key === 'Escape') setShortcutsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!settings) return
    let done = false
    try {
      done = window.localStorage.getItem(ONBOARDING_DONE_KEY) === 'true'
    } catch {
      /* ignore */
    }
    if (done || settings.chesscomUsername || settings.lichessUsername) return
    void api.games.list({ limit: 1 }).then((games) => {
      if (games.length === 0) setOnboardingOpen(true)
    })
    // only decide once, when settings first become available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings !== null])

  let content: React.JSX.Element
  switch (route.name) {
    case 'today':
      content = <Today />
      break
    case 'games':
      content = <Games initialText={route.ecoFilter} />
      break
    case 'insights':
      content = <Insights />
      break
    case 'review':
      content = <Review gameId={route.gameId} />
      break
    case 'openings':
      content = <Openings />
      break
    case 'lessons':
      content = <Lessons />
      break
    case 'lesson':
      content = <LessonPlayer lessonId={route.lessonId} />
      break
    case 'exercises':
      content = <Exercises initialTag={route.tag} />
      break
    case 'ai-studio':
      content = <AiStudio />
      break
    case 'engines':
      content = <Engines />
      break
    case 'settings':
      content = <Settings />
      break
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-col">
        <SessionBanner />
        <main className="main-content">{content}</main>
      </div>
      {importModalOpen && <ImportModal />}
      {onboardingOpen && <Onboarding />}
      {shortcutsOpen && <ShortcutsOverlay onClose={() => setShortcutsOpen(false)} />}
    </div>
  )
}
