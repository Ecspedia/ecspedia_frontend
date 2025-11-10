import { RegisterOptions } from 'react-hook-form';

export interface GuestFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export const guestFormValidationRules: Record<keyof GuestFormData, RegisterOptions<GuestFormData>> = {
    firstName: {
        required: 'First name is required',
        minLength: {
            value: 2,
            message: 'First name must be at least 2 characters',
        },
        pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: 'First name can only contain letters',
        },
    },

    lastName: {
        required: 'Last name is required',
        minLength: {
            value: 2,
            message: 'Last name must be at least 2 characters',
        },
        pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: 'Last name can only contain letters',
        },
    },

    email: {
        required: 'Email is required',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
        },
    },

    phone: {
        required: 'Phone number is required',
        pattern: {
            value: /^[\d\s\-\+\(\)]+$/,
            message: 'Invalid phone number format',
        },
        minLength: {
            value: 10,
            message: 'Phone number must be at least 10 digits',
        },
    },
};

