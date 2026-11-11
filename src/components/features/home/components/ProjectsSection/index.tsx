"use client";

// /proyectos — tres casos como paneles grandes que se apilan con el scroll.
// Cada panel muestra título, resultados y un visual; el problema y la
// solución se abren con "+" sobre el visual. Todo el texto está SIEMPRE en
// el HTML (lo indexan buscadores y lo citan los LLMs), solo se pliega.
import React, { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LayoutTextFlip } from '@/components/shared/ui/layout-text-flip';
import { useLanguage } from '@/providers/LanguageProvider';
import { CASE_VISUALS } from './CaseVisuals';

interface ProjectsSectionProps {
    isDark: boolean;
}

type CaseKey = keyof typeof CASE_VISUALS;
const KEYS: CaseKey[] = ['finance', 'fitness', 'altus'];
const EASE = [0.22, 1, 0.36, 1] as const;

interface CaseStudy {
    title: string;
    sector: string;
    challenge: string;
    solution: string;
    stack: string[];
    results: string[];
}

interface CasePanelProps {
    caseKey: CaseKey;
    index: number;
    data: CaseStudy;
    labels: { challenge: string; solution: string; stack: string; results: string };
    isDark: boolean;
    still: boolean;
    /** Apilado activo (solo escritorio). */
    stacked: boolean;
    progress: MotionValue<number>;
}

