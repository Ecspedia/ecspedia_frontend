'use client';

import { ReactNode } from 'react';
import { TextField } from '@/components/ui';
import { LucideIcon } from 'lucide-react';

interface ExpandableTextFieldProps {
    // TextField props
    value: string;
    placeholder?: string;
    icon?: LucideIcon;
    readOnly?: boolean;

    // Expandable behavior
    isOpen: boolean;
    onOpen: () => void;

    // Popup content shown when isOpen is true
    popup: ReactNode;

    // Optional wrapper className
    wrapperClassName?: string;
    popupClassName?: string;
}

/**
 * Generic ExpandableTextField component that provides a consistent pattern
 * for TextField components with expandable content (dropdown, calendar, etc.)
 * 
 * Used by: DateRangeTextField, GuestTextField, LocationTextField
 */
export default function ExpandableTextField({
    value,
    placeholder,
    icon,
    readOnly = false,
    isOpen,
    onOpen,
    popup,
    wrapperClassName = '',
    popupClassName = 'absolute -top-1 left-0 z-50',
}: ExpandableTextFieldProps) {
    return (
        <div className={`relative ${wrapperClassName}`}>
            {isOpen && (
                <div className={popupClassName}>
                    {popup}
                </div>
            )}
            <TextField
                value={value}
                onChange={() => { }}
                onClick={onOpen}
                readOnly={readOnly}
            >
                {icon && <TextField.Icon icon={icon} />}
                <TextField.InputWrapper>
                    <TextField.Label>{placeholder}</TextField.Label>
                    <TextField.Input />
                </TextField.InputWrapper>
            </TextField>
        </div>
    );
}

