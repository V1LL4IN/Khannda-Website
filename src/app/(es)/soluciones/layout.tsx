import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, solutionsFaq, solutionsServices } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Soluciones de Software y Automatización con n8n',
  description: 'Desarrollo de software a medida, automatización de procesos con n8n y consultoría tecnológica en Ecuador para toda LATAM. Soluciones que impulsan tu negocio.',
  // Next NO fusiona openGraph con el del layout raíz: lo reemplaza entero,
  // así que cada página debe redeclarar images/siteName/locale/type.
  openGraph: {
    title: 'Soluciones de Software y Automatización con n8n | Khannda',
    description: 'Desarrollo de software a medida, automatización de procesos con n8n y consultoría tecnológica.',
    url: l('es', '/soluciones'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'es_EC',
    type: 'website',
  },
  alternates: {
    canonical: l('es', '/soluciones'),
    languages: altLanguages('/soluciones'),
  },
};

export default function SolucionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Soluciones', path: '/soluciones' }])} />
      <JsonLd data={solutionsServices('es')} />
      <JsonLd data={solutionsFaq('es')} />
      {children}
    </>
  );
}
