// 404 in English — real HTTP 404 with recovery navigation.
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#fafaf7] text-[#0a0a0a] dark:bg-[#0a0a0c] dark:text-white">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6 text-[#8a3c86]">
                Error 404
            </p>
            <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.04em] mb-6">
                Page not found
            </h1>
            <p className="max-w-md text-base font-light mb-10 opacity-60">
                The page you are looking for does not exist or has moved. These routes do lead somewhere:
            </p>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/en" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Home</Link>
                <Link href="/en/soluciones" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Solutions</Link>
                <Link href="/en/proyectos" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Projects</Link>
                <Link href="/en/contacto" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Contact</Link>
            </nav>
        </main>
    );
}
