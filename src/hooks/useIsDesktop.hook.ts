'use client';

import useMediaQuery from './useMediaQuery.hook';

export default function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
