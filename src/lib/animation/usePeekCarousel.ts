'use client';

// usePeekCarousel — carrusel "asomado": la slide activa ocupa casi todo el
// ancho y la siguiente ya se ve a la derecha. Arrastre (Draggable sobre un
// proxy), swipe horizontal de trackpad y flechas; snap por índice y bucle
// infinito recolocando cada slide con wrap (sin clones: cada bio vive en el
// DOM una sola vez). El layout base es una fila con scroll-snap nativo, que
// queda como fallback no-JS / reduced-motion.

import { useRef, useCallback, useState } from 'react';
import { gsap, useGSAP } from './gsap';
import { PEEK, MM_MOTION_OK } from './tokens';
import { Draggable } from './gsap-draggable';

const DRAG_THRESHOLD_PX = 50;
const WHEEL_SETTLE_S = 0.12;

export function usePeekCarousel<T extends HTMLElement = HTMLDivElement>() {
    const rootRef = useRef<T>(null);
    const goRef = useRef<(dir: number) => void>(() => {});
    const [active, setActive] = useState(0);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;
            const slides = gsap.utils.toArray<HTMLElement>('[data-peek-slide]', root);
            const total = slides.length;
            if (total < 2) return;

            // Distancia entre slides (ancho + gap). offsetLeft ignora transforms.
            const measure = () => slides[1].offsetLeft - slides[0].offsetLeft;

            // Fallback: scroll-snap nativo; solo sincronizamos el índice activo.
            const native = () => {
                const onScroll = () => {
                    const i = Math.round(root.scrollLeft / measure());
                    setActive(gsap.utils.clamp(0, total - 1, i));
                };
                root.addEventListener('scroll', onScroll, { passive: true });
                goRef.current = (dir) => root.scrollBy({ left: dir * measure() });
                return () => {
                    root.removeEventListener('scroll', onScroll);
                    goRef.current = () => {};
                };
            };

            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: reduce)', native);

            mm.add(MM_MOTION_OK, () => {
                // El bucle necesita al menos una slide oculta a cada lado.
                if (total < 3) return native();

                let step = measure();
                // pos: posición continua en unidades de slide, sin acotar.
                const state = { pos: 0 };
                let startPos = 0;
                let last = -1;

                root.scrollLeft = 0;
                gsap.set(root, { overflow: 'visible' });

                const wrapRel = gsap.utils.wrap(-1.5, total - 1.5);
                const wrapIdx = gsap.utils.wrap(0, total);

                const render = () => {
                    slides.forEach((slide, i) => {
                        gsap.set(slide, { x: (wrapRel(i - state.pos) - i) * step });
                    });
                    const current = wrapIdx(Math.round(state.pos));
                    if (current !== last) {
                        last = current;
                        setActive(current);
                    }
                };

                const goTo = (index: number) => {
                    gsap.to(state, {
                        pos: index,
                        duration: PEEK.duration,
                        ease: PEEK.ease,
                        overwrite: true,
                        onUpdate: render,
                    });
                };
                goRef.current = (dir) => goTo(Math.round(state.pos) + dir);
                render();

                // Arrastre: las slides siguen al puntero y al soltar hacen snap.
                const proxy = document.createElement('div');
                root.setAttribute('data-drag-status', 'grab');
                const drag = Draggable.create(proxy, {
                    type: 'x',
                    trigger: root,
                    onPress() {
                        gsap.killTweensOf(state);
                        gsap.set(proxy, { x: 0 });
                        this.update();
                        startPos = state.pos;
                        root.setAttribute('data-drag-status', 'grabbing');
                    },
                    onDrag() {
                        state.pos = startPos - this.x / step;
                        render();
                    },
                    onRelease() {
                        root.setAttribute('data-drag-status', 'grab');
                        const from = Math.round(startPos);
                        let target = Math.round(state.pos);
                        // Un flick corto también cuenta como "siguiente".
                        if (target === from && Math.abs(this.x) > DRAG_THRESHOLD_PX) {
                            target = from + (this.x < 0 ? 1 : -1);
                        }
                        goTo(target);
                    },
                })[0];

                // Swipe horizontal de trackpad / shift+rueda.
                let settle: gsap.core.Tween | null = null;
                const onWheel = (e: WheelEvent) => {
                    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
                    e.preventDefault();
                    gsap.killTweensOf(state);
                    state.pos += e.deltaX / step;
                    render();
                    settle?.kill();
                    settle = gsap.delayedCall(WHEEL_SETTLE_S, () => goTo(Math.round(state.pos)));
                };
                root.addEventListener('wheel', onWheel, { passive: false });

                const ro = new ResizeObserver(() => {
                    step = measure();
                    render();
                });
                ro.observe(root);

                return () => {
                    ro.disconnect();
                    root.removeEventListener('wheel', onWheel);
                    settle?.kill();
                    gsap.killTweensOf(state);
                    drag.kill();
                    root.removeAttribute('data-drag-status');
                    goRef.current = () => {};
                    setActive(0);
                };
            });
        },
        { scope: rootRef }
    );

    const prev = useCallback(() => goRef.current(-1), []);
    const next = useCallback(() => goRef.current(1), []);

    return { rootRef, prev, next, active };
}
