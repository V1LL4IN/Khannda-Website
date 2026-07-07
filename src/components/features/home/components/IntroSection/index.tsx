'use client';

import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { RevealGroup } from '@/components/shared/ui';
import { useHighlightText } from '@/lib/animation/useHighlightText';

// Intro editorial: el párrafo de posicionamiento usa el "highlight text" de
// mosaicist — los caracteres pasan de opacidad 0.25 a 1 scrubbed al scroll
// (el texto se ilumina mientras lees). El texto SSR está a opacidad completa.
interface IntroSectionProps {
    isDark?: boolean;
}

const IntroSection: React.FC<IntroSectionProps> = () => {
    const { t } = useLanguage();
    const bodyRef = useHighlightText<HTMLParagraphElement>();

    return (
        <section className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10">
            <div className="max-w-[1400px] mx-auto py-20 md:py-28">
                <RevealGroup>
                    <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
                        02 — Intro
                    </p>
                    <h2 data-reveal className="font-display font-extralight uppercase text-h2 mb-6 max-w-3xl">
                        {t.intro.title}
                    </h2>
                </RevealGroup>
                <p ref={bodyRef} className="text-lead font-light text-muted-foreground max-w-3xl">
                    {t.intro.body}
                </p>
            </div>
        </section>
    );
};

export default IntroSection;
