'use client';

import { HeaderNav } from "@/components/shared";
import { useDarkMode } from "@/hooks";



export default function TestPage() {
    const { isDarkMode, isHydrated } = useDarkMode();
    if (!isHydrated) return null;

    return (
        <>
            <HeaderNav />
            <div className="pt-10">
                <div className="flex items-start gap-2 flex-row justify-center">
                    {isDarkMode ? <span className="rainbow-text-dark">Thinking...</span> :
                        <span className="rainbow-text text-black">Thinking...</span>
                    }

                </div>
            </div>
        </>

    )
}