'use client';

// useStickyFeature — la sección pinned de mosaicist: el wrap se fija
// (pin + scrub), las cards del stage cambian con clipPath inset(50%)→inset(0%)
// y los textos entrantes suben con stagger; barra de progreso scaleX scrubbed.
// Solo desktop + motion-ok: el layout base en flow (cards apiladas) es el
// fallback móvil/no-JS/reduced-motion, y como toda la conversión es gsap.set
// dentro de matchMedia, se revierte sola.
//
// Contrato de atributos dentro del root:
//   [data-sticky-pin]        wrap que se pinea
//   [data-sticky-stage]      contenedor de cards (flow → stack absoluto)
//   [data-sticky-item]       cada card (contenido canónico, opaca)
//   [data-sticky-text]       hijos de la card que animan y:±30
//   [data-sticky-menu-item]  items del índice izquierdo (data-active)
//   [data-sticky-progress]   barra de progreso (scaleX 0→1)

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { SWAP, MM_MOTION_OK } from './tokens';

const SCROLL_PER_STEP = '80%';

export function useStickyFeature<T extends HTMLElement = HTMLDivElement>() {
    const rootRef = useRef<T>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            const mm = gsap.matchMedia();

            mm.add(`(min-width: 1024px) and ${MM_MOTION_OK}`, () => {
                const pinEl = root.querySelector<HTMLElement>('[data-sticky-pin]');
                const stage = root.querySelector<HTMLElement>('[data-sticky-stage]');
                const bar = root.querySelector<HTMLElement>('[data-sticky-progress]');
                const items = gsap.utils.toArray<HTMLElement>('[data-sticky-item]', root);
                const menu = gsap.utils.toArray<HTMLElement>('[data-sticky-menu-item]', root);
                const count = items.length;
                if (!pinEl || !stage || count < 2) return;

                const getTexts = (el: HTMLElement) =>
                    gsap.utils.toArray<HTMLElement>('[data-sticky-text]', el);

                // Flow → stack absoluto (las cards son opacas: el clip revela
                // la de arriba sobre la anterior)
                const maxH = Math.max(...items.map((i) => i.offsetHeight));
                gsap.set(stage, { position: 'relative', height: maxH });
                items.forEach((item, i) => {
                    gsap.set(item, {
                        position: 'absolute',
                        inset: 0,
                        height: maxH,
                        zIndex: i + 1,
                        clipPath: i === 0 ? 'inset(0%)' : 'inset(50%)',
                    });
                });

                let current = 0;
                const setActive = (idx: number) => {
                    menu.forEach((m, i) =>
                        i === idx ? m.setAttribute('data-active', 'true') : m.removeAttribute('data-active')
                    );
                };
                setActive(0);

                // Estado ABSOLUTO por índice: items <= idx abiertos (inset 0%),
                // el resto cerrados (inset 50%). Es idempotente y robusto a
                // saltos de varios pasos (fling / scroll rápido) — nunca se
                // salta una capa. El item entrante anima además su texto.
                const applyIndex = (idx: number, animate: boolean) => {
                    items.forEach((item, i) => {
                        gsap.to(item, {
                            clipPath: i <= idx ? 'inset(0%)' : 'inset(50%)',
                            duration: animate ? SWAP.duration : 0,
                            ease: SWAP.ease,
                            overwrite: 'auto',
                        });
                    });
                    if (animate) {
                        gsap.fromTo(
                            getTexts(items[idx]),
                            { autoAlpha: 0, y: 30 },
                            { autoAlpha: 1, y: 0, duration: SWAP.duration, ease: 'power4.out', stagger: 0.1, overwrite: 'auto' }
                        );
                    }
                    setActive(idx);
                };

                const steps = count - 1;
                const SCROLL_AMOUNT = parseFloat(SCROLL_PER_STEP) / 100; // % útil del recorrido
                ScrollTrigger.create({
                    trigger: pinEl,
                    start: 'center center',
                    end: () => `+=${steps * 100}%`,
                    pin: true,
                    scrub: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Reserva el último tramo para que la 5ª capa "respire"
                        const p = Math.min(self.progress, SCROLL_AMOUNT) / SCROLL_AMOUNT;
                        if (bar) gsap.set(bar, { scaleX: p });
                        const idx = Math.max(0, Math.min(steps, Math.floor(p * steps + 1e-6)));
                        if (idx !== current) {
                            applyIndex(idx, true);
                            current = idx;
                        }
                    },
                });

                return () => {
                    menu.forEach((m) => m.removeAttribute('data-active'));
                };
            });
        },
        { scope: rootRef }
    );

    return rootRef;
}
