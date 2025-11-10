import { gql } from '@apollo/client';
import { HOTEL_FULL_FIELDS } from '../fragments/hotel.fragment';

// Moving to a fetch data for third party(hotelbeds)

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
