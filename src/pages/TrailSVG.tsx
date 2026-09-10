import React, { useRef, useState, useEffect } from 'react';
import styles from './TrailSVG.module.css';

interface Props {
  /** 0–1 fraction of content phases that are completed (drives the glow gradient). */
  completedFraction: number;
}

const W = 320; // viewBox width (px-equivalent units)
const AMP = 88; // oscillation amplitude from center
const HALF_PERIOD = 270; // height per half-wave (one left or one right swing)

function buildPath(height: number): string {
  const cx = W / 2;
  const steps = Math.ceil(height / HALF_PERIOD) + 1;
  let d = `M ${cx} 0`;
  for (let i = 0; i < steps; i++) {
    const y0 = i * HALF_PERIOD;
    const y1 = Math.min((i + 1) * HALF_PERIOD, height + HALF_PERIOD);
    const xPeak = i % 2 === 0 ? cx - AMP : cx + AMP;
    const span = y1 - y0;
    d += ` C ${xPeak} ${y0 + span * 0.35} ${xPeak} ${y0 + span * 0.65} ${cx} ${y1}`;
  }
  return d;
}

export function TrailSVG({ completedFraction }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [containerH, setContainerH] = useState(0);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(() => setContainerH(parent.offsetHeight));
    ro.observe(parent);
    setContainerH(parent.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (pathRef.current && containerH > 0) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, [containerH]);

  const H = containerH || 800;
  const pathD = buildPath(H);
  const cometDash = 38;
  const cometGap = pathLen > 0 ? pathLen - cometDash : 9999;

  return (
    <div ref={wrapRef} className={styles.wrapper} aria-hidden>
      {H > 0 && (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height={H}
          preserveAspectRatio="xMidYMin meet"
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
            <mask id="trail-progress-mask">
              <rect x="0" y="0" width={W} height={H} fill="url(#trail-progress-grad)" />
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
