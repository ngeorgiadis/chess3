import { useStore } from './store'
import { Sidebar } from './components/Sidebar'
import { ImportModal } from './components/ImportModal'
import { Today } from './routes/Today'
import { Games } from './routes/Games'
import { Review } from './routes/Review'
import { Openings } from './routes/Openings'
import { Lessons } from './routes/Lessons'
import { LessonPlayer } from './routes/LessonPlayer'
import { Exercises } from './routes/Exercises'
import { AiStudio } from './routes/AiStudio'
import { Engines } from './routes/Engines'
import { Settings } from './routes/Settings'

export function App(): React.JSX.Element {
  const route = useStore((s) => s.route)
  const importModalOpen = useStore((s) => s.importModalOpen)

  let content: React.JSX.Element
  switch (route.name) {
    case 'today':
      content = <Today />
      break
    case 'games':
      content = <Games />
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
      content = <Exercises />
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
      <main className="main-content">{content}</main>
      {importModalOpen && <ImportModal />}
    </div>
  )
}
