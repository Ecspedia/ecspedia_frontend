import { cn } from "@/utils/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: 'bg-brand-primary hover:bg-brand-primary-hover text-white',
  secondary: 'bg-brand-secondary hover:bg-brand-secondary-hover text-white',
  alert: 'bg-error hover:bg-error-dark text-white',
  success: 'bg-success hover:bg-success-dark text-white',
  disabled: 'bg-disabled cursor-not-allowed text-secondary',
  blank: '',
};
type ButtonVariant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

function Button(buttonProps: ButtonProps) {
  const {
    text,
    children,
    className = "",
    variant = "secondary",
    type = "button",
    disabled = false,
    ...props
  } = buttonProps;

  const buttonVariant = disabled ? "disabled" : variant;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "rounded-full font-bold text-white flex items-center justify-center gap-2",
        variants[buttonVariant],
        disabled ? "" : "cursor-pointer",
        className
      )}
      {...props}
    >
      {children || text}
    </button>
  );
}

Button.Icon = function ButtonIcon({
  icon: Icon,
  className
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  if (!Icon) return null;
  return <Icon className={cn("h-4 w-4", className)} />;
};

export default Button;


