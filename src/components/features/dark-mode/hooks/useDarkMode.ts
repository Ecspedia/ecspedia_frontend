'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDarkMode, selectIsDarkMode } from '../store/darkModeSlice';

export default function useDarkMode() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  useEffect(() => {
    // Load preference from localStorage on mount
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode === 'dark') {
      dispatch(setDarkMode(true));
    } else if (savedMode === 'light') {
      dispatch(setDarkMode(false));
    } else {
      // Default to user's system color scheme preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setDarkMode(prefersDarkMode));
      localStorage.setItem('darkMode', prefersDarkMode ? 'dark' : 'light');
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return { isDarkMode };
}
