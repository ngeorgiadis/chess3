# UX Review & Improvement Plan — Chess Mentor Studio

*Reviewed 2026-07-10 by walking every screen of the running app (live data: ~40 imported Chess.com games, 2 analyzed, seeded lessons), reviewing all renderer code, and comparing against established practice — Nielsen's usability heuristics and the patterns that make chess.com's Game Review / Puzzles / Lessons loops effective and fun.*

**Goal of this iteration:** an app that is really easy to use, genuinely helpful for training and study, and fun.

---

## 0. Verdict in one paragraph

The training loop design (import → analyze → mistakes become exercises → daily plan) is genuinely good and in places *better* pedagogy than chess.com (e.g. "Critical moment ahead — find your candidate moves before revealing"). What's missing is (a) one identity bug that silently poisons the whole experience, (b) the feedback layer that makes chess.com feel rewarding — accuracy scores, move classification glyphs, sounds, celebration, visible progress — and (c) an onboarding path; today the user must discover Settings → Import → Engines in the right order on their own.

---

## 1. Critical — fix before anything else

### 1.1 User identity is silently lost (`user_color = 'unknown'`) — 🔴
**Verified live:** every game in the current DB has `user_color: 'unknown'` even though `chesscomUsername = dream01gr` is saved in Settings.

- `detectUserColor()` ([pgn.ts:113](src/main/importers/pgn.ts:113)) reads settings *at import time*. Games imported before the username was saved (or by typing a username into the Import modal, which never saves it back) get `unknown` forever. Nothing backfills.
- Cascade of breakage, all observed live:
  - Games list shows raw `1-0` badges instead of **Win/Loss** (perspective unknown).
  - Review board is not oriented to the user's side.
  - Mistake classifier ([analysis.ts:279](src/main/engines/analysis.ts:279)) classifies **both players'** mistakes as "yours" → 17 "critical moments" in one game, wrong weakness diagnosis on Today, wrong exercises.
  - Exercise titles read "From your game **vs dream01gr**" — the app treats the user as their own opponent.
  - "Add opening line to repertoire" defaults to white ([repertoire.ts:88](src/main/repertoire.ts:88)).

