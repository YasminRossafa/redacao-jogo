import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { PHASES } from '../content/index';
import { getTierStars } from '../content/index';
import styles from './Menu.module.css';

type NodeState = 'locked' | 'current' | 'completed';

const NODE_STATE_CLASS: Record<NodeState, string> = {
  locked:    styles.nodeLocked,
  current:   styles.nodeCurrent,
  completed: styles.nodeCompleted,
};

function nodeIcon(state: NodeState, isFinal: boolean): string {
  if (state === 'locked') return '🔒';
  if (isFinal) return '🏆';
  if (state === 'completed') return '✓';
  return '▶';
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
          const icon = nodeIcon(state, isFinal);

          return (
            <div
              key={phase.id}
              className={[styles.step, isLeft ? styles.stepLeft : styles.stepRight].join(' ')}
              role="listitem"
            >
              <button
                className={[
                  styles.node,
                  isFinal ? styles.nodeFinal : '',
                  NODE_STATE_CLASS[state],
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => state !== 'locked' && navigate(`/fase/${phase.id}`)}
                disabled={state === 'locked'}
                aria-label={`${phase.label}${state === 'locked' ? ' — bloqueado' : ''}`}
              >
                <span className={styles.nodeIcon} aria-hidden>
                  {icon}
                </span>
              </button>

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
