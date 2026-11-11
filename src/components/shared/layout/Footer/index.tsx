// components/shared/layout/Footer/index.tsx — footer editorial: CTA serif
// gigante ("Construyamos.") que abre el flujo de booking, línea WhatsApp,
// columnas de navegación (SEO interno) y barra de copyright. Compartido
// por todas las páginas.
'use client';

import React from 'react';
import { cn } from '../../../../lib/utils';
import { useLanguage } from '@/providers/LanguageProvider';
import { SOCIAL_PROFILES } from '@/lib/seo/site';
import {
    ExpandableScreen,
    ExpandableScreenTrigger,
    ExpandableScreenContent,
    CalendarBooking,
} from '../../ui';

interface FooterProps {
    isDark: boolean;
}

const WHATSAPP_NUMBER = '593995498636';

const Footer: React.FC<FooterProps> = ({ isDark }) => {
    const currentYear = new Date().getFullYear();
    const { t, language } = useLanguage();
    // Prefijo de ruta por idioma: las URLs inglesas viven bajo /en
    const p = language === 'en' ? '/en' : '';

    const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.home)}`;

    return (
        <footer className="border-t border-border bg-background text-foreground transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
                {/* CTA gigante — el ask final de cada página */}
                <div className="py-20 md:py-28">
                    <ExpandableScreen isDark={isDark} layoutId="footer-cta-title">
                        <ExpandableScreenTrigger>
                            <h2 className="font-display font-thin uppercase text-h1 cursor-pointer group w-fit max-w-full">
                                {t.footer.cta.title}
                                <span className="inline-block text-accent transition-transform duration-300 ease-expo group-hover:translate-x-2 group-hover:-translate-y-2 ml-[0.08em]">
                                    ↗
                                </span>
                            </h2>
                        </ExpandableScreenTrigger>
                        <ExpandableScreenContent ariaLabel={t.footer.cta.button}>
                            <CalendarBooking isDark={isDark} />
                        </ExpandableScreenContent>
                    </ExpandableScreen>

                    <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                        <p className="text-lead font-light text-muted-foreground max-w-[46ch]">
                            {t.footer.cta.subline}
                        </p>
                        <div className="flex flex-wrap items-center gap-5 shrink-0">
                            <ExpandableScreen isDark={isDark} layoutId="footer-cta-button">
                                <ExpandableScreenTrigger>
                                    <button className="px-7 py-3.5 rounded-full bg-accent-strong text-white text-sm font-medium cursor-pointer transition-colors duration-300 hover:bg-accent">
                                        {t.footer.cta.button}
                                    </button>
                                </ExpandableScreenTrigger>
                                <ExpandableScreenContent ariaLabel={t.footer.cta.button}>
                                    <CalendarBooking isDark={isDark} />
                                </ExpandableScreenContent>
                            </ExpandableScreen>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-muted-foreground hover:text-accent transition-colors border-b border-border hover:border-accent pb-0.5"
                            >
                                {t.footer.cta.whatsappLabel} · {t.footer.cta.phoneDisplay}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Columnas de navegación */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 py-12 border-t border-border">
                    {/* Marca */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/logo-khannda.png"
                                alt="Khannda Logo"
                                width={24}
                                height={24}
                                loading="lazy"
                                decoding="async"
                                className={cn(
                                    'h-6 w-auto object-contain',
                                    isDark ? 'invert brightness-0' : 'brightness-0'
                                )}
                            />
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                                Khannda
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {t.footer.tagline}
                        </p>
                        {/* Mismos perfiles que el sameAs del schema Organization */}
                        {SOCIAL_PROFILES.length > 0 && (
                            <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                                {SOCIAL_PROFILES.map((profile) => (
                                    <li key={profile.url}>
                                        <a
                                            href={profile.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-accent transition-colors"
                                        >
                                            {profile.name} ↗
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-5">
                            {t.footer.services.title}
                        </h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {/* anclas = id de cada panel en /soluciones */}
                            <li><a href={`${p}/soluciones#development`} className="hover:text-accent transition-colors">{t.footer.services.development}</a></li>
                            <li><a href={`${p}/soluciones#automation`} className="hover:text-accent transition-colors">{t.footer.services.automation}</a></li>
                            <li><a href={`${p}/soluciones#consulting`} className="hover:text-accent transition-colors">{t.footer.services.consulting}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-5">
                            {t.footer.company.title}
                        </h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            {/* sin slash antes del hash en /en: '/en/#x' provoca un 308 por trailing slash */}
                            <li><a href={p ? `${p}#nosotros` : '/#nosotros'} className="hover:text-accent transition-colors">{t.footer.company.about}</a></li>
                            <li><a href={`${p}/proyectos`} className="hover:text-accent transition-colors">{t.footer.company.cases}</a></li>
                            <li><a href={`${p}/contacto`} className="hover:text-accent transition-colors">{t.footer.company.contact}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-5">
                            {t.footer.legal.title}
                        </h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                            <li><a href={`${p}/terminos`} className="hover:text-accent transition-colors">{t.footer.legal.terms}</a></li>
                            <li><a href={`${p}/privacidad`} className="hover:text-accent transition-colors">{t.footer.legal.privacy}</a></li>
                            <li><a href={p ? `${p}#faq` : '/#faq'} className="hover:text-accent transition-colors">{t.footer.legal.faq}</a></li>
                        </ul>
                    </div>
                </div>

                {/* Barra inferior */}
                <div className="border-t border-border py-7 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-faint">
                        © {currentYear} KHANNDA. {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-xs text-faint">{t.footer.systemStatus}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
