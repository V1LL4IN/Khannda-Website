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

const OG_ALT = {
    es: 'Khannda — Desarrollo de software a medida',
    en: 'Khannda — Custom software development',
} as const;

/** Imagen Open Graph con el texto alternativo en el idioma de la página. */
export const ogImage = (lang: Lang) => ({
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: OG_ALT[lang],
});

export const CONTACT_PHONE = '+593995498636';

/**
 * Perfiles públicos de Khannda (LinkedIn, Instagram, GitHub, Google Business
 * Profile…). Se publican como `sameAs` en el schema Organization: es la señal
 * con la que buscadores y asistentes de IA confirman que esos perfiles y este
 * sitio son la misma empresa. Vacío = no se emite `sameAs`.
 */
export const SOCIAL_PROFILES: string[] = [];
