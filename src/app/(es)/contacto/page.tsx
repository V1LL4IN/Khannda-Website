'use client';

import React from 'react';
import { ArrowRight, CalendarDays, MessageCircle } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Navbar, Footer } from '@/components/shared/layout';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking,
} from '@/components/shared/ui';
import { cn } from '@/lib/utils';

export default function ContactoPage() {
    const { isDark, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const whatsappUrl = `https://wa.me/593995498636?text=${encodeURIComponent(t.whatsapp.home)}`;

    return (
        <div className="min-h-screen transition-all duration-300 bg-background text-foreground">
            <Navbar isDark={isDark} onThemeToggle={toggleTheme} />

            <main>
                <section
                    className={cn(
                        'relative min-h-screen pt-36 pb-24 px-6 sm:px-14 transition-colors duration-300',
                        isDark ? 'bg-[#0a0a0c] text-white' : 'bg-[#fafaf7] text-[#0a0a0a]'
                    )}
                >
                    <div className="max-w-4xl mx-auto">
                        <p
                            className={cn(
                                'text-[10px] font-mono uppercase tracking-[0.3em] mb-6',
                                isDark ? 'text-[rgba(200,123,191,0.9)]' : 'text-[rgba(138,60,134,0.9)]'
                            )}
                        >
                            {t.contact.eyebrow}
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[1.05] text-balance">
                            {t.contact.title}{' '}
                            <span className="gradient-text">{t.contact.titleHighlight}</span>
                        </h1>
                        <p
                            className={cn(
                                'text-base sm:text-lg font-light mt-6 max-w-[52ch]',
                                isDark ? 'text-white/60' : 'text-neutral-600'
                            )}
                        >
                            {t.contact.subtitle}
                        </p>

                        {/* Acciones */}
                        <div className="grid sm:grid-cols-2 gap-5 mt-12">
                            <div
                                className={cn(
                                    'rounded-2xl border p-7 flex flex-col',
                                    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-white'
                                )}
                            >
                                <CalendarDays className="w-6 h-6 mb-4 text-[#8a3c86]" aria-hidden="true" />
                                <h2 className="text-lg font-medium mb-2">{t.contact.bookingTitle}</h2>
                                <p className={cn('text-sm font-light mb-6 flex-1', isDark ? 'text-white/60' : 'text-neutral-600')}>
                                    {t.contact.bookingDesc}
                                </p>
                                <ExpandableScreen isDark={isDark} layoutId="contact-booking">
                                    <ExpandableScreenTrigger>
                                        <button
                                            aria-haspopup="dialog"
                                            className={cn(
                                                'px-7 py-3.5 rounded-full text-sm font-medium cursor-pointer inline-flex items-center gap-2.5 hover:scale-[1.02] transition-transform',
                                                isDark ? 'bg-[#fafafa] text-[#0a0a0c]' : 'bg-[#0a0a0a] text-[#fafaf7]'
                                            )}
                                        >
                                            {t.contact.bookingCta}
                                            <span className="w-5 h-5 rounded-full bg-[#8a3c86] text-white inline-flex items-center justify-center">
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </button>
                                    </ExpandableScreenTrigger>
                                    <ExpandableScreenContent ariaLabel={t.contact.bookingCta}>
                                        <CalendarBooking isDark={isDark} />
                                    </ExpandableScreenContent>
                                </ExpandableScreen>
                            </div>

                            <div
                                className={cn(
                                    'rounded-2xl border p-7 flex flex-col',
                                    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-white'
                                )}
                            >
                                <MessageCircle className="w-6 h-6 mb-4 text-emerald-500" aria-hidden="true" />
                                <h2 className="text-lg font-medium mb-2">{t.contact.whatsappTitle}</h2>
                                <p className={cn('text-sm font-light mb-6 flex-1', isDark ? 'text-white/60' : 'text-neutral-600')}>
                                    {t.contact.whatsappDesc}
                                </p>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        'px-7 py-3.5 rounded-full text-sm font-medium inline-flex items-center gap-2.5 w-fit border transition-colors',
                                        isDark
                                            ? 'border-white/20 hover:border-white/50 text-white'
                                            : 'border-black/20 hover:border-black/50 text-black'
                                    )}
                                >
                                    {t.contact.whatsappCta}
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Datos directos — texto indexable, espejo del schema */}
                        <div className={cn('mt-14 pt-10 border-t', isDark ? 'border-white/10' : 'border-black/10')}>
                            <h2 className="text-lg font-medium mb-4">{t.contact.infoTitle}</h2>
                            <ul
                                className={cn(
                                    'space-y-2 text-sm font-light',
                                    isDark ? 'text-white/60' : 'text-neutral-600'
                                )}
                            >
                                {t.contact.infoItems.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Mini-FAQ (siempre visible: indexable) */}
                        <div className={cn('mt-14 pt-10 border-t grid sm:grid-cols-3 gap-8', isDark ? 'border-white/10' : 'border-black/10')}>
                            {t.contact.faq.map((item, i) => (
                                <div key={i}>
                                    <h3 className="text-sm font-medium mb-2">{item.question}</h3>
                                    <p className={cn('text-sm font-light leading-relaxed', isDark ? 'text-white/55' : 'text-neutral-600')}>
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer isDark={isDark} />
        </div>
    );
}
