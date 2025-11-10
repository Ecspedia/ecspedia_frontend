export { default } from './HotelCard';

// Export sub-components grouped by category
export { default as HotelCardImage } from './image';
export { default as HotelCardInfo } from './info';
export { HotelCardPricing, HotelCardAvailability } from './pricing';
export {
  HotelCardRating,
  HotelCardRatingNumber,
  HotelCardGroup,
  HotelCardRatingLabel,
  HotelCardReviewCount,
} from './rating';
export { HotelCardBookButton, HotelCardDetailsButton } from './actions';
export { HotelCardCard, HotelCardContent } from './layout';
