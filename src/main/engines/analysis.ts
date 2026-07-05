import { getDb, uid, now, logEvent } from '../db'
import { UciEngine, uciLineToSan } from './uci'
import { getEngine, getProfile } from './store'
import { broadcast } from '../events'
import type { JobContext } from '../jobs/queue'
import type {
  MistakeRecord,
  MistakeSeverity,
  PositionAnalysis,
  PvLine,
  TrainingAction
} from '@shared/types'

const MATE_CP = 30000

/** Normalize a PV score (side-to-move perspective) to a comparable centipawn number. */
function scoreToCp(score: PvLine['score']): number {
  if (score.type === 'cp') return Math.max(-MATE_CP + 1000, Math.min(MATE_CP - 1000, score.value))
  return score.value > 0 ? MATE_CP - score.value * 10 : -MATE_CP - score.value * 10
}

function piecesOnBoard(fen: string): number {
  return (fen.split(' ')[0].match(/[a-zA-Z]/g) ?? []).length
}

function phaseOf(ply: number, fen: string): 'opening' | 'middlegame' | 'endgame' {
  if (piecesOnBoard(fen) <= 12) return 'endgame'
  if (ply <= 16) return 'opening'
  return 'middlegame'
}

interface MoveRow {
  ply: number
  move_number: number
  color: string
  san: string
  uci: string
  fen_before: string
  fen_after: string
  clock_ms: number | null
}

interface Classified {
  severity: MistakeSeverity
  evalLossCp: number
  themeTags: string[]
  humanSummary: string
  whyBad: string
  trainingAction: TrainingAction
  confidence: 'low' | 'medium' | 'high'
  bestLine: PvLine
}

function classify(
  move: MoveRow,
  before: PositionAnalysis,
  after: PositionAnalysis,
  lowOnTime: boolean
): Classified | null {
  const bestLine = before.multiPv[0]
  if (!bestLine) return null
  if (bestLine.moveUci === move.uci) return null // played the best move

  const evalBefore = scoreToCp(bestLine.score) // mover perspective
  const afterBest = after.multiPv[0]
  const resultForMover = afterBest ? -scoreToCp(afterBest.score) : evalBefore
  const loss = evalBefore - resultForMover
  if (loss < 50) return null

  let severity: MistakeSeverity
  if (evalBefore >= 300 && resultForMover < 100) severity = 'missed-win'
  else if (Math.abs(evalBefore) < 60 && resultForMover <= -200) severity = 'missed-draw'
  else if (loss > 250) severity = 'blunder'
  else if (loss > 120) severity = 'mistake'
  else severity = 'inaccuracy'

  const phase = phaseOf(move.ply, move.fen_before)
  const themeTags: string[] = [phase]
  const bestSan = bestLine.moveSan ?? bestLine.moveUci
  const isMate = bestLine.score.type === 'mate' && bestLine.score.value > 0
  if (isMate) themeTags.push('mate-pattern')
  if (bestSan.includes('x')) themeTags.push('winning-material')
  if (bestSan.includes('+')) themeTags.push('forcing-moves')
  if (lowOnTime) themeTags.push('time-pressure')

  let trainingAction: TrainingAction
  if (lowOnTime && severity === 'blunder') trainingAction = 'time-management'
  else if (phase === 'opening') trainingAction = 'opening'
  else if (phase === 'endgame') trainingAction = 'endgame'
  else if (isMate || bestSan.includes('x') || bestSan.includes('+')) trainingAction = 'tactics'
  else if (severity === 'inaccuracy') trainingAction = 'strategy'
  else trainingAction = 'calculation'

  const pawns = (loss / 100).toFixed(1)
  let why: string
  if (isMate) {
    why = `${bestSan} begins a forced mate. Look for checks and forcing moves before anything else.`
  } else if (bestSan.includes('x')) {
    why = `${bestSan} wins material. Before moving, scan for captures — yours and your opponent's.`
  } else if (bestSan.includes('+')) {
    why = `${bestSan} is a forcing check that keeps the initiative. Checks, captures and threats come first.`
  } else if (severity === 'missed-draw') {
    why = `${bestSan} holds the position. In worse positions, look for the most resilient defensive setup.`
  } else {
    why = `${bestSan} keeps your position together. Compare candidate moves before committing.`
  }

  const summary =
    severity === 'missed-win'
      ? `You had a winning position but ${move.san} let it slip. ${bestSan} keeps the win.`
      : severity === 'missed-draw'
        ? `${move.san} loses a holdable position. ${bestSan} keeps the draw.`
        : `${move.san} gave up about ${pawns} pawns of evaluation. ${bestSan} was stronger.`

  const depth = before.depth ?? 0
  const confidence = depth >= 14 && loss >= 150 ? 'high' : depth >= 10 && loss >= 80 ? 'medium' : 'low'

  return {
    severity,
    evalLossCp: Math.round(loss),
    themeTags,
    humanSummary: summary,
    whyBad: why,
    trainingAction,
    confidence,
    bestLine
  }
}

