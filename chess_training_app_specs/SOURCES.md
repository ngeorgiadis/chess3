# Sources and Standards Notes

This spec pack was drafted with reference to the following public API and standards documentation. Re-check these before implementation because APIs and app frameworks change.

## Chess.com PubAPI

- Chess.com Help Center — “What is the PubAPI and how do I use it?”
- Chess.com Published-Data API documentation

Relevant implementation notes:

- PubAPI is read-only and exposes public data.
- It does not include private game chat or conditional moves.
- Endpoints include monthly game archives and monthly PGN downloads.
- Chess.com recommends serial access to avoid rate limiting and supports ETag/Last-Modified caching.

Key endpoints:

- `https://api.chess.com/pub/player/{username}/games/archives`
- `https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}`
- `https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}/pgn`

## Lichess API

- Lichess API OpenAPI spec in `lichess-org/api`

Relevant implementation notes:

- User games endpoint: `https://lichess.org/api/games/user/{username}`
- Supports PGN or NDJSON export.
- Response should be streamed for large exports.
- Useful query params include `since`, `until`, `max`, `rated`, `perfType`, `color`, `analysed`, `moves`, `pgnInJson`, `tags`, `clocks`, `evals`, `accuracy`, `opening`, `division`, and `sort`.

## UCI / Stockfish

- Stockfish UCI & Commands documentation
- UCI protocol documentation

Relevant implementation notes:

- UCI is a text-based protocol between GUI and engine.
- Engine handshake uses `uci`, `id`, `option`, `uciok`, `isready`, and `readyok`.
- Position setup can use `position startpos moves ...`.
- Analysis starts with `go` and ends with `bestmove`.

## Electron security

- Electron Security documentation

Relevant implementation notes:

- Do not enable Node.js integration for remote content.
- Enable context isolation.
- Enable process sandboxing where possible.
- Do not disable `webSecurity`.
- Define a Content Security Policy.

## PGN

- Steven J. Edwards, Portable Game Notation Specification and Implementation Guide

Relevant implementation notes:

- PGN is a portable plain-text chess game representation.
- PGN contains tag pairs and movetext.
- Parsers must handle comments, NAGs, and variations.
