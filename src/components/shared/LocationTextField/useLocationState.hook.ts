import { DEFAULT_CITY_SUGGESTION } from '@/config';
import type { Location } from '@/types/graphql';
import { useCallback, useEffect, useState, type ChangeEvent } from 'react';

interface UseLocationStateProps {
  maxSuggestionList?: number;
}

export const useDebouncedText = (text: string) => {
  const [debouncedText, setDebouncedText] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 200);
    return () => clearTimeout(timer);
  }, [text]);
  return debouncedText;
};

export const useFilter = <T>(items: T[], key: keyof T, query: string) => {
  return items.filter((item: T) => {
    const value = item[key];
    return typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase());
  });
};

export const useUniqueValues = <T>(first: T[], second: T[]) => {
  const unique = new Set<T>();
  first.forEach((item) => unique.add(item));
  second.forEach((item) => unique.add(item));
  return Array.from(unique);
};

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

export const useInput = () => {
  const [text, setText] = useState('');
  const debouncedText = useDebouncedText(text);
  return {
    text,
    debouncedText,
    setText,
  };
};
export const useInputLocation = (allLocations: Location[]) => {
  const { text, debouncedText, setText } = useInput();
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
