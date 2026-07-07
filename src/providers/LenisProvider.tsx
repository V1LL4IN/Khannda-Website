// providers/LenisProvider.tsx — Lenis + GSAP como un solo sistema de scroll:
// el ticker de GSAP es el ÚNICO rAF de la página y Lenis notifica a
// ScrollTrigger en cada frame suavizado. Expone useLenis() para que el
// overlay de nav y los modales puedan stop()/start() el scroll.
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/animation/gsap';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
    children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Smooth scroll ágil: suavizado corto y respuesta directa a la rueda.
        // (La inercia larga de 1s hacía sentir la página "pesada".)
        const instance = new Lenis({
            duration: 0.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.2,
            touchMultiplier: 1.5,
            infinite: false,
        });
        setLenis(instance);
        // Back-compat temporal mientras algún consumidor use window.__lenis
        (window as any).__lenis = instance;

        // Lenis notifica a ScrollTrigger en cada frame de scroll suavizado
        instance.on('scroll', ScrollTrigger.update);

        // El ticker de GSAP pasa a ser el único rAF (da segundos; lenis espera ms)
        const raf = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(raf);
        // Sin lag-smoothing: si GSAP "viaja en el tiempo" tras un jank y Lenis
        // no, los scrubs tartamudean
        gsap.ticker.lagSmoothing(0);

        // Re-medición de triggers cuando cargan las webfonts (el swap cambia
        // los saltos de línea) y cuando las secciones dynamic() crecen la página
        document.fonts.ready.then(() => ScrollTrigger.refresh());
        const refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh()).pause();
        const ro = new ResizeObserver(() => refresh.restart(true));
        ro.observe(document.body);

        return () => {
            ro.disconnect();
            refresh.kill();
            gsap.ticker.remove(raf);
            instance.destroy();
            setLenis(null);
            delete (window as any).__lenis;
        };
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export default LenisProvider;
