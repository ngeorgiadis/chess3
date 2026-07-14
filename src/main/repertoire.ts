import { Chess } from 'chess.js'
import { getDb, uid, now } from './db'
import { broadcast } from './events'
import { openingLabel } from '@shared/eco-names'
import type { RepertoireNodeRecord } from '@shared/types'

function rowToNode(row: Record<string, unknown>): RepertoireNodeRecord {
  return {
    id: row.id as string,
    color: row.color as 'white' | 'black',
    parentId: (row.parent_id as string) ?? null,
    fenBefore: row.fen_before as string,
    moveUci: row.move_uci as string,
    moveSan: row.move_san as string,
    priority: row.priority as RepertoireNodeRecord['priority'],
    status: row.status as RepertoireNodeRecord['status'],
    comment: (row.comment as string) ?? null,
    source: JSON.parse(row.source_json as string),
    dueAt: (row.due_at as string) ?? null,
    intervalDays: row.interval_days as number,
    ease: row.ease as number,
    openingName: (row.opening_name as string) ?? null,
    lineName: (row.line_name as string) ?? null
  }
}

export function listNodes(color?: 'white' | 'black'): RepertoireNodeRecord[] {
  const rows = (
    color
      ? getDb().prepare('SELECT * FROM repertoire_nodes WHERE color = ?').all(color)
      : getDb().prepare('SELECT * FROM repertoire_nodes').all()
  ) as Array<Record<string, unknown>>
  return rows.map(rowToNode)
}

export interface AddNodeArgs {
  color: 'white' | 'black'
  fenBefore: string
  moveUci: string
  comment?: string
  source?: { type: string; gameId?: string }
  parentId?: string | null
  openingName?: string | null
  lineName?: string | null
}

