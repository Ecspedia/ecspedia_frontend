import { useDarkMode } from '@/hooks';
import type { Hotel } from '@/types/graphql';
import { useCallback, useEffect, useState } from 'react';

interface UseHotelImageReturn {
  imageSrc: string;
  isExternalImage: boolean;
  isLoading: boolean;
  hasError: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

const FALLBACK_IMAGE_LIGHT = '/images/home/hotel_fallback_light.svg';
const FALLBACK_IMAGE_DARK = '/images/home/hotel_fallback_dark.svg';

const getFallbackImage = (isDarkMode: boolean) =>
  isDarkMode ? FALLBACK_IMAGE_DARK : FALLBACK_IMAGE_LIGHT;

export const useHotelImage = (hotel: Hotel): UseHotelImageReturn => {
  const { isDarkMode } = useDarkMode();

  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    hotel.image ? 'loading' : 'error'
  );

  useEffect(() => {
    setStatus(hotel.image ? 'loading' : 'error');
  }, [hotel.id, hotel.image]);

  const imageSrc =
    status === 'error' || !hotel.image ? getFallbackImage(isDarkMode ?? false) : hotel.image;

  const isExternalImage = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');

  const handleImageLoad = useCallback(() => setStatus('loaded'), []);
  const handleImageError = useCallback(() => setStatus('error'), []);

  return {
    imageSrc,
    isExternalImage,
    isLoading: status === 'loading',
    hasError: status === 'error',
    handleImageLoad,
    handleImageError,
  };
};
