'use client';
import { Input } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton/skeleton';
import { DEFAULT_CITY_SUGGESTION } from '@/config';
import { type Location } from '@/types/graphql';
import { useQuery, useSuspenseQuery } from '@apollo/client/react';
import { MapPin } from 'lucide-react';
import { Suspense, useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocationState } from './hooks/useLocationState.hook';
import { GET_LOCATIONS, GET_TOP_DESTINATIONS } from './location.queries';

interface LocationSelectorProps {
  placeholder: string;
  onLocationSelect: (location: string) => void;
  onClose: () => void;
}


export default function LocationSelector(
  locationSelectorProps: LocationSelectorProps
) {
  const { onLocationSelect, placeholder, onClose: _onClose } = locationSelectorProps;

  const inputId = useId();

  const { data } = useQuery(GET_LOCATIONS, {
    fetchPolicy: 'cache-first',
  });
  const locations = data?.locations || DEFAULT_CITY_SUGGESTION;

  const {
    text,
    filteredSuggestions,
    isSearchingAndHasText,
    isThereSuggestions,
    isNoSuggestions,
    isInputEmpty,
    onChangeTextInput,
  } = useLocationState(locations, { maxSuggestionList: 5 });




  return (
    <div className="bg-overlay absolute top-0 flex w-full origin-top-left animate-[expandDown_130ms_ease-out] flex-col gap-2 rounded-lg p-4 shadow-lg">
      <label htmlFor={inputId} className="sr-only">{placeholder || 'Location'}</label>
      <>
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
        <Separator />
        {isSearchingAndHasText && (
          <div className="text-secondary py-4 text-center">Searching locations...</div>
        )}
        {isThereSuggestions && (
          <SuggestionList suggestions={filteredSuggestions} onLocationSelect={onLocationSelect} />
        )}

        {isNoSuggestions && (
          <div className="text-secondary py-4 text-center">No locations found</div>
        )}
      </>
      {isInputEmpty && (
        <>
          <PopularDestinationsTitle />
          <PopularDestinationsSection onLocationSelect={onLocationSelect} />
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
    <h3 className="text-primary text-lg font-semibold">Popular destinations</h3>
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

const PopularDestinationsError = () => {
  return (
    <div className="text-error text-sm ">Error loading popular destinations</div>
  );
};

const PopularDestinationsSection = ({
  onLocationSelect,
}: {
  onLocationSelect: (city: string) => void;
}) => {

  return (
    <ErrorBoundary fallback={<PopularDestinationsError />}>
      <Suspense fallback={<PopularDestinationsLoading />}>
        <PopularDestinationsContent onLocationSelect={onLocationSelect} />
      </Suspense>
    </ErrorBoundary>
  );
};

const PopularDestinationsLoading = () => {
  return (
    <div className="flex w-full gap-1">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-col flex gap-2 flex-1">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};
const PopularDestinationsContent = ({
  onLocationSelect,
}: {
  onLocationSelect: (city: string) => void;
}) => {
  const { data } = useSuspenseQuery(GET_TOP_DESTINATIONS, {
    fetchPolicy: 'cache-first',
  });
  const destinations = data.topLocations || [];
  return <PopularDestinations destinations={destinations} onLocationSelect={onLocationSelect} />;
};
