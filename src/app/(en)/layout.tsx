// app/(en)/layout.tsx — root layout del sitio en inglés (rutas bajo /en).
import '../globals.css';
import { BaseLayout } from '@/components/shared/layout/BaseLayout';
import { rootMetadata } from '@/lib/seo/metadata';

export const metadata = rootMetadata('en');

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout lang="en">{children}</BaseLayout>;
}
