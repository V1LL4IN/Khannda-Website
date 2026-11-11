import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, projectsItemList } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('es', '/proyectos');

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Proyectos', path: '/proyectos' }])} />
      <JsonLd data={projectsItemList('es')} />
      {children}
    </>
  );
}
