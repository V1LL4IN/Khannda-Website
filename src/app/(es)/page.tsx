'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Navbar, Footer } from '@/components/shared/layout';
import { HeroSection } from '@/components/features/home';
import { WhatsAppFAB } from '@/components/shared/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqPage } from '@/lib/seo/schema';
import { cn } from '@/lib/utils';

// Below-the-fold: code-splitting del JS, pero SIEMPRE con SSR — este contenido
// (servicios, precios, equipo, FAQ) debe existir en el HTML para crawlers y LLMs.
const AboutSection = dynamic(() => import('@/components/features/home/components/AboutSection'));
const ServicesSection = dynamic(() => import('@/components/features/home/components/ServicesSection'));
const PricingSection = dynamic(() => import('@/components/features/home/components/PricingSection'));
const FAQSection = dynamic(() => import('@/components/features/home/components/FAQSection'));
const TeamSection = dynamic(() => import('@/components/features/home/components/TeamSection'));

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const { language, t } = useLanguage();

  return (
    <div className={cn(
      'min-h-screen transition-all duration-300 bg-background text-foreground'
    )}>
      <Navbar
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <main>
        <HeroSection isDark={isDark} />

        <AboutSection isDark={isDark} />

        <ServicesSection isDark={isDark} />

        <PricingSection isDark={isDark} />

        <FAQSection isDark={isDark} />

        <TeamSection isDark={isDark} />
      </main>

      {/* FAQPage schema: solo en la home, donde vive el contenido visible */}
      <JsonLd data={faqPage(language)} />

      <Footer isDark={isDark} />

      <WhatsAppFAB
        phoneNumber="+593995498636"
        message={t.whatsapp.home}
      />
    </div>
  );
}
