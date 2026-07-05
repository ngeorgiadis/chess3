# Chess Mentor Studio — Spec Pack

This folder is a detailed, agent-ready specification package for a local-first Electron desktop app that helps a ~1500 Chess.com player improve through imported games, engine analysis, repertoire practice, and AI-generated lessons/exercises.

## Primary goals

1. Import games from Chess.com, Lichess, PGN files, and pasted URLs.
2. Analyze mistakes with pluggable UCI engines.
3. Convert mistakes into a personalized study plan.
4. Support opening practice, spaced repetition, endgames, tactics, and model-game lessons.
5. Let an AI lesson agent transform authorized chess source material into structured lessons and puzzles using the included schemas.
6. Keep the app self-contained: local database, local engine execution, local files, and optional AI provider integration.

## File map

| File | Purpose |
|---|---|
| `00_PRODUCT_BRIEF.md` | Vision, target user, scope, assumptions, success metrics |
| `01_APP_SPEC.md` | Full product requirements and user stories |
| `02_CURRICULUM_SPEC.md` | Improvement curriculum for a 1500-rated player |
| `03_UI_UX_SPEC.md` | Detailed UI/UX flows, information architecture, visual interaction patterns |
| `04_TECH_ARCHITECTURE.md` | Electron architecture, modules, security, storage, background jobs |
| `05_IMPORTERS_SPEC.md` | Chess.com, Lichess, PGN, URL parsing, caching, rate-limit behavior |
| `06_ENGINE_PLUGIN_SPEC.md` | UCI engine plugin contract, analysis pipeline, engine management |
| `07_AI_LESSON_SYSTEM_SPEC.md` | AI lesson generation, validation, safety, human review |
| `08_DATA_MODEL.md` | Core entities, SQLite schema outline, event log design |
| `09_AGENTIC_WORKFLOWS.md` | Agents for diagnosis, lesson generation, puzzle generation, review |
| `10_ACCEPTANCE_TESTS.md` | End-to-end acceptance tests and quality gates |
| `agents/AGENT.md` | Chess-master persona and instructions for generating lessons from text |
| `schemas/course.schema.json` | JSON Schema for courses |
| `schemas/lesson.schema.json` | JSON Schema for lessons, steps, concepts, positions, exercises |
| `schemas/game-analysis.schema.json` | JSON Schema for engine-assisted game review output |
| `examples/rook-pawn-endgame.lesson.json` | Example lesson JSON using the schema |
| `examples/first-1500-improvement.course.json` | Example course JSON |
| `SOURCES.md` | API and standards references used while drafting |

## Naming assumptions

The working product name is **Chess Mentor Studio**. Rename freely.

## Non-goals for v1

- Playing live games inside the app.
- Cheating-adjacent functionality during ongoing games.
- Scraping private Chess.com or Lichess data.
- Reproducing copyrighted books inside generated lessons. The lesson agent should summarize and transform only text the user is authorized to use, preserve source attribution, and avoid long verbatim extraction.
