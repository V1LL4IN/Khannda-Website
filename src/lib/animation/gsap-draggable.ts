// lib/animation/gsap-draggable.ts — registro de Draggable aislado: solo lo
// importa usePeekCarousel, así el plugin cae en el chunk dinámico del Team y
// no en el bundle principal.
import { gsap } from './gsap';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Draggable);
}

export { Draggable };
