# 01 — App Specification

## 1. App overview

Chess Mentor Studio is a self-contained Electron desktop app for chess improvement. It combines:

- A chess database of the user's games.
- A UCI engine analysis system.
- Opening repertoire practice.
- A lesson/course engine driven by standardized JSON.
- AI agents that can generate lessons, puzzles, and personalized plans from user games or authorized chess source text.

The central UI is a **Today Plan**: a small set of tasks selected from actual weaknesses.

## 2. Core modules

### 2.1 Game Library

Stores imported games with metadata, PGN, parsed move tree, positions, result, time control, source platform, opening tags, and analysis state.

Required features:

- Import PGN file.
- Paste PGN.
- Paste Chess.com profile/archive/game URL.
- Paste Lichess profile/game/export URL.
- Enter username and platform.
- Deduplicate by source URL, site game ID, normalized PGN hash, and player/date/time fallback.
- Filter by date, source, time control, color, opening, result, analyzed/unanalysed, mistake theme.
- Bulk select games for analysis.

### 2.2 Game Review

A guided review screen that turns an analyzed game into a study session.

Required features:

- Board, move list, eval graph, clocks when available, mistake timeline.
- Blunder/mistake/inaccuracy labels are customizable.
- Explain mistakes in practical chess language.
- Show “Why my move failed,” “Best human move,” “Candidate moves I should have considered,” and “Rule learned.”
- One-click convert position to exercise.
- One-click add line to opening repertoire.
- One-click add theme to personalized study plan.

### 2.3 Engine Analysis

Engine analysis must be reproducible, cancellable, configurable, and pluggable.

Required features:

- Add/remove UCI engine executable.
- Detect engine name, author, options, and supported features through UCI handshake.
- Configure engine profiles: fast review, deep review, opening check, puzzle validation, endgame check.
- MultiPV support.
- Store depth, nodes, time, score, mate score, WDL if available, PV, best move, engine version, engine config hash.
- Pause/resume queue.
- No analysis of ongoing games unless user explicitly imports completed PGN or source confirms game is finished.

### 2.4 Opening Trainer

A personalized opening module that learns from the user's games.

Required features:

- Opening repertoire tree for White and Black.
- Lines can be created manually, imported from PGN, or generated from game analysis.
- Each node stores move, SAN, UCI, FEN before move, comment, priority, source, success rate, recall score.
- Practice modes:
  - Repertoire recall.
  - Mistake repair from own games.
  - Model-game walkthrough.
  - “Find the plan” positions after opening theory ends.
- Spaced repetition using node-level scheduling.
- User can mark a line as “must know,” “optional,” “avoid,” or “experimental.”

### 2.5 Lesson Player

A structured course/lesson renderer that consumes lesson JSON.

Required features:

- Course list.
- Lesson page with board, steps, explanations, examples, puzzles, hints, reflection prompts, and end quiz.
- Interactive step types:
  - Concept explanation.
  - Demonstration line.
  - Guided question.
  - Move input puzzle.
  - Evaluation comparison.
  - Model-game segment.
  - Reflection.
  - Review checkpoint.
- Move validation from SAN/UCI.
- Puzzle feedback using predefined solution lines plus optional engine verification.
- Progress tracking by lesson, concept, exercise, and position.

### 2.6 AI Lesson Studio

A workflow for converting user-provided authorized material into structured lessons.

Required features:

- Input: pasted text, markdown, PGN, FEN list, or notes.
- The agent proposes a lesson outline before generating full JSON.
- Output must validate against `schemas/lesson.schema.json`.
- All generated positions must be legal.
- All puzzle solution moves must be legal.
- All tactical/endgame claims must be engine-checked or marked as human-only/unverified.
- The agent must avoid long verbatim reproduction of source material unless the source is explicitly public domain or user-owned.
- User can review and edit before publishing to local library.

### 2.7 Personalized Coach Dashboard

Required widgets:

- Today Plan: 3–5 tasks.
- Rating goal and study streak.
- Current weaknesses by impact.
- Recent games awaiting review.
- Opening lines due for review.
- Endgame/tactics lessons due.
- “Mistakes fixed” trend.

