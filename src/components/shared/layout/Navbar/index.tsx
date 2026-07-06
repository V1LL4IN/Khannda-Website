// components/shared/layout/Navbar/index.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Navbar as ResizableNavbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/shared/ui/ResizableNavbar";
import {
    ThemeToggle,
    Button,
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking
} from '../../ui';
import { NavbarProps } from './Navbar.types';
import Image from 'next/image';
import { useLanguage } from '@/providers/LanguageProvider';

const Navbar: React.FC<NavbarProps> = ({
    isDark,
    onThemeToggle,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname() ?? '/';
    const { language, t } = useLanguage();

    // Cambiar de idioma = navegar a la ruta hermana (/, /en/...) conservando
    // la página actual. Son root layouts distintos: <a> es lo correcto.
    const prefix = language === 'en' ? '/en' : '';
    const isEnPath = /^\/en(\/|$)/.test(pathname);
    const esHref = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    const enHref = isEnPath ? pathname : pathname === '/' ? '/en' : `/en${pathname}`;

    const WHATSAPP_NUMBER = "593995498636";

    const handleStartProject = () => {
        const message = encodeURIComponent(t.whatsapp?.home || "¡Hola! Me interesa conocer más sobre sus servicios.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

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

    // Navigation items using translations
    const navItems = [
        { name: t.nav.solutions, link: `${prefix}/soluciones` },
        { name: t.nav.projects, link: `${prefix}/proyectos` },
        { name: t.nav.technologies, link: `${prefix}/tecnologia` },
    ];

    // Check if a nav item is active
    const isActiveLink = (link: string) => {
        if (link === '/' || link === '/en') return pathname === link;
        return pathname.startsWith(link);
    };

    return (
        <React.Fragment>
            {/* 1. Floating Logo - Top Left - Always Visible & Fixed */}
            <div data-navbar className={cn("fixed top-6 left-6 z-50", isDark ? "mix-blend-difference" : "")}>
                <a href={prefix || '/'} className="flex items-center space-x-3 group">
                    <div className="h-10 w-auto relative transition-transform group-hover:scale-110 duration-300">
                        <Image
                            src="/logo-khannda.png"
                            alt="Khannda Logo"
                            width={120}
                            height={40}
                            className={cn(
                                "object-contain h-full w-auto transition-all duration-300",
                                isDark ? "brightness-0 invert" : "brightness-0"
                            )}
                            priority
                        />
                    </div>
                    <span className={cn(
                        "font-bold text-xl tracking-tight hidden md:block transition-colors",
                        isDark ? "text-white group-hover:text-neutral-200" : "text-black group-hover:text-neutral-700"
                    )}>
                        KHANNDA
                    </span>
                </a>
            </div>

            {/* 2. Floating Navbar Pill - Top Center - Fixed */}
            <div data-navbar className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
                <nav className={cn(
                    "flex items-center gap-1 p-1.5 rounded-full transition-all duration-500",
                    isScrolled
                        ? cn(
                            "backdrop-blur-xl border",
                            isDark
                                ? "bg-neutral-900/70 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                                : "bg-white/80 border-neutral-200 shadow-[0_0_20px_rgba(0,0,0,0.08)]"
                        )
                        : "bg-transparent border-transparent shadow-none"
                )}>
                    {navItems.map((item, idx) => {
                        const isActive = isActiveLink(item.link);
                        return (
                            <a
                                key={idx}
                                href={item.link}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? isDark
                                            ? "text-purple-400 bg-purple-500/10"
                                            : "text-purple-600 bg-purple-500/10"
                                        : isDark
                                            ? "text-neutral-400 hover:text-white hover:bg-white/10"
                                            : "text-neutral-600 hover:text-black hover:bg-black/5"
                                )}
                            >
                                {item.name}
                            </a>
                        );
                    })}

                    {/* Dividers & Actions */}
                    <div className={cn("w-px h-5 mx-2", isDark ? "bg-white/10" : "bg-black/10")} />

                    {/* Language Toggle — navega a la ruta hermana del otro idioma */}
                    <div className="flex items-center px-2 space-x-2 text-xs font-mono">
                        <a
                            href={esHref}
                            hrefLang="es"
                            className={cn(
                                "transition-colors",
                                language === 'es'
                                    ? (isDark ? "font-bold text-white" : "font-bold text-neutral-900")
                                    : (isDark ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-neutral-900")
                            )}
                        >
                            ES
                        </a>
                        <span className={cn(isDark ? "text-neutral-500" : "text-neutral-400")}>|</span>
                        <a
                            href={enHref}
                            hrefLang="en"
                            className={cn(
                                "transition-colors",
                                language === 'en'
                                    ? (isDark ? "font-bold text-white" : "font-bold text-neutral-900")
                                    : (isDark ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-neutral-900")
                            )}
                        >
                            EN
                        </a>
                    </div>

                    <div className={cn("w-px h-5 mx-2", isDark ? "bg-white/10" : "bg-black/10")} />

                    {/* Theme Toggle */}
                    <button
                        onClick={onThemeToggle}
                        className={cn(
                            "p-2 rounded-full transition-colors",
                            isDark
                                ? "text-neutral-400 hover:text-white hover:bg-white/10"
                                : "text-neutral-600 hover:text-black hover:bg-black/5"
                        )}
                    >
                        {isDark ? '☀︎' : '☾'}
                    </button>
                </nav>
            </div>

            {/* 3. CTA Button - Top Right - Fixed */}
            <div data-navbar className="fixed top-6 right-6 z-40 hidden md:block">
                <ExpandableScreen isDark={isDark} layoutId="navbar-cta-desktop">
                    <ExpandableScreenTrigger>
                        <div
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors shadow-lg cursor-pointer",
                                isDark
                                    ? "bg-white text-black hover:bg-neutral-200"
                                    : "bg-black text-white hover:bg-neutral-800"
                            )}
                        >
                            {t.nav.startProject}
                        </div>
                    </ExpandableScreenTrigger>
                    <ExpandableScreenContent>
                        <CalendarBooking isDark={isDark} />
                    </ExpandableScreenContent>
                </ExpandableScreen>
            </div>

            {/* Mobile Nav Toggle */}
            <div data-navbar className={cn(
                "fixed top-6 right-6 z-50 md:hidden transition-all duration-300",
                isScrolled && (
                    isDark
                        ? "bg-black/30 backdrop-blur-md border border-white/10 rounded-lg shadow-lg"
                        : "bg-white/60 backdrop-blur-md border border-black/5 rounded-lg shadow-lg"
                )
            )}>
                <MobileNavToggle
                    isOpen={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    isDark={isDark}
                />
            </div>

            {/* Mobile Menu Overlay */}
            <MobileNavMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                isDark={isDark}
            >
                <div className="flex flex-col items-center justify-center space-y-8 mt-12">
                    {navItems.map((item, idx) => {
                        const isActive = isActiveLink(item.link);
                        return (
                            <a
                                key={idx}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "text-2xl font-light tracking-widest transition-colors",
                                    isActive
                                        ? "text-purple-400 border-b-2 border-purple-400 pb-1"
                                        : isDark
                                            ? "text-white hover:text-purple-400"
                                            : "text-black hover:text-purple-600"
                                )}
                            >
                                {item.name}
                            </a>
                        );
                    })}

                    {/* Language Toggle for Mobile */}
                    <div className="flex items-center space-x-4 text-lg font-mono">
                        <a
                            href={esHref}
                            hrefLang="es"
                            className={cn(
                                "transition-colors px-3 py-1 rounded",
                                language === 'es'
                                    ? (isDark ? "font-bold text-white bg-white/10" : "font-bold text-black bg-black/10")
                                    : (isDark ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-black")
                            )}
                        >
                            ES
                        </a>
                        <a
                            href={enHref}
                            hrefLang="en"
                            className={cn(
                                "transition-colors px-3 py-1 rounded",
                                language === 'en'
                                    ? (isDark ? "font-bold text-white bg-white/10" : "font-bold text-black bg-black/10")
                                    : (isDark ? "text-neutral-500 hover:text-white" : "text-neutral-500 hover:text-black")
                            )}
                        >
                            EN
                        </a>
                    </div>

                    <ExpandableScreen isDark={isDark} layoutId="navbar-cta-mobile">
                        <ExpandableScreenTrigger>
                            <div
                                className={cn(
                                    "mt-8 px-8 py-3 rounded-full font-bold transition-colors cursor-pointer",
                                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                                )}
                            >
                                {t.nav.startProject}
                            </div>
                        </ExpandableScreenTrigger>
                        <ExpandableScreenContent>
                            <CalendarBooking isDark={isDark} />
                        </ExpandableScreenContent>
                    </ExpandableScreen>
                </div>
            </MobileNavMenu>

        </React.Fragment>
    );
};

export default Navbar;
