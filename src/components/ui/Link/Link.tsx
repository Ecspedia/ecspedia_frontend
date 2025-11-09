'use client';

import NextLink from 'next/link';
import { ComponentProps } from 'react';
import { cn } from '@/utils/utils';

interface LinkProps extends ComponentProps<typeof NextLink> {
  className?: string;
}

/**
 * Link component that wraps Next.js Link with theme styling
 */
export function Link({ className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        'text-brand-secondary hover:text-brand-secondary-hover font-medium underline transition-colors',
        className
      )}
      {...props}
    />
  );
}

