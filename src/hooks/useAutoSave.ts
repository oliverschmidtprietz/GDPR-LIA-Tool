import { useEffect, useRef, useState, useCallback } from 'react';
import { LIAData } from '../types';

const STORAGE_KEY = 'lia-tool-autosave';

interface SavedState {
  formData: LIAData;
  currentStepIndex: number;
  savedAt: string;
}

export function useAutoSave(
  formData: LIAData,
  currentStepIndex: number,
  setFormData: (data: LIAData) => void,
  setCurrentStepIndex: (index: number) => void
) {
  const [showRecovery, setShowRecovery] = useState(false);
  const [savedState, setSavedState] = useState<SavedState | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRestoredRef = useRef(false);

  // On mount: detect saved data
  useEffect(() => {
    if (hasRestoredRef.current) return;
    hasRestoredRef.current = true;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: SavedState = JSON.parse(raw);
        // Only show recovery if there's meaningful data (more than just the date)
        const keys = Object.keys(parsed.formData).filter(k => k !== 'date_of_assessment');
        if (keys.length > 0) {
          setSavedState(parsed);
          setShowRecovery(true);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Debounced save
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const keys = Object.keys(formData).filter(k => k !== 'date_of_assessment');
      if (keys.length > 0) {
        const state: SavedState = {
          formData,
          currentStepIndex,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setLastSaved(new Date());
      }
    }, 1000);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [formData, currentStepIndex]);

  // beforeunload warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      const keys = Object.keys(formData).filter(k => k !== 'date_of_assessment');
      if (keys.length > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [formData]);

  const restore = useCallback(() => {
    if (savedState) {
      setFormData(savedState.formData);
      setCurrentStepIndex(savedState.currentStepIndex);
    }
    setShowRecovery(false);
  }, [savedState, setFormData, setCurrentStepIndex]);

  const discard = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setShowRecovery(false);
    setSavedState(null);
  }, []);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { showRecovery, restore, discard, clearSavedData, lastSaved };
}
