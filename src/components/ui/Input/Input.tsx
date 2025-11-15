'use client';

import React from 'react';
import { cn } from '@/utils/utils';

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
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