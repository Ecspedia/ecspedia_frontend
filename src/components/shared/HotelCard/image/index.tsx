
import { cn } from '@/utils/utils';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useHotelCardContext } from '../hooks/useHotelCardContext';
import { useHotelImage } from '../hooks/useHotelImage.hook';
import { VARIANT_CONFIG } from '../utils/variantConfig';

interface HotelCardImageProps {
  className?: string;
  isLiked?: boolean;
  onLikeToggle?: (hotelId: string) => void;
}

export default function HotelCardImage({
  className,
  isLiked = false,
  onLikeToggle,
}: HotelCardImageProps) {
  const { hotel, variant = 'search-result', isPriority } = useHotelCardContext();
  const { imageSrc, isLoading, handleImageLoad, handleImageError } = useHotelImage(hotel);

  const config = VARIANT_CONFIG[variant];
  const showLikeButton = variant === 'search-result' || variant === 'vertical-card';

  return (
    <div
      className={cn(
        'group relative shrink-0 overflow-hidden aspect-[4/3]',
        config.imageSizeClass,
        config.imageRoundingClass,
        className
      )}
    >
      {isLoading && <ImageLoader />}

      <Image
        src={imageSrc}
        alt={hotel.name}
        fill
        sizes={config.imageSizes}
        className={cn('object-cover transition-opacity duration-200', isLoading ? 'opacity-0' : 'opacity-100')}
        onLoadingComplete={handleImageLoad}
        onError={handleImageError}
        priority={isPriority}
      />

      {showLikeButton && (
        <LikeButton
        />
      )}
    </div>
  );
}

function ImageLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-muted">
      <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}



function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const handleClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <button
      type="button"
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isLiked}
      onClick={handleClick}
      className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <Heart
        className={cn(
          'size-5 transition-colors',
          isLiked ? 'fill-error text-error' : 'text-secondary hover:text-error'
        )}
      />
    </button>
  );
}