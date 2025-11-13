import { Hotel } from '@/types/api';

import HotelCardImage from './image';
import HotelCardInfo from './info';
import { HotelCardContent, HotelCardCard } from './layout';
import {
    HotelCardRating,
    HotelCardRatingNumber,
    HotelCardGroup,
    HotelCardRatingLabel,
    HotelCardReviewCount,
} from './rating';
import { HotelCardPricing, HotelCardAvailability } from './pricing';
import { HotelCardBookButton, HotelCardDetailsButton } from './actions';
import { HotelCardContext } from './hotelCardContext';

interface HotelCardProps {
    hotel: Hotel;
    onBookClick?: () => void;
}

// Main HotelCard Component
function HotelCard({ hotel, onBookClick }: HotelCardProps) {
    return (
        <HotelCardContext.Provider value={{ hotel }}>
            <HotelCard.Card>
                <HotelCard.Image />
                <HotelCard.Content>
                    <HotelCard.Info />
                    <HotelCard.Rating>
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </HotelCard.Rating>
                </HotelCard.Content>
                <div className="flex flex-col items-end justify-between">
                    <HotelCard.Pricing />
                    <HotelCard.BookButton onBook={onBookClick} />
                </div>
            </HotelCard.Card>
        </HotelCardContext.Provider>
    );
}

// Attach all sub-components for dot notation access
HotelCard.Image = HotelCardImage;
HotelCard.Info = HotelCardInfo;
// Info sub-components are already attached to HotelCardInfo, accessible via HotelCard.Info.Title, etc.
HotelCard.Rating = HotelCardRating;
HotelCard.RatingNumber = HotelCardRatingNumber;
HotelCard.Group = HotelCardGroup;
HotelCard.RatingLabel = HotelCardRatingLabel;
HotelCard.ReviewCount = HotelCardReviewCount;
HotelCard.Pricing = HotelCardPricing;
HotelCard.Availability = HotelCardAvailability;
HotelCard.BookButton = HotelCardBookButton;
HotelCard.DetailsButton = HotelCardDetailsButton;
HotelCard.Card = HotelCardCard;
HotelCard.Content = HotelCardContent;

export default HotelCard;
