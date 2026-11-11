import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, projectsItemList } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('en', '/proyectos');

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Projects', path: '/proyectos' }])} />
      <JsonLd data={projectsItemList('en')} />
      {children}
    </>
  );
}
