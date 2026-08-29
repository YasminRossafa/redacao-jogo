import { useState, useCallback, useMemo } from 'react';
import type { OrderActivity, OrderAnswer } from './types';
import styles from './OrderPuzzle.module.css';

interface Props {
  activity: OrderActivity;
  onComplete: (success: boolean, detail: OrderAnswer) => void;
  onSkip: () => void;
}

type CheckState = 'idle' | 'incomplete' | 'correct' | 'incorrect';

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // If the shuffle produced the original order, rotate by one to guarantee different
  if (out.every((v, i) => v === arr[i]) && out.length > 1) {
    out.push(out.shift()!);
  }
  return out;
}

export function OrderPuzzle({ activity, onComplete, onSkip }: Props) {
  const { prompt, items, distractors } = activity;

  // Real items plus any pool-only distractors. Slots still number items.length,
  // so a placed distractor always displaces a required item and fails the check.
  const blocks = useMemo(() => [...items, ...(distractors ?? [])], [items, distractors]);

  // Stable shuffled order used to render the unplaced pool.
  const [displayOrder] = useState(() => shuffle(blocks));
  // Single source of truth: a compact, ordered list of placed item ids.
  // The pool is DERIVED from this — an unplaced item can never be duplicated.
  const [placed, setPlaced] = useState<string[]>([]);
  const [checkState, setCheckState] = useState<CheckState>('idle');
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set());

  const isSuccess = checkState === 'correct';

  const itemById = useCallback(
    (id: string) => blocks.find((it) => it.id === id)!,
    [blocks]
  );

  const placedSet = new Set(placed);
  const pool = displayOrder.filter((it) => !placedSet.has(it.id));

  const placeItem = useCallback(
    (id: string) => {
      setPlaced((prev) => (prev.length >= items.length ? prev : [...prev, id]));
      setCheckState('idle');
      setWrongSlots(new Set());
    },
    [items.length]
  );

  // Remove exactly one item at the given placed-index; the list below shifts
  // up to close the gap. Single, atomic functional update — no ghost duplicates.
  const removeAt = useCallback((placedIndex: number) => {
    setPlaced((prev) => prev.filter((_, i) => i !== placedIndex));
    setCheckState('idle');
    setWrongSlots(new Set());
  }, []);

  const check = useCallback(() => {
    if (placed.length < items.length) {
      setCheckState('incomplete');
      return;
    }
    const wrong = new Set<number>();
    placed.forEach((id, i) => {
      if (id !== items[i].id) wrong.add(i);
    });
    const detail: OrderAnswer = { userOrder: [...placed] };
    if (wrong.size === 0) {
      setCheckState('correct');
      onComplete(true, detail);
    } else {
      setWrongSlots(wrong);
      setCheckState('incorrect');
      onComplete(false, detail);
    }
  }, [placed, items, onComplete]);

  const retry = useCallback(() => {
    setCheckState('idle');
    setWrongSlots(new Set());
  }, []);

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      <ol className={styles.slots} aria-label="Sequência">
        {Array.from({ length: items.length }, (_, i) => {
          const id = placed[i];
          const item = id ? itemById(id) : null;
          return (
            <li
              key={i}
              className={[
                styles.slot,
                item ? styles.slotFilled : styles.slotEmpty,
                wrongSlots.has(i) ? styles.slotWrong : '',
                isSuccess ? styles.slotCorrect : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.slotNumber}>{i + 1}</span>
              {item ? (
                <button
                  className={styles.placedBlock}
                  onClick={() => !isSuccess && removeAt(i)}
                  aria-label={`Remover "${item.label}" do slot ${i + 1}`}
                  disabled={isSuccess}
                >
                  {item.label}
                </button>
              ) : (
                <span className={styles.emptyLabel} aria-hidden>
                  —
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {pool.length > 0 && !isSuccess && (
        <ul className={styles.pool} aria-label="Opções disponíveis">
          {pool.map((item) => (
            <li key={item.id}>
              <button
                className={styles.poolBlock}
                onClick={() => placeItem(item.id)}
                aria-label={`Colocar "${item.label}"`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {!isSuccess && (
        <button className={styles.checkBtn} onClick={check}>
          Conferir
        </button>
      )}

      {checkState === 'incomplete' && (
        <p className={styles.msgInfo} role="alert">
          Preencha todos os espaços antes de conferir.
        </p>
      )}

      {checkState === 'incorrect' && (
        <div className={styles.msgError} role="alert">
          <p>Alguns itens estão fora de ordem. Tente ajustar os marcados em vermelho.</p>
          <button className={styles.retryBtn} onClick={retry}>
            Tentar novamente
          </button>
        </div>
      )}

      {checkState === 'correct' && (
        <p className={styles.msgSuccess} role="alert">
          Correto! Você acertou a ordem.
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
