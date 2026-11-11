import type { MetadataRoute } from 'next';
import { altLanguages, l, LANGS } from '@/lib/seo/site';
import { PAGES, type PagePath } from '@/lib/seo/metadata';

// Las rutas, su prioridad y su lastModified viven en el registro PAGES
// (lib/seo/metadata.ts), junto al título y la descripción de cada página.
export default function sitemap(): MetadataRoute.Sitemap {
    return (Object.keys(PAGES) as PagePath[]).flatMap((path) => {
        const page = PAGES[path];
        return LANGS.map((lang) => ({
            url: l(lang, path),
            lastModified: page.lastModified,
            changeFrequency: page.changeFrequency,
            priority: lang === 'es' ? page.priority : Math.max(page.priority - 0.1, 0.2),
            alternates: { languages: altLanguages(path) },
        }));
    });
}
