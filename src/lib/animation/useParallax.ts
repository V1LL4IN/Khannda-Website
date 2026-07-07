'use client';

// useParallax — parallax scrubbed transform-only para elementos decorativos
// (palabras separadoras). Sustituye el useScroll de framer: un solo sistema
// de scroll (ScrollTrigger) en toda la home.

import { useRef, type RefObject } from 'react';
import { gsap, useGSAP } from './gsap';
import { MM_MOTION_OK } from './tokens';

export function useParallax<T extends HTMLElement = HTMLDivElement>(
    target: RefObject<HTMLElement | null>,
    range = 24
) {
    const ref = useRef<T>(null);

    useGSAP(
        () => {
            const wrap = ref.current;
            const el = target.current;
            if (!wrap || !el) return;
            const mm = gsap.matchMedia();

            mm.add(MM_MOTION_OK, () => {
                gsap.fromTo(
                    el,
                    { y: range },
                    {
                        y: -range,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: wrap,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            });
        },
        { scope: ref }
    );

    return ref;
}
