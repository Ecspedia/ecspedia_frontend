'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <div className="w-full mb-8">
            {/* Steps circles and connecting lines */}
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={step.id} className="flex items-center flex-1 last:flex-none">
                            <div
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                                    isCompleted && 'bg-brand-primary text-white',
                                    isCurrent && 'bg-brand-primary text-white ring-4 ring-brand-primary/20',
                                    !isCompleted && !isCurrent && 'bg-surface-raised text-secondary border border-border'
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    step.id
                                )}
                            </div>
                            {!isLast && (
                                <div
                                    className={cn(
                                        'flex-1 h-1 mx-4 rounded transition-all duration-300',
                                        isCompleted ? 'bg-brand-primary' : 'bg-border'
                                    )}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            {/* Step labels */}
            <div className="flex justify-between mt-2">
                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <div key={step.id} className="text-center flex-1">
                            <p
                                className={cn(
                                    'text-sm font-medium',
                                    isCurrent || isCompleted ? 'text-primary' : 'text-secondary'
                                )}
                            >
                                {step.title}
                            </p>
                            <p className="text-xs text-muted hidden sm:block">{step.description}</p>
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
