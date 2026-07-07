'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import { Navbar, Footer } from '@/components/shared/layout';
import { HeroSection } from '@/components/features/home';
import { WhatsAppFAB, SeparatorWord } from '@/components/shared/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqPage } from '@/lib/seo/schema';
import { cn } from '@/lib/utils';

// Below-the-fold: code-splitting del JS, pero SIEMPRE con SSR — este contenido
// (servicios, trabajo, precios, equipo, FAQ) debe existir en el HTML para
// crawlers y LLMs.
const IntroSection = dynamic(() => import('@/components/features/home/components/IntroSection'));
const ServicesSection = dynamic(() => import('@/components/features/home/components/ServicesSection'));
const WorkIndexSection = dynamic(() => import('@/components/features/home/components/WorkIndexSection'));
const AboutSection = dynamic(() => import('@/components/features/home/components/AboutSection'));
const PricingSection = dynamic(() => import('@/components/features/home/components/PricingSection'));
const TeamSection = dynamic(() => import('@/components/features/home/components/TeamSection'));
const FAQSection = dynamic(() => import('@/components/features/home/components/FAQSection'));

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const { language, t } = useLanguage();

  // Palabras separadoras gigantes (decorativas): Software → Fintech (la única
  // teñida, antesala del caso flagship) → Uptime → Partner. Ninguna entre FAQ
  // y footer para no competir con el CTA gigante.
  const [sepSoftware, sepFintech, sepUptime, sepPartner] = t.separators;

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

        <IntroSection isDark={isDark} />

        <SeparatorWord word={sepSoftware} align="left" />

        <ServicesSection isDark={isDark} />

        <SeparatorWord word={sepFintech} align="right" tint />

        <WorkIndexSection isDark={isDark} />

        <SeparatorWord word={sepUptime} align="left" />

        <AboutSection isDark={isDark} />

        <SeparatorWord word={sepPartner} align="right" />

        <PricingSection isDark={isDark} />

        <TeamSection isDark={isDark} />

        <FAQSection isDark={isDark} />
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
