import { useState, useCallback } from 'react';
import type { ErrorSpotActivity, ErrorSpotAnswer } from './types';
import styles from './ErrorSpot.module.css';

interface Props {
  activity: ErrorSpotActivity;
  onComplete: (success: boolean, detail: ErrorSpotAnswer) => void;
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

export function ErrorSpot({ activity, onComplete, onSkip }: Props) {
  const { prompt, sentences, errorSentenceIds, explanation, contextText } = activity;

  // Shuffle display order on mount; errorSentenceIds is id-based so validation is unaffected
  const [displaySentences] = useState(() => shuffle([...sentences]));

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
    const detail: ErrorSpotAnswer = { selectedSentenceId: selectedId };
    if (errorSentenceIds.includes(selectedId)) {
      setCheckState('correct');
      onComplete(true, detail);
    } else {
      setCheckState('incorrect');
      onComplete(false, detail);
    }
  }, [selectedId, errorSentenceIds, onComplete]);

  const retry = useCallback(() => {
    setSelectedId(null);
    setCheckState('idle');
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      {contextText && (
        <p className={styles.context} aria-label="Contexto">
          {contextText}
        </p>
      )}

      <ul className={styles.list} aria-label="Frases">
        {displaySentences.map((sentence) => {
          const isSelected = selectedId === sentence.id;
          const isCorrectSentence = errorSentenceIds.includes(sentence.id);

          let stateClass = '';
          if (checkState === 'correct' && isSelected) stateClass = styles.correct;
          if (checkState === 'incorrect' && isSelected) stateClass = styles.wrong;
          if (checkState === 'incorrect' && isCorrectSentence) stateClass = styles.reveal;

          return (
            <li key={sentence.id}>
              <button
                className={[
                  styles.sentenceBlock,
                  !isRevealed && isSelected ? styles.selected : '',
                  stateClass,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleSelect(sentence.id)}
                aria-pressed={!isRevealed ? isSelected : undefined}
                disabled={isRevealed}
              >
                {sentence.text}
                {checkState === 'incorrect' && isCorrectSentence && (
                  <span className={styles.correctLabel} aria-label="Esta era a frase com erro">
                    ← com erro
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
          Toque em uma frase antes de conferir.
        </p>
      )}

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
          Correto! Você identificou o erro.
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
