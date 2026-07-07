'use client';

// useHeroReveal — reveal de líneas enmascaradas para display type (H1 del
// hero, CTA del footer). Estrategia FOUC/LCP: el texto queda 100% visible en
// SSR/CSS; useGSAP corre en useLayoutEffect (antes del paint del árbol
// hidratado) así que el split + estado inicial no flashean. Si la hidratación
// llega tarde (conexión lenta), NO se anima: nunca arrancarle el texto al
// usuario a mitad de lectura.

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from './gsap';
import { HERO, MM_MOTION_OK } from './tokens';

/** Ventana tras la carga en la que aún tiene sentido reproducir la intro */
const STALE_HYDRATION_MS = 2500;

export function useHeroReveal<T extends HTMLElement = HTMLHeadingElement>(
    opts: { delay?: number; onScrollTrigger?: boolean } = {}
) {
    const ref = useRef<T>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            // Hidratación tardía → hero estático (el texto ya se está leyendo)
            if (!opts.onScrollTrigger && performance.now() > STALE_HYDRATION_MS) return;

            const mm = gsap.matchMedia();
            mm.add(MM_MOTION_OK, () => {
                const split = SplitText.create(el, {
                    type: 'lines',
                    // mask:'lines' envuelve cada línea en un wrapper con clip —
                    // cero CSS propio, cero CLS (conserva las cajas de línea)
                    mask: 'lines',
                    // re-split automático cuando carga la webfont o cambia el ancho
                    autoSplit: true,
                    onSplit: (self) =>
                        gsap.from(self.lines, {
                            yPercent: 100,
                            duration: HERO.duration,
                            ease: HERO.ease,
                            stagger: HERO.stagger,
                            delay: opts.delay ?? HERO.delay,
                            ...(opts.onScrollTrigger
                                ? {
                                      scrollTrigger: {
                                          trigger: el,
                                          start: 'top 85%',
                                          once: true,
                                      },
                                  }
                                : {}),
                        }),
                });
                return () => split.revert();
            });
        },
        { scope: ref }
    );

    return ref;
}
