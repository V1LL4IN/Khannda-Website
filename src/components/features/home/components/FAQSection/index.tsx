"use client";

// FAQSection — sección FAQ de la home. El acordeón vive en el componente
// compartido FaqAccordion (respuestas siempre en el DOM SSR). El orden de
// t.faq.items está congelado: solutionsFaq() indexa items[2]/items[3].

import React from 'react';
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
            className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10 scroll-mt-16"
        >
            <div className="max-w-3xl mx-auto py-20 md:py-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
                    08 — {t.faq.badge}
                </p>
                <h2 className="font-display font-extralight uppercase text-h2 mb-4">
                    {t.faq.title} {t.faq.titleHighlight}
                </h2>
                <p className="text-lead font-light text-muted-foreground mb-12">
                    {t.faq.subtitle}
                </p>

                <FaqAccordion items={t.faq.items} isDark={isDark} idPrefix="home-faq" />
            </div>
        </section>
    );
}
