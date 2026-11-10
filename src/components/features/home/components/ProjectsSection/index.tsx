"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectsShowcase } from './ProjectsShowcase';
import { LayoutTextFlip } from '@/components/shared/ui/layout-text-flip';
import { ScrollReveal } from '@/components/shared/ui';

interface ProjectsSectionProps {
    isDark: boolean;
}

import { useLanguage } from '@/providers/LanguageProvider';

export function ProjectsSection({ isDark }: ProjectsSectionProps) {
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';

    return (
        <section id="casos" className={cn("min-h-screen pt-36 pb-24 relative overflow-visible transition-colors duration-300 bg-background flex flex-col")}>

            {/* Background Decorations — radial-gradient estático (sin blur GPU) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px]"
                    style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(6,78,59,0.22)' : 'rgba(167,243,208,0.4)'} 0%, transparent 70%)` }}
                />
                <div
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px]"
                    style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(22,78,99,0.22)' : 'rgba(165,243,252,0.4)'} 0%, transparent 70%)` }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="text-center max-w-3xl mx-auto mb-5">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn("flex flex-nowrap items-center justify-center gap-3 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-6 whitespace-nowrap", isDark ? "text-white" : "text-neutral-900")}
                    >
                        <LayoutTextFlip
                            text={t.projects.title}
                            words={t.projects.flipWords}
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn("text-lg", isDark ? "text-neutral-400" : "text-neutral-600")}
                    >
                        {t.projects.subtitle}
                    </motion.p>
                </div>

                <ProjectsShowcase />

                {/* Separador entre el showcase y el detalle de casos */}
                <div className="flex items-center justify-center gap-4 mt-20 mb-10">
                    <div className={cn("flex-1 h-px", isDark ? "bg-white/10" : "bg-black/10")} />
                    <p className={cn("text-xs font-mono uppercase tracking-[0.2em] shrink-0", isDark ? "text-white/40" : "text-neutral-500")}>
                        {t.projects.detailLabel}
                    </p>
                    <div className={cn("flex-1 h-px", isDark ? "bg-white/10" : "bg-black/10")} />
                </div>

                {/* Casos de éxito en detalle — problema → solución → stack →
                    resultados. Siempre en el DOM: es el contenido que indexan
                    buscadores y citan los LLMs. */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {[
                        t.projects.showcase.finance,
                        t.projects.showcase.fitness,
                        t.projects.showcase.retail,
                    ].map((caseStudy, i) => (
                        <ScrollReveal key={i} delay={0.05 * i} direction="up">
                        <article
                            id={`caso-${['finance', 'fitness', 'retail'][i]}`}
                            className={cn(
                                'rounded-2xl border p-7 flex flex-col h-full transition-colors scroll-mt-28',
                                isDark ? 'border-white/10 bg-white/[0.02] hover:border-white/20' : 'border-black/10 bg-white hover:border-black/20'
                            )}
                        >
                            <p
                                className={cn(
                                    'text-[10px] font-mono uppercase tracking-[0.18em] mb-3',
                                    isDark ? 'text-[rgba(200,123,191,0.9)]' : 'text-[rgba(138,60,134,0.9)]'
                                )}
                            >
                                {caseStudy.sector}
                            </p>
                            <h2 className={cn('text-xl font-semibold mb-5', isDark ? 'text-white' : 'text-neutral-900')}>
                                {caseStudy.title}
                            </h2>

                            <h3 className={cn('text-xs font-mono uppercase tracking-[0.15em] mb-2', isDark ? 'text-white/60' : 'text-neutral-500')}>
                                {t.projects.labels.challenge}
                            </h3>
                            <p className={cn('text-sm font-light leading-relaxed mb-5', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
                                {caseStudy.challenge}
                            </p>

                            <h3 className={cn('text-xs font-mono uppercase tracking-[0.15em] mb-2', isDark ? 'text-white/60' : 'text-neutral-500')}>
                                {t.projects.labels.solution}
                            </h3>
                            <p className={cn('text-sm font-light leading-relaxed mb-5', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
                                {caseStudy.solution}
                            </p>

                            <h3 className={cn('text-xs font-mono uppercase tracking-[0.15em] mb-2', isDark ? 'text-white/60' : 'text-neutral-500')}>
                                {t.projects.labels.stack}
                            </h3>
                            <ul className="flex flex-wrap gap-1.5 mb-5">
                                {caseStudy.stack.map((tech, j) => (
                                    <li
                                        key={j}
                                        className={cn(
                                            'px-2.5 py-1 rounded-[3px] font-mono text-[11px]',
                                            isDark ? 'bg-[rgba(138,60,134,0.15)] text-[#c87bbf]' : 'bg-[rgba(89,35,85,0.06)] text-[#712F6D]'
                                        )}
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>

                            <h3 className={cn('text-xs font-mono uppercase tracking-[0.15em] mb-2', isDark ? 'text-white/60' : 'text-neutral-500')}>
                                {t.projects.labels.results}
                            </h3>
                            <ul className={cn('space-y-1.5 text-sm font-light', isDark ? 'text-neutral-400' : 'text-neutral-600')}>
                                {caseStudy.results.map((result, j) => (
                                    <li key={j} className="flex gap-2">
                                        <span className="text-[#8a3c86] shrink-0">·</span>
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        </article>
                        </ScrollReveal>
                    ))}
                </div>

                {/* CTA → /contacto */}
                <p className={cn("text-center text-sm font-light mt-14 pt-8 border-t", isDark ? "text-neutral-400 border-white/10" : "text-neutral-600 border-black/10")}>
                    {t.projects.crossText}{' '}
                    <a
                        href={`${p}/contacto`}
                        className={cn(
                            "border-b pb-0.5 transition-colors",
                            isDark
                                ? "text-purple-300/80 border-purple-300/30 hover:text-purple-200"
                                : "text-purple-700 border-purple-300 hover:text-purple-900"
                        )}
                    >
                        {t.projects.crossLink}
                    </a>
                </p>
            </div>
        </section>
    );
}
