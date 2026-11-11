import type { MetadataRoute } from 'next';
import { PAGES } from '@/lib/seo/metadata';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Khannda — Desarrollo de Software a Medida',
        short_name: 'Khannda',
        description: PAGES[''].es.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0c',
        theme_color: '#712F6D',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
    };
}
