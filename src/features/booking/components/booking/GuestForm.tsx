'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { guestFormValidationRules, GuestFormData } from '../../utils';
import { FormField } from '@/components/ui';

interface GuestFormProps {
    onSubmit?: (data: GuestFormData) => void;
    onFormChange?: (data: GuestFormData | null, isValid: boolean) => void;
    defaultEmail?: string;
}

export type { GuestFormData };

export default function GuestForm({ onSubmit, onFormChange, defaultEmail }: GuestFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<GuestFormData>({
        mode: 'onBlur',
        defaultValues: {
            email: defaultEmail || '',
            phone: '+1234567890',
        },
    });

    const formValues = watch();

    useEffect(() => {
        if (onFormChange) {
            const hasAllFields = !!(formValues.firstName && formValues.lastName && formValues.email && formValues.phone);
            const hasNoErrors = !errors.firstName && !errors.lastName && !errors.email && !errors.phone;
            const isFormValid = hasAllFields && hasNoErrors;
            onFormChange(isFormValid ? formValues as GuestFormData : null, isFormValid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        formValues.firstName,
        formValues.lastName,
        formValues.email,
        formValues.phone,
        errors.firstName,
        errors.lastName,
        errors.email,
        errors.phone,
        onFormChange,
    ]);

    const onFormSubmit = (data: GuestFormData) => {
        onSubmit?.(data);
    };

    return (
        <div className="bg-surface rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Guest Information</h2>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        id="firstName"
                        label="First Name"
                        type="text"
                        placeholder="John"
                        error={errors.firstName?.message}
                        {...register('firstName', guestFormValidationRules.firstName)}
                    />
                    <FormField
                        id="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        error={errors.lastName?.message}
                        {...register('lastName', guestFormValidationRules.lastName)}
                    />
                </div>
                <FormField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="john.doe@example.com"
                    error={errors.email?.message}
                    {...register('email', guestFormValidationRules.email)}
                />
                <FormField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1234567890"
                    error={errors.phone?.message}
                    {...register('phone', guestFormValidationRules.phone)}
                />
            </form>
        </div>
    );
}