### 2.8 Study Plan Generator

Inputs:

- Imported games.
- User rating and time control preference.
- Analysis results.
- Completed lessons/exercises.
- User goals.

Outputs:

- Daily training tasks.
- Weekly theme.
- Course recommendations.
- Number of puzzles by motif.
- Opening lines to drill.
- Game-review queue.

## 3. Main workflows

### 3.1 First-run onboarding

1. Ask rating range, platform usernames, preferred time controls, improvement goal.
2. Offer “Import last 50 rapid/blitz games.”
3. Install or locate a UCI engine.
4. Analyze a small sample first.
5. Generate baseline diagnosis.
6. Create first 7-day study plan.

### 3.2 Import from Chess.com username

1. User enters Chess.com username.
2. App requests available monthly archives.
3. User selects date range and time classes.
4. App fetches monthly archive JSON or PGN download.
5. App parses games, deduplicates, stores raw source payload and normalized PGN.
6. App queues selected games for analysis.

### 3.3 Import from Lichess username

1. User enters Lichess username.
2. App selects export params: max, since, until, perfType, color, rated, analysed, clocks, evals, opening.
3. App streams PGN or NDJSON.
4. App parses line-by-line for NDJSON to avoid UI lockups.
5. App stores games and queues analysis.

### 3.4 Analyze a game

1. App parses mainline positions.
2. App evaluates each critical position with selected engine profile.
3. App computes swing: best score vs played move score.
4. App flags candidate moments based on score loss, tactical motif, low-time context, opening deviation, and endgame phase.
5. App classifies mistakes into teachable categories.
6. App generates exercises from top mistakes.
7. User reviews and accepts/edits lessons learned.

### 3.5 Create lesson from book/text

1. User pastes authorized source text or notes.
2. Agent extracts concepts, examples, rules, positions, and possible exercises.
3. Agent generates a JSON lesson using schema.
4. Validator checks JSON, legal positions, move legality, difficulty, and citation/source fields.
5. Engine verifier checks tactical claims and puzzle uniqueness.
6. User reviews in Lesson Studio.
7. Lesson is published to local library.

## 4. User stories

### Importing

- As a user, I can paste my Chess.com username and import all games from selected months.
- As a user, I can paste a Lichess username URL and import recent games filtered by rapid/blitz/classical.
- As a user, I can paste a single game URL and import just that game.
- As a user, I can drag a PGN file into the app.

### Analysis

- As a user, I can analyze many games overnight and review the results later.
- As a user, I can change engines without losing previous analysis.
- As a user, I can see why a move was bad without needing to understand engine numbers.
- As a user, I can convert a mistake into a puzzle.

### Opening practice

- As a user, I can build a repertoire from my own games.
- As a user, I can drill lines due today.
- As a user, I can see where I leave book and what plans I should know.

### Lessons

- As a user, I can study a course with interactive board examples.
- As a user, I can generate a rook-pawn endgame lesson from notes/book excerpts I am allowed to use.
- As a user, I can edit lesson JSON before publishing it.

### Coaching

- As a user, I can ask “what should I study next?” and receive a short plan based on my mistakes.
- As a user, I can see whether repeated mistakes are decreasing.

## 5. Permission and ethics requirements

- Do not scrape private data.
- Do not analyze ongoing games in a way that could assist live play.
- Do not imitate Chess.com protected UI assets, branded sounds, or proprietary move classification language.
- Do not reproduce copyrighted books at length. The app should generate transformed lessons and exercises, not copied chapters.

## 6. v1 release criteria

- Import works for Chess.com monthly archive and PGN download.
- Import works for Lichess streamed PGN/NDJSON export.
- At least one UCI engine can be added and used.
- Game review classifies mistakes and produces at least one exercise per analyzed game.
- Lesson JSON schema validates and renders in the lesson player.
- AI agent prompt and validation workflow can generate a sample endgame lesson.
- Dashboard produces a 7-day personalized study plan.
