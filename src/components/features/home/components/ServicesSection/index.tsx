// src/components/features/home/components/ServicesSection/index.tsx
'use client';

import React from 'react';
import {
    Code2,
    ShieldCheck,
    Cpu,
    Zap
} from 'lucide-react';
import { cn } from '../../../../../lib/utils';
import { BentoGrid, BentoGridItem, ScrollReveal } from '../../../../shared/ui';
import { SkeletonDev, SkeletonAutomation, SkeletonConsulting, SkeletonSecurity } from './AnimatedHeaders';
import { useLanguage } from '@/providers/LanguageProvider';

interface ServicesSectionProps {
    isDark?: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ isDark }) => {
    const darkMode = isDark;
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';

    // Detalle indexable por servicio + enlace contextual con anchor de keyword.
    const serviceDetails = [
        { ...t.services.items.development, href: `${p}/soluciones` },
        { ...t.services.items.security, href: `${p}/proyectos` },
        { ...t.services.items.automation, href: `${p}/soluciones` },
        { ...t.services.items.consulting, href: `${p}/contacto` },
    ];

    const services = [
        {
            title: t.services.items.development.title,
            description: t.services.items.development.description,
            icon: <Code2 className={cn("h-5 w-5", darkMode ? "text-purple-400" : "text-purple-600")} />,
            header: <SkeletonDev />,
            features: t.services.items.development.features,
            className: "md:col-span-1"
        },
        {
            title: t.services.items.security.title,
            description: t.services.items.security.description,
            icon: <ShieldCheck className={cn("h-5 w-5", darkMode ? "text-purple-400" : "text-purple-600")} />,
            header: <SkeletonSecurity />,
            features: t.services.items.security.features,
            className: "md:col-span-2"
        },
        {
            title: t.services.items.automation.title,
            description: t.services.items.automation.description,
            icon: <Cpu className={cn("h-5 w-5", darkMode ? "text-purple-400" : "text-purple-600")} />,
            header: <SkeletonAutomation />,
            features: t.services.items.automation.features,
            className: "md:col-span-2"
        },
        {
            title: t.services.items.consulting.title,
            description: t.services.items.consulting.description,
            icon: <Zap className={cn("h-5 w-5", darkMode ? "text-purple-400" : "text-purple-600")} />,
            header: <SkeletonConsulting />,
            features: t.services.items.consulting.features,
            className: "md:col-span-1"
        }
    ];

    const metrics = [
        { val: t.services.metrics.efficiency.value, label: t.services.metrics.efficiency.label, desc: t.services.metrics.efficiency.desc },
        { val: t.services.metrics.timeToMarket.value, label: t.services.metrics.timeToMarket.label, desc: t.services.metrics.timeToMarket.desc },
        { val: t.services.metrics.ownership.value, label: t.services.metrics.ownership.label, desc: t.services.metrics.ownership.desc }
    ];

    return (
        <div className={cn(
            "py-16 px-6 relative overflow-hidden transition-colors duration-300",
            darkMode ? "bg-neutral-950" : "bg-neutral-50"
        )}>
            {/* Background Grid */}
            <div className={cn(
                "absolute inset-0 bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]",
                darkMode
                    ? "bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)]"
                    : "bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]"
            )} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <ScrollReveal delay={0} direction="up">
                    <div className="text-center mb-20">

                        <h2 className={cn("text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 transition-colors",
                            darkMode ? "text-white" : "text-black"
                        )}>
                            {t.services.title} <span className="gradient-text font-bold">{t.services.titleHighlight}</span>
                        </h2>
                        <p className={cn("text-lg max-w-2xl mx-auto font-light leading-relaxed transition-colors",
                            darkMode ? "text-neutral-400" : "text-neutral-600"
                        )}>
                            {t.services.subtitle}
                        </p>
                        <p className={cn("text-sm max-w-2xl mx-auto font-light leading-relaxed mt-4 transition-colors",
                            darkMode ? "text-neutral-500" : "text-neutral-500"
                        )}>
                            {t.services.seoIntro}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Services BentoGrid */}
                <BentoGrid className="mx-auto md:auto-rows-[22rem] mb-12">
                    {services.map((service, index) => (
                        <ScrollReveal
                            key={index}
                            delay={0.1 + index * 0.1}
                            direction="up"
                            className={service.className}
                        >
                            <BentoGridItem
                                title={service.title}
                                description={service.description}
                                header={service.header}
                                icon={service.icon}
                                features={service.features}
                                className={cn(
                                    "h-full transition-colors",
                                    darkMode
                                        ? "bg-neutral-900/40 border-white/5 hover:border-white/10"
                                        : "bg-white/40 border-black/5 hover:border-black/10",
                                    service.className
                                )}
                            />
                        </ScrollReveal>
                    ))}
                </BentoGrid>

                {/* Detalle por servicio — texto indexable + cross-links con
                    anchor de keyword hacia /soluciones, /proyectos y /contacto */}
                <ScrollReveal delay={0.05} direction="up">
                    <div
                        className={cn(
                            "grid md:grid-cols-2 gap-4 mb-16 border-t pt-12",
                            darkMode ? "border-white/10" : "border-black/10"
                        )}
                    >
                        {serviceDetails.map((service, i) => (
                            <article
                                key={i}
                                className={cn(
                                    "rounded-2xl border p-6 flex flex-col transition-colors",
                                    darkMode
                                        ? "border-white/10 bg-white/[0.02] hover:border-white/20"
                                        : "border-black/10 bg-white hover:border-black/20"
                                )}
                            >
                                <h3 className={cn("text-lg font-semibold mb-3", darkMode ? "text-white" : "text-neutral-900")}>
                                    {service.title}
                                </h3>
                                <p className={cn("text-sm font-light leading-[1.6] mb-5 flex-1", darkMode ? "text-neutral-400" : "text-neutral-600")}>
                                    {service.detail}
                                </p>
                                <a
                                    href={service.href}
                                    className={cn(
                                        "inline-flex items-center gap-1.5 text-sm font-medium w-fit transition-colors group/link",
                                        darkMode
                                            ? "text-purple-300/90 hover:text-purple-200"
                                            : "text-purple-700 hover:text-purple-900"
                                    )}
                                >
                                    {service.linkText}
                                    <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                                </a>
                            </article>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Metrics - Technical Style */}
                <div className={cn("grid md:grid-cols-3 gap-6 border-t pt-12 transition-colors",
                    darkMode ? "border-white/5" : "border-black/5"
                )}>
                    {metrics.map((metric, i) => (
                        <ScrollReveal key={i} delay={0.3 + i * 0.1} direction="up">
                            <div className="text-center p-6 group">
                                <div className={cn("text-3xl md:text-4xl font-mono font-bold mb-2 group-hover:text-purple-400 transition-colors",
                                    darkMode ? "text-white" : "text-black"
                                )}>
                                    {metric.val}
                                </div>
                                <div className={cn("text-sm font-bold uppercase tracking-wider mb-1 transition-colors",
                                    darkMode ? "text-white" : "text-black"
                                )}>{metric.label}</div>
                                <p className={cn("text-sm transition-colors", darkMode ? "text-neutral-500" : "text-neutral-600")}>{metric.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;