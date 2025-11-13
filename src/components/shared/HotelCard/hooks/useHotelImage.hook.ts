import { useState, useCallback, useEffect } from 'react';
import { Hotel } from '@/types/api';
import { useDarkMode } from '@/hooks';

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
  const isDarkMode = useDarkMode();

  const [isLoading, setIsLoading] = useState(!!hotel.image);
  const [hasError, setHasError] = useState(!hotel.image);
  const [currentImageSrc, setCurrentImageSrc] = useState(
    hotel.image || getFallbackImage(isDarkMode)
  );

  const isExternalImage =
    currentImageSrc.startsWith('http://') || currentImageSrc.startsWith('https://');

  // Handle hotel image changes (only when hotel changes, NOT when dark mode changes)
  useEffect(() => {
    if (hotel.image) {
      setCurrentImageSrc(hotel.image);
      setIsLoading(true);
      setHasError(false);
    } else {
      setCurrentImageSrc(getFallbackImage(isDarkMode));
      setIsLoading(false);
      setHasError(true);
    }
    // Intentionally NOT including isDarkMode - we don't want to reload hotel images when theme changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel.id, hotel.image]);

  // Update ONLY fallback image when dark mode changes (don't trigger loading state)
  useEffect(() => {
    // Only update if currently showing fallback (not actual hotel image)
    if (hasError || !hotel.image) {
      setCurrentImageSrc(getFallbackImage(isDarkMode));
    }
    // Intentionally minimal dependencies - we only want to react to theme changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    setCurrentImageSrc(getFallbackImage(isDarkMode));
  }, [isDarkMode]);

  return {
    imageSrc: currentImageSrc,
    isExternalImage,
    isLoading,
    hasError,
    handleImageLoad,
    handleImageError,
  };
};
