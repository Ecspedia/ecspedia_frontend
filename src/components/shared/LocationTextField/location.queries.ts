import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      code
      city
      country
      state
      latitude
      longitude
    }
  }
`;

export const GET_TOP_DESTINATIONS = gql`
  query topLocations {
    topLocations {
      id
      code
      city
      country
      state
      latitude
      longitude
      isPopular
    }
  }
`;
