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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
