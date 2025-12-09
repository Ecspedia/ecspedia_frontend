'use client';

import { Button } from '@/components/ui';
import useIsDesktop from '@/hooks/useIsDesktop.hook';
import { Tag } from 'lucide-react';
import Image from 'next/image';

interface PromoBannerProps {
    title?: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}


function PromoIcon() {
    return (

        <>
            <Image
                src="/images/home/light__promo.svg"
                alt="Promo"
                width={48}
                height={48}
                className="block dark:hidden"
            />
            <Image
                src="/images/home/dark__promo.svg"
                alt="Promo"
                width={48}
                height={48}
                className="hidden dark:block"
            />
        </>
    );
}

interface PromoContentProps {
    title: string;
    description: string;
}

function PromoContent({ title, description }: PromoContentProps) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-xl font-semibold text-white`}>{title}</h3>
            </div>
            <p className={`text-sm text-white/80`}>{description}</p>
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
    const isDesktop = useIsDesktop();
    return (
        <div className={`relative overflow-hidden py-4 lg:py-6 }`}>
            <div className="relative flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <PromoIcon />
                    <PromoContent title={title} description={description} />
                </div>
                {isDesktop && (
                    <PromoButton ctaText={ctaText} onCtaClick={onCtaClick} />
                )}
            </div>
        </div>
    );
}
