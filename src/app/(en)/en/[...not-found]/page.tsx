// Catch-all bajo /en: sin él, /en/loquesea caería al catch-all español.
import { notFound } from 'next/navigation';

export default function CatchAll() {
    notFound();
}
