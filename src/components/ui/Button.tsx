interface ButtonProps {
  onClick?: () => void;
  text: string;
}

export default function Button(buttonProps: ButtonProps) {
  const { onClick, text } = buttonProps;

  return (
    <div className="flex py-1">
      <button
        onClick={onClick}
        className="bg-secondary h-full w-24 cursor-pointer rounded-full font-bold text-white"
      >
        {text}
      </button>
    </div>
  );
}
