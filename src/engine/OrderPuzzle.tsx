import { useState, useCallback } from 'react';
import type { OrderActivity } from './types';
import styles from './OrderPuzzle.module.css';

interface Props {
  activity: OrderActivity;
  onComplete: (success: boolean) => void;
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

export function OrderPuzzle({ activity, onComplete }: Props) {
  const { prompt, items } = activity;

  const [pool, setPool] = useState<typeof items>(() => shuffle(items));
  const [slots, setSlots] = useState<(typeof items[number] | null)[]>(() =>
    Array(items.length).fill(null)
  );
  const [checkState, setCheckState] = useState<CheckState>('idle');
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set());

  const placeItem = useCallback(
    (item: (typeof items)[number]) => {
      const firstEmpty = slots.findIndex((s) => s === null);
      if (firstEmpty === -1) return; // all slots full
      setSlots((prev) => {
        const next = [...prev];
        next[firstEmpty] = item;
        return next;
      });
      setPool((prev) => prev.filter((p) => p.id !== item.id));
      setCheckState('idle');
      setWrongSlots(new Set());
    },
    [slots]
  );

  const removeFromSlot = useCallback((slotIndex: number) => {
    setSlots((prev) => {
      const item = prev[slotIndex];
      if (!item) return prev;
      setPool((p) => [...p, item]);
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
    setCheckState('idle');
    setWrongSlots(new Set());
  }, []);

  const check = useCallback(() => {
    const filled = slots.filter(Boolean);
    if (filled.length < items.length) {
      setCheckState('incomplete');
      return;
    }

    const wrong = new Set<number>();
    slots.forEach((item, i) => {
      if (item?.id !== items[i].id) wrong.add(i);
    });

    if (wrong.size === 0) {
      setCheckState('correct');
      onComplete(true);
    } else {
      setWrongSlots(wrong);
      setCheckState('incorrect');
      onComplete(false);
    }
  }, [slots, items, onComplete]);

  const retry = useCallback(() => {
    setCheckState('idle');
    setWrongSlots(new Set());
  }, []);

  const isSuccess = checkState === 'correct';

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      <ol className={styles.slots} aria-label="Sequência">
        {slots.map((item, i) => (
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
                onClick={() => !isSuccess && removeFromSlot(i)}
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
        ))}
      </ol>

      {pool.length > 0 && !isSuccess && (
        <ul className={styles.pool} aria-label="Opções disponíveis">
          {pool.map((item) => (
            <li key={item.id}>
              <button
                className={styles.poolBlock}
                onClick={() => placeItem(item)}
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
    </div>
  );
}
