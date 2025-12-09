import { X } from "lucide-react";
import { Button } from "../..";

interface TextFieldUnselectProps {
    onClick?: () => void;
}

export default function TextFieldUnselect({ onClick }: TextFieldUnselectProps) {
    return (
        <Button variant="blank" className="cursor-pointer z-10" onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}>
            <X className="w-5 h-full" />
        </Button>
    );
}