import { gql } from '@apollo/client';

export const HOTEL_CORE_FIELDS = gql`
  fragment HotelCoreFields on Hotel {
    id
    name
    location
    image
    isAvailable
    rating
    reviewCount
    pricePerNight
    latitude
    longitude
  }
`;
