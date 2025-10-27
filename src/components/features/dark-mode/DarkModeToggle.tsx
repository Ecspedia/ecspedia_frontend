'use client';

import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleDarkMode, selectIsDarkMode } from './store/darkModeSlice';
import { useDarkMode } from './hooks';

export default function DarkModeToggle() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  // Initialize dark mode
  useDarkMode();

  const handleToggle = () => {
    console.log('Dark mode toggle clicked. Current mode:', isDarkMode);
    dispatch(toggleDarkMode());
    console.log('Toggle dispatched');
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
        isDarkMode ? 'ring-primary/50 bg-[#2e2e2e] ring-2' : 'bg-muted'
      } hover:opacity-90`}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDarkMode}
      type="button"
    >
      {/* Toggle slider */}
      <span
        className={`bg-background inline-flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
          isDarkMode ? 'translate-x-9' : 'translate-x-1'
        }`}
      >
        {isDarkMode ? (
          <Moon className="text-primary h-4 w-4" />
        ) : (
          <Sun className="text-warning h-4 w-4" />
        )}
      </span>
    </button>
  );
}
