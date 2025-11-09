'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HotelSearchResult, SearchHotelForm } from '@/features/hotel/components';
import { useHotelSearchQuery } from '@/features/hotel/hooks';
import { GoogleMapContent } from '@/app/_components';
import { Spinner } from '@/components/ui';
import { hotelSearchSubmittedParamsVar, updateHotelSearchParams, hotelSearchParamsVar } from '@/lib/apollo-reactive-vars';
import { DateHelper } from '@/utils/dateHelpers';
import { useReactiveVar } from '@apollo/client/react';

export default function SearchHotelsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formParams = useReactiveVar(hotelSearchParamsVar);
    const isInitialMount = useRef(true);

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

    // Listen for form submission and update URL (sync State → URL)
    // Skip on initial mount to avoid loop
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const currentLocation = searchParams.get('location');
        const currentStartDate = searchParams.get('startDate');
        const currentEndDate = searchParams.get('endDate');
        const currentAdults = searchParams.get('adults');

        // Only update URL if form params have changed and differ from current URL
        const hasChanged =
            formParams.location !== currentLocation ||
            formParams.startDate !== currentStartDate ||
            formParams.endDate !== currentEndDate ||
            formParams.adults.toString() !== currentAdults;

        if (formParams.location && hasChanged) {
            const params = new URLSearchParams();
            params.set('location', formParams.location);
            params.set('startDate', formParams.startDate);
            params.set('endDate', formParams.endDate);
            params.set('adults', formParams.adults.toString());

            router.push(`/search-hotels?${params.toString()}`);
        }
    }, [formParams.location, formParams.startDate, formParams.endDate, formParams.adults, router, searchParams]);

    // Use the hotel search query hook
    const { hotels, loading: hotelsLoading, error: errorMessage } = useHotelSearchQuery();

    // Show message if no location provided
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
            <SearchHotelForm />

            {!hotelsLoading && hotels.length > 0 && (
                <GoogleMapContent location={location} hotels={hotels} isHidden={false} />
            )}

            <Suspense fallback={<Spinner size="lg" />}>
                <div className="mt-6">
                    <HotelSearchResult hotels={hotels} loading={hotelsLoading} error={errorMessage} hasSearched={true} />
                </div>
            </Suspense>
        </div>
    );
}