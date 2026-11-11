import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb } from '@/lib/seo/schema';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('en', '/tecnologia');

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Technology', path: '/tecnologia' }])} />
      {children}
    </>
  );
}
