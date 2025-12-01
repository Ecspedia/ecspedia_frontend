'use client';

import { SearchTextField } from '@/components/shared/SearchTextField';
import { useExpandableFields } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { Hotel } from '@/types/graphql';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { selectFilters, updateFilters } from '../stores/hotelSearchSlice';

interface HotelNameFilterProps {
  hotels: Hotel[];
}

enum HotelNameFilterFieldType {
  SEARCH = 'search',
}

export function HotelNameFilter({ hotels }: HotelNameFilterProps) {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const [searchQueryInput, setSearchQueryInput] = useState(filters.searchQuery);

  const handleSearchChange = (value: string) => {
    setSearchQueryInput(value);
  };

  useEffect(() => {
    dispatch(updateFilters({ searchQuery: searchQueryInput }));
  }, [searchQueryInput, dispatch]);
  useEffect(() => {
    setSearchQueryInput(filters.searchQuery);
  }, [filters.searchQuery]);

  const { getFieldRef, handleFieldClick, closeField, isFieldExpanded } = useExpandableFields<
    HotelNameFilterFieldType,
    HTMLDivElement
  >();

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-primary">Search by property name</h3>
      <div ref={getFieldRef(HotelNameFilterFieldType.SEARCH)}>
        <SearchTextField<Hotel>
          icon={Search}
          placeholder="e.g. Marriott"
          value={searchQueryInput}
          onChange={handleSearchChange}
          isOpen={isFieldExpanded(HotelNameFilterFieldType.SEARCH)}
          onOpen={() => handleFieldClick(HotelNameFilterFieldType.SEARCH)}
          onClose={closeField}
          suggestList={hotels}
          searchField="name"
          titleLabel="Popular hotels"
          unselectedValue={() => {
            setSearchQueryInput('');
            dispatch(updateFilters({ searchQuery: '' }));
          }}
        />
      </div>
    </div>
  );
}
