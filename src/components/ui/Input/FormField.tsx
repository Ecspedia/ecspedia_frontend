import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/utils';
import FormWrapper from '@/components/shared/FormWrapper';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    id: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, id, className, ...props }, ref) => {
        return (
            <FormWrapper errors={error}>
                <label htmlFor={id} className="block text-sm font-medium text-primary mb-2">
                    {label}
                </label>
                <input
                    id={id}
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-2 border border-border rounded-lg',
                        'focus:outline-none focus:ring-2 focus:ring-brand-primary',
                        'bg-background text-primary',
                        className
                    )}
                    {...props}
                />
            </FormWrapper>
        );
    }
);

FormField.displayName = 'FormField';

export default FormField;

