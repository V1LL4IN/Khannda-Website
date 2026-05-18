'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/providers/LanguageProvider';
import type { AboutSectionProps } from './AboutSection.types';

const PURPLE_MID = '#712F6D';
const PURPLE_END = '#8a3c86';
const GRADIENT = 'linear-gradient(135deg, #592355, #712F6D 50%, #8a3c86)';

const SectionHeader = ({
    eyebrow,
    title,
    highlight,
    sub,
    isDark,
}: {
    eyebrow: string;
    title: string;
    highlight: string;
    sub: string;
    isDark: boolean;
}) => (
    <div className="flex flex-col gap-4 items-start max-w-[720px]">
        <span
            className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] border',
                isDark
                    ? 'border-[rgba(138,60,134,0.3)] bg-[rgba(138,60,134,0.08)] text-[#c87bbf]'
                    : 'border-[rgba(89,35,85,0.18)] bg-[rgba(89,35,85,0.04)] text-[#712F6D]'
            )}
        >
            <span
                className="w-[5px] h-[5px] rounded-full"
                style={{ background: PURPLE_END }}
            />
            {eyebrow}
        </span>
        <h2
            className={cn(
                'text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium m-0 leading-[1.05] tracking-[-0.03em]',
                isDark ? 'text-white' : 'text-[#0a0a0a]'
            )}
        >
            {title}{' '}
            <span
                className="font-bold"
                style={{
                    background: GRADIENT,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                }}
            >
                {highlight}
            </span>
        </h2>
        {sub && (
            <p
                className={cn(
                    'text-base md:text-[17px] leading-[1.55] font-light m-0 max-w-[600px]',
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                )}
            >
                {sub}
            </p>
        )}
    </div>
);

type Layer = {
    name: string;
    tag: string;
    own: string;
    stack: string[];
    metric: string;
    metricLabel: string;
};

