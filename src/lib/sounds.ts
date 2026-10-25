type SoundKind = "hover" | "click";

const STORAGE_KEY = "zehanxtech-sound";

let audioCtx: AudioContext | null = null;
let enabled = true;
let unlocked = false; // becomes true on the first user gesture (keydown/pointerdown)
let lastHover: Element | null = null;
const listeners = new Set<(enabled: boolean) => void>();

function readStored(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function isSoundEnabled(): boolean {
  return enabled;
}

export function setSoundEnabled(next: boolean): void {
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // storage unavailable (private mode) — keep session-only state
  }
  listeners.forEach((listener) => listener(next));
}

export function onSoundEnabledChange(
  cb: (enabled: boolean) => void,
): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  return audioCtx;
}

interface Tone {
  freq: number;
  endFreq?: number;
  duration: number;
  gain: number;
  type: OscillatorType;
  delay?: number;
}

function playTone(ctx: AudioContext, tone: Tone): void {
  const t0 = ctx.currentTime + (tone.delay ?? 0);
  const osc = ctx.createOscillator();
  osc.type = tone.type;
  osc.frequency.setValueAtTime(tone.freq, t0);
  if (tone.endFreq) {
    osc.frequency.exponentialRampToValueAtTime(tone.endFreq, t0 + tone.duration);
  }
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(tone.gain, t0 + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + tone.duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + tone.duration + 0.02);
}

const TONES: Record<SoundKind, Tone[]> = {
  // Short, airy "blip" — light enough to fire on every hover.
  hover: [
    { freq: 1900, endFreq: 2600, duration: 0.055, gain: 0.045, type: "sine" },
    { freq: 3400, duration: 0.03, gain: 0.015, type: "triangle", delay: 0.012 },
  ],
  // Deeper, rounded confirmation tone for presses.
  click: [
    { freq: 660, endFreq: 1180, duration: 0.09, gain: 0.06, type: "triangle" },
    { freq: 220, duration: 0.12, gain: 0.035, type: "sine", delay: 0.02 },
  ],
};

function playSound(kind: SoundKind): void {
  if (!enabled || !unlocked) return; // silent until the first user gesture
  const ctx = ensureCtx();
  if (!ctx || ctx.state !== "running") return;
  for (const tone of TONES[kind]) playTone(ctx, tone);
}

function closestInteractive(target: EventTarget | null): Element | null {
  return (target as HTMLElement | null)?.closest?.("a, button") ?? null;
}

/**
 * Wires document-level hover/press sounds. Audio is synthesised with the Web
 * Audio API, so no assets load. Browsers block audio until the first user
 * gesture, so the context is created on the first pointer press and hover
 * ticks stay silent before that.
 */
export function attachSoundTriggers(): () => void {
  if (typeof window === "undefined") return () => {};
  enabled = readStored();

  const onMouseOver = (e: MouseEvent) => {
    const target = closestInteractive(e.target);
    if (!target) {
      lastHover = null;
      return;
    }
    if (target === lastHover) return;
    lastHover = target;
    playSound("hover");
  };

  const onMouseOut = (e: MouseEvent) => {
    if (lastHover && !lastHover.contains(e.relatedTarget as Node | null)) {
      lastHover = null;
    }
  };

  // Browsers only allow audio after a real interaction. The context is
  // created here — never earlier — so nothing warns before this point.
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    const ctx = ensureCtx();
    if (ctx && ctx.state === "suspended") {
      void ctx.resume();
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    unlock();
    if (closestInteractive(e.target)) playSound("click");
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab" || e.key === "Enter" || e.key === " ") unlock();
  };

  // Also unlock on mouse move to reduce delay
  const onMouseMove = () => {
    unlock();
  };

  // Unlock on scroll as well
  const onScroll = () => {
    unlock();
  };

  document.addEventListener("mouseover", onMouseOver);
  document.addEventListener("mouseout", onMouseOut);
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("mousemove", onMouseMove, { once: true });
  document.addEventListener("scroll", onScroll, { once: true, passive: true });
  return () => {
    document.removeEventListener("mouseover", onMouseOver);
    document.removeEventListener("mouseout", onMouseOut);
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeyDown);
    // No need to remove mousemove/scroll as they're { once: true }
    lastHover = null;
  };
}
