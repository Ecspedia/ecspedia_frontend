'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface TextFieldInputWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function TextFieldInputWrapper({ children, className }: TextFieldInputWrapperProps) {
    return (
        <div className={cn('relative flex-1 self-stretch min-w-0', className)}>
            {children}
        </div>
    );
}

