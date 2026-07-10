export type SoundKind = 'move' | 'capture' | 'check' | 'correct' | 'wrong' | 'complete'

let ctx: AudioContext | null = null
let enabled = true

export function setSoundEnabled(on: boolean): void {
  enabled = on
}

function getCtx(): AudioContext | null {
  if (!enabled) return null
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** One synthesized tone: frequency in Hz, duration in seconds. */
function tone(freq: number, duration: number, startAt: number, type: OscillatorType = 'sine', gain = 0.08): void {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.value = gain
  g.gain.setValueAtTime(gain, c.currentTime + startAt)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startAt + duration)
  osc.connect(g)
  g.connect(c.destination)
  osc.start(c.currentTime + startAt)
  osc.stop(c.currentTime + startAt + duration)
}

/** Small synthesized cues — no bundled audio assets required. */
export function playSound(kind: SoundKind): void {
  if (!getCtx()) return
  switch (kind) {
    case 'move':
      tone(520, 0.05, 0)
      break
    case 'capture':
      tone(340, 0.07, 0, 'triangle')
      break
    case 'check':
      tone(660, 0.08, 0, 'square', 0.05)
      tone(880, 0.09, 0.06, 'square', 0.05)
      break
    case 'correct':
      tone(523.25, 0.09, 0)
      tone(783.99, 0.14, 0.09)
      break
    case 'wrong':
      tone(220, 0.18, 0, 'sawtooth', 0.06)
      break
    case 'complete':
      tone(523.25, 0.1, 0)
      tone(659.25, 0.1, 0.1)
      tone(783.99, 0.2, 0.2)
      break
  }
}
