import type { MistakeSeverity } from '@shared/types'

export const SEVERITY_LABEL: Record<string, string> = {
  blunder: 'Blunder',
  mistake: 'Mistake',
  inaccuracy: 'Inaccuracy',
  'missed-win': 'Missed win',
  'missed-draw': 'Missed draw'
}

export const SEVERITY_GLYPH: Record<MistakeSeverity, { glyph: string; cls: string }> = {
  blunder: { glyph: '??', cls: 'sev-blunder' },
  'missed-win': { glyph: '??', cls: 'sev-blunder' },
  mistake: { glyph: '?', cls: 'sev-mistake' },
  'missed-draw': { glyph: '?', cls: 'sev-mistake' },
  inaccuracy: { glyph: '?!', cls: 'sev-inaccuracy' }
}
