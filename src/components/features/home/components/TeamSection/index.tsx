// src/components/features/home/components/TeamSection/index.tsx
// Equipo como deck arrastrable (flick cards de mosaicist): abanico con física
// elástica, drag por umbral + flechas. El grid 2×2/4-col es el layout base
// (no-JS / reduced-motion); la conversión a deck es JS puro. Las 4 bios viven
// en el DOM SSR exactamente una vez.
"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TeamSectionProps, TeamMember } from './TeamSection.types';
import { useLanguage } from '@/providers/LanguageProvider';
import { RevealGroup } from '@/components/shared/ui';
import { useFlickCards } from '@/lib/animation/useFlickCards';

export function TeamSection({ isDark: _isDark }: TeamSectionProps) {
  const { t, language } = useLanguage();
  const { rootRef, prev, next } = useFlickCards<HTMLDivElement>();

  // Kevin aún no tiene retrato: tile monograma sobre superficie
  const teamMembers: (TeamMember & { monogram?: string })[] = [
    {
      id: 'matias',
      name: 'Matías Villarreal',
      role: t.team.members.matias.role,
      description: t.team.members.matias.description,
      image: '/team/Mati.jpg',
    },
    {
      id: 'jose',
      name: 'José Terán',
      role: t.team.members.jose.role,
      description: t.team.members.jose.description,
      image: '/team/Pepe.jpeg',
    },
    {
      id: 'kevin',
      name: 'Kevin Cano',
      role: t.team.members.kevin.role,
      description: t.team.members.kevin.description,
      image: '/logo-khannda.png',
      monogram: 'KC',
    },
    {
      id: 'kenny',
      name: 'Kenny Pinchao',
      role: t.team.members.kenny.role,
      description: t.team.members.kenny.description,
      image: '/team/Kenny.jpg',
    }
  ];

  return (
    <section className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto py-20 md:py-28">
        {/* Header */}
        <RevealGroup>
          <p data-reveal className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint mb-6">
            07 — {t.team.badge} ({String(teamMembers.length).padStart(2, '0')})
          </p>
          <h2 data-reveal className="font-display font-extralight uppercase text-h2 mb-4">
            {t.team.title} {t.team.titleHighlight}
          </h2>
          <p data-reveal className="text-lead font-light text-muted-foreground max-w-[52ch] mb-14">
            {t.team.subtitle}
          </p>
        </RevealGroup>

        {/* Deck (fallback: grid). data-cursor="drag" → el cursor custom lo anuncia */}
        <div
          ref={rootRef}
          data-cursor={language === 'en' ? 'Drag' : 'Arrastra'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 select-none data-[flick-drag-status=grab]:cursor-grab data-[flick-drag-status=grabbing]:cursor-grabbing"
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              data-flick-card
              className="group bg-background border border-border rounded-lg p-4 will-change-transform"
            >
              <div className="relative aspect-[4/5] rounded-md overflow-hidden mb-5 bg-surface">
                {member.monogram ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-thin text-6xl text-faint select-none">
                      {member.monogram}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    draggable={false}
                    className="object-cover grayscale transition-all duration-400 ease-sexy group-hover:grayscale-0 group-data-[flick-status=active]:grayscale-0"
                  />
                )}
              </div>
              <h3 className="font-display font-light uppercase tracking-[0.04em] text-lg sm:text-xl mb-1.5">
                {member.name}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint mb-3">
                {member.role}
              </p>
              <p className="text-sm font-light leading-[1.6] text-muted-foreground">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Flechas del deck (también accesibles por teclado) */}
        <div className="hidden motion-safe:flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
