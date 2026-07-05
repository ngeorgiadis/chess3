import { useCallback, useEffect, useMemo, useState } from 'react'
import { Chess } from 'chess.js'
import { api } from '../api'
import { useAppEvent } from '../store'
import { Board } from '../components/Board'
import { OPENINGS, type Opening, type OpeningLine } from '@shared/openings'
import type { RepertoireNodeRecord } from '@shared/types'

const PRIORITIES: RepertoireNodeRecord['priority'][] = ['must-know', 'normal', 'optional', 'avoid', 'experimental']

function moveNumberOf(node: RepertoireNodeRecord): number {
  const parts = node.fenBefore.split(' ')
  return parseInt(parts[5] ?? '1') || 1
}

function fenAfterMove(fenBefore: string, uci: string): string {
  const chess = new Chess(fenBefore)
  chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || undefined })
  return chess.fen()
}

/** Order due nodes so moves of the same line come one after another (root line, then depth). */
function orderByLine(due: RepertoireNodeRecord[], byId: Map<string, RepertoireNodeRecord>): RepertoireNodeRecord[] {
  const meta = (n: RepertoireNodeRecord): { root: string; depth: number } => {
    let cur = n
    let depth = 0
    while (cur.parentId && byId.has(cur.parentId)) {
      cur = byId.get(cur.parentId)!
      depth++
    }
    return { root: cur.id, depth }
  }
  return [...due].sort((a, b) => {
    const ma = meta(a)
    const mb = meta(b)
    return ma.root.localeCompare(mb.root) || ma.depth - mb.depth
  })
}

function Practice({ due, onDone }: { due: RepertoireNodeRecord[]; onDone: () => void }): React.JSX.Element {
  const [allNodes, setAllNodes] = useState<RepertoireNodeRecord[]>([])
  const [idx, setIdx] = useState(0)
  const [wrongTries, setWrongTries] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  /** Position after the answered move, shown briefly before advancing. */
  const [resultFen, setResultFen] = useState<string | null>(null)

  useEffect(() => {
    void api.repertoire.list().then(setAllNodes)
  }, [])

  const byId = useMemo(() => new Map(allNodes.map((n) => [n.id, n])), [allNodes])
  const ordered = useMemo(() => orderByLine(due, byId), [due, byId])
  const node = ordered[idx]

  // The opponent move that led to this position (auto-played, just shown as context)
  const opponentNode = useMemo(() => {
    if (!node?.parentId) return null
    const parent = byId.get(node.parentId)
    if (!parent) return null
    const parentMover = parent.fenBefore.split(' ')[1]
    const userMover = node.color === 'white' ? 'w' : 'b'
    return parentMover !== userMover ? parent : null
  }, [node, byId])

  if (!node) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 30 }}>
        <p>All due lines reviewed. Nice work — recall scheduling updated.</p>
        <button className="primary" onClick={onDone}>
          Back to repertoire
        </button>
      </div>
    )
  }

  const advance = (): void => {
    setIdx(idx + 1)
    setWrongTries(0)
    setShowHint(false)
    setFeedback(null)
    setResultFen(null)
  }

  function handleMove(uci: string, san: string): void {
    if (uci === node.moveUci) {
      void api.repertoire.attempt(node.id, wrongTries === 0 && !showHint)
      setResultFen(fenAfterMove(node.fenBefore, uci))
      setFeedback(`✓ ${san} is your repertoire move.${node.comment ? ' ' + node.comment : ''}`)
      setTimeout(advance, 1200)
    } else {
      setWrongTries(wrongTries + 1)
      setFeedback(`${san} is not the line you chose to play here. ${wrongTries === 0 ? 'Try once more.' : ''}`)
      if (wrongTries >= 1) setShowHint(true)
    }
  }

  function reveal(): void {
    void api.repertoire.attempt(node.id, false)
    setResultFen(fenAfterMove(node.fenBefore, node.moveUci))
    setFeedback(`The repertoire move is ${node.moveSan}.`)
    setTimeout(advance, 1600)
  }

  const lastMove = resultFen
    ? { from: node.moveUci.slice(0, 2), to: node.moveUci.slice(2, 4) }
    : opponentNode
      ? { from: opponentNode.moveUci.slice(0, 2), to: opponentNode.moveUci.slice(2, 4) }
      : null

  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 18 }}>
      <div style={{ flex: '0 1 480px', minWidth: 300 }}>
        <Board
          fen={resultFen ?? node.fenBefore}
          orientation={node.color}
          interactive={!resultFen}
          onMove={handleMove}
          lastMove={lastMove}
          arrows={
            showHint && !resultFen ? [{ from: node.moveUci.slice(0, 2), to: node.moveUci.slice(2, 4) }] : []
          }
          maxWidth={480}
        />
      </div>
      <div className="col" style={{ flex: 1 }}>
        <div className="muted">
          Line {idx + 1} of {ordered.length} · playing as {node.color}
        </div>
        <div>
          {opponentNode ? (
            <>
              Opponent played <b className="mono">{opponentNode.moveSan}</b> — play your repertoire move.
            </>
          ) : (
            'Play your repertoire move in this position.'
          )}
        </div>
        {feedback && <div className={`callout ${feedback.startsWith('✓') ? 'success' : 'warn'}`}>{feedback}</div>}
        <div className="row">
          {!showHint && !resultFen && (
            <button className="small" onClick={() => setShowHint(true)}>
              Hint
            </button>
          )}
          {!resultFen && (
            <button className="small" onClick={reveal}>
              Show move
            </button>
          )}
          <button className="small" onClick={onDone}>
            Stop practice
          </button>
        </div>
      </div>
    </div>
  )
}

