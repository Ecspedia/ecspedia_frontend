'use client';

import { LucideIcon } from 'lucide-react';
import TextFieldIcon from './components/TextFieldIcon';
import TextFieldInput from './components/TextFieldInput';
import TextFieldInputWrapper from './components/TextFieldInputWrapper';
import TextFieldLabel from './components/TextFieldLabel';
import TextFieldRoot from './components/TextFieldRoot';

interface TextFieldProps {
    onClick?: () => void;
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    icon?: LucideIcon;
}

function TextField({
    onClick,
    value,
    onChange,
    readOnly = false,
    className,
    placeholder,
    icon,
}: TextFieldProps) {
    return (
        <TextField.Root
            onClick={onClick}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={className}
        >
            {icon && <TextFieldIcon icon={icon} />}
            <TextFieldInputWrapper>
                <TextFieldLabel>{placeholder}</TextFieldLabel>
                <TextFieldInput />
            </TextFieldInputWrapper>
        </TextField.Root>
    );
}

// Attach compound components
TextField.Root = TextFieldRoot;
TextField.Icon = TextFieldIcon;
TextField.Label = TextFieldLabel;
TextField.Input = TextFieldInput;
TextField.InputWrapper = TextFieldInputWrapper;

export default TextField;

