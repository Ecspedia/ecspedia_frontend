import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useHotelCardContext, } from '../../../hooks';
import { useHotelImage } from '@/features/hotel/hooks/useHotelImage.hook';

interface HotelCardImageProps {
  variant?: 'default' | 'compact';
}

export default function HotelCardImage({ variant = 'default' }: HotelCardImageProps) {
  const { hotel } = useHotelCardContext();
  const { imageSrc, isExternalImage, isLoading, handleImageLoad, handleImageError } = useHotelImage(hotel);
  const sizeClasses = variant === 'compact' ? 'aspect-[4/3] w-48' : 'aspect-[4/3]  w-64';

  return (
    <div className={`group relative ${sizeClasses} shrink-0 overflow-hidden rounded-lg`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      <Image
        src={imageSrc}
        alt={hotel.name}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        unoptimized={isExternalImage}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {variant === 'default' && (
        <button className="absolute top-3 right-3 rounded-full bg-white p-2 transition-transform hover:scale-110">
          <Heart className="text-secondary h-5 w-5" />
        </button>
      )}
    </div>
  );
}

