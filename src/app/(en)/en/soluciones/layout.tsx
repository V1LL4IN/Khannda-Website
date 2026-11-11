import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, solutionsFaq, solutionsServices } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('en', '/soluciones');

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Solutions', path: '/soluciones' }])} />
      <JsonLd data={solutionsServices('en')} />
      <JsonLd data={solutionsFaq('en')} />
      {children}
    </>
  );
}
