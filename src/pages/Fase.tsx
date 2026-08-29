import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useProgress } from '../progress/useProgress';
import {
  CONTENT,
  PHASES,
  getNextPhaseId,
  getTier,
  getPhaseTotal,
  getUnlockThreshold,
} from '../content/index';
import { OrderPuzzle } from '../engine/OrderPuzzle';
import { TagMatch } from '../engine/TagMatch';
import { ErrorSpot } from '../engine/ErrorSpot';
import { BuildFromScratch } from '../engine/BuildFromScratch';
import { ChoiceSelect } from '../engine/ChoiceSelect';
import { SegmentSpot } from '../engine/SegmentSpot';
import { FeedbackBurst } from '../engine/FeedbackBurst';
import type { ActivityData, AnswerDetail } from '../engine/types';
import styles from './Fase.module.css';

interface ActivityResult {
  activityId: string;
  kind: ActivityData['kind'];
  prompt: string;
  /** Kept as false for a skip; `outcome` carries the finer distinction. */
  success: boolean;
  outcome: 'success' | 'failure' | 'skipped';
  explanation?: string;
  /** What the student actually answered, kind-tagged. Absent for a skip. */
  detail?: AnswerDetail;
  /** The activity's own data, kept so correct answers resolve for display. */
  activity: ActivityData;
}

interface BurstState {
  key: number;
  success: boolean;
  combo: number;
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
  onSkip,
}: {
  activity: ActivityData;
  onComplete: (success: boolean, detail: AnswerDetail) => void;
  onSkip: () => void;
}) {
  // Each engine reports a bare answer object; we tag it with `kind` here so the
  // result screen can discriminate the union without re-checking activity data.
  switch (activity.kind) {
    case 'order':
      return (
        <OrderPuzzle
          activity={activity}
          onComplete={(s, d) => onComplete(s, { kind: 'order', ...d })}
          onSkip={onSkip}
        />
      );
    case 'tag-match':
      return (
        <TagMatch
          activity={activity}
          onComplete={(s, d) => onComplete(s, { kind: 'tag-match', ...d })}
          onSkip={onSkip}
        />
      );
    case 'error-spot':
      return (
        <ErrorSpot
          activity={activity}
          onComplete={(s, d) => onComplete(s, { kind: 'error-spot', ...d })}
          onSkip={onSkip}
        />
      );
    case 'build':
      return (
        <BuildFromScratch
          activity={activity}
          onComplete={(s, d) => onComplete(s, { kind: 'build', ...d })}
          onSkip={onSkip}
        />
      );
    case 'choice':
      return (
        <ChoiceSelect
          activity={activity}
          onComplete={(s, d) => onComplete(s, { kind: 'choice', ...d })}
          onSkip={onSkip}
        />
      );
    case 'segment-spot':
      return (
        <SegmentSpot
          activity={activity}
          onComplete={(s, d) => onComplete(s, { kind: 'segment-spot', ...d })}
          onSkip={onSkip}
        />
      );
  }
}

/** Renders what the student answered vs. the correct answer, per activity kind.
 *  A skipped activity has no `detail`, so it shows only the correct answer. */
