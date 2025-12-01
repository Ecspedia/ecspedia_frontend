'use client';

import { ExpandableTextField } from '@/components/shared/ExpandableTextField';
import { type LucideIcon } from 'lucide-react';
import SearchSelector from './SearchSelector';


interface SearchTextFieldProps<T extends Record<string, unknown>> {
    placeholder: string;
    value: string;
    isOpen: boolean;
    onChange: (value: string) => void;
    onOpen: () => void;
    onClose: () => void;
    icon: LucideIcon;
    suggestList: T[];
    searchField: keyof T;
    titleLabel?: string;
    unselectedValue?: () => void;
}


export default function SearchTextField<T extends Record<string, unknown>>(
    props: SearchTextFieldProps<T>
) {
    const {
        placeholder,
        onChange,
        value,
        isOpen,
        onOpen,
        onClose,
        icon,
        suggestList,
        searchField,
        titleLabel,
        unselectedValue,
    } = props;

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        onClose();
    };

    return (
        <ExpandableTextField
            value={value}
            placeholder={placeholder}
            icon={icon}
            isOpen={isOpen}
            onOpen={onOpen}
            readOnly={false}
            wrapperClassName="w-full"
            popupClassName="absolute -top-1 z-50 w-full"
            unselectedValue={unselectedValue}
            popup={
                <SearchSelector
                    onSelect={handleSelect}
                    placeholder={placeholder}
                    onClose={onClose}
                    suggestList={suggestList}
                    searchField={searchField}
                    titleLabel={titleLabel}

                />
            }
        />
    );
}