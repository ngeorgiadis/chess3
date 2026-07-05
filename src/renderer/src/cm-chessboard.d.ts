// Type shim for cm-chessboard (plain-JS library, no bundled types) and raw svg imports.

declare module '*.svg?raw' {
  const content: string
  export default content
}

declare module 'cm-chessboard' {
  export const COLOR: { white: 'w'; black: 'b' }
  export const INPUT_EVENT_TYPE: {
    moveInputStarted: 'moveInputStarted'
    movingOverSquare: 'movingOverSquare'
    validateMoveInput: 'validateMoveInput'
    moveInputCanceled: 'moveInputCanceled'
    moveInputFinished: 'moveInputFinished'
  }
  export const BORDER_TYPE: { none: 'none'; thin: 'thin'; frame: 'frame' }
  export const FEN: { start: string; empty: string }

  export interface MoveInputEvent {
    chessboard: Chessboard
    type: string
    squareFrom?: string
    squareTo?: string
    piece?: string | null
    legalMove?: boolean
  }

  export interface ChessboardProps {
    position?: string
    orientation?: 'w' | 'b'
    responsive?: boolean
    assetsUrl?: string
    assetsCache?: boolean
    style?: {
      cssClass?: string
      showCoordinates?: boolean
      borderType?: string
      aspectRatio?: number
      pieces?: { file?: string; tileSize?: number }
      animationDuration?: number
    }
    extensions?: Array<{ class: unknown; props?: Record<string, unknown> }>
  }

  export class Chessboard {
    constructor(context: HTMLElement, props?: ChessboardProps)
    setPosition(fen: string, animated?: boolean): Promise<void>
    getPosition(): string
    setOrientation(color: 'w' | 'b', animated?: boolean): Promise<void>
    getOrientation(): 'w' | 'b'
    getPiece(square: string): string | null
    enableMoveInput(handler: (event: MoveInputEvent) => boolean | void, color?: 'w' | 'b'): void
    disableMoveInput(): void
    destroy(): void
    // provided by extensions
    addMarker?: (type: MarkerType, square: string) => void
    removeMarkers?: (type?: MarkerType, square?: string) => void
    addLegalMovesMarkers?: (moves: Array<{ to: string; promotion?: string }>) => void
    removeLegalMovesMarkers?: () => void
    addArrow?: (type: ArrowType, from: string, to: string) => void
    removeArrows?: (type?: ArrowType, from?: string, to?: string) => void
    showPromotionDialog?: (
      square: string,
      color: 'w' | 'b',
      callback: (result: { type: string; square?: string; piece?: string }) => void
    ) => void
    isPromotionDialogShown?: () => boolean
  }

  export interface MarkerType {
    class: string
    slice: string
    position?: string
  }
  export interface ArrowType {
    class: string
  }
}

declare module 'cm-chessboard/src/extensions/markers/Markers.js' {
  import type { MarkerType } from 'cm-chessboard'
  export const MARKER_TYPE: {
    frame: MarkerType
    framePrimary: MarkerType
    frameDanger: MarkerType
    circle: MarkerType
    circlePrimary: MarkerType
    circleDanger: MarkerType
    circleDangerFilled: MarkerType
    square: MarkerType
    dot: MarkerType
    bevel: MarkerType
  }
  export class Markers {
    constructor(...args: unknown[])
  }
}

declare module 'cm-chessboard/src/extensions/arrows/Arrows.js' {
  import type { ArrowType } from 'cm-chessboard'
  export const ARROW_TYPE: {
    default: ArrowType
    success: ArrowType
    secondary: ArrowType
    warning: ArrowType
    info: ArrowType
    danger: ArrowType
  }
  export class Arrows {
    constructor(...args: unknown[])
  }
}

declare module 'cm-chessboard/src/extensions/right-click-annotator/RightClickAnnotator.js' {
  import type { ArrowType, MarkerType } from 'cm-chessboard'
  /** Annotator arrow/marker types are distinct identities from the Arrows/Markers ones. */
  export const ARROW_TYPE: {
    success: ArrowType
    warning: ArrowType
    info: ArrowType
    danger: ArrowType
  }
  export const MARKER_TYPE: {
    success: MarkerType
    warning: MarkerType
    info: MarkerType
    danger: MarkerType
  }
  export class RightClickAnnotator {
    constructor(...args: unknown[])
  }
}

declare module 'cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js' {
  export const PROMOTION_DIALOG_RESULT_TYPE: {
    pieceSelected: 'pieceSelected'
    canceled: 'canceled'
  }
  export class PromotionDialog {
    constructor(...args: unknown[])
  }
}
