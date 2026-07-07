// components/shared/layout/Navbar/index.tsx — header sticky mínimo editorial:
// logo (rota 180° al hover), nav en mono uppercase, toggle de idioma/tema y
// CTA que abre el flujo de booking. Nav híbrida: links visibles en desktop,
// overlay fullscreen (FullscreenNav) en móvil. Compartido por todas las páginas.
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking
} from '../../ui';
import { FullscreenNav } from '../FullscreenNav';
import { NavbarProps } from './Navbar.types';
import Image from 'next/image';
import { useLanguage } from '@/providers/LanguageProvider';

// Underline que crece de izquierda a derecha (transform-only)
const growUnderline =
    'relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-expo hover:after:scale-x-100';

const Navbar: React.FC<NavbarProps> = ({
    isDark,
    onThemeToggle,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname() ?? '/';
    const { language, t } = useLanguage();
    const toggleRef = useRef<HTMLButtonElement>(null);

    // Cambiar de idioma = navegar a la ruta hermana (/, /en/...) conservando
    // la página actual. Son root layouts distintos: <a> es lo correcto.
    const prefix = language === 'en' ? '/en' : '';
    const isEnPath = /^\/en(\/|$)/.test(pathname);
    const esHref = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    const enHref = isEnPath ? pathname : pathname === '/' ? '/en' : `/en${pathname}`;

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActiveLink = (link: string) => {
        if (link === '/' || link === '/en') return pathname === link;
        return pathname.startsWith(link);
    };

    const navItems = [
        { name: t.nav.solutions, link: `${prefix}/soluciones` },
        { name: t.nav.projects, link: `${prefix}/proyectos` },
        { name: t.nav.technologies, link: `${prefix}/tecnologia` },
    ].map((item) => ({ ...item, active: isActiveLink(item.link) }));

    return (
        <React.Fragment>
            <header
                data-navbar
                className={cn(
                    'fixed top-0 inset-x-0 transition-colors duration-300',
                    // Por encima del overlay (z-60) cuando el menú está abierto,
                    // para que el botón de cierre quede accesible
                    isMobileMenuOpen ? 'z-[70]' : 'z-50',
                    isScrolled && !isMobileMenuOpen
                        ? 'bg-background/85 backdrop-blur-md border-b border-border'
                        : 'bg-transparent border-b border-transparent'
                )}
            >
                <div className="h-16 px-6 sm:px-10 flex items-center justify-between gap-6">
                    {/* Logo + wordmark */}
                    <a href={prefix || '/'} className="flex items-center gap-3 group shrink-0">
                        <div className="h-7 w-auto transition-transform duration-400 ease-expo group-hover:rotate-180">
                            <Image
                                src="/logo-khannda.png"
                                alt="Khannda Logo"
                                width={84}
                                height={28}
                                className={cn(
                                    'object-contain transition-all duration-300',
                                    isDark ? 'brightness-0 invert' : 'brightness-0'
                                )}
                                style={{ height: '100%', width: 'auto' }}
                                priority
                            />
                        </div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
                            Khannda
                        </span>
                    </a>

                    {/* Nav desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                className={cn(
                                    'font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200',
                                    growUnderline,
                                    item.active
                                        ? 'text-accent after:scale-x-100'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Cluster derecho */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Toggle de idioma — navega a la ruta hermana */}
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em]">
                            <a
                                href={esHref}
                                hrefLang="es"
                                className={cn(
                                    'transition-colors',
                                    language === 'es'
                                        ? 'text-foreground font-bold'
                                        : 'text-faint hover:text-foreground'
                                )}
                            >
                                ES
                            </a>
                            <span className="text-faint">/</span>
                            <a
                                href={enHref}
                                hrefLang="en"
                                className={cn(
                                    'transition-colors',
                                    language === 'en'
                                        ? 'text-foreground font-bold'
                                        : 'text-faint hover:text-foreground'
                                )}
                            >
                                EN
                            </a>
                        </div>

                        <button
                            onClick={onThemeToggle}
                            aria-label={isDark ? 'Light mode' : 'Dark mode'}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm leading-none"
                        >
                            {isDark ? '☀︎' : '☾'}
                        </button>

                        <ExpandableScreen isDark={isDark} layoutId="navbar-cta-desktop">
                            <ExpandableScreenTrigger>
                                <div
                                    className={cn(
                                        'font-mono text-[11px] uppercase tracking-[0.2em] cursor-pointer text-foreground',
                                        growUnderline
                                    )}
                                >
                                    {t.nav.startProject} ↗
                                </div>
                            </ExpandableScreenTrigger>
                            <ExpandableScreenContent>
                                <CalendarBooking isDark={isDark} />
                            </ExpandableScreenContent>
                        </ExpandableScreen>
                    </div>

                    {/* Toggle móvil */}
                    <button
                        ref={toggleRef}
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={isMobileMenuOpen}
                        className="md:hidden relative z-[70] text-foreground p-2 -mr-2"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Overlay móvil a pantalla completa */}
            <FullscreenNav
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                items={navItems}
                esHref={esHref}
                enHref={enHref}
                language={language}
                ctaLabel={t.nav.startProject}
                isDark={isDark}
                returnFocusRef={toggleRef}
            />
        </React.Fragment>
    );
};

export default Navbar;
