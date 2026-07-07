'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/lib/animation/useParallax';

interface SeparatorWordProps {
    word: string;
    align?: 'left' | 'right';
    /** Única palabra por página con el tinte púrpura de marca */
    tint?: boolean;
}

// Palabra separadora gigante: recortada por la banda (el overflow-hidden es
// lo que evita el scroll horizontal a 20vw) y con parallax scrubbed vía
// ScrollTrigger (transform-only). Decorativa: aria-hidden.
const SeparatorWord: React.FC<SeparatorWordProps> = ({
    word,
    align = 'left',
    tint = false,
}) => {
    const wordRef = useRef<HTMLSpanElement>(null);
    const bandRef = useParallax<HTMLDivElement>(wordRef, 24);

    return (
        <div
            ref={bandRef}
            aria-hidden="true"
            className="relative overflow-hidden h-[0.7em] text-separator select-none pointer-events-none"
        >
            <span
                ref={wordRef}
                className={cn(
                    'absolute top-[-0.08em] font-display font-extralight uppercase whitespace-nowrap leading-[0.9]',
                    align === 'left' ? 'left-[-4vw]' : 'right-[-6vw]',
                    tint ? 'text-[var(--separator-tint)]' : 'text-[var(--separator-ink)]'
                )}
            >
                {word}
            </span>
        </div>
    );
};

export default SeparatorWord;
