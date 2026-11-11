// lib/seo/metadata.ts — fuente única del título y la descripción de cada
// página, y builders de Metadata.
//
// Next NO fusiona openGraph/twitter con los del layout raíz: el hijo los
// reemplaza enteros (y si no los declara, hereda los de la home). Por eso
// cada página genera aquí su bloque completo: sin esto, las subpáginas
// salían con el twitter:title y el og:url de la home.
//
// Límites: título completo ≤ 60 caracteres, descripción ≤ 155 — lo que
// Google muestra sin cortar.

import type { Metadata } from 'next';
import { altLanguages, l, ogImage, SITE_URL, type Lang } from './site';

const BRAND = 'Khannda';
const LOCALE = { es: 'es_EC', en: 'en_US' } as const;

interface PageSeo {
    /** Sin marca: el template del layout raíz añade " | Khannda". */
    title: string;
    description: string;
}

/**
 * Registro de páginas. `lastModified` es una fecha LITERAL que solo se
 * actualiza al editar el contenido de esa página — nunca new Date(): una
 * fecha que cambia en cada build le dice a Google que el contenido "cambió"
 * cuando no lo hizo.
 */
export const PAGES = {
    '': {
        lastModified: '2026-11-11',
        changeFrequency: 'weekly',
        priority: 1,
        es: {
            title: 'Desarrollo de Software a Medida en Ecuador',
            description: 'Desarrollo de software a medida en Ecuador para LATAM y EE. UU.: web, móvil y automatización con n8n. Más de 50 sistemas en producción desde 2019.',
        },
        en: {
            title: 'Custom Software Development in Ecuador',
            description: 'Nearshore custom software development from Ecuador for LATAM and the US: web, mobile and n8n automation. 50+ systems in production since 2019.',
        },
    },
    '/soluciones': {
        lastModified: '2026-11-11',
        changeFrequency: 'monthly',
        priority: 0.9,
        es: {
            title: 'Soluciones de Software y Automatización con n8n',
            description: 'Automatización de procesos con n8n, desarrollo de software a medida y consultoría tecnológica en Ecuador para toda LATAM. Alcance cerrado y código tuyo.',
        },
        en: {
            title: 'Software Solutions & n8n Automation',
            description: 'n8n process automation, custom software development and technology consulting from Ecuador for LATAM and the US. Fixed scope, and you own the code.',
        },
    },
    '/proyectos': {
        lastModified: '2026-11-11',
        changeFrequency: 'monthly',
        priority: 0.8,
        es: {
            title: 'Casos de Éxito de Software a Medida',
            description: 'Casos reales de software a medida: sistema financiero para una cooperativa de ahorro y crédito, gestión de gimnasio con n8n y sitio corporativo en EE. UU.',
        },
        en: {
            title: 'Custom Software Case Studies',
            description: 'Real custom software case studies: a financial system for a credit union, gym management with n8n automation and a corporate website for a US firm.',
        },
    },
    '/tecnologia': {
        lastModified: '2026-11-11',
        changeFrequency: 'monthly',
        priority: 0.7,
        es: {
            title: 'Stack Tecnológico: Next.js, React, Node.js y n8n',
            description: 'El stack con el que construimos tu software: Next.js, React, TypeScript, Node.js, PostgreSQL, AWS y n8n. Elegido por rendimiento, seguridad y escala.',
        },
        en: {
            title: 'Technology Stack: Next.js, React, Node.js & n8n',
            description: 'The stack we build your software with: Next.js, React, TypeScript, Node.js, PostgreSQL, AWS and n8n. Chosen for performance, security and scale.',
        },
    },
    '/contacto': {
        lastModified: '2026-11-11',
        changeFrequency: 'monthly',
        priority: 0.8,
        es: {
            title: 'Contacto — Agenda un Diagnóstico Gratuito',
            description: 'Agenda un diagnóstico gratuito de 30 minutos con Khannda o escríbenos por WhatsApp. Desarrollo de software a medida en Ecuador, en español e inglés.',
        },
        en: {
            title: 'Contact — Book a Free Assessment',
            description: 'Book a free 30-minute assessment with Khannda or message us on WhatsApp. Custom software development from Ecuador, in English and Spanish.',
        },
    },
    '/terminos': {
        lastModified: '2026-07-02',
        changeFrequency: 'yearly',
        priority: 0.3,
        es: {
            title: 'Términos de Servicio',
            description: 'Términos de servicio de Khannda: alcance de los servicios, propiedad intelectual del código, responsabilidad y jurisdicción.',
        },
        en: {
            title: 'Terms of Service',
            description: 'Khannda terms of service: scope of services, code intellectual property, liability and jurisdiction.',
        },
    },
    '/privacidad': {
        lastModified: '2026-07-02',
        changeFrequency: 'yearly',
        priority: 0.3,
        es: {
            title: 'Política de Privacidad',
            description: 'Política de privacidad de Khannda: qué datos recogemos, para qué y tus derechos según la Ley Orgánica de Protección de Datos Personales del Ecuador.',
        },
        en: {
            title: 'Privacy Policy',
            description: 'Khannda privacy policy: what data we collect, for what purpose, and your rights under Ecuador’s Organic Law on Personal Data Protection.',
        },
    },
} as const satisfies Record<
    string,
    {
        lastModified: string;
        changeFrequency: 'weekly' | 'monthly' | 'yearly';
        priority: number;
        es: PageSeo;
        en: PageSeo;
    }
>;

export type PagePath = keyof typeof PAGES;

/** Título completo tal como sale en la pestaña y en Google. */
const fullTitle = (lang: Lang, path: PagePath) => `${PAGES[path][lang].title} | ${BRAND}`;

/** Bloque compartido por todas las páginas: OG, Twitter, canonical y hreflang. */
function social(lang: Lang, path: PagePath): Pick<Metadata, 'openGraph' | 'twitter' | 'alternates'> {
    const { description } = PAGES[path][lang];
    const title = fullTitle(lang, path);
    const image = ogImage(lang);
    return {
        openGraph: {
            title,
            description,
            url: l(lang, path),
            siteName: BRAND,
            images: [image],
            locale: LOCALE[lang],
            alternateLocale: [LOCALE[lang === 'es' ? 'en' : 'es']],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image.url],
        },
        alternates: {
            canonical: l(lang, path),
            languages: altLanguages(path),
        },
    };
}

/** Metadata de una subpágina (layout de ruta). */
export function pageMetadata(lang: Lang, path: PagePath): Metadata {
    const { title, description } = PAGES[path][lang];
    return { title, description, ...social(lang, path) };
}

/** Metadata del root layout de cada idioma (incluye la de la home). */
export function rootMetadata(lang: Lang): Metadata {
    const verification = {
        ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
        // Bing alimenta la búsqueda de ChatGPT y Copilot
        ...(process.env.BING_SITE_VERIFICATION
            ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
            : {}),
    };

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: fullTitle(lang, ''),
            template: `%s | ${BRAND}`,
        },
        description: PAGES[''][lang].description,
        authors: [{ name: BRAND }],
        creator: BRAND,
        verification: Object.keys(verification).length ? verification : undefined,
        icons: {
            icon: [
                { url: '/icon-light.png', media: '(prefers-color-scheme: light)' },
                { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
            ],
        },
        ...social(lang, ''),
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}
