# 05 — Importers Specification

## Import philosophy

Use official/public APIs and user-provided PGN. Do not scrape web pages. Do not access private game data without proper authentication and explicit user authorization.

## Supported import sources

1. Chess.com public username/archive URL.
2. Chess.com monthly PGN URL.
3. Lichess user export URL.
4. Lichess single game export.
5. PGN file.
6. Pasted PGN.

## URL detection

### Chess.com accepted inputs

- `https://www.chess.com/member/{username}`
- `https://www.chess.com/games/archive/{username}`
- `https://api.chess.com/pub/player/{username}`
- `https://api.chess.com/pub/player/{username}/games/archives`
- `https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}`
- `https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}/pgn`
- Individual Chess.com game URLs should be parsed if the PGN can be obtained from public archive data or pasted PGN. Do not scrape private pages.

### Lichess accepted inputs

- `https://lichess.org/@/{username}`
- `https://lichess.org/api/games/user/{username}`
- `https://lichess.org/{gameId}`
- `https://lichess.org/game/export/{gameId}`

## Chess.com importer

### Endpoints

- Available archives: `https://api.chess.com/pub/player/{username}/games/archives`
- Monthly archive JSON: `https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}`
- Monthly archive PGN: `https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}/pgn`
- Player stats: `https://api.chess.com/pub/player/{username}/stats`

### Recommended flow

1. Fetch archive list.
2. Filter archive URLs by selected date range.
3. Fetch archives sequentially.
4. Prefer JSON archive when metadata like time class, ratings, and accuracies are needed.
5. Prefer PGN endpoint when the user requests raw PGN export.
6. Extract `pgn` field from JSON games and preserve original metadata separately.

### Rate limiting and caching

- Use sequential requests by default.
- Add User-Agent with app name/version and contact or user-provided contact.
- Store `ETag` and `Last-Modified` headers where provided.
- Reuse cached archives when API returns 304.
- Back off on 429.

### Mapping

| Chess.com field | Internal field |
|---|---|
| `url` | `source_game_url` |
| `pgn` | `raw_pgn` |
| `white.username` | `white_name` |
| `black.username` | `black_name` |
| `white.rating` | `white_rating` |
| `black.rating` | `black_rating` |
| `end_time` | `ended_at` |
| `time_control` | `time_control` |
| `time_class` | `time_class` |
| `rules` | `variant` |
| `eco` | `eco_url` |
| `accuracies.white` | `white_accuracy` |
| `accuracies.black` | `black_accuracy` |

## Lichess importer

### Endpoint

- User games: `https://lichess.org/api/games/user/{username}`
- Single game: `https://lichess.org/game/export/{gameId}`

### Important parameters

- `since`: epoch milliseconds.
- `until`: epoch milliseconds.
- `max`: game count.
- `vs`: opponent filter.
- `rated`: boolean.
- `perfType`: comma-separated speeds/variants such as `blitz,rapid,classical`.
- `color`: `white` or `black`.
- `analysed`: boolean.
- `moves`: include moves.
- `pgnInJson`: include PGN in NDJSON response.
- `tags`: include PGN tags.
- `clocks`: include clock data.
- `evals`: include existing server analysis when available.
- `accuracy`: JSON only.
- `opening`: include opening.
- `division`: JSON only, phase split.
- `sort`: `dateAsc` or `dateDesc`.

### Recommended flow

1. If user requests PGN: set Accept header to PGN.
2. If user wants metadata-rich import: set Accept header to `application/x-ndjson` and use `pgnInJson=true`.
3. Stream response line-by-line.
4. Parse each JSON object independently.
5. Store raw JSON and normalized PGN.
6. Respect throttled response; do not buffer entire response when importing many games.

### Mapping

| Lichess field | Internal field |
|---|---|
| `id` | `source_game_id` |
| `url` | `source_game_url` |
| `pgn` | `raw_pgn` |
| `players.white.user.name` | `white_name` |
| `players.black.user.name` | `black_name` |
| `players.white.rating` | `white_rating` |
| `players.black.rating` | `black_rating` |
| `createdAt` | `started_at` |
| `lastMoveAt` | `ended_at` |
| `speed` / `perf` | `time_class` |
| `clock` | `time_control_structured` |
| `opening.name` | `opening_name` |
| `opening.eco` | `eco_code` |
| `analysis` | `source_analysis_json` |

## PGN importer

Requirements:

- Parse multi-game PGN.
- Support comments, NAGs, variations, clock comments, eval comments.
- Preserve raw PGN.
- Store normalized export PGN.
- Generate FEN for every ply.
- Detect malformed games and show partial import report.

Deduplication keys, in priority order:

1. Source platform + source game ID.
2. Source URL.
3. Normalized PGN SHA-256.
4. Player names + date + result + move sequence hash.

## Import result object

```ts
type ImportResult = {
  source: 'chesscom' | 'lichess' | 'pgn-file' | 'pasted-pgn';
  gamesSeen: number;
  gamesImported: number;
  duplicatesSkipped: number;
  failed: Array<{
    sourceRef: string;
    reason: string;
    rawSnippet?: string;
  }>;
  createdGameIds: string[];
};
```

## Anti-cheating guardrails

- Mark games as “ongoing” when source says ongoing.
- Do not queue ongoing games for engine analysis.
- Do not auto-refresh ongoing games for analysis.
- Show warning when user imports a current game.

## User-Agent requirement

Default:

`ChessMentorStudio/1.0 (+local-desktop-app; contact: user-configurable)`

The app should let users configure contact info if they plan large imports.
