import { z } from 'zod';

/**
 * Zod schema for Hotel validation
 * This provides runtime type checking and validation for hotel data
 */
export const hotelSchema = z.object({
  id: z.string().min(1, 'Hotel ID is required'),
  name: z.string().min(1, 'Hotel name is required'),
  location: z.string().min(1, 'Location is required'),
  image: z.string().url('Invalid image URL').optional(),
  amenities: z.array(z.string()).default([]),
  fullyRefundable: z.boolean(),
  reserveNowPayLater: z.boolean(),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  reviewCount: z.number().int().nonnegative('Review count must be non-negative'),
  pricePerNight: z.number().positive('Price per night must be positive'),
  totalPrice: z.number().positive('Total price must be positive'),
  includesTaxesAndFees: z.boolean(),
  latitude: z.number().min(-90).max(90, 'Invalid latitude').optional(),
  longitude: z.number().min(-180).max(180, 'Invalid longitude').optional(),
});

/**
 * Zod schema for Hotel Search Parameters
 * Used for form validation and API request validation
 */
export const hotelSearchParamsSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().int().positive('Number of guests must be positive').optional(),
  rooms: z.number().int().positive('Number of rooms must be positive').optional(),
}).refine(
  (data) => {
    // If both dates are provided, checkIn must be before checkOut
    if (data.checkIn && data.checkOut) {
      return new Date(data.checkIn) < new Date(data.checkOut);
    }
    return true;
  },
  {
    message: 'Check-in date must be before check-out date',
    path: ['checkOut'], // Error will be associated with checkOut field
  }
);

/**
 * Infer TypeScript types from Zod schemas
 * This ensures your types stay in sync with validation
 */
export type Hotel = z.infer<typeof hotelSchema>;
export type HotelSearchParams = z.infer<typeof hotelSearchParamsSchema>;
