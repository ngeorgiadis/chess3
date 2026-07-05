import { app, BrowserWindow, dialog, session, shell } from 'electron'
import path from 'node:path'
import fs from 'node:fs'
import { initDb } from './db'
import { registerIpc, queueAnalysis } from './ipc'
import { registerJobHandler, recoverJobs, tick } from './jobs/queue'
import { analyzeGameJob } from './engines/analysis'
import { importChessCom } from './importers/chesscom'
import { importLichess, importLichessGame } from './importers/lichess'
import { importPgnText } from './importers/pgn'
import { seedContent } from './lessons/store'
import type { ImportChessComArgs, ImportLichessArgs, ImportPgnArgs, ImportResult } from '@shared/types'
import type { JobContext } from './jobs/queue'

const isDev = !app.isPackaged
const isSmokeTest = process.argv.includes('--smoke-test')

if (isSmokeTest) {
  app.setPath('userData', path.join(app.getPath('temp'), `cms-smoke-${Date.now()}`))
}

function resourcesDir(): string {
  return isDev ? path.join(app.getAppPath(), 'resources') : path.join(process.resourcesPath, 'resources')
}

function registerJobHandlers(): void {
  registerJobHandler('analyze-game', analyzeGameJob)
  registerJobHandler('import', async (payload, ctx: JobContext) => {
    const p = payload as {
      kind: 'chesscom' | 'lichess' | 'lichess-game' | 'pgn-file'
      args: ImportChessComArgs & ImportLichessArgs & ImportPgnArgs & { gameId?: string }
    }
    let result: ImportResult
    switch (p.kind) {
      case 'chesscom':
        result = await importChessCom(p.args, ctx)
        break
      case 'lichess':
        result = await importLichess(p.args, ctx)
        break
      case 'lichess-game':
        result = await importLichessGame(p.args.gameId!)
        break
      case 'pgn-file': {
        const text = fs.readFileSync(p.args.filePath!, 'utf8')
        result = importPgnText(text, 'pgn-file', (c, t) => ctx.setProgress(c, t, `Parsing game ${c}/${t}`))
        break
      }
      default:
        throw new Error(`Unknown import kind: ${p.kind}`)
    }
    if (p.args.analyzeAfterImport && result.createdGameIds.length > 0) {
      try {
        queueAnalysis(result.createdGameIds)
      } catch {
        // no engine configured — import still succeeds
      }
    }
    return result
  })
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#16181d',
    title: 'Chess Mentor Studio',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true
    }
  })

  // Open external links in the OS browser, never in the privileged renderer
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) void shell.openExternal(url)
    return { action: 'deny' }
  })

  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    void win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  // Strict CSP for all renderer content (04_TECH_ARCHITECTURE.md security)
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const devConnect = isDev ? ' ws://localhost:* http://localhost:*' : ''
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'${devConnect}; object-src 'none'; base-uri 'self'`
        ]
      }
    })
  })

  const dataDir = app.getPath('userData')
  initDb(dataDir)
  for (const dir of ['engines', 'backups', 'exports', 'lessons', 'logs']) {
    fs.mkdirSync(path.join(dataDir, dir), { recursive: true })
  }
  seedContent(resourcesDir())
  registerIpc()
  registerJobHandlers()
  recoverJobs()
  void tick()

  if (isSmokeTest) {
    void import('./smoke').then(async ({ runSmokeTest }) => {
      const ok = await runSmokeTest().catch((e) => {
        console.error('Smoke test crashed:', e)
        return false
      })
      app.exit(ok ? 0 : 1)
    })
    return
  }

  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).catch((e: Error) => {
  console.error('Fatal startup error:', e)
  dialog.showErrorBox('Chess Mentor Studio failed to start', e.stack ?? e.message)
  app.exit(1)
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('will-quit', () => {
  void import('./engines/live-eval').then(({ liveEval }) => liveEval.shutdown())
})
