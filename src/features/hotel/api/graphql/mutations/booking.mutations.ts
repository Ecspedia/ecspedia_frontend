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
