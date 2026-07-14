# Execution Plan — UX Fine-Tuning Pass 2 (2026-07-14)

Implementation-ready plan for the findings from the 2026-07-14 live review (app walked screen-by-screen
with real data: 197 imported games, 1 analyzed, 28 exercises, seeded lessons). Written for an agent
picking this up cold. Companion docs: `UX_IMPROVEMENT_PLAN.md` (the 2026-07-10 review — much of it is
now shipped) and `HANDOFF.md` (architecture).

---

## 0. Ground truth — verify before touching anything

**Already shipped — do NOT re-implement.** These were flagged in the old plan and are confirmed live
in the current build:

- User-identity fix + backfill (`src/main/identity.ts`, `identity:backfill` IPC)
- Accuracy per player (Games table + Review header), move-classification glyphs in move list
- Static eval bar beside the Review board fed from stored analysis ([Review.tsx:309](src/renderer/src/routes/Review.tsx))
- "Try it on the board" active-recall mode on the pre-mistake card ([Review.tsx:379](src/renderer/src/routes/Review.tsx))
- Prev/Next critical-moment buttons, autoplay, clickable eval graph with severity dots
- Bulk analyze + filters + search on Games; delete confirms on Games and Openings
- Exercise session: progress dots, disabled *Next* until attempted, end-of-session stats, sounds,
  "Practice anyway" when nothing is due, tag-filter chips, row-click to solve one exercise
- Today: per-day task completion (localStorage), "N of M done" chip, streak calendar,
  weakness rows clickable → tag-filtered Exercises (`navigate({name:'exercises', tag})`)
- Openings: repertoire grouped by `openingName`/`lineName` with per-group "Practice this line",
  sticky board preview of the selected node, keypress advance in practice (no forced timer)
- Onboarding wizard (`src/renderer/src/components/Onboarding.tsx`), PGN export (`games:exportPgn`)

**Build/verify commands:** `npm run typecheck` · `npm test` (build + 24-check smoke) · `npm run dev`.

**Live UI verification (used for this review, reuse it):** build, then launch
`npx electron . --remote-debugging-port=9223`, fetch targets from `http://127.0.0.1:9223/json`,
connect a WebSocket (global in Node 22), call `Page.captureScreenshot` / `Runtime.evaluate`.
Navigate by clicking sidebar buttons via `Runtime.evaluate`. Uses the real user DB at
`%APPDATA%/chess-mentor-studio` — read-only actions only (navigation, screenshots); don't delete
games or record exercise attempts against real data.

**Repo conventions:** `out/` is committed (run `npm run build` before committing). TS strict; no new
runtime deps without strong justification (current renderer deps: react, zustand, chess.js,
cm-chessboard). Never work directly on `main` — branch per phase.

---

## Phase 1 — Review screen correctness & readability (P0, ~1 day)

The money screen. All changes in [Review.tsx](src/renderer/src/routes/Review.tsx) unless noted.

### 1.1 Move counter shows plies as "Move"
`Review.tsx:341` renders `Move {currentPly}/{moves.length}` — those are plies (screenshot showed
"Move 27/59" while the mistake card correctly said "Move 14"). Change the label to
`Move {Math.ceil(currentPly / 2)} of {Math.ceil(moves.length / 2)}`; keep `currentPly` internally.
Also show side-to-move ("Move 14 · White to move" is a nice touch, optional).

### 1.2 Accuracy header: add %, name the user
`AccuracySummary` (Review.tsx:98) renders bare `63.0` / `59.7` under "White accuracy" without
indicating which side is the user. Render `63.4%`, and replace the labels with player names +
"(you)" based on `game.userColor`, e.g. **dream01gr (you)** / **NightGuy09**. Put the user's side
first. Same `%` fix in `accuracyCell()` in [Games.tsx:42](src/renderer/src/routes/Games.tsx).

### 1.3 "What the engine saw" is cryptic
Review.tsx:415-431 renders `Nc6 1.86 Nc6 Ne4 Na5 …` — unlabeled score, first move duplicated in
the PV, no move numbers, side-to-move perspective (so a winning-for-Black score shows positive).
Fix:
- Normalize score to **white perspective** with an explicit sign: `+1.86` / `−0.5` / `#4`
  (use `positionAnalysis.sideToMove`; same convention as `whiteCp()` at Review.tsx:24).
