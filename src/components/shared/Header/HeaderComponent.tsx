'use client';
import { selectIsDarkMode } from "@/stores/darkModeSlice";
import { useAppSelector, useDarkMode } from "@/hooks";
import { cn } from "@/utils/utils";

export default function HeaderComponent({ children }: { children: React.ReactNode }) {
    const isDarkMode = useDarkMode();
    return (
        <header
            className={cn(
                'bg-background sticky top-0 z-100 shadow-md',
                isDarkMode ? 'border-border border-b' : ''
            )}
        >
            {children}
        </header>
    );
}