import type { Route } from './store'
import type { PlanTask } from '@shared/types'

/** Where a plan task sends the user — shared between Today's list and the guided-session banner. */
export function routeForTask(task: PlanTask): Route | { openImport: true } {
  switch (task.kind) {
    case 'import':
      return { openImport: true }
    case 'setup-engine':
      return { name: 'engines' }
    case 'exercises':
      return { name: 'exercises' }
    case 'opening-review':
      return { name: 'openings' }
    case 'game-review':
      return task.targetId ? { name: 'review', gameId: task.targetId } : { name: 'games' }
    case 'lesson':
      return task.targetId ? { name: 'lesson', lessonId: task.targetId } : { name: 'lessons' }
  }
}

export function openPlanTask(
  task: PlanTask,
  helpers: { navigate: (route: Route) => void; setImportModalOpen: (open: boolean) => void }
): void {
  const dest = routeForTask(task)
  if ('openImport' in dest) helpers.setImportModalOpen(true)
  else helpers.navigate(dest)
}
