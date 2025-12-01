'use client';

import FilterChip from '@/components/ui/Chip/FilterChip';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { resetFilters, selectFilters, updateFilters } from '../stores/hotelSearchSlice';
import { GuestRating } from '../utils/getRatingByFilterLabels';

export default function ActiveFilter() {
    const filters = useAppSelector(selectFilters);
    const dispatch = useAppDispatch();

    const DEFAULT_FILTERS = {
        searchQuery: '',
        rating: GuestRating.ANY,
        minPrice: 0,
        maxPrice: 1500,
    };

    const hasActiveFilters =
        filters.searchQuery !== DEFAULT_FILTERS.searchQuery ||
        filters.rating !== DEFAULT_FILTERS.rating ||
        filters.minPrice !== DEFAULT_FILTERS.minPrice ||
        filters.maxPrice !== DEFAULT_FILTERS.maxPrice;

    if (!hasActiveFilters) return null;

    const handleRemoveFilter = (filterType: string) => {

        switch (filterType) {
            case 'searchQuery':
                dispatch(updateFilters({ searchQuery: DEFAULT_FILTERS.searchQuery }));
                break;
            case 'rating':
                dispatch(updateFilters({ rating: DEFAULT_FILTERS.rating }));
                break;
            case 'minPrice':
                dispatch(updateFilters({ minPrice: DEFAULT_FILTERS.minPrice }));
                break;
            case 'maxPrice':
                dispatch(updateFilters({ maxPrice: DEFAULT_FILTERS.maxPrice }));
                break;
        }
    };

    const handleResetAll = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-primary">Active filters</h3>
                <button
                    onClick={handleResetAll}
                    className="text-sm text-brand-primary hover:underline cursor-pointer"
                >
                    Reset all
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {filters.searchQuery && (
                    <FilterChip
                        label={`Hotel: ${filters.searchQuery}`}
                        onRemove={() => handleRemoveFilter('searchQuery')}
                    />
                )}

                {filters.rating !== GuestRating.ANY && (
                    <FilterChip
                        label={`Rating: ${filters.rating}`}
                        onRemove={() => handleRemoveFilter('rating')}
                    />
                )}

                {filters.minPrice !== DEFAULT_FILTERS.minPrice && (
                    <FilterChip
                        label={`Min: $${filters.minPrice}`}
                        onRemove={() => handleRemoveFilter('minPrice')}
                    />
                )}

                {filters.maxPrice !== DEFAULT_FILTERS.maxPrice && (
                    <FilterChip
                        label={`Max: $${filters.maxPrice}`}
                        onRemove={() => handleRemoveFilter('maxPrice')}
                    />
                )}
            </div>
        </div>
    );
}