- Render the PV with move numbers starting from the current position (derive move number from
  `fen`'s fullmove field), and skip the duplicated first move: `14…Nc6 15.Ne4 Na5 …`.
- Make each PV row clickable: clicking previews the line — simplest robust version is a small
  "preview line" state that plays PV moves on the board with ◀ ▶ steppers and an "exit preview"
  button (chess.js from current fen; no DB involvement).

### 1.4 Layout: eval graph below the fold
At 1440×900 the eval graph is half cut off; the right column has dead space below the
critical-moments card. Restructure the middle column height budget so board + controls + graph fit
~800px viewport height: reduce board `maxWidth` 500→440 (Review.tsx:325), eval-bar height to match,
and cap the move-list card height to the board height. Acceptance: at a 1280×800 window, the whole
graph is visible without scrolling, with the header card present.

### 1.5 Severity glyph on the board square
The destination square gets only a colored frame (`lastMoveSeverity` in
[Board.tsx](src/renderer/src/components/Board.tsx)). Add a small circular badge with the glyph
(??/?/?!) in the square's top-right corner — WCAG 1.4.1 (color is currently the only signal on the
board). Implementation: absolutely-positioned overlay div computed from square coordinates
(cm-chessboard exposes square size via its DOM; the wrapper already computes board width) — avoid
fighting the Markers extension for this. Reuse `SEVERITY_GLYPH` from Review.tsx (move it to a shared
module, e.g. `src/renderer/src/severity.ts`, imported by both). A "✓ best" badge when the played
move matches PV1 is optional polish.

### 1.6 Eval-graph hover tooltip
Dots have `<title>` already; the line itself doesn't. Add a transparent hover-capture rect that
shows a positioned tooltip (`Move 14 · +1.9`) and a faint vertical hover line. SVG-only, no deps.

---

## Phase 2 — "Play it out" vs the engine (P0, the big feature, ~2–3 days)

Play any position against the configured engine at reduced strength. Infrastructure exists:
persistent-process pattern in [live-eval.ts](src/main/engines/live-eval.ts), UCI adapter in
[uci.ts](src/main/engines/uci.ts) (`UciEngine`, handshake, `setOption`, `waitForLine`).

### 2.1 Main process: `src/main/engines/play.ts`
Singleton `PlayVsEngine` class modeled on `LiveEvaluator`:
- `start(fen, userColor, strength)` — spawn `UciEngine` via the same engine-resolution logic as
  `LiveEvaluator.resolveEngineRecord()` (extract that into a shared helper). Configure strength:
  if engine options include `UCI_LimitStrength`/`UCI_Elo` set those (Stockfish ≥ 1320), else
  `Skill Level` 0–20; map a user-facing Elo slider (800–2500) to whichever the engine supports.
  Options are already detected at registration (`engines/store.ts` stores `optionsJson`).
  If it's the engine's turn after `start`, think immediately.
- `userMove(uci)` — validate turn, then `position fen … moves …`, `go movetime 800` (movetime,
  not depth, so weak levels stay fast), await `bestmove`, return `{ engineMoveUci, engineMoveSan }`.
  Maintain the move stack in the class (chess.js in main for SAN + game-over detection).
- `stop()` — quit the process. Auto-stop when live-eval starts if both would run (one engine
  process at a time is fine for v1 — document it).
- Game-over detection via chess.js after every half-move: return
  `{ over: true, result, reason }` (mate/stalemate/repetition/insufficient/50-move).
- IPC in [ipc.ts](src/main/ipc.ts) + [preload/index.ts](src/preload/index.ts) + `api.ts`:
  `play:start`, `play:move`, `play:stop`, `play:status`. Follow the existing typed-channel pattern.

### 2.2 Renderer: `PlayOut` component
Full-screen-ish modal or inline board swap (recommend: dedicated component rendered inside Review,
replacing the board area, with an "exit" button — no new route needed). Board interactive for the
user side; engine replies animate; sounds via existing [sound.ts](src/renderer/src/sound.ts); flip
follows `userColor`. Header: strength slider (only before first move), "Resign / Exit", and after
game over a result card: "You held the draw" / "Converted the win — well done" + "Play again" /
"Back to review".

