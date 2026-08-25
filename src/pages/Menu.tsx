import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { PHASES, getTierStars } from '../content/index';
import styles from './Menu.module.css';

type NodeState = 'locked' | 'current' | 'completed';

const NODE_STATE_CLASS: Record<NodeState, string> = {
  locked: styles.nodeLocked,
  current: styles.nodeCurrent,
  completed: styles.nodeCompleted,
};

/** Crescent moon — fase-repertorio. Uses currentColor. */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M15.5 2.2A9.3 9.3 0 1 0 21.8 16 7.6 7.6 0 0 1 15.5 2.2z" />
    </svg>
  );
}

/** Planet disc with craters — fase-tema-brasil & finale. Uses currentColor. */
function PlanetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="9.5" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="14.5" cy="13.5" r="2.2" fill="rgba(255,255,255,0.32)" />
    </svg>
  );
}

/** Moon with surrounding stars — fase-problematicas. Uses currentColor. */
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

/** Open book — used for the explanation step node. Uses currentColor. */
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

/** Padlock — shown for any locked phase. Uses currentColor. */
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

const PHASE_ICON: Record<string, () => React.ReactElement> = {
  'fase-formula': BookIcon,
  'fase-repertorio': MoonIcon,
  'fase-tema-brasil': PlanetIcon,
  'fase-problematicas': MoonStarsIcon,
  'fase-introducao-completa': PlanetIcon,
};

/** Simple astronaut silhouette that rides on the current node. */
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

export function Menu() {
  const navigate = useNavigate();
  const { isPhaseUnlocked, unlockPhase, getPhaseScore, hasBadge } = useProgress();

  useEffect(() => {
    unlockPhase('fase-formula');
  }, [unlockPhase]);

  // The astronaut sits on the first unlocked-but-unplayed phase.
  // If all unlocked phases have been played (player is stuck below threshold),
  // it falls back to the last unlocked phase so it never disappears.
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
        {PHASES.map((phase, index) => {
          const isFinal = index === PHASES.length - 1;
          const isLeft = index % 2 === 0;
          const unlocked = isPhaseUnlocked(phase.id);
          const score = getPhaseScore(phase.id);

          const state: NodeState = !unlocked ? 'locked' : score !== null ? 'completed' : 'current';
          const stars = score !== null ? getTierStars(score.correctCount, phase.id) : null;
          const isAstronaut = phase.id === frontierPhaseId;

          // fase-formula navigates to the explanation page rather than the quiz.
          const isFormulaStep = phase.id === 'fase-formula';
          const nodeTarget = isFormulaStep ? '/formula' : `/fase/${phase.id}`;
          const PhaseNodeIcon = PHASE_ICON[phase.id] ?? MoonIcon;

          return (
            <div
              key={phase.id}
              className={[styles.step, isLeft ? styles.stepLeft : styles.stepRight].join(' ')}
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
                className={[styles.nodeLabel, state === 'locked' ? styles.nodeLabelMuted : '']
                  .filter(Boolean)
                  .join(' ')}
              >
                {phase.label}
              </span>

              {stars !== null && (
                <div className={styles.starRow}>
                  <div className={styles.stars} aria-label={`${stars} de 3 estrelas`}>
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
                    <span className={styles.nodeBadge} aria-label="Sabichão" title="Sabichão">
                      🏆
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
