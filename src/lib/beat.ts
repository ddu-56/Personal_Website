// One beat at ~92 BPM. Keep in sync with --beat in globals.css.
export const BEAT_MS = 652;

// Negative animation-delay that lines a looping CSS animation up with a shared
// clock (performance.now()), so separately-mounted animations hit together.
export function phaseOffset(periodMs: number): string {
  return `${-(performance.now() % periodMs)}ms`;
}
