import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Lets continuous decorative CSS animations (comet trail, floating title,
// pulsing markers, drifting starfields) pause while the tab/app is
// backgrounded instead of animating unseen — a plain class toggle so it
// costs nothing on the React side. CSS modules opt in per-selector via
// `:global(html.tab-hidden) .foo { animation-play-state: paused }`.
// `animation-play-state: paused` resumes exactly where it left off, so
// there's no visible jump when the tab comes back.
document.documentElement.classList.toggle('tab-hidden', document.hidden);
document.addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('tab-hidden', document.hidden);
});

// Same mechanism, for the same continuous animations, but for active scroll:
// profiling (CPU-throttled trace of a real scroll gesture) showed these CSS
// animations running is the dominant cause of scroll jank — not scroll itself,
// not a scroll listener, not DOM size. Disabling them raised a throttled
// scroll from ~10fps/97% missed frames to ~53fps/46% missed. The Page
// Visibility pause above never helps here since the tab stays visible the
// whole time you're scrolling it.
// The listener is passive (never blocks the scroll) and rAF-coalesced (at
// most one class toggle per animation frame, not one per raw scroll event).
// `is-scrolling` goes on 150ms after the last scroll event stops, restoring
// the exact same idle animation — nothing about the paused/resumed look
// differs from a plain `animation-play-state` pause.
let scrollRafId: number | null = null;
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
window.addEventListener(
  'scroll',
  () => {
    if (scrollStopTimer) clearTimeout(scrollStopTimer);
    if (scrollRafId !== null) return;
    scrollRafId = requestAnimationFrame(() => {
      scrollRafId = null;
      document.documentElement.classList.add('is-scrolling');
    });
    scrollStopTimer = setTimeout(() => {
      document.documentElement.classList.remove('is-scrolling');
    }, 150);
  },
  { passive: true, capture: true }
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
