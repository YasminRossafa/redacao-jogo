import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { PHASES, SECTIONS, CONTENT, getTierStars } from '../content/index';
import type { PhaseInfo, SectionInfo } from '../content/index';
import styles from './Menu.module.css';

// ─── Node states ──────────────────────────────────────────────────────────────

type NodeState = 'locked' | 'current' | 'completed';

const NODE_STATE_CLASS: Record<NodeState, string> = {
  locked:    styles.nodeLocked,
  current:   styles.nodeCurrent,
  completed: styles.nodeCompleted,
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

/** Comet with fanning tail lines. */
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

// ─── Icons — Redação Completa: constelação ────────────────────────────────────

/** Five stars connected by constellation lines. */
function ConstellationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <line x1="7" y1="18" x2="11" y2="11"  stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="11" y1="11" x2="17" y2="6"  stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="17" y1="6"  x2="21" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="11" y1="11" x2="17" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="17" y1="18" x2="21" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="7"  cy="18" r="1.8" />
      <circle cx="11" cy="11" r="1.8" />
      <circle cx="17" cy="6"  r="2.3" />
      <circle cx="21" cy="13" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

// ─── Shared icons ─────────────────────────────────────────────────────────────

/** Padlock — shown for locked phases. */
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
  // Conclusão — cometas
  'fase-conclusao-1':         CometIcon,
  // Redação Completa — constelação
  'fase-redacao-completa':    ConstellationIcon,
};

// Guide phases open their explainer page before the quiz.
const EXPLAINER_ROUTE: Record<string, string> = {
  'fase-formula':    '/formula',
  'fase-d1-formula': '/d1-formula',
};

// CSS class for each section's nebula tint (applied to sectionGroup wrapper).
const SECTION_NEBULA_CLASS: Record<string, string> = {
  'introducao':       styles.sectionIntroducao,
  'dev1':             styles.sectionDev1,
  'dev2':             styles.sectionDev2,
  'conclusao':        styles.sectionConclusao,
  'redacao-completa': styles.sectionRedacaoCompleta,
};

// ─── Pre-computed trail layout ────────────────────────────────────────────────
// Computed once at module load (PHASES and SECTIONS are static constants).
// Each phase gets a stable isLeft flag so the zigzag is consistent even after
// portals (which don't count as positions in the zigzag).

interface PhaseTrailItem {
  phase: PhaseInfo;
  isLeft: boolean;
  sectionId: string;
  isFinal: boolean;
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
      isFinal: phaseId === 'fase-redacao-completa',
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
  const { isPhaseUnlocked, unlockPhase, getPhaseScore, hasBadge } = useProgress();

  useEffect(() => {
    unlockPhase('fase-formula');
  }, [unlockPhase]);

  // The astronaut sits on the first unlocked-but-unplayed phase.
  // Falls back to the last unlocked phase so it never disappears.
  const frontierPhaseId = (() => {
    const fresh = PHASES.find((p) => isPhaseUnlocked(p.id) && getPhaseScore(p.id) === null);
    if (fresh) return fresh.id;
    const lastUnlocked = [...PHASES].reverse().find((p) => isPhaseUnlocked(p.id));
    return lastUnlocked?.id ?? null;
  })();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Jogo da Redação</h1>
        <p className={styles.subtitle}>Pratique a estrutura da dissertação-argumentativa.</p>
      </header>

      <div className={styles.trail} role="list" aria-label="Fases do jogo">
        {SECTIONS.map((section) => {
          const phaseItems = SECTION_PHASE_ITEMS[section.id] ?? [];
          const nebClass = SECTION_NEBULA_CLASS[section.id];

          return (
            <React.Fragment key={section.id}>
              {/* ── Section portal ── */}
              <div
                className={styles.portal}
                role="separator"
                aria-label={`Seção: ${section.label}`}
              >
                <span className={styles.portalLine} aria-hidden />
                <span className={styles.portalNode}>
                  <span className={styles.portalLabel}>{section.label}</span>
                </span>
                <span className={styles.portalLine} aria-hidden />
              </div>

              {/* ── Section phases ── */}
              <div
                className={[styles.sectionGroup, nebClass].filter(Boolean).join(' ')}
              >
                {phaseItems.map(({ phase, isLeft, isFinal }) => {
                  const unlocked = isPhaseUnlocked(phase.id);
                  const score = getPhaseScore(phase.id);
                  const state: NodeState = !unlocked
                    ? 'locked'
                    : score !== null
                    ? 'completed'
                    : 'current';
                  const stars =
                    score !== null ? getTierStars(score.correctCount, phase.id) : null;
                  const isAstronaut = phase.id === frontierPhaseId;
                  // Phases without content entries are "em breve" placeholders.
                  const isComingSoon = !CONTENT[phase.id];
                  const nodeTarget = EXPLAINER_ROUTE[phase.id] ?? `/fase/${phase.id}`;
                  const PhaseNodeIcon = PHASE_ICON[phase.id] ?? MoonIcon;

                  return (
                    <div
                      key={phase.id}
                      className={[
                        styles.step,
                        isLeft ? styles.stepLeft : styles.stepRight,
                      ].join(' ')}
                      role="listitem"
                    >
                      <div className={styles.nodeWrap}>
                        {isFinal && <span className={styles.finaleRing} aria-hidden />}

                        <button
                          className={[
                            styles.node,
                            isFinal ? styles.nodeFinal : '',
                            isAstronaut ? styles.nodeBig : '',
                            NODE_STATE_CLASS[state],
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => state !== 'locked' && navigate(nodeTarget)}
                          disabled={state === 'locked'}
                          aria-label={`${phase.label}${state === 'locked' ? ' — bloqueado' : ''}`}
                        >
                          <span className={styles.nodeIcon}>
                            {state === 'locked' ? <LockIcon /> : <PhaseNodeIcon />}
                          </span>
                        </button>

                        {isAstronaut && (
                          <span className={styles.astronaut} aria-hidden>
                            <AstronautIcon />
                          </span>
                        )}
                      </div>

                      <span
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

                      {stars !== null && (
                        <div className={styles.starRow}>
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
                    </div>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
