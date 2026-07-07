'use client';

// AboutSection — "Arquitectura invisible" como la sección PINNED insignia
// (patrón sticky-features de mosaicist). Desktop + motion-ok: el bloque se
// fija y cada capa se revela con clip-path mientras el texto sube escalonado;
// barra de progreso púrpura. Móvil / no-JS / reduced-motion: las 5 capas
// quedan en flow, apiladas y 100% legibles (toda la conversión es gsap.set
// dentro de matchMedia → se revierte sola). Todo el copy es indexable.

import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/LanguageProvider';
import { RevealGroup } from '@/components/shared/ui';
import { useStickyFeature } from '@/lib/animation/useStickyFeature';
import type { AboutSectionProps } from './AboutSection.types';

type Layer = {
    name: string;
    tag: string;
    own: string;
    stack: string[];
    metric: string;
    metricLabel: string;
};

export function AboutSection({ isDark: _isDark }: AboutSectionProps) {
    const { t, language } = useLanguage();
    const rootRef = useStickyFeature<HTMLDivElement>();
    const layers = t.about.layers as Layer[];

    return (
        <section
            id="nosotros"
            className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10 scroll-mt-16"
        >
            <div ref={rootRef} className="max-w-[1400px] mx-auto py-20 md:py-28">
                {/* Header */}
                <RevealGroup className="mb-14">
                    <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
                        05 — {t.about.eyebrow}
                    </p>
                    <h2 data-reveal className="font-display font-extralight uppercase text-h2 m-0 mb-4">
                        {t.about.title} {t.about.titleHighlight}
                    </h2>
                    <p data-reveal className="text-lead font-light m-0 max-w-[600px] text-muted-foreground">
                        {t.about.subtitle}
                    </p>
                </RevealGroup>

                {/* Bloque pinned */}
                <div data-sticky-pin className="lg:flex lg:items-center">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 w-full">
                        {/* Índice de capas (desktop) + barra de progreso */}
                        <div className="hidden lg:block lg:col-span-4" aria-hidden="true">
                            <ul className="flex flex-col gap-4">
                                {layers.map((layer, i) => (
                                    <li
                                        key={layer.name}
                                        data-sticky-menu-item
                                        className="group flex items-baseline gap-4 text-faint transition-colors duration-300 data-[active=true]:text-foreground"
                                    >
                                        <span className="font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 group-data-[active=true]:text-accent">
                                            L{i}
                                        </span>
                                        <span className="font-display font-light uppercase tracking-[0.04em] text-xl">
                                            {layer.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 h-px w-full bg-border overflow-hidden">
                                <div
                                    data-sticky-progress
                                    className="h-full w-full bg-accent-strong origin-left"
                                />
                            </div>
                        </div>

                        {/* Stage de capas */}
                        <div data-sticky-stage className="lg:col-span-8 flex flex-col gap-6 lg:gap-0">
                            {layers.map((layer, i) => (
                                <article
                                    key={layer.name}
                                    data-sticky-item
                                    className="bg-background border border-border rounded-lg p-7 md:p-9"
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="min-w-0">
                                            <h3
                                                data-sticky-text
                                                className="font-display font-light uppercase tracking-[0.04em] text-h3 mb-1"
                                            >
                                                <span className="lg:hidden font-mono text-[11px] tracking-[0.18em] text-accent mr-3 align-middle">
                                                    L{i}
                                                </span>
                                                {layer.name}
                                            </h3>
                                            <p
                                                data-sticky-text
                                                className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint"
                                            >
                                                {layer.tag}
                                            </p>
                                        </div>
                                        <div data-sticky-text className="text-right shrink-0">
                                            <div className="font-display font-thin tabular-nums text-3xl md:text-4xl leading-none">
                                                {layer.metric}
                                            </div>
                                            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint mt-1.5">
                                                {layer.metricLabel}
                                            </div>
                                        </div>
                                    </div>

                                    <p
                                        data-sticky-text
                                        className="text-sm sm:text-base leading-[1.6] text-muted-foreground mt-6 max-w-[560px]"
                                    >
                                        {layer.own}
                                    </p>

                                    <div data-sticky-text className="flex gap-2 flex-wrap mt-6">
                                        {layer.stack.map((s) => (
                                            <span
                                                key={s}
                                                className="px-3 py-1.5 rounded-full border border-border font-mono text-[11px] leading-none text-muted-foreground"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer note + CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-14">
                    <div className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                        {t.about.footerNote}
                    </div>
                    <button className="text-sm font-medium text-accent border-b border-accent/40 pb-0.5 bg-transparent cursor-pointer transition-colors hover:border-accent">
                        {t.about.footerCta}
                    </button>
                </div>

                {/* Cierre indexable + cross-link a casos de éxito */}
                <div className="border-t border-border pt-6 mt-10">
                    <p className="text-sm font-light leading-relaxed max-w-3xl text-faint">
                        {t.about.seoOutro}{' '}
                        <a
                            href={`${language === 'en' ? '/en' : ''}/proyectos`}
                            className={cn(
                                'text-accent border-b border-accent/40 pb-0.5 transition-colors hover:border-accent'
                            )}
                        >
                            {t.about.seoLink}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
