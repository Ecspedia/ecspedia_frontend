import { Hotel } from '@/types/hotel';
import { X, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HotelDetailCardProps {
  hotel: Hotel;
  onClose: () => void;
}

export default function HotelDetailCard({ hotel, onClose }: HotelDetailCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push('/map');
  };

  return (
    <div className="border-border fixed right-0 bottom-0 left-0 z-[1000] mx-auto w-2/5 min-w-[500px] rounded-lg border bg-white shadow-2xl">
      <div className="flex gap-4 p-4">
        <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={hotel.image || '/images/home/hotel_mock.avif'}
            alt={hotel.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-primary text-lg font-semibold">{hotel.name}</h3>
              <p className="text-primary/60 mt-1 text-sm">{hotel.location}</p>
            </div>
            <button
              onClick={onClose}
              className="text-primary/60 hover:text-primary flex-shrink-0 rounded-full p-1 transition-colors hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {hotel.rating && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded bg-green-700 px-2 py-1 text-sm font-bold text-white">
                <Star className="h-3 w-3 fill-white" />
                {hotel.rating.toFixed(1)}
              </div>
              <span className="text-primary/60 text-sm">
                {hotel.reviewCount?.toLocaleString() || 0} reviews
              </span>
            </div>
          )}

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="text-primary/60 text-xs">+{hotel.amenities.length - 4} more</span>
              )}
            </div>
          )}

          {(hotel.fullyRefundable || hotel.reserveNowPayLater) && (
            <div className="mt-2 flex gap-3">
              {hotel.fullyRefundable && (
                <span className="text-xs font-medium text-green-700">✓ Fully refundable</span>
              )}
              {hotel.reserveNowPayLater && (
                <span className="text-xs text-green-700">✓ Reserve now, pay later</span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end justify-between border-l pl-4">
          <div className="text-right">
            <div className="text-primary text-2xl font-bold">${hotel.pricePerNight}</div>
            <div className="text-primary/60 text-sm">per night</div>
            {hotel.includesTaxesAndFees && (
              <p className="text-primary/60 mt-1 text-xs">Includes taxes & fees</p>
            )}
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2 font-semibold text-white transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
