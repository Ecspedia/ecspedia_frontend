import { gql } from '@apollo/client';

export const CREATE_HOTEL_MUTATION = gql`
  mutation CreateHotel($hotelCreateDto: HotelCreateInput!) {
    createHotel(hotelCreateDto: $hotelCreateDto) {
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
      deletedAt
    }
  }
`;
