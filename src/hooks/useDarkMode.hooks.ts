import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { useEffect, useState } from 'react';
import { useAppSelector } from './hooks';

/**
 * Custom hook for dark mode that handles SSR/hydration safely
 *
 * Returns the dark mode state and hydration status to prevent flash
 * and hydration mismatches.
 *
 * @returns {object} { isDarkMode, isHydrated }
 */

export function useDarkMode() {
  const isDarkModeFromStore = useAppSelector(selectIsDarkMode);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    isDarkMode: isHydrated ? isDarkModeFromStore : undefined,
    isHydrated,
  };
}
