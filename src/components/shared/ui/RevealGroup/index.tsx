'use client';

// RevealGroup — wrapper fino sobre useRevealGroup para el caso común (div).
// Marca los hijos a escalonar con data-reveal; sin hijos marcados, el grupo
// entra como unidad. Para elementos no-div (filas <a>/<article>) usa el hook
// directamente con un ref.

import React from 'react';
import { useRevealGroup, type RevealGroupOptions } from '@/lib/animation/useRevealGroup';

interface RevealGroupProps
    extends RevealGroupOptions,
        Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    children: React.ReactNode;
}

export function RevealGroup({
    stagger,
    distance,
    start,
    duration,
    delay,
    children,
    ...rest
}: RevealGroupProps) {
    const ref = useRevealGroup<HTMLDivElement>({ stagger, distance, start, duration, delay });
    return (
        <div ref={ref} data-reveal-group {...rest}>
            {children}
        </div>
    );
}

export default RevealGroup;
