'use client';

import { cn } from '@/utils/utils';
import { useTextFieldContext } from '../context/TextFieldContext';

interface TextFieldLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function TextFieldLabel({ children, className }: TextFieldLabelProps) {
    const { hasValue, inputId } = useTextFieldContext();

    return (
        <label
            htmlFor={inputId}
            className={cn(
                'pointer-events-none absolute left-0 text-secondary transition-all duration-200',
                hasValue
                    ? 'top-1 text-xs'
                    : 'top-1/2 -translate-y-1/2 text-base',
                'peer-focus:top-1 peer-focus:text-xs peer-focus:text-brand-primary',
                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base',
                className
            )}
        >
            {children}
        </label>
    );
}

