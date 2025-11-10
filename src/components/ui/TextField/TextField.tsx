'use client';

import { ReactNode, useId } from 'react';
import { selectIsDarkMode } from '@/stores/darkModeSlice';
import { useAppSelector } from '@/hooks';
import { cn } from '@/utils/utils';
import { TextFieldContext } from './context/TextFieldContext';
import TextFieldIcon from './components/TextFieldIcon';
import TextFieldLabel from './components/TextFieldLabel';
import TextFieldInput from './components/TextFieldInput';
import TextFieldInputWrapper from './components/TextFieldInputWrapper';

interface TextFieldProps {
    onClick?: () => void;
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    className?: string;
    children?: ReactNode;
}

function TextField({
    onClick,
    value,
    onChange,
    readOnly = false,
    className,
    children,
}: TextFieldProps) {
    const hasValue = Boolean(value && value.length > 0);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const inputId = useId();

    const contextValue = {
        value,
        onChange,
        isDarkMode,
        hasValue,
        readOnly,
        onClick,
        inputId,
    };

    return (
        <TextFieldContext.Provider value={contextValue}>
            <div
                onClick={onClick}
                className={cn(
                    "border-border relative flex h-14 items-center gap-3 rounded-lg border bg-background px-4 transition focus-within:border-brand-primary",
                    readOnly && "cursor-default opacity-80",
                    !isDarkMode && "border-primary",
                    isDarkMode && "bg-surface",

                    className
                )}
            >
                {children}
            </div>
        </TextFieldContext.Provider>
    );
}

// Attach compound components
TextField.Icon = TextFieldIcon;
TextField.Label = TextFieldLabel;
TextField.Input = TextFieldInput;
TextField.InputWrapper = TextFieldInputWrapper;

export default TextField;

