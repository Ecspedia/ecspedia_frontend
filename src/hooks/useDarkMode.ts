import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';

/**
 * Custom hook for dark mode that handles SSR/hydration safely
 *
 * Returns the dark mode state, but always returns false during SSR/hydration
 * to prevent flash and hydration mismatches.
 *
 * @returns {boolean} isDarkMode - Current dark mode state (false during SSR)
 */
export function useDarkMode(): boolean {
  const isDarkModeFromStore = useAppSelector(selectIsDarkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return false during SSR/hydration, actual value after mount
  return mounted ? isDarkModeFromStore : false;
}
