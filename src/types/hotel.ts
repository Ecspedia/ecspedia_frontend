export interface Hotel {
  id: string;
  name: string;
  location: string;
  image?: string;
  amenities: string[];
  fullyRefundable: boolean;
  reserveNowPayLater: boolean;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  totalPrice: number;
  includesTaxesAndFees: boolean;
  latitude?: number;
  longitude?: number;
}
