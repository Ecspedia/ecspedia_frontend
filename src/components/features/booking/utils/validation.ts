/**
 * Booking Form Validation Utilities
 *
 * Centralized validation rules for booking forms
 */

export const validationRules = {
  // Guest Details
  firstName: {
    required: 'First name is required',
    minLength: { value: 2, message: 'Minimum 2 characters' },
  },

  lastName: {
    required: 'Last name is required',
    minLength: { value: 2, message: 'Minimum 2 characters' },
  },

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },

  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9\s\-\+\(\)]+$/,
      message: 'Invalid phone number',
    },
  },

  // Payment Details
  cardNumber: {
    required: 'Card number is required',
    pattern: {
      value: /^[\d\s]{13,19}$/,
      message: 'Invalid card number format',
    },
  },

  cardHolder: {
    required: 'Card holder name is required',
    minLength: { value: 3, message: 'Minimum 3 characters' },
  },

  expiryDate: {
    required: 'Expiry date is required',
    pattern: {
      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
      message: 'Format: MM/YY',
    },
  },

  cvv: {
    required: 'CVV is required',
    pattern: {
      value: /^\d{3,4}$/,
      message: '3 or 4 digits',
    },
  },
} as const;