/** Add a repertoire node; duplicate (color, fen, move) returns the existing node. */
export function addNode(args: AddNodeArgs): RepertoireNodeRecord {
  const db = getDb()
  const existing = db
    .prepare('SELECT * FROM repertoire_nodes WHERE color = ? AND fen_before = ? AND move_uci = ?')
    .get(args.color, args.fenBefore, args.moveUci) as Record<string, unknown> | undefined
  if (existing) return rowToNode(existing)

  const chess = new Chess(args.fenBefore)
  const mv = chess.move({
    from: args.moveUci.slice(0, 2),
    to: args.moveUci.slice(2, 4),
    promotion: args.moveUci.slice(4) || undefined
  })

  const id = uid('rep')
  db.prepare(
    `INSERT INTO repertoire_nodes (id, color, parent_id, fen_before, move_uci, move_san, priority, status, comment, source_json, due_at, interval_days, ease, opening_name, line_name)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(
    id,
    args.color,
    args.parentId ?? null,
    args.fenBefore,
    args.moveUci,
    mv.san,
    'normal',
    'learning',
    args.comment ?? null,
    JSON.stringify(args.source ?? { type: 'manual' }),
    now(),
    0,
    2.5,
    args.openingName ?? null,
    args.lineName ?? null
  )
  broadcast({ type: 'repertoire:changed', payload: null })
  const row = db.prepare('SELECT * FROM repertoire_nodes WHERE id = ?').get(id) as Record<string, unknown>
  return rowToNode(row)
}

/** One-click "add line to repertoire" from game review: adds the user's moves up to a ply. */
export function addLineFromGame(gameId: string, uptoPly: number): RepertoireNodeRecord[] {
  const db = getDb()
  const game = db.prepare('SELECT user_color, opening_name, eco_code, white_name, black_name FROM games WHERE id = ?').get(
    gameId
  ) as
    | { user_color: string; opening_name: string | null; eco_code: string | null; white_name: string | null; black_name: string | null }
    | undefined
  if (!game) throw new Error('Game not found')
  const color = (game.user_color === 'unknown' ? 'white' : game.user_color) as 'white' | 'black'
  const openingName = game.opening_name ?? game.eco_code ?? 'From a game'
  const opponent = color === 'white' ? game.black_name : game.white_name
  const lineName = opponent ? `vs ${opponent}` : null

  const moves = db
    .prepare('SELECT ply, color, uci, fen_before FROM moves WHERE game_id = ? AND ply <= ? ORDER BY ply')
    .all(gameId, uptoPly) as Array<{ ply: number; color: string; uci: string; fen_before: string }>

  const created: RepertoireNodeRecord[] = []
  let parentId: string | null = null
  for (const mv of moves) {
    const node = addNode({
      color,
      fenBefore: mv.fen_before,
      moveUci: mv.uci,
      parentId,
      source: { type: 'game', gameId },
      openingName,
      lineName
    })
    parentId = node.id
    if (mv.color === color) created.push(node)
  }
  return created
}

/** Add a library opening line (SAN from the start position) to the repertoire. */
export function addOpeningLine(args: {
  color: 'white' | 'black'
  sanMoves: string[]
  openingName: string
  lineName?: string
  comment?: string
}): RepertoireNodeRecord[] {
  const chess = new Chess()
  const label = args.lineName ? `${args.openingName} — ${args.lineName}` : args.openingName
  const created: RepertoireNodeRecord[] = []
  let parentId: string | null = null
  for (let i = 0; i < args.sanMoves.length; i++) {
    const fenBefore = chess.fen()
    const mv = chess.move(args.sanMoves[i])
    const isUserMove = (mv.color === 'w') === (args.color === 'white')
    const isLast = i === args.sanMoves.length - 1
    const node = addNode({
      color: args.color,
      fenBefore,
      moveUci: mv.from + mv.to + (mv.promotion ?? ''),
      parentId,
      comment: isUserMove && isLast && args.comment ? `${label}. ${args.comment}` : isUserMove ? label : undefined,
      source: { type: 'library' },
      openingName: args.openingName,
      lineName: args.lineName ?? null
    })
    parentId = node.id
    if (isUserMove) created.push(node)
  }
  return created
}

/** Only positions where the repertoire owner is to move are quizzed; opponent-move
 * nodes exist for tree structure and are auto-played during practice. */
function userToMove(node: RepertoireNodeRecord): boolean {
  return node.fenBefore.split(' ')[1] === (node.color === 'white' ? 'w' : 'b')
}

export function dueNodes(limit = 30): RepertoireNodeRecord[] {
  const rows = getDb()
    .prepare('SELECT * FROM repertoire_nodes WHERE due_at IS NOT NULL AND due_at <= ? ORDER BY due_at')
    .all(now()) as Array<Record<string, unknown>>
  return rows.map(rowToNode).filter(userToMove).slice(0, limit)
}

export function countDueNodes(): number {
  const rows = getDb()
    .prepare('SELECT color, fen_before FROM repertoire_nodes WHERE due_at IS NOT NULL AND due_at <= ?')
    .all(now()) as Array<{ color: string; fen_before: string }>
  return rows.filter((r) => r.fen_before.split(' ')[1] === (r.color === 'white' ? 'w' : 'b')).length
}

export function attemptNode(id: string, correct: boolean): RepertoireNodeRecord {
  const db = getDb()
  const row = db.prepare('SELECT * FROM repertoire_nodes WHERE id = ?').get(id) as
    | Record<string, unknown>
    | undefined
  if (!row) throw new Error('Repertoire node not found')
  const node = rowToNode(row)

  let ease = node.ease
  let intervalDays: number
  let status = node.status
  if (correct) {
    ease = Math.min(3.0, ease + 0.05)
    intervalDays = node.intervalDays <= 0 ? 1 : Math.round(node.intervalDays * ease * 10) / 10
    if (intervalDays >= 7) status = 'known'
  } else {
    ease = Math.max(1.3, ease - 0.2)
    intervalDays = 0
    status = node.status === 'known' ? 'lapsed' : 'learning'
  }
  const dueAt = correct
    ? new Date(Date.now() + intervalDays * 86_400_000).toISOString()
    : new Date(Date.now() + 10 * 60_000).toISOString()

  db.prepare('UPDATE repertoire_nodes SET ease = ?, interval_days = ?, due_at = ?, status = ? WHERE id = ?').run(
    ease,
    intervalDays,
    dueAt,
    status,
    id
  )
  broadcast({ type: 'repertoire:changed', payload: null })
  return rowToNode(db.prepare('SELECT * FROM repertoire_nodes WHERE id = ?').get(id) as Record<string, unknown>)
}

export function setNodePriority(id: string, priority: RepertoireNodeRecord['priority']): void {
  getDb().prepare('UPDATE repertoire_nodes SET priority = ? WHERE id = ?').run(priority, id)
  broadcast({ type: 'repertoire:changed', payload: null })
}

/**
 * One-shot cleanup for legacy repertoire nodes inserted before lines carried an
 * opening/line label (they show up as an unhelpful flat "Other lines" group).
 * For each unlabeled root, names it from its source game's opening when known,
 * else a generic fallback, and propagates the label down the whole subtree.
 */
export function backfillRepertoireLabels(): number {
  const db = getDb()
  const roots = db
    .prepare('SELECT id, source_json FROM repertoire_nodes WHERE parent_id IS NULL AND opening_name IS NULL')
    .all() as Array<{ id: string; source_json: string }>
  if (roots.length === 0) return 0

  let updated = 0
  for (const root of roots) {
    let label = 'From your games'
    try {
      const source = JSON.parse(root.source_json) as { type?: string; gameId?: string }
      if (source.type === 'game' && source.gameId) {
        const game = db
          .prepare('SELECT opening_name, eco_code FROM games WHERE id = ?')
          .get(source.gameId) as { opening_name: string | null; eco_code: string | null } | undefined
        if (game) label = openingLabel({ openingName: game.opening_name, ecoCode: game.eco_code })
      }
    } catch {
      /* malformed source_json — use the generic fallback label */
    }

    const subtree = [root.id]
    for (let i = 0; i < subtree.length; i++) {
      const children = db.prepare('SELECT id FROM repertoire_nodes WHERE parent_id = ?').all(subtree[i]) as Array<{
        id: string
      }>
      for (const c of children) subtree.push(c.id)
    }
    const placeholders = subtree.map(() => '?').join(',')
    db.prepare(`UPDATE repertoire_nodes SET opening_name = ? WHERE id IN (${placeholders})`).run(label, ...subtree)
    updated += subtree.length
  }
  broadcast({ type: 'repertoire:changed', payload: null })
  return updated
}

/** Delete a node and its full subtree (every move that follows it in the line). */
export function deleteNode(id: string): void {
  const db = getDb()
  const toDelete = [id]
  for (let i = 0; i < toDelete.length; i++) {
    const children = db.prepare('SELECT id FROM repertoire_nodes WHERE parent_id = ?').all(toDelete[i]) as Array<{
      id: string
    }>
    for (const c of children) toDelete.push(c.id)
  }
  const placeholders = toDelete.map(() => '?').join(',')
  db.prepare(`DELETE FROM repertoire_nodes WHERE id IN (${placeholders})`).run(...toDelete)
  broadcast({ type: 'repertoire:changed', payload: null })
}