function ReviewDetail({ result }: { result: ActivityResult }) {
  const { detail, activity, outcome } = result;
  const skipped = outcome === 'skipped';
  const showCorrect = outcome !== 'success'; // wrong or skipped

  // Branch on activity.kind (always present); use detail only when it exists.
  if (activity.kind === 'order') {
    const label = (id: string) => activity.items.find((it) => it.id === id)?.label ?? id;
    const answer = detail && detail.kind === 'order' ? detail : null;
    return (
      <>
        {answer && (
          <div className={styles.reviewBlock}>
            <span className={styles.reviewLabel}>Sua ordem</span>
            <ol className={styles.reviewSeq}>
              {answer.userOrder.map((id, i) => (
                <li key={i} className={styles.reviewSeqItem}>{label(id)}</li>
              ))}
            </ol>
          </div>
        )}
        {showCorrect && (
          <div className={styles.reviewBlock}>
            <span className={styles.reviewLabel}>Ordem certa</span>
            <ol className={styles.reviewSeq}>
              {activity.items.map((it) => (
                <li key={it.id} className={[styles.reviewSeqItem, styles.reviewCorrect].join(' ')}>
                  {it.label}
                </li>
              ))}
            </ol>
          </div>
        )}
      </>
    );
  }

  if (activity.kind === 'tag-match') {
    const tagLabel = (id: string | null) =>
      id ? activity.tags.find((t) => t.id === id)?.label ?? id : 'não marcado';
    const answer = detail && detail.kind === 'tag-match' ? detail : null;
    return (
      <div className={styles.reviewBlock}>
        {activity.sentences.map((s) => {
          const correct = activity.mapping[s.id]; // undefined for non-target sentences
          // Skipped: show only the sentences that actually have a correct tag.
          if (skipped && correct === undefined) return null;
          const assigned = answer ? answer.userMapping[s.id] ?? null : null;
          const isWrong = correct !== undefined && assigned !== correct;
          return (
            <div key={s.id} className={styles.reviewTagRow}>
              <p className={styles.reviewSentence}>{s.text}</p>
              {answer && (
                <p className={styles.reviewLine}>
                  <span className={styles.reviewLineKey}>Você marcou:</span>{' '}
                  <span className={assigned === null ? styles.reviewMuted : undefined}>
                    {tagLabel(assigned)}
                  </span>
                </p>
              )}
              {correct !== undefined && (skipped || isWrong) && (
                <p className={styles.reviewLine}>
                  <span className={styles.reviewLineKey}>Correto:</span>{' '}
                  <span className={styles.reviewCorrect}>{tagLabel(correct)}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (activity.kind === 'error-spot') {
    const text = (id: string) => activity.sentences.find((s) => s.id === id)?.text ?? id;
    const answer = detail && detail.kind === 'error-spot' ? detail : null;
    return (
      <>
        {showCorrect && (
          <div className={styles.reviewBlock}>
            {answer && (
              <p className={styles.reviewLine}>
                <span className={styles.reviewLineKey}>Você escolheu:</span>{' '}
                {text(answer.selectedSentenceId)}
              </p>
            )}
            <p className={styles.reviewLine}>
              <span className={styles.reviewLineKey}>
                {activity.errorSentenceIds.length > 1 ? 'Frases com erro:' : 'Frase com erro:'}
              </span>{' '}
              <span className={styles.reviewCorrect}>
                {activity.errorSentenceIds.map((id) => text(id)).join(' / ')}
              </span>
            </p>
          </div>
        )}
        {showCorrect && <p className={styles.reviewExplanation}>{activity.explanation}</p>}
      </>
    );
  }

  if (activity.kind === 'build') {
    const frag = (id: string) => activity.fragments.find((f) => f.id === id);
    const answer = detail && detail.kind === 'build' ? detail : null;
    return (
      <>
        {answer && (
          <div className={styles.reviewBlock}>
            <span className={styles.reviewLabel}>Você usou</span>
            <ol className={styles.reviewSeq}>
              {answer.userFragmentIds.map((id, i) => {
                const f = frag(id);
                const isDistractor = f ? !f.correct : false;
                return (
                  <li
                    key={i}
                    className={[styles.reviewSeqItem, isDistractor ? styles.reviewDistractor : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {f?.text ?? id}
                    {isDistractor && <span className={styles.reviewFlag}>fragmento incorreto</span>}
                  </li>
                );
              })}
            </ol>
          </div>
        )}
        {showCorrect && (
          <div className={styles.reviewBlock}>
            <span className={styles.reviewLabel}>Sequência certa</span>
            <ol className={styles.reviewSeq}>
              {activity.acceptedOrders[0].map((id) => (
                <li key={id} className={[styles.reviewSeqItem, styles.reviewCorrect].join(' ')}>
                  {frag(id)?.text ?? id}
                </li>
              ))}
            </ol>
          </div>
        )}
      </>
    );
  }

  if (activity.kind === 'choice') {
    const text = (id: string) => activity.options.find((o) => o.id === id)?.text ?? id;
    const answer = detail && detail.kind === 'choice' ? detail : null;
    return (
      <>
        {showCorrect && (
          <div className={styles.reviewBlock}>
            {answer && (
              <p className={styles.reviewLine}>
                <span className={styles.reviewLineKey}>Você escolheu:</span>{' '}
                {text(answer.selectedOptionId)}
              </p>
            )}
            <p className={styles.reviewLine}>
              <span className={styles.reviewLineKey}>Correto:</span>{' '}
              <span className={styles.reviewCorrect}>{text(activity.correctOptionId)}</span>
            </p>
          </div>
        )}
        {/* Explanation is shown after answering regardless of correct/incorrect */}
        <p className={styles.reviewExplanation}>{activity.explanation}</p>
      </>
    );
  }

  if (activity.kind === 'segment-spot') {
    const segText = (id: string) =>
      activity.segments.find((s) => s.id === id)?.text ?? id;
    const answer = detail && detail.kind === 'segment-spot' ? detail : null;
    return (
      <>
        {showCorrect && (
          <div className={styles.reviewBlock}>
            {answer && (
              <p className={styles.reviewLine}>
                <span className={styles.reviewLineKey}>Você tocou:</span>{' '}
                {segText(answer.selectedSegmentId)}
              </p>
            )}
            <p className={styles.reviewLine}>
              <span className={styles.reviewLineKey}>Parte correta:</span>{' '}
              <span className={styles.reviewCorrect}>{segText(activity.targetSegmentId)}</span>
            </p>
          </div>
        )}
      </>
    );
  }

  return null;
}

export function Fase() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const {
    recordActivityResult,
    unlockPhase,
    incrementPhaseErrors,
    resetPhaseErrors,
    recordPhaseScore,
    awardBadge,
  } = useProgress();

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

  // Combo tracking — ref for synchronous reads inside handleComplete (avoids adding
  // combo to the dep array, which would cascade unnecessary callback recreation to
  // all engine components on every answer).
  const comboRef = useRef(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [burst, setBurst] = useState<BurstState | null>(null);

  const handleComplete = useCallback(
    (success: boolean, detail: AnswerDetail) => {
      if (!phaseId) return;

      const activity = shuffledActivities[activityIndex];
      recordActivityResult(phaseId, activity.id, success);
      if (!success) incrementPhaseErrors(phaseId);

      // Update combo using ref so this callback stays stable across combo changes
      const newCombo = success ? comboRef.current + 1 : 0;
      comboRef.current = newCombo;
      setBestCombo((prev) => Math.max(prev, newCombo));
      setBurst({ key: Date.now(), success, combo: newCombo });

      // Record first outcome only — subsequent calls for the same slot are ignored
      setResults((prev) => {
        if (prev.length > activityIndex) return prev;
        const explanation =
          activity.kind === 'error-spot' && !success ? activity.explanation : undefined;
        return [
          ...prev,
          {
            activityId: activity.id,
            kind: activity.kind,
            prompt: activity.prompt,
            success,
            outcome: success ? 'success' : 'failure',
            explanation,
            detail,
            activity,
          },
        ];
      });

      if (success) setSucceeded(true);
    },
    [phaseId, activityIndex, shuffledActivities, recordActivityResult, incrementPhaseErrors]
  );

  // Record the best score, award badges, and conditionally unlock the next phase
  // when the results screen is shown. useEffect ensures all state is settled first.
  useEffect(() => {
    if (!showResults || !phaseId) return;
    const correctCount = results.filter((r) => r.success).length;
    const total = getPhaseTotal(phaseId);
    recordPhaseScore(phaseId, correctCount, total, bestCombo);
    if (total > 0 && correctCount === total) {
      awardBadge(`sabichao-${phaseId}`);
    }
    const threshold = getUnlockThreshold(phaseId);
    if (correctCount >= threshold) {
      const nextId = getNextPhaseId(phaseId);
      if (nextId) unlockPhase(nextId);
    }
  }, [showResults, phaseId, results, bestCombo, recordPhaseScore, awardBadge, unlockPhase]);

  const advance = useCallback(() => {
    if (activityIndex < shuffledActivities.length - 1) {
      setActivityIndex((i) => i + 1);
      setSucceeded(false);
      setBurst(null);
    } else {
      setShowResults(true);
    }
  }, [activityIndex, shuffledActivities.length]);

  const restart = useCallback(() => {
    if (phaseId) resetPhaseErrors(phaseId);
    comboRef.current = 0;
    setBestCombo(0);
    setBurst(null);
    setShuffledActivities(shuffle([...baseActivities]));
    setActivityIndex(0);
    setSucceeded(false);
    setResults([]);
    setShowResults(false);
    setShowReview(false);
  }, [phaseId, baseActivities, resetPhaseErrors]);

  const handleSkip = useCallback(() => {
    if (!phaseId) return;
    const activity = shuffledActivities[activityIndex];

    // If a wrong attempt was already recorded for this slot, keep it as the
    // outcome — just advance. Otherwise record a distinct "skipped" outcome.
    const alreadyRecorded = results.length > activityIndex;
    if (!alreadyRecorded) {
      recordActivityResult(phaseId, activity.id, false);
      incrementPhaseErrors(phaseId); // undemonstrated — counts like a wrong answer
      comboRef.current = 0; // a skip breaks the combo, same as a wrong answer
      setResults((prev) =>
        prev.length > activityIndex
          ? prev
          : [
              ...prev,
              {
                activityId: activity.id,
                kind: activity.kind,
                prompt: activity.prompt,
                success: false,
                outcome: 'skipped',
                explanation: activity.kind === 'error-spot' ? activity.explanation : undefined,
                activity,
              },
            ]
      );
    }

    advance();
  }, [
    phaseId,
    results.length,
    activityIndex,
    shuffledActivities,
    recordActivityResult,
    incrementPhaseErrors,
    advance,
  ]);

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
    const totalCount = getPhaseTotal(phaseId);
    const tier = getTier(correctCount, phaseId);
    const nextId = phaseId ? getNextPhaseId(phaseId) : null;
    const nextPhase = nextId ? PHASES.find((p) => p.id === nextId) : null;
    const threshold = getUnlockThreshold(phaseId);
    const meetsThreshold = correctCount >= threshold;

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

          {correctCount === totalCount && (
            <div className={styles.sabichaoBadge}>
              <span aria-hidden>🏆</span> Sabichão
            </div>
          )}

          <p className={styles.score}>
            <strong>{correctCount}</strong> de <strong>{totalCount}</strong> corretas
          </p>

          <p className={styles.comboStat}>
            maior sequência:{' '}
            <strong>{bestCombo}</strong>{' '}
            acerto{bestCombo === 1 ? '' : 's'} seguido{bestCombo === 1 ? '' : 's'}
          </p>

          <p className={styles.unlockNote}>
            {nextPhase
              ? meetsThreshold
                ? `${nextPhase.label} liberada!`
                : `Tente novamente para liberar ${nextPhase.label}`
              : 'Você completou todas as fases!'}
          </p>

          <button
            className={styles.reviewToggleBtn}
            onClick={() => setShowReview((v) => !v)}
          >
            {showReview ? 'Ocultar erros e acertos' : 'Ver erros e acertos'}
          </button>

          {showReview && (
            <ul className={styles.reviewList}>
              {results.map((result) => {
                const isSkipped = result.outcome === 'skipped';
                const iconClass = result.success
                  ? styles.iconOk
                  : isSkipped
                  ? styles.iconSkip
                  : styles.iconFail;
                return (
                  <li key={result.activityId} className={styles.reviewItem}>
                    <span className={[styles.reviewIcon, iconClass].join(' ')} aria-hidden>
                      {result.success ? '✓' : isSkipped ? '–' : '✗'}
                    </span>
                    <div className={styles.reviewContent}>
                      <p className={styles.reviewPrompt}>{result.prompt}</p>
                      {isSkipped && <span className={styles.reviewSkipTag}>Pulada</span>}
                      <ReviewDetail result={result} />
                    </div>
                  </li>
                );
              })}
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
          onSkip={handleSkip}
        />
      </div>

      {/* Burst floats above content via position:fixed; pointer-events:none so
          the Próxima atividade button beneath stays tappable during the animation */}
      {burst && (
        <FeedbackBurst key={burst.key} success={burst.success} combo={burst.combo} />
      )}

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
