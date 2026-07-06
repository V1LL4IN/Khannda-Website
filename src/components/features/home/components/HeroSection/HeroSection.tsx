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
import { ModularMonolith } from '@/components/shared/ui/ModularMonolith';

// Hero "Obra Modular": editorial asimétrico. El texto SSR es el LCP; el
// monolito 3D vive en un contenedor absoluto (fuera de flujo → CLS 0) con
// pointer-events:none. En móvil pasa a fondo enmascarado tras el contenido.
const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';

    return (
        <section
            className={cn(
                'relative w-full overflow-hidden min-h-[100svh] flex transition-colors duration-300',
                isDark ? 'bg-[#0a0a0c] text-white' : 'bg-[#fafaf7] text-[#0a0a0a]'
            )}
        >
            {/* Monolito — absoluto, nunca reserva ni roba altura al contenido */}
            <div
                aria-hidden="true"
                className={cn(
                    'absolute z-0 pointer-events-none',
                    // móvil: textura ambiental al pie, siempre detrás del texto
                    'inset-x-0 bottom-0 h-[36%]',
                    // desktop: columna derecha a toda altura
                    'lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[48%]'
                )}
            >
                {/* Capa visual enmascarada — la anotación queda fuera para que
                    el gradiente no la atenúe */}
                <div
                    className={cn(
                        'absolute inset-0',
                        'opacity-60 [mask-image:linear-gradient(to_top,black_30%,transparent_78%)]',
                        'lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]'
                    )}
                >
                    {/* Halo radial que ancla la torre al fondo (clave en light) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(ellipse 70% 55% at 55% 33%, ${
                                isDark ? 'rgba(200,123,191,0.05)' : 'rgba(138,60,134,0.06)'
                            }, transparent 70%)`,
                        }}
                    />
                    <ModularMonolith isDark={isDark} />
                </div>
                {/* Anotación blueprint */}
                <div className="hidden lg:flex absolute top-[26%] left-[8%] items-center gap-3">
                    <span
                        className={cn('h-px w-10', isDark ? 'bg-white/30' : 'bg-black/25')}
                    />
                    <span
                        className={cn(
                            'font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-sm',
                            isDark
                                ? 'text-white/60 bg-[#0a0a0c]/60'
                                : 'text-neutral-600 bg-[#fafaf7]/70'
                        )}
                    >
                        {t.hero.annotation}
                    </span>
                </div>
            </div>

            {/* Texto — LCP */}
            {/* pt en desktop: clearance del navbar flotante cuando el contenido
                supera la altura del viewport (pantallas anchas y bajas) */}
            <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-14 pt-28 pb-16">
                <div className="lg:col-span-6">
                    <p
                        className={cn(
                            'text-[10px] font-mono uppercase tracking-[0.3em] mb-6',
                            isDark ? 'text-[rgba(200,123,191,0.9)]' : 'text-[rgba(138,60,134,0.9)]'
                        )}
                    >
                        {t.hero.eyebrow}
                    </p>
                    <h1
                        className={cn(
                            'font-medium m-0 text-4xl sm:text-5xl lg:text-[clamp(2.5rem,4.8vw,4.75rem)] leading-[1.02] tracking-[-0.04em] text-balance',
                            isDark ? 'text-white' : 'text-[#0a0a0a]'
                        )}
                    >
                        {t.hero.titleBefore}{' '}
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
                    </h1>
                    <p
                        className={cn(
                            'text-base sm:text-lg leading-[1.55] mt-6 font-light max-w-[52ch]',
                            isDark ? 'text-white/60' : 'text-neutral-600'
                        )}
                    >
                        {t.hero.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-5 sm:gap-7 mt-9">
                        <ExpandableScreen isDark={isDark} layoutId="hero-cta-button">
                            <ExpandableScreenTrigger>
                                <button
                                    aria-haspopup="dialog"
                                    className={cn(
                                        'px-9 py-[18px] rounded-full text-[15px] font-medium cursor-pointer flex items-center gap-3 hover:scale-[1.02] transition-transform',
                                        isDark
                                            ? 'bg-[#fafafa] text-[#0a0a0c]'
                                            : 'bg-[#0a0a0a] text-[#fafaf7]'
                                    )}
                                >
                                    {t.hero.cta}
                                    <span className="w-6 h-6 rounded-full bg-[#8a3c86] text-white inline-flex items-center justify-center text-xs">
                                        <ArrowRight className="w-3 h-3" />
                                    </span>
                                </button>
                            </ExpandableScreenTrigger>
                            <ExpandableScreenContent ariaLabel={t.hero.cta}>
                                <CalendarBooking isDark={isDark} />
                            </ExpandableScreenContent>
                        </ExpandableScreen>
                        <a
                            href={`${p}/proyectos`}
                            className={cn(
                                'group inline-flex items-center gap-2 text-sm border-b pb-0.5 transition-colors',
                                isDark
                                    ? 'text-white/60 border-white/20 hover:text-white hover:border-white/60'
                                    : 'text-neutral-600 border-neutral-300 hover:text-neutral-900 hover:border-neutral-600'
                            )}
                        >
                            {t.hero.ctaSecondary}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </a>
                    </div>
                    {/* Prueba social: lo que un CTO escanea antes de agendar */}
                    <p
                        className={cn(
                            'mt-10 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em]',
                            isDark ? 'text-white/55' : 'text-neutral-600'
                        )}
                    >
                        {t.hero.proof}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
