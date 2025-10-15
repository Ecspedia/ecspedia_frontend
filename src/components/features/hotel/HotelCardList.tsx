import HotelCard from './HotelCard';
import { Hotel } from '@/types/hotel';
import { Spinner } from '@/components/ui';

interface HotelCardListProps {
  hotels: Hotel[];
  loading?: boolean;
  error?: string | null;
}

export default function HotelCardList(hotelCardListProps: HotelCardListProps) {
  const { hotels, loading = false, error } = hotelCardListProps;
  if (error && error.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <p className="text-lg font-semibold">An error occurred</p>
          <p className="mt-2 text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Spinner size="lg" />
        <p className="text-gray-500">Loading hotels...</p>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-gray-500">No hotels found. Try searching for a location.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
