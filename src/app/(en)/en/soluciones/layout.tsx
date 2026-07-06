import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, solutionsFaq, solutionsServices } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Software Solutions & n8n Automation',
  description: 'Custom software development, n8n process automation and technology consulting from Ecuador for LATAM and the US. Solutions that drive your business.',
  openGraph: {
    title: 'Software Solutions & n8n Automation | Khannda',
    description: 'Custom software development, n8n process automation and technology consulting.',
    url: l('en', '/soluciones'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: l('en', '/soluciones'),
    languages: altLanguages('/soluciones'),
  },
};

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
