import { useState, useCallback } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { CONTENT, PHASES, getNextPhaseId } from '../content/index';
import { OrderPuzzle } from '../engine/OrderPuzzle';
import { TagMatch } from '../engine/TagMatch';
import { ErrorSpot } from '../engine/ErrorSpot';
import { BuildFromScratch } from '../engine/BuildFromScratch';
import type { ActivityData } from '../engine/types';
import styles from './Fase.module.css';

function ActivityRenderer({
  activity,
  onComplete,
}: {
  activity: ActivityData;
  onComplete: (success: boolean) => void;
}) {
  switch (activity.kind) {
    case 'order':
      return <OrderPuzzle activity={activity} onComplete={onComplete} />;
    case 'tag-match':
      return <TagMatch activity={activity} onComplete={onComplete} />;
    case 'error-spot':
      return <ErrorSpot activity={activity} onComplete={onComplete} />;
    case 'build':
      return <BuildFromScratch activity={activity} onComplete={onComplete} />;
  }
}

export function Fase() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const { recordActivityResult, unlockPhase } = useProgress();

  const activities = phaseId ? (CONTENT[phaseId] ?? []) : [];
  const phase = PHASES.find((p) => p.id === phaseId);

  const [activityIndex, setActivityIndex] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [phaseComplete, setPhaseComplete] = useState(false);

  const handleComplete = useCallback(
    (success: boolean) => {
      if (!phaseId) return;
      recordActivityResult(phaseId, `activity-${activityIndex}`, success);
      if (success) setSucceeded(true);
    },
    [phaseId, activityIndex, recordActivityResult]
  );

  const advance = useCallback(() => {
    if (activityIndex < activities.length - 1) {
      setActivityIndex((i) => i + 1);
      setSucceeded(false);
    } else {
      if (phaseId) {
        const nextId = getNextPhaseId(phaseId);
        if (nextId) unlockPhase(nextId);
      }
      setPhaseComplete(true);
    }
  }, [activityIndex, activities.length, phaseId, unlockPhase]);

  // Unknown phase
  if (!phaseId || !phase) return <Navigate to="/" replace />;

  // Phase exists but content not yet built
  if (activities.length === 0) {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ← Menu
          </button>
          <span className={styles.phaseName}>{phase.label}</span>
        </header>
        <div className={styles.comingSoon}>
          <p>Conteúdo em desenvolvimento.</p>
          <button className={styles.menuBtn} onClick={() => navigate('/')}>
            Voltar ao menu
          </button>
        </div>
      </div>
    );
  }

  // Completion screen
  if (phaseComplete) {
    const nextId = phaseId ? getNextPhaseId(phaseId) : null;
    const nextPhase = nextId ? PHASES.find((p) => p.id === nextId) : null;
    return (
      <div className={styles.root}>
        <div className={styles.completion}>
          <p className={styles.completionIcon} aria-hidden>
            ✓
          </p>
          <h2 className={styles.completionTitle}>Fase concluída!</h2>
          <p className={styles.completionSub}>
            Você completou <strong>{phase.label}</strong>.
            {nextPhase && (
              <>
                {' '}
                A próxima fase — <strong>{nextPhase.label}</strong> — foi desbloqueada.
              </>
            )}
          </p>
          <button className={styles.menuBtn} onClick={() => navigate('/')}>
            ← Voltar ao menu
          </button>
        </div>
      </div>
    );
  }

  const isLast = activityIndex === activities.length - 1;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <span className={styles.phaseName}>{phase.label}</span>
        <span className={styles.progress}>
          {activityIndex + 1}/{activities.length}
        </span>
      </header>

      {/* key forces remount when activity changes, resetting component state */}
      <div key={activityIndex} className={styles.activityWrap}>
        <ActivityRenderer
          activity={activities[activityIndex]}
          onComplete={handleComplete}
        />
      </div>

      {succeeded && (
        <div className={styles.nextBar}>
          <button className={styles.nextBtn} onClick={advance}>
            {isLast ? 'Concluir fase →' : 'Próxima atividade →'}
          </button>
        </div>
      )}
    </div>
  );
}
