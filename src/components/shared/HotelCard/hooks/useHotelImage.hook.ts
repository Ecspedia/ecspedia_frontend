import { useDarkMode } from '@/hooks';
import type { Hotel } from '@/types/graphql';
import { useCallback, useEffect, useRef, useState } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';

interface UseHotelImageReturn {
  imageSrc: string;
  isLoading: boolean;
  hasError: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

const FALLBACK_IMAGES = {
  light: '/images/home/hotel_fallback_light.svg',
  dark: '/images/home/hotel_fallback_dark.svg',
} as const;

export function useHotelImage(hotel: Hotel): UseHotelImageReturn {
  const { isDarkMode } = useDarkMode();
  const [status, setStatus] = useState<ImageStatus>(() => (hotel.image ? 'loading' : 'error'));

  const prevImageRef = useRef(hotel.image);
  useEffect(() => {
    if (prevImageRef.current !== hotel.image) {
      prevImageRef.current = hotel.image;
      setStatus(hotel.image ? 'loading' : 'error');
    }
  }, [hotel.image]);

  const fallbackImage = FALLBACK_IMAGES[isDarkMode === true ? 'dark' : 'light'];
  const imageSrc = status === 'error' || !hotel.image ? fallbackImage : hotel.image;

  const handleImageLoad = useCallback(() => setStatus('loaded'), []);
  const handleImageError = useCallback(() => setStatus('error'), []);

  return {
    imageSrc,
    isLoading: status === 'loading',
    hasError: status === 'error',
    handleImageLoad,
    handleImageError,
  };
}
