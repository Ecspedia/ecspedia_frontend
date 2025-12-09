'use client';

import { TextField } from '@/components/ui';
import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { useFullscreenPopup } from './FullscreenPopupContext';

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

    // Optional unselected value
    unselectedValue?: () => void;
}

/**
 * Generic ExpandableTextField component that provides a consistent pattern
 *
 * Used by: DateRangeTextField, GuestTextField, LocationTextField, SearchTextField
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
    popupClassName,
    unselectedValue,
}: ExpandableTextFieldProps) {
    const isMobile = useIsMobile();
    const { setPopup } = useFullscreenPopup();

    const handleClick = () => {
        if (isMobile) {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            setPopup(popup);
        } else {
            onOpen();
        }
    };



    return (
        <div className={`relative ${wrapperClassName}`}>
            {isOpen && !isMobile && (
                <div className={cn('absolute -top-1 left-0 z-50 min-w-full', popupClassName)}>
                    {popup}
                </div>
            )}
            <TextField.Root
                value={value}
                onChange={() => { }}
                onClick={handleClick}
                readOnly={readOnly}
            >
                {icon && <TextField.Icon icon={icon} />}

                <TextField.InputWrapper>
                    <TextField.Label>{placeholder}</TextField.Label>
                    <TextField.Input />
                </TextField.InputWrapper>
                {unselectedValue && (
                    <TextField.Unselect onClick={unselectedValue}></TextField.Unselect>
                )}
            </TextField.Root>
        </div>
    );
}

