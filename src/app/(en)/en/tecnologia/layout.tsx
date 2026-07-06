import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Technology Stack',
  description: 'The technologies we use: React, Next.js, Node.js, Python, n8n, PostgreSQL and more. Modern tools for robust, scalable solutions.',
  openGraph: {
    title: 'Technology Stack | Khannda',
    description: 'The technologies we use to build robust, scalable solutions.',
    url: l('en', '/tecnologia'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: l('en', '/tecnologia'),
    languages: altLanguages('/tecnologia'),
  },
};

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Technology', path: '/tecnologia' }])} />
      {children}
    </>
  );
}
