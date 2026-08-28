import type { ActivityData } from '../engine/types';
import { faseFormulaActivities } from './fase-formula';
import { fase1Activities } from './fase1-introducao';
import { faseRepertorioActivities } from './fase-repertorio';
import { faseTemaBrasilActivities } from './fase-tema-brasil';
import { faseProblematicasActivities } from './fase-problematicas';
import { faseD1FormulaActivities } from './fase-d1-formula';

export interface PhaseInfo {
  id: string;
  label: string;
  subtitle: string;
}

export const PHASES: PhaseInfo[] = [
  // ── Introdução ───────────────────────────────────────────────────────────────
  { id: 'fase-formula',             label: 'Fórmula',            subtitle: 'Como funciona a introdução' },
  { id: 'fase-repertorio',          label: 'Repertório',         subtitle: 'Construção do repertório sociocultural' },
  { id: 'fase-tema-brasil',         label: 'Tema + Brasil',      subtitle: 'Contextualização do tema na sociedade' },
  { id: 'fase-problematicas',       label: 'Problemáticas',      subtitle: 'Problematização do tema' },
  { id: 'fase-introducao-completa', label: 'Introdução',         subtitle: 'Monte a introdução inteira' },
  // ── Desenvolvimento 1 ────────────────────────────────────────────────────────
  { id: 'fase-d1-formula',          label: 'Fórmula D1',         subtitle: 'Como funciona o desenvolvimento 1' },
  { id: 'fase-d1-problema',         label: 'Problemática D1',    subtitle: 'A problemática do argumento 1' },
  { id: 'fase-d1-citacao',          label: 'Citação D1',         subtitle: 'A citação do argumento 1' },
  { id: 'fase-d1-argumento',        label: 'Argumento D1',       subtitle: 'O argumento aprofundado' },
  { id: 'fase-d1-completo',         label: 'D1 Completo',        subtitle: 'Monte o desenvolvimento 1 inteiro' },
  // ── Desenvolvimento 2 ────────────────────────────────────────────────────────
  { id: 'fase-d2-formula',          label: 'Fórmula D2',         subtitle: 'Como funciona o desenvolvimento 2' },
  { id: 'fase-d2-problema',         label: 'Problemática D2',    subtitle: 'A problemática do argumento 2' },
  { id: 'fase-d2-citacao',          label: 'Citação D2',         subtitle: 'A citação do argumento 2' },
  { id: 'fase-d2-argumento',        label: 'Argumento D2',       subtitle: 'O argumento aprofundado' },
  { id: 'fase-d2-completo',         label: 'D2 Completo',        subtitle: 'Monte o desenvolvimento 2 inteiro' },
  // ── Conclusão ────────────────────────────────────────────────────────────────
  { id: 'fase-conclusao-1',         label: 'Conclusão',          subtitle: 'A proposta de intervenção' },
  // ── Redação Completa ─────────────────────────────────────────────────────────
  { id: 'fase-redacao-completa',    label: 'Redação Completa',   subtitle: 'Monte a redação inteira' },
];

export const PHASE_SEQUENCE: string[] = PHASES.map((p) => p.id);

// ─── Section grouping (visual only — progression still follows PHASE_SEQUENCE) ─

export interface SectionInfo {
  id: string;
  label: string;
  phaseIds: string[];
}

export const SECTIONS: SectionInfo[] = [
  {
    id: 'introducao',
    label: 'Introdução',
    phaseIds: [
      'fase-formula',
      'fase-repertorio',
      'fase-tema-brasil',
      'fase-problematicas',
      'fase-introducao-completa',
    ],
  },
  {
    id: 'dev1',
    label: 'Desenvolvimento 1',
    phaseIds: [
      'fase-d1-formula',
      'fase-d1-problema',
      'fase-d1-citacao',
      'fase-d1-argumento',
      'fase-d1-completo',
    ],
  },
  {
    id: 'dev2',
    label: 'Desenvolvimento 2',
    phaseIds: [
      'fase-d2-formula',
      'fase-d2-problema',
      'fase-d2-citacao',
      'fase-d2-argumento',
      'fase-d2-completo',
    ],
  },
  {
    id: 'conclusao',
    label: 'Conclusão',
    phaseIds: ['fase-conclusao-1'],
  },
  {
    id: 'redacao-completa',
    label: 'Redação Completa',
    phaseIds: ['fase-redacao-completa'],
  },
];

