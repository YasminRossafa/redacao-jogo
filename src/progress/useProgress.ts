import { useState, useCallback } from 'react';
import { PHASE_SEQUENCE } from '../content/index';

const STORAGE_KEY = 'redacao-jogo:progress';

interface PhaseScore {
  correctCount: number;
  total: number;
  bestCombo: number;
}

interface ProgressState {
  unlockedPhases: string[];
  completedActivities: Record<string, boolean>;
  phaseErrorCounts: Record<string, number>;
  phaseScores: Record<string, PhaseScore>;
  badges: string[];
  /** Phase IDs auto-completed by a successful section skip (unlocked but never
   *  actually played — no score should be shown for these). */
  skippedPhaseIds: string[];
}

const INITIAL_STATE: ProgressState = {
  unlockedPhases: [],
  completedActivities: {},
  phaseErrorCounts: {},
  phaseScores: {},
  badges: [],
  skippedPhaseIds: [],
};

function readStorage(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_STATE };
    // Spread INITIAL_STATE first so new fields get defaults when loading old saves
    return { ...INITIAL_STATE, ...(JSON.parse(raw) as Partial<ProgressState>) };
  } catch {
    return { ...INITIAL_STATE };
  }
}

function writeStorage(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // write failed silently — in-memory state is still accurate for this session
  }
}