function LineViewer({ opening, line }: { opening: Opening; line: OpeningLine }): React.JSX.Element {
  const [idx, setIdx] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)

  // reset stepping when the line changes
  useEffect(() => {
    setIdx(0)
    setNotice(null)
  }, [opening.id, line.name])

  const { fen, lastMove } = useMemo(() => {
    const chess = new Chess()
    let last: { from: string; to: string } | null = null
    for (let i = 0; i < idx && i < line.san.length; i++) {
      const mv = chess.move(line.san[i])
      last = { from: mv.from, to: mv.to }
    }
    return { fen: chess.fen(), lastMove: last }
  }, [line, idx])

  const moveText = useMemo(() => {
    const parts: Array<{ text: string; ply: number | null }> = []
    line.san.forEach((san, i) => {
      if (i % 2 === 0) parts.push({ text: `${i / 2 + 1}.`, ply: null })
      parts.push({ text: san, ply: i + 1 })
    })
    return parts
  }, [line])

  async function addToRepertoire(color: 'white' | 'black'): Promise<void> {
    try {
      const nodes = await api.repertoire.addOpeningLine({
        color,
        sanMoves: line.san,
        openingName: opening.name,
        lineName: line.name,
        comment: line.note
      })
      setNotice(`Added ${nodes.length} of your moves to the ${color} repertoire — they are due for practice today.`)
    } catch (e) {
      setNotice((e as Error).message)
    }
  }

  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 18 }}>
      <div style={{ flex: '0 1 440px', minWidth: 300 }}>
        <Board fen={fen} lastMove={lastMove} maxWidth={440} />
        <div className="row" style={{ marginTop: 8, justifyContent: 'center' }}>
          <button className="small" onClick={() => setIdx(0)}>⏮</button>
          <button className="small" onClick={() => setIdx(Math.max(0, idx - 1))}>◀</button>
          <span className="muted" style={{ minWidth: 60, textAlign: 'center' }}>
            {idx}/{line.san.length}
          </span>
          <button className="small" onClick={() => setIdx(Math.min(line.san.length, idx + 1))}>▶</button>
          <button className="small" onClick={() => setIdx(line.san.length)}>⏭</button>
        </div>
      </div>
      <div className="col" style={{ flex: 1, minWidth: 240 }}>
        <h3 style={{ margin: 0 }}>
          {opening.name} <span className="muted">· {line.name}</span>
        </h3>
        <div className="move-list">
          {moveText.map((t, i) =>
            t.ply === null ? (
              <span key={i} className="num">{t.text}</span>
            ) : (
              <span key={i} className={`mv ${t.ply === idx ? 'current' : ''}`} onClick={() => setIdx(t.ply!)}>
                {t.text}
              </span>
            )
          )}
        </div>
        {line.note && <div className="callout">{line.note}</div>}
        <div className="row" style={{ flexWrap: 'wrap' }}>
          <button
            className={`small ${opening.side === 'white' ? 'primary' : ''}`}
            onClick={() => void addToRepertoire('white')}
          >
            Add to White repertoire
          </button>
          <button
            className={`small ${opening.side === 'black' ? 'primary' : ''}`}
            onClick={() => void addToRepertoire('black')}
          >
            Add to Black repertoire
          </button>
        </div>
        {notice && <div className="callout success">{notice}</div>}
      </div>
    </div>
  )
}