function exerciseFromMistake(
  mistakeId: string,
  gameId: string,
  move: MoveRow,
  cls: Classified,
  opponent: string
): void {
  const db = getDb()
  const pv = cls.bestLine.pvUci.slice(0, 3)
  const { sans, legalCount } = uciLineToSan(move.fen_before, pv)
  if (legalCount === 0) return
  const moves = pv.slice(0, legalCount).map((u, i) => ({ moveUci: u, moveSan: sans[i] }))

  const type =
    cls.severity === 'missed-win' ? 'convert_win' : cls.severity === 'missed-draw' ? 'save_draw' : 'best_move'
  const sideToMove = move.color
  const title = `From your game vs ${opponent || 'opponent'}`
  const prompt =
    cls.severity === 'missed-draw'
      ? `${sideToMove === 'white' ? 'White' : 'Black'} to move. You are worse — find the move that holds.`
      : `${sideToMove === 'white' ? 'White' : 'Black'} to move. Find the strongest continuation (you played ${move.san} in the game).`

  const hints: string[] = []
  if (cls.themeTags.includes('mate-pattern')) hints.push('There is a forced mate. Start with checks.')
  else if (cls.themeTags.includes('winning-material')) hints.push('A capture wins material.')
  else hints.push('Compare all forcing moves: checks, captures, threats.')
  const firstSan = moves[0].moveSan ?? moves[0].moveUci
  hints.push(`The key move starts on ${moves[0].moveUci.slice(0, 2)}.`)

  db.prepare(
    `INSERT INTO exercises (id, origin_type, origin_id, type, title, prompt, fen, solution_json, hints_json, difficulty, tags_json, due_at, created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(
    uid('ex'),
    'mistake',
    mistakeId,
    type,
    title,
    prompt,
    move.fen_before,
    JSON.stringify({
      moves,
      explanation: `${cls.humanSummary} ${cls.whyBad}`,
      remember: `Rule: ${firstSan} — ${cls.whyBad.split('.')[1]?.trim() ?? 'check forcing moves first.'}`
    }),
    JSON.stringify(hints),
    cls.severity === 'blunder' ? 2 : 3,
    JSON.stringify([...cls.themeTags, cls.trainingAction]),
    now(),
    now()
  )
}

export async function analyzeGameJob(payload: unknown, ctx: JobContext): Promise<void> {
  const { gameId, profileId } = payload as { gameId: string; profileId: string }
  const db = getDb()

  const game = db.prepare('SELECT * FROM games WHERE id = ?').get(gameId) as Record<string, unknown> | undefined
  if (!game) throw new Error(`Game not found: ${gameId}`)
  if (game.ongoing) throw new Error('This game appears to be ongoing. Analysis of ongoing games is blocked.')
  if (game.variant !== 'chess') throw new Error(`Variant games are not supported for analysis (${game.variant}).`)

  const profile = getProfile(profileId)
  if (!profile) throw new Error('Engine profile not found. Add an engine first.')
  const engineRec = getEngine(profile.engineId)
  if (!engineRec) throw new Error('Engine not found for profile.')

  const moves = db
    .prepare('SELECT ply, move_number, color, san, uci, fen_before, fen_after, clock_ms FROM moves WHERE game_id = ? ORDER BY ply')
    .all(gameId) as unknown as MoveRow[]
  if (moves.length === 0) throw new Error('Game has no moves to analyze.')

  db.prepare('UPDATE games SET analysis_status = ? WHERE id = ?').run('running', gameId)
  broadcast({ type: 'games:changed', payload: null })

  const engine = new UciEngine(engineRec.executablePath)
  engine.start()
  const multiPv = profile.limits.multiPv ?? 2
  try {
    await engine.handshake()
    for (const [name, value] of Object.entries(profile.options)) engine.setOption(name, value)
    engine.setOption('MultiPV', multiPv)
    await engine.newGame()

    const total = moves.length + 1
    const analyses: PositionAnalysis[] = []
    const startFen = moves[0].fen_before
    const isStandardStart = startFen.startsWith('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w')

    for (let i = 0; i <= moves.length; i++) {
      if (ctx.isCancelled()) break
      const fen = i === 0 ? startFen : moves[i - 1].fen_after
      const res = await engine.analyze({
        fen,
        startposMoves: isStandardStart ? moves.slice(0, i).map((m) => m.uci) : undefined,
        limits: profile.limits,
        multiPv
      })
      const analysis: PositionAnalysis = {
        gameId,
        ply: i,
        fen,
        sideToMove: fen.split(' ')[1] as 'w' | 'b',
        engineId: engineRec.id,
        engineProfileId: profile.id,
        depth: res.depth,
        nodes: res.nodes,
        timeMs: res.timeMs,
        multiPv: res.multiPv,
        createdAt: now()
      }
      analyses.push(analysis)
      db.prepare(
        `INSERT INTO engine_analysis (id, game_id, ply, fen, engine_id, engine_profile_id, depth, nodes, time_ms, result_json, created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)
         ON CONFLICT(game_id, ply, engine_profile_id) DO UPDATE SET
           result_json = excluded.result_json, depth = excluded.depth, nodes = excluded.nodes,
           time_ms = excluded.time_ms, created_at = excluded.created_at`
      ).run(
        uid('ana'),
        gameId,
        i,
        fen,
        engineRec.id,
        profile.id,
        res.depth ?? null,
        res.nodes ?? null,
        res.timeMs ?? null,
        JSON.stringify({ multiPv: res.multiPv, bestmove: res.bestmoveUci }),
        now()
      )
      ctx.setProgress(i + 1, total, `Position ${i + 1}/${total}`)
      broadcast({ type: 'job:progress', payload: null })
    }

    if (ctx.isCancelled()) {
      db.prepare('UPDATE games SET analysis_status = ? WHERE id = ?').run('none', gameId)
      broadcast({ type: 'games:changed', payload: null })
      return
    }

    // Classify mistakes for the user's moves (both sides when user color is unknown)
    db.prepare('DELETE FROM mistakes WHERE game_id = ?').run(gameId)
    const userColor = game.user_color as string
    const opponent = (userColor === 'black' ? game.white_name : game.black_name) as string

    let exercisesCreated = 0
    let biggestSkipped: { move: MoveRow; cls: Classified } | null = null
    for (const move of moves) {
      if (userColor !== 'unknown' && move.color !== userColor) continue
      const before = analyses[move.ply - 1]
      const after = analyses[move.ply]
      if (!before || !after) continue
      const lowOnTime = move.clock_ms !== null && move.clock_ms < 30_000
      const cls = classify(move, before, after, lowOnTime)
      if (!cls) continue

      const mistakeId = uid('mis')
      db.prepare(
        `INSERT INTO mistakes (id, game_id, ply, severity, eval_loss_cp, theme_tags_json, human_summary, why_bad, better_move_san, better_move_uci, training_action, confidence, created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
      ).run(
        mistakeId,
        gameId,
        move.ply,
        cls.severity,
        cls.evalLossCp,
        JSON.stringify(cls.themeTags),
        cls.humanSummary,
        cls.whyBad,
        cls.bestLine.moveSan ?? null,
        cls.bestLine.moveUci,
        cls.trainingAction,
        cls.confidence,
        now()
      )
      logEvent('mistake.created', 'mistake', mistakeId, { gameId, severity: cls.severity })

      if (cls.severity !== 'inaccuracy' && cls.confidence !== 'low') {
        exerciseFromMistake(mistakeId, gameId, move, cls, opponent)
        exercisesCreated++
      } else if (!biggestSkipped || cls.evalLossCp > biggestSkipped.cls.evalLossCp) {
        biggestSkipped = { move, cls }
      }
    }
    // Release criterion: at least one exercise per analyzed game when any mistake exists
    if (exercisesCreated === 0 && biggestSkipped) {
      exerciseFromMistake(uid('mis'), gameId, biggestSkipped.move, biggestSkipped.cls, opponent)
    }

    db.prepare('UPDATE games SET analysis_status = ? WHERE id = ?').run('done', gameId)
    logEvent('game.analyzed', 'game', gameId, { profileId })
    broadcast({ type: 'games:changed', payload: null })
    broadcast({ type: 'exercises:changed', payload: null })
  } catch (e) {
    db.prepare('UPDATE games SET analysis_status = ? WHERE id = ?').run('failed', gameId)
    broadcast({ type: 'games:changed', payload: null })
    throw e
  } finally {
    await engine.quit()
  }
}

