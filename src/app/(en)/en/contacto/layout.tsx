import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, contactPage } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Contact — Book a Free Assessment',
  description: 'Contact Khannda, a custom software development company in Ecuador: book a free 30-minute assessment or message us on WhatsApp. We work in English and Spanish.',
  openGraph: {
    title: 'Contact — Book a Free Assessment | Khannda',
    description: 'Book a free 30-minute assessment or message us on WhatsApp.',
    url: l('en', '/contacto'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: l('en', '/contacto'),
    languages: altLanguages('/contacto'),
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Contact', path: '/contacto' }])} />
      <JsonLd data={contactPage('en')} />
      {children}
    </>
  );
}
