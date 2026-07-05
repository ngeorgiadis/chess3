import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process'
import fs from 'node:fs'
import { Chess } from 'chess.js'
import type { PvLine, UciOption } from '@shared/types'

const HANDSHAKE_TIMEOUT_MS = 10_000
const READY_TIMEOUT_MS = 10_000
/** Hard cap: kill an engine that never returns bestmove. */
const GO_HARD_TIMEOUT_MS = 120_000

export interface AnalyzeRequest {
  fen: string
  /** UCI move list from startpos; preferred to preserve repetition context. */
  startposMoves?: string[]
  limits: { depth?: number; nodes?: number; moveTimeMs?: number }
  multiPv: number
}

export interface AnalyzeResult {
  bestmoveUci: string | null
  multiPv: PvLine[]
  depth?: number
  nodes?: number
  timeMs?: number
}

function parseUciOption(line: string): UciOption | null {
  // e.g. option name Hash type spin default 16 min 1 max 33554432
  const name = /name (.+?) type/.exec(line)?.[1]
  const type = /type (\w+)/.exec(line)?.[1]
  if (!name || !type) return null
  const def = /default ?(\S*)/.exec(line)?.[1]
  switch (type) {
    case 'check':
      return { name, type, default: def === 'true' }
    case 'spin': {
      const min = /min (-?\d+)/.exec(line)?.[1]
      const max = /max (-?\d+)/.exec(line)?.[1]
      return {
        name,
        type,
        default: def !== undefined ? parseInt(def) : undefined,
        min: min !== undefined ? parseInt(min) : undefined,
        max: max !== undefined ? parseInt(max) : undefined
      }
    }
    case 'combo': {
      const vars = [...line.matchAll(/var (\S+)/g)].map((m) => m[1])
      return { name, type, default: def, vars }
    }
    case 'button':
      return { name, type }
    case 'string':
      return { name, type, default: def === '<empty>' ? '' : def }
    default:
      return null
  }
}

export class UciEngine {
  private proc: ChildProcessWithoutNullStreams | null = null
  private lineHandlers: Array<(line: string) => void> = []
  private buffer = ''
  private exited = false

  constructor(private executablePath: string) {}

  get isRunning(): boolean {
    return this.proc !== null && !this.exited
  }

  start(): void {
    if (!fs.existsSync(this.executablePath)) {
      throw new Error(`Engine executable not found: ${this.executablePath}`)
    }
    // argv-array spawn, never shell (06_ENGINE_PLUGIN_SPEC.md engine safety)
    this.proc = spawn(this.executablePath, [], { windowsHide: true, shell: false })
    this.exited = false
    this.proc.on('exit', () => {
      this.exited = true
    })
    this.proc.on('error', () => {
      this.exited = true
    })
    this.proc.stdout.setEncoding('utf8')
    this.proc.stdout.on('data', (chunk: string) => {
      this.buffer += chunk
      let nl: number
      while ((nl = this.buffer.indexOf('\n')) >= 0) {
        const line = this.buffer.slice(0, nl).replace(/\r$/, '')
        this.buffer = this.buffer.slice(nl + 1)
        for (const h of [...this.lineHandlers]) h(line)
      }
    })
  }

  send(cmd: string): void {
    if (!this.proc || this.exited) throw new Error('Engine process is not running')
    this.proc.stdin.write(cmd + '\n')
  }

  /** Subscribe to raw engine output lines; returns an unsubscribe function. */
  onLine(handler: (line: string) => void): () => void {
    this.lineHandlers.push(handler)
    return () => {
      this.lineHandlers = this.lineHandlers.filter((h) => h !== handler)
    }
  }

  /** Wait for a line matching the predicate (public wrapper for streaming users). */
  waitForLine(predicate: (line: string) => boolean, timeoutMs: number): Promise<string> {
    return this.waitFor(predicate, timeoutMs)
  }

