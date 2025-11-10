'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export default function BookingNotFound() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h1 className="text-2xl font-bold text-primary mb-4">Hotel Not Found</h1>
                <p className="text-secondary mb-6">
                    We couldn&apos;t find the hotel you&apos;re trying to book.
                </p>
                <Button
                    onClick={() => router.push('/search-hotels')}
                    variant="primary"
                    className="px-6 py-2"
                >
                    Back to Search
                </Button>
            </div>
        </div>
    );
}

