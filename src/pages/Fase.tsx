import { useState, useCallback } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import { CONTENT, PHASES, getNextPhaseId, getTier } from '../content/index';
import { OrderPuzzle } from '../engine/OrderPuzzle';
import { TagMatch } from '../engine/TagMatch';
import { ErrorSpot } from '../engine/ErrorSpot';
import { BuildFromScratch } from '../engine/BuildFromScratch';
import type { ActivityData } from '../engine/types';
import styles from './Fase.module.css';

interface ActivityResult {
  activityId: string;
  kind: ActivityData['kind'];
  prompt: string;
  success: boolean;
  explanation?: string; // stored only for failed error-spot entries
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

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
  const { recordActivityResult, unlockPhase, incrementPhaseErrors, resetPhaseErrors } =
    useProgress();

  const baseActivities = phaseId ? (CONTENT[phaseId] ?? []) : [];
  const phase = PHASES.find((p) => p.id === phaseId);

  const [shuffledActivities, setShuffledActivities] = useState<ActivityData[]>(
    () => shuffle([...baseActivities])
  );
  const [activityIndex, setActivityIndex] = useState(0);
  const [succeeded, setSucceeded] = useState(false);
  const [results, setResults] = useState<ActivityResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleComplete = useCallback(
    (success: boolean) => {
      if (!phaseId) return;

      const activity = shuffledActivities[activityIndex];
      recordActivityResult(phaseId, activity.id, success);
      if (!success) incrementPhaseErrors(phaseId);

      // Record first outcome only — subsequent calls for the same slot are ignored
      setResults((prev) => {
        if (prev.length > activityIndex) return prev;
        const explanation =
          activity.kind === 'error-spot' && !success ? activity.explanation : undefined;
        return [
          ...prev,
          { activityId: activity.id, kind: activity.kind, prompt: activity.prompt, success, explanation },
        ];
      });

      if (success) setSucceeded(true);
    },
    [phaseId, activityIndex, shuffledActivities, recordActivityResult, incrementPhaseErrors]
  );

  const advance = useCallback(() => {
    if (activityIndex < shuffledActivities.length - 1) {
      setActivityIndex((i) => i + 1);
      setSucceeded(false);
    } else {
      if (phaseId) {
        const nextId = getNextPhaseId(phaseId);
        if (nextId) unlockPhase(nextId);
      }
      setShowResults(true);
    }
  }, [activityIndex, shuffledActivities.length, phaseId, unlockPhase]);

  const restart = useCallback(() => {
    if (phaseId) resetPhaseErrors(phaseId);
    setShuffledActivities(shuffle([...baseActivities]));
    setActivityIndex(0);
    setSucceeded(false);
    setResults([]);
    setShowResults(false);
    setShowReview(false);
  }, [phaseId, baseActivities, resetPhaseErrors]);

  // Unknown phase
  if (!phaseId || !phase) return <Navigate to="/" replace />;

  // Phase exists but content not yet built
  if (baseActivities.length === 0) {
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

  // Results screen
  if (showResults) {
    const correctCount = results.filter((r) => r.success).length;
    const totalCount = shuffledActivities.length;
    const tier = getTier(correctCount);
    const nextId = phaseId ? getNextPhaseId(phaseId) : null;
    const nextPhase = nextId ? PHASES.find((p) => p.id === nextId) : null;

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ← Menu
          </button>
          <span className={styles.phaseName}>{phase.label}</span>
        </header>

        <div className={styles.results}>
          <div
            className={styles.tierBadge}
            style={{ color: tier.color, backgroundColor: tier.bg }}
          >
            {tier.label}
          </div>

          <p className={styles.score}>
            <strong>{correctCount}</strong> de <strong>{totalCount}</strong> corretas
          </p>

          <p className={styles.unlockNote}>
            {nextPhase ? `${nextPhase.label} liberada!` : 'Você completou todas as fases!'}
          </p>

          <button
            className={styles.reviewToggleBtn}
            onClick={() => setShowReview((v) => !v)}
          >
            {showReview ? 'Ocultar erros e acertos' : 'Ver erros e acertos'}
          </button>

          {showReview && (
            <ul className={styles.reviewList}>
              {results.map((result) => (
                <li key={result.activityId} className={styles.reviewItem}>
                  <span
                    className={[
                      styles.reviewIcon,
                      result.success ? styles.iconOk : styles.iconFail,
                    ].join(' ')}
                    aria-hidden
                  >
                    {result.success ? '✓' : '✗'}
                  </span>
                  <div className={styles.reviewContent}>
                    <p className={styles.reviewPrompt}>{result.prompt}</p>
                    {result.explanation && (
                      <p className={styles.reviewExplanation}>{result.explanation}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <button className={styles.restartBtn} onClick={restart}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Activity screen
  const isLast = activityIndex === shuffledActivities.length - 1;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Menu
        </button>
        <span className={styles.phaseName}>{phase.label}</span>
        <span className={styles.progress}>
          {activityIndex + 1}/{shuffledActivities.length}
        </span>
      </header>

      {/* key forces remount when activity changes, resetting internal component state */}
      <div key={activityIndex} className={styles.activityWrap}>
        <ActivityRenderer
          activity={shuffledActivities[activityIndex]}
          onComplete={handleComplete}
        />
      </div>

      {succeeded && (
        <div className={styles.nextBar}>
          <button className={styles.nextBtn} onClick={advance}>
            {isLast ? 'Ver resultado →' : 'Próxima atividade →'}
          </button>
        </div>
      )}
    </div>
  );
}
