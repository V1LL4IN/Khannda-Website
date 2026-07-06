// app/(en)/layout.tsx — root layout del sitio en inglés (rutas bajo /en).
import type { Metadata } from 'next';
import '../globals.css';
import { BaseLayout } from '@/components/shared/layout/BaseLayout';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.khannda.com'),
  title: {
    default: 'Custom Software Development in Ecuador | Khannda',
    template: '%s | Khannda',
  },
  description: 'Custom software development in Ecuador for LATAM and the US: web and mobile applications, n8n automation and technology consulting. 50+ systems in production since 2019.',
  keywords: 'custom software development, nearshore software development, software agency Ecuador, n8n automation, web applications, mobile apps, technology consulting, khannda',
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
    title: 'Custom Software Development in Ecuador | Khannda',
    description: 'Web and mobile applications, n8n automation and technology consulting. 50+ systems in production for fintech, logistics, retail and healthcare since 2019.',
    url: l('en', ''),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'en_US',
    alternateLocale: ['es_EC'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development in Ecuador | Khannda',
    description: 'Web and mobile applications, n8n automation and technology consulting. 50+ systems in production since 2019.',
    images: [OG_IMAGE.url],
  },
  alternates: {
    canonical: l('en', ''),
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

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout lang="en">{children}</BaseLayout>;
}
