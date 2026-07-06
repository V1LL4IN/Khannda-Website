// src/providers/LanguageProvider.tsx
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { es, en, Translations } from '@/lib/i18n';

export type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Convenience hook for just getting translations
export const useTranslation = () => {
    const { t, language } = useLanguage();
    return { t, language };
};

interface LanguageProviderProps {
    children: React.ReactNode;
    language: Language;
}

/**
 * El idioma viene FIJO de la ruta (/ = es, /en = en) — cada root layout monta
 * su propio provider. Sin estado ni localStorage: el HTML del servidor y el
 * primer render del cliente son idénticos (cero flash de idioma), y cada
 * versión es indexable en su URL. Cambiar de idioma = navegar entre rutas.
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, language }) => {
    const value = useMemo(
        () => ({ language, t: language === 'es' ? es : en }),
        [language]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
