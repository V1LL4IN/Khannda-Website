'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
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
        <section className="relative w-full overflow-hidden bg-[#0a0a0c] text-white flex flex-col min-h-screen">
            {/* Antigravity ring-particles background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <AntigravityBackground
                    ringRadius={100}
                    ringThickness={600}
                    particleCount={80}
                    particleRows={25}
                    particleSize={2}
                    particleColor="#ffffff"
                />
                {/* Radial fade so the field dissolves at the edges */}
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_25%,black_100%)] bg-[#0a0a0c]" />
                {/* Soft center glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(circle at 50% 50%, rgba(138,60,134,0.18), rgba(89,35,85,0.05) 35%, transparent 60%)',
                    }}
                />
            </div>

            {/* Top status bar */}
            <div className="relative z-10 flex justify-between items-center px-6 sm:px-14 py-5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
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
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[rgba(138,60,134,0.9)] mb-6 sm:mb-7">
                        {t.hero.eyebrow}
                    </div>
                    <h1 className="font-medium text-white m-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.98] tracking-[-0.04em] text-balance">
                        {t.hero.titleBefore}{' '}
                        <span
                            className="font-medium italic"
                            style={{
                                background: 'linear-gradient(135deg, #c87bbf, #8a3c86)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {t.hero.titleEmphasis}
                        </span>{' '}
                        {t.hero.titleAfter}
                    </h1>
                    <p className="text-base sm:text-lg md:text-[19px] leading-[1.55] text-white/60 mt-8 sm:mt-9 font-light max-w-[640px] mx-auto">
                        {t.hero.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-7 mt-10 sm:mt-12">
                        <ExpandableScreen isDark={isDark} layoutId="hero-cta-button">
                            <ExpandableScreenTrigger>
                                <button className="px-9 py-[18px] bg-[#fafafa] text-[#0a0a0c] rounded-full text-[15px] font-medium cursor-pointer flex items-center gap-3 hover:scale-[1.02] transition-transform">
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
                            className="text-white/60 text-sm border-b border-white/20 pb-0.5 hover:text-white hover:border-white/60 transition-colors"
                        >
                            {t.hero.ctaSecondary}
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom strip */}
            <div className="relative z-10 flex justify-between items-center border-t border-white/[0.06] px-6 sm:px-14 py-5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                <span className="hidden sm:inline">{t.hero.sectors}</span>
                <span className="sm:hidden">{t.hero.sectors.split('·')[0].trim()}</span>
                <span>{t.hero.scroll}</span>
            </div>
        </section>
    );
};

export default HeroSection;
