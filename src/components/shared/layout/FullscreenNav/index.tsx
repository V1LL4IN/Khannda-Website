'use client';

// FullscreenNav — overlay móvil a pantalla completa (patrón mosaicist): wipe
// con clip-path + links escalonados por transition-delay. Siempre montado (los
// links están en el DOM), controlado por `open`. Pausa Lenis al abrir, ESC
// cierra y el foco vuelve al botón que lo abrió. Desktop conserva los links
// visibles (decisión híbrida), así que este overlay es solo <lg.

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useLenis } from '@/providers/LenisProvider';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking,
} from '@/components/shared/ui';

interface NavItem {
    name: string;
    link: string;
    active: boolean;
}

interface FullscreenNavProps {
    open: boolean;
    onClose: () => void;
    items: NavItem[];
    esHref: string;
    enHref: string;
    language: 'es' | 'en';
    ctaLabel: string;
    isDark: boolean;
    /** Elemento a re-enfocar al cerrar (el botón hamburguesa) */
    returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

export function FullscreenNav({
    open,
    onClose,
    items,
    esHref,
    enHref,
    language,
    ctaLabel,
    isDark,
    returnFocusRef,
}: FullscreenNavProps) {
    const lenis = useLenis();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis?.start();
            document.body.style.overflow = '';
        }

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            lenis?.start();
        };
    }, [open, onClose, lenis]);

    // Devolver foco al toggle al cerrar
    useEffect(() => {
        if (!open) returnFocusRef.current?.focus?.();
    }, [open, returnFocusRef]);

    // Índice para el stagger (items + toggle idioma + CTA)
    const delay = (i: number) => (open ? `${0.18 + i * 0.06}s` : '0s');

    return (
        <div
            ref={panelRef}
            className="fs-nav lg:hidden flex flex-col"
            data-open={open}
            aria-hidden={!open}
        >
            <nav className="flex-1 flex flex-col justify-center gap-6 px-8">
                {items.map((item, i) => (
                    <a
                        key={item.link}
                        href={item.link}
                        onClick={onClose}
                        style={{ transitionDelay: delay(i) }}
                        className={cn(
                            'fs-nav-item font-display font-extralight uppercase tracking-[0.06em] text-4xl transition-colors',
                            item.active ? 'text-accent' : 'text-foreground hover:text-accent'
                        )}
                    >
                        {item.name}
                    </a>
                ))}

                <div
                    className="fs-nav-item flex items-center gap-4 font-mono text-sm uppercase tracking-[0.2em] mt-4"
                    style={{ transitionDelay: delay(items.length) }}
                >
                    <a
                        href={esHref}
                        hrefLang="es"
                        onClick={onClose}
                        className={cn(
                            'transition-colors',
                            language === 'es' ? 'text-foreground font-bold border-b border-accent' : 'text-faint'
                        )}
                    >
                        ES
                    </a>
                    <a
                        href={enHref}
                        hrefLang="en"
                        onClick={onClose}
                        className={cn(
                            'transition-colors',
                            language === 'en' ? 'text-foreground font-bold border-b border-accent' : 'text-faint'
                        )}
                    >
                        EN
                    </a>
                </div>

                <div className="fs-nav-item mt-4" style={{ transitionDelay: delay(items.length + 1) }}>
                    <ExpandableScreen isDark={isDark} layoutId="fullscreen-nav-cta">
                        <ExpandableScreenTrigger>
                            <span className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-foreground border-b border-accent pb-1 cursor-pointer">
                                {ctaLabel} ↗
                            </span>
                        </ExpandableScreenTrigger>
                        <ExpandableScreenContent ariaLabel={ctaLabel}>
                            <CalendarBooking isDark={isDark} />
                        </ExpandableScreenContent>
                    </ExpandableScreen>
                </div>
            </nav>
        </div>
    );
}

export default FullscreenNav;
