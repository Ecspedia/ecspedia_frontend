'use client';

import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.hook';

type UseMediaQueryOptions = {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

export default function useMediaQuery(
    query: string,
    { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue;
        }
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query);
        }
        return defaultValue;
    });

    function handleChange() {
        setMatches(getMatches(query));
    }

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query);

        handleChange();

        matchMedia.addEventListener('change', handleChange);

        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}
