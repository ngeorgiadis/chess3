import { useState } from 'react'
import { api } from '../api'
import { useStore } from '../store'
import { LessonView } from '../components/LessonView'
import type { LessonValidationReport } from '@shared/types'
import type { LessonJson } from '../lesson-types'

type Tab = 'source' | 'outline' | 'json' | 'validation' | 'preview'

const RIGHTS_MODES = [
  { value: 'user-owned', label: 'I own this material' },
  { value: 'licensed', label: 'Licensed to me' },
  { value: 'public-domain', label: 'Public domain' },
  { value: 'notes-only', label: 'My own notes' },
  { value: 'unknown', label: 'Unknown / unsure' }
] as const

function ReportView({ report }: { report: LessonValidationReport }): React.JSX.Element {
  return (
    <div className="col">
      <div className="row">
        <span className={`badge ${report.schemaValid ? 'green' : 'red'}`}>
          schema {report.schemaValid ? 'valid' : 'invalid'}
        </span>
        <span className={`badge ${report.chessValid ? 'green' : 'red'}`}>
          chess {report.chessValid ? 'valid' : 'invalid'}
        </span>
        <span className={`badge ${report.engineVerified ? 'green' : 'yellow'}`}>
          {report.engineVerified ? 'engine-verified' : 'not engine-verified'}
        </span>
      </div>
      {report.errors.map((e, i) => (
        <div key={`e${i}`} className="callout error">
          <b>[{e.code}]</b> {e.path ? <span className="mono">{e.path} — </span> : null}
          {e.message}
        </div>
      ))}
      {report.warnings.map((w, i) => (
        <div key={`w${i}`} className="callout warn">
          <b>[{w.code}]</b> {w.message}
        </div>
      ))}
      {report.errors.length === 0 && report.warnings.length === 0 && (
        <div className="callout success">No issues found.</div>
      )}
    </div>
  )
}

