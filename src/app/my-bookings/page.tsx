"use client";

import { Suspense } from 'react';
import { MainContainer, Spinner } from '@/components/ui';
import MyBookingsContent from './MyBookingsContent';

export default function MyBookingsPage() {
    return (
        <Suspense fallback={<MainContainer className="flex items-center justify-center min-h-[400px]"><Spinner /></MainContainer>}>
            <MyBookingsContent />
        </Suspense>
    );
}
