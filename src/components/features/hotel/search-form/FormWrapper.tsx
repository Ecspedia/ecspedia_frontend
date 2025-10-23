interface FormWrapperProps {
  children: React.ReactNode;
  errors: string | undefined;
}

export default function FormWrapper({ children, errors }: FormWrapperProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <p className="text-sm text-red-500">{errors}</p>
    </div>
  );
}
