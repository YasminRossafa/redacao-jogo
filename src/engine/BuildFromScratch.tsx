import { useState, useCallback } from 'react';
import type { BuildActivity, BuildAnswer } from './types';
import styles from './BuildFromScratch.module.css';

interface Props {
  activity: BuildActivity;
  onComplete: (success: boolean, detail: BuildAnswer) => void;
  onSkip: () => void;
}

type CheckState = 'idle' | 'wrong-set' | 'wrong-order' | 'correct';

type Fragment = BuildActivity['fragments'][number];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function BuildFromScratch({ activity, onComplete, onSkip }: Props) {
  const { prompt, fragments, correctSequence } = activity;

  const [pool, setPool] = useState<Fragment[]>(() => shuffle(fragments));
  const [placed, setPlaced] = useState<Fragment[]>([]);
  const [checkState, setCheckState] = useState<CheckState>('idle');

  const isSuccess = checkState === 'correct';

  const placeFragment = useCallback(
    (fragment: Fragment) => {
      if (isSuccess) return;
      setPlaced((prev) => [...prev, fragment]);
      setPool((prev) => prev.filter((f) => f.id !== fragment.id));
      setCheckState('idle');
    },
    [isSuccess]
  );

  const removeFromSlot = useCallback(
    (index: number) => {
      if (isSuccess) return;
      const fragment = placed[index];
      setPool((prev) => [...prev, fragment]);
      setPlaced((prev) => prev.filter((_, i) => i !== index));
      setCheckState('idle');
    },
    [placed, isSuccess]
  );

  const check = useCallback(() => {
    const placedIds = placed.map((f) => f.id);
    const detail: BuildAnswer = { userFragmentIds: placedIds };
    const correctSet = new Set(correctSequence);
    const placedSet = new Set(placedIds);

    const sameSet =
      placedIds.length === correctSequence.length &&
      placedIds.every((id) => correctSet.has(id)) &&
      correctSequence.every((id) => placedSet.has(id));

    if (!sameSet) {
      setCheckState('wrong-set');
      onComplete(false, detail);
      return;
    }

    const inOrder = placedIds.every((id, i) => id === correctSequence[i]);
    if (!inOrder) {
      setCheckState('wrong-order');
      onComplete(false, detail);
      return;
    }

    setCheckState('correct');
    onComplete(true, detail);
  }, [placed, correctSequence, onComplete]);

  const retry = useCallback(() => {
    setPool((prev) => shuffle([...prev, ...placed]));
    setPlaced([]);
    setCheckState('idle');
  }, [placed]);

  const slotStateClass =
    checkState === 'correct'
      ? styles.slotCorrect
      : checkState === 'wrong-order'
      ? styles.slotWrongOrder
      : '';

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      {/* Built sequence */}
      {placed.length > 0 ? (
        <ol className={styles.slots} aria-label="Sequência montada">
          {placed.map((fragment, i) => (
            <li
              key={fragment.id}
              className={[styles.slot, slotStateClass].filter(Boolean).join(' ')}
            >
              <span className={styles.slotNumber}>{i + 1}</span>
              <button
                className={styles.placedBlock}
                onClick={() => removeFromSlot(i)}
                disabled={isSuccess}
                aria-label={`Remover fragmento da posição ${i + 1}`}
              >
                {fragment.text}
              </button>
            </li>
          ))}
        </ol>
      ) : (
        !isSuccess && (
          <p className={styles.emptyHint}>
            Toque nos fragmentos abaixo para montar a sequência.
          </p>
        )
      )}

      {/* Pool */}
      {pool.length > 0 && !isSuccess && (
        <ul className={styles.pool} aria-label="Fragmentos disponíveis">
          {pool.map((fragment) => (
            <li key={fragment.id}>
              <button
                className={styles.poolBlock}
                onClick={() => placeFragment(fragment)}
              >
                {fragment.text}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Check — disabled with zero placed */}
      {!isSuccess && (
        <button
          className={styles.checkBtn}
          onClick={check}
          disabled={placed.length === 0}
        >
          Conferir
        </button>
      )}

      {checkState === 'wrong-set' && (
        <div className={styles.msgError} role="alert">
          <p>
            Há fragmentos incorretos na sequência, ou faltam fragmentos que deveriam
            estar aqui.
          </p>
          <button className={styles.retryBtn} onClick={retry}>
            Tentar novamente
          </button>
        </div>
      )}

      {checkState === 'wrong-order' && (
        <div className={styles.msgWarning} role="alert">
          <p>Você escolheu os fragmentos certos, mas a ordem está incorreta.</p>
          <button className={styles.retryBtn} onClick={retry}>
            Tentar novamente
          </button>
        </div>
      )}

      {isSuccess && (
        <p className={styles.msgSuccess} role="alert">
          Perfeito! Você montou a sequência correta.
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
