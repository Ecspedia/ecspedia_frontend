/**
 * Booking Context
 *
 * Simplified state management using useReducer pattern
 * Single Responsibility: Manage booking state and flow
 */

'use client';

import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { Hotel } from '@/types/hotel';
import { GuestDetails, BookingDates, PaymentDetails, PaymentResponse } from '@/types/booking';

// Booking Steps
export enum BookingStep {
  GUEST_DETAILS = 'GUEST_DETAILS',
  PAYMENT = 'PAYMENT',
  CONFIRMATION = 'CONFIRMATION',
}

// State Interface
interface BookingState {
  hotel: Hotel | null;
  guestDetails: GuestDetails | null;
  bookingDates: BookingDates | null;
  paymentDetails: PaymentDetails | null;
  currentStep: BookingStep;
  isProcessing: boolean;
  confirmationCode: string | null;
  paymentResponse: PaymentResponse | null;
}

// Action Types
type BookingAction =
  | { type: 'INITIALIZE_BOOKING'; payload: { hotel: Hotel; dates: BookingDates } }
  | { type: 'SET_GUEST_DETAILS'; payload: GuestDetails }
  | { type: 'SET_PAYMENT_DETAILS'; payload: PaymentDetails }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'COMPLETE_BOOKING'; payload: { response: PaymentResponse; code: string } }
  | { type: 'RESET_BOOKING' };

// Initial State
const initialState: BookingState = {
  hotel: null,
  guestDetails: null,
  bookingDates: null,
  paymentDetails: null,
  currentStep: BookingStep.GUEST_DETAILS,
  isProcessing: false,
  confirmationCode: null,
  paymentResponse: null,
};

// Reducer Function
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'INITIALIZE_BOOKING':
      return {
        ...state,
        hotel: action.payload.hotel,
        bookingDates: action.payload.dates,
        currentStep: BookingStep.GUEST_DETAILS,
      };

    case 'SET_GUEST_DETAILS':
      return {
        ...state,
        guestDetails: action.payload,
      };

    case 'SET_PAYMENT_DETAILS':
      return {
        ...state,
        paymentDetails: action.payload,
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep:
          state.currentStep === BookingStep.GUEST_DETAILS
            ? BookingStep.PAYMENT
            : state.currentStep === BookingStep.PAYMENT
            ? BookingStep.CONFIRMATION
            : state.currentStep,
      };

    case 'PREVIOUS_STEP':
      return {
        ...state,
        currentStep:
          state.currentStep === BookingStep.PAYMENT
            ? BookingStep.GUEST_DETAILS
            : state.currentStep === BookingStep.CONFIRMATION
            ? BookingStep.PAYMENT
            : state.currentStep,
      };

    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      };

    case 'COMPLETE_BOOKING':
      return {
        ...state,
        paymentResponse: action.payload.response,
        confirmationCode: action.payload.code,
        currentStep: BookingStep.CONFIRMATION,
        isProcessing: false,
      };

    case 'RESET_BOOKING':
      return initialState;

    default:
      return state;
  }
}

// Context Interface
interface BookingContextValue {
  state: BookingState;
  dispatch: Dispatch<BookingAction>;
}

// Create Context
const BookingContext = createContext<BookingContextValue | undefined>(undefined);

// Provider Component
export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom Hook
export function useBookingContext() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }
  return context;
}
