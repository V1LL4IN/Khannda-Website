// src/components/features/home/components/ServicesSection/index.tsx
// Servicios como filas editoriales apiladas (patrón índice de la referencia):
// índice mono | título display + copy indexable | pills de stack | CTA
// contextual. Cada fila revela como unidad (trigger propio); el header con
// stagger. Los cross-links con keyword se conservan; consultoría y el outro
// abren el flujo de booking.
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import {
    RevealGroup,
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking,
} from '../../../../shared/ui';
import { useRevealGroup } from '@/lib/animation/useRevealGroup';
import { useLanguage } from '@/providers/LanguageProvider';

interface ServicesSectionProps {
    isDark?: boolean;
}

type ServiceRowData = {
    title: string;
    description: string;
    detail: string;
    linkText: string;
    features: string[];
    href: string | null;
};

const ServiceRow = ({
    service,
    index,
    isDark,
}: {
    service: ServiceRowData;
    index: number;
    isDark?: boolean;
}) => {
    const ref = useRevealGroup<HTMLElement>();

    return (
        <article
            ref={ref}
            data-reveal-group
            className="group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 border-t border-border last:border-b py-10 md:py-14 px-2 -mx-2 transition-colors duration-300 ease-sexy hover:bg-surface"
        >
            {/* Índice */}
            <div className="lg:col-span-1 font-mono text-[11px] tracking-[0.18em] text-faint pt-2">
                0{index + 1}
            </div>

            {/* Título + copy indexable */}
            <div className="lg:col-span-6">
                <h3 className="font-display font-light uppercase text-h3 mb-4">
                    {service.title}
                </h3>
                <p className="text-sm sm:text-base font-light leading-[1.6] text-muted-foreground max-w-[62ch]">
                    {service.description} {service.detail}
                </p>
            </div>

            {/* Stack pills */}
            <div className="lg:col-span-3 flex flex-wrap gap-2 content-start lg:pt-2">
                {service.features.map((f, j) => (
                    <span
                        key={j}
                        className="px-3 py-1.5 h-fit rounded-full border border-border font-mono text-[11px] leading-none text-muted-foreground transition-colors duration-200 group-hover:border-accent"
                    >
                        {f}
                    </span>
                ))}
            </div>

            {/* CTA contextual */}
            <div className="lg:col-span-2 lg:text-right lg:pt-2">
                {service.href ? (
                    <a
                        href={service.href}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                    >
                        {service.linkText}
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                ) : (
                    <ExpandableScreen isDark={isDark} layoutId="services-cta-consulting">
                        <ExpandableScreenTrigger>
                            <span className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent cursor-pointer">
                                {service.linkText}
                                <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5" />
                            </span>
                        </ExpandableScreenTrigger>
                        <ExpandableScreenContent ariaLabel={service.linkText}>
                            <CalendarBooking isDark={isDark} />
                        </ExpandableScreenContent>
                    </ExpandableScreen>
                )}
            </div>
        </article>
    );
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';

    // href null = el CTA abre el modal de booking (consultoría ES el diagnóstico)
    const rows: ServiceRowData[] = [
        { ...t.services.items.development, href: `${p}/soluciones` },
        { ...t.services.items.security, href: `${p}/proyectos` },
        { ...t.services.items.automation, href: `${p}/soluciones` },
        { ...t.services.items.consulting, href: null },
    ];

    const metrics = [
        t.services.metrics.efficiency,
        t.services.metrics.timeToMarket,
        t.services.metrics.ownership,
    ];

    return (
        <section className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10">
            <div className="max-w-[1400px] mx-auto py-20 md:py-28">
                {/* Header */}
                <RevealGroup>
                    <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
                        03 — {t.nav.solutions} ({String(rows.length).padStart(2, '0')})
                    </p>
                    <h2 data-reveal className="font-display font-extralight uppercase text-h2 mb-4">{t.services.title}</h2>
                    <p data-reveal className="text-lead font-light text-muted-foreground max-w-[52ch]">
                        {t.services.subtitle}
                    </p>
                    <p data-reveal className="text-sm font-light text-faint max-w-2xl mt-4">
                        {t.services.seoIntro}
                    </p>
                </RevealGroup>

                {/* Filas editoriales */}
                <div className="mt-14">
                    {rows.map((service, i) => (
                        <ServiceRow key={i} service={service} index={i} isDark={isDark} />
                    ))}
                </div>

                {/* Outro → booking */}
                <RevealGroup className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <p className="text-lead font-light text-muted-foreground">
                        {t.services.outroText}
                    </p>
                    <ExpandableScreen isDark={isDark} layoutId="services-cta-outro">
                        <ExpandableScreenTrigger>
                            <span
                                className={cn(
                                    'inline-flex items-center gap-2 text-sm font-medium cursor-pointer shrink-0',
                                    'text-accent border-b border-accent/40 pb-0.5 transition-colors hover:border-accent'
                                )}
                            >
                                {t.services.outroCta}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </ExpandableScreenTrigger>
                        <ExpandableScreenContent ariaLabel={t.services.outroCta}>
                            <CalendarBooking isDark={isDark} />
                        </ExpandableScreenContent>
                    </ExpandableScreen>
                </RevealGroup>

                {/* Franja de métricas */}
                <RevealGroup className="grid sm:grid-cols-3 gap-10 sm:gap-6 border-t border-border mt-16 pt-10">
                    {metrics.map((metric, i) => (
                        <div data-reveal key={i}>
                            <div className="font-display font-thin tabular-nums text-4xl md:text-5xl mb-2">
                                {metric.value}
                            </div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-1.5">
                                {metric.label}
                            </div>
                            <p className="text-sm font-light text-muted-foreground">{metric.desc}</p>
                        </div>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
};

export default ServicesSection;
