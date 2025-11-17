import { gql } from '@apollo/client';

export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking(
    $hotelId: ID!
    $userId: ID!
    $firstNameGuest: String!
    $lastNameGuest: String!
    $emailGuest: String!
    $phoneNumberGuest: String!
    $startTime: String!
    $endTime: String!
    $price: Float!
    $currency: String!
  ) {
    createBooking(
      hotelId: $hotelId
      userId: $userId
      firstNameGuest: $firstNameGuest
      lastNameGuest: $lastNameGuest
      emailGuest: $emailGuest
      phoneNumberGuest: $phoneNumberGuest
      startTime: $startTime
      endTime: $endTime
      price: $price
      currency: $currency
    ) {
      id
      userId
      hotelId
      firstNameGuest
      lastNameGuest
      emailGuest
      phoneNumberGuest
      startTime
      endTime
      status
      price
      currency
      createdAt
      confirmedAt
      canceledAt
    }
  }
`;

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
