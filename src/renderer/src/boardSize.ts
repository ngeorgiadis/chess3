import { useState } from 'react'

export const MIN_BOARD_SIZE = 240
export const MAX_BOARD_SIZE = 720

export function clampBoardSize(n: number): number {
  return Math.max(MIN_BOARD_SIZE, Math.min(MAX_BOARD_SIZE, Math.round(n)))
}

const STORAGE_PREFIX = 'cms-board-size:'

/** Persists a drag-resized board's pixel size per usage context (`key`) across sessions. */
export function useBoardSize(key: string, defaultSize: number): [number, (size: number) => void] {
  const [size, setSizeState] = useState<number>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_PREFIX + key)
      const n = stored ? parseInt(stored, 10) : NaN
      return Number.isFinite(n) ? clampBoardSize(n) : defaultSize
    } catch {
      return defaultSize
    }
  })
  const setSize = (next: number): void => {
    const clamped = clampBoardSize(next)
    setSizeState(clamped)
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, String(clamped))
    } catch {
      /* private browsing / storage disabled — size just won't persist */
    }
  }
  return [size, setSize]
}
