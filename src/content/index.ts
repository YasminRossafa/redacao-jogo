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
