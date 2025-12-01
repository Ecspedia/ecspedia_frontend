export type HotelCardVariant =
  | 'search-result'
  | 'vertical-card'
  | 'detail-modal'
  | 'booking-compact'
  | 'custom';

export type HotelCardLayout = 'horizontal' | 'vertical' | 'responsive';

export interface VariantConfig {
  layout: HotelCardLayout;
  showBookButton: boolean;
  showPricing: boolean;
  showDescription: boolean;
  showCloseButton?: boolean;
  showDivider?: boolean;
  imageSizeClass: string;
  imageRoundingClass: string;
  imageSizes: string;
}

export const VARIANT_CONFIG: Record<HotelCardVariant, Partial<VariantConfig>> = {
  'search-result': {
    layout: 'responsive',
    showBookButton: true,
    showPricing: true,
    showDescription: true,
    imageSizeClass: 'w-full lg:w-64',
    imageRoundingClass: 'rounded-t-lg lg:rounded-t-none lg:rounded-l-lg',
    imageSizes: '(max-width: 1024px) 100vw, 256px',
  },
  'vertical-card': {
    layout: 'vertical',
    showBookButton: false,
    showPricing: true,
    showDescription: false,
    imageSizeClass: 'w-full',
    imageRoundingClass: 'rounded-t-lg',
    imageSizes: '280px',
  },
  'detail-modal': {
    layout: 'responsive',
    showBookButton: true,
    showPricing: true,
    showDescription: false,
    showCloseButton: true,
    showDivider: true,
    imageSizeClass: 'w-full lg:w-64',
    imageRoundingClass: 'rounded-t-lg lg:rounded-t-none lg:rounded-l-lg',
    imageSizes: '(max-width: 1024px) 100vw, 256px',
  },
  'booking-compact': {
    layout: 'horizontal',
    showBookButton: false,
    showPricing: false,
    showDescription: false,
    imageSizeClass: 'w-48 h-36',
    imageRoundingClass: 'rounded-lg',
    imageSizes: '192px',
  },
  custom: {
    layout: 'responsive',
  },
};
