import { gql } from '@apollo/client';
import { HOTEL_CORE_FIELDS } from '@/graphql/fragments';

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

export const GET_HOTEL_BY_ID = gql`
  ${HOTEL_CORE_FIELDS}
  query GetHotelById($id: ID!) {
    hotel(id: $id) {
      ...HotelCoreFields
    }
  }
`;
