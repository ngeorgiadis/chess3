# HANDOFF — Chess Mentor Studio

Electron desktop app implementing `chess_training_app_specs/` (v1 scope). Status: **built, all checks passing**.

## State

- Stack: Electron 37 + React 18 + TS + Zustand + chess.js + Ajv + cm-chessboard. DB: `node:sqlite` (no native deps).
- Structure: `src/main` (DB/migrations, job queue, importers, UCI engine + analysis + live eval + play-vs-engine, lesson validation/store, AI agent, study plan, stats), `src/preload` (typed contextBridge, no raw ipcRenderer), `src/renderer` (11 screens; board = cm-chessboard React wrapper), `src/shared` (types, JSON schemas, openings library, ECO name lookup).
- Seeds in `resources/seed/` (example lesson + course) auto-published on first run.
- Data dir: `%APPDATA%/chess-mentor-studio`. Incompatible pre-existing app.db is auto-backed-up as `.bak` on startup.

## Done & verified

- PGN/Chess.com/Lichess importers with dedup; live Lichess single-game import tested against real API. ✅
- Persistent job queue: progress events, cancel, restart recovery. ✅
- UCI adapter (handshake, MultiPV, timeouts) + mistake classifier (spec thresholds) + exercise generator (SM-2). ✅
- Lesson schema + chess-legality validation; lesson player; AI Studio (outline→generate→validate→publish, OpenAI-compatible/local/manual). ✅
- Opening repertoire w/ spaced repetition; Today plan; Review screen w/ eval graph. Practice only quizzes positions where the user is to move (`dueNodes`/`countDueNodes` filter by side-to-move; opponent nodes are context only): due items are line-ordered, the prompt says “Opponent played X”, and correct moves show on the board before auto-advancing. ✅
- Board is cm-chessboard (`src/renderer/src/components/Board.tsx` wrapper, same controlled-props API): SVG pieces, drag + click-click, legal-move markers, promotion dialog (no more auto-queen), Markers + Arrows + RightClickAnnotator extensions (right-click = green circle/arrow, Alt = blue, Shift = red; annotations are per-position, cleared on fen change). Arrow sources are type-scoped: prop arrows, user annotations, engine arrow, and critical-move frames never clear each other. Every full-size board has a flip control (`allowFlip`, “⇵ Flip” button below the board); Review marks critical moves with severity-colored frames (`lastMoveSeverity`) and, after “Compare with what happened”, draws red (played) vs green (better) arrows. Sprites injected from bundled raw SVG (`cm-chessboard-sprite` divs) so file:// prod works; type shim in `cm-chessboard.d.ts`. ✅
- Live engine eval (`src/main/engines/live-eval.ts`): persistent UCI process, sidebar on/off switch, follows whatever board is visible (boards report fen via `useEvalTarget`; previews opt out with `evalTarget={false}`), streams `engine:eval` events (MultiPV 2, depth cap 24), and draws the best move on the board as a teal `.arrow-engine` arrow. Verified live with Stockfish 17 via CDP. ✅
- Settings → Appearance: board color scheme (6 cm-chessboard themes) + piece set (standard/staunty) with live preview; stored as `boardTheme`/`pieceSet`. ✅
- Openings library (`src/shared/openings.ts`): 13 openings / 31 validated lines, browsable in Openings → “Openings library” tab, one-click add to White/Black repertoire (`repertoire:addOpeningLine`, dedup-safe). ✅
- `npm test` = build + 24-check smoke test (`electron . --smoke-test`, temp DB) — all pass. Typecheck clean. UI verified live via CDP (board render, click-move, live eval, review, settings preview; no console errors).

- `npm run dev` works: the CSP in `src/main/index.ts` allows `'unsafe-inline'` scripts **in dev only** (the react-refresh preamble @vitejs/plugin-react injects); production CSP stays `script-src 'self'`.

