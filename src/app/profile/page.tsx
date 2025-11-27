"use client";

import { Suspense } from 'react';
import { MainContainer, Spinner } from '@/components/ui';
import ProfileContent from './ProfileContent';

export default function ProfilePage() {
    return (
        <Suspense fallback={<MainContainer className="flex items-center justify-center min-h-[400px]"><Spinner /></MainContainer>}>
            <ProfileContent />
        </Suspense>
    );
}

