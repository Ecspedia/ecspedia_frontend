/**
 * Mock Payment Service
 *
 * Simulates payment processing for demo purposes
 * Single Responsibility: Handle mock payment validation and processing
 */

import { PaymentDetails, PaymentResponse } from '@/types/booking';

class MockPaymentService {
  /**
   * Simulate payment processing with artificial delay
   */
  async processPayment(paymentDetails: PaymentDetails, amount: number): Promise<PaymentResponse> {
    // Simulate network delay
    await this.delay(2000);

    // Validate card details
    const validation = this.validatePaymentDetails(paymentDetails);
    if (!validation.isValid) {
      return {
        success: false,
        transactionId: '',
        message: validation.error || 'Payment validation failed',
        timestamp: new Date().toISOString(),
      };
    }

    // Simulate payment processing
    const isSuccess = this.simulatePaymentOutcome();

    if (isSuccess) {
      return {
        success: true,
        transactionId: this.generateTransactionId(),
        message: `Payment of $${amount} processed successfully`,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        transactionId: '',
        message: 'Payment declined. Please try another card.',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Validate payment details
   */
  private validatePaymentDetails(details: PaymentDetails): { isValid: boolean; error?: string } {
    // Validate card number (basic Luhn algorithm check)
    if (!this.isValidCardNumber(details.cardNumber)) {
      return { isValid: false, error: 'Invalid card number' };
    }

    // Validate expiry date
    if (!this.isValidExpiryDate(details.expiryDate)) {
      return { isValid: false, error: 'Card has expired or invalid expiry date' };
    }

    // Validate CVV
    if (!this.isValidCVV(details.cvv)) {
      return { isValid: false, error: 'Invalid CVV code' };
    }

    // Validate card holder name
    if (!details.cardHolder || details.cardHolder.trim().length < 3) {
      return { isValid: false, error: 'Invalid card holder name' };
    }

    return { isValid: true };
  }

  /**
   * Basic Luhn algorithm for card number validation
   */
  private isValidCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\s/g, '');

    if (!/^\d{13,19}$/.test(digits)) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  /**
   * Validate expiry date (MM/YY format)
   */
  private isValidExpiryDate(expiryDate: string): boolean {
    const match = expiryDate.match(/^(\d{2})\/(\d{2})$/);
    if (!match) {
      return false;
    }

    const month = parseInt(match[1]);
    const year = parseInt('20' + match[2]);

    if (month < 1 || month > 12) {
      return false;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  }

  /**
   * Validate CVV (3 or 4 digits)
   */
  private isValidCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }

  /**
   * Simulate payment outcome (90% success rate)
   */
  private simulatePaymentOutcome(): boolean {
    return Math.random() > 0.1;
  }

  /**
   * Generate mock transaction ID
   */
  private generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `TXN-${timestamp}-${random}`;
  }

  /**
   * Simulate network delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get test card numbers for demo
   */
  getTestCards() {
    return {
      success: {
        number: '4532015112830366',
        holder: 'John Doe',
        expiry: '12/25',
        cvv: '123',
      },
      declined: {
        number: '4000000000000002',
        holder: 'Jane Smith',
        expiry: '12/25',
        cvv: '456',
      },
    };
  }
}

export const mockPaymentService = new MockPaymentService();
