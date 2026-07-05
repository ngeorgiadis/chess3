# 02 — Curriculum Specification for a 1500 Player

## Curriculum philosophy

A 1500 player usually improves fastest by reducing tactical oversight, improving calculation discipline, building a narrow reliable opening repertoire, and learning practical endgames. The app should avoid giving the user an enormous “grandmaster curriculum.” It should prescribe the smallest useful course set based on mistakes.

## Course architecture

The app should ship with a starter curriculum, then personalize it using game analysis.

### Track A — Tactical vision and calculation

Goal: reduce blunders and missed forcing moves.

Modules:

1. Forcing moves checklist: checks, captures, threats.
2. Loose pieces and undefended pieces.
3. Back-rank patterns.
4. Pins, skewers, discovered attacks.
5. Overloaded defenders.
6. Removal of defender.
7. Candidate moves and blunder check.
8. Calculation trees: forcing line first, quiet move second.

Practice design:

- Use 5–10 daily puzzles generated from user games and public-domain/example positions.
- Each puzzle requires a short pre-move checklist.
- Wrong answers show the missed tactical motif, not just the engine line.

### Track B — Opening repertoire builder

Goal: reach playable middlegames with clear plans.

Modules:

1. Choose simple White repertoire.
2. Choose Black response to 1.e4.
3. Choose Black response to 1.d4/c4/Nf3.
4. Repertoire tree and transpositions.
5. Punishing opening mistakes.
6. Plans after the first 8–12 moves.
7. Model games from each structure.

Practice design:

- Repertoire recall with spaced repetition.
- “What is the plan?” after theory ends.
- Prioritize lines where user scores poorly or gets bad positions by move 10.

### Track C — Middlegame plans and pawn structures

Goal: move beyond one-move tactics and understand plans.

Modules:

1. Open files and rook activity.
2. Good vs bad bishops.
3. Knight outposts.
4. Minority attack basics.
5. Isolated queen's pawn positions.
6. Hanging pawns.
7. King safety and pawn storms.
8. Converting extra material.

Practice design:

- Model positions with plans.
- Guided questions before showing moves.
- Game-review tags map mistakes to modules.

### Track D — Practical endgames

Goal: convert wins and save draws.

Modules:

1. King and pawn opposition.
2. Key squares.
3. Outside passer.
4. Rook activity and cutting off the king.
5. Lucena and Philidor.
6. Rook pawn vs rook basics.
7. Queen vs pawn defensive zones.
8. Simplification decisions.

Practice design:

- Short concept lessons.
- Exact-move drills.
- “Win/draw decision” exercises.
- Endgame tablebase optional if engine/tablebase is configured.

### Track E — Game review discipline

Goal: make every played game useful.

Modules:

1. Annotate without engine first.
2. Identify critical moments.
3. Compare candidate moves.
4. Convert mistakes into rules.
5. Build the next training task.

Practice design:

- Review template embedded in the app.
- Engine hidden for first pass.
- User writes a hypothesis before engine reveal.

## Daily training plans

### 30-minute plan

1. 5 minutes: warm-up tactics, 3 puzzles.
2. 10 minutes: opening lines due today.
3. 10 minutes: review one mistake position from own games.
4. 5 minutes: one endgame mini-drill.

### 60-minute plan

1. 10 minutes: tactics.
2. 15 minutes: opening recall and plans.
3. 20 minutes: analyze one game or one model game.
4. 10 minutes: endgame drill.
5. 5 minutes: write lesson learned.

### 90-minute plan

1. 15 minutes: tactics/calculation.
2. 20 minutes: opening repertoire plus model game.
3. 30 minutes: deep game review.
4. 15 minutes: endgame.
5. 10 minutes: spaced review and planning.

## Personalized course-selection logic

The app should select courses using mistake evidence.

### Diagnosis signals

| Signal | Suggested course |
|---|---|
| Frequent eval drops > 150cp in non-tactical positions | Calculation discipline |
| Many missed tactics in positions with checks/captures | Tactical vision |
| Bad eval by move 10 in repeated lines | Opening repertoire builder |
| Losing equal rook endgames | Practical rook endings |
| Failing to convert material advantage | Conversion technique |
| Blunders in low clock time | Time-management and move-check routine |
| Same motif missed repeatedly | Motif-specific mini-course |

## Lesson difficulty bands

- `1200-1500`: basic motif recognition, simple plans, fundamental endgames.
- `1500-1700`: calculation discipline, opening plans, common rook endings.
- `1700-1900`: prophylaxis, pawn structures, advanced conversion, defensive resources.
- `1900+`: deep calculation, strategic imbalances, complex endgames.

## Effective improvement loop

Every week:

1. Import new games.
2. Analyze 5–10 serious games.
3. Select top 3 recurring weaknesses.
4. Complete 3 targeted lessons.
5. Drill 30–60 derived exercises.
6. Re-test older exercises.
7. Update repertoire.
8. Write a short weekly summary.

## v1 default course bundle

1. **Stop Hanging Pieces** — tactical safety course.
2. **Forcing Moves First** — calculation habit course.
3. **Opening Repertoire Foundations** — narrow, practical repertoire builder.
4. **Rook Activity 101** — rook and pawn endings.
5. **Critical Moment Review** — game review method.
6. **Converting Extra Material** — simplification and technique.

## Personalization rules

- Never assign more than 3 active courses.
- Keep at least 50% of practice tied to user games.
- Use engine analysis to find positions, but use human concepts to teach.
- Repeat failed exercises at shorter intervals.
- Promote a concept only after successful recall in at least 3 separate positions.
