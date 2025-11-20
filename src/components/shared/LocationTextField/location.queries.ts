import { graphql } from '@/types';

export const GET_LOCATIONS = graphql(`
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
`);

export const GET_TOP_DESTINATIONS = graphql(`
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
`);
