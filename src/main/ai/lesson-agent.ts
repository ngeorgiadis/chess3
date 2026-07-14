import { chat, parseJsonLoose } from './provider'
import { validateLesson } from '../lessons/validate'
import type { AiGenerateArgs, AiOutlineArgs, LessonValidationReport } from '@shared/types'

/** Condensed persona and rules from agents/AGENT.md. */
const SYSTEM_PROMPT = `You are The Chess Master Coach, a patient but demanding chess instructor specialized in
helping 1400–1800 online-rated players improve by turning chess ideas into practical board skills.
You transform user-provided authorized chess material, notes, games or instructions into structured
lessons and exercises for the Chess Mentor Studio desktop app.

Core mission: create lessons that help the user make better moves in real games. A good lesson:
1. Teaches one main concept clearly.
2. Shows the concept on a board.
3. Asks the student to think before revealing answers.
4. Includes interactive exercises with exact solutions.
5. Explains common mistakes.
6. Uses legal chess positions and legal moves only.
7. Fits the target rating (prefer 1–3 move solutions for ~1500 players).

Teaching style: clear, concrete, board-oriented, honest about uncertainty, practical rather than academic.
Avoid engine jargon, long unexplained variations, vague advice, and overwhelming theory.

Copyright rules: use only material the user is authorized to transform. If rights status is unknown,
do NOT closely paraphrase or reproduce passages — extract concepts and write original explanations.
Never invent source attribution. The output is a transformed study aid, never a copy of the source.

Chess quality rules:
- Every FEN must be complete (placement, side to move, castling, en passant, halfmove, fullmove) and legal.
- Every solution move must be legal in its position, written in UCI (e.g. "g2g3") with optional SAN.
- If a claim is not verified, set verification.status to "unverified".
- If several moves are equally good, do not present it as a single-solution puzzle.
- Use stable lowercase kebab-case ids (lesson-x-001, pos-x-001, step-x-001, ex-x-001).`

const OUTLINE_INSTRUCTIONS = `Produce a lesson OUTLINE in markdown with these exact sections:
# Lesson Outline
## Main concept
## Learning objectives
## Positions needed
(list each position with a proposed legal FEN and side to move)
## Step plan
(sequence of steps: concept, demonstration, guided_question, move_input, reflection, review_checkpoint)
## Exercises
(each with position, task, solution idea, difficulty 1-5)
## Validation risks
Do NOT output JSON yet.`

function jsonInstructions(args: AiGenerateArgs): string {
  return `Now generate the FULL lesson as a single JSON object conforming to the Chess Mentor lesson schema
(schemaVersion "1.0.0"; required top-level fields: schemaVersion, id, title, slug, summary, targetRating {min,max},
estimatedMinutes, objectives[], positions[], steps[], exercises[], review {keyTakeaways[], selfTest[]}).
Steps have: id, type (concept|demonstration|guided_question|move_input|evaluation_choice|model_game_segment|reflection|review_checkpoint),
title, content, and optional positionRef, prompt, expectedAnswer, solution {moves[{moveUci,moveSan}], explanation}, line[{moveUci,moveSan}].
Exercises have: id, type (best_move|multi_move_line|save_draw|convert_win|candidate_selection|plan_selection|evaluation_comparison|error_diagnosis),
title, prompt, positionRef, solution {moves[], explanation, remember}, hints[], difficulty (1-5), tags[].
Positions have: id, title, fen, sideToMove (white|black), optional highlights/arrows/verification.
The "source" field must use rightsMode "${args.rightsMode}".
Target rating: ${args.targetRatingMin}-${args.targetRatingMax}.
Output ONLY the JSON object. No markdown fences, no commentary.`
}

export async function generateOutline(args: AiOutlineArgs): Promise<string> {
  const user = `Source material (rights mode: ${args.rightsMode}):
---
${args.sourceText.slice(0, 20000)}
---
User goal: ${args.goal || 'Create a focused lesson from this material.'}
Target rating: ${args.targetRatingMin}-${args.targetRatingMax}.

${OUTLINE_INSTRUCTIONS}`
  return chat({ system: SYSTEM_PROMPT, user, temperature: 0.5 })
}

export interface GenerateLessonResult {
  lessonJson: unknown | null
  rawText: string
  report: LessonValidationReport | null
  error?: string
}

/** Stage 4+5 of 07_AI_LESSON_SYSTEM_SPEC.md: generate JSON, validate, retry once with errors. */
export async function generateLesson(args: AiGenerateArgs): Promise<GenerateLessonResult> {
  const baseUser = `Source material (rights mode: ${args.rightsMode}):
---
${args.sourceText.slice(0, 20000)}
---
User goal: ${args.goal || 'Create a focused lesson from this material.'}

Approved outline:
---
${args.outline.slice(0, 8000)}
---

${jsonInstructions(args)}`

  let rawText = await chat({ system: SYSTEM_PROMPT, user: baseUser, expectJson: true, temperature: 0.3 })
  let lessonJson = parseJsonLoose(rawText)
  if (!lessonJson) {
    return { lessonJson: null, rawText, report: null, error: 'The AI response was not valid JSON.' }
  }

  let report = validateLesson(lessonJson)
  if (!report.schemaValid || !report.chessValid) {
    // one repair round with actionable errors
    const issues = [...report.errors].slice(0, 25).map((e) => `- [${e.code}] ${e.path ?? ''} ${e.message}`).join('\n')
    const repairUser = `${baseUser}

Your previous JSON had validation problems:
${issues}

Fix ALL problems and output the corrected full JSON object only.`
    rawText = await chat({ system: SYSTEM_PROMPT, user: repairUser, expectJson: true, temperature: 0.2 })
    const repaired = parseJsonLoose(rawText)
    if (repaired) {
      lessonJson = repaired
      report = validateLesson(lessonJson)
    }
  }
  return { lessonJson, rawText, report }
}
