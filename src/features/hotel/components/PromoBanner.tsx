'use client';

import { Button } from '@/components/ui';
import { Gift, Sparkles, Tag } from 'lucide-react';

interface PromoBannerProps {
    title?: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

export default function PromoBanner({
    title = "Thanksgiving Getaways",
    description = "Uncover the best hotel, flight and package deals.",
    ctaText = "Shop deals",
    onCtaClick
}: PromoBannerProps) {
    return (
        <section className="mt-4 relative overflow-hidden">
            <div className="bg-linear-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 rounded-lg border border-border-subtle p-6 relative">
                {/* Decorative blur elements - subtle for both modes */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-primary/5 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className="relative flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {/* Icon - uses semantic colors */}
                        <div className="shrink-0 w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center ring-1 ring-brand-secondary/20">
                            <Gift className="w-6 h-6 text-brand-secondary" />
                        </div>

                        {/* Text content */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles className="w-4 h-4 text-brand-secondary" />
                                <h3 className="text-lg font-semibold text-primary">
                                    {title}
                                </h3>
                            </div>
                            <p className="text-sm text-secondary">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* CTA Button - uses semantic colors */}
                    <Button
                        onClick={onCtaClick}
                        variant="secondary"
                        className="shrink-0  px-6 py-2 gap-2 shadow-sm"
                    >
                        <Tag className="w-4 h-4" />
                        {ctaText}
                    </Button>
                </div>
            </div>
        </section>
    );
}