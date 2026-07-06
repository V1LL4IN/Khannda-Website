import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, projectsItemList } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Proyectos y Casos de Éxito',
  description: 'Casos de éxito de desarrollo de software a medida: sistema financiero para cooperativa de ahorro, gestión de gimnasio con n8n y e-commerce para EE. UU.',
  // Next NO fusiona openGraph con el del layout raíz: lo reemplaza entero,
  // así que cada página debe redeclarar images/siteName/locale/type.
  openGraph: {
    title: 'Proyectos y Casos de Éxito | Khannda',
    description: 'Casos de éxito de desarrollo de software a medida en fintech, fitness y e-commerce.',
    url: l('es', '/proyectos'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'es_EC',
    type: 'website',
  },
  alternates: {
    canonical: l('es', '/proyectos'),
    languages: altLanguages('/proyectos'),
  },
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Proyectos', path: '/proyectos' }])} />
      <JsonLd data={projectsItemList('es')} />
      {children}
    </>
  );
}