function isStorageAvailable(): boolean {
  try {
    const probe = '__redacao_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

// ─── One-time backfill for a since-fixed skip-mechanic bug ────────────────────
// A section skip used to unlock every OTHER phase in the section but never the
// completo phase actually played to trigger it — so a phase could end up with a
// real, passed score yet still read as locked (fixed going forward in Fase.tsx;
// see the "Corrige três bugs" commit). Saves written by that older logic still
// carry the inconsistency, since the forward-fix doesn't touch data already on
// disk. This restores the intended invariant — reaching or completing any stage
// implies every stage before it in PHASE_SEQUENCE is unlocked — for any save
// that still violates it.
//
// Only ever ADDS ids to unlockedPhases; phaseScores, skippedPhaseIds and badges
// are never read for anything but the "was this phase reached" check, and are
// never written. Idempotent: once the invariant holds, it returns the same
// object reference so callers can skip a redundant write.
function reconcileUnlockedPhases(state: ProgressState): ProgressState {
  let maxReachedIndex = -1;
  for (let i = 0; i < PHASE_SEQUENCE.length; i++) {
    const id = PHASE_SEQUENCE[i];
    const reached =
      state.unlockedPhases.includes(id) ||
      state.phaseScores[id] !== undefined ||
      state.skippedPhaseIds.includes(id);
    if (reached) maxReachedIndex = i;
  }
  if (maxReachedIndex < 0) return state;

  const missing = PHASE_SEQUENCE.slice(0, maxReachedIndex + 1).filter(
    (id) => !state.unlockedPhases.includes(id)
  );
  if (missing.length === 0) return state;

  return { ...state, unlockedPhases: [...state.unlockedPhases, ...missing] };
}

function loadInitialState(): ProgressState {
  const available = isStorageAvailable();
  if (!available) {
    console.warn(
      '[redacao-jogo] localStorage unavailable — progress will not persist this session.'
    );
    return { ...INITIAL_STATE };
  }
  const stored = readStorage();
  const reconciled = reconcileUnlockedPhases(stored);
  // Persist the backfill immediately so it only ever needs to run once per
  // affected save; a clean save (the common case) reconciles to the same
  // reference and skips this write entirely.
  if (reconciled !== stored) {
    writeStorage(reconciled);
  }
  return reconciled;
}

export interface ProgressHook {
  isPhaseUnlocked: (phaseId: string) => boolean;
  unlockPhase: (phaseId: string) => void;
  recordActivityResult: (phaseId: string, activityId: string, success: boolean) => void;
  incrementPhaseErrors: (phaseId: string) => void;
  resetPhaseErrors: (phaseId: string) => void;
  getPhaseScore: (phaseId: string) => PhaseScore | null;
  recordPhaseScore: (phaseId: string, correctCount: number, total: number, bestCombo: number) => void;
  /** Bulk-unlock phases from a successful section skip, marking unplayed ones as
   *  skipped so they render as completed (green) without any star rating. Phases
   *  the player has already played are unlocked but NOT overwritten with a skip flag. */
  markSectionCompleted: (phaseIds: string[]) => void;
  /** True for phases that were auto-completed by a section skip and never played. */
  isPhaseSkipped: (phaseId: string) => boolean;
  hasBadge: (badgeId: string) => boolean;
  awardBadge: (badgeId: string) => void;
  resetAllProgress: () => void;
}

export function useProgress(): ProgressHook {
  const [state, setState] = useState<ProgressState>(loadInitialState);

  const update = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setState((prev) => {
      const next = updater(prev);
      writeStorage(next);
      return next;
    });
  }, []);

  const isPhaseUnlocked = useCallback(
    (phaseId: string) => state.unlockedPhases.includes(phaseId),
    [state.unlockedPhases]
  );

  const unlockPhase = useCallback(
    (phaseId: string) => {
      update((prev) => {
        if (prev.unlockedPhases.includes(phaseId)) return prev;
        return { ...prev, unlockedPhases: [...prev.unlockedPhases, phaseId] };
      });
    },
    [update]
  );

  const recordActivityResult = useCallback(
    (phaseId: string, activityId: string, success: boolean) => {
      const key = `${phaseId}:${activityId}`;
      update((prev) => ({
        ...prev,
        completedActivities: { ...prev.completedActivities, [key]: success },
      }));
    },
    [update]
  );

  const incrementPhaseErrors = useCallback(
    (phaseId: string) => {
      update((prev) => ({
        ...prev,
        phaseErrorCounts: {
          ...prev.phaseErrorCounts,
          [phaseId]: (prev.phaseErrorCounts[phaseId] ?? 0) + 1,
        },
      }));
    },
    [update]
  );

  const resetPhaseErrors = useCallback(
    (phaseId: string) => {
      update((prev) => {
        const next = { ...prev.phaseErrorCounts };
        delete next[phaseId];
        return { ...prev, phaseErrorCounts: next };
      });
    },
    [update]
  );

  const getPhaseScore = useCallback(
    (phaseId: string): PhaseScore | null => state.phaseScores[phaseId] ?? null,
    [state.phaseScores]
  );

  const recordPhaseScore = useCallback(
    (phaseId: string, correctCount: number, total: number, bestCombo: number) => {
      update((prev) => {
        const existing = prev.phaseScores[phaseId];
        if (existing && existing.correctCount >= correctCount) return prev;
        return {
          ...prev,
          phaseScores: {
            ...prev.phaseScores,
            [phaseId]: { correctCount, total, bestCombo },
          },
        };
      });
    },
    [update]
  );

  const markSectionCompleted = useCallback(
    (phaseIds: string[]) => {
      update((prev) => {
        let { unlockedPhases, skippedPhaseIds } = prev;
        for (const id of phaseIds) {
          if (!unlockedPhases.includes(id)) {
            unlockedPhases = [...unlockedPhases, id];
          }
          // Only flag as skipped when the phase was never actually played.
          // Phases with a real score keep their earned rating untouched.
          if (!prev.phaseScores[id] && !skippedPhaseIds.includes(id)) {
            skippedPhaseIds = [...skippedPhaseIds, id];
          }
        }
        return { ...prev, unlockedPhases, skippedPhaseIds };
      });
    },
    [update]
  );

  const isPhaseSkipped = useCallback(
    (phaseId: string) => state.skippedPhaseIds.includes(phaseId),
    [state.skippedPhaseIds]
  );

  const hasBadge = useCallback(
    (badgeId: string) => state.badges.includes(badgeId),
    [state.badges]
  );

  const awardBadge = useCallback(
    (badgeId: string) => {
      update((prev) => {
        if (prev.badges.includes(badgeId)) return prev;
        return { ...prev, badges: [...prev.badges, badgeId] };
      });
    },
    [update]
  );

  const resetAllProgress = useCallback(() => {
    update(() => ({ ...INITIAL_STATE }));
  }, [update]);

  return {
    isPhaseUnlocked,
    unlockPhase,
    recordActivityResult,
    incrementPhaseErrors,
    resetPhaseErrors,
    getPhaseScore,
    recordPhaseScore,
    markSectionCompleted,
    isPhaseSkipped,
    hasBadge,
    awardBadge,
    resetAllProgress,
  };
}
