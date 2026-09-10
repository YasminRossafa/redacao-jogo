import React, { useRef, useState, useEffect } from 'react';
import styles from './TrailSVG.module.css';

interface Props {
  /** 0–1 fraction of content phases that are completed (drives the glow gradient). */
  completedFraction: number;
  /** y (px, container-relative) where the trail starts — the start circle's
   *  bottom edge. Falls back to the container top before the first measurement. */
  startY?: number;
  /** y (px, container-relative) where the trail ends — the final mission
   *  circle's top edge. Falls back to the container bottom. */
  endY?: number;
}

// The viewBox width now tracks the actual rendered column width (px), so the
// serpentine curve scales to fill the column at every breakpoint instead of
// staying a fixed 320px-wide ribbon floating in a wider desktop column.
// AMP is derived as a fraction of the width (AMP_K), calibrated so that at the
// 375px mobile viewport (.trail offsetWidth = 375) the amplitude is exactly the
// previous fixed 88px — keeping mobile pixel-identical (same amplitude, centre,
// dash distribution). Wider columns scale the curve up proportionally.
const AMP_K = 88 / 375; // ≈ 0.2347 — matches the previous fixed AMP at 375px
const HALF_PERIOD = 270; // target height per half-wave (one left or one right swing)

/** Serpentine from y0 to y1, both on the centre line. The span is divided into a
 *  whole number of half-waves of equal height, so the curve lands exactly on y1
 *  (the final marker's top edge) instead of being cut off mid-swing. */
function buildPath(y0: number, y1: number, w: number, amp: number): string {
  const cx = w / 2;
  const span = y1 - y0;
  if (span <= 0) return `M ${cx} ${y0}`;
  const steps = Math.max(1, Math.round(span / HALF_PERIOD));
  const seg = span / steps;
  let d = `M ${cx} ${y0}`;
  for (let i = 0; i < steps; i++) {
    const ya = y0 + i * seg;
    const yb = y0 + (i + 1) * seg;
    const xPeak = i % 2 === 0 ? cx - amp : cx + amp;
    d += ` C ${xPeak} ${ya + seg * 0.35} ${xPeak} ${ya + seg * 0.65} ${cx} ${yb}`;
  }
  return d;
}

export function TrailSVG({ completedFraction, startY, endY }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [containerH, setContainerH] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(() => {
      setContainerH(parent.offsetHeight);
      setContainerW(parent.offsetWidth);
    });
    ro.observe(parent);
    setContainerH(parent.offsetHeight);
    setContainerW(parent.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const H = containerH || 800;
  const W = containerW || 320;
  const AMP = W * AMP_K;
  // Trail runs marker-to-marker; before the first measurement it spans the
  // whole container so nothing pops in from an empty state.
  const y0 = startY ?? 0;
  const y1 = endY ?? H;
  const pathD = buildPath(y0, y1, W, AMP);
  const cometDash = 38;
  const cometGap = pathLen > 0 ? pathLen - cometDash : 9999;

  useEffect(() => {
    if (pathRef.current && containerH > 0 && containerW > 0) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, [containerH, containerW, pathD]);

  return (
    <div ref={wrapRef} className={styles.wrapper} aria-hidden>
      {W > 0 && H > 0 && (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height={H}
          preserveAspectRatio="none"
          className={styles.svg}
          aria-hidden
        >
          <defs>
            {/* Soft glow filter */}
            <filter id="trail-glow-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Strong glow for the comet */}
            <filter id="trail-glow-comet" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient mask: bright for completed portion, dim below */}
            <linearGradient
              id="trail-progress-grad"
              x1="0" y1="0" x2="0" y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop
                offset={Math.max(0, completedFraction - 0.06).toFixed(3)}
                stopColor="white"
                stopOpacity="1"
              />
              <stop
                offset={Math.min(1, completedFraction + 0.04).toFixed(3)}
                stopColor="white"
                stopOpacity="0.12"
              />
              <stop offset="1" stopColor="white" stopOpacity="0.12" />
            </linearGradient>
            {/* The mask spans only the trail's own extent, so completedFraction
                maps to the marker-to-marker run rather than the whole page. */}
            <mask id="trail-progress-mask">
              <rect
                x="0"
                y={y0}
                width={W}
                height={Math.max(1, y1 - y0)}
                fill="url(#trail-progress-grad)"
              />
            </mask>
          </defs>

          {/* ── Dim full-trail base: fine stardust dots ── */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="rgba(148,163,184,0.16)"
            strokeWidth="2"
            strokeDasharray="1.5 18 2 11 1 24 2.5 13"
            strokeLinecap="round"
          />
          {/* Larger scattered particles */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(148,163,184,0.09)"
            strokeWidth="4.5"
            strokeDasharray="3 55 2 68 3.5 44"
            strokeLinecap="round"
          />

          {/* ── Bright stardust masked to completed portion ── */}
          <g mask="url(#trail-progress-mask)">
            {/* Fine bright stardust */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(147,197,253,0.82)"
              strokeWidth="2"
              strokeDasharray="1.5 18 2 11 1 24 2.5 13"
              strokeLinecap="round"
            />
            {/* Larger bright particles */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(167,139,250,0.6)"
              strokeWidth="4.5"
              strokeDasharray="3 55 2 68 3.5 44"
              strokeLinecap="round"
            />
            {/* Diffuse glow underlayer on completed portion */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(99,179,237,0.3)"
              strokeWidth="10"
              strokeLinecap="round"
              filter="url(#trail-glow-soft)"
            />
          </g>

          {/* ── Animated comet traveling along the trail ── */}
          {pathLen > 0 && (
            <path
              d={pathD}
              fill="none"
              stroke="rgba(224,242,254,0.95)"
              strokeWidth="5"
              strokeDasharray={`${cometDash} ${cometGap}`}
              strokeLinecap="round"
              filter="url(#trail-glow-comet)"
              className={styles.comet}
              style={{ '--trail-len': `${pathLen}` } as React.CSSProperties}
            />
          )}

          {/* Secondary comet tail (softer, slightly behind) */}
          {pathLen > 0 && (
            <path
              d={pathD}
              fill="none"
              stroke="rgba(147,197,253,0.5)"
              strokeWidth="9"
              strokeDasharray={`${cometDash * 1.4} ${cometGap}`}
              strokeLinecap="round"
              filter="url(#trail-glow-soft)"
              className={styles.cometTail}
              style={{ '--trail-len': `${pathLen}` } as React.CSSProperties}
            />
          )}
        </svg>
      )}
    </div>
  );
}
