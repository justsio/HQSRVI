// Lightweight sound effects using the Web Audio API (no asset files needed).
let audioCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function tone({ freq = 440, type = 'sine', start = 0, duration = 0.18, gain = 0.18 }) {
  const ctx = getCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(env);
  env.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

// Short tap when interacting.
export function playClick() {
  tone({ freq: 660, type: 'triangle', duration: 0.12, gain: 0.15 });
}

// Gentle two-note "ding" for a new-winner notification.
export function playNotify() {
  tone({ freq: 880, type: 'sine', start: 0, duration: 0.14, gain: 0.12 });
  tone({ freq: 1174.66, type: 'sine', start: 0.09, duration: 0.2, gain: 0.13 });
}

// Cheerful ascending chime that signals "let's register / you won".
export function playRegister() {
  tone({ freq: 523.25, type: 'triangle', start: 0, duration: 0.16, gain: 0.16 }); // C5
  tone({ freq: 659.25, type: 'triangle', start: 0.1, duration: 0.16, gain: 0.16 }); // E5
  tone({ freq: 783.99, type: 'triangle', start: 0.2, duration: 0.26, gain: 0.18 }); // G5
}

// Bigger success fanfare.
export function playSuccess() {
  tone({ freq: 523.25, type: 'sine', start: 0, duration: 0.18, gain: 0.18 });
  tone({ freq: 659.25, type: 'sine', start: 0.12, duration: 0.18, gain: 0.18 });
  tone({ freq: 783.99, type: 'sine', start: 0.24, duration: 0.18, gain: 0.18 });
  tone({ freq: 1046.5, type: 'sine', start: 0.36, duration: 0.34, gain: 0.2 });
}
