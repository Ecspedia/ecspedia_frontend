'use client';

import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

interface BookingNavigationProps {
    currentStep: number;
    canProceed: boolean;
    isCreatingBooking: boolean;
    hasUser: boolean;
    onBack: () => void;
    onNext: () => void;
    onConfirm: () => void;
}

export default function BookingNavigation({
    currentStep,
    canProceed,
    isCreatingBooking,
    hasUser,
    onBack,
    onNext,
    onConfirm,
}: BookingNavigationProps) {
    return (
        <div className="flex gap-4">
            <Button
                onClick={onBack}
                variant="blank"
                className="rounded-full flex-1 bg-surface border border-border text-primary hover:bg-surface-raised/80 px-6 py-3 font-medium"
            >
                {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>

            {currentStep < 3 ? (
                <Button
                    onClick={onNext}
                    variant="secondary"
                    className="flex-1 px-6 py-3 font-medium"
                    disabled={!canProceed}
                >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            ) : (
                <Button
                    onClick={onConfirm}
                    variant="secondary"
                    className="flex-1 px-6 py-3 font-medium"
                    disabled={!hasUser || isCreatingBooking}
                >
                    {isCreatingBooking ? 'Creating Booking...' : 'Confirm Booking'}
                </Button>
            )}
        </div>
    );
}
