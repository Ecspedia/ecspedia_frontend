'use client';

import { Button } from '@/components/ui';
import { useDarkMode, useIsMobile } from '@/hooks';
import { Tag } from 'lucide-react';
import Image from 'next/image';

interface PromoBannerProps {
    title?: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}


function PromoIcon({ isDarkMode }: { isDarkMode: boolean }) {
    const iconSrc = isDarkMode ? '/images/home/dark__promo.svg' : '/images/home/light__promo.svg';
    return (
        <div className="shrink-0 w-12 h-12">
            <Image src={iconSrc} alt="Promo" width={48} height={48} />
        </div>
    );
}

interface PromoContentProps {
    title: string;
    description: string;
}

function PromoContent({ title, description, isDarkMode }: PromoContentProps & { isDarkMode: boolean }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1">

                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-primary' : 'text-white'}`}>{title}</h3>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-secondary' : 'text-white/80'}`}>{description}</p>
        </div>
    );
}

interface PromoButtonProps {
    ctaText: string;
    onCtaClick?: () => void;
}

function PromoButton({ ctaText, onCtaClick }: PromoButtonProps) {
    return (
        <Button
            onClick={onCtaClick}
            variant="secondary"
            className="shrink-0 px-6 py-2 gap-2 shadow-sm"
        >
            <Tag className="w-4 h-4" />
            {ctaText}
        </Button>
    );
}

export default function PromoBanner({
    title = 'Thanksgiving Getaways',
    description = 'Uncover the best hotel, flight and package deals.',
    ctaText = 'Shop deals',
    onCtaClick,
}: PromoBannerProps) {
    const isMobile = useIsMobile();
    const { isDarkMode } = useDarkMode();
    return (
        <div className={`relative overflow-hidden py-4 lg:py-6 }`}>

            <div className="relative flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <PromoIcon isDarkMode={isDarkMode ?? false} />
                    <PromoContent title={title} description={description} isDarkMode={isDarkMode ?? false} />
                </div>
                {!isMobile && (
                    <PromoButton ctaText={ctaText} onCtaClick={onCtaClick} />
                )}
            </div>
        </div>
    );
}