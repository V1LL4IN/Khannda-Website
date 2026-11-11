'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeroSectionProps } from './HeroSection.types';
import { useLanguage } from '@/providers/LanguageProvider';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
} from '@/components/shared/ui/ExpandableScreen';
import { CalendarBooking } from '@/components/shared/ui/CalendarBooking';
import { useHeroReveal } from '@/lib/animation/useHeroReveal';
import { useRevealGroup } from '@/lib/animation/useRevealGroup';

// Hero tipográfico (Montserrat thin uppercase, lenguaje del wordmark).
// Texto 100% SSR (LCP + keyword "desarrollo de software a medida" contigua);
// al hidratar, el H1 entra con líneas enmascaradas (SplitText mask:'lines')
// y el resto con un reveal group escalonado. Sin JS, todo queda visible.
const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
    const { t } = useLanguage();
    const beforeLines = t.hero.titleBefore.split('\n');

    const h1Ref = useHeroReveal<HTMLHeadingElement>();
    // El contenido secundario espera a que el H1 arranque (delay > stagger de líneas)
    const topRef = useRevealGroup<HTMLDivElement>({ delay: 0.15, start: 'top 100%' });
    const bottomRef = useRevealGroup<HTMLDivElement>({ delay: 0.55, start: 'top 100%' });

    return (
        <section className="relative w-full min-h-[100svh] flex flex-col justify-between bg-background text-foreground transition-colors duration-300 px-6 sm:px-10">
            {/* Índice fantasma — puro artefacto editorial */}
            <span
                aria-hidden="true"
                className="absolute right-[4vw] top-[16vh] font-display font-thin text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--separator-ink)] select-none pointer-events-none"
            >
                N.01
            </span>

            {/* Fila superior: label mono + hairline (clearance del navbar) */}
            <div className="max-w-[1400px] mx-auto w-full pt-24">
                <div
                    ref={topRef}
                    data-reveal-group
                    className="flex items-baseline justify-between gap-6 pb-4 border-b border-border"
                >
                    <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        {t.hero.eyebrow}
                    </p>
                    <p data-reveal className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                        01
                    </p>
                </div>
            </div>

            {/* H1 — LCP, visible desde el primer frame; el reveal corre pre-paint */}
            <div className="max-w-[1400px] mx-auto w-full py-10">
                <h1 ref={h1Ref} className="font-display font-thin uppercase text-display m-0">
                    {beforeLines.map((line, i) => (
                        <span key={i} className={cn('block', i === 1 && 'pl-[6vw]')}>
                            {line}{' '}
                        </span>
                    ))}
                    <span className="block">
                        <span
                            style={{
                                backgroundImage: isDark
                                    ? 'linear-gradient(135deg, #c87bbf, #8a3c86)'
                                    : 'linear-gradient(135deg, #592355, #8a3c86)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {t.hero.titleEmphasis}
                        </span>
                        {t.hero.titleAfter}
                    </span>
                </h1>
            </div>

            {/* Fila inferior: descripción · CTAs · proof */}
            <div
                ref={bottomRef}
                data-reveal-group
                className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end pb-14 pt-6 border-t border-border"
            >
                <p data-reveal className="lg:col-span-5 text-lead font-light text-muted-foreground max-w-[46ch]">
                    {t.hero.description}
                </p>

                <div data-reveal className="lg:col-span-4 flex flex-wrap items-center gap-5 sm:gap-7">
                    <ExpandableScreen isDark={isDark} layoutId="hero-cta-button">
                        <ExpandableScreenTrigger>
                            <button
                                aria-haspopup="dialog"
                                className="px-8 py-4 rounded-full bg-accent-strong text-white text-[15px] font-medium cursor-pointer flex items-center gap-3 transition-colors duration-300 hover:bg-accent"
                            >
                                {t.hero.cta}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </ExpandableScreenTrigger>
                        <ExpandableScreenContent ariaLabel={t.hero.cta}>
                            <CalendarBooking isDark={isDark} />
                        </ExpandableScreenContent>
                    </ExpandableScreen>
                    <a
                        href="#trabajo"
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground border-b border-border pb-0.5 transition-colors hover:text-foreground hover:border-accent"
                    >
                        {t.hero.ctaSecondary}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>

                {/* Prueba social: lo que un CTO escanea antes de agendar */}
                <p data-reveal className="lg:col-span-3 lg:text-right font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-faint">
                    {t.hero.proof}
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
