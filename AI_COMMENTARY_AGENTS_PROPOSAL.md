# Proposal — AI Game Analysis & Commentary Agents

Status: **Phases 1–3 implemented** (2026-07-14, branch `ux-pass-2`). Extends the existing AI connection (`src/main/ai/provider.ts`) with a set of agents that analyze games and comment positions. See `HANDOFF.md` → "AI commentary agents" for the as-built summary and file pointers. Phase 4 (A5, interactive chat) intentionally not attempted — parked until 1–3 prove out.

## Why this fits now

The app already produces all the raw material an AI coach needs, and the weakest link today is the *text*:

- `src/main/engines/analysis.ts` stores per-ply Stockfish MultiPV evaluations for every analyzed game (`engine_analysis` table) and classifies mistakes — but `humanSummary` / `whyBad` are **canned template strings** ("X wins material. Before moving, scan for captures…"). Every blunder of the same shape gets the same sentence.
- The AI connection exists and works (OpenAI-compatible or local endpoint, user-configured, privacy rule: nothing sent unless user triggers it) but is used only by the lesson agent.
- `chess_training_app_specs/09_AGENTIC_WORKFLOWS.md` already specifies a Diagnosis Agent, Explanation Agent, and Validator Agent. This proposal implements that roster, adapted to what was actually built.

**Core design principle — grounding, not chess-playing.** The LLM is never asked to *compute* chess. The engine supplies the facts (evals, best lines in SAN, motif tags, material balance, phase); the LLM only narrates and teaches. Every output is verified before display: any SAN move it mentions must parse legally in context, and its claims must not contradict the engine eval sign. This is what makes the feature trustworthy rather than a hallucination generator.

## The agent roster (proposed)

### A1 — Position Explainer (on-demand)  · *Phase 1*

"Explain this position" button in the Review screen (and Play-it-out). Takes one position + engine facts + game context, returns a rating-targeted explanation:

- What each side wants here, why the best move works, why the played move failed *concretely* (what tactic/plan it allows, walking through the PV in words).
- "What to check next time" training rule — replaces the canned `whyBad` when available.
- Cached per (position, model) so repeat clicks are free.

**Value/effort: best in the set.** One prompt, one IPC handler, one button; proves the grounding + verification plumbing everything else reuses.

### A2 — Game Annotator (batch job)  · *Phase 2*

A job (existing queue: progress, cancel, restart-safe) that walks an analyzed game, selects the *key* positions (all mistakes, eval swings, phase transitions, the critical moment — typically 8–15 positions, not all 80 plies), and generates:

- Per-move commentary stored in a new `annotations` table (`game_id, ply, kind, text, model, created_at`).
- A **game narrative**: opening assessment (using the ECO/opening name already resolved), the turning points, one short paragraph per phase, "three lessons from this game."

Review screen shows commentary bubbles on annotated moves and the narrative card at the top — the app starts feeling like a coach reviewed your game, not a spreadsheet.

### A3 — Coach / Diagnosis Agent (cross-game)  · *Phase 3*

Implements the spec's `DiagnosisReport`: aggregates mistakes, theme tags, accuracy and openings across the last N analyzed games into a ranked weakness profile with evidence ("In 6 of your last 20 games you dropped material to knight forks in the middlegame — games X, Y, Z") plus a concrete 7-day plan that links to existing exercises/lessons/repertoire lines. Surfaces as a "Coach report" card in Insights and can seed the Today plan. This is the personalization moat — chess.com reviews one game; this knows your history.

### A4 — Commentary Validator (deterministic + optional LLM critic)  · *built with A1, hardened in Phase 2*

Not a user-facing agent — the safety net the others pass through:

1. **Deterministic** (no AI cost): extract SAN tokens from output → each must be legal via chess.js from the referenced position; eval-direction claims ("White is winning") must match engine sign; mentioned squares must hold the pieces claimed.
2. On failure: one repair round with the specific errors (same pattern as `lesson-agent.ts`), else fall back to the existing template text. Never show unverified chess claims.

### A5 — Interactive Coach Chat (agentic, tool-use)  · *Phase 4, optional*

A chat panel in Review where the user asks "why not Nf5?" and the agent has **tools**: `eval_position(fen)`, `probe_move(fen, san)` (play it, get engine reply + eval), `get_game_context(ply)`. This is the only true multi-turn agentic loop in the set — highest wow-factor, but also highest cost/complexity (requires tool-calling support in `provider.ts`, streaming, per-session engine budget). Recommend deferring until A1–A3 prove the foundation.

## Architecture

```
src/main/ai/
  provider.ts        (extend: message[] history, optional streaming; keep OpenAI-compatible)
  grounding.ts       NEW — builds a compact "position dossier" from engine_analysis + moves
                     (FEN, last moves SAN, MultiPV lines in SAN with evals, motifs, phase,
                      material, player ratings) — the single source all agents prompt from
  verify.ts          NEW — A4: SAN-legality + eval-consistency checks, repair-round helper
  explain-agent.ts   NEW — A1  (IPC ai:explainPosition)
  annotate-agent.ts  NEW — A2  (job type game.annotate → annotations table + narrative)
  coach-agent.ts     NEW — A3  (IPC ai:coachReport, coach_reports table)
  lesson-agent.ts    (unchanged)
```

- **Storage**: `annotations` and `coach_reports` tables (migration), keyed to game/model so re-runs upsert.
- **Cost control**: key-position selection (not every ply), one batched call per game for A2 (all dossiers in one prompt) with per-position fallback, response caching, and the already-supported local-model mode for zero-cost usage. Job UI shows call counts.
- **Persona/settings**: reuse the Chess Master Coach persona (target-rating-aware); add Settings → AI: commentary verbosity + tone.
- **Privacy**: unchanged rule — agents run only on explicit user action; dossiers contain only the selected game's data (spec 09 memory boundaries).

## Phasing recommendation

| Phase | Delivers | Risk |
|---|---|---|
| 1 | `grounding.ts` + `verify.ts` + A1 Explain button in Review | Low — one endpoint, immediate visible value |
| 2 | A2 annotation job + narrative card + annotations UI | Medium — batch cost, selection heuristics |
| 3 | A3 coach report in Insights + Today integration | Medium — aggregation quality |
| 4 | A5 interactive chat with engine tools | High — defer until 1–3 validated |

## Open questions for review

1. **Scope of v1**: Phases 1–3, with A5 chat explicitly parked? (recommended)
2. **A2 call shape**: one batched prompt per game (cheap, coherent narrative, weaker per-move depth) vs per-key-position calls (better depth, ~10× calls)? Recommend batched with a "Deepen this comment" per-move escape hatch that reuses A1.
3. **Replace or coexist**: should A1 output overwrite the template `whyBad` on the mistake record, or live alongside it as a separate "AI coach" block? Recommend coexist (engine text stays as the always-available fallback).
4. **Model guidance**: keep provider-agnostic, but docs should state it needs a reasonably strong model (weak local models will fail verification often — the fallback handles it gracefully).

## Main risks & mitigations

- **Hallucinated variations** → grounding + A4 verification + repair round + template fallback. Never display unverified chess claims.
- **Cost/latency** → key positions only, caching, batching, local-model path, job-queue visibility and cancel.
- **Provider variability** (JSON mode, tool calls not universal) → A1–A3 need only plain-text/JSON responses; only A5 needs tool calling, which is another reason to defer it.
