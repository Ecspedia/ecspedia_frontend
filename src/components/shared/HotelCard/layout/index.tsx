import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { useHotelCardContext } from '../hooks/useHotelCardContext';
import { VARIANT_CONFIG } from '../utils/variantConfig';
import type { HotelCardVariant } from '../utils/variantConfig';

// HotelCardCard - Main card container
interface HotelCardCardProps {
  children: ReactNode;
  className?: string;
}

export function HotelCardCard({ children, className }: HotelCardCardProps) {
  const { variant = 'search-result', layout } = useHotelCardContext();

  const getLayoutClass = () => {
    if (layout === 'horizontal') return 'flex-row';
    if (layout === 'vertical') return 'flex-col';

    const config = VARIANT_CONFIG[variant as HotelCardVariant];
    if (config.layout === 'responsive') return 'flex-col lg:flex-row';
    if (config.layout === 'vertical') return 'flex-col';
    if (config.layout === 'horizontal') return 'flex-row';

    return 'flex-col lg:flex-row';
  };

  const getGapClass = () => {
    if (variant === 'booking-compact') return 'gap-4';
    if (variant === 'vertical-card') return 'gap-0';
    if (variant === 'search-result' || variant === 'detail-modal') return 'gap-0 lg:gap-4';
    return 'gap-4';
  };

  const getVariantClass = () => {
    if (variant === 'vertical-card') return 'max-w-sm min-h-100';
    return '';
  };

  const baseClasses = 'border-border flex rounded-lg border bg-background overflow-hidden';

  return (
    <div className={cn(
      baseClasses,
      getLayoutClass(),
      getGapClass(),
      getVariantClass(),
      className
    )}>
      {children}
    </div>
  );
}

// HotelCardContent - Content wrapper
interface HotelCardContentProps {
  children: ReactNode;
  className?: string;
}

export function HotelCardContent({ children, className }: HotelCardContentProps) {
  return <div className={cn('flex-1 flex flex-col px-3 lg:px-2', className)}>{children}</div>;
}
