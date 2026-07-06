// Catch-all: con múltiples root layouts, el not-found global necesita una
// ruta que capture cualquier path desconocido y dispare notFound().
import { notFound } from 'next/navigation';

export default function CatchAll() {
    notFound();
}