### 2.3 Entry points (all one-liners once the component exists)
- Review mistake card (Review.tsx:389-413): button **"Play it out from here"** — starts from
  `fenBefore` of the mistake ply, user to move.
- Review "Critical moment ahead" card: same button after reveal.
- Exercise session completion screen (Exercises.tsx:66-93): "Play one of these out" is optional —
  skip for v1 if scope creeps.

Acceptance: from a Review mistake, one click gets a playable game vs engine at chosen strength;
illegal moves impossible; game-over detected and announced; exiting returns to Review at the same
ply; `npm test` still passes (add a smoke check that `play:start`+`play:stop` round-trips if an
engine is registered — skip gracefully when none).

---

## Phase 3 — Insights / Stats screen (P1, ~2 days)

New sidebar route "Insights". All data already in SQLite — no schema changes.

### 3.1 Main: `src/main/stats.ts` + `stats:overview` IPC
Single query-bundle returning:
- **Rating history**: per game where `user_color != 'unknown'`: date (`ended_at`), user rating
  (`white_rating` or `black_rating` by side), `time_class`. Renderer filters by speed.
- **Accuracy trend**: date + user-side accuracy for analyzed games.
- **Results split**: W/L/D counts overall and per `time_class`.
- **Openings table**: group by `eco_code` (+ `opening_name` when present): games, score %,
  avg user accuracy (analyzed only), most recent date. Top ~15 by count, both colors separately
  (needed by Phase 4 too).
- **Mistakes by phase**: from `mistakes` join `moves` on ply: opening = ply ≤ 20, endgame = last
  30% of game or ≤ 14 pieces (piece count from fen is simplest), else middlegame.

### 3.2 Renderer: `src/renderer/src/routes/Insights.tsx`
SVG charts in the `EvalGraph` style (no chart lib): rating line chart with time-class filter chips,
accuracy dots, W/L/D bar, openings table (clicking a row → Games filtered by that opening — extend
`GameFilters` with `eco`), mistakes-by-phase bars. Empty states point at import/analyze.
Register route in [store.ts](src/renderer/src/store.ts) `Route` union, [App.tsx](src/renderer/src/App.tsx)
switch, Sidebar NAV.

### 3.3 Today tie-in
Right "Progress" card: replace the static `1500→1800` with latest-rating-from-games when available
(fall back to `settings.ratingCurrent`) and a 10-game sparkline linking to Insights.

---

## Phase 4 — Openings intelligence (P1, ~1–2 days)

