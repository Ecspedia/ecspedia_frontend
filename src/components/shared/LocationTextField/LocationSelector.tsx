'use client';
import { Input } from '@/components/ui';
import { DEFAULT_CITY_SUGGESTION, POPULAR_DESTINATIONS } from '@/config';
import type { Location } from '@/types/graphql';
import { MapPin } from 'lucide-react';
import { useId, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_LOCATIONS, GET_TOP_DESTINATIONS } from './location.queries';

interface LocationSelectorProps {
  placeholder: string;
  onLocationSelect: (location: string) => void;
  onClose: () => void;
}

interface GetLocationsResponse {
  locations: Location[];
}

interface GetTopDestinationsResponse {
  topLocations: Location[];
}

export default function LocationSelector(
  locationSelectorProps: LocationSelectorProps
) {
  const { onLocationSelect, placeholder, onClose: _onClose } = locationSelectorProps;
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const inputId = useId();
  const maxSuggestionList = 5;

  // Fetch all locations from API
  const { data: locationsData, error: locationsError } = useQuery<GetLocationsResponse>(GET_LOCATIONS, {
    fetchPolicy: 'cache-first', // Use cache if available, otherwise fetch
  });

  // Fetch popular destinations from API
  const { data: topDestinationsData, error: topDestinationsError } = useQuery<GetTopDestinationsResponse>(
    GET_TOP_DESTINATIONS,
    {
      fetchPolicy: 'cache-first',
    }
  );

  // All available locations from API or fallback to local data
  const allLocations = locationsData?.locations || DEFAULT_CITY_SUGGESTION;

  // Popular destinations from API or fallback to local data
  const popularDestinations = topDestinationsData?.topLocations || POPULAR_DESTINATIONS;

  // Debounce the search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 200);

    return () => clearTimeout(timer);
  }, [text]);

  // Filter locations based on debounced search text
  const filteredSuggestions = debouncedText
    ? allLocations
      .filter(
        (item) =>
          item.city.toLowerCase().includes(debouncedText.toLowerCase()) ||
          item.country.toLowerCase().includes(debouncedText.toLowerCase()) ||
          (item.state && item.state.toLowerCase().includes(debouncedText.toLowerCase()))
      )
      .slice(0, maxSuggestionList)
    : [];

  // Show loading indicator while debouncing
  const isSearching = text !== debouncedText && text.length > 0;

  // Log error if API fails (will use fallback data)
  useEffect(() => {
    if (locationsError) {
      console.error('Error fetching locations from API, using fallback data:', locationsError);
    }
    if (topDestinationsError) {
      console.error('Error fetching top destinations from API, using fallback data:', topDestinationsError);
    }
  }, [locationsError, topDestinationsError]);

  const onChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };

  const onClickSuggestion = (value: string) => {
    onLocationSelect(value);
  };

  return (
    <div className="bg-overlay absolute top-0 flex w-full origin-top-left animate-[expandDown_130ms_ease-out] flex-col gap-2 rounded-lg p-4 shadow-lg">
      <label htmlFor={inputId} className="sr-only">{placeholder || 'Location'}</label>

      <Input
        value={text}
        onChange={onChangeTextInput}
        placeholder={placeholder}
        className="border-muted-border text-primary w-full rounded-md py-2 text-2xl font-bold focus:border-transparent focus:outline-none"
        autoFocus
        autoComplete="off"
        id={inputId}
        aria-label={placeholder}
      />

      {isSearching && text.length > 0 && (
        <>
          <Separator />
          <div className="text-secondary py-4 text-center">Searching locations...</div>
        </>
      )}

      {!isSearching && filteredSuggestions.length > 0 && text.length > 0 && (
        <>
          <Separator />
          <SuggestionList suggestions={filteredSuggestions} onLocationSelect={onClickSuggestion} />
        </>
      )}

      {!isSearching && filteredSuggestions.length === 0 && text.length > 0 && (
        <>
          <Separator />
          <div className="text-secondary py-4 text-center">No locations found</div>
        </>
      )}

      {text.length === 0 && (
        <>
          <Separator />
          <PopularDestinationsTitle />
          <PopularDestinations
            destinations={popularDestinations}
            onLocationSelect={onLocationSelect}
          />
        </>
      )}
    </div>
  );
}

const Separator = () => {
  return <div className="bg-border-strong -mx-4 h-px" />;
};

const TileCity = ({ city, country }: Location) => {
  return (
    <div className="bg-overlay hover:bg-primary/10 flex cursor-pointer rounded-md px-2 py-2">
      <MapPin className="self-center" />
      <div className="flex flex-col pl-4">
        <div className="text-primary">{city}</div>
        <div className="text-secondary">{country}</div>
      </div>
    </div>
  );
};

const PopularDestinationsTitle = () => {
  return (
    <h3 className="text-color-primary-dark mb-2 text-lg font-semibold">Popular destinations</h3>
  );
};

const SuggestionList = ({
  suggestions,
  onLocationSelect,
}: {
  suggestions: Location[];
  onLocationSelect: (city: string) => void;
}) => {
  return (
    <ul className="max-h-80 overflow-y-auto">
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => onLocationSelect(item.city)}>
          <TileCity {...item} />
        </li>
      ))}
    </ul>
  );
};

const PopularDestinations = ({
  destinations,
  onLocationSelect,
}: {
  destinations: Location[];
  onLocationSelect: (city: string) => void;
}) => {
  const onClick = (city: string) => {
    onLocationSelect(city);
  };
  return (
    <ul>
      {destinations.map((destination, index) => (
        <li key={index} onClick={() => onClick(destination.city)}>
          <TileCity {...destination} />
        </li>
      ))}
    </ul>
  );
};
