import { useState, useCallback } from 'react';

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
}

const INITIAL_STATE: ProgressState = {
  unlockedPhases: [],
  completedActivities: {},
  phaseErrorCounts: {},
  phaseScores: {},
  badges: [],
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

function loadInitialState(): ProgressState {
  const available = isStorageAvailable();
  if (!available) {
    console.warn(
      '[redacao-jogo] localStorage unavailable — progress will not persist this session.'
    );
    return { ...INITIAL_STATE };
  }
  return readStorage();
}

export interface ProgressHook {
  isPhaseUnlocked: (phaseId: string) => boolean;
  unlockPhase: (phaseId: string) => void;
  recordActivityResult: (phaseId: string, activityId: string, success: boolean) => void;
  incrementPhaseErrors: (phaseId: string) => void;
  resetPhaseErrors: (phaseId: string) => void;
  getPhaseScore: (phaseId: string) => PhaseScore | null;
  recordPhaseScore: (phaseId: string, correctCount: number, total: number, bestCombo: number) => void;
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
    hasBadge,
    awardBadge,
    resetAllProgress,
  };
}
