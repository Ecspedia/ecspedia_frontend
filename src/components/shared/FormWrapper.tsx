import { forwardRef } from 'react';

interface FormWrapperProps {
  children: React.ReactNode;
  errors?: string | undefined;
}

const FormWrapper = forwardRef<HTMLDivElement, FormWrapperProps>(({ children, errors }, ref) => {
  return (
    <div ref={ref} className="flex flex-col gap-1">
      {children}
      <p className="text-sm text-error">{errors}</p>
    </div>
  );
});

FormWrapper.displayName = 'FormWrapper';

export default FormWrapper;

