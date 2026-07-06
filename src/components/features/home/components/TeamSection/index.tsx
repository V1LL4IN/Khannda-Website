// src/components/features/home/components/TeamSection/index.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '../../../../../lib/utils';
import { TeamSectionProps, TeamMember } from './TeamSection.types';
import { useLanguage } from '@/providers/LanguageProvider';
import { Carousel, Card } from '@/components/shared/ui/AppleCardsCarousel';

function TeamMemberContent({ member }: { member: TeamMember; isDark?: boolean }) {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Member Photo */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-[#712F6D]/30">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans leading-relaxed">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TeamSection({ isDark }: TeamSectionProps) {
  const darkMode = isDark;
  const { t } = useLanguage();

  const teamMembers: TeamMember[] = [
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
    },
    {
      id: 'kenny',
      name: 'Kenny Pinchao',
      role: t.team.members.kenny.role,
      description: t.team.members.kenny.description,
      image: '/team/Kenny.jpg',
    }
  ];

  const cards = teamMembers.map((member, index) => (
    <Card
      key={member.id}
      card={{
        category: member.role,
        title: member.name,
        src: member.image,
        content: <TeamMemberContent member={member} isDark={darkMode} />,
      }}
      index={index}
    />
  ));

  return (
    <section className={cn(
      "py-16 px-6 relative overflow-hidden transition-colors duration-300",
      darkMode ? "bg-neutral-950" : "bg-neutral-50"
    )}>
      {/* Background Grid */}
      <div className={cn(
        "absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]",
        darkMode
          ? "bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]"
          : "bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]"
      )} />

      {/* Background decorative gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(88,28,135,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(88,28,135,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 transition-colors',
            darkMode ? 'text-white' : 'text-black'
          )}>
            {t.team.title} <span className="gradient-text font-bold">{t.team.titleHighlight}</span>
          </h2>
          <p className={cn("text-lg max-w-2xl mx-auto font-light leading-relaxed transition-colors", darkMode ? "text-neutral-400" : "text-neutral-600")}>
            {t.team.subtitle}
          </p>
        </div>

        {/* Team Carousel */}
        <Carousel items={cards} />

        {/* Bottom Call to Action */}
        <div className="text-center mt-8">
          <div className={cn(
            'inline-flex items-center px-6 py-3 rounded-full backdrop-blur-sm border transition-colors',
            darkMode
              ? 'bg-white/5 border-white/10 text-white/80'
              : 'bg-black/5 border-black/10 text-gray-700'
          )}>
            <span className="text-sm md:text-base font-medium">
              {t.team.cta.question}{' '}
              <span className="bg-gradient-to-r from-[#592355] via-[#712F6D] to-[#8a3c86] dark:from-[#592355] dark:via-[#712F6D] dark:to-[#8a3c86] bg-clip-text text-transparent font-semibold">
                {t.team.cta.action}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
