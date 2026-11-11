// app/(es)/layout.tsx — root layout del sitio en español (raíz del dominio).
import '../globals.css';
import { BaseLayout } from '@/components/shared/layout/BaseLayout';
import { rootMetadata } from '@/lib/seo/metadata';

export const metadata = rootMetadata('es');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout lang="es">{children}</BaseLayout>;
}
