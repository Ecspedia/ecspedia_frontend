import { DEFAULT_CITY_SUGGESTION } from '@/config';
import { useFilter, useInput, useUniqueValues } from '@/hooks/useInput';
import type { Location } from '@/types/graphql';
import { useCallback, type ChangeEvent } from 'react';

interface UseLocationStateProps {
  maxSuggestionList?: number;
}

export const useFilterLocations = (query: string, allLocations: Location[]) => {
  const filteredLocations = useFilter(allLocations, 'city', query);
  const filteredCountries = useFilter(allLocations, 'country', query);
  const filteredStates = useFilter(allLocations, 'state', query);
  const uniqueLocations = useUniqueValues(
    useUniqueValues(filteredLocations, filteredCountries),
    filteredStates
  );
  return Array.from(uniqueLocations);
};

export const useInputLocation = (allLocations: Location[]) => {
  const { text, debouncedText, setText } = useInput({ initialValue: '' });
  const filteredSuggestions = useFilterLocations(debouncedText, allLocations);

  const onChangeTextInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText]
  );

  return {
    text,
    debouncedText,
    filteredSuggestions,
    onChangeTextInput,
  };
};

export const useLocationState = (
  allLocations: Location[],
  { maxSuggestionList = 5 }: UseLocationStateProps = {}
) => {
  const { text, debouncedText, filteredSuggestions, onChangeTextInput } = useInputLocation(
    allLocations || DEFAULT_CITY_SUGGESTION
  );

  const hasText = text.length > 0;
  const isSearching = text !== debouncedText && hasText;

  return {
    text,
    filteredSuggestions: filteredSuggestions.slice(0, maxSuggestionList),
    isSearchingAndHasText: isSearching && hasText,
    isThereSuggestions: !isSearching && filteredSuggestions.length > 0 && hasText,
    isNoSuggestions: !isSearching && filteredSuggestions.length === 0 && hasText,
    isInputEmpty: !hasText,
    onChangeTextInput,
  };
};
