import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, solutionsFaq, solutionsServices } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('es', '/soluciones');

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
