import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, contactPage } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Contacto — Agenda un Diagnóstico Gratuito',
  description: 'Contacta a Khannda, empresa de desarrollo de software en Ecuador: agenda un diagnóstico gratuito de 30 minutos o escríbenos por WhatsApp. Atención en español e inglés.',
  openGraph: {
    title: 'Contacto — Agenda un Diagnóstico Gratuito | Khannda',
    description: 'Agenda un diagnóstico gratuito de 30 minutos o escríbenos por WhatsApp.',
    url: l('es', '/contacto'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'es_EC',
    type: 'website',
  },
  alternates: {
    canonical: l('es', '/contacto'),
    languages: altLanguages('/contacto'),
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Contacto', path: '/contacto' }])} />
      <JsonLd data={contactPage('es')} />
      {children}
    </>
  );
}