  private waitFor(predicate: (line: string) => boolean, timeoutMs: number, onLine?: (line: string) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup()
        reject(new Error(`Engine timed out after ${timeoutMs}ms`))
      }, timeoutMs)
      const handler = (line: string): void => {
        onLine?.(line)
        if (predicate(line)) {
          cleanup()
          resolve(line)
        }
      }
      const cleanup = (): void => {
        clearTimeout(timer)
        this.lineHandlers = this.lineHandlers.filter((h) => h !== handler)
      }
      this.lineHandlers.push(handler)
    })
  }

  /** Full UCI handshake; returns identity and options. */
  async handshake(): Promise<{ name: string; author: string | null; options: UciOption[] }> {
    let name = ''
    let author: string | null = null
    const options: UciOption[] = []
    this.send('uci')
    await this.waitFor(
      (l) => l.trim() === 'uciok',
      HANDSHAKE_TIMEOUT_MS,
      (l) => {
        if (l.startsWith('id name ')) name = l.slice(8).trim()
        else if (l.startsWith('id author ')) author = l.slice(10).trim()
        else if (l.startsWith('option ')) {
          const opt = parseUciOption(l)
          if (opt) options.push(opt)
        }
      }
    )
    await this.isReady()
    return { name: name || 'Unknown engine', author, options }
  }

  async isReady(): Promise<void> {
    this.send('isready')
    await this.waitFor((l) => l.trim() === 'readyok', READY_TIMEOUT_MS)
  }

  setOption(name: string, value: string | number | boolean): void {
    this.send(`setoption name ${name} value ${value}`)
  }

  async newGame(): Promise<void> {
    this.send('ucinewgame')
    await this.isReady()
  }

  async analyze(req: AnalyzeRequest): Promise<AnalyzeResult> {
    const infoByRank = new Map<number, { line: string; depth: number }>()
    let lastDepth = 0
    let lastNodes: number | undefined
    let lastTime: number | undefined

    if (req.startposMoves) {
      this.send(`position startpos${req.startposMoves.length ? ' moves ' + req.startposMoves.join(' ') : ''}`)
    } else {
      this.send(`position fen ${req.fen}`)
    }

    const goParts = ['go']
    if (req.limits.depth) goParts.push('depth', String(req.limits.depth))
    if (req.limits.nodes) goParts.push('nodes', String(req.limits.nodes))
    if (req.limits.moveTimeMs) goParts.push('movetime', String(req.limits.moveTimeMs))
    if (goParts.length === 1) goParts.push('depth', '14')
    this.send(goParts.join(' '))

    const bestmoveLine = await this.waitFor(
      (l) => l.startsWith('bestmove'),
      GO_HARD_TIMEOUT_MS,
      (l) => {
        if (!l.startsWith('info ') || !l.includes(' pv ')) return
        const depth = parseInt(/\bdepth (\d+)/.exec(l)?.[1] ?? '0')
        const rank = parseInt(/\bmultipv (\d+)/.exec(l)?.[1] ?? '1')
        const nodes = /\bnodes (\d+)/.exec(l)?.[1]
        const time = /\btime (\d+)/.exec(l)?.[1]
        if (nodes) lastNodes = parseInt(nodes)
        if (time) lastTime = parseInt(time)
        if (depth >= lastDepth) lastDepth = depth
        const prev = infoByRank.get(rank)
        if (!prev || depth >= prev.depth) infoByRank.set(rank, { line: l, depth })
      }
    )

    const bestmoveUci = /^bestmove (\S+)/.exec(bestmoveLine)?.[1] ?? null
    const multiPv: PvLine[] = []
    for (const [rank, { line }] of [...infoByRank.entries()].sort((a, b) => a[0] - b[0])) {
      const scoreCp = /\bscore cp (-?\d+)/.exec(line)?.[1]
      const scoreMate = /\bscore mate (-?\d+)/.exec(line)?.[1]
      const pvStr = / pv (.+)$/.exec(line)?.[1]
      if (!pvStr || (scoreCp === undefined && scoreMate === undefined)) continue
      const pvUci = pvStr.trim().split(/\s+/)
      const { sans } = uciLineToSan(req.fen, pvUci)
      multiPv.push({
        rank,
        moveUci: pvUci[0],
        moveSan: sans[0],
        score:
          scoreMate !== undefined
            ? { type: 'mate', value: parseInt(scoreMate), perspective: 'side-to-move' }
            : { type: 'cp', value: parseInt(scoreCp!), perspective: 'side-to-move' },
        pvUci,
        pvSan: sans
      })
    }
    // Engines occasionally emit bestmove without any scored info line
    if (multiPv.length === 0 && bestmoveUci && bestmoveUci !== '(none)') {
      const { sans } = uciLineToSan(req.fen, [bestmoveUci])
      multiPv.push({
        rank: 1,
        moveUci: bestmoveUci,
        moveSan: sans[0],
        score: { type: 'cp', value: 0, perspective: 'side-to-move' },
        pvUci: [bestmoveUci],
        pvSan: sans
      })
    }
    return { bestmoveUci, multiPv, depth: lastDepth || undefined, nodes: lastNodes, timeMs: lastTime }
  }

  stop(): void {
    try {
      this.send('stop')
    } catch {
      /* already dead */
    }
  }

  async quit(): Promise<void> {
    if (!this.proc || this.exited) return
    try {
      this.send('quit')
    } catch {
      /* ignore */
    }
    const proc = this.proc
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        proc.kill()
        resolve()
      }, 2000)
      proc.once('exit', () => {
        clearTimeout(timer)
        resolve()
      })
    })
    this.proc = null
  }

  kill(): void {
    this.proc?.kill()
    this.proc = null
  }
}

/** Convert a UCI move sequence starting from fen into SAN, stopping at the first illegal move. */
export function uciLineToSan(fen: string, uciMoves: string[]): { sans: string[]; legalCount: number } {
  const sans: string[] = []
  try {
    const chess = new Chess(fen)
    for (const uci of uciMoves) {
      const mv = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
      sans.push(mv.san)
    }
  } catch {
    /* stop at first illegal move */
  }
  return { sans, legalCount: sans.length }
}

/** Verify an engine executable: spawn, handshake, quit (06_ENGINE_PLUGIN_SPEC.md). */
export async function verifyEngine(
  executablePath: string
): Promise<{ name: string; author: string | null; options: UciOption[] }> {
  const engine = new UciEngine(executablePath)
  engine.start()
  try {
    return await engine.handshake()
  } finally {
    await engine.quit()
  }
}
