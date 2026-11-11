import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('en', '/terminos');

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
