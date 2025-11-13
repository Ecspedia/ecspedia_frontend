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

export const HOTEL_FULL_FIELDS = gql`
  fragment HotelFullFields on Hotel {
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
`;
