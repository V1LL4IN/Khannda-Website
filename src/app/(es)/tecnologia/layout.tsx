import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('es', '/tecnologia');

export default function TecnologiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Tecnología', path: '/tecnologia' }])} />
      {children}
    </>
  );
}
