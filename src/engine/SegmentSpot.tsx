import { useState, useCallback } from 'react';
import type { SegmentSpotActivity, SegmentSpotAnswer } from './types';
import styles from './SegmentSpot.module.css';

interface Props {
  activity: SegmentSpotActivity;
  onComplete: (success: boolean, detail: SegmentSpotAnswer) => void;
  onSkip: () => void;
}

// 'wrong' locks the paragraph and offers a retry WITHOUT revealing the target —
// the student must tap again rather than being shown the answer.
type CheckState = 'idle' | 'unselected' | 'correct' | 'wrong';

export function SegmentSpot({ activity, onComplete, onSkip }: Props) {
  const { prompt, segments, targetSegmentId } = activity;

  // No shuffle: the segments must render in reading order to stay a real paragraph.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checkState, setCheckState] = useState<CheckState>('idle');

  const isLocked = checkState === 'correct' || checkState === 'wrong';
  const isSuccess = checkState === 'correct';

  const handleSelect = useCallback(
    (id: string) => {
      if (isLocked) return;
      setSelectedId(id);
      setCheckState('idle');
    },
    [isLocked]
  );

  const check = useCallback(() => {
    if (!selectedId) {
      setCheckState('unselected');
      return;
    }
    const detail: SegmentSpotAnswer = { selectedSegmentId: selectedId };
    if (selectedId === targetSegmentId) {
      setCheckState('correct');
      onComplete(true, detail);
    } else {
      setCheckState('wrong');
      onComplete(false, detail);
    }
  }, [selectedId, targetSegmentId, onComplete]);

  const retry = useCallback(() => {
    setSelectedId(null);
    setCheckState('idle');
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      <p className={styles.paragraph}>
        {segments.map((segment) => {
          if (!segment.selectable) {
            return (
              <span key={segment.id} className={styles.plain}>
                {segment.text}
              </span>
            );
          }

          const isSelected = selectedId === segment.id;
          let stateClass = '';
          if (checkState === 'correct' && isSelected) stateClass = styles.correct;
          if (checkState === 'wrong' && isSelected) stateClass = styles.wrong;

          return (
            <button
              key={segment.id}
              type="button"
              className={[
                styles.segment,
                !isLocked && isSelected ? styles.selected : '',
                stateClass,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(segment.id)}
              aria-pressed={!isLocked ? isSelected : undefined}
              disabled={isLocked}
            >
              {segment.text}
            </button>
          );
        })}
      </p>

      {!isLocked && (
        <button className={styles.checkBtn} onClick={check}>
          Conferir
        </button>
      )}

      {checkState === 'unselected' && (
        <p className={styles.msgInfo} role="alert">
          Toque em uma parte do parágrafo antes de conferir.
        </p>
      )}

      {checkState === 'wrong' && (
        <div className={styles.msgWarning} role="alert">
          <p>Não é essa parte. Leia de novo e tente outra.</p>
          <button className={styles.retryBtn} onClick={retry}>
            Tentar novamente
          </button>
        </div>
      )}

      {isSuccess && (
        <p className={styles.msgSuccess} role="status">
          Correto! Você identificou a parte certa.
        </p>
      )}

      {!isSuccess && (
        <button type="button" className={styles.skipBtn} onClick={onSkip}>
          Pular
        </button>
      )}
    </div>
  );
}
