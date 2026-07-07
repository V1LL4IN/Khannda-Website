// lib/animation/gsap.ts — hub de registro único de GSAP.
// TODO módulo que anime importa gsap/plugins SOLO desde aquí: el guard de
// window hace el registro SSR-safe y la config se aplica una sola vez.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
    // El resize de la URL-bar en iOS dispara refresh ruidosos
    ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
