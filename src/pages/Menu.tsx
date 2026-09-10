import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { PHASES, SECTIONS, CONTENT, COMPLETO_SECTION, BONUS_PHASE_BY_SECTION, getTierStars, getPhaseRoute } from '../content/index';
import type { PhaseInfo, SectionInfo } from '../content/index';
import styles from './Menu.module.css';
import { TrailSVG } from './TrailSVG';

// ─── Node states ──────────────────────────────────────────────────────────────

type NodeState = 'locked' | 'current' | 'completed' | 'skip';

const NODE_STATE_CLASS: Record<NodeState, string> = {
  locked:    styles.nodeLocked,
  current:   styles.nodeCurrent,
  completed: styles.nodeCompleted,
  skip:      styles.nodeSkip,
};

// ─── Icons — Introdução: planetas ─────────────────────────────────────────────

/** Open book — formula/explanation phases across all sections. */
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H12v20H4.5A2.5 2.5 0 0 1 2 19.5Z" />
      <path d="M12 2h7.5A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5H12Z" />
      <path d="M6 8h4M6 12h4" />
      <path d="M14 8h4M14 12h4" />
    </svg>
  );
}

/** Simple planet disc with two craters. */
function PlanetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="9.5" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="14.5" cy="13.5" r="2.2" fill="rgba(255,255,255,0.32)" />
    </svg>
  );
}

/** Smaller planet, single surface highlight. */
function PlanetSmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="10" cy="10" r="1.2" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

/** Saturn-like planet with equatorial ring. */
function PlanetRingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="5.2" />
      <ellipse cx="12" cy="12" rx="10.5" ry="3.5" fill="none"
               stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
    </svg>
  );
}

// ─── Icons — Desenvolvimento 1: luas ─────────────────────────────────────────

/** Thin crescent moon. */
function CrescentMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M17 12A8 8 0 1 1 10 4.5 5.5 5.5 0 0 0 17 12Z" />
    </svg>
  );
}

/** Fat crescent moon. */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M15.5 2.2A9.3 9.3 0 1 0 21.8 16 7.6 7.6 0 0 1 15.5 2.2z" />
    </svg>
  );
}

/** Crescent moon with three surrounding stars. */
function MoonStarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M13 3A9 9 0 1 0 21 11a7.4 7.4 0 0 1-8-8z" />
      <circle cx="20" cy="4.5" r="1.1" />
      <circle cx="22.5" cy="8.5" r="0.85" />
      <circle cx="21" cy="1.8" r="0.7" />
    </svg>
  );
}

/** Full moon with subtle surface markings. */
function FullMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9.5" cy="9.5" r="1.8" fill="rgba(0,0,0,0.1)" />
      <circle cx="14" cy="14.5" r="1.2" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
}

// ─── Icons — Desenvolvimento 2: estrelas ─────────────────────────────────────

/** Classic 5-point star. */
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 2 L14.3 8.9 L21.6 9.1 L15.9 13.9 L17.9 21 L12 17.2 L6.1 21 L8.1 13.9 L2.4 9.1 L9.7 8.9 Z" />
    </svg>
  );
}

/** 4-point sparkle / diamond burst. */
function StarBurstIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" />
    </svg>
  );
}

/** Small star with two trailing streak lines. */
function ShootingStarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M16 4 L17.2 8.2 L21.5 9 L17.2 9.8 L16 14 L14.8 9.8 L10.5 9 L14.8 8.2 Z" />
      <line x1="13.5" y1="11.5" x2="3" y2="20" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <line x1="12" y1="12.5" x2="3" y2="16.5" stroke="currentColor"
            strokeWidth="1.1" strokeLinecap="round" opacity="0.32" />
    </svg>
  );
}

/** Three stars of varying size connected by faint lines. */
function StarClusterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <line x1="12" y1="8.3" x2="7.8" y2="14" stroke="currentColor"
            strokeWidth="1" opacity="0.38" />
      <line x1="12" y1="8.3" x2="16.2" y2="14" stroke="currentColor"
            strokeWidth="1" opacity="0.38" />
      <circle cx="12" cy="5.5" r="2.8" />
      <circle cx="6.5" cy="16" r="2.2" />
      <circle cx="17.5" cy="16" r="2.2" />
      <circle cx="12" cy="12" r="1.4" opacity="0.5" />
    </svg>
  );
}

// ─── Icons — Conclusão: cometas ───────────────────────────────────────────────

/** Comet with fanning tail lines — head top-right. */
function CometIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="18.5" cy="5.5" r="3.2" />
      <line x1="15.8" y1="8.2" x2="4" y2="19" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" opacity="0.62" />
      <line x1="14.5" y1="9" x2="3" y2="15.5" stroke="currentColor"
            strokeWidth="1.3" strokeLinecap="round" opacity="0.38" />
      <line x1="15.5" y1="11.5" x2="6" y2="22" stroke="currentColor"
            strokeWidth="1" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}

/** Comet mirrored — head bottom-left, tail fanning up-right. */
function CometMirrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="5.5" cy="18.5" r="3.2" />
      <line x1="8.2" y1="15.8" x2="20" y2="5" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" opacity="0.62" />
      <line x1="9.5" y1="15" x2="21" y2="8.5" stroke="currentColor"
            strokeWidth="1.3" strokeLinecap="round" opacity="0.38" />
      <line x1="8.5" y1="14.5" x2="18" y2="2" stroke="currentColor"
            strokeWidth="1" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}

/** Meteor — one bold streak, head top-right, with debris specks. */
function MeteorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="18" cy="6" r="2.6" />
      <line x1="16.2" y1="7.8" x2="4" y2="20" stroke="currentColor"
            strokeWidth="2.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="12" cy="12" r="1" opacity="0.5" />
      <circle cx="8.3" cy="15.7" r="0.8" opacity="0.32" />
    </svg>
  );
}

