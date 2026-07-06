// 404 en español — HTTP 404 real, con navegación de recuperación.
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#fafaf7] text-[#0a0a0a] dark:bg-[#0a0a0c] dark:text-white">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6 text-[#8a3c86]">
                Error 404
            </p>
            <h1 className="text-4xl sm:text-6xl font-medium tracking-[-0.04em] mb-6">
                Página no encontrada
            </h1>
            <p className="max-w-md text-base font-light mb-10 opacity-60">
                La página que buscas no existe o cambió de dirección. Estas rutas sí llevan a algún lado:
            </p>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Inicio</Link>
                <Link href="/soluciones" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Soluciones</Link>
                <Link href="/proyectos" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Proyectos</Link>
                <Link href="/contacto" className="border-b pb-0.5 border-current/30 hover:border-current transition-colors">Contacto</Link>
            </nav>
        </main>
    );
}