**Fix (three parts):**
1. When importing by username, that username **is** the identity — pass it into `insertGame` and match against it directly (don't rely on settings).
2. When the import modal is used with a username not yet in Settings, save it back (or ask: "Save dream01gr as your Chess.com username?").
3. Backfill: on settings-username change (and once on migration), re-run detection over existing games: `UPDATE games SET user_color = … WHERE user_color = 'unknown'`, and offer to re-classify affected analyses.

### 1.2 Exercises can be skipped without recording an attempt — 🔴
In a session, **Next puzzle →** is always enabled ([Exercises.tsx:63](src/renderer/src/routes/Exercises.tsx:63)). Skipping records nothing, so SM-2 scheduling silently degrades and "Session complete: X of Y solved" lies. Fix: disable *Next* until solved/failed, or record a skip as a failed attempt.

### 1.3 Destructive actions have no confirmation — 🔴
- Delete game ([Games.tsx:228](src/renderer/src/routes/Games.tsx:228)) — one click, no undo, deletes analyses/exercise provenance with it.
- Delete repertoire node ([Openings.tsx:456](src/renderer/src/routes/Openings.tsx:456)) — one misclick on a tiny ✕ in a table row.
- Clicking the modal backdrop closes the Import modal and discards form state ([ImportModal.tsx:167](src/renderer/src/components/ImportModal.tsx:167)).

Fix: confirm dialogs (or better, toast-with-Undo), and only close modal on explicit Close / Esc when not busy. *(Heuristic: error prevention, user control.)*

---

## 2. Screen-by-screen findings

Severity: 🔴 high · 🟡 moderate · 🟢 minor/polish

### Today (dashboard)
| Finding | Sev | Recommendation |
|---|---|---|
| Plan tasks never get checked off; finishing exercises and returning shows the same list. No sense of accomplishment — the #1 motivator chess.com nails. | 🔴 | Persist per-day task completion; strike through + ✓ animation; show "2 of 5 done" progress ring on the card and in the sidebar nav item. |
| "Start today's session" opens only the first task; user must come back and click each one. | 🟡 | Guided session mode: complete a task → auto-offer the next ("Next: Review 10 opening moves →"), with a small session progress header. |
| Weakness list: "1 mistakes costing ~1 pawns total" (grammar), "~609 pawns total" (meaningless magnitude), evidence text right-aligned far from its tag. | 🟡 | Pluralize; show *avg centipawn loss per game* or "15 mistakes across 12 games"; left-align evidence next to the tag; make each row clickable → filtered exercise session for that theme. |
| Streak is a bare number; no history, no daily goal. | 🟡 | Streak calendar (last 4 weeks of dots) + configurable daily goal ("15 min/day"), like chess.com's coins/streak UI. |
| Rating goal `1500→1800` is static aspiration, never updates. | 🟢 | Let the user log their current rating (or pull it from the platform API at import) and show a mini trend line. |

### Games
| Finding | Sev | Recommendation |
|---|---|---|
| No accuracy % per game — chess.com's single most-looked-at number. Data to approximate it (per-move eval deltas) already exists. | 🔴 | Compute accuracy per player from analysis (standard CAPS-like mapping from avg centipawn loss) and show it in the table + review header. |
| No bulk analyze ("Analyze all 38 unanalyzed"). Users import 100 games and face 100 clicks. | 🔴 | "Analyze all" / multi-select checkboxes; the queue already supports batches (`api.analysis.queue([ids])`). |
| No sortable columns, no pagination/virtualization; large imports will scroll forever. | 🟡 | Click-to-sort headers (date, result, mistakes) + windowed list or pagination at >200 rows. |
| Mistake count badge is undifferentiated. | 🟢 | Show mini severity dots (■ blunders ■ mistakes) like chess.com's summary. |
| Row click selects, but opening a game needs the small Review button. | 🟢 | Double-click / Enter opens review; row click keeps preview. |

### Review (the core screen)
| Finding | Sev | Recommendation |
|---|---|---|
| No move classification glyphs. Moves are tinted by CSS class only — invisible to color-blind users and much weaker than chess.com's ??/?/?!/!/★ badges on the move list **and on the board square**. | 🔴 | Add glyph badges (??, ?, ?!, and "✓ best" when matching PV1) in the move list, and a small badge on the destination square (extend the existing severity-frame code in [Board.tsx](src/renderer/src/components/Board.tsx)). |
| No accuracy/summary header. Chess.com opens Game Review with "White 84.2 / Black 67.9, 1 blunder, 3 mistakes…" — orientation before detail. | 🔴 | Summary card at top: accuracy both sides, mistake counts by severity, opening name, "your worst moment" shortcut. |
| Eval graph is a 90px hairline; no white/black area fill, no blunder markers, no hover tooltip. | 🟡 | Bigger (140px) filled area chart (white above / black below midline), severity-colored dots at mistakes (clickable), hover shows move + eval. |
| No Next/Prev mistake navigation — the user must scan the Critical moments list. | 🟡 | `↑/↓`-style "Previous / Next critical moment" buttons next to the ply controls + keyboard keys (chess.com: arrow keys jump between key moments in review). |
| Eval bar next to the board only exists via the hidden sidebar "Live engine" toggle; stored analysis is not used for it. | 🟡 | Always render an eval bar beside the board fed from stored `analyses` (no engine needed); live engine only refines it. |
| "ply 0/58" is jargon. | 🟢 | "Move 12 of 29" (+ keep plies internally). |
| Keyboard nav (←/→/Home/End) exists but is undiscoverable. | 🟢 | Tooltip on controls + a `?` shortcuts overlay. |
| No autoplay, no move sounds. | 🟡 | ▶ autoplay at 1 move/s; sounds (see §3). |
| "Retry the mistake" is indirect (Create exercise → go to Exercises). | 🟡 | Inline "Try the better move" on the mistake card: board becomes interactive at the position before, validates against `betterMoveUci` — the code for this already exists in `PuzzleBoard`. |

### Exercises
| Finding | Sev | Recommendation |
|---|---|---|
| Session layout: board + a mostly empty right half; no running score, no streak, no timer. | 🟡 | Session panel: progress bar, ✓/✗ history dots, current streak; end screen with stats + "Review the ones you missed". |
| Dead end when nothing is due ("Start session" disabled). Chess.com never blocks you from puzzles. | 🔴 | "Practice anyway" (review-ahead pulls the nearest-due cards; SM-2 handles early reviews fine). |
| No filters (tag/difficulty/game) in the list; no way to train a specific weakness. | 🟡 | Tag chips as filters + "train this theme" entry point from Today's weakness list. |
| List rows aren't actionable (can't open a single exercise). | 🟡 | Click a row → solve that one exercise. |
| Success feedback is a plain callout. | 🟢 | Green flash on board + sound + auto-advance after correct (with a setting), like chess.com puzzles. |

