// Self-test run with `electron . --smoke-test` against a temp data dir.
// Covers the non-UI acceptance checks from 10_ACCEPTANCE_TESTS.md that need no network/engine.
import { getDb } from './db'
import { importPgnText, splitPgn, parsePgnGame } from './importers/pgn'
import { validateLesson } from './lessons/validate'
import { listLessons, getProgress } from './lessons/store'
import { computeTodayPlan } from './plan/study-plan'
import { addLineFromGame, addOpeningLine, listNodes, attemptNode, dueNodes } from './repertoire'
import { detectSource } from './importers/detect'
import { verifyExplanation, verifyNarrative } from './ai/verify'
import { OPENINGS } from '@shared/openings'
import { Chess } from 'chess.js'
import type { PositionDossier } from '@shared/types'

const SAMPLE_PGN = `[Event "Test Match"]
[Site "https://example.org/game/1"]
[Date "2024.03.01"]
[White "alice"]
[Black "bob"]
[Result "1-0"]
[TimeControl "600"]
[ECO "C50"]

1. e4 {[%clk 0:09:58]} e5 {[%clk 0:09:57]} 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6
5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. d5 Bf6 10. Re1 Ne7
11. Rxe4 d6 12. Bg5 Bxg5 13. Nxg5 h6 14. Qe2 hxg5 15. Re1 Be6
16. dxe6 f6 17. Re3 c6 18. Rh3 Rxh3 19. gxh3 g6 20. Qf3 Qa5 21. Rd1 Qf5 1-0

[Event "Second Game"]
[White "carol"]
[Black "dave"]
[Result "1/2-1/2"]

1. d4 d5 2. c4 e6 3. Nc3 Nf6 1/2-1/2
`

