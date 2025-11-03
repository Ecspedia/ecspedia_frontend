import { variants, type ButtonVariant } from "@/constants";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
  variant?: ButtonVariant;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}

export default function Button(buttonProps: ButtonProps) {
  const {
    onClick,
    text,
    className = "",
    variant = "secondary",
    type = "button",
    disabled = false,
  } = buttonProps;

  const buttonVariant = disabled ? "disabled" : variant;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn("rounded-full font-bold text-white", variants[buttonVariant],
        disabled ? "" : "cursor-pointer", className)}
    >
      {text}
    </button>
  );
}
