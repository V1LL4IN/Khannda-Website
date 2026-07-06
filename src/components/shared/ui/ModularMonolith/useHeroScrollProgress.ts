'use client';

// useHeroScrollProgress.ts — progreso 0→1 de salida del hero.
// Fuente única: Lenis si está montado (window.__lenis, ver LenisProvider),
// con fallback al scroll nativo. El valor vive en un ref; onChange se dispara
// solo con deltas perceptibles para no despertar el render loop en vano.

import { useEffect, useRef } from 'react';

interface LenisLike {
    scroll: number;
    on: (event: 'scroll', cb: (instance: { scroll: number }) => void) => void;
    off: (event: 'scroll', cb: (instance: { scroll: number }) => void) => void;
}

export function useHeroScrollProgress(onChange?: (p: number) => void) {
    const progress = useRef(0);
    const changeRef = useRef(onChange);
    changeRef.current = onChange;

    useEffect(() => {
        const update = (scrollY: number) => {
            const vh = window.innerHeight || 1;
            const p = Math.min(1, Math.max(0, scrollY / (0.7 * vh)));
            if (Math.abs(p - progress.current) < 0.002) return;
            progress.current = p;
            changeRef.current?.(p);
        };

        const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
        if (lenis) {
            const cb = ({ scroll }: { scroll: number }) => update(scroll);
            lenis.on('scroll', cb);
            update(lenis.scroll);
            return () => lenis.off('scroll', cb);
        }

        const cb = () => update(window.scrollY);
        window.addEventListener('scroll', cb, { passive: true });
        update(window.scrollY);
        return () => window.removeEventListener('scroll', cb);
    }, []);

    return progress;
}
