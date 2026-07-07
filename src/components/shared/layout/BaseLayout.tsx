// components/shared/layout/BaseLayout.tsx — root layout compartido por los
// dos grupos de idioma (src/app/(es) y src/app/(en)). Cada grupo fija su
// <html lang>, su @graph JSON-LD y el idioma del LanguageProvider.

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/providers';
import { LenisProvider } from '@/providers/LenisProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildSiteGraph } from '@/lib/seo/schema';
import { montserrat, inter, geistMono } from '@/lib/fonts';
import { CustomCursor } from '@/components/shared/ui/CustomCursor';
import type { Lang } from '@/lib/seo/site';

export function BaseLayout({ children, lang }: { children: ReactNode; lang: Lang }) {
    return (
        <html
            lang={lang}
            suppressHydrationWarning
            className={`${montserrat.variable} ${inter.variable} ${geistMono.variable}`}
        >
            <head>
                <JsonLd data={buildSiteGraph(lang)} />
            </head>
            <body suppressHydrationWarning>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <LanguageProvider language={lang}>
                        <LenisProvider>
                            {children}
                            <CustomCursor />
                        </LenisProvider>
                    </LanguageProvider>
                </ThemeProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
