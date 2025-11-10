'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDarkMode, selectIsDarkMode } from '@/stores/darkModeSlice';

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(selectIsDarkMode);

    // Initialize dark mode from localStorage or system preference
    useEffect(() => {
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

    // Apply dark mode class to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Save preference to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return <>{children}</>;
}

