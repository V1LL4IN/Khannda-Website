'use client';

// ModularMonolith — pieza 3D firma del hero.
// Escalera de degradación:
//   1. SIEMPRE renderiza el SVG placeholder (sale en el HTML SSR → cero CLS).
//   2. prefers-reduced-motion o sin WebGL → el SVG es la ilustración final;
//      el chunk de three nunca se descarga.
//   3. Si hay WebGL: import() del canvas en requestIdleCallback o primera
//      interacción (lo que llegue antes) y crossfade de 300ms sobre el SVG.
// El contenedor completo lleva pointer-events:none — los CTAs del hero son
// estructuralmente imposibles de bloquear.

import React, { Component, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { MonolithPlaceholder } from './MonolithPlaceholder';
import { useHeroScrollProgress } from './useHeroScrollProgress';
import type { ModularMonolithProps } from './ModularMonolith.types';

const MonolithCanvas = dynamic(() => import('./MonolithCanvas'), { ssr: false });

// Sombreado de caras del SVG por tema (neutro base: #1b1b21 dark / #e8e6e1 light).
const SVG_VARS_DARK = {
    '--blk-top': '#23232b',
    '--blk-left': '#18181e',
    '--blk-right': '#141419',
} as CSSProperties;
const SVG_VARS_LIGHT = {
    '--blk-top': '#f6f4ef',
    '--blk-left': '#d5d4cf',
    '--blk-right': '#c3c1bd',
} as CSSProperties;

// failIfMajorPerformanceCaveat puede tumbar la creación del contexto
// (SwiftShader): si el Canvas lanza, volvemos al SVG en silencio.
class CanvasErrorBoundary extends Component<
    { onError: () => void; children: ReactNode },
    { failed: boolean }
> {
    state = { failed: false };
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch() {
        this.props.onError();
    }
    render() {
        return this.state.failed ? null : this.props.children;
    }
}

export function ModularMonolith({ isDark, className }: ModularMonolithProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [wantCanvas, setWantCanvas] = useState(false);
    const [canvasReady, setCanvasReady] = useState(false);
    const [canvasFailed, setCanvasFailed] = useState(false);
    const [compact, setCompact] = useState(false);

    // Fade de salida del despiece: CSS sobre el wrapper, nunca transparencia
    // WebGL (evita sorting artifacts de raíz).
    useHeroScrollProgress((p) => {
        const el = containerRef.current;
        if (el) el.style.opacity = String(1 - 0.55 * p * p);
    });

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        const apply = () =>
            setCompact(
                mq.matches ||
                    ((navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8) < 4
            );
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const probe = document.createElement('canvas');
        const gl = probe.getContext('webgl2') || probe.getContext('webgl');
        if (!gl) return; // SVG permanente
        gl.getExtension('WEBGL_lose_context')?.loseContext();

        let done = false;
        let idleId: number | undefined;
        let timer: number | undefined;
        const listeners: Array<[string, EventListener]> = [];

        const cleanup = () => {
            listeners.forEach(([type, handler]) => window.removeEventListener(type, handler));
            if (idleId !== undefined) cancelIdleCallback(idleId);
            if (timer !== undefined) clearTimeout(timer);
        };
        const go = () => {
            if (done) return;
            done = true;
            cleanup();
            setWantCanvas(true);
        };

        for (const type of ['pointermove', 'scroll', 'touchstart']) {
            const handler = () => go();
            listeners.push([type, handler]);
            window.addEventListener(type, handler, { passive: true, once: true });
        }
        if (typeof window.requestIdleCallback === 'function') {
            idleId = window.requestIdleCallback(go, { timeout: 1800 });
        } else {
            timer = window.setTimeout(go, 2000); // Safari sin rIC
        }
        return cleanup;
    }, []);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className={cn('relative h-full w-full pointer-events-none select-none', className)}
            style={isDark ? SVG_VARS_DARK : SVG_VARS_LIGHT}
        >
            {/* Ambas variantes en el HTML SSR, seleccionadas por CSS: sin pop
                de silueta al hidratar (el estado `compact` solo existe en
                cliente y gobierna únicamente la retícula del canvas). */}
            <MonolithPlaceholder
                className={cn(
                    'absolute inset-0 h-full w-full transition-opacity duration-300 hidden sm:block',
                    canvasReady && !canvasFailed ? 'opacity-0' : 'opacity-100'
                )}
            />
            <MonolithPlaceholder
                compact
                className={cn(
                    'absolute inset-0 h-full w-full transition-opacity duration-300 sm:hidden',
                    canvasReady && !canvasFailed ? 'opacity-0' : 'opacity-100'
                )}
            />
            {wantCanvas && !canvasFailed && (
                <div
                    className={cn(
                        'absolute inset-0 transition-opacity duration-300',
                        canvasReady ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <CanvasErrorBoundary onError={() => setCanvasFailed(true)}>
                        <MonolithCanvas
                            isDark={isDark}
                            compact={compact}
                            containerRef={containerRef}
                            onReady={() => setCanvasReady(true)}
                        />
                    </CanvasErrorBoundary>
                </div>
            )}
        </div>
    );
}
