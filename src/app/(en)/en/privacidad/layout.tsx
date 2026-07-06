import type { Metadata } from 'next';
import { altLanguages, l } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Khannda privacy policy: what data we collect, for what purpose, and your rights under Ecuador’s Organic Law on Personal Data Protection.',
  alternates: {
    canonical: l('en', '/privacidad'),
    languages: altLanguages('/privacidad'),
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
