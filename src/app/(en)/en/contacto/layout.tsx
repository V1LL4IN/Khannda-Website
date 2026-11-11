import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, contactPage } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('en', '/contacto');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Contact', path: '/contacto' }])} />
      <JsonLd data={contactPage('en')} />
      {children}
    </>
  );
}
