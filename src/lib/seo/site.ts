// lib/seo/site.ts — constantes y helpers de URL/hreflang.
// El español vive en la raíz (khannda.com/) y el inglés bajo /en.

export const SITE_URL = 'https://www.khannda.com';

export type Lang = 'es' | 'en';

export const LANGS: Lang[] = ['es', 'en'];

/** URL absoluta de una ruta en un idioma. `path` empieza con '/' o es ''. */
export const l = (lang: Lang, path: string) =>
    `${SITE_URL}${lang === 'en' ? '/en' : ''}${path}`;

/**
 * Mapa hreflang para `alternates.languages`. x-default apunta al español:
 * LATAM es la audiencia primaria del negocio.
 */
export const altLanguages = (path: string) => ({
    es: l('es', path),
    en: l('en', path),
    'x-default': l('es', path),
});

export const OG_IMAGE = {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Khannda - Desarrollo de Software a Medida',
} as const;

export const CONTACT_PHONE = '+593995498636';
