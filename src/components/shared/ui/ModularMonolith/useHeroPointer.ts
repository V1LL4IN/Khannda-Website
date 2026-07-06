'use client';

// useHeroPointer.ts — puntero global → NDC relativo al contenedor del canvas.
// Se escucha en window porque el canvas lleva pointer-events:none (garantía
// estructural de que nunca bloquea los CTAs). Todo vive en refs: cero
// re-renders por movimiento.

import { useEffect, useMemo, useRef } from 'react';

export interface PointerState {
    /** NDC [-1, 1] relativo al rect del contenedor. */
    x: number;
    y: number;
    /** true si el puntero está dentro del rect del contenedor. */
    inside: boolean;
    /** timestamp (ms) del último movimiento real — gobierna el sweep autónomo. */
    lastMoveTs: number;
    /** Pulsos de tap/click: {x, y} en NDC + t0 (ms). */
    pulses: Array<{ x: number; y: number; t0: number }>;
}

export function useHeroPointer(
    container: React.RefObject<HTMLElement | null>,
    onActivity: () => void
) {
    const state = useRef<PointerState>({
        x: 0,
        y: 0,
        inside: false,
        lastMoveTs: 0,
        pulses: [],
    });
    const activityRef = useRef(onActivity);
    activityRef.current = onActivity;

    useEffect(() => {
        const el = container.current;
        if (!el) return;

        let rect = el.getBoundingClientRect();
        let rectDirty = false;
        const refreshRect = () => {
            rectDirty = true;
        };

        const toNdc = (clientX: number, clientY: number) => {
            if (rectDirty) {
                rect = el.getBoundingClientRect();
                rectDirty = false;
            }
            const x = ((clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
            return { x, y, inside: x >= -1.15 && x <= 1.15 && y >= -1.15 && y <= 1.15 };
        };

        const onMove = (e: PointerEvent) => {
            const ndc = toNdc(e.clientX, e.clientY);
            const s = state.current;
            s.x = ndc.x;
            s.y = ndc.y;
            s.inside = ndc.inside;
            s.lastMoveTs = performance.now();
            if (ndc.inside) activityRef.current();
        };

        const onDown = (e: PointerEvent) => {
            const ndc = toNdc(e.clientX, e.clientY);
            if (!ndc.inside) return;
            const s = state.current;
            s.pulses.push({ x: ndc.x, y: ndc.y, t0: performance.now() });
            if (s.pulses.length > 4) s.pulses.shift();
            activityRef.current();
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('resize', refreshRect);
        window.addEventListener('scroll', refreshRect, { passive: true });

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('resize', refreshRect);
            window.removeEventListener('scroll', refreshRect);
        };
    }, [container]);

    return useMemo(() => state, []);
}
