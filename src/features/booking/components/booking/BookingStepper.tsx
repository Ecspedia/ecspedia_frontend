'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface BookingStep {
    id: number;
    title: string;
    description: string;
}

interface BookingStepperProps {
    steps: BookingStep[];
    currentStep: number;
}

export default function BookingStepper({ steps, currentStep }: BookingStepperProps) {
    return (
        <div className="w-full mb-3">
            <div className="flex items-start">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={step.id} className="flex flex-1 last:flex-none">
                            {/* Step column: circle + label */}
                            <div className="flex flex-col items-center">
                                {/* Circle */}
                                <div
                                    className={cn(
                                        'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0',
                                        isCompleted && 'bg-brand-primary text-white',
                                        isCurrent && 'bg-brand-primary text-white ring-4 ring-brand-primary/20',
                                        !isCompleted && !isCurrent && 'bg-surface-raised text-secondary border border-border'
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                {/* Label - centered under circle */}
                                <div className="mt-2 text-center">
                                    <p
                                        className={cn(
                                            'text-xs sm:text-sm font-medium whitespace-nowrap',
                                            isCurrent || isCompleted ? 'text-primary' : 'text-secondary'
                                        )}
                                    >
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-muted hidden sm:block whitespace-nowrap">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            {/* Connecting line */}
                            {!isLast && (
                                <div className="flex-1 flex items-center px-2 sm:px-4 mt-4 sm:mt-5">
                                    <div
                                        className={cn(
                                            'w-full h-0.5 sm:h-1 rounded transition-all duration-300',
                                            isCompleted ? 'bg-brand-primary' : 'bg-border'
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export const BOOKING_STEPS: BookingStep[] = [
    { id: 1, title: 'Select Room', description: 'Choose your room type' },
    { id: 2, title: 'Guest Details', description: 'Enter guest information' },
    { id: 3, title: 'Confirm', description: 'Review and confirm' },
];