/** Comet with a curved (arcing) tail — head top-right. */
function CometArcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="17.5" cy="6.5" r="3" />
      <path d="M15 9 C 9.5 12, 6.5 15.5, 4.5 20" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" opacity="0.58" />
      <path d="M16.2 10.6 C 11.5 13, 8.5 16.5, 7 21" fill="none" stroke="currentColor"
            strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/** Comet whose head is a 4-point sparkle, with a short tail. */
function CometSparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <line x1="14.5" y1="9.5" x2="5" y2="19" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="15.8" y1="10.8" x2="7.5" y2="20" stroke="currentColor"
            strokeWidth="1.1" strokeLinecap="round" opacity="0.3" />
      <path d="M17.5 3 L18.7 6.3 L22 7.5 L18.7 8.7 L17.5 12 L16.3 8.7 L13 7.5 L16.3 6.3 Z" />
    </svg>
  );
}

/** Twin comets — two small meteors crossing the field. */
function CometTwinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="7" cy="6" r="2.2" />
      <line x1="8.4" y1="7.5" x2="3" y2="13" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      <circle cx="17" cy="13" r="2.2" />
      <line x1="18.4" y1="14.5" x2="13" y2="20" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Bright comet — big head with a triple tail and a sparkle (capstone). */
function CometBrightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="17.5" cy="6.5" r="3.6" />
      <line x1="15" y1="9" x2="3" y2="21" stroke="currentColor"
            strokeWidth="2.6" strokeLinecap="round" opacity="0.62" />
      <line x1="13.6" y1="9.6" x2="2.5" y2="16" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="14.8" y1="11.8" x2="5" y2="22" stroke="currentColor"
            strokeWidth="1.1" strokeLinecap="round" opacity="0.24" />
      <path d="M21 1.5 L21.7 3.8 L24 4.5 L21.7 5.2 L21 7.5 L20.3 5.2 L18 4.5 L20.3 3.8 Z"
            opacity="0.85" />
    </svg>
  );
}

// ─── Icon — Repertórios bônus (ramo lateral) ──────────────────────────────────

/** Bookmark/ribbon — the "Repertórios" bonus branch (collectible references). */
function RepertoriosIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M7 3h10a1 1 0 0 1 1 1v17l-6-3.6L6 21V4a1 1 0 0 1 1-1z" />
      <path d="M9.3 8h5.4" stroke="#0B1224" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9.3 11h3.2" stroke="#0B1224" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Shared icons ─────────────────────────────────────────────────────────────

/** Padlock — shown as a small corner badge on locked nodes. */
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** Astronaut silhouette riding the current-phase node. */
function AstronautIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="8" y="12.5" width="8" height="8" rx="3.2" fill="#F1F5F9" />
      <circle cx="12" cy="8" r="5.2" fill="#F1F5F9" />
      <rect x="9" y="6" width="6" height="4.5" rx="2.2" fill="#1E293B" />
      <rect x="6.5" y="13.5" width="2.4" height="5.5" rx="1.2" fill="#F1F5F9" />
      <rect x="15.1" y="13.5" width="2.4" height="5.5" rx="1.2" fill="#F1F5F9" />
    </svg>
  );
}

// ─── Lock tooltip (click-to-reveal, on every locked node) ────────────────────
// Reasons a locked node is locked differ by node type (see MISSION_LOCKED_MESSAGE
// vs PHASE_LOCKED_MESSAGE below), but the popover itself is one shared component.

/** Explains what regular locked phase nodes need — the sequential unlock chain
 *  requires passing the immediately preceding phase. */
const PHASE_LOCKED_MESSAGE = 'Complete a fase anterior para desbloquear.';
/** Reuses the exact copy the mission node used to show as a standing label,
 *  now surfaced on demand instead of permanently occupying page space. */
const MISSION_LOCKED_MESSAGE = 'Complete todas as missões anteriores.';

const LOCK_TOOLTIP_WIDTH = 208; // px — fixed, so placement math is exact, not estimated
const LOCK_TOOLTIP_EST_HEIGHT = 96; // px — generous estimate incl. the gap to the anchor
const LOCK_TOOLTIP_MARGIN = 12; // px kept clear of the viewport edge

interface LockTooltipPlacement {
  /** Extra px added on top of the default centred (-50%) horizontal position,
   *  clamped so the fixed-width box never crosses the viewport edge. */
  shiftX: number;
  /** true = render above the anchor (default — keeps clear of the label/stars
   *  below); false = render below, used when there isn't room above. */
  above: boolean;
}

function computeLockTooltipPlacement(anchorRect: DOMRect): LockTooltipPlacement {
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const centerX = anchorRect.left + anchorRect.width / 2;
  const desiredLeft = centerX - LOCK_TOOLTIP_WIDTH / 2;
  const desiredRight = centerX + LOCK_TOOLTIP_WIDTH / 2;

  let shiftX = 0;
  if (desiredLeft < LOCK_TOOLTIP_MARGIN) {
    shiftX = LOCK_TOOLTIP_MARGIN - desiredLeft;
  } else if (desiredRight > viewportW - LOCK_TOOLTIP_MARGIN) {
    shiftX = (viewportW - LOCK_TOOLTIP_MARGIN) - desiredRight;
  }

  const spaceAbove = anchorRect.top;
  const spaceBelow = viewportH - anchorRect.bottom;
  const needed = LOCK_TOOLTIP_EST_HEIGHT + LOCK_TOOLTIP_MARGIN;
  // Prefer above (keeps the label/star row underneath clear); fall back to
  // below only when there truly isn't room above but there is below.
  const above = spaceAbove >= needed || spaceBelow < needed;

  return { shiftX, above };
}

