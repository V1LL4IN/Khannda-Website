'use client';

import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { RevealGroup } from '@/components/shared/ui';
import { useRevealGroup } from '@/lib/animation/useRevealGroup';
import { useLanguage } from '@/providers/LanguageProvider';
import type { Translations } from '@/lib/i18n/translations/es';

// Índice de trabajo (Featured Work): filas hairline con los 3 casos reales de
// projects.showcase.*. Cada fila revela como unidad y lleva data-cursor="view"
// (el cursor custom muestra "Ver"). Sin fechas inventadas: tag "En producción".
interface WorkIndexSectionProps {
    isDark?: boolean;
}

type CaseData = Translations['projects']['showcase']['finance'];

const WorkRow = ({
    c,
    href,
    statusLabel,
    cursorLabel,
}: {
    c: CaseData;
    href: string;
    statusLabel: string;
    cursorLabel: string;
}) => {
    const ref = useRevealGroup<HTMLAnchorElement>();

    return (
        <a
            ref={ref}
            data-reveal-group
            data-cursor={cursorLabel}
            href={href}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center border-t border-border last:border-b py-8 md:py-10 transition-colors duration-300 ease-sexy hover:bg-surface px-2 -mx-2"
        >
            {/* Nombre + flecha */}
            <div className="lg:col-span-4 flex items-center gap-3">
                <h3 className="font-display font-light uppercase text-h3">
                    {c.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 shrink-0 text-faint transition-all duration-300 ease-expo group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            {/* Sector + estado */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    {c.sector}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {statusLabel}
                </span>
            </div>

            {/* Primera línea de resultados como prueba */}
            <p className="lg:col-span-3 text-sm text-muted-foreground">
                {c.results[0]}
            </p>

            {/* Stack pills */}
            <div className="lg:col-span-2 flex flex-wrap gap-2 lg:justify-end">
                {c.stack.slice(0, 3).map((tech, j) => (
                    <span
                        key={j}
                        className="px-3 py-1.5 rounded-full border border-border font-mono text-[11px] leading-none text-muted-foreground transition-colors duration-200 group-hover:border-accent"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </a>
    );
};

const WorkIndexSection: React.FC<WorkIndexSectionProps> = () => {
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';

    // key = id del <article> del caso en /proyectos (caso-finance, …)
    const cases = (['finance', 'fitness', 'altus'] as const).map((key) => ({
        key,
        data: t.projects.showcase[key],
    }));

    return (
        <section id="trabajo" className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10 scroll-mt-16">
            <div className="max-w-[1400px] mx-auto py-20 md:py-28">
                <RevealGroup>
                    <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
                        04 — {t.work.eyebrow} ({String(cases.length).padStart(2, '0')})
                    </p>
                    <h2 data-reveal className="font-display font-extralight uppercase text-h2 mb-4">{t.work.title}</h2>
                    <p data-reveal className="text-lead font-light text-muted-foreground max-w-[52ch] mb-14">
                        {t.work.subtitle}
                    </p>
                </RevealGroup>

                <div>
                    {cases.map(({ key, data }) => (
                        <WorkRow
                            key={key}
                            c={data}
                            href={`${p}/proyectos#caso-${key}`}
                            statusLabel={t.work.statusLabel}
                            cursorLabel={t.work.viewCase}
                        />
                    ))}
                </div>

                <RevealGroup className="mt-10">
                    <a
                        href={`${p}/proyectos`}
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground border-b border-border pb-0.5 transition-colors hover:text-foreground hover:border-accent"
                    >
                        {t.work.allCases}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </RevealGroup>
            </div>
        </section>
    );
};

export default WorkIndexSection;
