import { gql } from '@apollo/client';

/**
 * GraphQL Mutations for Booking Operations
 */

export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      id
      hotelId
      hotelName
      guestDetails {
        firstName
        lastName
        email
        phone
        specialRequests
      }
      bookingDates {
        checkIn
        checkOut
        nights
      }
      totalAmount
      status
      paymentStatus
      confirmationCode
      createdAt
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
      status
      paymentStatus
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: PaymentInput!) {
    processPayment(input: $input) {
      success
      transactionId
      message
      timestamp
    }
  }
`;
