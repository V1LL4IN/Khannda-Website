'use client';

// useRevealGroup — sistema de reveals de mosaicist: los descendientes
// [data-reveal] del grupo entran con y:2em→0 + fade escalonado al hacer
// scroll (una vez). Si el grupo no tiene hijos [data-reveal], se anima a sí
// mismo como unidad. El estado oculto se aplica SOLO por JS (gsap.set):
// sin JS / con reduced-motion todo el contenido queda visible.

import { useRef } from 'react';
import { gsap, useGSAP } from './gsap';
import { REVEAL, MM_MOTION_OK } from './tokens';

export interface RevealGroupOptions {
    stagger?: number;
    distance?: string | number;
    start?: string;
    duration?: number;
    delay?: number;
}

export function useRevealGroup<T extends HTMLElement = HTMLDivElement>(
    opts: RevealGroupOptions = {}
) {
    const ref = useRef<T>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            const mm = gsap.matchMedia();

            mm.add(MM_MOTION_OK, () => {
                // Solo los items cuyo grupo más cercano es ESTE (permite anidar)
                const items = gsap.utils
                    .toArray<HTMLElement>('[data-reveal]', el)
                    .filter((n) => n.parentElement?.closest('[data-reveal-group]') === el);

                const targets = items.length ? items : [el];

                gsap.set(targets, {
                    autoAlpha: 0,
                    y: opts.distance ?? REVEAL.distance,
                });
                gsap.to(targets, {
                    autoAlpha: 1,
                    y: 0,
                    duration: opts.duration ?? REVEAL.duration,
                    ease: REVEAL.ease,
                    stagger: opts.stagger ?? REVEAL.stagger,
                    delay: opts.delay ?? 0,
                    scrollTrigger: {
                        trigger: el,
                        start: opts.start ?? REVEAL.start,
                        once: true,
                    },
                });
            });
        },
        { scope: ref }
    );

    return ref;
}
