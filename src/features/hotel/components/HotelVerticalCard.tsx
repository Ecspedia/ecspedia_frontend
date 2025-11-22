import HotelCard from '@/components/shared/HotelCard';
import type { Hotel } from '@/types/graphql';

interface HotelVerticalCardProps {
    hotel: Hotel;
}

export default function HotelVerticalCard({ hotel }: HotelVerticalCardProps) {
    return (
        <HotelCard.Root hotel={hotel}>
            <HotelCard.Card className='border-border flex flex-col gap-2 lg:gap-0 rounded-lg border max-w-sm min-h-100 bg-background'>
                <HotelCard.Image />
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
                    <div className="">
                        <HotelCard.Info.Title />
                        <HotelCard.Info.Location />
                    </div>
                </HotelCard.Content>
                <div className="flex items-center justify-between px-2 pb-2">
                    <HotelCard.Pricing />
                </div>
            </HotelCard.Card>
        </HotelCard.Root>
    );
}