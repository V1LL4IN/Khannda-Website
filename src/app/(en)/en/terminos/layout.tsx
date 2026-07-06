import type { Metadata } from 'next';
import { altLanguages, l } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Khannda terms of service: scope of services, code intellectual property, liability and jurisdiction.',
  alternates: {
    canonical: l('en', '/terminos'),
    languages: altLanguages('/terminos'),
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
