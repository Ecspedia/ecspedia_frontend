'use client';

import { GoogleMapContent } from '@/app/_components';
import { MainContainer, Spinner } from '@/components/ui';
import { HotelFilter, HotelSearchResult, SearchHotelForm } from '@/features/hotel/components';
import {
    resetFilters,
    selectFilters,
    updateFormValues,
    updateSubmittedValues
} from '@/features/hotel/stores/hotelSearchSlice';
import { useIsMobile } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

import { Skeleton } from '@/components/ui/Skeleton/skeleton';
import ActiveFilter from '@/features/hotel/components/ActiveFilter';
import { useHotelSearch } from '@/features/hotel/hooks/useHotelSearch';
import { useHotelSearchParams } from '@/features/hotel/hooks/useHotelSearchParams.hook';
import { getRatingByFilterLabels } from '@/features/hotel/utils/getRatingByFilterLabels';
import { Suspense, useEffect, useMemo } from 'react';

// Match the height of HotelCard image (w-64 = 256px with aspect-[4/3] = 192px height) + 2xpadding =16
const MAP_SIZE = 225;

function SearchHotelsContent() {
    const dispatch = useAppDispatch();
    const isMobile = useIsMobile();

    const { location, startDate, endDate, adults } = useHotelSearchParams();
    const { hotels, loading, error, handleSubmit, fetchHotels } = useHotelSearch();
    const filters = useAppSelector(selectFilters);
    const searchQuery = filters.searchQuery;
    const rating = filters.rating;
    const minPrice = filters.minPrice;
    const maxPrice = filters.maxPrice;


    useEffect(() => {
        dispatch(resetFilters());
    }, [location, startDate, endDate, adults, dispatch]);

    const filteredHotels = useMemo(() => {
        return hotels.filter((hotel) => hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (hotel.rating ?? 0) >= getRatingByFilterLabels(rating) &&
            hotel.pricePerNight >= minPrice &&
            hotel.pricePerNight <= maxPrice);
    }, [hotels, searchQuery, rating, minPrice, maxPrice]);

    useEffect(() => {
        const params = { location, startDate, endDate, adults };
        dispatch(updateFormValues(params));
        dispatch(updateSubmittedValues(params));
    }, [dispatch, location, startDate, endDate, adults]);

    useEffect(() => {
        if (location) {
            fetchHotels({ variables: { location } });
        }
    }, [location, fetchHotels]);

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
            <div className=' lg:px-0'>
                <SearchHotelForm variant='extended' onSubmit={handleSubmit} isSearching={loading} />
            </div>
            <div className='flex-col gap-2  lg:flex lg:flex-row lg:gap-4 lg:mt-2'>
                <div className="lg:px-0 lg:shrink-0 lg:self-start" style={{ width: isMobile ? '100%' : `${MAP_SIZE}px` }}>
                    {loading && <MapSkeleton isMobile={isMobile} />}
                    {!loading && hotels.length > 0 && (
                        <div style={{ height: `${MAP_SIZE}px` }}>
                            <GoogleMapContent location={location} hotels={hotels} isHidden={false} />
                        </div>
                    )}
                    {!loading && (
                        <div className="mt-4 hidden lg:block">
                            <HotelFilter hotels={hotels} />
                        </div>
                    )}
                </div>
                <div className='mt-4 lg:mt-0 flex-1 min-w-0'>

                    <ActiveFilter />

                    <HotelSearchResult hotels={filteredHotels} loading={loading} error={error} hasSearched />
                </div>
            </div>
        </MainContainer>

    );
}

const MapSkeleton = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <div
            className="shrink-0 self-start w-full lg:w-auto"
            style={{ height: `${MAP_SIZE}px`, width: isMobile ? '100%' : `${MAP_SIZE}px` }}
        >
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
