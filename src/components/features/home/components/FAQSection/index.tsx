"use client";

// FAQSection — sección FAQ de la home. El acordeón vive en el componente
// compartido FaqAccordion (respuestas siempre en el DOM SSR).

import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/LanguageProvider';
import { FaqAccordion } from '@/components/shared/ui/FaqAccordion';

interface FAQSectionProps {
    isDark: boolean;
}

export default function FAQSection({ isDark }: FAQSectionProps) {
    const { t } = useLanguage();

    return (
        <section
            id="faq"
            className={cn(
                'relative py-20 md:py-24 transition-colors duration-300',
                isDark ? 'bg-neutral-950' : 'bg-[#fafaf9]'
            )}
        >
            <div className="max-w-3xl mx-auto px-6 sm:px-14">
                <p
                    className={cn(
                        'text-[10px] font-mono uppercase tracking-[0.3em] mb-5',
                        isDark ? 'text-[rgba(200,123,191,0.9)]' : 'text-[rgba(138,60,134,0.9)]'
                    )}
                >
                    {t.faq.badge}
                </p>
                <h2
                    className={cn(
                        'text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.03em] mb-4',
                        isDark ? 'text-white' : 'text-neutral-900'
                    )}
                >
                    {t.faq.title}{' '}
                    <span className="gradient-text">{t.faq.titleHighlight}</span>
                </h2>
                <p className={cn('text-base font-light mb-12', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
                    {t.faq.subtitle}
                </p>

                <FaqAccordion items={t.faq.items} isDark={isDark} idPrefix="home-faq" />
            </div>
        </section>
    );
}
