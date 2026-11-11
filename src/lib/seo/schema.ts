// lib/seo/schema.ts — builders de JSON-LD por idioma.
// Leen de los diccionarios i18n para que el schema y el texto visible sean
// idénticos (requisito de Google para FAQ y señal de consistencia para LLMs).

import { es, en } from '@/lib/i18n';
import { TEAM } from '@/lib/constants/team';
import { PAGES } from './metadata';
import { SITE_URL, CONTACT_PHONE, SOCIAL_PROFILES, l, type Lang } from './site';

const ORG_ID = `${SITE_URL}/#org`;
const dict = (lang: Lang) => (lang === 'es' ? es : en);

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

// Mercados como entidades (no códigos sueltos: 'LATAM' no es un código ISO).
const areaServed = (lang: Lang) => [
    { '@type': 'Country', name: 'Ecuador' },
    { '@type': 'Place', name: lang === 'es' ? 'Latinoamérica' : 'Latin America' },
    { '@type': 'Country', name: lang === 'es' ? 'Estados Unidos' : 'United States' },
];

// Temas en los que Khannda es fuente: servicios + el stack que el sitio
// declara en el FAQ y en /tecnologia. Debe coincidir con el texto visible.
const KNOWS_ABOUT = {
    es: ['Desarrollo de software a medida', 'Automatización de procesos con n8n', 'Aplicaciones móviles', 'Consultoría tecnológica', 'Software para fintech y cooperativas'],
    en: ['Custom software development', 'Process automation with n8n', 'Mobile applications', 'Technology consulting', 'Software for fintech and credit unions'],
} as const;
const STACK = ['Next.js', 'React', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'n8n'];

function organization(lang: Lang) {
    const t = dict(lang);
    return {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: 'Khannda',
        url: SITE_URL,
        logo: `${SITE_URL}/logo-khannda.png`,
        image: `${SITE_URL}/og-image.jpg`,
        telephone: CONTACT_PHONE,
        foundingDate: '2019',
        description: PAGES[''][lang].description,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Quito',
            addressCountry: 'EC',
        },
        areaServed: areaServed(lang),
        knowsAbout: [...KNOWS_ABOUT[lang], ...STACK],
        // Mismas personas y cargos que la sección de equipo de la home
        employee: TEAM.map((member) => ({
            '@type': 'Person',
            name: member.name,
            jobTitle: t.team.members[member.id].role,
            worksFor: { '@id': ORG_ID },
        })),
        ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
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

/** Los 3 servicios de /soluciones como nodos Service (cada uno con su ancla). */
export function solutionsServices(lang: Lang) {
    const topics = dict(lang).solutions.topics;
    const page = l(lang, '/soluciones');
    return {
        '@context': 'https://schema.org',
        '@graph': (['automation', 'development', 'consulting'] as const).map((key) => ({
            '@type': 'Service',
            '@id': `${page}#${key}`,
            url: `${page}#${key}`,
            name: topics[key].cardTitle,
            serviceType: topics[key].title,
            description: topics[key].description,
            provider: { '@id': ORG_ID },
            areaServed: areaServed(lang),
            inLanguage: lang,
        })),
    };
}

// Captura de cada caso (misma imagen que muestra el panel en /proyectos)
const CASE_IMAGES = { finance: 'coop', fitness: 'gym', altus: 'altus' } as const;

/** Casos de éxito de /proyectos. */
export function projectsItemList(lang: Lang) {
    const t = dict(lang);
    const page = l(lang, '/proyectos');
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${page}/#cases`,
                url: page,
                name: lang === 'es' ? 'Casos de Éxito' : 'Case Studies',
                inLanguage: lang,
                mainEntity: {
                    '@type': 'ItemList',
                    itemListElement: (['finance', 'fitness', 'altus'] as const).map((key, i) => {
                        const c = t.projects.showcase[key];
                        return {
                            '@type': 'ListItem',
                            position: i + 1,
                            item: {
                                '@type': 'CreativeWork',
                                // id del <article> del caso en la página
                                url: `${page}#caso-${key}`,
                                name: c.title,
                                abstract: `${c.challenge} ${c.solution}`,
                                keywords: [c.sector, ...c.stack].join(', '),
                                image: `${SITE_URL}/projects/${CASE_IMAGES[key]}-desktop.webp`,
                                creator: { '@id': ORG_ID },
                                inLanguage: lang,
                            },
                        };
                    }),
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
