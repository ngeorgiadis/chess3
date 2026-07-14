/** Humanize an ISO date/datetime as "today" / "tomorrow" / "Jul 20" relative to now. */
export function formatDue(iso: string | null | undefined): string {
  if (!iso) return '—'
  const day = iso.slice(0, 10)
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)
  const tomorrowStr = new Date(today.getTime() + 86_400_000).toISOString().slice(0, 10)
  const yesterdayStr = new Date(today.getTime() - 86_400_000).toISOString().slice(0, 10)
  if (day === todayStr) return 'today'
  if (day === tomorrowStr) return 'tomorrow'
  if (day === yesterdayStr) return 'yesterday'
  const d = new Date(day + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
