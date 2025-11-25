import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { useHotelCardContext } from '../hooks/useHotelCardContext';



interface HotelCardPricingProps {
    className?: string;
    children?: ReactNode;
}

export function HotelCardPricing({ className, children }: HotelCardPricingProps) {
    const { hotel } = useHotelCardContext();
    const price = hotel.pricePerNight || 0;
    const currencySymbol = '$';

    return (
        <div className={cn("flex flex-col items-end ", className)} >
            <div className={cn('text-primary mt-1 font-semibold')}>
                {currencySymbol}{price.toFixed(2)}{' '}
                {children}
            </div>
        </div>
    );
}


export function HotelCardPricingLabel({ className }: { className?: string }) {
    return (
        <span className={cn('text-secondary text-sm font-normal', className)}>
            Per night
        </span>
    );
}