'use client';

import { useFullscreenPopup } from '@/components/shared/ExpandableTextField/FullscreenPopupContext';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FullscreenPage() {
    const { popup, setPopup } = useFullscreenPopup();
    const router = useRouter();

    useEffect(() => {
        if (!popup) {
            router.back();
        }
    }, [popup, router]);

    const handleClose = () => {
        setPopup(null);
    };

    if (!popup) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-background">
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                    <h1 className="text-lg font-semibold">Select</h1>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-2 hover:bg-accent"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 relative">
                    {popup}
                </div>
            </div>
        </div>
    );
}