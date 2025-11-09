'use client';

import { createContext, useContext } from 'react';

export type TextFieldContextType = {
    value?: string;
    onChange?: (value: string) => void;
    isDarkMode: boolean;
    hasValue: boolean;
    readOnly: boolean;
    onClick?: () => void;
    inputId: string;
};

export const TextFieldContext = createContext<TextFieldContextType | undefined>(undefined);

export function useTextFieldContext() {
    const context = useContext(TextFieldContext);
    if (!context) {
        throw new Error('TextField sub-components must be used within TextFieldV2');
    }
    return context;
}

