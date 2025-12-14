import { graphql } from '@/types/gql';

export const CREATE_BOOKING_MUTATION = graphql(`
  mutation CreateBooking($bookingCreateDto: BookingCreateInput!) {
    createBooking(bookingCreateDto: $bookingCreateDto) {
      id
      userId
      hotelId
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
`);

export const DELETE_BOOKING_MUTATION = graphql(`
  mutation DeleteBookingById($bookingId: ID!) {
    deleteBookingById(bookingId: $bookingId)
  }
`);
