import { getApolloClient } from '@/lib/apollo-client';
import { GET_HOTELS, GET_HOTELS_BY_LOCATION, GET_HOTEL_BY_ID } from '@/graphql/queries';
import { AppError } from '@/lib/errors';
import { Hotel } from '@/types/hotel';

export interface HotelSearchParams {
  location: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}

interface GetHotelsResponse {
  hotels: Hotel[];
}

interface GetHotelsByLocationResponse {
  hotelsByLocation: Hotel[];
}

interface GetHotelByIdResponse {
  hotel: Hotel | null;
}

export const hotelService = {
  getAllHotels: async (): Promise<Hotel[]> => {
    try {
      const client = getApolloClient();
      const { data } = await client.query<GetHotelsResponse>({
        query: GET_HOTELS,
      });
      return data?.hotels || [];
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw new AppError('Failed to fetch hotels', 500, 'HOTEL_FETCH_ERROR');
    }
  },

  getHotelsByLocation: async (location: string): Promise<Hotel[]> => {
    try {
      const client = getApolloClient();
      const { data } = await client.query<GetHotelsByLocationResponse>({
        query: GET_HOTELS_BY_LOCATION,
        variables: { location },
      });
      return data?.hotelsByLocation || [];
    } catch (error) {
      console.error('Error fetching hotels by location:', error);
      if (AppError.isAppError(error)) {
        throw error;
      }
      throw new AppError('Failed to fetch hotels', 500, 'HOTEL_FETCH_ERROR');
    }
  },

  getHotelById: async (id: string): Promise<Hotel | null> => {
    try {
      const client = getApolloClient();
      const { data } = await client.query<GetHotelByIdResponse>({
        query: GET_HOTEL_BY_ID,
        variables: { id },
      });
      return data?.hotel || null;
    } catch (error) {
      console.error('Error fetching hotel by id:', error);
      throw new AppError('Failed to fetch hotel', 500, 'HOTEL_FETCH_ERROR');
    }
  },
};