export function AiStudio(): React.JSX.Element {
  const settings = useStore((s) => s.settings)
  const navigate = useStore((s) => s.navigate)
  const [tab, setTab] = useState<Tab>('source')
  const [sourceText, setSourceText] = useState('')
  const [goal, setGoal] = useState('')
  const [rightsMode, setRightsMode] = useState<(typeof RIGHTS_MODES)[number]['value']>('notes-only')
  const [ratingMin, setRatingMin] = useState(1300)
  const [ratingMax, setRatingMax] = useState(1700)
  const [outline, setOutline] = useState('')
  const [jsonText, setJsonText] = useState('')
  const [report, setReport] = useState<LessonValidationReport | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [published, setPublished] = useState(false)

  const aiConfigured = settings != null && settings.aiConfig.mode !== 'manual'

  async function run(label: string, fn: () => Promise<void>): Promise<void> {
    setBusy(label)
    setError(null)
    setPublished(false)
    try {
      await fn()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  const makeOutline = (): Promise<void> =>
    run('outline', async () => {
      if (!sourceText.trim()) throw new Error('Paste source material or notes first.')
      const result = await api.ai.outline({
        sourceText,
        goal,
        rightsMode,
        targetRatingMin: ratingMin,
        targetRatingMax: ratingMax
      })
      setOutline(result)
      setTab('outline')
    })

  const generate = (): Promise<void> =>
    run('generate', async () => {
      if (!outline.trim()) throw new Error('Generate or write an outline first.')
      const result = await api.ai.generateLesson({
        sourceText,
        goal,
        rightsMode,
        targetRatingMin: ratingMin,
        targetRatingMax: ratingMax,
        outline
      })
      if (result.error) throw new Error(result.error)
      setJsonText(JSON.stringify(result.lessonJson, null, 2))
      setReport(result.report)
      setTab(result.report && result.report.schemaValid && result.report.chessValid ? 'preview' : 'validation')
    })

  const validate = (): Promise<void> =>
    run('validate', async () => {
      const parsed = JSON.parse(jsonText) as unknown
      const r = await api.lessons.validate(parsed)
      setReport(r)
      setTab('validation')
    })

  const publish = (): Promise<void> =>
    run('publish', async () => {
      const parsed = JSON.parse(jsonText) as unknown
      const { lesson, report: r } = await api.lessons.publish(parsed)
      setReport(r)
      if (!lesson) {
        setTab('validation')
        throw new Error('Lesson failed validation — fix the errors before publishing.')
      }
      setPublished(true)
    })

  let parsedForPreview: LessonJson | null = null
  try {
    parsedForPreview = jsonText ? (JSON.parse(jsonText) as LessonJson) : null
  } catch {
    parsedForPreview = null
  }

  return (
    <div>
      <h1>AI Lesson Studio</h1>
      <p className="subtitle">
        Transform authorized chess material into validated, interactive lessons. Nothing is sent to an AI provider
        unless you click generate.
      </p>

      <div className="callout warn" style={{ marginBottom: 12 }}>
        Use source material you are authorized to transform. Lessons must be original explanations and exercises — not
        copied chapters.
      </div>

      <div className="tabs">
        {(['source', 'outline', 'json', 'validation', 'preview'] as Tab[]).map((t) => (
          <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
            {t === 'source' ? '1. Source' : t === 'outline' ? '2. Outline' : t === 'json' ? '3. JSON' : t === 'validation' ? '4. Validation' : '5. Preview'}
          </button>
        ))}
      </div>

      {error && <div className="callout error" style={{ marginBottom: 10 }}>{error}</div>}
      {published && (
        <div className="callout success" style={{ marginBottom: 10 }}>
          Lesson published to your library.{' '}
          <button className="small" onClick={() => navigate({ name: 'lessons' })}>
            Open Lessons
          </button>
        </div>
      )}

      {tab === 'source' && (
        <div className="col">
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <label className="field" style={{ width: 240 }}>
              Source rights
              <select value={rightsMode} onChange={(e) => setRightsMode(e.target.value as typeof rightsMode)}>
                {RIGHTS_MODES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field" style={{ width: 110 }}>
              Rating min
              <input type="number" value={ratingMin} onChange={(e) => setRatingMin(parseInt(e.target.value) || 1300)} />
            </label>
            <label className="field" style={{ width: 110 }}>
              Rating max
              <input type="number" value={ratingMax} onChange={(e) => setRatingMax(parseInt(e.target.value) || 1700)} />
            </label>
          </div>
          <label className="field">
            Goal (what should the lesson teach?)
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Create a rook-pawn endgame lesson for a 1500 player"
            />
          </label>
          <label className="field">
            Source material: notes, text excerpt, PGN, or FEN list
            <textarea
              rows={14}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste your notes or authorized text here…"
            />
          </label>
          <div className="row">
            <button className="primary" disabled={!aiConfigured || busy !== null} onClick={() => void makeOutline()}>
              {busy === 'outline' ? 'Generating outline…' : 'Generate outline →'}
            </button>
            {!aiConfigured && (
              <span className="muted">
                No AI provider configured —{' '}
                <button className="small" onClick={() => navigate({ name: 'settings' })}>
                  configure
                </button>{' '}
                or write lesson JSON manually in tab 3.
              </span>
            )}
          </div>
        </div>
      )}

      {tab === 'outline' && (
        <div className="col">
          <div className="muted">Review and edit the outline before generating the full lesson.</div>
          <textarea rows={18} value={outline} onChange={(e) => setOutline(e.target.value)} />
          <div className="row">
            <button className="primary" disabled={!aiConfigured || busy !== null} onClick={() => void generate()}>
              {busy === 'generate' ? 'Generating lesson…' : 'Generate lesson JSON →'}
            </button>
          </div>
        </div>
      )}

      {tab === 'json' && (
        <div className="col">
          <div className="muted">
            Lesson JSON (schema 1.0.0). You can write or edit it manually — manual mode needs no AI.
          </div>
          <textarea
            rows={22}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder='{"schemaVersion": "1.0.0", "id": "lesson-…", …}'
            spellCheck={false}
          />
          <div className="row">
            <button disabled={!jsonText.trim() || busy !== null} onClick={() => void validate()}>
              Validate
            </button>
            <button
              className="primary"
              disabled={!jsonText.trim() || busy !== null}
              onClick={() => void publish()}
            >
              Publish to library
            </button>
          </div>
        </div>
      )}

      {tab === 'validation' && (
        <div className="col">
          {report ? <ReportView report={report} /> : <div className="muted">Run validation from the JSON tab first.</div>}
          <div className="row">
            <button onClick={() => setTab('json')}>← Edit JSON</button>
            {report && report.schemaValid && report.chessValid && (
              <button className="primary" disabled={busy !== null} onClick={() => void publish()}>
                Publish to library
              </button>
            )}
          </div>
        </div>
      )}

      {tab === 'preview' &&
        (parsedForPreview ? (
          <div className="col">
            <div className="callout">Preview — exactly how the lesson player will render it.</div>
            <LessonView lesson={parsedForPreview} />
            <div className="row">
              <button className="primary" disabled={busy !== null} onClick={() => void publish()}>
                Publish to library
              </button>
            </div>
          </div>
        ) : (
          <div className="muted">No valid lesson JSON to preview yet.</div>
        ))}
    </div>
  )
}
