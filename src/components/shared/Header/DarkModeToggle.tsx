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
    return (
        <Button
            variant="blank"
            onClick={handleToggle}
            className={cn(
                "bg-overlay relative inline-flex h-8 w-16 transition-transform duration-300 items-center rounded-full animate-in fade-in",
                isDarkMode ? 'ring-primary/50 bg-[#2e2e2e] ring-2' : 'bg-overlay ring-2 ring-primary/30'

            )}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            role="switch"
            aria-checked={isDarkMode}
            type="button"
        >
            {isHydrated && (
                <span
                    className={
                        cn(
                            'bg-background inline-flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ',
                            isDarkMode ? 'translate-x-9' : 'translate-x-1'

                        )}
                >
                    {isDarkMode ?
                        <Moon className="text-primary h-4 w-4" data-testid="moon-icon" /> :
                        <Sun className="text-warning h-4 w-4" data-testid="sun-icon" />}
                </span>
            )}
        </Button>
    );
}
