# HANDOFF — Chess Mentor Studio

Electron desktop app implementing `chess_training_app_specs/` (v1 scope). Status: **built, all checks passing**.

## State

- Stack: Electron 37 + React 18 + TS + Zustand + chess.js + Ajv + cm-chessboard. DB: `node:sqlite` (no native deps).
- Structure: `src/main` (DB/migrations, job queue, importers, UCI engine + analysis + live eval, lesson validation/store, AI agent, study plan), `src/preload` (typed contextBridge, no raw ipcRenderer), `src/renderer` (9 screens; board = cm-chessboard React wrapper), `src/shared` (types, JSON schemas, openings library).
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

## Commands

```
npm run dev / npm run build && npx electron . / npm test / npm run typecheck
```

## Not done / next candidates

- **Untested live**: AI generation (no API key). Engine analysis + live eval now verified live (Stockfish 17 registered on this machine).
- No packaging config (electron-builder) — app runs via `npx electron .` only.
- Board: no keyboard move entry; no blunder heatmap. Live eval toggle is session-only (off after restart) by design.
- Engine profiles editable only via default set; no benchmark UI. FTS5 search not wired.
- Importers: Chess.com single-game URL unsupported by design (public API limitation) — month import instead.
- No git repo initialized.
