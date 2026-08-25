import { useState, useCallback } from 'react';
import type { ChoiceActivity, ChoiceAnswer } from './types';
import styles from './ChoiceSelect.module.css';

interface Props {
  activity: ChoiceActivity;
  onComplete: (success: boolean, detail: ChoiceAnswer) => void;
  onSkip: () => void;
}

type CheckState = 'idle' | 'unselected' | 'correct' | 'incorrect';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function ChoiceSelect({ activity, onComplete, onSkip }: Props) {
  const { prompt, options, correctOptionId, explanation } = activity;

  // Shuffle display order on mount; correctOptionId is id-based so validation is unaffected
  const [displayOptions] = useState(() => shuffle([...options]));

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checkState, setCheckState] = useState<CheckState>('idle');

  const isRevealed = checkState === 'correct' || checkState === 'incorrect';
  const isSuccess = checkState === 'correct';

  const handleSelect = useCallback(
    (id: string) => {
      if (isRevealed) return;
      setSelectedId(id);
      setCheckState('idle');
    },
    [isRevealed]
  );

  const check = useCallback(() => {
    if (!selectedId) {
      setCheckState('unselected');
      return;
    }
    const detail: ChoiceAnswer = { selectedOptionId: selectedId };
    if (selectedId === correctOptionId) {
      setCheckState('correct');
      onComplete(true, detail);
    } else {
      setCheckState('incorrect');
      onComplete(false, detail);
    }
  }, [selectedId, correctOptionId, onComplete]);

  const retry = useCallback(() => {
    setSelectedId(null);
    setCheckState('idle');
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      <ul className={styles.list} aria-label="Opções">
        {displayOptions.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrectOption = option.id === correctOptionId;

          let stateClass = '';
          if (checkState === 'correct' && isSelected) stateClass = styles.correct;
          if (checkState === 'incorrect' && isSelected) stateClass = styles.wrong;
          if (checkState === 'incorrect' && isCorrectOption) stateClass = styles.reveal;

          return (
            <li key={option.id}>
              <button
                className={[
                  styles.optionBlock,
                  !isRevealed && isSelected ? styles.selected : '',
                  stateClass,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleSelect(option.id)}
                aria-pressed={!isRevealed ? isSelected : undefined}
                disabled={isRevealed}
              >
                {option.text}
                {checkState === 'incorrect' && isCorrectOption && (
                  <span className={styles.correctLabel} aria-label="Esta era a opção correta">
                    ← correta
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {!isRevealed && (
        <button className={styles.checkBtn} onClick={check}>
          Conferir
        </button>
      )}

      {checkState === 'unselected' && (
        <p className={styles.msgInfo} role="alert">
          Toque em uma opção antes de conferir.
        </p>
      )}

      {/* Explanation is shown after answering, regardless of correct/incorrect */}
      {isRevealed && (
        <div className={styles.explanation} role="alert">
          <p className={styles.explanationText}>{explanation}</p>
          {checkState === 'incorrect' && (
            <button className={styles.retryBtn} onClick={retry}>
              Tentar novamente
            </button>
          )}
        </div>
      )}

      {isSuccess && (
        <p className={styles.msgSuccess} role="status">
          Correto!
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
