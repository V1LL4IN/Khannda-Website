// lib/fonts.ts — única fuente de verdad tipográfica, consumida por BaseLayout.
// Montserrat (display): sans geométrica del wordmark de Khannda — se usa
// thin/extralight en uppercase con tracking amplio para los títulos gigantes.
import { Montserrat, Inter, Geist_Mono } from 'next/font/google';

export const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
    display: 'swap',
});
