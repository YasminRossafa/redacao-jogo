import { useState } from 'react';
import styles from './FeedbackBurst.module.css';

export interface Props {
  success: boolean;
  combo: number; // updated combo value after this answer (0 if failure)
}

type BurstSize = 'md' | 'lg' | 'xl';

interface BurstConfig {
  icon: string;
  text: string | null;
  bg: string;
  color: string;
  size: BurstSize;
  legend?: boolean; // top tier — adds a short sparkle flourish
}

// Combo tiers as a space-crew rank progression. Icons are emoji glyphs
// (no icon library is installed); each is the nearest sensible match to the
// requested Tabler icon.
function getConfig(success: boolean, combo: number): BurstConfig {
  if (!success) {
    // Low-key, non-punishing — soft danger cue, no crew character.
    return { icon: '✕', text: null, bg: 'var(--color-danger-bg)', color: 'var(--color-danger)', size: 'md' };
  }

  if (combo >= 9) {
    return {
      icon: '✨', // ti-sparkles
      text: 'Lenda estelar',
      bg: 'var(--color-primary)',
      color: '#fff',
      size: 'xl',
      legend: true,
    };
  }
  if (combo >= 7) {
    return {
      icon: '🪐', // ti-planet
      text: 'Comandante estelar',
      bg: 'var(--color-primary)',
      color: '#fff',
      size: 'xl',
    };
  }
  if (combo >= 4) {
    return {
      icon: '🛸', // ti-command / rocket (bold) → saucer
      text: 'Capitã(o) da nave',
      bg: 'var(--color-secondary)',
      color: '#fff',
      size: 'lg',
    };
  }
  if (combo >= 2) {
    return {
      icon: '🚀', // ti-rocket
      text: 'Piloto',
      bg: 'var(--color-secondary)',
      color: '#fff',
      size: 'md',
    };
  }
  return {
    icon: '⭐', // ti-star / badge
    text: 'Cadete',
    bg: 'var(--color-success)',
    color: '#fff',
    size: 'md',
  };
}

const SIZE_CLASS: Record<BurstSize, string> = {
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

export function FeedbackBurst({ success, combo }: Props) {
  // Config frozen at mount — component is keyed externally so it always remounts fresh.
  const [config] = useState<BurstConfig>(() => getConfig(success, combo));

  return (
    <div
      className={[styles.burst, SIZE_CLASS[config.size]].join(' ')}
      style={{ backgroundColor: config.bg, color: config.color }}
      aria-hidden
    >
      {config.legend && (
        <span className={styles.sparkles}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={styles.sparkle} />
          ))}
        </span>
      )}
      <span className={styles.icon}>{config.icon}</span>
      {config.text && <span className={styles.text}>{config.text}</span>}
    </div>
  );
}
