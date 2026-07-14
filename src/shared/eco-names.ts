// ECO code → readable opening family name. Exact hits come from the openings library;
// everything else falls back to the standard ECO volume ranges (A/B/C/D/E), which is
// coarse but always gives a real name instead of a bare code like "D00".
import { OPENINGS } from './openings'

interface EcoRange {
  from: string
  to: string
  name: string
}

const RANGES: EcoRange[] = [
  { from: 'A00', to: 'A39', name: 'Flank opening' },
  { from: 'A40', to: 'A44', name: "Queen's Pawn Game" },
  { from: 'A45', to: 'A49', name: 'Indian Defense' },
  { from: 'A50', to: 'A79', name: 'Benoni / Indian Defense' },
  { from: 'A80', to: 'A99', name: 'Dutch Defense' },
  { from: 'B00', to: 'B19', name: "Uncommon King's Pawn Defense" },
  { from: 'B20', to: 'B99', name: 'Sicilian Defense' },
  { from: 'C00', to: 'C19', name: 'French Defense' },
  { from: 'C20', to: 'C29', name: "King's Pawn Game" },
  { from: 'C30', to: 'C39', name: "King's Gambit" },
  { from: 'C40', to: 'C49', name: 'Open Game' },
  { from: 'C50', to: 'C59', name: 'Italian Game' },
  { from: 'C60', to: 'C99', name: 'Ruy Lopez (Spanish)' },
  { from: 'D00', to: 'D05', name: "Queen's Pawn Game" },
  { from: 'D06', to: 'D69', name: "Queen's Gambit" },
  { from: 'D70', to: 'D99', name: 'Grünfeld Defense' },
  { from: 'E00', to: 'E09', name: 'Catalan Opening' },
  { from: 'E10', to: 'E59', name: 'Nimzo-Indian / Bogo-Indian' },
  { from: 'E60', to: 'E99', name: "King's Indian Defense" }
]

const EXACT = new Map(OPENINGS.map((o) => [o.eco, o.name]))

/** Family name for an ECO code, or null if the code doesn't look valid. */
export function ecoFamilyName(eco: string): string | null {
  const code = eco.trim().toUpperCase()
  if (!/^[A-E]\d{2}$/.test(code)) return null
  const exact = EXACT.get(code)
  if (exact) return exact
  const range = RANGES.find((r) => code >= r.from && code <= r.to)
  return range?.name ?? null
}

/** Best available display label for a game's opening: stored name, else ECO family, else the raw code. */
export function openingLabel(game: { openingName?: string | null; ecoCode?: string | null }): string {
  if (game.openingName) return game.openingName
  if (game.ecoCode) return ecoFamilyName(game.ecoCode) ?? game.ecoCode
  return '—'
}
