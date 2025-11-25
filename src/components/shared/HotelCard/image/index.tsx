import { cn } from '@/utils/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useHotelCardContext } from '../hooks/useHotelCardContext';
import { useHotelImage } from '../hooks/useHotelImage.hook';
import { VARIANT_CONFIG } from '../utils/variantConfig';
import type { HotelCardVariant } from '../utils/variantConfig';

interface HotelCardImageProps {
  className?: string;
}

export default function HotelCardImage({ className }: HotelCardImageProps) {
  const { hotel, variant: cardVariant = 'search-result' } = useHotelCardContext();
  const { imageSrc, isLoading, handleImageLoad, handleImageError } = useHotelImage(hotel);
  const [isLiked, setIsLiked] = useState(false);

  const config = VARIANT_CONFIG[cardVariant as HotelCardVariant];
  const sizeClasses = cn('aspect-[4/3]', config.imageSizeClass);
  const roundingClasses = config.imageRoundingClass;
  const showLikeButton = cardVariant === 'search-result';

  const getSizes = () => {
    if (cardVariant === 'booking-compact') return '192px';
    if (cardVariant === 'vertical-card') return '280px';
    if (cardVariant === 'search-result' || cardVariant === 'detail-modal') {
      return '(max-width: 1024px) 100vw, 256px';
    }
    return '256px';
  };

  return (
    <div className={cn('group relative shrink-0 overflow-hidden', sizeClasses, roundingClasses, className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted transition-opacity duration-200">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      <Image
        src={imageSrc}
        alt={hotel.name}
        fill
        sizes={getSizes()}
        className={`object-cover transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {showLikeButton && (
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
