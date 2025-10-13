import HotelCard from "./HotelCard";

const mockHotels = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    location: "Downtown, New York",
    amenities: ["Free WiFi", "Pool", "Gym"],
    fullyRefundable: true,
    reserveNowPayLater: true,
    rating: 9.2,
    reviewCount: 1248,
    pricePerNight: 189,
    totalPrice: 945,
    includesTaxesAndFees: true,
  },
  {
    id: "2",
    name: "Sunset Beach Resort",
    location: "Miami Beach, Florida",
    amenities: ["Beachfront", "Restaurant", "Spa"],
    fullyRefundable: false,
    reserveNowPayLater: true,
    rating: 8.8,
    reviewCount: 892,
    pricePerNight: 225,
    totalPrice: 1125,
    includesTaxesAndFees: true,
  },
  {
    id: "3",
    name: "City Center Inn",
    location: "Financial District, San Francisco",
    amenities: ["Free Parking", "Business Center"],
    fullyRefundable: true,
    reserveNowPayLater: false,
    rating: 8.5,
    reviewCount: 456,
    pricePerNight: 159,
    totalPrice: 795,
    includesTaxesAndFees: true,
  },
];

export default function HotelCardList() {
  return (
    <div className="flex flex-col gap-4">
      {mockHotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}
