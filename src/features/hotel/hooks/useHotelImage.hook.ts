import { useState, useCallback, useEffect } from 'react';
import { Hotel } from '@/types/api';

interface UseHotelImageReturn {
  imageSrc: string;
  isExternalImage: boolean;
  isLoading: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

/**
 * Hook for managing hotel image loading state and source selection
 * @param hotel - Hotel object containing image properties
 * @returns Image source, loading state, and handlers
 */
export const useHotelImage = (hotel: Hotel): UseHotelImageReturn => {
  const [isLoading, setIsLoading] = useState(true);

  // Use image, mainPhoto, or thumbnail in order of preference, fallback to mock
  const imageSrc =
    hotel.image || hotel.mainPhoto || hotel.thumbnail || '/images/home/hotel_mock.avif';

  // Check if image is external (starts with http:// or https://)
  const isExternalImage = imageSrc.startsWith('http://') || imageSrc.startsWith('https://');

  // Reset loading state when hotel changes
  useEffect(() => {
    setIsLoading(true);
  }, [hotel.id, imageSrc]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    imageSrc,
    isExternalImage,
    isLoading,
    handleImageLoad,
    handleImageError,
  };
};
