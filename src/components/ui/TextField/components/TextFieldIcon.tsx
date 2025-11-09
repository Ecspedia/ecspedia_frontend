'use client';

import { cn } from '@/utils/utils';

interface TextFieldIconProps {
    icon: React.ComponentType<{ className?: string }>;
    className?: string;
}

export default function TextFieldIcon({ icon: Icon, className }: TextFieldIconProps) {
    return (
        <Icon
            aria-hidden="true"
            className={cn(
                'h-5 w-5 text-primary shrink-0',
                className
            )}
        />
    );
}

