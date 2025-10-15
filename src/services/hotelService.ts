import { api } from '@/lib/api';
import { AppError } from '@/lib/errors';
import { Hotel } from '@/types/hotel';

export interface HotelSearchParams {
  location: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}

export const hotelService = {
  getHotelsByLocation: async (location: string): Promise<Hotel[]> => {
    try {
      const hotels = await api.get<Hotel[]>(`/hotels/location/${encodeURIComponent(location)}`);
      return hotels;
    } catch (error) {
      // Re-throw AppError instances
      if (AppError.isAppError(error)) {
        throw error;
      }
      // Handle unexpected errors
      throw new AppError('Failed to fetch hotels', 500, 'HOTEL_FETCH_ERROR');
    }
  },
};
