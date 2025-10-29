export interface Hotel {
  id: string;
  name: string;
  location: string;
  image?: string;
  isAvailable: boolean;
  rating?: number;
  reviewCount?: number;
  pricePerNight: number;
  latitude?: number;
  longitude?: number;
}
