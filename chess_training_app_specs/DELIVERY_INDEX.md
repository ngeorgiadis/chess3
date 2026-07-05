# Delivery Index

This package contains a complete v1 specification for a self-contained Electron chess improvement app.

## Most important files to read first

1. `00_PRODUCT_BRIEF.md`
2. `01_APP_SPEC.md`
3. `04_TECH_ARCHITECTURE.md`
4. `05_IMPORTERS_SPEC.md`
5. `06_ENGINE_PLUGIN_SPEC.md`
6. `07_AI_LESSON_SYSTEM_SPEC.md`
7. `agents/AGENT.md`
8. `schemas/lesson.schema.json`

## Recommended implementation order

1. Electron shell with secure IPC and SQLite.
2. PGN import and parser.
3. Chess.com and Lichess import adapters.
4. Game library and review board.
5. UCI engine manager.
6. Analysis queue and mistake classifier.
7. Exercise generator.
8. Opening trainer.
9. Lesson schema renderer.
10. AI Lesson Studio and AGENT.md workflow.
11. Personalized dashboard.

## MVP definition

A useful MVP imports 50 games, analyzes them with a local UCI engine, identifies recurring mistakes, and gives the user a 7-day plan with exercises derived from their own games.

## Validation status

- JSON schemas are syntactically valid.
- Example course validates against `course.schema.json`.
- Example lesson validates against `lesson.schema.json`.
- Chess move legality still requires implementation-level validation using a chess library.
