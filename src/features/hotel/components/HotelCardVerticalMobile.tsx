import HotelCard from '@/components/shared/HotelCard';
import type { Hotel } from '@/types/graphql';

interface HotelCardVerticalMobileProps {
    hotel: Hotel;
}

export default function HotelCardVerticalMobile({ hotel }: HotelCardVerticalMobileProps) {
    return (
        <HotelCard.Root hotel={hotel}>
            <HotelCard.Card className='border-border flex flex-col gap-0 rounded-lg border w-full bg-background overflow-hidden'>
                <HotelCard.Image className='w-full' />
                <HotelCard.Content className='gap-1'>
                    <div className='flex gap-1 pt-2'>
                        <div className='self-center'>
                            <HotelCard.RatingNumber />
                        </div>
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </div>
                    <div>
                        <HotelCard.Info.Title />
                        <HotelCard.Info.Location />
                        <HotelCard.Info.Description />
                    </div>
                </HotelCard.Content>
                <div className="flex items-center justify-between px-2 pb-2">
                    <HotelCard.Pricing />


                </div>
                <div className='px-4 pb-6'>
                    <HotelCard.BookButton className='w-full' />
                </div>
            </HotelCard.Card>
        </HotelCard.Root>
    );
}
