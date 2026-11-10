"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { Zap, Shield, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

interface BenefitCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    benefits: string[];
    accentColor: "cyan" | "purple" | "emerald";
    delay?: number;
}

const BenefitCard = ({ title, description, icon, benefits, accentColor, delay = 0 }: BenefitCardProps) => {
    const { isDark } = useTheme();

    const colorMap = {
        cyan: {
            icon: isDark ? "text-cyan-400" : "text-cyan-600",
            iconBg: isDark ? "bg-cyan-500/10" : "bg-cyan-500/20",
            check: isDark ? "text-cyan-400/70" : "text-cyan-600/70",
            gradient: "from-cyan-500/20 to-transparent",
        },
        purple: {
            icon: isDark ? "text-purple-400" : "text-purple-600",
            iconBg: isDark ? "bg-purple-500/10" : "bg-purple-500/20",
            check: isDark ? "text-purple-400/70" : "text-purple-600/70",
            gradient: "from-purple-500/20 to-transparent",
        },
        emerald: {
            icon: isDark ? "text-emerald-400" : "text-emerald-600",
            iconBg: isDark ? "bg-emerald-500/10" : "bg-emerald-500/20",
            check: isDark ? "text-emerald-400/70" : "text-emerald-600/70",
            gradient: "from-emerald-500/20 to-transparent",
        },
    };

    const colors = colorMap[accentColor];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.5 }}
            className={cn(
                "group relative overflow-hidden rounded-[28px] p-7",
                "transition-all duration-300",
                isDark
                    ? "bg-neutral-900/60 border border-white/[0.08] hover:border-white/[0.15] hover:shadow-xl"
                    : "bg-white/80 border border-neutral-200 hover:border-neutral-300 hover:shadow-xl"
            )}
        >
            {/* Subtle gradient overlay on hover */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                colors.gradient
            )} />

            <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                    <div className={cn("p-3 rounded-2xl", colors.iconBg)}>
                        <span className={colors.icon}>
                            {icon}
                        </span>
                    </div>
                    <h3 className={cn(
                        "text-xl font-semibold",
                        isDark ? "text-white" : "text-neutral-900"
                    )}>
                        {title}
                    </h3>
                </div>

                {/* Description */}
                <p className={cn(
                    "text-sm leading-relaxed mb-6",
                    isDark ? "text-neutral-400" : "text-neutral-600"
                )}>
                    {description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                    {benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={16} className={cn("mt-0.5 flex-shrink-0", colors.check)} />
                            <span className={cn(
                                "text-sm",
                                isDark ? "text-neutral-300" : "text-neutral-700"
                            )}>
                                {benefit}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

import { useLanguage } from "@/providers/LanguageProvider";

// ... (BenefitCard component stays the same)

export const TechDetailSection = () => {
    const { isDark } = useTheme();
    const { t, language } = useLanguage();
    const p = language === 'en' ? '/en' : '';

    const benefitCards = [
        {
            title: t.technologies.details.benefits.performance.title,
            description: t.technologies.details.benefits.performance.description,
            icon: <Zap className="w-6 h-6" />,
            benefits: t.technologies.details.benefits.performance.items,
            accentColor: "cyan" as const,
        },
        {
            title: t.technologies.details.benefits.security.title,
            description: t.technologies.details.benefits.security.description,
            icon: <Shield className="w-6 h-6" />,
            benefits: t.technologies.details.benefits.security.items,
            accentColor: "purple" as const,
        },
        {
            title: t.technologies.details.benefits.scalability.title,
            description: t.technologies.details.benefits.scalability.description,
            icon: <TrendingUp className="w-6 h-6" />,
            benefits: t.technologies.details.benefits.scalability.items,
            accentColor: "emerald" as const,
        },
    ];

    return (
        <div className={cn("w-full min-h-screen relative z-20 pt-20 pb-32 px-6", isDark ? "bg-background" : "bg-background")}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6",
                        isDark
                            ? "bg-purple-500/10 border border-purple-500/20 text-purple-400"
                            : "bg-purple-100 border border-purple-200 text-purple-700"
                    )}>
                        <Sparkles size={14} />
                        <span>{t.technologies.details.badge}</span>
                    </div>

                    <h2 className={cn(
                        "text-4xl md:text-5xl font-bold mb-6 tracking-tight",
                        isDark ? "text-white" : "text-neutral-900"
                    )}>
                        {t.technologies.details.title}{" "}
                        <span className="gradient-text">{t.technologies.details.titleHighlight}</span>
                    </h2>

                    <p className={cn(
                        "max-w-2xl mx-auto text-lg leading-relaxed",
                        isDark ? "text-neutral-400" : "text-neutral-600"
                    )}>
                        {t.technologies.details.description}
                    </p>
                </motion.div>

                {/* Benefit Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefitCards.map((card, idx) => (
                        <BenefitCard
                            key={idx}
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                            benefits={card.benefits}
                            accentColor={card.accentColor}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-center mt-16"
                >
                    <p className={cn(
                        "text-sm mb-4",
                        isDark ? "text-neutral-500" : "text-neutral-500"
                    )}>
                        {t.technologies.details.cta.text}
                    </p>
                    {/* CTA interno (antes WhatsApp externo): conserva link equity */}
                    <a
                        href={`${p}/contacto`}
                        className={cn(
                            "inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-200",
                            isDark
                                ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white"
                                : "bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 hover:border-neutral-300 text-neutral-900"
                        )}
                    >
                        {t.technologies.details.cta.button} →
                    </a>
                    <p className="mt-6 text-sm">
                        <a
                            href={`${p}/proyectos`}
                            className={cn(
                                "border-b pb-0.5 transition-colors",
                                isDark
                                    ? "text-purple-300/80 border-purple-300/30 hover:text-purple-200"
                                    : "text-purple-700 border-purple-300 hover:text-purple-900"
                            )}
                        >
                            {t.technologies.details.crossProjects}
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
