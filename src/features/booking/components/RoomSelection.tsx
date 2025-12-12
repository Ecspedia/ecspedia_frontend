'use client';

import { cn } from '@/lib/utils';
import { Bath, Bed, Coffee, Users, Wifi } from 'lucide-react';

export interface RoomType {
    id: string;
    name: string;
    description: string;
    capacity: number;
    bedType: string;
    priceMultiplier: number;
    amenities: string[];
}

export const ROOM_TYPES: RoomType[] = [
    {
        id: 'standard',
        name: 'Standard Room',
        description: 'Comfortable room with essential amenities',
        capacity: 2,
        bedType: 'Queen Bed',
        priceMultiplier: 1,
        amenities: ['wifi', 'tv'],
    },
    {
        id: 'deluxe',
        name: 'Deluxe Room',
        description: 'Spacious room with premium amenities and city view',
        capacity: 2,
        bedType: 'King Bed',
        priceMultiplier: 1.3,
        amenities: ['wifi', 'tv', 'minibar', 'bathtub'],
    },
    {
        id: 'suite',
        name: 'Suite',
        description: 'Luxurious suite with separate living area and premium services',
        capacity: 4,
        bedType: '2 Queen Beds',
        priceMultiplier: 1.8,
        amenities: ['wifi', 'tv', 'minibar', 'bathtub', 'balcony'],
    },
];

const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-4 h-4" />,
    minibar: <Coffee className="w-4 h-4" />,
    bathtub: <Bath className="w-4 h-4" />,
};

interface RoomSelectionProps {
    basePrice: number;
    selectedRoom: RoomType | null;
    onSelectRoom: (room: RoomType) => void;
}

export default function RoomSelection({ basePrice, selectedRoom, onSelectRoom }: RoomSelectionProps) {
    return (
        <div className="space-y-4">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">Select Your Room</h2>
                <p className="text-secondary">Choose the room type that best suits your needs</p>
            </div>

            <div className="grid gap-4">
                {ROOM_TYPES.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    const roomPrice = Math.round(basePrice * room.priceMultiplier);

                    return (
                        <button
                            key={room.id}
                            type="button"
                            onClick={() => onSelectRoom(room)}
                            className={cn(
                                'w-full text-left p-5 rounded-lg border-2 transition-all duration-200',
                                isSelected
                                    ? 'border-brand-primary shadow-md bg-brand-secondary'
                                    : 'border-border bg-surface hover:border-brand-secondary hover:shadow-sm'
                            )}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className={cn(
                                        'text-lg font-semibold',
                                        isSelected ? 'text-white' : 'text-primary'
                                    )}>{room.name}</h3>
                                    <p className={cn(
                                        'text-sm mt-1',
                                        isSelected ? 'text-white/80' : 'text-secondary'
                                    )}>{room.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className={cn(
                                        'text-xl font-bold',
                                        isSelected ? 'text-white' : 'text-brand-primary'
                                    )}>${roomPrice}</p>
                                    <p className={cn(
                                        'text-xs',
                                        isSelected ? 'text-white/80' : 'text-secondary'
                                    )}>per night</p>
                                </div>
                            </div>

                            <div className={cn(
                                'flex flex-wrap gap-4 text-sm',
                                isSelected ? 'text-white/90' : 'text-secondary'
                            )}>
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    <span>Up to {room.capacity} guests</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Bed className="w-4 h-4" />
                                    <span>{room.bedType}</span>
                                </div>
                            </div>

                            <div className={cn(
                                'flex gap-2 mt-3 pt-3 border-t',
                                isSelected ? 'border-white/20' : 'border-border'
                            )}>
                                {room.amenities.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className={cn(
                                            'flex items-center gap-1 text-xs px-2 py-1 rounded',
                                            isSelected
                                                ? 'text-white bg-white/20'
                                                : 'text-secondary bg-surface-raised'
                                        )}
                                    >
                                        {amenityIcons[amenity] || null}
                                        <span className="capitalize">{amenity}</span>
                                    </div>
                                ))}
                            </div>

                            {isSelected && (
                                <div className="mt-3 text-sm font-medium text-white">
                                    ✓ Selected
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
