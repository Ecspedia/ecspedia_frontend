import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Hotel } from '@/types/api';
import { useHotelImage } from '@/components/shared/HotelCard/hooks/useHotelImage.hook';
import { cn } from '@/utils/utils';

interface HotelCardFromMyBookingProps {
    hotel: Hotel;
}

export default function HotelCardFromMyBooking({ hotel }: HotelCardFromMyBookingProps) {
    const { imageSrc, isExternalImage, isLoading, handleImageLoad, handleImageError } = useHotelImage(hotel);

    return (
        <div className="flex gap-4">
            <div className="relative shrink-0 w-32 h-24 overflow-hidden rounded-lg">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted transition-opacity duration-200">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    </div>
                )}
                <Image
                    src={imageSrc}
                    alt={hotel.name}
                    fill
                    className={cn(
                        'object-cover transition-opacity duration-200',
                        isLoading ? 'opacity-0' : 'opacity-100'
                    )}
                    unoptimized={isExternalImage}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-primary mb-1">{hotel.name}</h4>
                <div className="flex items-center gap-1 mb-1">
                    <MapPin className="text-secondary h-3 w-3" />
                    <p className="text-secondary text-sm">{hotel.location}</p>
                </div>
                {hotel.rating && (
                    <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 h-4 w-4 fill-yellow-500" />
                        <span className="text-sm text-primary font-medium">{hotel.rating.toFixed(1)}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

