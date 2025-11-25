'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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
