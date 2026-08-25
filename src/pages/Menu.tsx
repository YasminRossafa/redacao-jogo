import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { PHASES } from '../content/index';
import styles from './Menu.module.css';

export function Menu() {
  const navigate = useNavigate();
  const { isPhaseUnlocked, unlockPhase } = useProgress();

  useEffect(() => {
    unlockPhase('fase1');
  }, [unlockPhase]);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Redação ENEM</h1>
        <p className={styles.subtitle}>Pratique a estrutura da dissertação-argumentativa.</p>
      </header>

      <ul className={styles.phaseList} aria-label="Fases do jogo">
        {PHASES.map((phase, index) => {
          const unlocked = isPhaseUnlocked(phase.id);

          return (
            <li key={phase.id}>
              <button
                className={[styles.phaseCard, unlocked ? styles.unlocked : styles.locked].join(' ')}
                onClick={() => unlocked && navigate(`/fase/${phase.id}`)}
                aria-disabled={!unlocked}
                tabIndex={unlocked ? 0 : -1}
              >
                <span className={styles.phaseNumber}>{index + 1}</span>
                <span className={styles.phaseInfo}>
                  <span className={styles.phaseLabel}>{phase.label}</span>
                  <span className={styles.phaseSubtitle}>{phase.subtitle}</span>
                </span>
                <span className={styles.phaseStatus} aria-hidden>
                  {unlocked ? '→' : '🔒'}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
