'use client';

import { useDarkMode } from '@/hooks';
import { cn } from '@/utils/utils';
import { ReactNode, useId } from 'react';
import TextFieldIcon from './components/TextFieldIcon';
import TextFieldInput from './components/TextFieldInput';
import TextFieldInputWrapper from './components/TextFieldInputWrapper';
import TextFieldLabel from './components/TextFieldLabel';
import { TextFieldContext } from './context/TextFieldContext';

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
    const isDarkMode = useDarkMode();
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
    if (isDarkMode === undefined) {
        return (
            <div className="mb-2 flex h-12 w-12 items-center justify-center">

            </div>
        );
    }

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

