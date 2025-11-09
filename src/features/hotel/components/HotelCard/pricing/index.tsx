import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';
import { useHotelCardContext } from '../../../hooks';

// HotelCardAvailability - Shows availability status
export function HotelCardAvailability() {
    const { hotel } = useHotelCardContext();
    const isAvailable = hotel.isAvailable ?? true;

    return (
        <div className="text-secondary flex items-center gap-1 text-sm">
            {isAvailable && (
                <div className="text-success flex items-center gap-1 text-sm">
                    <Check className="text-success h-4 w-4" />
                    <span>Available</span>
                </div>
            )}
        </div>
    );
}

// HotelCardPricing - Displays price with currency
interface HotelCardPricingProps {
    variant?: 'default' | 'larger';
}

export function HotelCardPricing({ variant = 'default' }: HotelCardPricingProps) {
    const { hotel } = useHotelCardContext();
    const textPriceFontSize = cn(variant === 'larger' ? 'text-2xl' : 'text-lg ');
    const textLabelFontSize = cn(variant === 'larger' ? 'text-base' : 'text-sm ');

    // Use pricePerNight with currency
    const price = hotel.pricePerNight || 0;
    const currencySymbol = '$';

    return (
        <div className="flex flex-col items-end justify-between">
            <div className="text-right">
                <div className={cn('text-primary mt-1 font-semibold', textPriceFontSize)}>
                    {currencySymbol}{price.toFixed(2)}{' '}
                    <span className={cn('text-secondary text-sm font-normal', textLabelFontSize)}>
                        Per night
                    </span>
                </div>
            </div>

        </div>
    );
}