export const CONTENT: Record<string, ActivityData[]> = {
  'fase-formula': faseFormulaActivities,
  'fase-repertorio': faseRepertorioActivities,
  'fase-tema-brasil': faseTemaBrasilActivities,
  'fase-problematicas': faseProblematicasActivities,
  'fase-introducao-completa': fase1Activities,
  'fase-d1-formula': faseD1FormulaActivities,
};

export function getNextPhaseId(currentId: string): string | null {
  const idx = PHASE_SEQUENCE.indexOf(currentId);
  if (idx === -1 || idx === PHASE_SEQUENCE.length - 1) return null;
  return PHASE_SEQUENCE[idx + 1];
}

// ─── Per-phase configuration ──────────────────────────────────────────────────
// Each phase declares its own question total, unlock threshold, and tier cutoffs,
// so results/stars/unlock logic scales with phase size instead of assuming 18.

export interface PhaseConfig {
  total: number;
  unlockThreshold: number;
  tiers: { expert: number; good: number; almostThere: number };
}

export const PHASE_CONFIG: Record<string, PhaseConfig> = {
  'fase-formula':             { total: 3,  unlockThreshold: 2,  tiers: { expert: 3,  good: 2,  almostThere: 1 } },
  'fase-repertorio':          { total: 10, unlockThreshold: 7,  tiers: { expert: 9,  good: 7,  almostThere: 4 } },
  'fase-tema-brasil':         { total: 10, unlockThreshold: 7,  tiers: { expert: 9,  good: 7,  almostThere: 4 } },
  'fase-problematicas':       { total: 10, unlockThreshold: 7,  tiers: { expert: 9,  good: 7,  almostThere: 4 } },
  'fase-introducao-completa': { total: 18, unlockThreshold: 12, tiers: { expert: 15, good: 10, almostThere: 5 } },
  'fase-d1-formula':          { total: 4,  unlockThreshold: 3,  tiers: { expert: 4,  good: 3,  almostThere: 2 } },
};

/** Question total for a phase, falling back to its actual activity count. */
export function getPhaseTotal(phaseId: string): number {
  return PHASE_CONFIG[phaseId]?.total ?? (CONTENT[phaseId]?.length ?? 0);
}

/** Correct count needed to unlock the next phase (0 = always unlocks). */
export function getUnlockThreshold(phaseId: string): number {
  return PHASE_CONFIG[phaseId]?.unlockThreshold ?? 0;
}

// ─── Result tiers ─────────────────────────────────────────────────────────────
// Cutoffs come from each phase's PHASE_CONFIG; only presentation lives here.

export interface ResultTier {
  label: string;
  color: string;
  bg: string;
}

const TIER_EXPERT: ResultTier = { label: 'Expert',             color: '#166534', bg: '#dcfce7' };
const TIER_GOOD: ResultTier   = { label: 'Good',               color: '#1d4ed8', bg: '#dbeafe' };
const TIER_ALMOST: ResultTier = { label: 'Almost there',       color: '#92400e', bg: '#fef3c7' };
const TIER_STUDY: ResultTier  = { label: 'You need to study!', color: '#991b1b', bg: '#fee2e2' };

export function getTier(correctCount: number, phaseId: string): ResultTier {
  const cfg = PHASE_CONFIG[phaseId];
  if (cfg) {
    if (correctCount >= cfg.tiers.expert) return TIER_EXPERT;
    if (correctCount >= cfg.tiers.good) return TIER_GOOD;
    if (correctCount >= cfg.tiers.almostThere) return TIER_ALMOST;
  }
  return TIER_STUDY;
}

/** Maps a correct count to a 0–3 star rating via the phase's tier cutoffs.
 *  Reusable by the results screen and the trail menu. */
export function getTierStars(correctCount: number, phaseId: string): 0 | 1 | 2 | 3 {
  const cfg = PHASE_CONFIG[phaseId];
  if (!cfg) return 0;
  if (correctCount >= cfg.tiers.expert) return 3;
  if (correctCount >= cfg.tiers.good) return 2;
  if (correctCount >= cfg.tiers.almostThere) return 1;
  return 0;
}
