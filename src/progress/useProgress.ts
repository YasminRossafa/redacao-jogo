import { useState, useCallback } from 'react';

const STORAGE_KEY = 'redacao-jogo:progress';

interface ProgressState {
  unlockedPhases: string[];
  completedActivities: Record<string, boolean>;
  phaseErrorCounts: Record<string, number>;
}

const INITIAL_STATE: ProgressState = {
  unlockedPhases: [],
  completedActivities: {},
  phaseErrorCounts: {},
};

function readStorage(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_STATE, unlockedPhases: [] };
    return JSON.parse(raw) as ProgressState;
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

  const resetAllProgress = useCallback(() => {
    update(() => ({ ...INITIAL_STATE }));
  }, [update]);

  return {
    isPhaseUnlocked,
    unlockPhase,
    recordActivityResult,
    incrementPhaseErrors,
    resetPhaseErrors,
    resetAllProgress,
  };
}
