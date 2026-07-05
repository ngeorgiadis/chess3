# 04 — Technical Architecture

## Architecture summary

Chess Mentor Studio is a local-first Electron desktop app.

Recommended stack:

- Electron main process for OS integration, file access, UCI engine processes, local jobs.
- Renderer: React + TypeScript.
- UI: component system with chessboard canvas/SVG component.
- State: Zustand or Redux Toolkit for client state.
- Storage: SQLite via main process only.
- Background jobs: local queue in main process.
- Chess logic: chess.js or equivalent for legal moves and PGN parsing, plus a stronger parser for PGN edge cases if needed.
- Engine protocol: custom UCI adapter using Node child processes.
- AI provider adapters: OpenAI-compatible, local HTTP model, and manual/no-AI mode.

## Process model

### Main process responsibilities

- App lifecycle.
- Secure IPC registration.
- SQLite database access.
- File system access.
- Engine child process management.
- Import HTTP requests.
- Background analysis queue.
- AI provider calls.
- Schema validation.
- Export/import local backup.

### Renderer process responsibilities

- UI rendering.
- Board interaction.
- Local client state.
- Requesting actions through typed preload API.
- Never directly calling Node APIs.

### Preload responsibilities

Expose a minimal typed API through `contextBridge`:

- `games.importFromChessCom(args)`
- `games.importFromLichess(args)`
- `games.importPgn(args)`
- `games.list(filters)`
- `analysis.queue(gameIds, profileId)`
- `analysis.cancel(jobId)`
- `engines.add(path)`
- `lessons.validate(json)`
- `lessons.publish(json)`
- `ai.generateLesson(args)`

No raw `ipcRenderer` exposure.

## Security requirements

- `nodeIntegration: false`.
- `contextIsolation: true`.
- `sandbox: true` where possible.
- Do not disable `webSecurity`.
- Strict Content Security Policy.
- No remote content in privileged renderer.
- Never execute arbitrary code from lesson JSON.
- Treat all imported PGN/comments/source text as untrusted.
- Sanitize Markdown before rendering.
- Engine executables are user-selected local binaries; warn users before adding unknown executables.
- HTTP importers must use allowlisted hosts for platform URL imports.

## Local database

Use SQLite with migrations.

Suggested libraries:

- `better-sqlite3` in main process for simplicity.
- Drizzle ORM or Kysely for typed queries.
- FTS5 for search across games, notes, lessons.

## Background job queue

Jobs:

- Import games.
- Parse PGN.
- Analyze game.
- Generate exercises.
- Validate lesson.
- Generate lesson with AI.
- Export backup.

Job fields:

- `id`
- `type`
- `status`
- `priority`
- `payload_json`
- `progress_current`
- `progress_total`
- `created_at`
- `started_at`
- `completed_at`
- `error_json`

Job behavior:

- Persist queue to DB.
- Resume unfinished safe jobs on restart.
- Cancel long-running engine analysis.
- Emit progress events to renderer.

## Module boundaries

```
src/
  main/
    app.ts
    ipc/
    db/
    jobs/
    importers/
      chesscom.ts
      lichess.ts
      pgn.ts
    engines/
      uci-process.ts
      analysis-service.ts
    ai/
      providers/
      lesson-agent.ts
      validators.ts
    security/
  preload/
    index.ts
    api-types.ts
  renderer/
    app/
    components/
    routes/
    chessboard/
    lesson-player/
    review/
    openings/
  shared/
    types/
    schemas/
    chess/
```

## IPC design

Use request/response for commands and event streams for progress.

Command example:

```ts
type ImportChessComArgs = {
  username: string;
  fromMonth?: string; // YYYY-MM
  toMonth?: string;   // YYYY-MM
  timeClasses?: Array<'rapid' | 'blitz' | 'bullet' | 'daily'>;
  analyzeAfterImport?: boolean;
};
```

Events:

- `job:created`
- `job:progress`
- `job:completed`
- `job:failed`
- `analysis:position-completed`
- `engine:status`

## Data flow: game import

1. Renderer sends import command.
2. Main process validates platform and URL.
3. Main process creates import job.
4. Importer fetches source sequentially and respectfully.
5. Parser normalizes PGN and metadata.
6. Deduper checks existing records.
7. DB transaction stores games.
8. Optional analysis jobs are queued.
9. Renderer receives progress events.

## Data flow: engine analysis

1. User queues games.
2. Analysis service selects engine profile.
3. For each game, positions are generated from legal move history.
4. Engine evaluates selected positions.
5. Analysis service computes eval loss and criticality.
6. Mistake classifier labels moments.
7. Exercise generator creates training positions.
8. Results are stored with full provenance.

## AI architecture

### Provider interface

```ts
interface AiProvider {
  id: string;
  displayName: string;
  generateJson<T>(args: {
    system: string;
    user: string;
    schemaName: string;
    jsonSchema: object;
    temperature?: number;
  }): Promise<T>;
}
```

### Agent stages

1. Extract concepts.
2. Build outline.
3. Generate lesson JSON.
4. Validate schema.
5. Validate chess legality.
6. Verify claims with engine where applicable.
7. Render preview.
8. Publish.

## Local-first storage and backup

User data directory:

```
Chess Mentor Studio/
  app.db
  engines/
  backups/
  exports/
  lessons/
  logs/
```

Backup format:

- SQLite dump or compressed app bundle.
- Export user-created lessons as JSON.
- Export games as PGN.
- Export analysis as JSONL.

## Performance requirements

- Import 500 games without renderer freeze.
- Stream Lichess NDJSON line-by-line.
- Parse PGN in worker/job context, not UI thread.
- Engine analysis should update progress after each position.
- Board navigation should feel instant for games under 150 moves.

## Error handling

Error types:

- Import URL invalid.
- Platform user not found.
- Rate limited.
- Network failure.
- PGN parse failure.
- Engine handshake failure.
- Engine timeout.
- AI schema validation failure.
- Lesson chess validation failure.

Each error should include:

- Human message.
- Technical detail.
- Suggested action.
- Retryable boolean.

## Observability

Local logs only by default:

- Import logs.
- Engine process logs.
- AI validation logs.
- Job failures.

Privacy:

- Do not send games to AI provider unless user explicitly asks for AI analysis/generation.
- Show which data will be sent before AI call.
- Allow local-only mode.
