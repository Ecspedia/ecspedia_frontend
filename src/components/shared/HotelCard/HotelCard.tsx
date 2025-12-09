'use client';

import { HotelResponseDto } from '@/types/graphql';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { HotelCardAskButton, HotelCardBookButton } from './actions';
import HotelCardImage from './image';
import { HotelCardCloseButton, HotelCardDescription, HotelCardLocation, HotelCardTitle } from './info';
import { HotelCardCard, HotelCardContent } from './layout';
import { HotelCardPricing, HotelCardPricingLabel } from './pricing';
import {
    HotelCardGroup,
    HotelCardRating,
    HotelCardRatingLabel,
    HotelCardRatingNumber,
    HotelCardReviewCount,
} from './rating';
import HotelCardRoot from './root';
import type { HotelCardLayout, HotelCardVariant } from './utils/variantConfig';

interface HotelCardProps {
    hotel: HotelResponseDto;
    variant?: HotelCardVariant;
    layout?: HotelCardLayout;
    onBookClick?: () => void;
    isSelected?: boolean;
    onClose?: () => void;
    className?: string;
    children?: ReactNode;
    priority?: boolean;
}

// Internal variant compositions
function SearchResultVariant({ onBookClick, className }: { onBookClick?: () => void; onAskAboutHotel?: () => void; className?: string }) {


    return (
        <HotelCard.Card className={className}>
            <HotelCard.Image className="lg:rounded-bl-lg lg:rounded-tr-none" />
            <HotelCard.Content className='gap-1'>
                <div>
                    <div className='flex justify-between'>
                        <div>
                            <HotelCard.Title />
                            <HotelCard.Location />
                        </div>
                        <HotelCard.Pricing className='text-xl lg:text-xl' >
                            <HotelCard.PricingLabel />
                        </HotelCard.Pricing>
                    </div>
                    <HotelCard.Description />
                </div>
                <div className='flex gap-1  pb-2 justify-between'>
                    <div className='flex gap-1'>
                        <div className='self-center'>
                            <HotelCard.RatingNumber />
                        </div>
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </div>

                </div>
                <div className='flex gap-2 justify-end mb-2'>
                    <HotelCard.AskButton />
                    <HotelCard.BookButton className='w-full p-3 lg:w-auto' onBook={onBookClick} />
                </div>

            </HotelCard.Content>
            {/* <div className="flex flex-col gap-2 items-start px-2 pb-4  lg:justify-between lg:flex-col lg:items-end lg:pr-2">
                {!isMobile &&
                    <HotelCard.Pricing className='text-xl lg:text-xl' >
                        <HotelCard.PricingLabel />
                    </HotelCard.Pricing>}
                <div className='flex gap-2 justify-end'>
                    <HotelCard.AskButton />
                    <HotelCard.BookButton className='w-full p-3 lg:w-auto' onBook={onBookClick} />
                </div>

            </div> */}
        </HotelCard.Card>
    );
}

function VerticalCardVariant({ className }: { className?: string }) {
    return (
        <HotelCard.Card className={className}>
            <HotelCard.Image className='aspect-[4/3] w-64' />
            <HotelCard.Content className='lg:gap-1'>
                <div className='flex gap-1 lg:flex lg:gap-2 lg:pt-2 lg:pb-0'>
                    <div className='self-center'>
                        <HotelCard.RatingNumber />
                    </div>
                    <HotelCard.Group>
                        <HotelCard.RatingLabel />
                        <HotelCard.ReviewCount />
                    </HotelCard.Group>
                </div>
                <div>
                    <HotelCard.Title />
                    <HotelCard.Location />
                </div>
            </HotelCard.Content>
            <div className="flex items-center justify-between px-2 pb-2">
                <HotelCard.Pricing />
            </div>
        </HotelCard.Card>
    );
}

