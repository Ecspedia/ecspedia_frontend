import HotelCard from '@/components/shared/HotelCard';
import type { HotelResponseDto } from '@/types/graphql';

interface BookingDetailsProps {
    hotel: HotelResponseDto;
}

export default function BookingDetails({ hotel }: BookingDetailsProps) {
    return (
        <HotelCard.Root hotel={hotel}>
            <div className="bg-surface rounded-lg border border-border p-6 mb-6">
                <h2 className="text-xl font-semibold text-primary mb-4">Booking Summary</h2>
                <div className="relative">
                    <HotelCard.Image />
                    <div className="absolute top-3 right-3 bg-surface text-primary backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                        <HotelCard.RatingNumber />
                        <HotelCard.Group>
                            <HotelCard.RatingLabel />
                            <HotelCard.ReviewCount />
                        </HotelCard.Group>
                    </div>
                </div>
                <div className="flex gap-2 mt-2">
                    <HotelCard.Content className="justify-between">
                        <div>
                            <HotelCard.Title />
                            <HotelCard.Location />
                            <HotelCard.Description />

                        </div>

                    </HotelCard.Content>
                </div>
            </div >
        </HotelCard.Root>

    );
}

