'use client';

import { Spinner, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export default function BookingLoading() {
    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Spinner size="lg" />
                <p className="text-secondary mt-4">Loading booking details...</p>
            </div>
        </div>
    );
}

