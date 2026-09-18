/**
 * EL Tacos and Burritos — Notification Sound Service
 * 
 * Safely handles local audio playback for new order notifications.
 * Implements browser autoplay / gesture policy safety without crashing
 * or showing intrusive errors to the user.
 */

import notificationBellUrl from '../assets/sounds/notification-bell.mp3';

let audioElement = null;

/**
 * Lazily initialize HTML5 Audio element
 */
function getAudioElement() {
  if (!audioElement && typeof window !== 'undefined' && typeof Audio !== 'undefined') {
    try {
      audioElement = new Audio(notificationBellUrl);
      audioElement.preload = 'auto';
    } catch (e) {
      // Audio element initialization fallback
      audioElement = null;
    }
  }
  return audioElement;
}

/**
 * Failsafe Web Audio API harmonic bell chime
 * Produces a warm, pleasant restaurant desk bell tone (dual-tone harmonic chime)
 * if HTML5 Audio is blocked or unavailable.
 */
function playSynthesizedBell() {
  if (typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Chime 1 (Fundamental ~880Hz A5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.8);

    // Chime 2 (Harmonic ~1174.66Hz D6, slight delay)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1174.66, now + 0.1);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.setValueAtTime(0.28, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 1.2);
  } catch (err) {
    // Silently ignore Web Audio restrictions
  }
}

/**
 * Unlock browser audio permission on first interaction
 */
if (typeof window !== 'undefined') {
  const unlockAudioContext = () => {
    const audio = getAudioElement();
    if (audio) {
      audio.load();
    }
    window.removeEventListener('click', unlockAudioContext);
    window.removeEventListener('keydown', unlockAudioContext);
    window.removeEventListener('touchstart', unlockAudioContext);
  };

  window.addEventListener('click', unlockAudioContext, { once: true });
  window.addEventListener('keydown', unlockAudioContext, { once: true });
  window.addEventListener('touchstart', unlockAudioContext, { once: true });
}

/**
 * Play the new order notification chime.
 * Gracefully handles browser autoplay restrictions without crashing or showing errors.
 */
export function playNotificationSound() {
  if (typeof window === 'undefined') return;

  try {
    const audio = getAudioElement();
    if (audio) {
      audio.currentTime = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was blocked by the browser because user hasn't interacted yet.
          // Fallback to Web Audio synthesis or gracefully continue without throwing.
          try {
            playSynthesizedBell();
          } catch (_) {}
        });
      }
    } else {
      playSynthesizedBell();
    }
  } catch (err) {
    // Prevent unhandled errors from affecting the React application
  }
}

export default {
  playNotificationSound,
};