const LayerRow = ({
    layer,
    index,
    isActive,
    onActivate,
    isDark,
}: {
    layer: Layer;
    index: number;
    isActive: boolean;
    onActivate: () => void;
    isDark: boolean;
}) => {
    return (
        <div
            onMouseEnter={onActivate}
            onFocus={onActivate}
            onClick={onActivate}
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            className={cn(
                'grid items-stretch rounded-md border cursor-pointer transition-all duration-[250ms] overflow-hidden relative',
                'grid-cols-[40px_1fr] sm:grid-cols-[60px_1fr_auto]',
                isActive
                    ? isDark
                        ? 'bg-neutral-900 border-[rgba(138,60,134,0.4)] shadow-[0_8px_32px_rgba(89,35,85,0.2)] p-6 sm:p-7'
                        : 'bg-white border-[rgba(89,35,85,0.25)] shadow-[0_8px_32px_rgba(89,35,85,0.08)] p-6 sm:p-7'
                    : isDark
                    ? 'bg-transparent border-white/[0.08] py-3.5 px-6 sm:px-7'
                    : 'bg-transparent border-black/[0.08] py-3.5 px-6 sm:px-7'
            )}
            style={{ outline: 'none' }}
        >
            {/* Layer index */}
            <div
                className="font-mono text-[11px] uppercase tracking-[0.18em] flex items-center"
                style={{
                    color: isActive ? (isDark ? '#c87bbf' : PURPLE_MID) : isDark ? '#525252' : '#a3a3a3',
                }}
            >
                L{index}
            </div>

            {/* Name + tag + (active: copy + chips) */}
            <div
                className={cn(
                    'flex flex-col justify-center min-w-0',
                    isActive ? 'gap-3' : 'gap-0'
                )}
            >
                <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                    <span
                        className={cn(
                            'font-medium tracking-[-0.01em] transition-all duration-[250ms]',
                            isActive
                                ? 'text-2xl sm:text-[28px]'
                                : 'text-xl sm:text-[22px]',
                            isDark ? 'text-white' : 'text-[#0a0a0a]'
                        )}
                    >
                        {layer.name}
                    </span>
                    <span
                        className={cn(
                            'font-mono text-[10px] uppercase tracking-[0.14em]',
                            isDark ? 'text-neutral-500' : 'text-neutral-500'
                        )}
                    >
                        {layer.tag}
                    </span>
                </div>
                <AnimatePresence initial={false}>
                    {isActive && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.3, 1] }}
                            className="flex flex-col gap-3 overflow-hidden"
                        >
                            <p
                                className={cn(
                                    'text-sm sm:text-[15px] leading-[1.55] m-0 max-w-[640px]',
                                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                                )}
                            >
                                {layer.own}
                            </p>
                            <div className="flex gap-1.5 flex-wrap">
                                {layer.stack.map((s) => (
                                    <span
                                        key={s}
                                        className={cn(
                                            'px-2.5 py-1 rounded-[3px] font-mono text-[11px]',
                                            isDark
                                                ? 'bg-[rgba(138,60,134,0.15)] text-[#c87bbf]'
                                                : 'bg-[rgba(89,35,85,0.06)] text-[#712F6D]'
                                        )}
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Metric — right column on sm+; for xs (single-col grid above), wrapped below */}
            <div
                className={cn(
                    'col-span-2 sm:col-span-1 text-left sm:text-right flex flex-col justify-center mt-2 sm:mt-0',
                    'sm:pl-4'
                )}
            >
                <div
                    className={cn(
                        'font-medium tracking-[-0.02em] tabular-nums transition-all duration-[250ms]',
                        isActive ? 'text-[26px] sm:text-[32px]' : 'text-xl sm:text-[22px]'
                    )}
                    style={{
                        color: isActive ? PURPLE_END : isDark ? '#525252' : '#a3a3a3',
                    }}
                >
                    {layer.metric}
                </div>
                <AnimatePresence initial={false}>
                    {isActive && (
                        <motion.div
                            key="metric-label"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                'font-mono text-[9px] uppercase tracking-[0.14em] mt-0.5',
                                isDark ? 'text-neutral-500' : 'text-neutral-500'
                            )}
                        >
                            {layer.metricLabel}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export function AboutSection({ isDark }: AboutSectionProps) {
    const { t } = useLanguage();
    const [active, setActive] = useState<number>(2);

    const layers = t.about.layers as Layer[];

    return (
        <section
            className={cn(
                'relative transition-colors duration-300',
                isDark ? 'bg-neutral-950' : 'bg-[#fafaf9]'
            )}
        >
            <div className="max-w-[1280px] mx-auto px-6 sm:px-14 py-20 md:py-24 flex flex-col gap-10">
                <SectionHeader
                    eyebrow={t.about.eyebrow}
                    title={t.about.title}
                    highlight={t.about.titleHighlight}
                    sub={t.about.subtitle}
                    isDark={isDark}
                />

                <div className="flex flex-col gap-2">
                    {layers.map((layer, i) => (
                        <LayerRow
                            key={layer.name}
                            layer={layer}
                            index={i}
                            isActive={active === i}
                            onActivate={() => setActive(i)}
                            isDark={isDark}
                        />
                    ))}
                </div>

                <div
                    className={cn(
                        'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-5',
                        isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
                    )}
                >
                    <div
                        className={cn(
                            'font-mono text-[11px] tracking-[0.1em]',
                            isDark ? 'text-neutral-400' : 'text-neutral-600'
                        )}
                    >
                        {t.about.footerNote}
                    </div>
                    <button
                        className={cn(
                            'px-5 py-3 rounded text-[13px] font-medium border bg-transparent transition-colors',
                            isDark
                                ? 'text-[#c87bbf] border-[#c87bbf] hover:bg-[rgba(138,60,134,0.1)]'
                                : 'text-[#8a3c86] border-[#8a3c86] hover:bg-[rgba(89,35,85,0.06)]'
                        )}
                    >
                        {t.about.footerCta}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
