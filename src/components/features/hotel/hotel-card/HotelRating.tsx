import { useHotelCardContext } from './utils';

export default function HotelRating() {
  const { hotel } = useHotelCardContext();
  return (
    <div className="flex-1">
      <div className="mt-3 flex flex-col gap-1">
        {hotel.fullyRefundable && (
          <span className="text-sm font-medium text-green-700">Fully refundable</span>
        )}
        {hotel.reserveNowPayLater && (
          <span className="text-sm text-green-700">Reserve now, pay later</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="rounded bg-green-700 px-2 py-1 text-sm font-bold text-white">
          {hotel.rating?.toFixed(1) || 'N/A'}
        </div>
        <div className="flex flex-col">
          <span className="text-primary text-sm font-semibold">Wonderful</span>
          <span className="text-primary/60 text-xs">
            {hotel.reviewCount?.toLocaleString() || 0} reviews
          </span>
        </div>
      </div>
    </div>
  );
}
