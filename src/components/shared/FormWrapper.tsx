import { forwardRef } from 'react';
import { cn } from '@/utils/utils';

interface FormWrapperProps {
  children: React.ReactNode;
  errors?: string | undefined;
  className?: string;
}

const FormWrapper = forwardRef<HTMLDivElement, FormWrapperProps>(({ children, errors, className }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)}>
      {children}
      <p className="text-sm text-error">{errors}</p>
    </div>
  );
});

FormWrapper.displayName = 'FormWrapper';

export default FormWrapper;

