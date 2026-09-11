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

// Same mechanism, for the same continuous animations, but for active scroll.
// A follow-up GPU-process-raster profile (see the scroll-jank audit) found
// the actual dominant cost was two specific animations — the trail's comet
// and the marker/skip-node pulse glows — which are now fixed at the source
// (an HTML/WAAPI transform-driven comet in TrailSVG.tsx, opacity-crossfade
// pulses in Menu.module.css) instead of leaning on this pause to hide their
// cost. This toggle remains as a safety net for anything else that opts into
// `:global(html.is-scrolling) ...{ animation-play-state: paused }`.
//
// The previous version added the class from a requestAnimationFrame queued
// by the first scroll event, so on a raster-saturated pipeline it could take
// 200-440ms to actually engage — most of a phone flick's dropped frames
// landed in exactly that window (see the audit, "Fix 3"). `classList.add()`
// is a cheap no-op when the class is already present, so there's no need to
// coalesce it through a rAF: add it synchronously on every scroll event and
// let the browser's own event coalescing bound how often this runs. The stop
// timer is re-armed on every event unconditionally (previously it was only
// re-armed when a rAF wasn't already pending), fixing a related bug where
// two scroll events landing in the same animation frame could leave
// `is-scrolling` stuck on until the next scroll gesture cleared it.
let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
window.addEventListener(
  'scroll',
  () => {
    document.documentElement.classList.add('is-scrolling');
    if (scrollStopTimer) clearTimeout(scrollStopTimer);
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
