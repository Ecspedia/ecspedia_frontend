'use client';

import { Button } from '@/components/ui';
import { ArrowLeft, X } from 'lucide-react';

interface BookingHeaderProps {
    title: string;
    description: string;
    onBack: () => void;
}

export default function BookingHeader({ title, description, onBack }: BookingHeaderProps) {



    return (
        <div className="my-4">
            <div className="flex items-center justify-between mb-2 ">
                <div className="w-6 h-6 hidden lg:block"></div>
                <h1 className="text-3xl font-bold text-primary">{title}</h1>
                <X className="w-6 h-6 cursor-pointer" onClick={onBack} />

            </div>
            <p className="text-secondary">{description}</p>
        </div>
    );
}



const _BackButton = ({ onBack }: { onBack: () => void }) => <Button
    onClick={onBack}
    variant="blank"
    className="hidden absolute left-0 lg:inline-flex items-center gap-2 bg-surface-raised hover:bg-surface border border-border rounded-full px-4 py-2 text-primary transition-all font-medium group"
>
    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
    Back to results
</Button>
