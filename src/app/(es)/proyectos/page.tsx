'use client';

import React from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Navbar, Footer } from '@/components/shared/layout';
import { ProjectsSection } from '@/components/features/home';
import { cn } from '@/lib/utils';
import { WhatsAppFAB } from '@/components/shared/ui';

export default function ProyectosPage() {
    const { isDark, toggleTheme } = useTheme();
    const { t } = useLanguage();

    return (
        <div className={cn(
            'min-h-screen transition-all duration-300 bg-background text-foreground'
        )}>
            <Navbar
                isDark={isDark}
                onThemeToggle={toggleTheme}
            />

            <main className="pt-0">
                <ProjectsSection isDark={isDark} />
            </main>

            <Footer isDark={isDark} />

            <WhatsAppFAB
                phoneNumber="+593995498636"
                message={t.pageActions.projects}
            />
        </div>
    );
}
