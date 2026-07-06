import type { Metadata } from 'next';
import { altLanguages, l } from '@/lib/seo/site';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos de servicio de Khannda: alcance de los servicios, propiedad intelectual del código, responsabilidad y jurisdicción.',
  alternates: {
    canonical: l('es', '/terminos'),
    languages: altLanguages('/terminos'),
  },
};

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
