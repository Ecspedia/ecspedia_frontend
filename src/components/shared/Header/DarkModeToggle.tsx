'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch } from '@/hooks/hooks';
import { toggleDarkMode } from '@/stores/darkModeSlice';
import { useDarkMode } from '@/hooks';
import { cn } from '@/utils/utils';

export default function DarkModeToggle() {
    const dispatch = useAppDispatch();
    const isDarkMode = useDarkMode();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        dispatch(toggleDarkMode());
    };

    // Hide completely during SSR/hydration to prevent any flash
    if (!mounted) {
        return (
            <div className="h-8 w-16 opacity-0" aria-hidden="true">
                {/* Placeholder to maintain layout */}
            </div>
        );
    }

    return (
        <button
            onClick={handleToggle}
            className={cn(
                "bg-overlay relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 animate-in fade-in",
                isDarkMode ? 'ring-primary/50 bg-[#2e2e2e] ring-2' : 'bg-overlay ring-2 ring-primary/30',
            )}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            role="switch"
            aria-checked={isDarkMode}
            type="button"
        >

            <span
                className={`bg-background inline-flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-9' : 'translate-x-1'
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

