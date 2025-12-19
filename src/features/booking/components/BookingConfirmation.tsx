'use client';

import useIsDesktop from '@/hooks/useIsDesktop.hook';
import type { HotelResponseDto } from '@/types/graphql';
import { Bed, Calendar, Mail, MapPin, Phone, User, Users } from 'lucide-react';
import Image from 'next/image';

import { GuestFormData } from '../utils';
import type { RoomType } from './RoomSelection';

interface BookingConfirmationProps {
    hotel: HotelResponseDto;
    selectedRoom: RoomType;
    guestData: GuestFormData;
    startDate: string;
    endDate: string;
    nights: number;
}

export default function BookingConfirmation({
    hotel,
    selectedRoom,
    guestData,
    startDate,
    endDate,
    nights,
}: BookingConfirmationProps) {
    const isDesktop = useIsDesktop();
    const roomPrice = Math.round(selectedRoom.price);
    const subtotal = roomPrice * nights;
    const serviceFee = 0;
    const taxes = 0;
    const total = subtotal + serviceFee + taxes;
    const hotelImage = hotel.mainPhoto || hotel.image;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className=" space-y-4 lg:space-y-6">


            <div className="bg-surface rounded-lg border border-border p-5">
                <h3 className="text-lg font-semibold text-primary mb-3">Hotel</h3>
                <div className="flex gap-4">
                    {hotelImage && (
                        <Image
                            src={hotelImage}
                            alt={hotel.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                    )}
                    <div>
                        <p className="font-semibold text-primary">{hotel.name}</p>
                        <div className="flex items-center gap-1 text-sm text-secondary mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{hotel.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-secondary mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
                        </div>
                    </div>
                </div>
            </div>


            {isDesktop ? (
                <div className="bg-surface rounded-lg border border-border p-5">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-3">Room</h3>
                            <div className="space-y-2">
                                <p className="font-medium text-primary">{selectedRoom.name}</p>
                                <p className="text-sm text-secondary">{selectedRoom.description}</p>
                                <div className="flex gap-4 text-sm text-secondary">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>Up to {selectedRoom.capacity} guests</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bed className="w-4 h-4" />
                                        <span>{selectedRoom.bedType}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-3">Guest Information</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4 text-secondary" />
                                    <span className="text-primary">{guestData.firstName} {guestData.lastName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-secondary" />
                                    <span className="text-primary">{guestData.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-secondary" />
                                    <span className="text-primary">{guestData.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-surface rounded-lg border border-border p-5">
                        <h3 className="text-lg font-semibold text-primary mb-3">Room</h3>
                        <div className="space-y-2">
                            <p className="font-medium text-primary">{selectedRoom.name}</p>
                            <p className="text-sm text-secondary">{selectedRoom.description}</p>
                            <div className="flex gap-4 text-sm text-secondary">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>Up to {selectedRoom.capacity} guests</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bed className="w-4 h-4" />
                                    <span>{selectedRoom.bedType}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface rounded-lg border border-border p-5">
                        <h3 className="text-lg font-semibold text-primary mb-3">Guest Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <User className="w-4 h-4 text-secondary" />
                                <span className="text-primary">{guestData.firstName} {guestData.lastName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-secondary" />
                                <span className="text-primary">{guestData.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm col-span-2">
                                <Phone className="w-4 h-4 text-secondary" />
                                <span className="text-primary">{guestData.phone}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}


            <div className="bg-surface rounded-lg border border-border p-5">
                <h3 className="text-lg font-semibold text-primary mb-3">Payment Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-secondary">
                        <span>${roomPrice} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                        <span>Service fee</span>
                        <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                        <span>Taxes</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border my-2"></div>
                    <div className="flex justify-between text-lg font-bold text-primary">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