### Openings
| Finding | Sev | Recommendation |
|---|---|---|
| Repertoire is a flat table of single moves ("1. e5", "2. Nc6", "6. O-O") with no indication which *line/opening* each belongs to. Users think in lines and trees, not nodes. | 🔴 | Group rows by opening/line (name captured at add-time), or render a proper move tree with expand/collapse; clicking a node shows the position (already done) *and* the path to it. |
| Practice auto-advances on a fixed 1200ms timer — too fast to read the move comment, and no way to pause. | 🟡 | Advance on click/keypress ("Next →", Space), with optional auto-advance in settings; keep comments on screen until dismissed. |
| Practice always covers all due lines; can't practice one opening. | 🟡 | "Practice this line/opening" buttons in the grouped view. |
| Library has 13 openings; fine for v1, but no search. | 🟢 | Search box; later: ECO-based detection of *your* most-played openings ("You play the Italian in 40% of games — add it?"). |

### Lessons & Lesson player
| Finding | Sev | Recommendation |
|---|---|---|
| Course view and Lesson library show the same lessons twice with no course progress. | 🟡 | Merge: course modules with a progress bar per module (3/4 ✓); library becomes a filter, not a second list. |
| "In progress" lessons restart from the top (all steps re-render; no "resume at step 4"). | 🟡 | Scroll to / expand the first incomplete step on open; show step progress ("Step 4 of 9") in the header. |
| No completion celebration or "next lesson" chaining. | 🟢 | Completion card with stats + "Next in course: Opposition and Key Squares →". |

### Import modal
| Finding | Sev | Recommendation |
|---|---|---|
| After a successful import: numbers, but no next step. Dead end — must close, find Games, click Analyze n times. | 🔴 | Success state with CTAs: "Analyze these 38 games now" and "View games". (Also fixes the analyze-friction issue above.) |
| "Analyze after import" checkbox sits *below* the Start button — read after the decision point. | 🟢 | Move above the primary button, default it to on when an engine is configured. |
| Modal must stay open to watch progress; not obvious the job continues in the sidebar. | 🟢 | On Start: collapse to "Import running — track it in the sidebar" and allow closing immediately. |

### Engines
| Finding | Sev | Recommendation |
|---|---|---|
| "Download Stockfish from stockfishchess.org, then point the app at the exe" is the single biggest onboarding cliff — chess.com users have never installed an engine. | 🔴 | One-click "Download Stockfish" helper: fetch the official binary for the platform, verify checksum, install into the app's `engines/` dir, run the existing handshake + trust prompt. Keep "Add your own engine…" for advanced users. |
| Security confirm before running an exe is good — keep it. | ✅ | — |

### Settings
| Finding | Sev | Recommendation |
|---|---|---|
| Draft + explicit Save; navigating away silently discards edits; board-theme preview explicitly tells you it isn't applied yet. | 🟡 | Auto-save per control (each field already maps to one key), or an unsaved-changes guard. Remove the "click Save to apply" caveat by saving on change. |
| Username change doesn't recompute `user_color` on existing games (see §1.1). | 🔴 | Backfill prompt: "Re-detect your side in 42 imported games?" |

### Global / navigation / accessibility
| Finding | Sev | Recommendation |
|---|---|---|
| No first-run onboarding; empty Today says "import games or start a lesson" but the required sequence (username → import → engine) is undiscovered. | 🔴 | 3-step first-run wizard: (1) who are you — chess.com/lichess username + rating, (2) import your recent games (one click, username prefilled), (3) set up analysis — Download Stockfish button (or skip). Then land on Today with a live checklist card until all three are done. |
| Icons are mixed unicode/emoji (☀ ♟ ⇶ 📖 🧩 ✦ ⚙ ⚒) — two different "gear" screens, inconsistent rendering. | 🟢 | One inline SVG icon set (Lucide-style paths, no dependency needed). |
| No sounds anywhere. Sound is a huge part of why chess.com feels alive (move, capture, check, correct/wrong, session complete). | 🟡 | Small WebAudio module + bundled OGGs; setting to mute. |
| Severity/status communicated by color only in several places (move list tints, badges). | 🟡 | Pair color with glyphs/labels everywhere (WCAG 1.4.1). |
| `user-select: none` on body + 1px focus outline + several 10.5–11px font sizes. | 🟡 | Allow text selection in content areas (move lists, PVs, engine lines — users copy lines); 2px focus ring; minimum 12px for meaningful text. |
| No board keyboard move entry (noted in HANDOFF) and no shortcut help. | 🟢 | `?` overlay listing shortcuts; keyboard move entry later. |

---

## 3. What already works well (keep and build on)

- **"Critical moment ahead — find candidates before revealing"** — active-recall coaching that chess.com's auto-reveal review doesn't do. Extend it, don't replace it with pure chess.com mimicry.
- Red-played vs green-better arrows after reveal; severity frames on the board.
- Mistakes → exercises → SM-2 pipeline; opening recall practice quizzing only the user's side.
- Import robustness (dedup, progress, cancel, resume), the engine trust prompt, honest local-first privacy posture.
- The "engine is a verifier, not the teacher" framing.
- Clean, calm dark visual design; consistent card/badge/table system.

