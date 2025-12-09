import type { HotelCreateInput, HotelResponseDto } from '@/types/graphql';

export function hotelToHotelCreateDtoInput(hotel: HotelResponseDto): HotelCreateInput {
  return {
    id: hotel.id,
    name: hotel.name,
    location: hotel.location,
    image: hotel.image,
    isAvailable: hotel.isAvailable,
    rating: hotel.rating,
    reviewCount: hotel.reviewCount,
    pricePerNight: hotel.pricePerNight,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    hotelDescription: hotel.hotelDescription,
    hotelTypeId: hotel.hotelTypeId,
    chain: hotel.chain,
    currency: hotel.currency,
    country: hotel.country,
    city: hotel.city,
    address: hotel.address,
    zip: hotel.zip,
    mainPhoto: hotel.mainPhoto,
    thumbnail: hotel.thumbnail,
    stars: hotel.stars,
    facilityIds: hotel.facilityIds,
    deletedAt: hotel.deletedAt,
  };
}
