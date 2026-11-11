"use client";

// /soluciones — tres soluciones como paneles grandes (texto + visual animado,
// alternando lado), FAQ y enlaces cruzados.
// El H2 es el nombre buscable del servicio ("Automatización con n8n") y la
// descripción queda a la vista. Los puntos destacados se abren con "+": están
// SIEMPRE en el HTML (lo indexan buscadores y lo citan los LLMs), solo se
// pliegan.
import React, { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LayoutTextFlip } from '@/components/shared/ui/layout-text-flip';
import { FaqAccordion } from '@/components/shared/ui/FaqAccordion';
import { useLanguage } from '@/providers/LanguageProvider';
import { SOLUTION_VISUALS } from './SolutionVisuals';

interface SolutionsSectionProps {
    isDark: boolean;
}

type TopicKey = keyof typeof SOLUTION_VISUALS;
const KEYS: TopicKey[] = ['automation', 'development', 'consulting'];
const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-80px' } as const;

interface Topic {
    title: string;
    cardTitle: string;
    description: string;
    highlights: string[];
}

interface SolutionPanelProps {
    topicKey: TopicKey;
    index: number;
    topic: Topic;
    isDark: boolean;
    still: boolean;
    detailsLabel: string;
    talkLabel: string;
    whatsappHref: string;
}

