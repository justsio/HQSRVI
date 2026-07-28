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

function tone({ freq = 440, type = 'sine', start = 0, duration = 0.18, gain = 0.18, slide = 0 }) {
  const ctx = getCtx();
  if (!ctx) return;
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(Math.max(freq * 4, 2000), t0);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slide) osc.frequency.exponentialRampToValueAtTime(freq + slide, t0 + duration);
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(filter);
  filter.connect(env);
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

// Bigger success fanfare (layered with soft harmonics).
export function playSuccess() {
  tone({ freq: 523.25, type: 'sine', start: 0, duration: 0.18, gain: 0.16 });
  tone({ freq: 659.25, type: 'sine', start: 0.11, duration: 0.18, gain: 0.16 });
  tone({ freq: 783.99, type: 'sine', start: 0.22, duration: 0.18, gain: 0.16 });
  tone({ freq: 1046.5, type: 'sine', start: 0.33, duration: 0.36, gain: 0.18 });
  tone({ freq: 2093, type: 'sine', start: 0.33, duration: 0.3, gain: 0.05 });
}

// Satisfying "coin" reward when the user completes a share.
export function playShare() {
  tone({ freq: 987.77, type: 'square', start: 0, duration: 0.08, gain: 0.07 }); // B5
  tone({ freq: 1318.51, type: 'square', start: 0.08, duration: 0.22, gain: 0.08 }); // E6
  tone({ freq: 1318.51, type: 'sine', start: 0.08, duration: 0.24, gain: 0.12 });
}

// Big celebration when the user becomes eligible for the draw.
export function playCelebrate() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  notes.forEach((freq, i) => {
    tone({ freq, type: 'triangle', start: i * 0.09, duration: 0.2, gain: 0.15 });
    tone({ freq: freq * 2, type: 'sine', start: i * 0.09, duration: 0.18, gain: 0.05 });
  });
  tone({ freq: 1568, type: 'sine', start: 0.5, duration: 0.5, gain: 0.16, slide: 200 });
}
