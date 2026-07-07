'use client';

// useFlickCards — el deck arrastrable de mosaicist: cards apiladas en abanico
// (xPercent ±25/±45, rotación ±10/±15, scale .9/.8) que se recolocan con
// elastic.out al arrastrar (umbral) o con flechas. El layout base (grid) es el
// fallback no-JS/reduced-motion: la conversión a deck es 100% gsap.set dentro
// de matchMedia, así que se revierte sola.

import { useRef, useCallback } from 'react';
import { gsap, useGSAP } from './gsap';
import { FLICK, MM_MOTION_OK } from './tokens';
import { Draggable } from './gsap-draggable';

const DRAG_THRESHOLD_PX = 60;

export function useFlickCards<T extends HTMLElement = HTMLDivElement>() {
    const rootRef = useRef<T>(null);
    const goRef = useRef<(dir: number) => void>(() => {});

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            const mm = gsap.matchMedia();

            // Deck solo en tablet+ : en móvil el grid 2×2 muestra a los 4 de
            // un vistazo (mejor para escanear) y es el fallback no-JS.
            mm.add(`(min-width: 768px) and ${MM_MOTION_OK}`, () => {
                const cards = gsap.utils.toArray<HTMLElement>('[data-flick-card]', root);
                const total = cards.length;
                if (total < 3) return;
                let active = 0;

                // Conversión grid → deck (todo por gsap.set: revert automático)
                const maxH = Math.max(...cards.map((c) => c.offsetHeight));
                const cardW = Math.min(360, window.innerWidth * 0.72);
                gsap.set(root, { position: 'relative', height: maxH + 48 });
                gsap.set(cards, {
                    position: 'absolute',
                    top: 24,
                    left: '50%',
                    width: cardW,
                    xPercent: -50,
                });

                // Posición en el abanico según distancia circular al activo
                const config = (i: number) => {
                    let diff = i - active;
                    if (diff > total / 2) diff -= total;
                    else if (diff < -total / 2) diff += total;
                    switch (diff) {
                        case 0: return { x: 0, y: 0, rot: 0, s: 1, o: 1, z: 5 };
                        case 1: return { x: 25, y: 1, rot: 10, s: 0.9, o: 1, z: 4 };
                        case -1: return { x: -25, y: 1, rot: -10, s: 0.9, o: 1, z: 4 };
                        case 2: return { x: 45, y: 5, rot: 15, s: 0.8, o: 1, z: 3 };
                        case -2: return { x: -45, y: 5, rot: -15, s: 0.8, o: 1, z: 3 };
                        default: {
                            const dir = diff > 0 ? 1 : -1;
                            return { x: 55 * dir, y: 5, rot: 20 * dir, s: 0.6, o: 0, z: 2 };
                        }
                    }
                };

                const render = (instant = false) => {
                    cards.forEach((card, i) => {
                        const c = config(i);
                        card.setAttribute('data-flick-status', c.x === 0 ? 'active' : c.o === 0 ? 'hidden' : 'side');
                        gsap.to(card, {
                            duration: instant ? 0 : FLICK.duration,
                            ease: FLICK.ease,
                            xPercent: -50 + c.x,
                            yPercent: c.y,
                            rotation: c.rot,
                            scale: c.s,
                            autoAlpha: c.o,
                            zIndex: c.z,
                        });
                    });
                };

                const go = (dir: number) => {
                    active = gsap.utils.wrap(0, total, active + dir);
                    render();
                };
                goRef.current = go;
                render(true);

                // Drag por umbral sobre un proxy (las cards reales solo se
                // tweenean por índice — nunca siguen el puntero directamente)
                const proxy = document.createElement('div');
                root.setAttribute('data-flick-drag-status', 'grab');
                const drag = Draggable.create(proxy, {
                    type: 'x',
                    trigger: root,
                    onPress() {
                        root.setAttribute('data-flick-drag-status', 'grabbing');
                    },
                    onRelease() {
                        root.setAttribute('data-flick-drag-status', 'grab');
                    },
                    onDragEnd() {
                        if (Math.abs(this.x) > DRAG_THRESHOLD_PX) go(this.x < 0 ? 1 : -1);
                        gsap.set(proxy, { x: 0 });
                    },
                })[0];

                return () => {
                    drag.kill();
                    root.removeAttribute('data-flick-drag-status');
                    cards.forEach((c) => c.removeAttribute('data-flick-status'));
                    goRef.current = () => {};
                };
            });
        },
        { scope: rootRef }
    );

    const prev = useCallback(() => goRef.current(-1), []);
    const next = useCallback(() => goRef.current(1), []);

    return { rootRef, prev, next };
}
