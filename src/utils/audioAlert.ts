/**
 * Web Audio API synthesized audio alert simulation
 * Creates a crisp, dual-tone attention-grabbing acoustic chime for drowsiness warning demo.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playDrowsinessAlertSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Dual-tone urgent alert chime (880Hz -> 1760Hz pulse)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.12);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1760, now + 0.15); // A6
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.15);

    osc2.start(now + 0.15);
    osc2.stop(now + 0.45);
  } catch (e) {
    console.warn('Audio alert simulation not supported or blocked by browser policy:', e);
  }
}
