/**
 * Booking Form Formatting Utilities
 *
 * Reusable formatting functions for form inputs
 */

/**
 * Format card number with spaces every 4 digits
 * Example: "1234567890123456" -> "1234 5678 9012 3456"
 */
export const formatCardNumber = (value: string): string => {
  return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
};

/**
 * Format expiry date as MM/YY
 * Example: "1225" -> "12/25"
 */
export const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return digits.slice(0, 2) + '/' + digits.slice(2, 4);
  }
  return digits;
};

/**
 * Format currency amount
 * Example: 150 -> "$150"
 */
export const formatCurrency = (amount: number): string => {
  return `$${amount}`;
};

/**
 * Format date for display
 * Example: "2025-10-31" -> "Oct 31, 2025"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
