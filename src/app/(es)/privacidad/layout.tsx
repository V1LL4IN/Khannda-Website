import type { Metadata } from 'next';
import { altLanguages, l } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Khannda: qué datos recogemos, con qué finalidad y tus derechos según la Ley Orgánica de Protección de Datos Personales del Ecuador.',
  alternates: {
    canonical: l('es', '/privacidad'),
    languages: altLanguages('/privacidad'),
  },
};

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
