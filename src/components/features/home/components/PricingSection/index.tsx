"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import { PricingCard } from './PricingCard';
import { PricingPlan, PricingSectionProps } from './PricingSection.types';
import { useLanguage } from '@/providers/LanguageProvider';

export const PricingSection: React.FC<PricingSectionProps> = ({ isDark }) => {
    const { t, language } = useLanguage();

    // Fallback data if translation is missing or loading
    const plans: PricingPlan[] = [
        {
            name: t.pricing.plans.essential.name,
            tier: "Essential", // This might need a translation key if 'tier' is not in the object, but based on es.ts it seems 'tier' is only in enterprise. Let's infer or use defaults.
            description: t.pricing.plans.essential.description,
            features: t.pricing.plans.essential.features,
            highlight: false,
        },
        {
            name: t.pricing.plans.enterprise.name,
            tier: t.pricing.plans.enterprise.tier || "Enterprise",
            description: t.pricing.plans.enterprise.description,
            features: t.pricing.plans.enterprise.features,
            highlight: true,
        }
    ];

    return (
        <section className={cn(
            "py-16 px-6 relative transition-colors duration-300",
            isDark ? "bg-neutral-950" : "bg-neutral-50"
        )}>
            {/* Background Grid - consistent with other sections */}
            <div className={cn(
                "absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]",
                isDark
                    ? "bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]"
                    : "bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]"
            )} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">

                    <h2 className={cn(
                        "text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 transition-colors",
                        isDark ? "text-white" : "text-black"
                    )}>
                        {t.pricing.title} <span className="gradient-text font-bold">{t.pricing.titleHighlight}</span>
                    </h2>
                    <p className={cn(
                        "text-lg max-w-2xl mx-auto font-light leading-relaxed transition-colors",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                        {t.pricing.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>

                {/* Nota indexable + cross-link a /contacto */}
                <p className={cn(
                    "text-sm max-w-2xl mx-auto font-light leading-relaxed text-center mt-16 pt-10 border-t transition-colors",
                    isDark ? "text-neutral-500 border-white/10" : "text-neutral-500 border-black/10"
                )}>
                    {t.pricing.seoNote}{' '}
                    <a
                        href={`${language === 'en' ? '/en' : ''}/contacto`}
                        className={cn(
                            'border-b pb-0.5 transition-colors',
                            isDark
                                ? 'text-purple-300/80 border-purple-300/30 hover:text-purple-200'
                                : 'text-purple-700 border-purple-300 hover:text-purple-900'
                        )}
                    >
                        {t.pricing.seoLink}
                    </a>
                </p>
            </div>
        </section>
    );
};

export default PricingSection;
