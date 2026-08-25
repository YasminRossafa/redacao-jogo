import type { ActivityData } from '../engine/types';
import { fase1Activities } from './fase1-introducao';

export interface PhaseInfo {
  id: string;
  label: string;
  subtitle: string;
}

export const PHASES: PhaseInfo[] = [
  { id: 'fase1', label: 'Introdução',        subtitle: 'Repertório, tema e problemáticas' },
  { id: 'fase2', label: 'Desenvolvimento 1', subtitle: 'Primeiro argumento' },
  { id: 'fase3', label: 'Desenvolvimento 2', subtitle: 'Segundo argumento' },
  { id: 'fase4', label: 'Conclusão',         subtitle: 'Proposta de intervenção' },
  { id: 'fase5', label: 'Redação Completa',  subtitle: 'Monte a redação inteira' },
];

export const PHASE_SEQUENCE: string[] = PHASES.map((p) => p.id);

export const CONTENT: Record<string, ActivityData[]> = {
  fase1: fase1Activities,
};

export function getNextPhaseId(currentId: string): string | null {
  const idx = PHASE_SEQUENCE.indexOf(currentId);
  if (idx === -1 || idx === PHASE_SEQUENCE.length - 1) return null;
  return PHASE_SEQUENCE[idx + 1];
}

// ─── Result tiers ─────────────────────────────────────────────────────────────
// Thresholds assume an 18-question phase. Adjust per phase as content grows.

export interface ResultTier {
  minCorrect: number;
  label: string;
  color: string;
  bg: string;
}

export const RESULT_TIERS: ResultTier[] = [
  { minCorrect: 15, label: 'Expert',              color: '#166534', bg: '#dcfce7' },
  { minCorrect: 10, label: 'Good',                color: '#1d4ed8', bg: '#dbeafe' },
  { minCorrect: 5,  label: 'Almost there',        color: '#92400e', bg: '#fef3c7' },
  { minCorrect: 0,  label: 'You need to study!',  color: '#991b1b', bg: '#fee2e2' },
];

export function getTier(correctCount: number): ResultTier {
  return RESULT_TIERS.find((t) => correctCount >= t.minCorrect) ?? RESULT_TIERS[RESULT_TIERS.length - 1];
}