function SolutionPanel({ topicKey, index, topic, isDark, still, detailsLabel, talkLabel, whatsappHref }: SolutionPanelProps) {
    const [open, setOpen] = useState(false);
    const detailId = useId();
    const Visual = SOLUTION_VISUALS[topicKey];
    const flip = index % 2 === 1;

    return (
        <motion.article
            id={topicKey}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
            className={cn(
                'scroll-mt-28 grid lg:grid-cols-2 gap-6 lg:gap-10 rounded-[32px] md:rounded-[44px] p-6 sm:p-8 lg:p-12',
                isDark ? 'bg-[#111113]' : 'bg-[#f1f1f4]'
            )}
        >
            {/* Texto */}
            <div className={cn('flex flex-col', flip && 'lg:order-2')}>
                <p className={cn('font-mono text-[11px] uppercase tracking-[0.2em] mb-5', isDark ? 'text-[#c87bbf]' : 'text-[#8a3c86]')}>
                    {String(index + 1).padStart(2, '0')} / {String(KEYS.length).padStart(2, '0')} · {topic.title}
                </p>
                <h2 className={cn('text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.03] mb-5 text-balance', isDark ? 'text-white' : 'text-neutral-900')}>
                    {topic.cardTitle}
                </h2>
                <p className={cn('text-base sm:text-lg leading-relaxed max-w-lg', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
                    {topic.description}
                </p>

                {/* Detalle plegable: en el DOM aunque esté cerrado (SEO/GEO) */}
                <div
                    id={detailId}
                    inert={!open}
                    className={cn('grid transition-[grid-template-rows,opacity] duration-500 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
                >
                    <div className="overflow-hidden">
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-6">
                            {topic.highlights.map((item, i) => (
                                <li key={i} className={cn('flex items-start gap-2.5 text-sm', isDark ? 'text-neutral-300' : 'text-neutral-700')}>
                                    <Check size={16} className="mt-0.5 shrink-0 text-[#8a3c86]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-8 lg:mt-auto lg:pt-8">
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls={detailId}
                        className={cn(
                            'inline-flex items-center gap-2 h-12 pl-6 pr-4 rounded-full text-sm font-medium transition-colors duration-300',
                            open
                                ? 'bg-[#8a3c86] text-white'
                                : isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-neutral-900 text-white hover:bg-[#8a3c86]'
                        )}
                    >
                        {detailsLabel}
                        <Plus size={18} className={cn('transition-transform duration-300', open && 'rotate-45')} />
                    </button>
                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'group inline-flex items-center gap-1.5 h-12 px-5 rounded-full text-sm font-medium transition-colors',
                            isDark ? 'text-white/80 hover:text-white' : 'text-neutral-700 hover:text-black'
                        )}
                    >
                        {talkLabel}
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>

            {/* Visual */}
            <div
                className={cn(
                    'rounded-[26px] md:rounded-[32px] p-6 sm:p-10 min-h-[260px] lg:min-h-[400px] flex items-center',
                    isDark ? 'bg-[#19191c]' : 'bg-white',
                    flip && 'lg:order-1'
                )}
            >
                <Visual isDark={isDark} still={still} />
            </div>
        </motion.article>
    );
}

export function SolutionsSection({ isDark }: SolutionsSectionProps) {
    const { t, language } = useLanguage();
    const reduceMotion = useReducedMotion();
    const p = language === 'en' ? '/en' : '';
    const talkLabel = language === 'en' ? "Let's talk" : 'Hablemos';
    // FAQs relevantes a estas soluciones (subconjunto del FAQ global; el
    // schema FAQPage de /soluciones usa exactamente estos índices)
    const faqs = [t.faq.items[2], t.faq.items[3]];

    return (
        <section id="servicios" className="relative pt-36 pb-6 px-3 sm:px-5 transition-colors duration-300 bg-background">
            <div className="max-w-[1500px] mx-auto">
                {/* Encabezado */}
                <div className="text-center max-w-5xl mx-auto mb-14 md:mb-20 px-3">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={cn('flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6', isDark ? 'text-white' : 'text-neutral-900')}
                    >
                        <LayoutTextFlip text={t.solutions.title} words={t.solutions.flipWords} />{' '}
                        <span>{t.solutions.titleEnd}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                        className={cn('text-lg max-w-2xl mx-auto', isDark ? 'text-neutral-400' : 'text-neutral-600')}
                    >
                        {t.solutions.subtitle}
                    </motion.p>
                </div>

                {/* Soluciones */}
                <div className="flex flex-col gap-3 sm:gap-5">
                    {KEYS.map((key, i) => {
                        const topic = t.solutions.topics[key];
                        const message = language === 'en'
                            ? `Hi! I'm interested in learning more about ${topic.cardTitle}.`
                            : `¡Hola! Me interesa conocer más sobre ${topic.cardTitle}.`;
                        return (
                            <SolutionPanel
                                key={key}
                                topicKey={key}
                                index={i}
                                topic={topic}
                                isDark={isDark}
                                still={!!reduceMotion}
                                detailsLabel={t.solutions.cta}
                                talkLabel={talkLabel}
                                whatsappHref={`https://wa.me/593995498636?text=${encodeURIComponent(message)}`}
                            />
                        );
                    })}
                </div>

                {/* FAQ de soluciones — acordeón compartido: respuestas siempre en el DOM SSR */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.7, ease: EASE }}
                    className={cn(
                        'grid lg:grid-cols-12 gap-8 lg:gap-12 rounded-[32px] md:rounded-[44px] mt-3 sm:mt-5 p-7 sm:p-10 lg:p-14',
                        isDark ? 'bg-[#111113]' : 'bg-[#f1f1f4]'
                    )}
                >
                    <div className="lg:col-span-5">
                        <p className={cn('font-mono text-[11px] uppercase tracking-[0.2em] mb-5', isDark ? 'text-[#c87bbf]' : 'text-[#8a3c86]')}>
                            {t.faq.badge}
                        </p>
                        <h2 className={cn('text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]', isDark ? 'text-white' : 'text-neutral-900')}>
                            {t.solutions.faqTitle}
                        </h2>
                    </div>
                    <div className="lg:col-span-7">
                        <FaqAccordion items={faqs} isDark={isDark} idPrefix="solutions-faq" />
                    </div>
                </motion.div>

                {/* Enlaces cruzados */}
                <div className="grid md:grid-cols-2 gap-3 sm:gap-5 mt-3 sm:mt-5">
                    {[
                        { href: `${p}/proyectos`, text: t.solutions.crossCases, accent: true },
                        { href: `${p}/tecnologia`, text: t.solutions.crossStack, accent: false },
                    ].map((link) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={inView}
                            transition={{ duration: 0.7, ease: EASE }}
                            className={cn(
                                'group relative flex items-end justify-between gap-6 overflow-hidden rounded-[32px] md:rounded-[44px] p-7 sm:p-10 min-h-[200px] md:min-h-[260px]',
                                link.accent ? 'text-white' : isDark ? 'bg-[#111113] text-white' : 'bg-[#f1f1f4] text-neutral-900'
                            )}
                            style={link.accent ? { background: 'linear-gradient(135deg, #3d1839 0%, #592355 45%, #8a3c86 100%)' } : undefined}
                        >
                            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] max-w-md">
                                {link.text}
                            </span>
                            <span
                                className={cn(
                                    'shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1',
                                    link.accent ? 'bg-white text-neutral-900' : isDark ? 'bg-white/10 text-white' : 'bg-neutral-900 text-white'
                                )}
                            >
                                <ArrowUpRight size={20} />
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
