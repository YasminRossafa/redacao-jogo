import { useEffect } from 'react';
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

/** Crescent moon — locked & completed non-final phases. Uses currentColor. */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M15.5 2.2A9.3 9.3 0 1 0 21.8 16 7.6 7.6 0 0 1 15.5 2.2z" />
    </svg>
  );
}

/** Planet disc with craters — current phase & the finale. Uses currentColor. */
function PlanetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="8" />
      <circle cx="9" cy="9.5" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="14.5" cy="13.5" r="2.2" fill="rgba(255,255,255,0.32)" />
    </svg>
  );
}

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
    unlockPhase('fase1');
  }, [unlockPhase]);

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
          const stars = score !== null ? getTierStars(score.correctCount) : null;

          // Finale and the current phase show a planet; other phases show a moon.
          const usePlanet = isFinal || state === 'current';

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
                    state === 'current' ? styles.nodeBig : '',
                    NODE_STATE_CLASS[state],
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => state !== 'locked' && navigate(`/fase/${phase.id}`)}
                  disabled={state === 'locked'}
                  aria-label={`${phase.label}${state === 'locked' ? ' — bloqueado' : ''}`}
                >
                  <span className={styles.nodeIcon}>
                    {usePlanet ? <PlanetIcon /> : <MoonIcon />}
                  </span>
                </button>

                {state === 'current' && (
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