---

## 4. Implementation plan

Phases are ordered by (user impact ÷ effort). Each phase is shippable on its own.

### Phase 1 — Correctness & trust (the bug layer) · ~2–4 days
> Without this, every other feature shows wrong data.

1. **User identity fix** (§1.1): importer accepts explicit username; import modal saves username back to settings; backfill migration + on-settings-change re-detection; re-orient Review, fix Win/Loss badges, repertoire color default.
   - Files: `src/main/importers/pgn.ts` (`detectUserColor`, `insertGame`), `chesscom.ts`/`lichess.ts` (pass username through), `src/main/settings.ts` (backfill hook), `ImportModal.tsx`.
2. **Re-classification path**: after user_color backfill, invalidate/re-run mistake classification for analyzed games (analysis data is stored; classification is cheap — no engine re-run needed if per-ply evals are kept).
3. **Exercise skip fix** (§1.2): disable Next until attempted, or record skip=fail.
4. **Destructive-action confirms** (§1.3) + import modal backdrop behavior.
5. Copy fixes: pluralization, "ply" → "Move", weakness evidence wording.

### Phase 2 — Review screen parity with chess.com Game Review · ~1 week
> The screen where users decide whether the app is "helpful".

1. **Accuracy %** per player (map avg centipawn loss → 0–100) — show in Review header and Games table.
2. **Move classification glyphs** (??, ?, ?!, ✓best) in move list + destination-square badge on the board.
3. **Game summary card** at top of Review (accuracy, counts by severity, biggest swing shortcut).
4. **Eval graph v2**: filled area, severity dots, hover tooltip, click-to-jump (already), height ≥140px.
5. **Prev/Next mistake** buttons + keys; **autoplay**; **static eval bar** from stored analysis.
6. **Inline "Try the better move"** on mistake cards (reuse `PuzzleBoard` validation).
   - Files: `Review.tsx`, `Board.tsx`, new `accuracy.ts` in main or shared, `Games.tsx`.

### Phase 3 — Motivation & feedback loop · ~1 week
> The "fun" layer.

1. **Sounds**: move/capture/check/castle, puzzle correct/wrong, session complete. Bundled assets, WebAudio, mute setting. (Touches `Board.tsx` + `PuzzleBoard.tsx` + settings.)
2. **Today task completion**: persist per-day task state; checkmarks + progress ("2/5"); guided session chaining with a completion celebration (streak +1 animation).
3. **Exercise session UI**: progress dots, running streak, end-of-session stats, "retry missed", auto-advance on correct.
4. **Practice anyway** when nothing is due (review-ahead).
5. **Streak calendar + daily goal** on Today.
6. Empty states: every screen's empty state gets exactly one primary CTA pointing at the next step in the setup chain.

### Phase 4 — Onboarding & setup friction · ~3–5 days
1. **First-run wizard** (username/rating → import → engine), skippable, re-launchable from Settings.
2. **Stockfish download helper** (platform binary + checksum + existing trust flow).
3. **Setup checklist card** on Today until username, ≥1 import, and engine exist.
4. **Import success CTAs** ("Analyze 38 games now" / "View games") + **bulk analyze** on Games.
5. SVG icon set; settings auto-save; keyboard shortcuts overlay (`?`).

### Phase 5 — Openings & study depth · ~1–2 weeks
1. **Repertoire tree view** grouped by opening/line (store line label on add — the data is already passed in `addOpeningLine`).
2. **Practice pacing**: advance on keypress, per-line practice, comment stays visible.
3. **Course progress** merge on Lessons; lesson resume-at-step; next-lesson chaining.
4. **Play vs engine from any position** ("play it out") — reuse the live-eval UCI process at fixed strength; entry points: Review mistake cards, exercise end, openings practice end. This is the single biggest "fun" unlock and the infrastructure already exists.
5. Games table sorting + virtualization; severity-dot mistake badges.

### Explicitly out of scope for this iteration
- Playing rated games online, social features, chess960 — different product.
- Packaging/installer (tracked in HANDOFF), FTS5 search, engine benchmark UI.

---

## 5. Success criteria for "easy, helpful, fun"

- A brand-new user reaches an analyzed game with accuracy + classified mistakes in **under 5 minutes** without reading docs (wizard → import → auto-analyze).
- Every training action gives immediate feedback (sound + visual) and every session ends with a summary.
- The Today screen visibly fills up with checkmarks as the day progresses, and the streak survives only if real work was done (no skip-cheating).
- No screen is a dead end: every empty state and every completion state names the next action.
