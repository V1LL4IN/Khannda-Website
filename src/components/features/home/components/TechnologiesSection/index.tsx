"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MacAssembly } from './MacAssembly';
import { TechDetailSection } from './TechDetailSection';
import { LayoutTextFlip } from '@/components/shared/ui/layout-text-flip';

interface TechnologiesSectionProps {
    isDark: boolean;
}

import { useLanguage } from '@/providers/LanguageProvider';

export function TechnologiesSection({ isDark }: TechnologiesSectionProps) {
    const { t } = useLanguage();

    return (
        <section id="tecnologia" className={cn("relative overflow-x-clip transition-colors duration-300 bg-background pt-36 pb-8")}>
            {/* Header Section - matching Solutions/Projects format */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn("flex flex-nowrap items-center justify-center gap-3 text-2xl sm:text-4xl md:text-6xl font-semibold tracking-tight mb-6 whitespace-nowrap", isDark ? "text-white" : "text-neutral-900")}
                    >
                        <LayoutTextFlip
                            text={t.technologies.title}
                            words={t.technologies.flipWords}
                        />{' '}
                        <span>{t.technologies.titleEnd}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn("text-lg max-w-2xl mx-auto", isDark ? "text-neutral-400" : "text-neutral-600")}
                    >
                        {t.technologies.subtitle}
                    </motion.p>
                </div>
            </div>

            {/* Portátil 3D que se ensambla con el scroll */}
            <MacAssembly />
            <div className="relative z-10">
                <TechDetailSection />
            </div>
        </section>
    );
}

export * from './MacbookShowcase';