### UX fine-tuning pass (2026-07-14, branch `ux-pass-2`, see `EXECUTION_PLAN.md`)

- Review screen: move counter shows chess move numbers ("Move 14 of 30") not plies; accuracy header shows `%` + player names + "(you)"; engine PV lines formatted white-perspective with move numbers and are click-to-preview on the board (step controls); severity glyph badge (??/?/?!) on the board's destination square, not just a color frame; eval-graph hover tooltip; "Copy FEN" button (via `clipboard:write` IPC — `navigator.clipboard.writeText` unreliably rejects with "Document is not focused" right after a click in Electron). ✅
- **Play it out** (`src/main/engines/play.ts`, `PlayVsEngine` singleton): play any position against the configured engine at a chosen strength (`UCI_Elo`/`Skill Level` mapped from an 800–2500 Elo target), full game-over detection. IPC: `play:start/move/stop/status`. Entry points: Review's mistake/critical-moment cards ("Play it out from here"). Engine resolution shared with live-eval via `resolveDefaultEngineRecord()` (`engines/store.ts`). One game at a time; starting a game disables live-eval to avoid two engine processes contending. ✅
- **Insights screen** (`src/main/stats.ts`, `stats:overview` IPC, `Insights.tsx`): rating trend (from imported game headers, filterable by time class), accuracy trend, W/D/L results overall + per time class, per-opening performance (top 15 by frequency, click-through to Games filtered by that opening), mistakes by game phase (opening/middlegame/endgame). Today's rating goal card now shows the latest real game rating + sparkline instead of a static number. ✅
- **ECO → name mapping** (`src/shared/eco-names.ts`, `openingLabel()`): no screen shows a bare code like "D00" anymore — Games table, Review header, Insights all resolve to a readable family name (exact hit from the openings library, else standard ECO volume range). Openings screen has a "Your openings" panel with "Study this opening" jumping to the matching library entry.
- **Repertoire cleanup**: opponent-reply context nodes (stored for tree structure) are now visually distinguished from the user's own prep moves ("(opponent)", dimmed, no status/priority) instead of both being labeled "your move". One-shot `backfillRepertoireLabels()` (runs at startup) names legacy unlabeled lines from their source game's opening.
- **Guided session chaining**: Today's "Start today's session" populates a session queue (`store.ts`); a banner ("Task N of M — Title · Next → · ✕") persists across screens instead of dead-ending after the first task. Task→route mapping shared via `taskNav.ts`.
- Exercise sessions: running streak + solved count + live elapsed timer; the "(you played X)" spoiler in puzzle prompts is now hidden until a hint is used or the position is attempted (`PuzzleBoard.tsx`, regex-parsed, works for pre-existing records too).
- Lessons: per-module progress chips, resume-at-first-incomplete-step (was always restart-from-top), completion card with "Next lesson →" chaining within the same course module.
- Settings auto-saves on every change (debounced for text, immediate for selects/checkboxes) — no more explicit Save button.
- Global `?` keyboard-shortcuts overlay; Review's `[`/`]` (prev/next critical moment) and Space (autoplay) are now real keybindings, not button-only.
- **Not attempted this pass** (documented as follow-up, not half-implemented): one-click Stockfish download/install, and the SVG icon set replacing mixed emoji/unicode nav icons.

### AI commentary agents (2026-07-14, branch `ux-pass-2`, see `AI_COMMENTARY_AGENTS_PROPOSAL.md`)

Implements phases 1–3 of the proposal: the LLM narrates engine facts, it never computes chess itself, and
every output is verified before display. `src/main/ai/`:

- `grounding.ts` — builds a `PositionDossier` (FEN, recent moves, engine MultiPV lines in SAN, mistake info,
  players) from stored `engine_analysis`/`mistakes` — the only source of chess facts agents may draw from.
