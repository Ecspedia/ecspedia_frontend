import { Check } from 'lucide-react';
import { useHotelCardContext } from './utils';

export default function HotelPricing() {
  const { hotel } = useHotelCardContext();
  return (
    <div className="flex flex-col items-end justify-between">
      <div className="text-right">
        <div className="text-primary mt-1 text-lg font-semibold">
          ${hotel.pricePerNight}{' '}
          <span className="text-primary/60 text-sm font-normal">Per night</span>
        </div>
      </div>

      {hotel.includesTaxesAndFees && (
        <div className="text-primary/60 flex items-center gap-1 text-sm">
          <Check className="h-4 w-4 text-green-600" />
          <span>Total includes taxes and fees</span>
        </div>
      )}
    </div>
  );
}
