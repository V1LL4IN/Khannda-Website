'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { HeroSectionProps } from './HeroSection.types';
import { useLanguage } from '@/providers/LanguageProvider';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
} from '@/components/shared/ui/ExpandableScreen';
import { CalendarBooking } from '@/components/shared/ui/CalendarBooking';
import { useHeroReveal } from '@/lib/animation/useHeroReveal';
import { useRevealGroup } from '@/lib/animation/useRevealGroup';

const DepthScene = dynamic(() => import('./DepthScene'), { ssr: false });

// Tramo extra de scroll (además del primer viewport) que dura la inmersión
const DIVE_SCROLL = '140vh';

function hasWebGL() {
    try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
        return false;
    }
}

// Hero: tarjeta oscura con una imagen 3D generada con IA que tiene
// profundidad real (ver DepthScene) y, encima, el titular tipográfico.
//
// - Texto 100% SSR (LCP + keyword "desarrollo de software a medida"
//   contigua); al hidratar, el H1 entra con líneas enmascaradas y el resto
//   con un reveal group escalonado. Sin JS, todo queda visible.
// - La imagen se pinta primero como póster <img>; el canvas WebGL se funde
//   encima cuando está listo.
// - Con WebGL y sin reduced-motion el hero se queda fijo (sticky) durante
//   DIVE_SCROLL: la tarjeta se abre a pantalla completa, el texto se retira,
//   la cámara se adentra en la imagen y, al final, vuelve a ser tarjeta para
//   salir con el scroll. Sin WebGL o con reduced-motion es un hero estático
//   de un viewport.
const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
    const { t } = useLanguage();
    const beforeLines = t.hero.titleBefore.split('\n');
    const reduceMotion = useReducedMotion();

    const track = useRef<HTMLElement>(null);
    const [enhanced, setEnhanced] = useState(false);
    const [inView, setInView] = useState(true);
    const [sceneReady, setSceneReady] = useState(false);

    const h1Ref = useHeroReveal<HTMLHeadingElement>();
    // El contenido secundario espera a que el H1 arranque (delay > stagger de líneas)
    const topRef = useRevealGroup<HTMLDivElement>({ delay: 0.15, start: 'top 100%' });
    const bottomRef = useRevealGroup<HTMLDivElement>({ delay: 0.55, start: 'top 100%' });

    useEffect(() => setEnhanced(!reduceMotion && hasWebGL()), [reduceMotion]);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Progreso (0→1) del tramo fijado. Se mide a mano sobre el scroll: el alto
    // del tramo cambia al activarse la escena y hay que re-medirlo entonces.
    const progress = useMotionValue(0);
    useEffect(() => {
        const el = track.current;
        if (!el || !enhanced) {
            progress.set(0);
            return;
        }
        const measure = () => {
            const range = el.offsetHeight - window.innerHeight;
            const p = range > 0 ? -el.getBoundingClientRect().top / range : 0;
            progress.set(Math.min(1, Math.max(0, p)));
        };
        measure();
        window.addEventListener('scroll', measure, { passive: true });
        window.addEventListener('resize', measure);
        return () => {
            window.removeEventListener('scroll', measure);
            window.removeEventListener('resize', measure);
        };
    }, [enhanced, progress]);

    // 1 = tarjeta con márgenes y esquinas redondeadas · 0 = pantalla completa
    const frame = useTransform(progress, [0, 0.3, 0.84, 1], [1, 0, 0, 1], { clamp: true });
    const clipPath = useMotionTemplate`inset(calc(var(--hero-top) * ${frame}) calc(var(--hero-x) * ${frame}) calc(var(--hero-bottom) * ${frame}) round calc(var(--hero-r) * ${frame}))`;
    const contentOpacity = useTransform(progress, [0.02, 0.24], [1, 0], { clamp: true });
    const contentY = useTransform(progress, [0, 0.3], [0, -56], { clamp: true });
    const contentPointer = useTransform(contentOpacity, (o) => (o < 0.35 ? 'none' : 'auto'));

    return (
        <section
            ref={track}
            className="relative bg-background transition-colors duration-300"
            style={{ height: enhanced ? `calc(100svh + ${DIVE_SCROLL})` : undefined }}
        >
            <div
                className={cn(
                    'sticky top-0 h-[100svh] min-h-[620px] overflow-hidden',
                    // Geometría de la tarjeta (la usan el recorte y el contenido)
                    '[--hero-top:4.75rem] [--hero-x:0.5rem] [--hero-bottom:0.5rem] [--hero-r:1.5rem]',
                    'sm:[--hero-x:1.25rem] sm:[--hero-bottom:1.25rem] md:[--hero-r:2.5rem]'
                )}
            >
                {/* Tarjeta: póster + escena WebGL + velos de legibilidad */}
                <motion.div aria-hidden="true" className="absolute inset-0 bg-[#0d0810]" style={{ clipPath }}>
                    <Image
                        src="/hero/modular.webp"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover scale-[1.05] object-[15%_50%] portrait:object-[48%_50%]"
                    />
                    {enhanced && (
                        <div
                            className={cn(
                                'absolute inset-0 transition-opacity duration-700 ease-out',
                                sceneReady ? 'opacity-100' : 'opacity-0'
                            )}
                        >
                            <DepthScene
                                progress={progress}
                                active={inView}
                                onReady={() => setSceneReady(true)}
                            />
                        </div>
                    )}
                    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: contentOpacity }}>
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,8,16,0.86)_0%,rgba(13,8,16,0.5)_36%,rgba(13,8,16,0)_66%)] portrait:bg-[linear-gradient(180deg,rgba(13,8,16,0.92)_0%,rgba(13,8,16,0.72)_30%,rgba(13,8,16,0)_52%)]" />
                        <div className="absolute inset-x-0 bottom-0 h-[46%] portrait:h-[62%] bg-[linear-gradient(0deg,rgba(13,8,16,0.9)_0%,rgba(13,8,16,0)_100%)] portrait:bg-[linear-gradient(0deg,rgba(13,8,16,0.94)_0%,rgba(13,8,16,0.8)_55%,rgba(13,8,16,0)_100%)]" />
                    </motion.div>
                </motion.div>

                {/* Contenido, alineado a los límites iniciales de la tarjeta */}
                <motion.div
                    className="absolute top-[var(--hero-top)] bottom-[var(--hero-bottom)] inset-x-[var(--hero-x)] flex flex-col text-white px-5 sm:px-9 lg:px-12 pt-6 pb-6 sm:pb-8"
                    style={{ opacity: contentOpacity, y: contentY, pointerEvents: contentPointer }}
                >
                    {/* Fila superior: label mono + hairline */}
                    <div
                        ref={topRef}
                        data-reveal-group
                        className="flex items-baseline justify-between gap-6 pb-4 border-b border-white/15"
                    >
                        <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
                            {t.hero.eyebrow}
                        </p>
                        <p data-reveal className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                            01
                        </p>
                    </div>

                    {/* H1 — texto SSR visible desde el primer frame; el reveal corre pre-paint */}
                    <div className="flex-1 flex items-start pt-8 lg:items-center lg:pt-0">
                        <h1
                            ref={h1Ref}
                            className="font-display font-thin uppercase m-0 text-[clamp(2.25rem,5.5vw,6rem)] leading-[1.04] tracking-[0.01em]"
                        >
                            {beforeLines.map((line, i) => (
                                <span key={i} className={cn('block', i === 1 && 'pl-[4.5vw]')}>
                                    {line}{' '}
                                </span>
                            ))}
                            <span className="block">
                                <span
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #f0c9ea, #c87bbf)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {t.hero.titleEmphasis}
                                </span>
                                {t.hero.titleAfter}
                            </span>
                        </h1>
                    </div>

                    {/* Fila inferior: descripción · CTAs · proof */}
                    <div
                        ref={bottomRef}
                        data-reveal-group
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-end pt-6 border-t border-white/15"
                    >
                        <p data-reveal className="lg:col-span-5 text-lead font-light text-white/75 max-w-[46ch]">
                            {t.hero.description}
                        </p>

                        <div data-reveal className="lg:col-span-4 flex flex-wrap items-center gap-5 sm:gap-7">
                            <ExpandableScreen isDark={isDark} layoutId="hero-cta-button">
                                <ExpandableScreenTrigger>
                                    <button
                                        aria-haspopup="dialog"
                                        className="px-8 py-4 rounded-full bg-white text-[#1b0f1a] text-[15px] font-medium cursor-pointer flex items-center gap-3 transition-colors duration-300 hover:bg-[#f0c9ea]"
                                    >
                                        {t.hero.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </ExpandableScreenTrigger>
                                <ExpandableScreenContent ariaLabel={t.hero.cta}>
                                    <CalendarBooking isDark={isDark} />
                                </ExpandableScreenContent>
                            </ExpandableScreen>
                            <a
                                href="#trabajo"
                                className="group inline-flex items-center gap-2 text-sm text-white/75 border-b border-white/25 pb-0.5 transition-colors hover:text-white hover:border-[#c87bbf]"
                            >
                                {t.hero.ctaSecondary}
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </div>

                        {/* Prueba social: lo que un CTO escanea antes de agendar */}
                        <p data-reveal className="lg:col-span-3 lg:text-right lg:pr-16 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/50">
                            {t.hero.proof}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
