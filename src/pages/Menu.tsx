import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { PHASES, SECTIONS, CONTENT, COMPLETO_SECTION, getTierStars } from '../content/index';
import type { PhaseInfo, SectionInfo } from '../content/index';
import styles from './Menu.module.css';

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

// ─── Icon — Missão Final: nave de retorno ─────────────────────────────────────

/** Rocket/spaceship — the final objective. Distinct from every celestial family. */
function MissionShipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 2.4c2.5 2 3.9 4.9 3.9 8.2 0 1.2-.2 2.4-.6 3.6H8.7c-.4-1.2-.6-2.4-.6-3.6C8.1 7.3 9.5 4.4 12 2.4z" />
      <circle cx="12" cy="9" r="1.6" fill="#0B1224" />
      <path d="M8.1 12.2 5.2 14.1c-.3.2-.4.5-.3.9l.9 2.7 2.6-1.7z" />
      <path d="M15.9 12.2 18.8 14.1c.3.2.4.5.3.9l-.9 2.7-2.6-1.7z" />
      <path d="M10.5 16.6h3l-1.5 3.8z" opacity="0.85" />
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
  'fase-conclusao-formula':   BookIcon,
  'fase-conclusao-agente':    CometIcon,
  'fase-conclusao-acao':      CometIcon,
  'fase-conclusao-modo':      CometIcon,
  'fase-conclusao-finalidade': CometIcon,
  'fase-conclusao-detalhamento': CometIcon,
  'fase-conclusao-retomada':  CometIcon,
  'fase-conclusao-completo':  CometIcon,
  // Missão Final — nave
  'fase-missao-final':        MissionShipIcon,
};

// Family fallback icon per section, so every node in a section carries a
// celestial silhouette matching its family (planeta / lua / estrela / cometa)
// even if a specific phase has no explicit PHASE_ICON entry.
const SECTION_FAMILY_ICON: Record<string, () => React.ReactElement> = {
  'introducao':       PlanetIcon,
  'dev1':             MoonIcon,
  'dev2':             StarIcon,
  'conclusao':        CometIcon,
  'redacao-completa': MissionShipIcon,
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

// Guide phases open their explainer page before the quiz.
const EXPLAINER_ROUTE: Record<string, string> = {
  'fase-formula':    '/formula',
  'fase-d1-formula': '/d1-formula',
  'fase-d2-formula': '/d2-formula',
  'fase-conclusao-formula': '/conclusao-formula',
  'fase-missao-final': '/missao-final',
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
      isFinal: phaseId === MISSION_ID,
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

  // Transient "Em Breve" toast shown when a placeholder bonus node is tapped.
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    unlockPhase('fase-formula');
  }, [unlockPhase]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1900);
    return () => clearTimeout(t);
  }, [toast]);

  // The astronaut sits on the first unlocked-but-unplayed phase.
  // Falls back to the last unlocked phase so it never disappears.
  const frontierPhaseId = (() => {
    const fresh = PHASES.find((p) => isPhaseUnlocked(p.id) && getPhaseScore(p.id) === null);
    if (fresh) return fresh.id;
    const lastUnlocked = [...PHASES].reverse().find((p) => isPhaseUnlocked(p.id));
    return lastUnlocked?.id ?? null;
  })();

  // The Missão Final ignores the sequential unlock chain: it opens only once every
  // content phase of all four prior sections has been played at least once.
  const missionUnlocked = MISSION_PREREQ_SECTIONS.every((secId) => {
    const section = SECTIONS.find((s) => s.id === secId);
    if (!section) return false;
    return section.phaseIds
      .filter((id) => CONTENT[id])
      .every((id) => getPhaseScore(id) !== null);
  });

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
                  const isMission = phase.id === MISSION_ID;
                  const unlocked = isMission ? missionUnlocked : isPhaseUnlocked(phase.id);
                  const score = getPhaseScore(phase.id);

                  // A completo phase is in 'skip' state when its section has started
                  // (first phase unlocked) but the completo itself is not yet normally
                  // unlocked and has never been attempted (no score recorded).
                  const completoSectionId = COMPLETO_SECTION[phase.id];
                  const inSkipState =
                    !isMission &&
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
                  const baseTarget = EXPLAINER_ROUTE[phase.id] ?? `/fase/${phase.id}`;
                  const nodeTarget = inSkipState ? `${baseTarget}?skip=1` : baseTarget;
                  // Always show the family/celestial icon (dimmed when locked), so
                  // each section's family reads at a glance; the lock state is shown
                  // by a small corner badge instead of replacing the whole icon.
                  const PhaseNodeIcon =
                    PHASE_ICON[phase.id] ?? SECTION_FAMILY_ICON[section.id] ?? MoonIcon;
                  // The mission node glows gold when reachable (never while locked).
                  const missionActive = isMission && state !== 'locked';
                  // This phase is the anchor for the Repertórios bonus branch.
                  const isAnchor = BONUS_ANCHOR[section.id] === phase.id;

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
                            missionActive ? styles.nodeMission : '',
                            NODE_STATE_CLASS[state],
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => (state !== 'locked') && navigate(nodeTarget)}
                          disabled={state === 'locked'}
                          aria-label={`${phase.label}${state === 'locked' ? ' — bloqueado' : state === 'skip' ? ' — pular esta etapa' : ''}`}
                        >
                          <span className={styles.nodeIcon}>
                            <PhaseNodeIcon />
                          </span>
                        </button>

                        {state === 'locked' && (
                          <span className={styles.lockBadge} aria-hidden>
                            <LockIcon />
                          </span>
                        )}

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

                      {isMission && state === 'locked' && (
                        <span className={styles.missionLockLabel}>
                          Complete todas as missões anteriores
                        </span>
                      )}

                      {state === 'skip' && (
                        <span className={styles.skipBadge}>Pular esta etapa</span>
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
                          {isMission
                            ? hasBadge(MISSION_BADGE) && (
                                <span
                                  className={styles.nodeBadge}
                                  aria-label="Comandante da Missão Final"
                                  title="Comandante da Missão Final"
                                >
                                  🚀
                                </span>
                              )
                            : hasBadge(`sabichao-${phase.id}`) && (
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

                      {/* ── Repertórios bonus side-branch: anchored to this node ── */}
                      {isAnchor && (
                        <button
                          type="button"
                          className={[
                            styles.bonusBranch,
                            isLeft ? styles.bonusAnchorRight : styles.bonusAnchorLeft,
                          ].join(' ')}
                          onClick={() => setToast('Em Breve')}
                          aria-label="Repertórios — em breve"
                        >
                          <span className={styles.bonusNode}>
                            <span className={styles.bonusIcon} aria-hidden>
                              <RepertoriosIcon />
                            </span>
                          </span>
                          <span className={styles.bonusLabel}>Repertórios</span>
                          <span className={styles.bonusTag}>Em breve</span>
                        </button>
                      )}
                    </div>
                  );
                })}

              </div>
            </React.Fragment>
          );
        })}
      </div>

      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
