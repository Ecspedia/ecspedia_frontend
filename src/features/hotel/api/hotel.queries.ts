import { HOTEL_CORE_FIELDS, HOTEL_FULL_FIELDS } from '@/config/graphql/fragments';
import { gql } from '@apollo/client';

// Hotel Queries
export const GET_HOTELS = gql`
  ${HOTEL_CORE_FIELDS}
  query GetHotels {
    hotels {
      ...HotelCoreFields
    }
  }
`;

export const GET_HOTELS_BY_LOCATION = gql`
  ${HOTEL_CORE_FIELDS}
  query GetHotelsByLocation($location: String!) {
    hotelsByLocation(location: $location) {
      ...HotelCoreFields
    }
  }
`;

export const SEARCH_HOTELS_BY_LOCATION = gql`
  ${HOTEL_FULL_FIELDS}
  query searchHotelsByLocation($location: String!) {
    hotelsByLocation(location: $location) {
      ...HotelFullFields
    }
  }
`;

export const TOP_HOTELS = gql`
  ${HOTEL_FULL_FIELDS}
  query TopHotels {
    popularHotels {
      ...HotelFullFields
    }
  }
`;
