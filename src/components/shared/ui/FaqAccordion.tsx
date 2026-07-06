"use client";

// FaqAccordion — acordeón sobrio reutilizable (home FAQ, FAQ de /soluciones).
// Las respuestas están SIEMPRE montadas en el DOM (colapso por CSS grid-rows,
// no por unmount): todo el contenido existe en el HTML SSR para crawlers y
// LLMs, que no ejecutan JavaScript.

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
    isDark: boolean;
    /** Índice abierto por defecto (null = todo cerrado). */
    defaultOpen?: number | null;
    /** Prefijo para los ids aria-controls (único por instancia en la página). */
    idPrefix?: string;
}

export function FaqAccordion({ items, isDark, defaultOpen = 0, idPrefix = 'faq' }: FaqAccordionProps) {
    const [open, setOpen] = useState<number | null>(defaultOpen);

    return (
        <div className={cn('divide-y', isDark ? 'divide-white/10' : 'divide-black/10')}>
            {items.map((item, i) => {
                const isOpen = open === i;
                return (
                    <div key={i}>
                        <button
                            onClick={() => setOpen(isOpen ? null : i)}
                            aria-expanded={isOpen}
                            aria-controls={`${idPrefix}-answer-${i}`}
                            className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
                        >
                            <h3
                                className={cn(
                                    'text-base sm:text-lg font-medium transition-colors',
                                    isDark
                                        ? 'text-white/90 group-hover:text-white'
                                        : 'text-neutral-800 group-hover:text-black'
                                )}
                            >
                                {item.question}
                            </h3>
                            <Plus
                                aria-hidden="true"
                                className={cn(
                                    'w-4 h-4 mt-1.5 shrink-0 transition-transform duration-300',
                                    isOpen && 'rotate-45',
                                    isDark ? 'text-white/50' : 'text-neutral-500'
                                )}
                            />
                        </button>
                        <div
                            id={`${idPrefix}-answer-${i}`}
                            className={cn(
                                'grid transition-[grid-template-rows] duration-300 ease-out',
                                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            )}
                        >
                            <div className="overflow-hidden">
                                <p
                                    className={cn(
                                        'pb-6 pr-8 text-sm sm:text-base leading-relaxed font-light',
                                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                                    )}
                                >
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
