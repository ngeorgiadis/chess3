# 06 — Engine Plugin Specification

## Engine strategy

The app should support pluggable local chess engines through the Universal Chess Interface (UCI). UCI is the v1 required protocol. XBoard/CECP can be added later through an adapter.

## Engine entity

```ts
type Engine = {
  id: string;
  name: string;
  author?: string;
  version?: string;
  protocol: 'uci';
  executablePath: string;
  workingDirectory?: string;
  detectedOptions: UciOption[];
  createdAt: string;
  lastVerifiedAt?: string;
  status: 'available' | 'missing' | 'invalid' | 'blocked';
};
```

## UCI option model

```ts
type UciOption =
  | { name: string; type: 'check'; default?: boolean }
  | { name: string; type: 'spin'; default?: number; min?: number; max?: number }
  | { name: string; type: 'combo'; default?: string; vars: string[] }
  | { name: string; type: 'button' }
  | { name: string; type: 'string'; default?: string };
```

## Engine profile

Engine profiles allow one engine to serve multiple use cases.

```ts
type EngineProfile = {
  id: string;
  name: string;
  engineId: string;
  options: Record<string, string | number | boolean>;
  limits: {
    depth?: number;
    nodes?: number;
    moveTimeMs?: number;
    multiPv?: number;
  };
  useCase: 'fast-review' | 'deep-review' | 'opening' | 'puzzle-validation' | 'endgame';
};
```

Default profiles:

| Profile | Suggested limits | Use |
|---|---|---|
| Fast Review | depth 12–16 or 300ms/move | quick scan |
| Deep Review | depth 18–24 or 1500ms/move | serious games |
| Opening Check | MultiPV 3, depth 16 | repertoire choices |
| Puzzle Validate | MultiPV 5, depth 20 | uniqueness of solution |
| Endgame Check | depth 20+ or tablebase if configured | technical endings |

## Engine lifecycle

### Verify engine

1. Spawn executable.
2. Send `uci`.
3. Read `id name`, `id author`, `option ...` lines.
4. Wait for `uciok` within timeout.
5. Send `isready`.
6. Wait for `readyok`.
7. Store metadata and supported options.
8. Send `quit`.

### Analyze position

1. Spawn or reuse engine worker.
2. Send `ucinewgame` if game changed.
3. Send `isready` and wait.
4. Send `position startpos moves ...` when move history is available.
5. Send `go depth N` or `go movetime X`.
6. Parse `info` lines.
7. On `bestmove`, store result.
8. Send next position or stop.

Use `position startpos moves ...` rather than only FEN when possible to preserve repetition context.

## Analysis result

```ts
type EngineAnalysis = {
  id: string;
  gameId: string;
  ply: number;
  fen: string;
  sideToMove: 'w' | 'b';
  engineId: string;
  engineProfileId: string;
  engineName: string;
  depth?: number;
  selDepth?: number;
  nodes?: number;
  timeMs?: number;
  multiPv: Array<{
    rank: number;
    moveUci: string;
    moveSan?: string;
    score: { type: 'cp' | 'mate'; value: number; perspective: 'side-to-move' | 'white' };
    pvUci: string[];
    pvSan?: string[];
    wdl?: { win: number; draw: number; loss: number };
  }>;
  createdAt: string;
};
```

## Mistake classification

Input:

- Evaluation before user move.
- Evaluation after user move.
- Best engine line.
- User move.
- Legal moves.
- Phase.
- Clock info if available.
- Opening/repertoire context.

Output:

```ts
type Mistake = {
  gameId: string;
  ply: number;
  severity: 'inaccuracy' | 'mistake' | 'blunder' | 'missed-win' | 'missed-draw' | 'strategic-error';
  evalLossCp?: number;
  themeTags: string[];
  humanSummary: string;
  whyBad: string;
  betterMove: string;
  trainingAction: 'tactics' | 'opening' | 'endgame' | 'calculation' | 'strategy' | 'time-management';
  confidence: 'low' | 'medium' | 'high';
};
```

## Classification thresholds

Thresholds should be configurable by rating and phase. Defaults:

| Severity | Approx eval loss |
|---|---|
| Inaccuracy | 50–120cp |
| Mistake | 120–250cp |
| Blunder | >250cp or changes result class |
| Missed win | best move gives decisive advantage but played move does not |
| Missed draw | only move draws but played move loses |

Do not present these as absolute truth. Engine scores can be unstable in sharp positions.

## Puzzle generation from mistakes

For each high-confidence mistake:

1. Use position before mistake.
2. Best move becomes solution start.
3. Include one or more continuations from engine PV.
4. Validate legal moves.
5. If MultiPV has multiple near-equivalent moves, mark puzzle as non-unique or convert to “choose all good candidate moves.”
6. Assign theme tags.
7. Generate human explanation.
8. Schedule with spaced repetition.

## Engine safety

- Adding an engine is equivalent to running a local executable; warn the user.
- Engine paths must not be downloaded silently.
- Engine process must run with minimal privileges where OS permits.
- Kill runaway engines on timeout.
- Never pass untrusted shell strings; spawn executable with argv array.

## Future extension points

- XBoard/CECP adapter.
- Remote engine service adapter.
- Tablebase adapter.
- Cloud-eval adapter.
- Engine tournament/benchmark mode.