function CasePanel({ caseKey, index, data, labels, isDark, still, stacked, progress }: CasePanelProps) {
    const [open, setOpen] = useState(false);
    const detailId = useId();
    const Visual = CASE_VISUALS[caseKey];
    // Los paneles ya apilados se encogen un poco al entrar el siguiente
    const scale = useTransform(progress, [index / KEYS.length, 1], [1, 1 - (KEYS.length - 1 - index) * 0.045]);

    return (
        <div className="lg:sticky" style={{ top: `${6 + index * 1.1}rem` }}>
            <motion.article
                id={`caso-${caseKey}`}
                style={stacked ? { scale, transformOrigin: 'top center' } : undefined}
                className={cn(
                    'scroll-mt-28 grid lg:grid-cols-2 gap-6 lg:gap-10 rounded-[32px] md:rounded-[44px] p-6 sm:p-8 lg:p-12',
                    'lg:h-[76vh] lg:min-h-[600px] lg:max-h-[780px]',
                    isDark ? 'bg-[#111113] shadow-[0_-1px_0_rgba(255,255,255,0.06)]' : 'bg-[#f1f1f4] shadow-[0_-1px_0_rgba(0,0,0,0.04)]'
                )}
            >
                {/* Ficha */}
                <div className="flex flex-col">
                    <p className={cn('font-mono text-[11px] uppercase tracking-[0.2em] mb-5', isDark ? 'text-[#c87bbf]' : 'text-[#8a3c86]')}>
                        {String(index + 1).padStart(2, '0')} / {String(KEYS.length).padStart(2, '0')} · {data.sector}
                    </p>
                    <h2 className={cn('text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.03] mb-8', isDark ? 'text-white' : 'text-neutral-900')}>
                        {data.title}
                    </h2>

                    <h3 className="sr-only">{labels.results}</h3>
                    <ul className="space-y-3 mb-8">
                        {data.results.map((result, i) => (
                            <li key={i} className={cn('flex items-start gap-3 text-base', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
                                <Check size={18} className="mt-0.5 shrink-0 text-[#8a3c86]" />
                                {result}
                            </li>
                        ))}
                    </ul>

                    <h3 className="sr-only">{labels.stack}</h3>
                    <ul className="flex flex-wrap gap-2 mt-auto">
                        {data.stack.map((tech) => (
                            <li
                                key={tech}
                                className={cn(
                                    'px-3.5 py-1.5 rounded-full font-mono text-[11px]',
                                    isDark ? 'bg-white/[0.06] text-neutral-300' : 'bg-white text-neutral-700'
                                )}
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Visual + detalle plegable */}
                <div className={cn('relative overflow-hidden rounded-[26px] md:rounded-[32px] min-h-[300px] lg:min-h-0', isDark ? 'bg-[#19191c]' : 'bg-white')}>
                    <div
                        className={cn(
                            'absolute inset-0 p-8 sm:p-12 transition-all duration-500 ease-out',
                            open ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        )}
                    >
                        <Visual isDark={isDark} still={still} />
                    </div>

                    {/* Problema → solución: en el DOM aunque esté plegado (SEO/GEO) */}
                    <div
                        id={detailId}
                        inert={!open}
                        className={cn(
                            'relative lg:absolute lg:inset-0 lg:overflow-y-auto p-7 sm:p-9 pb-20 transition-all duration-500 ease-out',
                            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 max-lg:absolute max-lg:inset-0 max-lg:overflow-hidden'
                        )}
                    >
                        <h3 className={cn('font-mono text-[11px] uppercase tracking-[0.2em] mb-2', isDark ? 'text-[#c87bbf]' : 'text-[#8a3c86]')}>
                            {labels.challenge}
                        </h3>
                        <p className={cn('text-sm sm:text-[15px] leading-relaxed mb-6', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
                            {data.challenge}
                        </p>
                        <h3 className={cn('font-mono text-[11px] uppercase tracking-[0.2em] mb-2', isDark ? 'text-[#c87bbf]' : 'text-[#8a3c86]')}>
                            {labels.solution}
                        </h3>
                        <p className={cn('text-sm sm:text-[15px] leading-relaxed', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
                            {data.solution}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls={detailId}
                        className={cn(
                            'absolute left-4 lg:left-auto lg:right-4 bottom-4 inline-flex items-center gap-2 h-11 pl-5 pr-3.5 rounded-full text-sm font-medium transition-colors duration-300',
                            open
                                ? 'bg-[#8a3c86] text-white'
                                : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-900 text-white hover:bg-[#8a3c86]'
                        )}
                    >
                        {labels.challenge} · {labels.solution}
                        <Plus size={18} className={cn('transition-transform duration-300', open && 'rotate-45')} />
                    </button>
                </div>
            </motion.article>
        </div>
    );
}

export function ProjectsSection({ isDark }: ProjectsSectionProps) {
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';
    const reduceMotion = useReducedMotion();
    const stackRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return (
        <section id="casos" className="relative pt-36 pb-6 px-3 sm:px-5 transition-colors duration-300 bg-background">
            <div className="max-w-[1500px] mx-auto">
                {/* Encabezado */}
                <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20 px-3">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={cn('flex flex-nowrap items-center justify-center gap-3 text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-6 whitespace-nowrap', isDark ? 'text-white' : 'text-neutral-900')}
                    >
                        <LayoutTextFlip text={t.projects.title} words={t.projects.flipWords} />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                        className={cn('text-lg max-w-2xl mx-auto', isDark ? 'text-neutral-400' : 'text-neutral-600')}
                    >
                        {t.projects.subtitle}
                    </motion.p>
                </div>

                {/* Casos apilados */}
                <div ref={stackRef} className="flex flex-col gap-3 sm:gap-5 lg:gap-10">
                    {KEYS.map((key, i) => (
                        <CasePanel
                            key={key}
                            caseKey={key}
                            index={i}
                            data={t.projects.showcase[key]}
                            labels={t.projects.labels}
                            isDark={isDark}
                            still={!!reduceMotion}
                            stacked={isDesktop && !reduceMotion}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Cierre → /contacto */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="relative z-10 overflow-hidden rounded-[32px] md:rounded-[44px] mt-3 sm:mt-5 lg:mt-10 px-7 py-14 md:px-16 md:py-24 text-white"
                    style={{ background: 'linear-gradient(135deg, #3d1839 0%, #592355 45%, #8a3c86 100%)' }}
                >
                    <div
                        aria-hidden
                        className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 65%)' }}
                    />
                    <div className="relative grid md:grid-cols-12 gap-8 items-end">
                        <p className="md:col-span-8 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                            {t.projects.crossText}
                        </p>
                        <div className="md:col-span-4 flex md:justify-end">
                            <a
                                href={`${p}/contacto`}
                                className="group inline-flex items-center gap-2 pl-7 pr-5 py-4 rounded-full bg-white text-neutral-900 text-base font-medium transition-transform duration-300 hover:scale-[1.03]"
                            >
                                {t.projects.crossLink}
                                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
