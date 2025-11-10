'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDarkMode, selectIsDarkMode } from '@/stores/darkModeSlice';

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(selectIsDarkMode);

    // Sync Redux state with the already-applied theme from the blocking script
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedMode === 'dark' || (savedMode === null && prefersDark);

        // Initialize Redux store to match the theme that's already applied
        dispatch(setDarkMode(isDark));

        // If no saved preference, save the system preference
        if (savedMode === null) {
            localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
        }
    }, [dispatch]);

    // Apply dark mode class and save to localStorage when toggled
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return <>{children}</>;
}

