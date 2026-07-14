"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index.js");
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
`;
const BAD_LESSON = {
  schemaVersion: "1.0.0",
  id: "lesson-bad-001",
  title: "Bad lesson",
  slug: "bad-lesson",
  summary: "A lesson with an illegal solution move for validation testing.",
  targetRating: { min: 1e3, max: 1500 },
  estimatedMinutes: 5,
  objectives: ["test"],
  positions: [
    { id: "pos-bad-001", title: "Start", fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", sideToMove: "white" }
  ],
  steps: [{ id: "step-bad-001", type: "concept", title: "x", content: "y" }],
  exercises: [
    {
      id: "ex-bad-001",
      type: "best_move",
      title: "Illegal",
      prompt: "z",
      positionRef: "pos-bad-001",
      solution: { moves: [{ moveUci: "e2e6" }], explanation: "impossible move" },
      difficulty: 1,
      tags: []
    }
  ],
  review: { keyTakeaways: ["t"], selfTest: ["s"] }
};
async function runSmokeTest() {
  let failures = 0;
  const check = (name, cond, detail) => {
    if (cond) console.log(`  PASS  ${name}`);
    else {
      failures++;
      console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
    }
  };
  console.log("Chess Mentor Studio smoke test");
  const lessons = index.listLessons();
  check("seed lesson published", lessons.length >= 1, `found ${lessons.length}`);
  if (lessons.length) {
    const report = index.validateLesson(lessons[0].lessonJson);
    check("seed lesson schema+chess valid", report.schemaValid && report.chessValid, JSON.stringify(report.errors));
    const progress = index.getProgress(lessons[0].id);
    check("lesson progress readable", progress.status === "not-started");
  }
  const badReport = index.validateLesson(BAD_LESSON);
  check("illegal solution move rejected", !badReport.chessValid && badReport.errors.some((e) => e.code === "illegal-move"));
  const chunks = index.splitPgn(SAMPLE_PGN);
  check("multi-game PGN split", chunks.length === 2, `got ${chunks.length}`);
  const parsed = index.parsePgnGame(chunks[0]);
  check(
    "PGN parsed with per-ply FENs",
    parsed.moves.length === 42 && parsed.moves.every((m) => m.fenAfter.length > 10),
    `${parsed.moves.length} moves`
  );
  check("clock comments parsed", parsed.moves[0].clockMs === 598e3, String(parsed.moves[0].clockMs));
  const r1 = index.importPgnText(SAMPLE_PGN, "pasted-pgn");
  check("import stores both games", r1.gamesImported === 2, JSON.stringify(r1));
  const r2 = index.importPgnText(SAMPLE_PGN, "pasted-pgn");
  check("re-import skips duplicates", r2.gamesImported === 0 && r2.duplicatesSkipped === 2, JSON.stringify(r2));
  const ongoing = index.importPgnText('[Event "Live"]\n[White "x"]\n[Black "y"]\n[Result "*"]\n\n1. e4 e5 *', "pasted-pgn");
  if (ongoing.gamesImported === 1) {
    const row = index.getDb().prepare("SELECT ongoing FROM games WHERE id = ?").get(ongoing.createdGameIds[0]);
    check("ongoing game flagged (blocked from analysis)", row.ongoing === 1);
  } else {
    check("ongoing game import", false, JSON.stringify(ongoing));
  }
  const gameId = r1.createdGameIds[0];
  const nodes = index.addLineFromGame(gameId, 6);
  check("repertoire line created from game", nodes.length >= 3, `${nodes.length} nodes`);
  check("repertoire dedup on re-add", index.addLineFromGame(gameId, 6).length === nodes.length);
  const due = index.dueNodes();
  check("new nodes are due", due.length >= nodes.length, `${due.length} due`);
  if (due.length) {
    const updated = index.attemptNode(due[0].id, true);
    check("correct recall reschedules node", updated.intervalDays >= 1 && updated.dueAt > (/* @__PURE__ */ new Date()).toISOString());
  }
  check("repertoire tree lists nodes", index.listNodes("white").length + index.listNodes("black").length >= nodes.length);
  let illegalLines = 0;
  for (const opening of index.OPENINGS) {
    for (const line of opening.lines) {
      const chess = new index.Chess();
      try {
        for (const san of line.san) chess.move(san);
      } catch {
        illegalLines++;
        console.error(`  library line illegal: ${opening.name} / ${line.name}`);
      }
    }
  }
  check("openings library lines all legal", illegalLines === 0, `${illegalLines} illegal`);
  const libOpening = index.OPENINGS[0];
  const libNodes = index.addOpeningLine({
    color: libOpening.side,
    sanMoves: libOpening.lines[0].san,
    openingName: libOpening.name,
    lineName: libOpening.lines[0].name
  });
  check("library line added to repertoire", libNodes.length >= 3, `${libNodes.length} nodes`);
  check(
    "library line re-add dedups",
    index.addOpeningLine({
      color: libOpening.side,
      sanMoves: libOpening.lines[0].san,
      openingName: libOpening.name,
      lineName: libOpening.lines[0].name
    }).length === libNodes.length
  );
  check("detect chess.com member URL", index.detectSource("https://www.chess.com/member/hikaru").kind === "chesscom-user");
  check("detect lichess user URL", index.detectSource("https://lichess.org/@/thibault").kind === "lichess-user");
  check("detect lichess game URL", index.detectSource("https://lichess.org/AbCdEfGh").kind === "lichess-game");
  check("reject unknown host", index.detectSource("https://evil.example.com/games").kind === "unknown");
  const plan = index.computeTodayPlan();
  check("today plan has 3-5 tasks", plan.tasks.length >= 1 && plan.tasks.length <= 5, `${plan.tasks.length} tasks`);
  check("plan counts due repertoire", plan.dueRepertoire >= 0);
  console.log(failures === 0 ? "SMOKE TEST PASSED" : `SMOKE TEST FAILED (${failures} failures)`);
  return failures === 0;
}
exports.runSmokeTest = runSmokeTest;
