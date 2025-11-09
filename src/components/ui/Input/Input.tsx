'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function Input({ className, ...props }: InputProps) {
    return (
        <input
            type="text"
            className={cn(
                'text-primary',
                className
            )}
            {...props}
        />
    );
}