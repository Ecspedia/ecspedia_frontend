import { gql } from '@apollo/client';

export const BOOKINGS_BY_USER_EMAIL_QUERY = gql`
  query BookingsByUserEmail($email: String!) {
    bookingsByUserEmail(email: $email) {
      id
      hotelId
      userId
      roomType
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

export const HOTEL_BY_ID_QUERY = gql`
  query HotelById($id: ID!) {
    hotelById(id: $id) {
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
