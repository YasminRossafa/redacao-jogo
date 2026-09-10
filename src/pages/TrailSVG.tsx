import React, { useRef, useState, useEffect } from 'react';
import styles from './TrailSVG.module.css';

interface TrailPoint {
  x: number;
  y: number;
}

interface Props {
  /** 0–1 fraction of content phases that are completed (drives the glow gradient). */
  completedFraction: number;
  /** Ordered through-points (px, container-relative): the start marker's
   *  bottom-centre, then every phase node's exact centre in on-page order,
   *  then the final mission marker's top-centre. The trail is built to pass
   *  through each one exactly, so it always swings behind every node no
   *  matter how tall any given section's steps render (star rows, skip
   *  ribbons, wrapped labels) — anchoring to a fixed vertical period drifted
   *  out of phase with the real layout past the first section; anchoring to
   *  the actual measured positions can't drift. */
  points: TrailPoint[];
}

/** Smooth serpentine threading through an ordered list of points. Each segment
 *  is a cubic Bezier whose control points share their endpoint's x and sit at
 *  the segment's vertical midpoint — so the tangent at every through-point is
 *  purely vertical (both the incoming and outgoing control point share that
 *  point's x), giving a seamless S-curve with no visible kink at any node,
 *  while the path's x at each point's y is EXACTLY that point's x. */
function buildPath(points: TrailPoint[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midY = p0.y + (p1.y - p0.y) / 2;
    d += ` C ${p0.x} ${midY} ${p1.x} ${midY} ${p1.x} ${p1.y}`;
  }
  return d;
}

export function TrailSVG({ completedFraction, points }: Props) {
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
  // Before the first measurement (or if the parent hasn't rendered any
  // through-points yet), fall back to a straight centre line spanning the
  // whole container so nothing pops in from an empty state.
  const cx = W / 2;
  const fallback: TrailPoint[] = [{ x: cx, y: 0 }, { x: cx, y: H }];
  const activePoints = points.length >= 2 ? points : fallback;
  const y0 = activePoints[0].y;
  const y1 = activePoints[activePoints.length - 1].y;
  const pathD = buildPath(activePoints);
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
