import { useState, useEffect } from 'react';
import styles from './FeedbackBurst.module.css';

export interface Props {
  success: boolean;
  combo: number; // updated combo value after this answer (0 if failure)
}

interface BurstConfig {
  icon: string;
  text: string | null;
  bg: string;
  color: string;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getConfig(success: boolean, combo: number): BurstConfig {
  if (!success) {
    return { icon: '✕', text: null, bg: 'var(--color-danger-bg)', color: 'var(--color-danger)' };
  }

  if (combo >= 7) {
    return {
      icon: '🚀',
      text: pick(['Decolando!', 'Fora da órbita!'] as const),
      bg: 'var(--color-secondary)',
      color: '#fff',
    };
  }
  if (combo >= 4) {
    return {
      icon: '🔍',
      text: pick(['Modo detetive!', 'Nada escapa de você!'] as const),
      bg: 'var(--color-secondary)',
      color: '#fff',
    };
  }
  if (combo >= 2) {
    return {
      icon: pick(['📖', '✏️'] as const),
      text: pick(['Sequência!', 'Cada vez melhor!'] as const),
      bg: 'var(--color-secondary)',
      color: '#fff',
    };
  }
  return {
    icon: '✓',
    text: pick(['Boa!', 'Isso aí!', 'Show!'] as const),
    bg: 'var(--color-success)',
    color: '#fff',
  };
}

export function FeedbackBurst({ success, combo }: Props) {
  // Config frozen at mount — component is keyed externally so it always remounts fresh
  const [config] = useState<BurstConfig>(() => getConfig(success, combo));
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={[styles.burst, exiting ? styles.exiting : ''].filter(Boolean).join(' ')}
      style={{ backgroundColor: config.bg, color: config.color }}
      aria-hidden
    >
      <span className={styles.icon}>{config.icon}</span>
      {config.text && <span className={styles.text}>{config.text}</span>}
    </div>
  );
}
