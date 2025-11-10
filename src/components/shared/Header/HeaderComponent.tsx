'use client';
import { selectIsDarkMode } from "@/stores/darkModeSlice";
import { useAppSelector } from "@/hooks";
import { cn } from "@/utils/utils";

export default function HeaderComponent({ children }: { children: React.ReactNode }) {
    const isDarkMode = useAppSelector(selectIsDarkMode);
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