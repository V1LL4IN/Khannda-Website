// src/components/features/home/components/TeamSection/index.tsx
// Equipo como carrusel asomado: tarjeta ancha de esquinas muy redondeadas con
// el cargo dentro de la foto, y la siguiente persona ya visible a la derecha.
// Arrastre, swipe y flechas con bucle infinito (usePeekCarousel). El layout
// base es una fila con scroll-snap nativo (no-JS / reduced-motion). Las 4 bios
// viven en el DOM SSR exactamente una vez.
"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamSectionProps } from './TeamSection.types';
import { TEAM } from '@/lib/constants/team';
import { useLanguage } from '@/providers/LanguageProvider';
import { RevealGroup } from '@/components/shared/ui';
import { usePeekCarousel } from '@/lib/animation/usePeekCarousel';

export function TeamSection({ isDark: _isDark }: TeamSectionProps) {
  const { t, language } = useLanguage();
  const { rootRef, prev, next, active } = usePeekCarousel<HTMLDivElement>();

  const teamMembers = TEAM.map((member) => ({
    ...member,
    role: t.team.members[member.id].role,
    description: t.team.members[member.id].description,
  }));

  return (
    <section className="bg-background text-foreground transition-colors duration-300 px-6 sm:px-10 overflow-x-clip">
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

        {/* Carrusel. --sw = ancho de slide: lo comparten la slide y la
            posición de los controles (que cuelgan bajo la foto en desktop). */}
        <div className="relative [container-type:inline-size] [--sw:88cqw] md:[--sw:min(86cqw,120svh)]">
          <div
            ref={rootRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${t.team.title} ${t.team.titleHighlight}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') prev();
              if (e.key === 'ArrowRight') next();
            }}
            data-cursor={language === 'en' ? 'Drag' : 'Arrastra'}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none rounded-[1.75rem] md:rounded-[2.5rem] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background data-[drag-status=grab]:cursor-grab data-[drag-status=grabbing]:cursor-grabbing"
          >
            {teamMembers.map((member, i) => (
              <article
                key={member.id}
                data-peek-slide
                data-active={i === active}
                aria-label={`${member.name} — ${member.role}`}
                className="group shrink-0 w-[var(--sw)] snap-start will-change-transform"
              >
                <div className="relative aspect-[4/5] md:aspect-video overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-surface">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 88vw, (max-width: 1480px) 86vw, 1204px"
                    draggable={false}
                    style={{ objectPosition: member.focus }}
                    className="object-cover grayscale opacity-60 transition-[filter,opacity] duration-700 ease-sexy group-data-[active=true]:grayscale-0 group-data-[active=true]:opacity-100"
                  />
                  {/* Velo para que el cargo se lea sobre cualquier foto */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent md:bg-gradient-to-r md:from-black/65 md:via-black/10 md:via-45% md:to-transparent"
                  />
                  <p className="absolute inset-x-6 bottom-6 md:inset-y-0 md:left-[6%] md:right-auto md:flex md:items-center md:max-w-[38%] font-display font-light text-white text-[clamp(1.75rem,4.6cqw,4rem)] leading-[1.05] tracking-[-0.01em] text-balance">
                    {member.role}
                  </p>
                </div>
                <div className="mt-5 md:mt-6 max-w-[46ch] md:pr-6 opacity-0 transition-opacity duration-500 ease-sexy group-data-[active=true]:opacity-100">
                  <h3 className="font-display font-light text-lg sm:text-xl mb-1.5">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base font-light leading-[1.6] text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Controles: contador + flechas (también con ← → sobre el carrusel) */}
          <div className="mt-6 flex items-center justify-between gap-5 md:absolute md:right-0 md:top-[calc(var(--sw)*9/16+1.5rem)] md:mt-0">
            <p aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(teamMembers.length).padStart(2, '0')}
            </p>
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              <button
                onClick={prev}
                aria-label={language === 'en' ? 'Previous' : 'Anterior'}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                aria-label={language === 'en' ? 'Next' : 'Siguiente'}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
