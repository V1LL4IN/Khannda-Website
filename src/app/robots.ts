import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/site';

// Los crawlers de IA se permiten EXPLÍCITAMENTE: que ChatGPT, Claude,
// Perplexity y los AI Overviews de Google puedan citar a Khannda es parte
// de la estrategia GEO del sitio.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/' },
            {
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-SearchBot',
                    'Claude-User',
                    'Claude-Web',
                    'anthropic-ai',
                    'PerplexityBot',
                    'Perplexity-User',
                    'Google-Extended',
                    'Applebot-Extended',
                    'cohere-ai',
                    'CCBot',
                    'meta-externalagent',
                    'Amazonbot',
                    'DuckAssistBot',
                    'MistralAI-User',
                ],
                allow: '/',
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
