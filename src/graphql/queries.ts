import { gql } from '@apollo/client';

export const GET_HOTELS = gql`
  query GetHotels {
    hotels {
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
  }
`;

export const GET_HOTELS_BY_LOCATION = gql`
  query GetHotelsByLocation($location: String!) {
    hotelsByLocation(location: $location) {
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
  }
`;

export const GET_HOTEL_BY_ID = gql`
  query GetHotelById($id: ID!) {
    hotel(id: $id) {
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
  }
`;
