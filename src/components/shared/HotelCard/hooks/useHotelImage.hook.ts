import { useDarkMode } from '@/hooks';
import type { HotelResponseDto } from '@/types/graphql';
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

export function useHotelImage(hotel: HotelResponseDto): UseHotelImageReturn {
  const { isDarkMode } = useDarkMode();
  const [status, setStatus] = useState<ImageStatus>(() => (hotel.image ? 'loading' : 'error'));

  const hotelImage = hotel.mainPhoto || hotel.image;

  const prevImageRef = useRef(hotelImage);
  useEffect(() => {
    if (prevImageRef.current !== hotelImage) {
      prevImageRef.current = hotelImage;
      setStatus(hotelImage ? 'loading' : 'error');
    }
  }, [hotelImage]);

  const fallbackImage = FALLBACK_IMAGES[isDarkMode === true ? 'dark' : 'light'];

  const imageSrc = status === 'error' || !hotelImage ? fallbackImage : hotelImage;

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
