import { useEffect, useMemo, useRef, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import { Chessboard, BORDER_TYPE, INPUT_EVENT_TYPE, type ArrowType, type MoveInputEvent } from 'cm-chessboard'
import { Markers, MARKER_TYPE } from 'cm-chessboard/src/extensions/markers/Markers.js'
import { Arrows, ARROW_TYPE } from 'cm-chessboard/src/extensions/arrows/Arrows.js'
import {
  PromotionDialog,
  PROMOTION_DIALOG_RESULT_TYPE
} from 'cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js'
import {
  RightClickAnnotator,
  ARROW_TYPE as ANNOTATION_ARROW_TYPE,
  MARKER_TYPE as ANNOTATION_MARKER_TYPE
} from 'cm-chessboard/src/extensions/right-click-annotator/RightClickAnnotator.js'
import 'cm-chessboard/assets/chessboard.css'
import 'cm-chessboard/assets/extensions/markers/markers.css'
import 'cm-chessboard/assets/extensions/arrows/arrows.css'
import 'cm-chessboard/assets/extensions/promotion-dialog/promotion-dialog.css'
import piecesStandardRaw from 'cm-chessboard/assets/pieces/standard.svg?raw'
import piecesStauntyRaw from 'cm-chessboard/assets/pieces/staunty.svg?raw'
import markersRaw from 'cm-chessboard/assets/extensions/markers/markers.svg?raw'
import arrowsRaw from 'cm-chessboard/assets/extensions/arrows/arrows.svg?raw'
import { useStore, useEvalTarget } from '../store'
import { playSound } from '../sound'
import { SEVERITY_GLYPH, SEVERITY_LABEL } from '../severity'
import type { BoardColorScheme, MistakeSeverity, PieceSet } from '@shared/types'
import type { MarkerType } from 'cm-chessboard'

// cm-chessboard resolves sprites from cached hidden divs (assetsCache). We inject
// the sprites ourselves from bundled raw SVG so they work in dev (http) and in the
// packaged app (file://) without any fetch.
const PIECE_SPRITES: Record<PieceSet, string> = { standard: piecesStandardRaw, staunty: piecesStauntyRaw }

function injectSprite(id: string, svgText: string, key: string): void {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.style.position = 'absolute'
    el.style.transform = 'scale(0)'
    el.setAttribute('aria-hidden', 'true')
    document.body.appendChild(el)
  }
  if (el.dataset.key !== key) {
    el.innerHTML = svgText
    el.dataset.key = key
  }
}

function ensureSprites(pieceSet: PieceSet): void {
  injectSprite('cm-chessboard-sprite', PIECE_SPRITES[pieceSet] ?? piecesStandardRaw, pieceSet)
  injectSprite('cm-chessboard-markers', markersRaw, 'markers')
  injectSprite('cm-chessboard-arrows', arrowsRaw, 'arrows')
}

const THEME_CSS_CLASS: Record<BoardColorScheme, string> = {
  green: 'green',
  brown: 'chess-club',
  blue: 'blue',
  gray: 'black-and-white',
  classic: 'default',
  contrast: 'default-contrast'
}

/** Engine best-move arrow: own identity + css class so it never collides with prop arrows or user annotations. */
const ENGINE_ARROW_TYPE: ArrowType = { class: 'arrow-engine' }

/** Critical-move frames: own identities (stock css classes) so add/remove stays scoped to this feature. */
const SEVERITY_MARKERS: Record<MistakeSeverity, MarkerType> = {
  blunder: { class: 'marker-frame-danger', slice: 'markerFrame' },
  'missed-win': { class: 'marker-frame-danger', slice: 'markerFrame' },
  'missed-draw': { class: 'marker-frame-danger', slice: 'markerFrame' },
  mistake: { class: 'marker-frame-warning', slice: 'markerFrame' },
  inaccuracy: { class: 'marker-frame-primary', slice: 'markerFrame' }
}

/** Arrow types drawn from the `arrows` prop — cleared/redrawn as a group when the prop changes. */
const PROP_ARROW_TYPES: ArrowType[] = [ARROW_TYPE.success, ARROW_TYPE.warning, ARROW_TYPE.info, ARROW_TYPE.danger]

function arrowTypeOf(color?: string): ArrowType {
  switch (color) {
    case 'green':
      return ARROW_TYPE.success
    case 'red':
      return ARROW_TYPE.danger
    case 'blue':
      return ARROW_TYPE.info
    default:
      return ARROW_TYPE.warning
  }
}

export interface BoardArrow {
  from: string
  to: string
  color?: string
}

export interface BoardProps {
  fen: string
  orientation?: 'white' | 'black'
  interactive?: boolean
  lastMove?: { from: string; to: string } | null
  /** When set, the last move is framed in the severity color (critical-move marking). */
  lastMoveSeverity?: MistakeSeverity | null
  markedSquares?: string[]
  arrows?: BoardArrow[]
  showCoordinates?: boolean
  legalHints?: boolean
  /** Called with a legal move attempt. The board is fully controlled: parent decides whether fen changes. */
  onMove?: (uci: string, san: string) => void
  maxWidth?: number
  /** Report this board's position to the global live engine evaluation (default true; previews opt out). */
  evalTarget?: boolean
  /** Show the flip control on the board (default true; small previews opt out). */
  allowFlip?: boolean
  /** Override the color scheme from settings (used by the settings preview). */
  themeOverride?: BoardColorScheme
  /** Override the piece set from settings (used by the settings preview). */
  pieceSetOverride?: PieceSet
}

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

