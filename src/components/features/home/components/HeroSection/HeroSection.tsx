'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HeroSectionProps } from './HeroSection.types';
import { useLanguage } from '@/providers/LanguageProvider';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
} from '@/components/shared/ui/ExpandableScreen';
import { CalendarBooking } from '@/components/shared/ui/CalendarBooking';
import { AntigravityBackground } from '@/components/shared/ui/AntigravityBackground';

const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
    const { t } = useLanguage();

    return (
        <section
            className={cn(
                'relative w-full overflow-hidden flex flex-col min-h-screen transition-colors duration-300',
                isDark ? 'bg-[#0a0a0c] text-white' : 'bg-[#fafaf7] text-[#0a0a0a]'
            )}
        >
            {/* Antigravity halo particle field (R3F + GLSL) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <AntigravityBackground
                    isDark={isDark}
                    dragFactor={0.06}
                />
                {/* Soft radial vignette so the headline reads cleanly over the halo */}
                <div
                    className={cn(
                        'absolute inset-0 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_50%,black_15%,transparent_75%)]',
                        isDark ? 'bg-[#0a0a0c]/0' : 'bg-[#fafaf7]/0',
                    )}
                />
            </div>

            {/* Top status bar */}
            <div
                className={cn(
                    'relative z-10 flex justify-between items-center px-6 sm:px-14 py-5 text-[10px] font-mono uppercase tracking-[0.18em]',
                    isDark ? 'text-white/40' : 'text-neutral-500'
                )}
            >
                <span className="flex items-center gap-2">
                    <span
                        className="w-[5px] h-[5px] rounded-full bg-emerald-500"
                        style={{ boxShadow: '0 0 6px #10b981' }}
                    />
                    {t.hero.statusEst}
                </span>
                <span className="hidden sm:inline">{t.hero.statusCount}</span>
            </div>

            {/* Centered composition */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 sm:px-14 py-12">
                <div className="text-center max-w-[1100px] mx-auto">
                    <div
                        className={cn(
                            'text-[10px] font-mono uppercase tracking-[0.3em] mb-6 sm:mb-7',
                            isDark ? 'text-[rgba(200,123,191,0.9)]' : 'text-[rgba(138,60,134,0.9)]'
                        )}
                    >
                        {t.hero.eyebrow}
                    </div>
                    <h1
                        className={cn(
                            'font-medium m-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.04em] text-balance',
                            isDark ? 'text-white' : 'text-[#0a0a0a]'
                        )}
                    >
                        {t.hero.titleBefore}{' '}
                        <span
                            className="font-medium italic"
                            style={{
                                backgroundImage: isDark
                                    ? 'linear-gradient(135deg, #c87bbf, #8a3c86)'
                                    : 'linear-gradient(135deg, #592355, #8a3c86)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {t.hero.titleEmphasis}
                        </span>{' '}
                        {t.hero.titleAfter}
                    </h1>
                    <p
                        className={cn(
                            'text-base sm:text-lg md:text-[19px] leading-[1.55] mt-8 sm:mt-9 font-light max-w-[640px] mx-auto',
                            isDark ? 'text-white/60' : 'text-neutral-600'
                        )}
                    >
                        {t.hero.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-7 mt-10 sm:mt-12">
                        <ExpandableScreen isDark={isDark} layoutId="hero-cta-button">
                            <ExpandableScreenTrigger>
                                <button
                                    className={cn(
                                        'px-9 py-[18px] rounded-full text-[15px] font-medium cursor-pointer flex items-center gap-3 hover:scale-[1.02] transition-transform',
                                        isDark
                                            ? 'bg-[#fafafa] text-[#0a0a0c]'
                                            : 'bg-[#0a0a0a] text-[#fafaf7]'
                                    )}
                                >
                                    {t.hero.cta}
                                    <span className="w-6 h-6 rounded-full bg-[#8a3c86] text-white inline-flex items-center justify-center text-xs">
                                        <ArrowRight className="w-3 h-3" />
                                    </span>
                                </button>
                            </ExpandableScreenTrigger>
                            <ExpandableScreenContent>
                                <CalendarBooking isDark={isDark} />
                            </ExpandableScreenContent>
                        </ExpandableScreen>
                        <a
                            href="/proyectos"
                            className={cn(
                                'text-sm border-b pb-0.5 transition-colors',
                                isDark
                                    ? 'text-white/60 border-white/20 hover:text-white hover:border-white/60'
                                    : 'text-neutral-600 border-neutral-300 hover:text-neutral-900 hover:border-neutral-600'
                            )}
                        >
                            {t.hero.ctaSecondary}
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div
                className={cn(
                    'relative z-10 flex justify-between items-center border-t px-6 sm:px-14 py-5 text-[10px] font-mono uppercase tracking-[0.18em]',
                    isDark
                        ? 'border-white/[0.06] text-white/40'
                        : 'border-black/[0.06] text-neutral-500'
                )}
            >
                <span className="hidden sm:inline">{t.hero.sectors}</span>
                <span className="sm:hidden">{t.hero.sectors.split('·')[0].trim()}</span>
                <span>{t.hero.scroll}</span>
            </div>
        </section>
    );
};

export default HeroSection;
