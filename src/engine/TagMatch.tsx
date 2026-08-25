import { useState, useCallback } from 'react';
import type { TagMatchActivity } from './types';
import styles from './TagMatch.module.css';

interface Props {
  activity: TagMatchActivity;
  onComplete: (success: boolean) => void;
}

type Selection =
  | { type: 'none' }
  | { type: 'sentence'; id: string }
  | { type: 'tag'; id: string };

type CheckState = 'idle' | 'incomplete' | 'correct' | 'incorrect';

interface TagColor {
  bg: string;
  border: string;
  text: string;
}

const COLORS: TagColor[] = [
  { bg: '#dbeafe', border: '#3b82f6', text: '#1d4ed8' },
  { bg: '#fce7f3', border: '#ec4899', text: '#be185d' },
  { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  { bg: '#ede9fe', border: '#8b5cf6', text: '#5b21b6' },
  { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function TagMatch({ activity, onComplete }: Props) {
  const { prompt, sentences, tags, mapping } = activity;

  // Color is assigned by original tag position (stable regardless of display order)
  const colorOf = useCallback(
    (tagId: string): TagColor => {
      const idx = tags.findIndex((t) => t.id === tagId);
      return COLORS[idx % COLORS.length];
    },
    [tags]
  );

  // Shuffle display order independently on mount; ids still drive all logic
  const [displaySentences] = useState(() => shuffle([...sentences]));
  const [displayTags] = useState(() => shuffle([...tags]));

  const [links, setLinks] = useState<Record<string, string>>({}); // sentenceId → tagId
  const [selection, setSelection] = useState<Selection>({ type: 'none' });
  const [checkState, setCheckState] = useState<CheckState>('idle');
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());

  const isSuccess = checkState === 'correct';

  const resetFeedback = () => {
    setCheckState('idle');
    setWrongIds(new Set());
  };

  const handleSentenceTap = useCallback(
    (sentenceId: string) => {
      if (isSuccess) return;
      resetFeedback();

      // 1. A tag is pending → link (or relink) this sentence to it.
      if (selection.type === 'tag') {
        const tagId = selection.id;
        setLinks((prev) => ({ ...prev, [sentenceId]: tagId }));
        setSelection({ type: 'none' });
        return;
      }

      // 2. This sentence is already linked → unlink in a single tap.
      if (links[sentenceId] != null) {
        setLinks((prev) => {
          const next = { ...prev };
          delete next[sentenceId];
          return next;
        });
        setSelection({ type: 'none' });
        return;
      }

      // 3. Otherwise toggle this sentence as the pending selection.
      setSelection((sel) =>
        sel.type === 'sentence' && sel.id === sentenceId
          ? { type: 'none' }
          : { type: 'sentence', id: sentenceId }
      );
    },
    [selection, links, isSuccess]
  );

  const handleTagTap = useCallback(
    (tagId: string) => {
      if (isSuccess) return;
      resetFeedback();

      // 1. A sentence is pending → link it to this tag.
      if (selection.type === 'sentence') {
        const sentenceId = selection.id;
        setLinks((prev) => ({ ...prev, [sentenceId]: tagId }));
        setSelection({ type: 'none' });
        return;
      }

      // 2. This tag is linked to one or more sentences → unlink the pair(s)
      //    in a single tap (one pair in the common 1:1 case).
      const linkedSentences = Object.keys(links).filter((sid) => links[sid] === tagId);
      if (linkedSentences.length > 0) {
        setLinks((prev) => {
          const next = { ...prev };
          for (const sid of linkedSentences) delete next[sid];
          return next;
        });
        setSelection({ type: 'none' });
        return;
      }

      // 3. Otherwise toggle this tag as the pending selection.
      setSelection((sel) =>
        sel.type === 'tag' && sel.id === tagId
          ? { type: 'none' }
          : { type: 'tag', id: tagId }
      );
    },
    [selection, links, isSuccess]
  );

  const check = useCallback(() => {
    // Only sentences present in mapping are required; partial-mapping activities
    // (single-target) have fewer required entries than total displayed sentences.
    const requiredIds = Object.keys(mapping);
    if (Object.keys(links).length < requiredIds.length) {
      setCheckState('incomplete');
      return;
    }

    const wrong = new Set<string>();
    requiredIds.forEach((sentenceId) => {
      if (links[sentenceId] !== mapping[sentenceId]) wrong.add(sentenceId);
    });

    if (wrong.size === 0) {
      setCheckState('correct');
      onComplete(true);
    } else {
      setWrongIds(wrong);
      setCheckState('incorrect');
      onComplete(false);
    }
  }, [links, mapping, onComplete]);

  const retry = useCallback(() => {
    setCheckState('idle');
    setWrongIds(new Set());
    setSelection({ type: 'none' });
  }, []);

  const hintText =
    selection.type === 'sentence'
      ? 'Toque uma categoria para associar.'
      : selection.type === 'tag'
      ? 'Toque uma frase para associar.'
      : null;

  return (
    <div className={styles.root}>
      <p className={styles.prompt}>{prompt}</p>

      {/* Tag palette — shuffled display order */}
      <div className={styles.palette} role="group" aria-label="Categorias">
        {displayTags.map((tag) => {
          const color = colorOf(tag.id);
          const isTagSelected = selection.type === 'tag' && selection.id === tag.id;
          const linkedCount = Object.values(links).filter((v) => v === tag.id).length;

          return (
            <button
              key={tag.id}
              className={[styles.tagChip, isTagSelected ? styles.tagSelected : '']
                .filter(Boolean)
                .join(' ')}
              style={{
                backgroundColor: color.bg,
                borderColor: isTagSelected ? color.text : color.border,
                color: color.text,
              }}
              onClick={() => handleTagTap(tag.id)}
              aria-pressed={isTagSelected}
            >
              {tag.label}
              {linkedCount > 0 && (
                <span
                  className={styles.tagBadge}
                  style={{ backgroundColor: color.text, color: color.bg }}
                >
                  {linkedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hint live region */}
      <p
        className={styles.hint}
        aria-live="polite"
        aria-atomic="true"
        style={{ visibility: hintText ? 'visible' : 'hidden' }}
      >
        {hintText ?? ' '}
      </p>

      {/* Sentences — shuffled display order */}
      <ul className={styles.sentences} aria-label="Frases">
        {displaySentences.map((sentence) => {
          const linkedTagId = links[sentence.id];
          const linkedTag = linkedTagId ? tags.find((t) => t.id === linkedTagId) : undefined;
          const color = linkedTagId ? colorOf(linkedTagId) : undefined;
          const isSelected =
            selection.type === 'sentence' && selection.id === sentence.id;
          const isWrong = wrongIds.has(sentence.id);

          const chipStyle = isWrong
            ? { backgroundColor: '#fef2f2', borderColor: '#ef4444' }
            : color
            ? { backgroundColor: color.bg, borderColor: color.border }
            : {};

          return (
            <li key={sentence.id}>
              <button
                className={[
                  styles.sentenceChip,
                  isSelected ? styles.sentenceSelected : '',
                  isWrong ? styles.sentenceWrong : '',
                  isSuccess && linkedTagId ? styles.sentenceCorrect : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={chipStyle}
                onClick={() => handleSentenceTap(sentence.id)}
                aria-pressed={isSelected}
              >
                <span className={styles.sentenceText}>{sentence.text}</span>
                {linkedTag && color && (
                  <span
                    className={styles.sentenceBadge}
                    style={{
                      backgroundColor: color.bg,
                      borderColor: color.border,
                      color: color.text,
                    }}
                  >
                    {linkedTag.label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {!isSuccess && (
        <button className={styles.checkBtn} onClick={check}>
          Conferir
        </button>
      )}

      {checkState === 'incomplete' && (
        <p className={styles.msgInfo} role="alert">
          Associe todas as frases antes de conferir.
        </p>
      )}

      {checkState === 'incorrect' && (
        <div className={styles.msgError} role="alert">
          <p>Algumas associações estão incorretas. Ajuste as frases marcadas em vermelho.</p>
          <button className={styles.retryBtn} onClick={retry}>
            Tentar novamente
          </button>
        </div>
      )}

      {isSuccess && (
        <p className={styles.msgSuccess} role="alert">
          Correto! Todas as associações estão certas.
        </p>
      )}
    </div>
  );
}
