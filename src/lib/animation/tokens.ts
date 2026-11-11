// lib/animation/tokens.ts — valores de motion extraídos del código GSAP real
// de mosaicist.com (la referencia). Única fuente de verdad: los hooks leen de
// aquí para que todo el sitio comparta el mismo lenguaje de movimiento.

/** Reveals de contenido al scroll (grupos con stagger) */
export const REVEAL = {
    duration: 0.8,
    ease: 'power4.inOut',
    distance: '2em',
    stagger: 0.08,
    start: 'top 85%',
} as const;

/** Swap de visuales en la sección pinned (clip-path) */
export const SWAP = {
    duration: 0.75,
    ease: 'power4.inOut',
} as const;

/** Carrusel asomado (snap tras arrastre / flechas) */
export const PEEK = {
    duration: 0.9,
    ease: 'expo.out',
} as const;

/** Cursor custom (lag del follower) */
export const CURSOR = {
    duration: 0.6,
    ease: 'power3',
} as const;

/** Reveal del hero (líneas enmascaradas) */
export const HERO = {
    duration: 0.9,
    ease: 'power4.out',
    stagger: 0.09,
    delay: 0.1,
} as const;

/** Query de matchMedia: solo animar si el usuario no pide reduced-motion */
export const MM_MOTION_OK = '(prefers-reduced-motion: no-preference)';
