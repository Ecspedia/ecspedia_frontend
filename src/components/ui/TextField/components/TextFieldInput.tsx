'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/utils';
import { useTextFieldContext } from '../context/TextFieldContext';

interface TextFieldInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    className?: string;
}

export default function TextFieldInput({ className, ...props }: TextFieldInputProps) {
    const { value, onChange, readOnly, inputId } = useTextFieldContext();

    return (
        <input
            id={inputId}
            type="text"
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder=" "
            autoComplete="off"
            className={cn(
                'peer h-full w-full border-none bg-transparent pt-2 text-base text-primary placeholder:text-transparent focus:outline-none',
                readOnly && 'cursor-default',
                className
            )}
            readOnly={readOnly}
            onFocus={(e) => readOnly && e.target.blur()}
            {...props}
        />
    );
}

