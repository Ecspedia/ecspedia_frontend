'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleDarkMode, selectIsDarkMode } from '@/stores/darkModeSlice';
import { cn } from '@/utils/utils';

export default function DarkModeToggle() {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const [mounted, setMounted] = useState(false);

    // Wait for client-side mount to avoid icon flash
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        dispatch(toggleDarkMode());
    };

    // Don't render icons until mounted to prevent flash
    if (!mounted) {
        return (
            <div className="inline-flex h-8 w-16 items-center rounded-full bg-overlay ring-2 ring-primary/30">
                <span className="bg-background inline-flex h-6 w-6 items-center justify-center rounded-full shadow-md translate-x-1" />
            </div>
        );
    }

    return (
        <button
            onClick={handleToggle}
            className={cn(
                "bg-overlay relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ",
                isDarkMode ? 'ring-primary/50 bg-[#2e2e2e] ring-2' : 'bg-overlay ring-2 ring-primary/30',
            )}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            role="switch"
            aria-checked={isDarkMode}
            type="button"
        >
            <span
                className={`bg-background inline-flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300'  ${isDarkMode ? 'translate-x-9' : 'translate-x-1'
                    }`}
            >
                {isDarkMode ? (
                    <Moon className="text-primary h-4 w-4" data-testid="moon-icon" />
                ) : (
                    <Sun className="text-warning h-4 w-4" data-testid="sun-icon" />
                )}
            </span>
        </button>
    );
}

