'use client';

// CustomCursor — follower con lag elástico (mosaicist): un punto que sigue al
// mouse con quickTo(0.6s power3) y se transforma en pill etiquetada sobre los
// elementos con data-cursor (el valor del atributo ES la etiqueta, así el
// texto es bilingüe desde el sitio que lo usa). Se oculta en pointer:coarse y
// reduced-motion por CSS (sin branch de hidratación). Montado en BaseLayout.

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/animation/gsap';
import { CURSOR } from '@/lib/animation/tokens';

const INTERACTIVE = 'a, button, [data-cursor], [role="button"], input, textarea, select, label';

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const el = dotRef.current;
            const label = labelRef.current;
            if (!el || !label) return;

            gsap.set(el, { xPercent: -50, yPercent: -50 });
            const xTo = gsap.quickTo(el, 'x', CURSOR);
            const yTo = gsap.quickTo(el, 'y', CURSOR);

            const move = (e: PointerEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
            };
            const over = (e: Event) => {
                const target = (e.target as Element)?.closest?.(INTERACTIVE) as HTMLElement | null;
                if (!target) {
                    el.dataset.state = '';
                    label.textContent = '';
                    return;
                }
                const text = target.getAttribute('data-cursor');
                if (text) {
                    el.dataset.state = 'label';
                    label.textContent = text;
                } else {
                    el.dataset.state = 'hover';
                    label.textContent = '';
                }
            };

            window.addEventListener('pointermove', move);
            document.addEventListener('mouseover', over);
            return () => {
                window.removeEventListener('pointermove', move);
                document.removeEventListener('mouseover', over);
            };
        },
        { scope: dotRef }
    );

    return (
        <div ref={dotRef} aria-hidden="true" className="cursor-follower" data-state="">
            <span ref={labelRef} className="cursor-follower__label" />
        </div>
    );
}

export default CustomCursor;