/** Top-right-corner percent position of a square, in board display space (accounts for orientation). */
function squareBadgePosition(square: string, orientation: 'white' | 'black'): { left: string; top: string } {
  const file = square.charCodeAt(0) - 97 // a=0..h=7
  const rank = parseInt(square[1], 10) - 1 // 1=0..8=7
  const col = orientation === 'white' ? file : 7 - file
  const row = orientation === 'white' ? 7 - rank : rank
  return { left: `${(col + 1) * 12.5}%`, top: `${row * 12.5}%` }
}

export function Board({
  fen,
  orientation = 'white',
  interactive = false,
  lastMove = null,
  lastMoveSeverity = null,
  markedSquares = [],
  arrows = [],
  showCoordinates = true,
  legalHints = true,
  onMove,
  maxWidth,
  evalTarget = true,
  allowFlip = true,
  themeOverride,
  pieceSetOverride
}: BoardProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [board, setBoard] = useState<Chessboard | null>(null)
  const [flipped, setFlipped] = useState(false)
  const effOrientation: 'white' | 'black' = flipped
    ? orientation === 'white'
      ? 'black'
      : 'white'
    : orientation
  const settings = useStore((s) => s.settings)
  const theme: BoardColorScheme = themeOverride ?? settings?.boardTheme ?? 'green'
  const pieceSet: PieceSet = pieceSetOverride ?? settings?.pieceSet ?? 'standard'

  const chess = useMemo(() => {
    try {
      return new Chess(fen)
    } catch {
      return new Chess()
    }
  }, [fen])

  const safeFen = chess.fen()
  useEvalTarget(evalTarget ? safeFen : null)

  // latest-value refs so the (stable) move-input handler sees current state
  const chessRef = useRef(chess)
  chessRef.current = chess
  const fenRef = useRef(safeFen)
  fenRef.current = safeFen
  const onMoveRef = useRef(onMove)
  onMoveRef.current = onMove
  const legalHintsRef = useRef(legalHints)
  legalHintsRef.current = legalHints
  const boardRef = useRef<Chessboard | null>(null)
  boardRef.current = board

  // create / recreate the board on structural changes
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    ensureSprites(pieceSet)
    const cb = new Chessboard(el, {
      position: fenRef.current,
      orientation: effOrientation === 'black' ? 'b' : 'w',
      responsive: true,
      assetsUrl: '',
      assetsCache: true,
      style: {
        cssClass: THEME_CSS_CLASS[theme] ?? 'green',
        showCoordinates,
        borderType: BORDER_TYPE.none,
        animationDuration: 200
      },
      extensions: [{ class: Markers }, { class: Arrows }, { class: PromotionDialog }, { class: RightClickAnnotator }]
    })
    setBoard(cb)
    return () => {
      setBoard(null)
      cb.destroy()
    }
    // orientation is applied by its own effect; recreate only for structural props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, pieceSet, showCoordinates])

  // position
  useEffect(() => {
    if (board) void board.setPosition(safeFen, true)
  }, [board, safeFen])

  // orientation (prop + user flip)
  useEffect(() => {
    if (board && board.getOrientation() !== (effOrientation === 'black' ? 'b' : 'w')) {
      void board.setOrientation(effOrientation === 'black' ? 'b' : 'w', false)
    }
  }, [board, effOrientation])

  // last move + marked squares
  const markedKey = markedSquares.join(',')
  useEffect(() => {
    if (!board?.removeMarkers) return
    board.removeMarkers(MARKER_TYPE.square)
    board.removeMarkers(MARKER_TYPE.circlePrimary)
    for (const t of Object.values(SEVERITY_MARKERS)) board.removeMarkers(t)
    if (lastMove) {
      board.addMarker?.(MARKER_TYPE.square, lastMove.from)
      board.addMarker?.(MARKER_TYPE.square, lastMove.to)
      // critical move: frame the move in the severity color
      const severityMarker = lastMoveSeverity ? SEVERITY_MARKERS[lastMoveSeverity] : null
      if (severityMarker) {
        board.addMarker?.(severityMarker, lastMove.from)
        board.addMarker?.(severityMarker, lastMove.to)
      }
    }
    for (const sq of markedKey ? markedKey.split(',') : []) {
      board.addMarker?.(MARKER_TYPE.circlePrimary, sq)
    }
  }, [board, safeFen, lastMove, lastMoveSeverity, markedKey])

  // arrows from props (only touch prop-arrow types: user annotations and the engine arrow survive)
  const arrowsKey = arrows.map((a) => `${a.from}${a.to}:${a.color ?? ''}`).join(' ')
  useEffect(() => {
    if (!board?.removeArrows) return
    for (const t of PROP_ARROW_TYPES) board.removeArrows(t)
    for (const a of arrows) board.addArrow?.(arrowTypeOf(a.color), a.from, a.to)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, arrowsKey])

  // right-click annotations are per-position: clear them when the position changes
  useEffect(() => {
    if (!board?.removeArrows) return
    for (const t of Object.values(ANNOTATION_ARROW_TYPE)) board.removeArrows(t)
    for (const t of Object.values(ANNOTATION_MARKER_TYPE)) board.removeMarkers?.(t)
  }, [board, safeFen])

  // engine best-move arrow while the live engine is on and looking at this board
  const evalEnabled = useStore((s) => s.evalEnabled)
  const evalUpdate = useStore((s) => s.evalUpdate)
  const engineMove =
    evalTarget && evalEnabled && evalUpdate && evalUpdate.fen === safeFen
      ? evalUpdate.multiPv[0]?.moveUci ?? null
      : null
  useEffect(() => {
    if (!board?.removeArrows) return
    board.removeArrows(ENGINE_ARROW_TYPE)
    if (engineMove && engineMove.length >= 4) {
      board.addArrow?.(ENGINE_ARROW_TYPE, engineMove.slice(0, 2), engineMove.slice(2, 4))
    }
  }, [board, engineMove])

  // move input
  useEffect(() => {
    if (!board || !interactive) return

    const syncToProp = (): void => {
      try {
        const b = boardRef.current
        if (b) void b.setPosition(fenRef.current, false)
      } catch {
        /* board destroyed in the meantime */
      }
    }

    const emitMove = (uci: string, san: string): void => {
      onMoveRef.current?.(uci, san)
      // Controlled board: if the parent rejected the move the fen prop is unchanged,
      // so snap the pieces back; if it accepted, this is a no-op.
      window.setTimeout(syncToProp, 0)
    }

    board.enableMoveInput((event: MoveInputEvent) => {
      const current = chessRef.current
      switch (event.type) {
        case INPUT_EVENT_TYPE.moveInputStarted: {
          const from = event.squareFrom as Square
          const piece = current.get(from)
          if (!piece || piece.color !== current.turn()) return false
          const moves = current.moves({ square: from, verbose: true })
          if (moves.length === 0) return false
          if (legalHintsRef.current) event.chessboard.addLegalMovesMarkers?.(moves)
          return true
        }
        case INPUT_EVENT_TYPE.validateMoveInput: {
          event.chessboard.removeLegalMovesMarkers?.()
          const from = event.squareFrom as Square
          const to = event.squareTo as Square
          const probe = new Chess(fenRef.current)
          let mv
          try {
            mv = probe.move({ from, to, promotion: 'q' })
          } catch {
            return false
          }
          if (mv.promotion) {
            event.chessboard.showPromotionDialog?.(to, current.turn(), (result) => {
              if (result.type === PROMOTION_DIALOG_RESULT_TYPE.pieceSelected && result.piece) {
                const promo = result.piece.charAt(1)
                const probe2 = new Chess(fenRef.current)
                const mv2 = probe2.move({ from, to, promotion: promo })
                playSound(probe2.inCheck() ? 'check' : mv2.captured ? 'capture' : 'move')
                emitMove(mv2.from + mv2.to + promo, mv2.san)
              } else {
                syncToProp()
              }
            })
            return true
          }
          playSound(probe.inCheck() ? 'check' : mv.captured ? 'capture' : 'move')
          emitMove(mv.from + mv.to, mv.san)
          return true
        }
        case INPUT_EVENT_TYPE.moveInputCanceled:
        case INPUT_EVENT_TYPE.moveInputFinished:
          event.chessboard.removeLegalMovesMarkers?.()
          return undefined
        default:
          return undefined
      }
    })
    return () => {
      // on unmount the creation effect may have destroyed the board already
      try {
        board.disableMoveInput()
      } catch {
        /* board already destroyed */
      }
    }
  }, [board, interactive])

  return (
    <div
      className="board-wrap"
      style={maxWidth ? { maxWidth } : undefined}
      role="group"
      aria-label={`Chess board, ${chess.turn() === 'w' ? 'white' : 'black'} to move`}
    >
      <div ref={containerRef} className="cm-board-container" />
      {lastMoveSeverity && lastMove && (
        <span
          className={`board-severity-badge ${SEVERITY_GLYPH[lastMoveSeverity].cls}`}
          style={squareBadgePosition(lastMove.to, effOrientation)}
          title={SEVERITY_LABEL[lastMoveSeverity]}
          aria-hidden="true"
        >
          {SEVERITY_GLYPH[lastMoveSeverity].glyph}
        </span>
      )}
      {allowFlip && (
        <button
          type="button"
          className="board-flip-btn"
          title={`Flip board (currently ${effOrientation} at the bottom)`}
          onClick={() => setFlipped((f) => !f)}
        >
          ⇵ Flip
        </button>
      )}
    </div>
  )
}

export { START_FEN }
