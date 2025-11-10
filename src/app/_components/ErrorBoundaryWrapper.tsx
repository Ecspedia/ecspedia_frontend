'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { MainErrorFallback } from '@/components/error';

interface ErrorBoundaryWrapperProps {
    children: React.ReactNode;
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
    return (
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}

