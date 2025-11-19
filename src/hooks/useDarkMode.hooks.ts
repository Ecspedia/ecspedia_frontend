import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { DarkModeState } from '@/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks';

/**
 * Custom hook for dark mode that handles SSR/hydration safely
 *
 * Returns the dark mode state, but always returns false during SSR/hydration
 * to prevent flash and hydration mismatches.
 *
 * @returns {DarkModeState} isDarkMode - Current dark mode state (false during SSR)
 */
export function useDarkMode(): DarkModeState {
  const isDarkModeFromStore = useAppSelector(selectIsDarkMode);
  const [mounted, setMounted] = useState<DarkModeState>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return false during SSR/hydration, actual value after mount
  return mounted ? isDarkModeFromStore : undefined;
}
