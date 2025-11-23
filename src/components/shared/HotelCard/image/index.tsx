import { cn } from '@/utils/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useHotelCardContext } from '../hooks/useHotelCardContext';
import { useHotelImage } from '../hooks/useHotelImage.hook';

interface HotelCardImageProps {
  variant?: 'default' | 'compact' | 'expanded' | 'mobile';
  className?: string;
}

export default function HotelCardImage({ variant = 'default', className }: HotelCardImageProps) {
  const { hotel } = useHotelCardContext();
  const { imageSrc, isExternalImage, isLoading, hasError: _hasError, handleImageLoad, handleImageError } = useHotelImage(hotel);
  const [isLiked, setIsLiked] = useState(false);

  const sizeClasses = cn(
    variant !== 'expanded' && 'aspect-[4/3]',
    variant === 'compact' && 'w-48',
    variant === 'default' && 'w-64',
    variant === 'expanded' && 'w-full h-48',
    variant === 'mobile' && 'w-full'

  );

  return (
    <div className={cn('group relative shrink-0 overflow-hidden rounded-t-lg rounded-b-none', sizeClasses, className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted transition-opacity duration-200">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      <Image
        src={imageSrc}
        alt={hotel.name}
        fill
        className={`object-cover transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        unoptimized={isExternalImage}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={variant === 'default'} // Prioritize loading for default variant
      />
      {variant === 'default' && (
        <button
          type="button"
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              isLiked ? 'fill-error text-error' : 'text-secondary hover:text-error'
            )}
          />
        </button>
      )}
    </div>
  );
}
