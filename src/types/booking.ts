/**
 * Booking Types and Interfaces
 *
 * Defines all types related to hotel booking process
 */

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingDates {
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  nights: number;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string; // MM/YY
  cvv: string;
  billingAddress?: string;
}

export interface BookingRequest {
  hotelId: string;
  guestDetails: GuestDetails;
  bookingDates: BookingDates;
  paymentDetails: PaymentDetails;
  totalAmount: number;
  adults: number;
  children?: number;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  guestDetails: GuestDetails;
  bookingDates: BookingDates;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  confirmationCode: string;
  createdAt: string;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: string;
}