/** Click-to-reveal popover explaining why a node is locked. Rendered as a child
 *  of the same `position: relative` wrapper as the node it explains, so it
 *  scrolls naturally with the page; its own position is computed once on open
 *  from the anchor's viewport rect so it never clips at the screen edges. */
function LockTooltip({
  message,
  getAnchor,
}: {
  message: string;
  /** Reads the current anchor element. Called from an effect (after commit),
   *  never during render, so it's safe for this to read a ref's `.current`. */
  getAnchor: () => HTMLElement | null;
}) {
  const [placement, setPlacement] = useState<LockTooltipPlacement | null>(null);

  useLayoutEffect(() => {
    const anchor = getAnchor();
    if (!anchor) return;
    setPlacement(computeLockTooltipPlacement(anchor.getBoundingClientRect()));
    // Intentionally mount-only: this component is freshly mounted each time a
    // tooltip opens (its parent renders it conditionally), so "run once" here
    // already means "run once per open" — re-running on every parent render
    // would re-measure needlessly and risks a render loop, since `getAnchor`
    // is a new closure each time the parent re-renders.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="tooltip"
      className={[styles.lockTooltip, placement?.above ? styles.lockTooltipAbove : styles.lockTooltipBelow]
        .filter(Boolean)
        .join(' ')}
      style={{
        visibility: placement ? 'visible' : 'hidden',
        transform: `translateX(calc(-50% + ${placement?.shiftX ?? 0}px))`,
      }}
      // Popover has no interactive content of its own — let clicks on it still
      // count as "outside" so it closes like the rest of the page. A click on
      // the anchor itself is handled separately by the trigger's own toggle.
    >
      {message}
    </div>
  );
}

// ─── Nebula marker (start + end special markers) ──────────────────────────────

/** Decorative star-cloud layers shared by the start and end markers. The glowing
 *  cloud is semi-transparent so the trail beneath fades into it (unlike the
 *  opaque section breaks). No interactivity here — the wrapping button owns it. */
function NebulaCloud() {
  return (
    <>
      <span className={styles.nebulaMarkerCloud} aria-hidden />
      <span className={styles.nebulaMarkerRing} aria-hidden />
    </>
  );
}

// ─── Static lookup tables ─────────────────────────────────────────────────────

const PHASE_ICON: Record<string, () => React.ReactElement> = {
  // Introdução — planetas
  'fase-formula':             BookIcon,
  'fase-repertorio':          PlanetSmallIcon,
  'fase-tema-brasil':         PlanetIcon,
  'fase-problematicas':       PlanetRingsIcon,
  'fase-introducao-completa': PlanetIcon,
  // Desenvolvimento 1 — luas
  'fase-d1-formula':          BookIcon,
  'fase-d1-problema':         CrescentMoonIcon,
  'fase-d1-citacao':          MoonIcon,
  'fase-d1-argumento':        MoonStarsIcon,
  'fase-d1-completo':         FullMoonIcon,
  // Desenvolvimento 2 — estrelas
  'fase-d2-formula':          BookIcon,
  'fase-d2-problema':         StarIcon,
  'fase-d2-citacao':          StarBurstIcon,
  'fase-d2-argumento':        ShootingStarIcon,
  'fase-d2-completo':         StarClusterIcon,
  // Conclusão — meteoros/cometas (one distinct variant per stage)
  'fase-conclusao-formula':   BookIcon,
  'fase-conclusao-agente':    CometIcon,
  'fase-conclusao-acao':      CometMirrorIcon,
  'fase-conclusao-modo':      MeteorIcon,
  'fase-conclusao-finalidade': CometArcIcon,
  'fase-conclusao-detalhamento': CometSparkleIcon,
  'fase-conclusao-retomada':  CometTwinIcon,
  'fase-conclusao-completo':  CometBrightIcon,
};

// Family fallback icon per section, so every node in a section carries a
// celestial silhouette matching its family (planeta / lua / estrela / cometa)
// even if a specific phase has no explicit PHASE_ICON entry.
const SECTION_FAMILY_ICON: Record<string, () => React.ReactElement> = {
  'introducao': PlanetIcon,
  'dev1':       MoonIcon,
  'dev2':       StarIcon,
  'conclusao':  CometIcon,
};

// Which specific phase the bonus node anchors to, per section.
// Introdução → "Contextualização" (fase-repertorio); D1/D2 → the Citação phase.
const BONUS_ANCHOR: Record<string, string> = {
  'introducao': 'fase-repertorio',
  'dev1':       'fase-d1-citacao',
  'dev2':       'fase-d2-citacao',
};

// The final objective and its exclusive completion badge.
const MISSION_ID = 'fase-missao-final';
const MISSION_BADGE = 'comandante-missao-final';
// Sections that must all be completed before the Missão Final unlocks.
const MISSION_PREREQ_SECTIONS = ['introducao', 'dev1', 'dev2', 'conclusao'];

// The Missão Final is NOT rendered as a section: it is the trail's closing
// bookend (a big nebula marker, symmetric with the start marker), so its section
// is filtered out of the section loop and gets no section-break header.
const MISSION_SECTION_ID = 'redacao-completa';
const TRACK_SECTIONS = SECTIONS.filter((s) => s.id !== MISSION_SECTION_ID);

// CSS class carrying each section's --sec-rgb (drives the per-node glow).
const SECTION_NEBULA_CLASS: Record<string, string> = {
  'introducao': styles.sectionIntroducao,
  'dev1':       styles.sectionDev1,
  'dev2':       styles.sectionDev2,
  'conclusao':  styles.sectionConclusao,
};

// Raw RGB for each section — feeds both the section-break dust/glow custom
// properties and the continuous page backdrop gradient.
const SECTION_RGB: Record<string, string> = {
  'introducao': '99, 102, 241',
  'dev1':       '20, 184, 166',
  'dev2':       '245, 158, 11',
  'conclusao':  '236, 72, 153',
};

// Celestial names for each section's break header.
const SECTION_CELESTIAL: Record<string, { primary: string; secondary: string }> = {
  'introducao': { primary: 'Sistema Planetário',   secondary: 'Introdução' },
  'dev1':       { primary: 'Campo Lunar',          secondary: 'Desenvolvimento 1' },
  'dev2':       { primary: 'Campo Estelar',        secondary: 'Desenvolvimento 2' },
  'conclusao':  { primary: 'Cinturão de Meteoros', secondary: 'Conclusão' },
};

// ─── Continuous backdrop gradient ─────────────────────────────────────────────
// A single top-to-bottom linear-gradient spans the whole trail instead of one
// background block per section. It peaks on each section's hue at that section's
// vertical centre and dips into a dark, desaturated "valley" across every
// section transition — a valley between two colour peaks rather than a wall
// between two flat blocks. The star-cloud (.nebulaDust) sits inside that dip.

const VALLEY_EDGE = 'rgba(11, 17, 36, 0.28)';   // valley shoulders
const VALLEY_DEEP = 'rgba(7, 11, 24, 0.68)';    // deepest point of the dip
const SECTION_PEAK_ALPHA = 0.3;
const START_PEAK = 'rgba(99, 102, 241, 0.22)';  // launch indigo
const END_PEAK   = 'rgba(139, 92, 246, 0.26)';  // mission purple

/** A single through-point for the stardust trail, in trail-relative px. */
interface TrailPoint {
  x: number;
  y: number;
}

/** Geometry for a Repertórios connector line, in the anchor step's own
 *  (position: relative) coordinate frame. `top`/`left` are the line's start
 *  point — the pivot `rotate()` turns around — not its bounding box. */
interface ConnectorGeometry {
  top: number;
  left: number;
  width: number;
  angleDeg: number;
}

// ─── Pre-computed trail layout ────────────────────────────────────────────────
// Computed once at module load (PHASES and SECTIONS are static constants).
// Each phase gets a stable isLeft flag so the zigzag is consistent even after
// portals (which don't count as positions in the zigzag).

interface PhaseTrailItem {
  phase: PhaseInfo;
  isLeft: boolean;
  sectionId: string;
}

function buildSectionPhaseItems(
  section: SectionInfo,
  startIdx: number
): PhaseTrailItem[] {
  const items: PhaseTrailItem[] = [];
  let i = 0;
  for (const phaseId of section.phaseIds) {
    const phase = PHASES.find((p) => p.id === phaseId);
    if (!phase) continue;
    items.push({
      phase,
      isLeft: (startIdx + i) % 2 === 0,
      sectionId: section.id,
    });
    i++;
  }
  return items;
}

const SECTION_PHASE_ITEMS: Record<string, PhaseTrailItem[]> = (() => {
  const result: Record<string, PhaseTrailItem[]> = {};
  let idx = 0;
  for (const section of SECTIONS) {
    result[section.id] = buildSectionPhaseItems(section, idx);
    idx += section.phaseIds.length;
  }
  return result;
})();

// ─── Component ────────────────────────────────────────────────────────────────

export function Menu() {
  const navigate = useNavigate();
  const { isPhaseUnlocked, unlockPhase, getPhaseScore, hasBadge, isPhaseSkipped } = useProgress();

  // Transient "Em Breve" toast shown when a placeholder bonus node is tapped.
  const [toast, setToast] = useState<string | null>(null);

  // Click-to-reveal tooltip on locked nodes: at most one open at a time, keyed
  // by phase.id (or MISSION_ID for the final marker). Toggled by clicking the
  // node itself or its lock badge; dismissed by clicking elsewhere, pressing
  // Escape, or clicking the same trigger again.
  const [openLockId, setOpenLockId] = useState<string | null>(null);
  const toggleLock = (id: string) => setOpenLockId((prev) => (prev === id ? null : id));

  useEffect(() => {
    if (!openLockId) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(`[data-lock-node="${openLockId}"]`)) {
        setOpenLockId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenLockId(null);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openLockId]);

  // Live geometry: the backdrop gradient and the trail's end points are derived
  // from the measured layout, so they follow section heights at any breakpoint.
  const trailRef = useRef<HTMLDivElement>(null);
  const startCircleRef = useRef<HTMLButtonElement>(null);
  const endCircleRef = useRef<HTMLButtonElement>(null);
  const breakRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Every primary phase node's own button (excludes the mission — it has its
  // own endCircleRef). The trail threads through these EXACT measured centres,
  // so it always passes behind every node regardless of how tall any given
  // step's content makes that section (star rows, skip ribbons, wrapped
  // labels) — a fixed-period sine assumption drifted out of phase with real
  // layout past the first section; anchoring to real positions can't drift.
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [backdrop, setBackdrop] = useState('');
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);

  // Repertórios connector line: measured, not guessed, so it always visibly
  // starts from a real element on the anchor node instead of floating in
  // whatever empty space a fixed pixel offset happened to assume. Keyed by
  // anchor phase.id (the 3 entries in BONUS_ANCHOR); refs only ever get
  // attached for those phases. stepRefs is the coordinate frame (each
  // anchor's own position:relative .step); connectorOriginRefs points at
  // whichever element is the node's real "bottom" — the star row once it has
  // been played, else the label — so the line's start point automatically
  // follows whichever is actually showing; bonusCircleRefs is the line's
  // other end, the Repertórios circle itself.
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const connectorOriginRefs = useRef<Record<string, HTMLElement | null>>({});
  const bonusCircleRefs = useRef<Record<string, HTMLElement | null>>({});
  const [connectorGeom, setConnectorGeom] = useState<Record<string, ConnectorGeometry>>({});

  useEffect(() => {
    unlockPhase('fase-formula');
  }, [unlockPhase]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1900);
    return () => clearTimeout(t);
  }, [toast]);

  // The astronaut sits on the first genuinely-unplayed frontier phase.
  // Skipped phases (auto-completed by skip mechanic, never played) are excluded
  // so the astronaut always marks the real next phase to play.
  // Falls back to the last unlocked phase so it never disappears.
  const frontierPhaseId = (() => {
    const fresh = PHASES.find(
      (p) => isPhaseUnlocked(p.id) && getPhaseScore(p.id) === null && !isPhaseSkipped(p.id)
    );
    if (fresh) return fresh.id;
    const lastUnlocked = [...PHASES].reverse().find((p) => isPhaseUnlocked(p.id));
    return lastUnlocked?.id ?? null;
  })();

  // Auto-scroll to the player's current position once, on mount — covers both
  // returning from a phase (Menu remounts fresh each time the route becomes
  // "/", whether via the header's "← Menu" or a completed phase's buttons)
  // and a first-ever visit (frontierPhaseId is 'fase-formula' there, right at
  // the top, so the scroll is a harmless no-op). frontierPhaseId is read from
  // the FIRST render only (empty deps) — it already reflects the reconciled
  // progress state, since useProgress()'s one-time unlockedPhases backfill
  // runs synchronously inside the lazy useState initializer, before this
  // component's first render ever happens, not after it. Falls back to
  // endCircleRef when the frontier is the mission itself, which — unlike
  // every other phase — isn't rendered in the main loop nodeRefs populates.
  useEffect(() => {
    const target =
      frontierPhaseId === MISSION_ID
        ? endCircleRef.current
        : nodeRefs.current[frontierPhaseId ?? ''];
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- intentionally mount-only
  }, []);

  // The Missão Final ignores the sequential unlock chain: it opens only once every
  // content phase of all four prior sections has been played OR skipped.
  const missionUnlocked = MISSION_PREREQ_SECTIONS.every((secId) => {
    const section = SECTIONS.find((s) => s.id === secId);
    if (!section) return false;
    return section.phaseIds
      .filter((id) => CONTENT[id])
      .every((id) => getPhaseScore(id) !== null || isPhaseSkipped(id));
  });

  const totalContentPhases = PHASES.filter(p => CONTENT[p.id]).length;
  const completedContentPhases = PHASES.filter(
    p => CONTENT[p.id] && (getPhaseScore(p.id) !== null || isPhaseSkipped(p.id))
  ).length;
  const completedFraction = totalContentPhases > 0 ? completedContentPhases / totalContentPhases : 0;

  // Measure the trail once laid out (and on every resize/reflow) to build the
  // continuous backdrop gradient and to anchor the stardust trail to the two
  // marker circles. Re-runs when progress changes because star rows and skip
  // ribbons appear/disappear, which shifts section heights.
  useEffect(() => {
    const trail = trailRef.current;
    if (!trail) return;

    const measure = () => {
      const total = trail.offsetHeight;
      if (total <= 0) return;
      const trailRect = trail.getBoundingClientRect();
      const trailTop = trailRect.top;
      const trailLeft = trailRect.left;
      const pct = (px: number) => `${((px / total) * 100).toFixed(2)}%`;

      const stops: string[] = [`${VALLEY_EDGE} 0%`];

      const startEl = startCircleRef.current;
      if (startEl) {
        const r = startEl.getBoundingClientRect();
        stops.push(`${START_PEAK} ${pct(r.top - trailTop + r.height / 2)}`);
      }

      for (const section of TRACK_SECTIONS) {
        // Valley: shoulder → deepest point → shoulder, straddling the break.
        const brk = breakRefs.current[section.id];
        if (brk) {
          stops.push(`${VALLEY_EDGE} ${pct(brk.offsetTop)}`);
          stops.push(`${VALLEY_DEEP} ${pct(brk.offsetTop + brk.offsetHeight / 2)}`);
          stops.push(`${VALLEY_EDGE} ${pct(brk.offsetTop + brk.offsetHeight)}`);
        }
        // Peak: the section's own hue at the section's vertical centre.
        const grp = groupRefs.current[section.id];
        if (grp) {
          const rgb = SECTION_RGB[section.id] ?? '148, 163, 184';
          stops.push(
            `rgba(${rgb}, ${SECTION_PEAK_ALPHA}) ${pct(grp.offsetTop + grp.offsetHeight / 2)}`
          );
        }
      }

      const endEl = endCircleRef.current;
      if (endEl) {
        const r = endEl.getBoundingClientRect();
        const endTop = r.top - trailTop;
        stops.push(`${VALLEY_DEEP} ${pct(endTop - r.height * 0.7)}`);
        stops.push(`${END_PEAK} ${pct(endTop + r.height / 2)}`);
      }

      stops.push(`${VALLEY_EDGE} 100%`);
      setBackdrop(`linear-gradient(to bottom, ${stops.join(', ')})`);

      // Thread the trail through the start marker, every primary phase node
      // (in on-page order), then the final mission marker — its EXACT measured
      // centre, so the curve always passes behind each node no matter how the
      // step heights vary between sections.
      if (startEl && endEl) {
        const startR = startEl.getBoundingClientRect();
        const endR = endEl.getBoundingClientRect();
        const points: TrailPoint[] = [
          { x: startR.left - trailLeft + startR.width / 2, y: startR.bottom - trailTop },
        ];
        for (const phase of PHASES) {
          if (phase.id === MISSION_ID) continue;
          const btn = nodeRefs.current[phase.id];
          if (!btn) continue;
          const r = btn.getBoundingClientRect();
          points.push({
            x: r.left - trailLeft + r.width / 2,
            y: r.top - trailTop + r.height / 2,
          });
        }
        points.push({ x: endR.left - trailLeft + endR.width / 2, y: endR.top - trailTop });

        setTrailPoints((prev) => {
          if (
            prev.length === points.length &&
            prev.every((p, i) => Math.abs(p.x - points[i].x) < 0.5 && Math.abs(p.y - points[i].y) < 0.5)
          ) {
            return prev;
          }
          return points;
        });
      }

      // Repertórios connector lines: one straight segment per anchor, from
      // the real measured bottom-centre of its origin element (star row or
      // label) to the real measured centre of its bonus circle. Both ends
      // are exact, so the line can never "float" in an assumed gap — and it
      // self-corrects whenever the origin changes (e.g. the star row
      // appearing for the first time after the anchor phase is played).
      const nextGeom: Record<string, ConnectorGeometry> = {};
      for (const phaseId of Object.values(BONUS_ANCHOR)) {
        const stepEl = stepRefs.current[phaseId];
        const originEl = connectorOriginRefs.current[phaseId];
        const circleEl = bonusCircleRefs.current[phaseId];
        if (!stepEl || !originEl || !circleEl) continue;
        const stepR = stepEl.getBoundingClientRect();
        const originR = originEl.getBoundingClientRect();
        const circleR = circleEl.getBoundingClientRect();

        const originX = originR.left + originR.width / 2 - stepR.left;
        const originY = originR.bottom - stepR.top;
        const targetX = circleR.left + circleR.width / 2 - stepR.left;
        const targetY = circleR.top + circleR.height / 2 - stepR.top;
        const dx = targetX - originX;
        const dy = targetY - originY;

        nextGeom[phaseId] = {
          top: originY,
          left: originX,
          width: Math.hypot(dx, dy),
          angleDeg: (Math.atan2(dy, dx) * 180) / Math.PI,
        };
      }
      setConnectorGeom((prev) => {
        const keys = Object.keys(nextGeom);
        const unchanged =
          keys.length === Object.keys(prev).length &&
          keys.every((k) => {
            const a = prev[k];
            const b = nextGeom[k];
            return (
              a &&
              Math.abs(a.top - b.top) < 0.5 &&
              Math.abs(a.left - b.left) < 0.5 &&
              Math.abs(a.width - b.width) < 0.5 &&
              Math.abs(a.angleDeg - b.angleDeg) < 0.5
            );
          });
        return unchanged ? prev : nextGeom;
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trail);
    return () => ro.disconnect();
  }, [completedContentPhases, missionUnlocked]);

  // Stars only once the mission is actually open (mirrors the node rule that a
  // locked disc never shows a score).
  const missionScore = getPhaseScore(MISSION_ID);
  const missionStars =
    missionUnlocked && missionScore
      ? getTierStars(missionScore.correctCount, MISSION_ID)
      : null;

  return (
    <div className={styles.page}>
      <div className={styles.trail} ref={trailRef} role="list" aria-label="Fases do jogo">
        {/* Continuous page-height gradient: peaks per section, dips at each break. */}
        <div
          className={styles.trailBackdrop}
          style={{ backgroundImage: backdrop }}
          aria-hidden
        />
        <TrailSVG
          completedFraction={completedFraction}
          points={trailPoints}
        />

        {/* ── Start marker: the mission title itself, launch pad of the trail ── */}
        <div className={styles.startMarkerWrap}>
          <div className={styles.markerCircleWrap}>
            <button
              type="button"
              ref={startCircleRef}
              className={[styles.nebulaMarker, styles.nebulaMarkerStart].join(' ')}
              onClick={() => {
                navigate(getPhaseRoute(frontierPhaseId ?? 'fase-formula'));
              }}
              aria-label="Missão Nota 1000 — continuar a jornada"
            >
              <NebulaCloud />
            </button>
            {/* Sits outside the button (headings aren't valid button content) but
                is centred over it and click-through, so the circle reads as the title. */}
            <h1 className={styles.markerTitle}>Missão Nota 1000</h1>
          </div>
        </div>

        {TRACK_SECTIONS.map((section, sectionIdx) => {
          const phaseItems = SECTION_PHASE_ITEMS[section.id] ?? [];
          const nebClass = SECTION_NEBULA_CLASS[section.id];
          const currRgb = SECTION_RGB[section.id] ?? '148,163,184';
          const prevRgb = sectionIdx > 0
            ? (SECTION_RGB[TRACK_SECTIONS[sectionIdx - 1].id] ?? '0,0,0')
            : '0,0,0';
          const celestial = SECTION_CELESTIAL[section.id] ?? { primary: section.label, secondary: '' };

          return (
            <React.Fragment key={section.id}>
              {/* ── Section break: the gradient's valley — dust + celestial name ── */}
              <div
                className={styles.sectionBreak}
                ref={(el) => { breakRefs.current[section.id] = el; }}
                role="separator"
                aria-label={`Seção: ${section.label}`}
                style={{
                  '--sec-rgb-from': prevRgb,
                  '--sec-rgb-to':   currRgb,
                } as React.CSSProperties}
              >
                <div className={styles.nebulaDust} aria-hidden />
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionHeaderGlow} aria-hidden />
                  <span className={styles.sectionHeaderPrimary}>{celestial.primary}</span>
                  {celestial.secondary && (
                    <span className={styles.sectionHeaderSecondary}>{celestial.secondary}</span>
                  )}
                </div>
              </div>

              {/* ── Section phases ── */}
              <div
                className={[styles.sectionGroup, nebClass].filter(Boolean).join(' ')}
                ref={(el) => { groupRefs.current[section.id] = el; }}
              >
                {phaseItems.map(({ phase, isLeft }) => {
                  const unlocked = isPhaseUnlocked(phase.id);
                  const score = getPhaseScore(phase.id);

                  // A completo phase is in 'skip' state when its section has started
                  // (first phase unlocked) but the completo itself is not yet normally
                  // unlocked and has never been attempted (no score recorded).
                  const completoSectionId = COMPLETO_SECTION[phase.id];
                  const inSkipState =
                    !!completoSectionId &&
                    isPhaseUnlocked(section.phaseIds[0]) &&
                    !unlocked &&
                    score === null;

                  const state: NodeState = inSkipState
                    ? 'skip'
                    : !unlocked
                    ? 'locked'
                    : score !== null
                    ? 'completed'
                    : isPhaseSkipped(phase.id)
                    ? 'completed'  // auto-completed by skip — green node, no stars (score is null)
                    : 'current';

                  // Stars are suppressed for locked nodes so a failed-skip score
                  // (recorded on the completo but still gated) doesn't show stars
                  // on a locked disc.
                  const stars =
                    score !== null && state !== 'locked'
                      ? getTierStars(score.correctCount, phase.id)
                      : null;
                  const isAstronaut = phase.id === frontierPhaseId;
                  // Phases without content entries are "em breve" placeholders.
                  const isComingSoon = !CONTENT[phase.id];
                  const baseTarget = getPhaseRoute(phase.id);
                  const nodeTarget = inSkipState ? `${baseTarget}?skip=1` : baseTarget;
                  // Always show the family/celestial icon (dimmed when locked), so
                  // each section's family reads at a glance; the lock state is shown
                  // by a small corner badge instead of replacing the whole icon.
                  const PhaseNodeIcon =
                    PHASE_ICON[phase.id] ?? SECTION_FAMILY_ICON[section.id] ?? MoonIcon;
                  // This phase is the anchor for the Repertórios bonus branch.
                  const isAnchor = BONUS_ANCHOR[section.id] === phase.id;

                  return (
                    <div
                      key={phase.id}
                      ref={isAnchor ? (el) => { stepRefs.current[phase.id] = el; } : undefined}
                      className={[
                        styles.step,
                        isLeft ? styles.stepLeft : styles.stepRight,
                        // Reserves extra room below this step on mobile only, where
                        // the Repertórios branch (absolutely positioned, so it never
                        // contributes to normal flow height) would otherwise overlap
                        // the next node down — see .stepBonusAnchor.
                        isAnchor ? styles.stepBonusAnchor : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      role="listitem"
                    >
                      <div
                        className={styles.nodeWrap}
                        data-lock-node={state === 'locked' ? phase.id : undefined}
                      >
                        <button
                          ref={(el) => { nodeRefs.current[phase.id] = el; }}
                          className={[
                            styles.node,
                            isAstronaut ? styles.nodeBig : '',
                            NODE_STATE_CLASS[state],
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() =>
                            state === 'locked' ? toggleLock(phase.id) : navigate(nodeTarget)
                          }
                          aria-disabled={state === 'locked'}
                          aria-expanded={state === 'locked' ? openLockId === phase.id : undefined}
                          aria-label={`${phase.label}${state === 'locked' ? ' — bloqueado' : state === 'skip' ? ' — pular esta etapa' : ''}`}
                        >
                          <span className={styles.nodeIcon}>
                            <PhaseNodeIcon />
                          </span>
                        </button>

                        {state === 'locked' && (
                          <span
                            className={styles.lockBadge}
                            role="button"
                            tabIndex={-1}
                            onClick={() => toggleLock(phase.id)}
                          >
                            <LockIcon />
                          </span>
                        )}

                        {isAstronaut && (
                          <span className={styles.astronaut} aria-hidden>
                            <AstronautIcon />
                          </span>
                        )}

                        {state === 'locked' && openLockId === phase.id && (
                          <LockTooltip
                            message={PHASE_LOCKED_MESSAGE}
                            getAnchor={() => nodeRefs.current[phase.id] ?? null}
                          />
                        )}
                      </div>

                      <span
                        ref={
                          isAnchor && stars === null
                            ? (el) => { connectorOriginRefs.current[phase.id] = el; }
                            : undefined
                        }
                        className={[
                          styles.nodeLabel,
                          state === 'locked' ? styles.nodeLabelMuted : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {phase.label}
                      </span>

                      {isComingSoon && state === 'locked' && (
                        <span className={styles.comingSoonBadge}>Em breve</span>
                      )}

                      {state === 'skip' && (
                        <span className={styles.skipBadge}>Pular esta etapa</span>
                      )}

                      {stars !== null && (
                        <div
                          ref={isAnchor ? (el) => { connectorOriginRefs.current[phase.id] = el; } : undefined}
                          className={styles.starRow}
                        >
                          <div
                            className={styles.stars}
                            aria-label={`${stars} de 3 estrelas`}
                          >
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className={i < stars ? styles.starOn : styles.starOff}
                                aria-hidden
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          {hasBadge(`sabichao-${phase.id}`) && (
                            <span
                              className={styles.nodeBadge}
                              aria-label="Sabichão"
                              title="Sabichão"
                            >
                              🏆
                            </span>
                          )}
                        </div>
                      )}

                      {/* ── Repertórios connector: a straight line from this node's
                          real bottom-most element (star row, else label) to the
                          bonus circle — both ends measured, so it always visibly
                          starts from real content instead of an assumed offset. ── */}
                      {isAnchor && connectorGeom[phase.id] && (
                        <span
                          className={styles.bonusConnectorLine}
                          style={{
                            top: connectorGeom[phase.id].top,
                            left: connectorGeom[phase.id].left,
                            width: connectorGeom[phase.id].width,
                            transform: `rotate(${connectorGeom[phase.id].angleDeg}deg)`,
                          }}
                          aria-hidden
                        />
                      )}

                      {/* ── Repertórios bonus side-branch: hangs below this node ── */}
                      {isAnchor && (() => {
                        const bonusId = BONUS_PHASE_BY_SECTION[section.id];
                        // A playable bonus exists only where a bonus phase is
                        // mapped AND its content is built. It unlocks with the
                        // SECTION itself (its first stage becoming available) —
                        // never gated behind completing any stage.
                        const bonusReady =
                          !!bonusId &&
                          !!CONTENT[bonusId] &&
                          isPhaseUnlocked(section.phaseIds[0]);

                        if (!bonusReady) {
                          // Placeholder branch — dimmed; taps show an "Em Breve" toast.
                          return (
                            <button
                              type="button"
                              className={[
                                styles.bonusBranch,
                                isLeft ? styles.bonusOutLeft : styles.bonusOutRight,
                              ].join(' ')}
                              onClick={() => setToast('Em Breve')}
                              aria-label="Repertórios — em breve"
                            >
                              <span
                                ref={(el) => { bonusCircleRefs.current[phase.id] = el; }}
                                className={styles.bonusNode}
                              >
                                <span className={styles.bonusIcon} aria-hidden>
                                  <RepertoriosIcon />
                                </span>
                              </span>
                              <span className={styles.bonusLabel}>Repertórios</span>
                              <span className={styles.bonusTag}>Em breve</span>
                            </button>
                          );
                        }

                        const bonusScore = getPhaseScore(bonusId);
                        const bonusStars = bonusScore
                          ? getTierStars(bonusScore.correctCount, bonusId)
                          : null;

                        return (
                          <button
                            type="button"
                            className={[
                              styles.bonusBranch,
                              styles.bonusBranchActive,
                              isLeft ? styles.bonusOutLeft : styles.bonusOutRight,
                            ].join(' ')}
                            onClick={() =>
                              navigate(getPhaseRoute(bonusId))
                            }
                            aria-label="Repertórios — fase bônus"
                          >
                            <span
                              ref={(el) => { bonusCircleRefs.current[phase.id] = el; }}
                              className={[styles.bonusNode, styles.bonusNodeActive].join(' ')}
                            >
                              <span className={styles.bonusIcon} aria-hidden>
                                <RepertoriosIcon />
                              </span>
                            </span>
                            <span className={styles.bonusLabel}>Repertórios</span>
                            <span className={[styles.bonusTag, styles.bonusTagActive].join(' ')}>
                              Bônus
                            </span>
                            {bonusStars !== null && (
                              <div
                                className={styles.stars}
                                aria-label={`${bonusStars} de 3 estrelas`}
                              >
                                {[0, 1, 2].map((i) => (
                                  <span
                                    key={i}
                                    className={i < bonusStars ? styles.starOn : styles.starOff}
                                    aria-hidden
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })()}
                    </div>
                  );
                })}

              </div>
            </React.Fragment>
          );
        })}

        {/* ── End marker: the Missão Final, closing bookend of the trail ── */}
        {/* Not a section — no break header; it mirrors the start marker exactly.
            Shows only the title inside the circle plus the lock icon when
            locked — the standing caption/warning text moved into the
            click-to-reveal tooltip below instead of permanently occupying
            page space. */}
        <div className={styles.endMarkerWrap} role="listitem">
          <div
            className={styles.markerCircleWrap}
            data-lock-node={missionUnlocked ? undefined : MISSION_ID}
          >
            <button
              type="button"
              ref={endCircleRef}
              className={[
                styles.nebulaMarker,
                styles.nebulaMarkerEnd,
                missionUnlocked ? '' : styles.nebulaMarkerLocked,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() =>
                missionUnlocked
                  ? navigate(getPhaseRoute(MISSION_ID))
                  : toggleLock(MISSION_ID)
              }
              aria-disabled={!missionUnlocked}
              aria-expanded={!missionUnlocked ? openLockId === MISSION_ID : undefined}
              aria-label={`Missão Final: Retorno à Terra${missionUnlocked ? '' : ' — bloqueado'}`}
            >
              <NebulaCloud />
            </button>
            <span
              className={[
                styles.markerTitle,
                styles.markerTitleEnd,
                missionUnlocked ? '' : styles.markerTitleLocked,
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden
            >
              Missão Final
            </span>
            {!missionUnlocked && (
              <span
                className={[styles.lockBadge, styles.markerLockBadge].join(' ')}
                role="button"
                tabIndex={-1}
                onClick={() => toggleLock(MISSION_ID)}
              >
                <LockIcon />
              </span>
            )}

            {!missionUnlocked && openLockId === MISSION_ID && (
              <LockTooltip message={MISSION_LOCKED_MESSAGE} getAnchor={() => endCircleRef.current} />
            )}
          </div>

          {missionStars !== null && (
            <div className={styles.starRow}>
              <div className={styles.stars} aria-label={`${missionStars} de 3 estrelas`}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={i < missionStars ? styles.starOn : styles.starOff}
                    aria-hidden
                  >
                    ★
                  </span>
                ))}
              </div>
              {hasBadge(MISSION_BADGE) && (
                <span
                  className={styles.nodeBadge}
                  aria-label="Comandante da Missão Final"
                  title="Comandante da Missão Final"
                >
                  🚀
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
