# 07 — AI Lesson System Specification

## Purpose

The AI Lesson System turns user-provided authorized chess material and personal game mistakes into structured, interactive lessons. It should behave like a careful chess coach and editor, not like a generic chatbot.

## Inputs

Supported source inputs:

- User notes.
- Pasted book excerpt the user is authorized to transform.
- Public-domain chess text.
- PGN games.
- FEN position list.
- Engine-analysis mistakes.
- User instruction: e.g. “Create a rook-pawn endgame lesson for a 1500 player.”

## Outputs

Primary output:

- Valid lesson JSON conforming to `schemas/lesson.schema.json`.

Secondary outputs:

- Course JSON conforming to `schemas/course.schema.json`.
- Game-analysis explanations conforming to `schemas/game-analysis.schema.json`.
- Teacher notes.
- Validation report.

## AI workflow

### Stage 1 — Source intake

Agent receives:

- Source text.
- User goal.
- Target rating.
- Desired lesson length.
- Allowed use mode: `user-owned`, `licensed`, `public-domain`, `notes-only`, or `unknown`.

If use mode is `unknown`, agent must avoid close paraphrase and long reproduction; it may create original explanations and exercises inspired by concepts only.

### Stage 2 — Concept extraction

Agent extracts:

- Main concepts.
- Sub-concepts.
- Prerequisites.
- Key rules.
- Example positions.
- Candidate exercises.
- Common mistakes.
- Vocabulary.

Output is an outline, not final lesson.

### Stage 3 — Lesson plan

Agent proposes:

- Lesson title.
- Learning objectives.
- Step sequence.
- Positions needed.
- Exercises and difficulty.
- Validation checklist.

User can edit before generating.

### Stage 4 — JSON generation

Agent creates full lesson JSON.

Rules:

- Every step must have a clear purpose.
- Every position must include legal FEN.
- Every move solution must be legal in the position.
- Use plain language for explanations.
- Explain “why,” not only “what.”
- Include wrong-answer feedback for common errors.
- Include at least one review checkpoint.

### Stage 5 — Validation

Validation layers:

1. JSON Schema validation.
2. Chess legality validation.
3. PGN/FEN parse validation.
4. Engine verification for tactics/endgames where applicable.
5. Duplicate exercise detection.
6. Copyright risk check.
7. UX preview render.

### Stage 6 — Publish

The user can publish to local library only after validation passes or warnings are acknowledged.

## Lesson schema design principles

The lesson format must be:

- Declarative.
- Versioned.
- Portable.
- Renderable without AI.
- Validatable without AI.
- Suitable for spaced repetition.
- Capable of representing concepts, examples, puzzles, and explanations.

## Step types

| Type | Description |
|---|---|
| `concept` | Teach a principle with optional board position |
| `demonstration` | Show a line or model sequence |
| `guided_question` | Ask user to reason before reveal |
| `move_input` | User must play one or more moves |
| `evaluation_choice` | User compares candidate moves/evals |
| `model_game_segment` | Walk through part of a game |
| `reflection` | User summarizes or writes rule |
| `review_checkpoint` | Short quiz/review |

## Position model

Each position should be reusable by steps and exercises.

Required:

- ID.
- FEN.
- Side to move.
- Position title.
- Tags.

Optional:

- PGN setup.
- Source reference.
- Engine evaluation.
- Arrows/highlights.

## Exercise model

Exercise types:

- Best move.
- Multi-move line.
- Save draw.
- Convert win.
- Candidate move selection.
- Plan selection.
- Evaluation comparison.
- Error diagnosis.

Each exercise should include:

- Prompt.
- Position ref.
- Solution.
- Hints.
- Wrong-answer feedback.
- Tags.
- Difficulty.
- Review schedule metadata.

## Agent guardrails

The AI agent must not:

- Claim a move is winning without validation.
- Generate illegal moves.
- Invent source attribution.
- Copy long passages from books.
- Create vague exercises with no solution.
- Overload a 1500 player with grandmaster-level theory unless requested.

The AI agent must:

- Use human chess language.
- Prefer simple, useful rules.
- Use examples and active recall.
- State uncertainty.
- Mark unverifiable claims.
- Validate or request engine validation.

## AI provider modes

### Cloud provider mode

- User configures API key.
- App shows data to be sent.
- App sends only selected text/games.
- App stores generated output locally.

### Local model mode

- User configures local HTTP endpoint.
- Same schema/validation pipeline.
- Warn that small local models may produce illegal chess unless validator catches errors.

### Manual mode

- User creates lessons directly in JSON editor or form builder.
- No AI required.

## Validation report format

```ts
type LessonValidationReport = {
  schemaValid: boolean;
  chessValid: boolean;
  engineVerified: boolean;
  warnings: Array<{ code: string; message: string; path?: string }>;
  errors: Array<{ code: string; message: string; path?: string }>;
};
```

## Human review checklist

Before publishing a generated lesson:

- Does every explanation help a 1500 player make better moves?
- Are the positions legal?
- Are the solutions unique or clearly marked as non-unique?
- Is the lesson original rather than copied?
- Does it include practice, not just explanation?
- Does it fit the target rating?
- Does it avoid engine-only lines that humans cannot understand?
