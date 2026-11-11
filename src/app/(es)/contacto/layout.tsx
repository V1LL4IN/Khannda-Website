import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, contactPage } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('es', '/contacto');

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('es', [{ name: 'Contacto', path: '/contacto' }])} />
      <JsonLd data={contactPage('es')} />
      {children}
    </>
  );
}
