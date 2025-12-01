import { X } from "lucide-react";
import { Button } from "../Button";

interface FilterChipProps {
    label: string;
    onRemove: () => void;
}

export default function FilterChip({ label, onRemove }: FilterChipProps) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary">
            <span>{label}</span>
            <Button
                variant="blank"
                className="h-4 w-4 p-0 hover:bg-brand-primary/20"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
            >
                <X className="h-3 w-3" />
            </Button>
        </div>
    );
}