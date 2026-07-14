// Play-out-the-position: a single-game UCI opponent at a configurable strength.
// One game at a time (v1) — starting a new game stops any game in progress.
import { Chess } from 'chess.js'
import { UciEngine } from './uci'
import { resolveDefaultEngineRecord } from './store'
import type { PlayGameState, PlayMoveEntry, PlayMoveResult } from '@shared/types'
import type { UciOption } from '@shared/types'

const MOVETIME_MS = 700
const MIN_ELO = 800
const MAX_ELO = 2500

class PlayVsEngine {
  private engine: UciEngine | null = null
  private chess = new Chess()
  private startFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  private userColor: 'white' | 'black' = 'white'
  private engineName: string | null = null

  private isEngineTurn(): boolean {
    const toMoveColor = this.chess.turn() === 'w' ? 'white' : 'black'
    return toMoveColor !== this.userColor && !this.gameOver().over
  }

  private gameOver(): { over: boolean; result: PlayGameState['result']; reason: string | null } {
    if (this.chess.isCheckmate()) {
      return { over: true, result: this.chess.turn() === 'w' ? '0-1' : '1-0', reason: 'checkmate' }
    }
    if (this.chess.isStalemate()) return { over: true, result: '1/2-1/2', reason: 'stalemate' }
    if (this.chess.isThreefoldRepetition()) return { over: true, result: '1/2-1/2', reason: 'threefold repetition' }
    if (this.chess.isInsufficientMaterial()) return { over: true, result: '1/2-1/2', reason: 'insufficient material' }
    if (this.chess.isDrawByFiftyMoves()) return { over: true, result: '1/2-1/2', reason: '50-move rule' }
    if (this.chess.isDraw()) return { over: true, result: '1/2-1/2', reason: 'draw' }
    return { over: false, result: null, reason: null }
  }

  private state(): PlayGameState {
    const over = this.gameOver()
    return {
      fen: this.chess.fen(),
      turn: this.chess.turn(),
      userColor: this.userColor,
      moves: this.chess.history({ verbose: true }).map((m) => ({ uci: m.from + m.to + (m.promotion ?? ''), san: m.san })),
      over: over.over,
      result: over.result,
      reason: over.reason,
      engineName: this.engineName
    }
  }

  /** Apply strength options if the engine supports them; falls back to full strength silently. */
  private applyStrength(engine: UciEngine, options: UciOption[], eloTarget: number | undefined): void {
    if (eloTarget == null) return
    const elo = Math.max(MIN_ELO, Math.min(MAX_ELO, Math.round(eloTarget)))
    const limitStrength = options.find((o) => o.name === 'UCI_LimitStrength')
    const uciElo = options.find((o) => o.name === 'UCI_Elo')
    if (limitStrength && uciElo && uciElo.type === 'spin') {
      const min = uciElo.min ?? MIN_ELO
      const max = uciElo.max ?? MAX_ELO
      engine.setOption('UCI_LimitStrength', true)
      engine.setOption('UCI_Elo', Math.max(min, Math.min(max, elo)))
      return
    }
    const skillLevel = options.find((o) => o.name === 'Skill Level' && o.type === 'spin')
    if (skillLevel) {
      const skill = Math.round(((elo - MIN_ELO) / (MAX_ELO - MIN_ELO)) * 20)
      engine.setOption('Skill Level', Math.max(0, Math.min(20, skill)))
    }
  }

  private async engineReply(): Promise<PlayMoveEntry | null> {
    if (!this.engine?.isRunning) return null
    const uciMoves = this.chess.history({ verbose: true }).map((m) => m.from + m.to + (m.promotion ?? ''))
    this.engine.send(`position fen ${this.startFen}${uciMoves.length ? ' moves ' + uciMoves.join(' ') : ''}`)
    this.engine.send(`go movetime ${MOVETIME_MS}`)
    const line = await this.engine.waitForLine((l) => l.startsWith('bestmove'), 15_000)
    const uci = /^bestmove (\S+)/.exec(line)?.[1]
    if (!uci || uci === '(none)') return null
    let mv
    try {
      mv = this.chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
    } catch {
      throw new Error(`Engine returned an illegal move (${uci}) — try again or exit.`)
    }
    return { uci: mv.from + mv.to + (mv.promotion ?? ''), san: mv.san }
  }

  async start(fen: string, userColor: 'white' | 'black', eloTarget?: number): Promise<PlayMoveResult> {
    await this.stop()
    this.chess = new Chess(fen)
    this.startFen = fen
    this.userColor = userColor

    const rec = resolveDefaultEngineRecord()
    const engine = new UciEngine(rec.executablePath)
    engine.start()
    const meta = await engine.handshake()
    this.applyStrength(engine, meta.options, eloTarget)
    await engine.newGame()
    this.engine = engine
    this.engineName = rec.name

    let engineMove: PlayMoveEntry | null = null
    if (this.isEngineTurn()) engineMove = await this.engineReply()
    return { state: this.state(), engineMove }
  }

  async userMove(uci: string): Promise<PlayMoveResult> {
    if (!this.engine?.isRunning) throw new Error('No game in progress. Start a new game first.')
    if (this.isEngineTurn()) throw new Error("It's the engine's turn.")
    if (this.gameOver().over) throw new Error('The game is already over.')
    let mv
    try {
      mv = this.chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
    } catch {
      throw new Error('Illegal move.')
    }
    void mv
    let engineMove: PlayMoveEntry | null = null
    if (this.isEngineTurn()) engineMove = await this.engineReply()
    return { state: this.state(), engineMove }
  }

  status(): PlayGameState | null {
    return this.engine?.isRunning ? this.state() : null
  }

  async stop(): Promise<void> {
    const engine = this.engine
    this.engine = null
    this.engineName = null
    if (engine) await engine.quit()
  }
}

export const playVsEngine = new PlayVsEngine()
