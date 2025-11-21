'use client';

import useMediaQuery from './useMediaQuery.hook';

export default function useIsMobile() {
    return useMediaQuery('(max-width: 1023px)');
}
