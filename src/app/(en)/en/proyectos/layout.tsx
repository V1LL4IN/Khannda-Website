import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumb, projectsItemList } from '@/lib/seo/schema';
import { altLanguages, l, OG_IMAGE } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Projects & Case Studies',
  description: 'Custom software case studies: a financial system for a credit union, gym management with n8n automation and a corporate website for a US firm.',
  openGraph: {
    title: 'Projects & Case Studies | Khannda',
    description: 'Custom software case studies in fintech, fitness and corporate websites.',
    url: l('en', '/proyectos'),
    siteName: 'Khannda',
    images: [OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: l('en', '/proyectos'),
    languages: altLanguages('/proyectos'),
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb('en', [{ name: 'Projects', path: '/proyectos' }])} />
      <JsonLd data={projectsItemList('en')} />
      {children}
    </>
  );
}