export function getAnalysisForGame(gameId: string): PositionAnalysis[] {
  const rows = getDb()
    .prepare('SELECT * FROM engine_analysis WHERE game_id = ? ORDER BY ply')
    .all(gameId) as Array<Record<string, unknown>>
  return rows.map((row) => {
    const result = JSON.parse(row.result_json as string)
    return {
      gameId: row.game_id as string,
      ply: row.ply as number,
      fen: row.fen as string,
      sideToMove: (row.fen as string).split(' ')[1] as 'w' | 'b',
      engineId: row.engine_id as string,
      engineProfileId: row.engine_profile_id as string,
      depth: (row.depth as number) ?? undefined,
      nodes: (row.nodes as number) ?? undefined,
      timeMs: (row.time_ms as number) ?? undefined,
      multiPv: result.multiPv ?? [],
      createdAt: row.created_at as string
    }
  })
}

export function getMistakesForGame(gameId: string): MistakeRecord[] {
  const rows = getDb()
    .prepare('SELECT * FROM mistakes WHERE game_id = ? ORDER BY ply')
    .all(gameId) as Array<Record<string, unknown>>
  return rows.map((row) => ({
    id: row.id as string,
    gameId: row.game_id as string,
    ply: row.ply as number,
    severity: row.severity as MistakeRecord['severity'],
    evalLossCp: (row.eval_loss_cp as number) ?? null,
    themeTags: JSON.parse(row.theme_tags_json as string),
    humanSummary: row.human_summary as string,
    whyBad: (row.why_bad as string) ?? null,
    betterMoveSan: (row.better_move_san as string) ?? null,
    betterMoveUci: (row.better_move_uci as string) ?? null,
    trainingAction: row.training_action as MistakeRecord['trainingAction'],
    confidence: row.confidence as MistakeRecord['confidence'],
    createdAt: row.created_at as string
  }))
}