- `verify.ts` (A4) — deterministic validator: every SAN-shaped token in a model's output must either come
  from the dossier or be independently legal from its FEN; bare square mentions ("e4") are exempted as
  ambiguous prose, not move claims. Also flags "White/Black is winning" claims that contradict the engine's
  own eval sign. One repair round on failure; the whole feature refuses to display unverified chess claims.
- `explain-agent.ts` (A1) — "Explain this position" button in Review's coaching panel; cached per
  (game, ply, model) in the new `annotations` table (kind `explain`).
- `annotate-agent.ts` (A2) — `annotate-game` job: selects ~14 key positions (worst mistakes + phase
  transitions), one batched LLM call for a whole-game narrative + per-move comments, verified per-item; a
  move comment that fails verification falls back to the existing deterministic mistake text rather than
  being dropped silently only when a template exists, else it's omitted. Narrative + move rows: `annotations`
  table (kind `narrative`/`move`). Review shows a "Coach's summary" card (narrative) and move-level notes.
- `coach-agent.ts` (A3) — cross-game diagnosis: weakness tags/evidence/impact/linked-exercise-IDs are computed
  **deterministically** from real mistakes across the last 20 analyzed games; the LLM only picks which
  weaknesses matter, writes prose (`summary`, `recommendedAction`), and builds a 7-day plan — it can never
  invent evidence or game references since those aren't its to write. Stored in `coach_reports`; surfaced as
  a "Coach report" card in Insights.
- IPC: `ai:explainPosition`, `ai:annotateGame` (queues the job, dedups against an in-flight one), `ai:annotationsForGame`,
  `ai:coachReport:generate`/`:latest`. New `annotations:changed` app event.
- DB migration v3: `annotations`, `coach_reports` tables.
- `provider.ts` gained `parseJsonLoose()` (shared tolerant JSON parser, also now used by `lesson-agent.ts`).
- A5 (interactive chat with engine tools) intentionally **not attempted** — parked per the proposal until
  1–3 prove out, since it needs tool-calling support the provider doesn't have yet.

**Live-verified** (this machine has a local AI provider configured — `local-http` / `gemma4` — unlike the
lesson agent, which was previously untested live): drove the built app via CDP
(`--remote-debugging-port`), clicked "Explain this position" and called `ai:coachReport:generate` and
`ai:annotateGame` directly against real data (thousands of games, 4 analyzed). All three reached the network
call cleanly — dossier building, key-position selection, and the deterministic weakness aggregation all ran
correctly against real data with zero console errors — and failed there with a clean, surfaced `AI provider
error 404` because this machine's configured `baseUrl` (`http://localhost:11434`) is missing Ollama's `/v1`
suffix (pre-existing local environment issue, same as `ai:outline`/`ai:generateLesson` would hit — not fixed,
since it's a user setting change outside this task's scope). The `annotate-game` job also verified the
job-queue failure path: proper `retryable: true` error stored, no stuck state. 6 new deterministic smoke
checks added for `verify.ts` (`npm test`), all passing; typecheck clean.

## Commands

```
npm run dev / npm run build && npx electron . / npm test / npm run typecheck
```

## Not done / next candidates

- **AI generation**: reaches the configured provider and handles success/failure cleanly (verified live for
  lesson generation and the new commentary agents — see "AI commentary agents" above), but no successful
  generation has been observed end-to-end on this machine since the local Ollama `baseUrl` is missing `/v1`.
  Engine analysis + live eval verified live (Stockfish 17 registered on this machine).
- A5 (interactive "why not Nf5?" chat with engine tools) not built — parked per `AI_COMMENTARY_AGENTS_PROPOSAL.md`.
- No packaging config (electron-builder) — app runs via `npx electron .` only.
- Board: no keyboard move entry; no blunder heatmap. Live eval toggle is session-only (off after restart) by design.
- Engine profiles editable only via default set; no benchmark UI. FTS5 search not wired.
- Importers: Chess.com single-game URL unsupported by design (public API limitation) — month import instead.
- No git repo initialized.
