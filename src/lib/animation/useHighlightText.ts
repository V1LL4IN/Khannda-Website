'use client';

// useHighlightText — el "texto que se ilumina mientras lees" de mosaicist:
// SplitText por caracteres, opacidad 0.4→1 escalonada y SCRUBBED al scroll.
// Sin riesgo FOUC: el texto SSR está a opacidad completa; JS solo lo atenúa
// cuando aún está below-the-fold. aria por defecto conserva la frase entera
// como aria-label.

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from './gsap';
import { MM_MOTION_OK } from './tokens';

export function useHighlightText<T extends HTMLElement = HTMLParagraphElement>(
    opts: { fade?: number; start?: string; end?: string } = {}
) {
    const ref = useRef<T>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            const mm = gsap.matchMedia();

            mm.add(MM_MOTION_OK, () => {
                const split = SplitText.create(el, {
                    type: 'words,chars',
                    autoSplit: true,
                    onSplit: (self) =>
                        gsap.fromTo(
                            self.chars,
                            { opacity: opts.fade ?? 0.25 },
                            {
                                opacity: 1,
                                ease: 'none',
                                stagger: 0.05,
                                scrollTrigger: {
                                    trigger: el,
                                    start: opts.start ?? 'top 90%',
                                    end: opts.end ?? 'center 40%',
                                    scrub: true,
                                },
                            }
                        ),
                });
                return () => split.revert();
            });
        },
        { scope: ref }
    );

    return ref;
}