function DetailModalVariant({ onClose, className }: { onClose?: () => void; className?: string }) {
    return (
        <div className="border-border bg-background text-primary fixed right-0 bottom-0 left-0 z-1000 mx-auto w-11/12 sm:w-4/5 lg:w-3/5 xl:w-1/2 2xl:w-2/5 max-w-[700px] min-w-[320px] rounded-lg border shadow-2xl">
            <HotelCard.Card className={cn("flex-col lg:flex-row lg:gap-2", className)}>
                <HotelCard.Image className='lg:rounded-bl-lg lg:rounded-tr-none' />
                <div className="flex-1 flex flex-col px-3 lg:px-0 ">
                    <div className="flex items-start gap-2 w-full">
                        <div className="flex flex-col flex-1 min-w-0">
                            <HotelCard.Title />
                            <HotelCard.Description />
                            <HotelCard.Location />
                        </div>
                        {onClose && <HotelCard.CloseButton onClose={onClose} />}
                    </div>
                    <HotelCard.Rating>
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </HotelCard.Rating>
                    <div className='flex justify-between pr-4 pb-2 items-center'>
                        <HotelCard.Pricing className='text-xl lg:text-xl' >
                            <HotelCard.PricingLabel />
                        </HotelCard.Pricing>

                        <HotelCard.BookButton className='w-40' />
                    </div>
                </div>


            </HotelCard.Card>
        </div>
    );
}

function BookingCompactVariant({ className }: { className?: string }) {
    return (
        <div className={cn("flex gap-4", className)}>
            <div className="shrink-0">
                <HotelCard.Image />
            </div>
            <div className="flex-1 min-w-0">
                <HotelCard.Title />
                <HotelCard.Location />
                <HotelCard.Description />
                <HotelCard.Rating>
                    <HotelCard.RatingNumber />
                    <HotelCard.Group>
                        <HotelCard.RatingLabel />
                    </HotelCard.Group>
                </HotelCard.Rating>
            </div>
        </div>
    );
}


function ChatCardVariant({ className: _className }: { className?: string }) {
    return (
        <HotelCard.Card className='min-h-0 gap-1 pb-2'>
            <HotelCard.Image className='h-28 w-full object-cover' />
            <HotelCard.Content className='gap-1 p-2'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </div>
                    <HotelCard.AskButton className='shrink-0' />
                </div>
                <div className='space-y-0.5'>
                    <HotelCard.Title />
                    <HotelCard.Location />
                </div>
                <HotelCard.BookButton className='w-full p-2 mt-1' />
            </HotelCard.Content>

        </HotelCard.Card>
    );
}


// Main HotelCard Component
function HotelCard({
    hotel,
    variant = 'search-result',
    layout,
    onBookClick,
    isSelected,
    onClose,
    className,
    children,
    priority
}: HotelCardProps) {
    return (
        <HotelCard.Root hotel={hotel} variant={variant} layout={layout} isPriority={priority} isSelected={isSelected}>
            {variant === 'search-result' && <SearchResultVariant onBookClick={onBookClick} className={className} />}
            {variant === 'vertical-card' && <VerticalCardVariant className={className} />}
            {variant === 'detail-modal' && <DetailModalVariant onClose={onClose} className={className} />}
            {variant === 'booking-compact' && <BookingCompactVariant className={className} />}
            {variant === 'chat-card' && <ChatCardVariant className={className} />}
            {variant === 'custom' && children}
        </HotelCard.Root>
    );
}


HotelCard.Root = HotelCardRoot;
HotelCard.Image = HotelCardImage;
HotelCard.Rating = HotelCardRating;
HotelCard.RatingNumber = HotelCardRatingNumber;
HotelCard.Group = HotelCardGroup;
HotelCard.RatingLabel = HotelCardRatingLabel;
HotelCard.ReviewCount = HotelCardReviewCount;
HotelCard.Pricing = HotelCardPricing;
HotelCard.PricingLabel = HotelCardPricingLabel;
HotelCard.BookButton = HotelCardBookButton;

HotelCard.Card = HotelCardCard;
HotelCard.Content = HotelCardContent;
HotelCard.Title = HotelCardTitle;
HotelCard.Location = HotelCardLocation;
HotelCard.Description = HotelCardDescription;
HotelCard.CloseButton = HotelCardCloseButton;
HotelCard.AskButton = HotelCardAskButton;
export default HotelCard;
