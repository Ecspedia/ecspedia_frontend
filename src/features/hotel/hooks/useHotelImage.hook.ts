import { useState, useCallback, useEffect } from 'react';
import { Hotel } from '@/types/api';
import { useAppSelector } from '@/hooks';
import { selectIsDarkMode } from '@/stores/darkModeSlice';

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

export const useHotelImage = (hotel: Hotel): UseHotelImageReturn => {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const fallbackImage = isDarkMode ? FALLBACK_IMAGE_DARK : FALLBACK_IMAGE_LIGHT;

  const [isLoading, setIsLoading] = useState(!!hotel.image);
  const [hasError, setHasError] = useState(!hotel.image);
  const [currentImageSrc, setCurrentImageSrc] = useState(hotel.image || fallbackImage);

  const isExternalImage =
    currentImageSrc.startsWith('http://') || currentImageSrc.startsWith('https://');

  useEffect(() => {
    if (hotel.image) {
      setCurrentImageSrc(hotel.image);
      setIsLoading(true);
      setHasError(false);
    } else {
      setCurrentImageSrc(fallbackImage);
      setIsLoading(false);
      setHasError(true);
    }
  }, [hotel.id, hotel.image, fallbackImage]);

  useEffect(() => {
    if (hasError || !hotel.image) {
      setCurrentImageSrc(fallbackImage);
    }
  }, [isDarkMode, hasError, hotel.image, fallbackImage]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    setCurrentImageSrc(fallbackImage);
  }, [fallbackImage]);

  return {
    imageSrc: currentImageSrc,
    isExternalImage,
    isLoading,
    hasError,
    handleImageLoad,
    handleImageError,
  };
};
