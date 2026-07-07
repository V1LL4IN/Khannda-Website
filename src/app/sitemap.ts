import type { MetadataRoute } from 'next';
import { l, LANGS } from '@/lib/seo/site';

// Registro central de rutas. lastModified es una fecha LITERAL que solo se
// actualiza al editar el contenido de esa página — nunca new Date(): una
// fecha que cambia en cada build le dice a Google que el contenido "cambió"
// cuando no lo hizo.
const ROUTES = [
    { path: '', lastModified: '2026-07-06', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/soluciones', lastModified: '2026-07-02', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/proyectos', lastModified: '2026-07-02', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tecnologia', lastModified: '2026-07-02', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contacto', lastModified: '2026-07-02', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/terminos', lastModified: '2026-07-02', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/privacidad', lastModified: '2026-07-02', changeFrequency: 'yearly' as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.flatMap((route) =>
        LANGS.map((lang) => ({
            url: l(lang, route.path),
            lastModified: route.lastModified,
            changeFrequency: route.changeFrequency,
            priority: lang === 'es' ? route.priority : Math.max(route.priority - 0.1, 0.2),
            alternates: {
                languages: {
                    es: l('es', route.path),
                    en: l('en', route.path),
                },
            },
        }))
    );
}
