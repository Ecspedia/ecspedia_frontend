import { graphql } from '@/types/gql';

// Hotel Queries
export const GET_HOTELS = graphql(`
  query GET_HOTELS {
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
      hotelDescription
      hotelTypeId
      chain
      currency
      country
      city
      address
      zip
      mainPhoto
      thumbnail
      stars
      facilityIds
      accessibilityAttributes {
        attributes
        showerChair
        entranceType
        petFriendly
        rampAngle
        rampLength
        entranceDoorWidth
        roomMaxGuestsNumber
        distanceFromTheElevatorToTheAccessibleRoom
      }
    }
  }
`);

export const GET_HOTELS_BY_LOCATION = graphql(`
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
`);

export const SEARCH_HOTELS_BY_LOCATION = graphql(`
  query searchHotelsByLocation($location: String!) {
    hotelsByLocation(location: $location) {
      id
      name
      hotelDescription
      hotelTypeId
      chain
      currency
      location
      country
      city
      address
      zip
      latitude
      longitude
      pricePerNight
      rating
      reviewCount
      isAvailable
      image
      mainPhoto
      thumbnail
      stars
      facilityIds
      accessibilityAttributes {
        attributes
        showerChair
        entranceType
        petFriendly
        rampAngle
        rampLength
        entranceDoorWidth
        roomMaxGuestsNumber
        distanceFromTheElevatorToTheAccessibleRoom
      }
      deletedAt
    }
  }
`);

export const TOP_HOTELS = graphql(`
  query TopHotels {
    popularHotels {
      id
      name
      hotelDescription
      hotelTypeId
      chain
      currency
      location
      country
      city
      address
      zip
      latitude
      longitude
      pricePerNight
      rating
      reviewCount
      isAvailable
      image
      mainPhoto
      thumbnail
      stars
      facilityIds
      accessibilityAttributes {
        attributes
        showerChair
        entranceType
        petFriendly
        rampAngle
        rampLength
        entranceDoorWidth
        roomMaxGuestsNumber
        distanceFromTheElevatorToTheAccessibleRoom
      }
      deletedAt
    }
  }
`);
