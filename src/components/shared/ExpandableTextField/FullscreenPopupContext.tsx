'use client';

import { X } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';

interface FullscreenPopupContextType {
    popup: ReactNode | null;
    setPopup: (popup: ReactNode | null) => void;
}

const FullscreenPopupContext = createContext<FullscreenPopupContextType | undefined>(undefined);

export function FullscreenPopupProvider({ children }: { children: ReactNode }) {
    const [popup, setPopup] = useState<ReactNode | null>(null);

    return (
        <FullscreenPopupContext.Provider value={{ popup, setPopup }}>
            {children}
            {popup && (
                <div className="fixed inset-0 z-[9999] bg-background">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b p-4">
                            <h1 className="text-lg font-semibold">Select</h1>
                            <button
                                onClick={() => setPopup(null)}
                                className="rounded-full p-2 hover:bg-accent"
                                aria-label="Close"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            {popup}
                        </div>
                    </div>
                </div>
            )}
        </FullscreenPopupContext.Provider>
    );
}

export function useFullscreenPopup() {
    const context = useContext(FullscreenPopupContext);
    if (context === undefined) {
        throw new Error('useFullscreenPopup must be used within a FullscreenPopupProvider');
    }
    return context;
}
