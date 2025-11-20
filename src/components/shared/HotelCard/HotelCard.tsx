

import { Hotel } from '@/types/graphql';
import { HotelCardBookButton, HotelCardDetailsButton } from './actions';
import HotelCardImage from './image';
import HotelCardInfo from './info';
import { HotelCardCard, HotelCardContent } from './layout';
import { HotelCardAvailability, HotelCardPricing } from './pricing';
import {
    HotelCardGroup,
    HotelCardRating,
    HotelCardRatingLabel,
    HotelCardRatingNumber,
    HotelCardReviewCount,
} from './rating';
import HotelCardRoot from './root';

interface HotelCardProps {
    hotel: Hotel;
    onBookClick?: () => void;
}

// Main HotelCard Component
function HotelCard({ hotel, onBookClick }: HotelCardProps) {
    return (
        <HotelCard.Root hotel={hotel}>
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
        </HotelCard.Root>
    );
}


HotelCard.Root = HotelCardRoot;
HotelCard.Image = HotelCardImage;
HotelCard.Info = HotelCardInfo;

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
