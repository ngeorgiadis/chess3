# 00 — Product Brief

## Product name

**Chess Mentor Studio**

A local-first desktop chess improvement app for ambitious adult improvers around 1500 online rating who want a structured training system rather than random puzzles and scattered YouTube videos.

## Target user

- Current level: around 1500 Chess.com rapid/blitz, capable of basic tactics and opening principles but inconsistent.
- Main pain: knows many chess ideas in isolation but does not reliably apply them in games.
- Needs: importing own games, seeing recurring mistakes, practicing openings, building calculation habits, and receiving course-like lessons generated from trusted chess material.

## Product thesis

The fastest path from 1500 to 1800+ is not “more content.” It is a feedback loop:

1. Import real games.
2. Diagnose repeatable weaknesses.
3. Convert weaknesses into focused lessons.
4. Practice with targeted exercises.
5. Re-test using spaced repetition and new games.
6. Update the study plan.

The app should therefore be built around a **personal improvement loop**, not around a static course catalog.

## v1 outcome

After two weeks of use, the user should be able to answer:

- Which openings produce the worst positions for me?
- Which tactical motifs do I miss most often?
- Which endgames do I mishandle?
- Which move types cause most of my blunders?
- What should I study today?
- Which mistakes have I actually fixed?

## Success metrics

### User-level metrics

- 80%+ of imported games receive useful classified feedback.
- User completes at least 5 personalized exercises per analyzed game.
- User can review one game in under 12 minutes using the app flow.
- User sees a weekly report with the top 3 improvement priorities.

### Chess improvement metrics

- Reduction in one-move blunders per game.
- Opening positions after move 10 improve by engine eval and human labels.
- Increased puzzle accuracy on motifs derived from user games.
- Fewer repeated mistakes in the same tagged theme.

### Product quality metrics

- Import 500 Chess.com games without duplicate records.
- Import 500 Lichess games via streaming without freezing UI.
- UCI engine analysis can be paused, resumed, cancelled, and reproduced.
- Lesson JSON validates before entering the library.

## Strong assumptions

- The user wants a desktop app, so Electron is acceptable for rapid UX iteration.
- The user wants self-contained local functionality, so the app should not require a backend server.
- AI is optional but central: users may use an API key or a local model connector.
- Engines must be pluggable and not hard-coded to one engine.
- Imported games are public or user-authorized.

## v1 scope

Included:

- Electron desktop app.
- Local SQLite database.
- PGN import.
- Chess.com public archive import.
- Lichess public user export import.
- UCI engine plugin manager.
- Game analysis with mistake classification.
- Opening trainer.
- Lesson viewer/player.
- AI lesson-generation workflow with JSON schema validation.
- Personalized study dashboard.

Excluded:

- Real-time online game assistance.
- Multiplayer.
- Full ChessBase replacement.
- Native mobile app.
- Cloud sync.
- Direct ingestion of copyrighted books unless the user has rights and the agent transforms into original notes/exercises.

## Product principles

1. **Every lesson must lead to moves on a board.** No passive wall of text.
2. **Every diagnosis must produce practice.** A mistake label without exercises is incomplete.
3. **The engine is a verifier, not the teacher.** Explanations must be human and practical.
4. **The app should reduce choices.** At 1500, the user needs a study plan more than a huge library.
5. **Local-first by default.** Personal games, notes, and analysis should live locally.
6. **Transparent analysis.** Show engine, depth, time, and confidence.
7. **No cheating workflows.** Ongoing-game analysis is blocked or delayed unless clearly marked as post-game analysis.
