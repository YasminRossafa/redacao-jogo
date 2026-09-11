import { useRef, useState, useEffect } from 'react';
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

// ─── Comet: composited HTML overlay, not an animated SVG stroke ───────────────
// Previously the comet was an SVG <path> animating `stroke-dashoffset` across
// the entire multi-thousand-px trail path, wrapped in an feGaussianBlur
// filter. `stroke-dashoffset` isn't a compositable property, so every frame
// forced a full-path repaint — and a GPU-process raster of every visible
// tile — regardless of scroll position. Measured as the dominant cause of
// mobile scroll jank: GPU raster 94–96% busy / 49–66% of frames dropped from
// this one animation alone, while the page sat completely idle (see the
// scroll-jank audit, "Fix 1").
//
// The head/tail are now plain HTML <div>s with a STATIC box-shadow glow
// (rasterized once) whose only animated property is `transform` — a Web
// Animations API animation built from points sampled along the same SVG path
// via getPointAtLength(). A transform-only animation on a `will-change:
// transform` layer runs entirely on the compositor thread: the browser moves
// the already-rasterized layer instead of re-drawing it every frame.
const COMET_DURATION_MS = 7000;   // matches the old cometTravel keyframe duration
const COMET_TAIL_DELAY_MS = -150; // tail lags 0.15s behind the head, same as before
const COMET_SAMPLE_STEP_PX = 16;  // arc-length spacing between sampled keyframes
const COMET_TANGENT_EPS_PX = 2;   // arc-length delta used to estimate local direction

/** Builds one WAAPI keyframe list by walking the path's arc length at a fixed
 *  step and reading the tangent direction at each sample, so a single
 *  keyframe set can drive both the head and the (time-delayed) tail. */
function buildCometKeyframes(path: SVGPathElement, pathLen: number): Keyframe[] {
  const steps = Math.max(2, Math.round(pathLen / COMET_SAMPLE_STEP_PX));
  const keyframes: Keyframe[] = [];
  for (let i = 0; i <= steps; i++) {
    const s = (i / steps) * pathLen;
    const p = path.getPointAtLength(s);
    const p2 = path.getPointAtLength(Math.min(pathLen, s + COMET_TANGENT_EPS_PX));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    keyframes.push({
      transform: `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${angle}deg)`,
      offset: i / steps,
    });
  }
  return keyframes;
}

/** True while the comet should hold still: mirrors the same two triggers
 *  (`html.tab-hidden`, `html.is-scrolling`) the rest of the app's decorative
 *  animations pause on — see main.tsx. WAAPI Animations created via
 *  `.animate()` aren't CSS `animation`s, so `animation-play-state` in CSS
 *  can't reach them; pausing/playing the Animation objects directly from a
 *  MutationObserver keeps the exact same paused/resumed behaviour (resuming
 *  from the same point, no jump). */
function shouldPauseComet(): boolean {
  const root = document.documentElement.classList;
  return root.contains('is-scrolling') || root.contains('tab-hidden');
}

export function TrailSVG({ completedFraction, points }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cometHeadRef = useRef<HTMLDivElement>(null);
  const cometTailRef = useRef<HTMLDivElement>(null);
  const cometHeadAnimRef = useRef<Animation | null>(null);
  const cometTailAnimRef = useRef<Animation | null>(null);
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

  useEffect(() => {
    if (pathRef.current && containerH > 0 && containerW > 0) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, [containerH, containerW, pathD]);

  // (Re)builds the comet's WAAPI animation whenever the curve's geometry
  // changes. Reads the SVG <path> element's live, current shape via
  // getPointAtLength rather than recomputing geometry from pathD/points
  // directly, so it's always consistent with whatever actually rendered.
  // Carries the previous animation's currentTime across a rebuild so a
  // layout change (e.g. completing a phase, resizing) never visibly restarts
  // the comet from the top.
  useEffect(() => {
    const path = pathRef.current;
    const head = cometHeadRef.current;
    const tail = cometTailRef.current;
    if (!path || !head || !tail || pathLen <= 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const keyframes = buildCometKeyframes(path, pathLen);
    const prevHeadTime = cometHeadAnimRef.current?.currentTime ?? null;
    const prevTailTime = cometTailAnimRef.current?.currentTime ?? null;
    cometHeadAnimRef.current?.cancel();
    cometTailAnimRef.current?.cancel();

    const headAnim = head.animate(keyframes, {
      duration: COMET_DURATION_MS,
      iterations: Infinity,
      easing: 'linear',
    });
    const tailAnim = tail.animate(keyframes, {
      duration: COMET_DURATION_MS,
      iterations: Infinity,
      easing: 'linear',
      delay: COMET_TAIL_DELAY_MS,
    });
    if (prevHeadTime !== null) headAnim.currentTime = prevHeadTime;
    if (prevTailTime !== null) tailAnim.currentTime = prevTailTime;
    cometHeadAnimRef.current = headAnim;
    cometTailAnimRef.current = tailAnim;

    const applyPauseState = () => {
      const pause = shouldPauseComet();
      for (const anim of [headAnim, tailAnim]) {
        if (pause && anim.playState === 'running') anim.pause();
        else if (!pause && anim.playState === 'paused') anim.play();
      }
    };
    applyPauseState();
    const observer = new MutationObserver(applyPauseState);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      headAnim.cancel();
      tailAnim.cancel();
    };
  }, [pathLen, pathD]);

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
            {/* Soft glow filter — used only by the static diffuse-glow
                underlayer below; the comet no longer uses SVG filters. */}
            <filter id="trail-glow-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
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
        </svg>
      )}

      {/* ── Animated comet traveling along the trail (HTML, not SVG) ── */}
      {pathLen > 0 && (
        <>
          <div ref={cometTailRef} className={styles.cometTail} />
          <div ref={cometHeadRef} className={styles.comet} />
        </>
      )}
    </div>
  );
}
