"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SolutionsCards } from './SolutionsCards';
import { LayoutTextFlip } from '@/components/shared/ui/layout-text-flip';
import { FaqAccordion } from '@/components/shared/ui/FaqAccordion';

interface SolutionsSectionProps {
    isDark: boolean;
}



import { useLanguage } from '@/providers/LanguageProvider';

export function SolutionsSection({ isDark }: SolutionsSectionProps) {
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';
    // FAQs relevantes a estas soluciones (subconjunto del FAQ global; el
    // schema FAQPage de /soluciones usa exactamente estos índices)
    const faqs = [t.faq.items[2], t.faq.items[3]];

    return (
        <section id="servicios" className={cn("min-h-screen pt-36 pb-8 relative overflow-hidden transition-colors duration-300 bg-background flex flex-col")}>

            {/* Background Decorations — radial-gradient estático (visualmente
                igual que el círculo con blur-[100px], sin coste de filtro GPU) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px]"
                    style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(88,28,135,0.22)' : 'rgba(233,213,255,0.4)'} 0%, transparent 70%)` }}
                />
                <div
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px]"
                    style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(30,58,138,0.22)' : 'rgba(191,219,254,0.4)'} 0%, transparent 70%)` }}
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
                            text={t.solutions.title}
                            words={t.solutions.flipWords}
                        />
                        <span>{t.solutions.titleEnd}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn("text-lg", isDark ? "text-neutral-400" : "text-neutral-600")}
                    >
                        {t.solutions.subtitle}
                    </motion.p>
                </div>

                <SolutionsCards />

                {/* FAQ de soluciones + cross-links — contenido indexable
                    (acordeón compartido: respuestas siempre en el DOM SSR) */}
                <div
                    className={cn(
                        "max-w-3xl mx-auto mt-20 pt-14 border-t",
                        isDark ? "border-white/10" : "border-black/10"
                    )}
                >
                    <span
                        className={cn(
                            'inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] border mb-5',
                            isDark
                                ? 'border-[rgba(138,60,134,0.3)] bg-[rgba(138,60,134,0.08)] text-[#c87bbf]'
                                : 'border-[rgba(89,35,85,0.18)] bg-[rgba(89,35,85,0.04)] text-[#712F6D]'
                        )}
                    >
                        <span className="w-[5px] h-[5px] rounded-full bg-[#8a3c86]" />
                        {t.faq.badge}
                    </span>
                    <h2
                        className={cn(
                            "text-2xl sm:text-3xl font-medium tracking-[-0.02em] mb-6",
                            isDark ? "text-white" : "text-neutral-900"
                        )}
                    >
                        {t.solutions.faqTitle}
                    </h2>

                    <FaqAccordion items={faqs} isDark={isDark} idPrefix="solutions-faq" />

                    <div className="grid sm:grid-cols-2 gap-4 mt-10">
                        {[
                            { href: `${p}/proyectos`, text: t.solutions.crossCases },
                            { href: `${p}/tecnologia`, text: t.solutions.crossStack },
                        ].map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className={cn(
                                    'flex items-center justify-between gap-3 rounded-2xl border p-5 text-sm font-medium transition-colors group',
                                    isDark
                                        ? 'border-white/10 bg-white/[0.02] hover:border-white/25 text-white/85'
                                        : 'border-black/10 bg-white hover:border-black/25 text-neutral-800'
                                )}
                            >
                                {link.text}
                                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 text-[#8a3c86]" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
