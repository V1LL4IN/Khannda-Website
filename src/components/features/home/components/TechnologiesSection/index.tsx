"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MacbookShowcase } from './MacbookShowcase';
import { TechDetailSection } from './TechDetailSection';
import { LayoutTextFlip } from '@/components/shared/ui/layout-text-flip';

interface TechnologiesSectionProps {
    isDark: boolean;
}

import { useLanguage } from '@/providers/LanguageProvider';

export function TechnologiesSection({ isDark }: TechnologiesSectionProps) {
    const { t } = useLanguage();

    return (
        <section id="tecnologia" className={cn("relative overflow-hidden transition-colors duration-300 bg-background pt-36 pb-8")}>
            {/* Background Decorations — radial-gradient estático (sin blur GPU) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px]"
                    style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(88,28,135,0.22)' : 'rgba(233,213,255,0.4)'} 0%, transparent 70%)` }}
                />
                <div
                    className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px]"
                    style={{ background: `radial-gradient(circle, ${isDark ? 'rgba(22,78,99,0.22)' : 'rgba(165,243,252,0.4)'} 0%, transparent 70%)` }}
                />
            </div>

            {/* Header Section - matching Solutions/Projects format */}
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
                            text={t.technologies.title}
                            words={t.technologies.flipWords}
                        />
                        <span>{t.technologies.titleEnd}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn("text-lg", isDark ? "text-neutral-400" : "text-neutral-600")}
                    >
                        {t.technologies.subtitle}
                    </motion.p>
                </div>
            </div>

            {/* MacBook Showcase */}
            <div className="w-full">
                <MacbookShowcase />
                <div className="-mt-[20vh] relative z-10">
                    <TechDetailSection />
                </div>
            </div>
        </section>
    );
}

export * from './MacbookShowcase';