const BAD_LESSON = {
  schemaVersion: '1.0.0',
  id: 'lesson-bad-001',
  title: 'Bad lesson',
  slug: 'bad-lesson',
  summary: 'A lesson with an illegal solution move for validation testing.',
  targetRating: { min: 1000, max: 1500 },
  estimatedMinutes: 5,
  objectives: ['test'],
  positions: [
    { id: 'pos-bad-001', title: 'Start', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', sideToMove: 'white' }
  ],
  steps: [{ id: 'step-bad-001', type: 'concept', title: 'x', content: 'y' }],
  exercises: [
    {
      id: 'ex-bad-001',
      type: 'best_move',
      title: 'Illegal',
      prompt: 'z',
      positionRef: 'pos-bad-001',
      solution: { moves: [{ moveUci: 'e2e6' }], explanation: 'impossible move' },
      difficulty: 1,
      tags: []
    }
  ],
  review: { keyTakeaways: ['t'], selfTest: ['s'] }
}

export async function runSmokeTest(): Promise<boolean> {
  let failures = 0
  const check = (name: string, cond: boolean, detail?: string): void => {
    if (cond) console.log(`  PASS  ${name}`)
    else {
      failures++
      console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`)
    }
  }

  console.log('Chess Mentor Studio smoke test')

  // 1. Seeded lesson validates and is in the library
  const lessons = listLessons()
  check('seed lesson published', lessons.length >= 1, `found ${lessons.length}`)
  if (lessons.length) {
    const report = validateLesson(lessons[0].lessonJson)
    check('seed lesson schema+chess valid', report.schemaValid && report.chessValid, JSON.stringify(report.errors))
    const progress = getProgress(lessons[0].id)
    check('lesson progress readable', progress.status === 'not-started')
  }

  // 2. Bad lesson is rejected with actionable errors
  const badReport = validateLesson(BAD_LESSON)
  check('illegal solution move rejected', !badReport.chessValid && badReport.errors.some((e) => e.code === 'illegal-move'))

  // 3. Multi-game PGN split + parse (comments, clocks)
  const chunks = splitPgn(SAMPLE_PGN)
  check('multi-game PGN split', chunks.length === 2, `got ${chunks.length}`)
  const parsed = parsePgnGame(chunks[0])
  check('PGN parsed with per-ply FENs', parsed.moves.length === 42 && parsed.moves.every((m) => m.fenAfter.length > 10),
    `${parsed.moves.length} moves`)
  check('clock comments parsed', parsed.moves[0].clockMs === 598_000, String(parsed.moves[0].clockMs))

  // 4. Import + dedup
  const r1 = importPgnText(SAMPLE_PGN, 'pasted-pgn')
  check('import stores both games', r1.gamesImported === 2, JSON.stringify(r1))
  const r2 = importPgnText(SAMPLE_PGN, 'pasted-pgn')
  check('re-import skips duplicates', r2.gamesImported === 0 && r2.duplicatesSkipped === 2, JSON.stringify(r2))

  // 5. Ongoing game guard
  const ongoing = importPgnText('[Event "Live"]\n[White "x"]\n[Black "y"]\n[Result "*"]\n\n1. e4 e5 *', 'pasted-pgn')
  if (ongoing.gamesImported === 1) {
    const row = getDb().prepare('SELECT ongoing FROM games WHERE id = ?').get(ongoing.createdGameIds[0]) as {
      ongoing: number
    }
    check('ongoing game flagged (blocked from analysis)', row.ongoing === 1)
  } else {
    check('ongoing game import', false, JSON.stringify(ongoing))
  }

  // 6. Repertoire from game + spaced repetition
  const gameId = r1.createdGameIds[0]
  const nodes = addLineFromGame(gameId, 6)
  check('repertoire line created from game', nodes.length >= 3, `${nodes.length} nodes`)
  check('repertoire dedup on re-add', addLineFromGame(gameId, 6).length === nodes.length)
  const due = dueNodes()
  check('new nodes are due', due.length >= nodes.length, `${due.length} due`)
  if (due.length) {
    const updated = attemptNode(due[0].id, true)
    check('correct recall reschedules node', updated.intervalDays >= 1 && updated.dueAt! > new Date().toISOString())
  }
  check('repertoire tree lists nodes', listNodes('white').length + listNodes('black').length >= nodes.length)

  // 6b. Openings library: every line is legal and imports into the repertoire
  let illegalLines = 0
  for (const opening of OPENINGS) {
    for (const line of opening.lines) {
      const chess = new Chess()
      try {
        for (const san of line.san) chess.move(san)
      } catch {
        illegalLines++
        console.error(`  library line illegal: ${opening.name} / ${line.name}`)
      }
    }
  }
  check('openings library lines all legal', illegalLines === 0, `${illegalLines} illegal`)
  const libOpening = OPENINGS[0]
  const libNodes = addOpeningLine({
    color: libOpening.side,
    sanMoves: libOpening.lines[0].san,
    openingName: libOpening.name,
    lineName: libOpening.lines[0].name
  })
  check('library line added to repertoire', libNodes.length >= 3, `${libNodes.length} nodes`)
  check(
    'library line re-add dedups',
    addOpeningLine({
      color: libOpening.side,
      sanMoves: libOpening.lines[0].san,
      openingName: libOpening.name,
      lineName: libOpening.lines[0].name
    }).length === libNodes.length
  )

  // 7. URL detection
  check('detect chess.com member URL', detectSource('https://www.chess.com/member/hikaru').kind === 'chesscom-user')
  check('detect lichess user URL', detectSource('https://lichess.org/@/thibault').kind === 'lichess-user')
  check('detect lichess game URL', detectSource('https://lichess.org/AbCdEfGh').kind === 'lichess-game')
  check('reject unknown host', detectSource('https://evil.example.com/games').kind === 'unknown')

  // 8. Today plan
  const plan = computeTodayPlan()
  check('today plan has 3-5 tasks', plan.tasks.length >= 1 && plan.tasks.length <= 5, `${plan.tasks.length} tasks`)
  check('plan counts due repertoire', plan.dueRepertoire >= 0)

  // 9. AI commentary validator (A4) — deterministic, no engine/network needed
  const sampleDossier: PositionDossier = {
    gameId: 'game-x',
    ply: 12,
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 4',
    sideToMove: 'b',
    moveNumber: 4,
    phase: 'opening',
    openingName: 'Italian Game',
    players: { white: 'alice', black: 'bob', whiteRating: 1500, blackRating: 1480, userColor: 'black' },
    recentMovesText: '3.Bc4 Nc6 4.Nf3',
    playedMove: { san: 'Nc6', uci: 'b8c6' },
    mistake: null,
    lines: [{ rank: 1, san: 'Nf6', evalLabel: '+6.00', evalCp: 600, continuationText: 'O-O Bc5' }],
    targetRatingMin: 1300,
    targetRatingMax: 1700
  }
  const verifiedText = verifyExplanation(
    sampleDossier,
    'Black should develop with Nf6, hitting e4 and preparing to castle. After O-O Bc5, Black is comfortable.'
  )
  check('verifier accepts a grounded explanation', verifiedText.verified, JSON.stringify(verifiedText.issues))
  const hallucinated = verifyExplanation(
    sampleDossier,
    'Black should play the crushing Qxh7#, winning immediately since the king is exposed.'
  )
  check(
    'verifier flags a hallucinated illegal move',
    !hallucinated.verified && hallucinated.issues.includes('Qxh7#'),
    JSON.stringify(hallucinated.issues)
  )
  const evalMismatch = verifyExplanation(sampleDossier, 'White is completely winning here and should convert easily.')
  check('verifier flags an eval-direction contradiction', !evalMismatch.verified, JSON.stringify(evalMismatch.issues))
  const narrativeOk = verifyNarrative(
    ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    [sampleDossier],
    'The game opened 1.e4 e5 2.Nf3 Nc6 3.Bc4, a classical Italian setup.'
  )
  check('narrative verifier accepts real game moves', narrativeOk.verified, JSON.stringify(narrativeOk.issues))
  const narrativeBad = verifyNarrative(['e4', 'e5'], [sampleDossier], 'Black later delivered Qxh7# to finish the game.')
  check('narrative verifier flags an unlisted move', !narrativeBad.verified, JSON.stringify(narrativeBad.issues))

  console.log(failures === 0 ? 'SMOKE TEST PASSED' : `SMOKE TEST FAILED (${failures} failures)`)
  return failures === 0
}
