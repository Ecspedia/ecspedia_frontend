import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useHotelCardContext } from '@/features/hotel/hooks';
import { useHotelImage } from '@/features/hotel/hooks/useHotelImage.hook';
import { cn } from '@/utils/utils';

interface HotelCardImageProps {
  variant?: 'default' | 'compact' | 'expanded';
}

export default function HotelCardImage({ variant = 'default' }: HotelCardImageProps) {
  const { hotel } = useHotelCardContext();
  const { imageSrc, isExternalImage, isLoading, handleImageLoad, handleImageError } = useHotelImage(hotel);

  const sizeClasses = cn(
    variant !== 'expanded' && 'aspect-[4/3]',
    variant === 'compact' && 'w-48',
    variant === 'default' && 'w-64',
    variant === 'expanded' && 'w-full h-48'
  );

  return (
    <div className={cn('group relative shrink-0 overflow-hidden rounded-lg', sizeClasses)}>
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
