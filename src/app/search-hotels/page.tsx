'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { HotelSearchResult, SearchHotelForm } from '@/features/hotel/components';
import { useHotelSearchQuery } from '@/features/hotel/hooks';
import { GoogleMapContent } from '@/app/_components';
import { Spinner } from '@/components/ui';
import { hotelSearchSubmittedParamsVar, updateHotelSearchParams } from '@/lib/apollo-reactive-vars';
import { DateHelper } from '@/utils/dateHelpers';

// Match the height of HotelCard image (w-64 = 256px with aspect-[4/3] = 192px height) + 2xpadding =16
const MAP_SIZE = 225;

function SearchHotelsContent() {
    const searchParams = useSearchParams();

    // Get URL parameters
    const location = searchParams.get('location') || '';
    const startDate = searchParams.get('startDate') || DateHelper.getToday().toString();
    const endDate = searchParams.get('endDate') || DateHelper.pastTomorrow().toString();
    const adults = searchParams.get('adults') || searchParams.get('guests') || '1';

    // Update the reactive variable with URL params when they change (sync URL → State)
    useEffect(() => {
        if (location) {
            updateHotelSearchParams({
                location,
                startDate,
                endDate,
                adults: parseInt(adults),
            });
            hotelSearchSubmittedParamsVar({
                location,
                startDate,
                endDate,
                adults: parseInt(adults),
            });
        }
    }, [location, startDate, endDate, adults]);



    const { hotels, loading: hotelsLoading, error: errorMessage } = useHotelSearchQuery();


    if (!location) {
        return (
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6">
                <SearchHotelForm />
                <div className="flex flex-col items-center justify-center min-h-[400px] mt-8">
                    <h1 className="text-2xl font-bold text-primary mb-4">Start Your Hotel Search</h1>
                    <p className="text-secondary">
                        Enter your destination and travel dates above to find hotels
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6">
            <SearchHotelForm variant='extended' />
            <div className='flex gap-4 mt-2'>
                {!hotelsLoading && hotels.length > 0 && (
                    <div
                        className="shrink-0 self-start"
                        style={{ width: `${MAP_SIZE}px`, height: `${MAP_SIZE}px` }}
                    >
                        <GoogleMapContent location={location} hotels={hotels} isHidden={false} />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <HotelSearchResult hotels={hotels} loading={hotelsLoading} error={errorMessage} hasSearched={true} />
                </div>
            </div>
        </div>
    );
}

export default function SearchHotelsPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 py-6">
                <Spinner size="lg" />
            </div>
        }>
            <SearchHotelsContent />
        </Suspense>
    );
}