function Library(): React.JSX.Element {
  const [openingId, setOpeningId] = useState(OPENINGS[0].id)
  const [lineIdx, setLineIdx] = useState(0)
  const opening = OPENINGS.find((o) => o.id === openingId) ?? OPENINGS[0]
  const line = opening.lines[Math.min(lineIdx, opening.lines.length - 1)]

  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 16 }}>
      <div className="card" style={{ width: 250, flexShrink: 0, maxHeight: 620, overflowY: 'auto', padding: 10 }}>
        {OPENINGS.map((o) => (
          <div key={o.id}>
            <button
              className={`nav-item ${o.id === openingId ? 'active' : ''}`}
              onClick={() => {
                setOpeningId(o.id)
                setLineIdx(0)
              }}
              title={o.summary}
            >
              <span style={{ flex: 1 }}>{o.name}</span>
              <span className="muted mono" style={{ fontSize: 10.5 }}>{o.eco}</span>
            </button>
            {o.id === openingId &&
              o.lines.map((l, i) => (
                <button
                  key={l.name}
                  className={`nav-item ${i === lineIdx ? 'active' : ''}`}
                  style={{ paddingLeft: 24, fontSize: 12.5 }}
                  onClick={() => setLineIdx(i)}
                >
                  {l.name}
                </button>
              ))}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="muted" style={{ marginTop: 0 }}>{opening.summary}</p>
        <LineViewer opening={opening} line={line} />
      </div>
    </div>
  )
}

export function Openings(): React.JSX.Element {
  const [tab, setTab] = useState<'repertoire' | 'library'>('repertoire')
  const [color, setColor] = useState<'white' | 'black'>('white')
  const [nodes, setNodes] = useState<RepertoireNodeRecord[]>([])
  const [selected, setSelected] = useState<RepertoireNodeRecord | null>(null)
  const [practice, setPractice] = useState<RepertoireNodeRecord[] | null>(null)

  const refresh = useCallback(() => {
    void api.repertoire.list(color).then(setNodes)
  }, [color])
  useEffect(refresh, [refresh])
  useAppEvent(['repertoire:changed'], refresh)

  // count only positions where the user is to move — opponent replies are auto-played in practice
  const dueCount = useMemo(
    () =>
      nodes.filter(
        (n) =>
          n.dueAt &&
          n.dueAt <= new Date().toISOString() &&
          n.fenBefore.split(' ')[1] === (n.color === 'white' ? 'w' : 'b')
      ).length,
    [nodes]
  )

  const sorted = useMemo(
    () =>
      [...nodes].sort((a, b) => moveNumberOf(a) - moveNumberOf(b) || a.fenBefore.localeCompare(b.fenBefore)),
    [nodes]
  )

  async function startPractice(): Promise<void> {
    const due = await api.repertoire.due()
    setPractice(due.filter((n) => n.color === color))
  }

  const previewFenAfter = useMemo(() => {
    if (!selected) return null
    try {
      const chess = new Chess(selected.fenBefore)
      chess.move({
        from: selected.moveUci.slice(0, 2),
        to: selected.moveUci.slice(2, 4),
        promotion: selected.moveUci.slice(4) || undefined
      })
      return chess.fen()
    } catch {
      return selected.fenBefore
    }
  }, [selected])

  if (practice) {
    return (
      <div>
        <h1>Opening practice</h1>
        <p className="subtitle">Repertoire recall — the app shows a position, you play your prepared move.</p>
        <Practice
          due={practice}
          onDone={() => {
            setPractice(null)
            refresh()
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Openings</h1>
      <p className="subtitle">
        Your repertoire, built from your own games, reviews, and the openings library. Lines are scheduled with
        spaced repetition.
      </p>

      <div className="tabs">
        <button className={tab === 'repertoire' ? 'active' : ''} onClick={() => setTab('repertoire')}>
          My repertoire
        </button>
        <button className={tab === 'library' ? 'active' : ''} onClick={() => setTab('library')}>
          Openings library
        </button>
      </div>

      {tab === 'library' ? (
        <Library />
      ) : (
        <>
      <div className="row" style={{ marginBottom: 14 }}>
        <div className="tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>
          <button className={color === 'white' ? 'active' : ''} onClick={() => setColor('white')}>
            As White
          </button>
          <button className={color === 'black' ? 'active' : ''} onClick={() => setColor('black')}>
            As Black
          </button>
        </div>
        <div className="spacer" style={{ flex: 1 }} />
        <button className="primary" disabled={dueCount === 0} onClick={() => void startPractice()}>
          Practice due lines ({dueCount})
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 36 }}>
          <p>No repertoire lines yet for {color}.</p>
          <p className="muted">
            Open a game review and click “Add opening line to repertoire”, or analyze games to find where you leave
            book.
          </p>
        </div>
      ) : (
        <div className="row" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <table className="data">
              <thead>
                <tr>
                  <th>Move</th>
                  <th>Your move</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((n) => (
                  <tr
                    key={n.id}
                    className={`clickable ${selected?.id === n.id ? 'selected' : ''}`}
                    onClick={() => setSelected(n)}
                  >
                    <td className="muted">{moveNumberOf(n)}.</td>
                    <td className="mono">
                      <b>{n.moveSan}</b>
                    </td>
                    <td>
                      <span className={`badge ${n.status === 'known' ? 'green' : n.status === 'lapsed' ? 'red' : 'blue'}`}>
                        {n.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={n.priority}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => void api.repertoire.setPriority(n.id, e.target.value as RepertoireNodeRecord['priority'])}
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="muted">{n.dueAt ? n.dueAt.slice(0, 10) : '—'}</td>
                    <td>
                      <button
                        className="small danger"
                        onClick={(e) => {
                          e.stopPropagation()
                          void api.repertoire.delete(n.id)
                        }}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selected && previewFenAfter && (
            <div className="card" style={{ width: 300, flexShrink: 0 }}>
              <h3>After {selected.moveSan}</h3>
              <Board
                fen={previewFenAfter}
                orientation={color}
                maxWidth={268}
                showCoordinates={false}
                evalTarget={false}
                allowFlip={false}
              />
              {selected.comment && <p className="muted">{selected.comment}</p>}
            </div>
          )}
        </div>
      )}
        </>
      )}
    </div>
  )
}
