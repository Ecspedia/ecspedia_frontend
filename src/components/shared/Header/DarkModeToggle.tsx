'use client';

import { Button } from '@/components/ui';
import { useDarkMode } from '@/hooks';
import { useAppDispatch } from '@/hooks/hooks';
import { toggleDarkMode } from '@/stores/darkModeSlice';
import { cn } from '@/utils/utils';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
    const dispatch = useAppDispatch();
    const { isDarkMode, isHydrated } = useDarkMode();
    const handleToggle = () => {
        dispatch(toggleDarkMode());
    };

    // Prevent hydration mismatch by not rendering until hydrated
    if (!isHydrated) {
        return (
            <div className="h-8 w-16 rounded-full bg-overlay ring-2 ring-primary/30 animate-pulse" />
        );
    }

    return (
        <Button
            variant="blank"
            onClick={handleToggle}
            className={cn(
                "bg-overlay relative inline-flex h-8 w-16 transition-transform duration-300 items-center rounded-full animate-in fade-in",
                "bg-overlay ring-2 ring-primary/30 dark:ring-primary/50 dark:bg-[#2e2e2e] dark:ring-2"
            )}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            role="switch"
            aria-checked={isDarkMode}
            type="button"
            suppressHydrationWarning
        >
            <span
                className='bg-background inline-flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 translate-x-1 dark:translate-x-9'
                suppressHydrationWarning
            >
                <Moon className="text-primary h-4 w-4 hidden dark:block" data-testid="moon-icon" />
                <Sun className="text-warning h-4 w-4 block dark:hidden" data-testid="sun-icon" />
            </span>
        </Button>
    );
}
