import { useEffect, useState } from 'react';

export const useDebouncedText = (text: string, delay = 200) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return debouncedText;
};

export const useFilter = <T>(items: T[], key: keyof T, query: string) => {
  return items.filter((item) => {
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

export const useInput = ({
  initialValue = '',
  options,
}: {
  initialValue?: string;
  options?: { debounceDelay?: number };
}) => {
  const { debounceDelay = 200 } = options || {};
  const [text, setText] = useState(initialValue);
  const debouncedText = useDebouncedText(text, debounceDelay);

  return {
    text,
    debouncedText,
    setText,
  };
};
