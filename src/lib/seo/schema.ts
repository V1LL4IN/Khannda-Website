// lib/seo/schema.ts — builders de JSON-LD por idioma.
// Leen de los diccionarios i18n para que el schema y el texto visible sean
// idénticos (requisito de Google para FAQ y señal de consistencia para LLMs).

import { es, en } from '@/lib/i18n';
import { SITE_URL, CONTACT_PHONE, l, type Lang } from './site';

const ORG_ID = `${SITE_URL}/#org`;
const dict = (lang: Lang) => (lang === 'es' ? es : en);

const DESCRIPTION = {
    es: 'Desarrollo de software a medida en Ecuador para toda LATAM: aplicaciones web, móviles, automatización con n8n y consultoría tecnológica. Más de 50 sistemas en producción desde 2019.',
    en: 'Custom software development in Ecuador for LATAM and the US: web and mobile applications, n8n automation and technology consulting. 50+ systems in production since 2019.',
} as const;

const SERVICE_NAMES = {
    es: ['Desarrollo Web a Medida', 'Aplicaciones Móviles', 'Automatización de Procesos (n8n)', 'Consultoría Tecnológica'],
    en: ['Custom Web Development', 'Mobile Applications', 'Process Automation (n8n)', 'Technology Consulting'],
} as const;

const SERVICE_DESCRIPTIONS = {
    es: [
        'Aplicaciones web a medida con tecnologías modernas.',
        'Apps móviles nativas y multiplataforma con React Native.',
        'Flujos de trabajo automatizados con n8n y más de 400 integraciones.',
        'Análisis, optimización y transformación digital de procesos empresariales.',
    ],
    en: [
        'Custom web applications built with modern technologies.',
        'Native and cross-platform mobile apps with React Native.',
        'Automated workflows with n8n and 400+ integrations.',
        'Analysis, optimization and digital transformation of business processes.',
    ],
} as const;

function organization(lang: Lang) {
    return {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: 'Khannda',
        url: SITE_URL,
        logo: `${SITE_URL}/logo-khannda.png`,
        foundingDate: '2019',
        description: DESCRIPTION[lang],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Quito',
            addressCountry: 'EC',
        },
        areaServed: ['EC', 'LATAM', 'US'],
        priceRange: '$$',
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: CONTACT_PHONE,
            contactType: 'sales',
            availableLanguage: ['Spanish', 'English'],
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: lang === 'es' ? 'Servicios' : 'Services',
            itemListElement: SERVICE_NAMES[lang].map((name, i) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name,
                    description: SERVICE_DESCRIPTIONS[lang][i],
                },
            })),
        },
    };
}

/** @graph base (Organization + WebSite) — se inyecta en el root layout de cada idioma. */
export function buildSiteGraph(lang: Lang) {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            organization(lang),
            {
                '@type': 'WebSite',
                '@id': `${l(lang, '')}/#website`,
                url: l(lang, ''),
                name: 'Khannda',
                inLanguage: lang,
                publisher: { '@id': ORG_ID },
            },
        ],
    };
}

/** FAQPage — solo en la home (donde vive la sección FAQ visible). */
export function faqPage(lang: Lang) {
    const t = dict(lang);
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${l(lang, '')}/#faq`,
        inLanguage: lang,
        mainEntity: t.faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
}

/** FAQPage de /soluciones — exactamente las 2 preguntas visibles al pie
 *  de esa página (índices 2 y 3 del FAQ global, ver SolutionsSection). */
export function solutionsFaq(lang: Lang) {
    const items = dict(lang).faq.items;
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${l(lang, '/soluciones')}/#faq`,
        inLanguage: lang,
        mainEntity: [items[2], items[3]].map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };
}

/** BreadcrumbList para subpáginas. */
export function breadcrumb(lang: Lang, items: Array<{ name: string; path: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: l(lang, '') },
            ...items.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 2,
                name: item.name,
                item: l(lang, item.path),
            })),
        ],
    };
}

/** Los 3 servicios de /soluciones como nodos Service. */
export function solutionsServices(lang: Lang) {
    const topics = dict(lang).solutions.topics;
    return {
        '@context': 'https://schema.org',
        '@graph': [topics.automation, topics.development, topics.consulting].map((topic) => ({
            '@type': 'Service',
            name: topic.cardTitle,
            description: topic.description,
            provider: { '@id': ORG_ID },
            areaServed: ['EC', 'LATAM', 'US'],
            inLanguage: lang,
        })),
    };
}

/** Casos de éxito de /proyectos. */
export function projectsItemList(lang: Lang) {
    const t = dict(lang);
    const cases = [t.projects.showcase.finance, t.projects.showcase.fitness, t.projects.showcase.altus];
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${l(lang, '/proyectos')}/#cases`,
                url: l(lang, '/proyectos'),
                name: lang === 'es' ? 'Casos de Éxito' : 'Case Studies',
                inLanguage: lang,
                mainEntity: {
                    '@type': 'ItemList',
                    itemListElement: cases.map((c, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        item: {
                            '@type': 'CreativeWork',
                            name: c.title,
                            abstract: `${c.challenge} ${c.solution}`,
                            keywords: c.sector,
                            creator: { '@id': ORG_ID },
                            inLanguage: lang,
                        },
                    })),
                },
            },
        ],
    };
}

/** ContactPage para /contacto. */
export function contactPage(lang: Lang) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${l(lang, '/contacto')}/#contact`,
        url: l(lang, '/contacto'),
        name: lang === 'es' ? 'Contacto — Khannda' : 'Contact — Khannda',
        inLanguage: lang,
        mainEntity: { '@id': ORG_ID },
    };
}
