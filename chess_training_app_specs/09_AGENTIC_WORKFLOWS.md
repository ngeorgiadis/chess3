# 09 — Agentic Workflows

## Agent roster

The app can use multiple specialized agents. Each agent should produce structured output and pass validation.

## 1. Diagnosis Agent

### Purpose

Turn analyzed games into a ranked weakness profile and study plan.

### Inputs

- Engine analysis.
- Mistake objects.
- Game metadata.
- User rating and goals.
- Exercise history.

### Output

```ts
type DiagnosisReport = {
  summary: string;
  topWeaknesses: Array<{
    tag: string;
    evidence: string[];
    impact: 'low' | 'medium' | 'high';
    recommendedAction: string;
    linkedCourseIds: string[];
    linkedExerciseIds: string[];
  }>;
  sevenDayPlan: Array<{
    day: number;
    tasks: Array<{ type: string; title: string; minutes: number; refId?: string }>;
  }>;
};
```

### Rules

- Use evidence from real games.
- Do not overfit one game.
- Prefer high-impact recurring issues.
- Avoid assigning too many courses.

## 2. Lesson Author Agent

### Purpose

Convert authorized source material or a topic instruction into a lesson JSON object.

### Inputs

- Source text/notes.
- Target rating.
- Topic.
- Desired lesson length.
- Schema.
- User constraints.

### Output

- Valid `lesson.schema.json` lesson.

### Rules

- Follow `agents/AGENT.md`.
- Include active recall.
- Include positions and exercises.
- Validate all chess content.

## 3. Puzzle Generator Agent

### Purpose

Turn mistakes or lesson positions into exercises.

### Inputs

- Position FEN.
- Best move/PV.
- Motif tags.
- Target rating.
- Engine analysis.

### Output

- Exercise object embedded in a lesson or standalone exercise.

### Rules

- Check uniqueness using MultiPV.
- Include wrong-answer feedback.
- Make hints progressive.
- Avoid impossible engine-only puzzles for 1500 players unless labelled advanced.

## 4. Explanation Agent

### Purpose

Translate engine analysis into human chess explanations.

### Inputs

- Position.
- User move.
- Best move.
- Engine PV.
- Mistake theme.
- User rating.

### Output

- Human explanation, training rule, and suggested exercise.

### Rules

- Use practical language.
- Avoid excessive engine depth.
- Explain candidate moves.
- Include “what to check next time.”

## 5. Validator Agent

### Purpose

Review generated lessons and explanations.

### Inputs

- Generated JSON.
- Schema validation results.
- Engine validation results.
- Source rights mode.

### Output

- Pass/fail report.
- Required fixes.

### Rules

- Be strict.
- Flag illegal moves.
- Flag vague explanations.
- Flag potential copying.
- Flag rating mismatch.

## Orchestration pattern

```
User request
  -> Source Intake
  -> Concept Extraction
  -> Lesson Outline
  -> User edits outline
  -> Lesson JSON Generation
  -> Schema Validator
  -> Chess Validator
  -> Engine Verifier
  -> Copyright/Safety Check
  -> Lesson Preview
  -> Publish
```

## Agent memory boundaries

Agents should read:

- The current request.
- User-selected games/lessons/source text.
- Relevant prior app data explicitly selected by user.

Agents should not read:

- Entire game database unless needed.
- Private source documents not selected.
- API keys.
- Engine executable paths unless needed for validation logs.

## Prompt output discipline

Every agent must output one of:

- JSON matching a schema.
- Markdown report matching a template.
- Validation errors.

No hidden transformations should be applied without showing the user.
