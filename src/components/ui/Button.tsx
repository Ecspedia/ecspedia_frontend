import { variants, type ButtonVariant } from "@/constants/variants";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
  variant?: ButtonVariant;
}

export default function Button(buttonProps: ButtonProps) {
  const { onClick, text, className = "", variant = "secondary" } = buttonProps;

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-full font-bold text-white ${variants[variant]} ${className}`}
    >
      {text}
    </button>
  );
}
