// Live position evaluation: one persistent UCI engine that follows whatever
// board the user is currently looking at, streaming eval updates to the renderer.
import { UciEngine, uciLineToSan } from './uci'
import { resolveDefaultEngineRecord } from './store'
import { broadcast } from '../events'
import type { LiveEvalStatus, LiveEvalUpdate, PvLine } from '@shared/types'

const LIVE_MULTIPV = 2
const LIVE_DEPTH_CAP = 24
const BROADCAST_THROTTLE_MS = 300
const STOP_TIMEOUT_MS = 5_000

function parseInfoLine(fen: string, line: string): { rank: number; depth: number; pv: PvLine } | null {
  if (!line.startsWith('info ') || !line.includes(' pv ')) return null
  const depth = parseInt(/\bdepth (\d+)/.exec(line)?.[1] ?? '0')
  const rank = parseInt(/\bmultipv (\d+)/.exec(line)?.[1] ?? '1')
  const scoreCp = /\bscore cp (-?\d+)/.exec(line)?.[1]
  const scoreMate = /\bscore mate (-?\d+)/.exec(line)?.[1]
  const pvStr = / pv (.+)$/.exec(line)?.[1]
  if (!pvStr || (scoreCp === undefined && scoreMate === undefined)) return null
  const pvUci = pvStr.trim().split(/\s+/).slice(0, 12)
  const { sans } = uciLineToSan(fen, pvUci)
  return {
    rank,
    depth,
    pv: {
      rank,
      moveUci: pvUci[0],
      moveSan: sans[0],
      score:
        scoreMate !== undefined
          ? { type: 'mate', value: parseInt(scoreMate), perspective: 'side-to-move' }
          : { type: 'cp', value: parseInt(scoreCp!), perspective: 'side-to-move' },
      pvUci,
      pvSan: sans
    }
  }
}

class LiveEvaluator {
  private engine: UciEngine | null = null
  private engineName: string | null = null
  private enabled = false
  private searching = false
  private currentFen: string | null = null
  private pendingFen: string | null = null
  private pumping = false
  private unsubscribe: (() => void) | null = null
  private lastBroadcastAt = 0
  private bestByRank = new Map<number, { depth: number; pv: PvLine }>()

  status(): LiveEvalStatus {
    return {
      enabled: this.enabled,
      available: this.engine?.isRunning ?? false,
      engineName: this.engineName,
      error: null
    }
  }

  async setEnabled(on: boolean): Promise<LiveEvalStatus> {
    if (!on) {
      this.enabled = false
      await this.shutdown()
      return this.status()
    }
    if (this.enabled && this.engine?.isRunning) return this.status()
    const rec = resolveDefaultEngineRecord()
    const engine = new UciEngine(rec.executablePath)
    engine.start()
    await engine.handshake()
    engine.setOption('MultiPV', LIVE_MULTIPV)
    await engine.newGame()
    this.engine = engine
    this.engineName = rec.name
    this.enabled = true
    this.searching = false
    this.wireStreaming()
    // catch up on the position the renderer last reported
    if (this.pendingFen || this.currentFen) {
      this.pendingFen = this.pendingFen ?? this.currentFen
      this.currentFen = null
      void this.pump()
    }
    return this.status()
  }

  /** Renderer reports the fen of the board the user is looking at. */
  evaluate(fen: string): void {
    if (!this.enabled) {
      // remember it so enabling the toggle picks up the visible board immediately
      this.pendingFen = fen
      return
    }
    if (fen === this.currentFen && this.searching) return
    this.pendingFen = fen
    void this.pump()
  }

  private wireStreaming(): void {
    if (!this.engine) return
    this.unsubscribe = this.engine.onLine((line) => {
      if (!this.currentFen) return
      // search finished on its own (depth cap reached)
      if (line.startsWith('bestmove')) {
        this.searching = false
        this.broadcastUpdate(true)
        return
      }
      const parsed = parseInfoLine(this.currentFen, line)
      if (!parsed) return
      const prev = this.bestByRank.get(parsed.rank)
      if (!prev || parsed.depth >= prev.depth) this.bestByRank.set(parsed.rank, parsed)
      const now = Date.now()
      if (now - this.lastBroadcastAt >= BROADCAST_THROTTLE_MS) this.broadcastUpdate(false)
    })
  }

  private broadcastUpdate(final: boolean): void {
    if (!this.currentFen || this.bestByRank.size === 0) return
    this.lastBroadcastAt = Date.now()
    const ranked = [...this.bestByRank.entries()].sort((a, b) => a[0] - b[0])
    const update: LiveEvalUpdate = {
      fen: this.currentFen,
      sideToMove: (this.currentFen.split(' ')[1] as 'w' | 'b') ?? 'w',
      depth: ranked[0][1].depth,
      multiPv: ranked.map(([, v]) => v.pv),
      engineName: this.engineName ?? 'engine',
      final
    }
    broadcast({ type: 'engine:eval', payload: update })
  }

  /** Serialize stop/position/go cycles; always converges on the latest pending fen. */
  private async pump(): Promise<void> {
    if (this.pumping) return
    this.pumping = true
    try {
      while (this.pendingFen && this.enabled && this.engine?.isRunning) {
        const fen = this.pendingFen
        this.pendingFen = null
        if (fen === this.currentFen && this.searching) continue
        await this.stopSearch()
        if (!this.enabled || !this.engine?.isRunning) break
        this.currentFen = fen
        this.bestByRank.clear()
        this.lastBroadcastAt = 0
        this.engine.send(`position fen ${fen}`)
        this.engine.send(`go depth ${LIVE_DEPTH_CAP}`)
        this.searching = true
      }
    } catch (e) {
      // engine died mid-cycle — disable and tell the renderer
      this.enabled = false
      await this.shutdown()
      broadcast({ type: 'engine:status', payload: { liveEvalError: (e as Error).message } })
    } finally {
      this.pumping = false
    }
  }

  private async stopSearch(): Promise<void> {
    if (!this.engine?.isRunning || !this.searching) return
    const done = this.engine.waitForLine((l) => l.startsWith('bestmove'), STOP_TIMEOUT_MS)
    this.engine.send('stop')
    await done // the streaming listener marks the search finished and broadcasts
    this.searching = false
  }

  async shutdown(): Promise<void> {
    this.unsubscribe?.()
    this.unsubscribe = null
    this.searching = false
    this.currentFen = null
    this.bestByRank.clear()
    const engine = this.engine
    this.engine = null
    this.engineName = null
    if (engine) await engine.quit()
  }
}

export const liveEval = new LiveEvaluator()
