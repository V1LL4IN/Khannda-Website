'use client';

// LegalArticle — renderizador compartido de páginas legales. El idioma llega
// del LanguageProvider (fijado por la ruta) y el contenido de lib/legal.ts.

import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Navbar, Footer } from '@/components/shared/layout';
import { legalContent } from '@/lib/legal';
import { cn } from '@/lib/utils';

export function LegalArticle({ doc }: { doc: 'terminos' | 'privacidad' }) {
    const { isDark, toggleTheme } = useTheme();
    const { language } = useLanguage();
    const content = legalContent[language][doc];

    return (
        <div className="min-h-screen transition-all duration-300 bg-background text-foreground">
            <Navbar isDark={isDark} onThemeToggle={toggleTheme} />
            <main>
                <article
                    className={cn(
                        'min-h-screen pt-36 pb-24 px-6 sm:px-14 transition-colors duration-300',
                        isDark ? 'bg-[#0a0a0c] text-white' : 'bg-[#fafaf7] text-[#0a0a0a]'
                    )}
                >
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] mb-3">
                            {content.title}
                        </h1>
                        <p className={cn('text-xs font-mono uppercase tracking-[0.18em] mb-12', isDark ? 'text-white/40' : 'text-neutral-500')}>
                            {content.updated}
                        </p>
                        {content.sections.map((section, i) => (
                            <section key={i} className="mb-10">
                                <h2 className="text-lg font-medium mb-3">{section.heading}</h2>
                                <p className={cn('text-sm sm:text-base font-light leading-relaxed', isDark ? 'text-white/60' : 'text-neutral-600')}>
                                    {section.body}
                                </p>
                            </section>
                        ))}
                    </div>
                </article>
            </main>
            <Footer isDark={isDark} />
        </div>
    );
}
