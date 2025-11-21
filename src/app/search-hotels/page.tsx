'use client';

import { GoogleMapContent } from '@/app/_components';
import { MainContainer, Spinner } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton/skeleton';
import { SEARCH_HOTELS_BY_LOCATION } from '@/features/hotel/api/hotel.queries';
import { HotelSearchResult, SearchHotelForm } from '@/features/hotel/components';
import { HotelSearchParams } from '@/lib/apollo-reactive-vars';

import { DateHelper } from '@/utils/dateHelpers';
import { useLazyQuery } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

// Match the height of HotelCard image (w-64 = 256px with aspect-[4/3] = 192px height) + 2xpadding =16
const MAP_SIZE = 225;

function SearchHotelsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    // Get URL parameters
    const location = searchParams.get('location') || '';
    // theses variables are not used yet to fetch hotels, but we keep them for future use
    const startDate = searchParams.get('startDate') || DateHelper.getToday().toString();
    const endDate = searchParams.get('endDate') || DateHelper.pastTomorrow().toString();
    const adults = searchParams.get('adults') || searchParams.get('guests') || '1';

    const [fetchHotels, { data, loading, error }] = useLazyQuery(SEARCH_HOTELS_BY_LOCATION,
        { fetchPolicy: 'network-only' });

    useEffect(() => {
        if (!location) return;
        fetchHotels({ variables: { location } });
    }, [location, fetchHotels]);


    const currentQs = searchParams.toString();

    const handleSubmit = (data: HotelSearchParams) => {
        const params = new URLSearchParams({
            location: data.location,
            startDate: data.startDate,
            endDate: data.endDate,
            adults: data.adults.toString(),
        });
        const nextQs = params.toString();

        if (nextQs === currentQs) {
            fetchHotels({ variables: { location: data.location } });
        } else {
            router.push(`?${nextQs}`);
        }
    };


    const hotels = data?.hotelsByLocation || [];
    const hotelsLoading = loading;
    const errorMessage = error?.message;

    if (!location) {
        return (
            <MainContainer className="py-6">
                <SearchHotelForm onSubmit={handleSubmit} isSearching={loading} />
                <div className="flex flex-col items-center justify-center min-h-[400px] mt-8">
                    <h1 className="text-2xl font-bold text-primary mb-4">Start Your Hotel Search</h1>
                    <p className="text-secondary">
                        Enter your destination and travel dates above to find hotels
                    </p>
                </div>
            </MainContainer>
        );
    }


    return (

        <MainContainer>
            <SearchHotelForm variant='extended' onSubmit={handleSubmit} isSearching={hotelsLoading} />
            <div className='flex-col lg:flex lg:flex-row lg:gap-4 lg:mt-2'>
                {hotelsLoading && <MapSkeleton />}
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
        </MainContainer>

    );
}


const MapSkeleton = () => {
    return (
        <div className="shrink-0 self-start" style={{ width: `${MAP_SIZE}px`, height: `${MAP_SIZE}px` }}>
            <Skeleton className="h-full w-full rounded-lg" />
        </div>
    );
};
export default function SearchHotelsPage() {
    return (

        <Suspense fallback={
            <MainContainer className="py-6">
                <Spinner size="lg" />
            </MainContainer>
        }>

            <SearchHotelsContent />
        </Suspense>
    );
}