### 4.1 ECO code → readable name everywhere
Games table shows raw `D00`/`A45` ([Games.tsx:234](src/renderer/src/routes/Games.tsx) —
`openingName ?? ecoCode`; chess.com imports rarely fill `openingName`). Add
`src/shared/eco-names.ts`: a curated map of the ~120 most common ECO codes → family name
("D00 Queen's Pawn Game", "B20 Sicilian", …) plus letter-range fallbacks ("A45 → Indian Defence
family"). Helper `openingLabel(game): string` used by Games table, Review header, Insights.
Keep the raw ECO as a tooltip. Also: check `importers/chesscom.ts` — chess.com PGNs carry an
`ECOUrl` header whose slug is a readable name; parse it into `opening_name` at import when present,
and backfill existing rows once (`UPDATE games SET opening_name = … WHERE opening_name IS NULL`,
same one-shot-migration pattern as `identity.ts`).

### 4.2 "Your openings" panel
New section at top of Openings → My repertoire tab: from Phase 3's openings aggregation, show the
user's 5 most-played openings with score, e.g. *"Queen's Pawn Game — 31 games, 42% score"*, and
when a matching entry exists in `OPENINGS` ([shared/openings.ts](src/shared/openings.ts), match on
ECO prefix), a one-click **"Study this opening"** → jumps to the Library tab with it selected
(lift `openingId` state up in [Openings.tsx](src/renderer/src/routes/Openings.tsx) so the tab can be
driven). This connects games ↔ library, today completely disconnected.

### 4.3 Repertoire orphan cleanup
The "Other lines" group is a flat list of pre-labeling nodes (`openingName IS NULL`) — screenshot
showed "1. e5 / 2. Nc6 / 3. Bc5" as separate rows with no context. Two fixes:
- Render orphans with their **line path** ("1.e4 e5 2.Nf3 Nc6 …" derived by walking `parentId`
  to root — all nodes are in memory already) instead of bare move numbers, so rows are identifiable.
- One-shot backfill: for orphan roots, name the group from `eco-names` by replaying the line and
  probing `OPENINGS` sans prefixes; label remainder "From your games".
Note while investigating: under **As White** the table shows Black moves (e5, Nc6, Bc5) as "YOUR
MOVE" — decide whether these are legacy wrong-color rows (pre-identity-fix `addLineFromGame`
defaulted to white). If so the backfill should also flag/offer to delete color-mismatched nodes
(node is user's move iff `fenBefore` side-to-move matches `node.color`).

---

## Phase 5 — Session flow & feedback polish (P2, ~1–2 days)

### 5.1 Guided session chaining (Today)
"Start today's session" only opens task 1. Add `sessionQueue: PlanTask[]` + `sessionIndex` to the
zustand store; starting the session populates it. A slim banner (render in `App.tsx` above
`main-content` when a session is active): "Task 2 of 5 — Review 10 opening moves · Next →  ✕".
"Next" advances via the existing `openTask` switch logic (move it from Today.tsx into the store or
a shared helper). Completion celebration when the last task finishes (reuse `playSound('complete')`).
Task auto-completion detection already works via the live-plan diff — don't rebuild it.

### 5.2 Exercise session side panel
Session view is board-left, emptiness-right. Two-column layout: board left; right column with
prompt + hints (currently rendered by `PuzzleBoard` — read
[PuzzleBoard.tsx](src/renderer/src/components/PuzzleBoard.tsx) first; likely accept a
`renderSidePanel` prop or lift prompt/feedback rendering out), progress dots (move from above the
board), running tally ("3 solved · streak 2"), elapsed time, and after answering: explanation +
"Next →". Also move the give-away context "(you played Nb1 in the game)" out of the always-visible
prompt — reveal it with hint 1 or after the attempt (it's generated into `exercise.prompt` in
[exercises.ts](src/main/exercises.ts); split into `prompt` + `contextAfter` at generation, keep
old records working with a fallback).

### 5.3 Copy & list polish (bundle, half a day)
- **Weakness evidence** ([study-plan.ts:77-82](src/main/plan/study-plan.ts)): `~909 pawns total` is
  meaningless. Use per-mistake magnitude: `18 mistakes · ≈0.8 pawns each on average`.
- **Humanized due dates**: shared `formatDue(iso)` → "today" / "tomorrow" / "Jul 20" — use in
  Exercises table (Exercises.tsx:219) and repertoire tables (Openings.tsx:507).
- **Exercise titles** ([exercises.ts](src/main/exercises.ts)): all read "From your game vs X".
  Include phase + move: "Move 14 vs NightGuy09". Dedupe `tags` at generation (screenshot showed
  "endgame endgame") and dedupe defensively at render.
- **Games table sorting**: click-to-sort headers (date, result, mistakes, accuracy) — client-side
  sort state in Games.tsx is enough; add simple pagination or windowing above 200 rows (197 already
  render; keep it cheap — "Show more" pagination is fine, no virtualization dep).

### 5.4 Lessons progress & resume
[Lessons.tsx](src/renderer/src/routes/Lessons.tsx) renders course modules and the full library —
same lessons twice. Keep both but: per-module progress chip ("2/4 ✓" from `allProgress`), and in
[LessonPlayer.tsx](src/renderer/src/routes/LessonPlayer.tsx) resume at first incomplete step
(scroll + highlight; progress records exist via `lessons:progress:*`) plus a completion card with
"Next in course: …" (next `lessonRef` in the same module).

---

## Phase 6 — Setup friction & app-wide chrome (P2/P3, ~2 days)

### 6.1 Stockfish download helper (biggest onboarding cliff)
On Engines screen + onboarding step 3: **"Download Stockfish (recommended)"**.
- Main: `src/main/engines/download.ts`. Download the official Stockfish release for the platform
  (GitHub releases; pin a version + SHA-256 in code). Windows binaries ship as `.zip` — extraction
  needs a dependency (`yauzl` or `extract-zip`; main-process only, acceptable) or PowerShell
  `Expand-Archive` fallback (already on Windows; keep the code path per-platform).
- Verify checksum → place under `%APPDATA%/chess-mentor-studio/engines/` → run the existing
  `engines:add` handshake + trust prompt (do not bypass the trust flow).
- Progress via the jobs queue (`jobs/queue.ts`) so the sidebar progress bar works for free.
- Failure = clear error + link to manual instructions (current UI).

### 6.2 Sidebar: SVG icons + due badge
[Sidebar.tsx:6-15](src/renderer/src/components/Sidebar.tsx) uses mixed emoji (☀ ♟ ⇶ 📖 🧩 ✦ ⚙ ⚒),
inconsistent across fonts. Replace with a tiny inline-SVG icon set (`src/renderer/src/icons.tsx`,
Lucide-style 18px paths, ~8 icons, no dependency). Add a count badge on Exercises (due count;
refresh on `exercises:changed`) and on Today (remaining tasks).

### 6.3 Settings auto-save
[Settings.tsx](src/renderer/src/routes/Settings.tsx) is draft+Save; navigating away discards
silently and the board-theme preview says it isn't applied. Save each control on change/blur
(`api.settings.set` takes a partial patch). Debounce text inputs (~600ms). Remove the Save button
and caveat copy; keep an unobtrusive "Saved ✓" flash. Username change already triggers the backfill
prompt — preserve that behavior when moving to auto-save (trigger on blur, not per keystroke).

### 6.4 Keyboard shortcuts overlay
Global `?` handler (App.tsx level, ignore when typing in inputs): modal listing shortcuts —
Review: ←/→ move, Home/End, (add) `[`/`]` prev/next mistake + Space autoplay; Openings practice:
Enter/Space advance. Add the missing Review keys while at it (extend handler at Review.tsx:145).

### 6.5 Small board QoL
"Copy FEN" (and "Copy PGN to here") in a right-click menu or small button row on the Review board.
Clipboard via `navigator.clipboard.writeText` (renderer is sandboxed but clipboard-write works in
Electron with user gesture; if not, add a `clipboard:write` IPC using Electron's clipboard module).

---

## Suggested order & PR breakdown

| PR | Content | Phase | Size |
|----|---------|-------|------|
| 1 | Review readability: 1.1–1.3, 1.6 + 5.3 copy fixes | P0 | S |
| 2 | Review layout + board glyph badge: 1.4, 1.5 | P0 | M |
| 3 | Play it out: 2.1–2.3 | P0 | L |
| 4 | ECO names + backfill + Games sorting: 4.1, 5.3(sort) | P1 | M |
| 5 | Insights screen + Today sparkline: 3.1–3.3 | P1 | L |
| 6 | Your openings + orphan repertoire cleanup: 4.2, 4.3 | P1 | M |
| 7 | Session flow: 5.1, 5.2 | P2 | M |
| 8 | Lessons progress/resume: 5.4 | P2 | S |
| 9 | Stockfish download: 6.1 | P2 | M |
| 10 | Chrome polish: 6.2–6.5 | P3 | M |

Each PR: branch from `main`, `npm run typecheck` + `npm test` green, `npm run build` (out/ is
committed), then a live CDP screenshot pass of the affected screens (method in §0). Update
`HANDOFF.md`'s "Done & verified" and this file's checkboxes as phases land.

## Acceptance snapshot (definition of "pass complete")

- Review at 1280×800: summary, board with glyph badges, move list, graph — all visible, no scroll;
  engine lines read like chess text (`+1.9 · 14…Nc6 15.Ne4 …`); counter says "Move 14 of 30".
- Any mistake position is playable vs Stockfish at a chosen strength within one click.
- Games table shows opening names, sorts by column, accuracy has %.
- Insights shows a real rating trend from imported games with zero manual input.
- New user path: onboarding → one-click engine download → import → analyze without leaving the app.
- No table in the app shows a raw ISO date or a raw ECO code without a name.
