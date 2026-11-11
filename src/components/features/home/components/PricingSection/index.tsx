"use client";

// PricingSection — dos modelos de colaboración como composición editorial
// dividida por hairline (sin cards coloreadas, sin precios públicos: cómo se
// cotiza — alcance cerrado tras el diagnóstico — abre la sección como
// entradilla, con el enlace a /contacto).

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PricingSectionProps } from './PricingSection.types';
import { useLanguage } from '@/providers/LanguageProvider';
import {
    RevealGroup,
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking,
} from '@/components/shared/ui';

export const PricingSection: React.FC<PricingSectionProps> = ({ isDark }) => {
    const { t, language } = useLanguage();

    const plans = [
        { ...t.pricing.plans.essential, tier: null as string | null },
        { ...t.pricing.plans.enterprise, tier: t.pricing.plans.enterprise.tier },
    ];

    return (
        <section className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10">
            <div className="max-w-[1400px] mx-auto py-20 md:py-28">
                <RevealGroup>
                    <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
                        06 — {t.pricing.subtitle}
                    </p>
                    <h2 data-reveal className="font-display font-extralight uppercase text-h2 mb-4">
                        {t.pricing.title} {t.pricing.titleHighlight}
                    </h2>
                    <p data-reveal className="text-lead font-light text-muted-foreground max-w-[62ch] mb-14">
                        {t.pricing.lead}{' '}
                        <a
                            href={`${language === 'en' ? '/en' : ''}/contacto`}
                            className="text-accent border-b border-accent/40 pb-0.5 transition-colors hover:border-accent"
                        >
                            {t.pricing.leadLink}
                        </a>
                    </p>
                </RevealGroup>

                <div className="grid md:grid-cols-2 border-t border-b border-border divide-y md:divide-y-0 md:divide-x divide-border">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={cn('py-12 md:py-14', index === 0 ? 'md:pr-12' : 'md:pl-12')}
                        >
                            <RevealGroup delay={index * 0.08}>
                                <div className="flex items-baseline justify-between gap-4 mb-6">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                                        0{index + 1} — {plan.pricing}
                                    </p>
                                    {plan.tier && (
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                                            {plan.tier}
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-display font-light uppercase text-h3 mb-3">
                                    {plan.name}
                                </h3>
                                <p className="text-sm sm:text-base font-light text-muted-foreground mb-2">
                                    {plan.description}
                                </p>
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint mb-8">
                                    {plan.pricingNote}
                                </p>

                                <ul className="mb-10">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-baseline gap-3 border-b border-border py-3.5 text-sm text-muted-foreground"
                                        >
                                            <span className="font-mono text-accent">+</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <ExpandableScreen isDark={isDark} layoutId={`pricing-cta-${index}`}>
                                    <ExpandableScreenTrigger>
                                        <span className="group inline-flex items-center gap-2 text-sm font-medium cursor-pointer text-foreground border-b border-border pb-0.5 transition-colors hover:text-accent hover:border-accent">
                                            {plan.cta}
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                        </span>
                                    </ExpandableScreenTrigger>
                                    <ExpandableScreenContent ariaLabel={plan.cta}>
                                        <CalendarBooking isDark={isDark} />
                                    </ExpandableScreenContent>
                                </ExpandableScreen>
                            </RevealGroup>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
