'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';

/**
 * DarkModeProvider
 * 
 * Handles syncing the Redux dark mode state with the DOM.
 * Initialization and localStorage persistence are handled in darkModeSlice.
 */
export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const isDarkMode = useAppSelector(selectIsDarkMode);

    // Apply dark mode class to document root
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return <>{children}</>;
}

