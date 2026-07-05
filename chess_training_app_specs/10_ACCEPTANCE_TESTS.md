# 10 — Acceptance Tests

## Import tests

### Chess.com archive import

Given a valid Chess.com username with public games,
when the user selects a month range,
then the app fetches available archives, imports games, skips duplicates, and stores raw PGN plus metadata.

Pass criteria:

- Games imported count is correct.
- Duplicate import imports zero new games on second run.
- PGN is parseable.
- Metadata includes source URL, ratings, result, time class where available.

### Chess.com PGN download

Given a valid monthly PGN endpoint,
when the user imports it,
then the app parses multi-game PGN and stores all games.

Pass criteria:

- Content type handled as PGN, not JSON.
- Multi-game parsing works.
- Malformed games produce warnings, not app crash.

### Lichess NDJSON stream import

Given a valid Lichess username,
when the user imports max 500 games as NDJSON,
then the app streams line-by-line and keeps renderer responsive.

Pass criteria:

- No renderer freeze.
- Progress increments per parsed game.
- Cancel stops import safely.
- `pgnInJson=true` stores PGN where requested.

### PGN drag/drop

Given a `.pgn` file with multiple games,
when dropped onto import modal,
then the app previews game count and imports after confirmation.

Pass criteria:

- Handles comments and variations.
- Reports failures with line/game reference.

## Engine tests

### Add UCI engine

Given a valid UCI engine executable,
when the user adds it,
then app completes handshake and stores engine options.

Pass criteria:

- `uciok` and `readyok` observed.
- Engine name detected.
- Options parsed.

### Analyze one position

Given a legal FEN and engine profile,
when analysis starts,
then app stores best move, score, PV, depth/time.

Pass criteria:

- Result is reproducible with same profile.
- Timeout kills process gracefully.

### Analyze a game

Given an imported game,
when queued for fast review,
then app analyzes positions and creates mistake candidates.

Pass criteria:

- Queue progress works.
- Critical moments stored.
- Game review screen loads them.

## Lesson tests

### Validate sample lesson

Given `examples/rook-pawn-endgame.lesson.json`,
when validated against schema,
then validation passes.

Pass criteria:

- Schema valid.
- FEN legal.
- Solution moves legal.

### Render lesson

Given a valid lesson JSON,
when opened in lesson player,
then all steps render and board positions update.

Pass criteria:

- Concept step renders text.
- Demonstration step animates moves.
- Puzzle step accepts legal solution.
- Wrong answer feedback appears.

### AI-generated lesson

Given authorized source notes about rook pawn endings,
when AI Lesson Studio generates a lesson,
then it produces valid JSON or actionable validation errors.

Pass criteria:

- No invalid JSON published.
- No illegal FEN/moves published.
- Copyright warning appears for unknown source rights mode.

## Opening trainer tests

### Repertoire node creation

Given a user marks a move from a game review as repertoire,
then a repertoire node is created for that FEN and move.

Pass criteria:

- Duplicate node not created twice.
- Node appears in opening tree.

### Practice due lines

Given due repertoire nodes,
when user starts practice,
then app prompts moves and updates recall scheduling.

Pass criteria:

- Correct move advances.
- Incorrect move shows hint/feedback.
- Due date updates after session.

## Dashboard tests

### First diagnosis

Given 20 analyzed games,
when dashboard loads,
then it shows top weaknesses and a 7-day plan.

Pass criteria:

- Plan has 3–5 daily tasks.
- Tasks link to actual exercises/lessons/games.
- Weaknesses cite evidence from games.

## Security tests

- Renderer cannot access Node APIs directly.
- Lesson Markdown sanitizes script tags.
- Imported PGN comments cannot execute scripts.
- Unknown remote URL imports are rejected.
- Ongoing games are not analyzed.
- Engine process is killed on timeout.

## Performance tests

- Import 500 games under realistic network constraints without UI freeze.
- Review screen opens a 100-move game in under 500ms after parsed data is stored.
- Engine queue cancellation responds within 2 seconds.
- Lesson schema validation completes under 250ms for normal lessons.
