'use client';
import { cn } from "@/utils/utils";

export default function HeaderComponent({ children }: { children: React.ReactNode }) {

    return (
        <header
            className={cn(
                'bg-background sticky top-0 z-100 shadow-md',
                'dark:border-border dark:border-b',
            )}
        >
            {children}
        </header>
    );
}