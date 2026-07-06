// app/(es)/layout.tsx — root layout del sitio en español (raíz del dominio).
import type { Metadata } from 'next';
import '../globals.css';
import { BaseLayout } from '@/components/shared/layout/BaseLayout';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.khannda.com'),
  title: {
    default: 'Desarrollo de Software a Medida en Ecuador | Khannda',
    template: '%s | Khannda',
  },
  description: 'Desarrollo de software a medida en Ecuador para toda LATAM: aplicaciones web, móviles, automatización con n8n y consultoría tecnológica. Más de 50 sistemas en producción desde 2019.',
  keywords: 'desarrollo de software, software a medida, aplicaciones web, apps móviles, transformación digital, consultoría tecnológica, automatización, diseño ux ui, khannda',
  authors: [{ name: 'Khannda' }],
  creator: 'Khannda',
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  openGraph: {
    title: 'Desarrollo de Software a Medida en Ecuador | Khannda',
    description: 'Aplicaciones web, móviles, automatización con n8n y consultoría tecnológica. Más de 50 sistemas en producción para fintech, logística, retail y salud desde 2019.',
    url: l('es', ''),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'es_EC',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desarrollo de Software a Medida en Ecuador | Khannda',
    description: 'Aplicaciones web, móviles, automatización con n8n y consultoría tecnológica. Más de 50 sistemas en producción desde 2019.',
    images: [OG_IMAGE.url],
  },
  alternates: {
    canonical: l('es', ''),
    languages: altLanguages(''),
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout lang="es">{children}</BaseLayout>;
}
