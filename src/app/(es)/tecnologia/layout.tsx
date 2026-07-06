import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Stack Tecnológico',
  description: 'Conoce las tecnologías que usamos: React, Next.js, Node.js, Python, n8n, PostgreSQL y más. Herramientas modernas para soluciones robustas.',
  // Next NO fusiona openGraph con el del layout raíz: lo reemplaza entero,
  // así que cada página debe redeclarar images/siteName/locale/type.
  openGraph: {
    title: 'Stack Tecnológico | Khannda',
    description: 'Conoce las tecnologías que usamos para construir soluciones robustas y escalables.',
    url: l('es', '/tecnologia'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'es_EC',
    type: 'website',
  },
  alternates: {
    canonical: l('es', '/tecnologia'),
    languages: altLanguages('/tecnologia'),
  },
};

export default function TecnologiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Tecnología', path: '/tecnologia' }])} />
      {children}
    </>
  );
}
