"use client";

// Parte inferior de /tecnologia: tres beneficios como paneles visuales
// (animación + título) y cierre con CTA.
// El detalle de cada beneficio vive tras un botón "+": está SIEMPRE en el
// HTML (lo leen buscadores y LLMs), solo se pliega visualmente.
import React, { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { useLanguage } from "@/providers/LanguageProvider";
import { ArrowUpRight, Check, Plus, ShieldCheck } from "lucide-react";

const PURPLE = "#8a3c86";
const PURPLE_LIGHT = "#c87bbf";
const inView = { once: true, margin: "-80px" } as const;

// ── Visuales (SVG animado, sin WebGL) ───────────────────────────────────

/** Rendimiento: velocímetro que barre hasta el máximo. */
const SpeedVisual = ({ isDark }: { isDark: boolean }) => (
    <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden>
        <path d="M30 130 A90 90 0 0 1 210 130" fill="none" stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} strokeWidth="14" strokeLinecap="round" />
        <motion.path
            d="M30 130 A90 90 0 0 1 210 130"
            fill="none"
            stroke="url(#speed-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.94 }}
            viewport={inView}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
            <linearGradient id="speed-grad" x1="0" x2="1">
                <stop offset="0" stopColor="#592355" />
                <stop offset="1" stopColor={PURPLE_LIGHT} />
            </linearGradient>
        </defs>
        <text x="120" y="118" textAnchor="middle" fontSize="46" fontWeight="600" letterSpacing="-2" fill={isDark ? "#fff" : "#171717"}>
            &lt; 2 s
        </text>
    </svg>
);

/** Seguridad: escudo con anillos orbitando. */
const ShieldVisual = ({ isDark, still }: { isDark: boolean; still: boolean }) => {
    const ring = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
    return (
        <div className="relative w-full h-full flex items-center justify-center" aria-hidden>
            <svg viewBox="0 0 200 200" className="absolute h-full">
                <motion.g
                    style={{ transformOrigin: "100px 100px" }}
                    animate={still ? undefined : { rotate: 360 }}
                    transition={{ duration: 28, ease: "linear", repeat: Infinity }}
                >
                    <circle cx="100" cy="100" r="88" fill="none" stroke={ring} strokeWidth="1.5" strokeDasharray="3 9" />
                    <circle cx="188" cy="100" r="4" fill={PURPLE_LIGHT} />
                </motion.g>
                <motion.g
                    style={{ transformOrigin: "100px 100px" }}
                    animate={still ? undefined : { rotate: -360 }}
                    transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                >
                    <circle cx="100" cy="100" r="64" fill="none" stroke={PURPLE} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="60 20" />
                </motion.g>
            </svg>
            <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-20 h-20 rounded-[26px] flex items-center justify-center text-white shadow-[0_12px_40px_-8px_rgba(138,60,134,0.7)]"
                style={{ background: "linear-gradient(135deg, #592355, #8a3c86)" }}
            >
                <ShieldCheck size={38} strokeWidth={1.6} />
            </motion.div>
        </div>
    );
};

/** Escalabilidad: barras que crecen. */
const GrowthVisual = ({ isDark }: { isDark: boolean }) => {
    const bars = [18, 28, 40, 56, 78, 104, 132];
    return (
        <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden>
            <line x1="14" y1="142" x2="226" y2="142" stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"} strokeWidth="1.5" />
            {bars.map((h, i) => (
                <motion.rect
                    key={i}
                    x={20 + i * 30}
                    y={140 - h}
                    width="20"
                    height={h}
                    rx="7"
                    fill={PURPLE}
                    fillOpacity={0.3 + (i / (bars.length - 1)) * 0.7}
                    style={{ transformOrigin: `${30 + i * 30}px 140px` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
            ))}
        </svg>
    );
};

// ── Panel de beneficio ──────────────────────────────────────────────────

interface BenefitPanelProps {
    index: number;
    title: string;
    description: string;
    items: string[];
    visual: React.ReactNode;
    moreLabel: string;
    lessLabel: string;
}

const BenefitPanel = ({ index, title, description, items, visual, moreLabel, lessLabel }: BenefitPanelProps) => {
    const { isDark } = useTheme();
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={cn("relative flex flex-col rounded-[32px] md:rounded-[40px] p-7 md:p-8", isDark ? "bg-[#111113]" : "bg-[#f1f1f4]")}
        >
            <div className="h-44 md:h-52 mb-6">{visual}</div>

            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] mb-2", isDark ? "text-[#c87bbf]" : "text-[#8a3c86]")}>
                        {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className={cn("text-2xl md:text-3xl font-semibold tracking-tight", isDark ? "text-white" : "text-neutral-900")}>
                        {title}
                    </h3>
                </div>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={`${open ? lessLabel : moreLabel}: ${title}`}
                    className={cn(
                        "shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300",
                        open
                            ? "bg-[#8a3c86] text-white"
                            : isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-neutral-900 text-white hover:bg-[#8a3c86]"
                    )}
                >
                    <Plus size={20} className={cn("transition-transform duration-300", open && "rotate-45")} />
                </button>
            </div>

            {/* Detalle plegable: permanece en el DOM para SEO/GEO */}
            <div
                id={panelId}
                inert={!open}
                className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
                <div className="overflow-hidden">
                    <p className={cn("text-sm leading-relaxed pt-5 mb-4", isDark ? "text-neutral-400" : "text-neutral-600")}>
                        {description}
                    </p>
                    <ul className="space-y-2.5">
                        {items.map((item, i) => (
                            <li key={i} className={cn("flex items-start gap-2.5 text-sm", isDark ? "text-neutral-300" : "text-neutral-700")}>
                                <Check size={16} className="mt-0.5 shrink-0 text-[#8a3c86]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.article>
    );
};

// ── Sección ─────────────────────────────────────────────────────────────

export const TechDetailSection = () => {
    const { isDark } = useTheme();
    const { t, language } = useLanguage();
    const reduceMotion = useReducedMotion();
    const p = language === "en" ? "/en" : "";
    const d = t.technologies.details;
    const moreLabel = language === "en" ? "Show details" : "Ver detalles";
    const lessLabel = language === "en" ? "Hide details" : "Ocultar detalles";

    const panels = [
        { ...d.benefits.performance, visual: <SpeedVisual isDark={isDark} /> },
        { ...d.benefits.security, visual: <ShieldVisual isDark={isDark} still={!!reduceMotion} /> },
        { ...d.benefits.scalability, visual: <GrowthVisual isDark={isDark} /> },
    ];

    return (
        <div className="w-full relative z-20 pt-24 md:pt-32 pb-6 px-3 sm:px-5 bg-background">
            <div className="max-w-[1500px] mx-auto">
                {/* Encabezado: titular grande a la izquierda, texto breve a la derecha */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="grid md:grid-cols-12 gap-6 md:gap-10 items-end px-3 md:px-6 mb-12 md:mb-16"
                >
                    <div className="md:col-span-8">
                        <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] mb-5", isDark ? "text-[#c87bbf]" : "text-[#8a3c86]")}>
                            {d.badge}
                        </p>
                        <h2 className={cn("text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]", isDark ? "text-white" : "text-neutral-900")}>
                            {d.title} <span className="gradient-text">{d.titleHighlight}</span>
                        </h2>
                    </div>
                    <p className={cn("md:col-span-4 text-base leading-relaxed", isDark ? "text-neutral-400" : "text-neutral-600")}>
                        {d.description}
                    </p>
                </motion.div>

                {/* Beneficios */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 items-start">
                    {panels.map((panel, i) => (
                        <BenefitPanel
                            key={i}
                            index={i}
                            title={panel.title}
                            description={panel.description}
                            items={panel.items}
                            visual={panel.visual}
                            moreLabel={moreLabel}
                            lessLabel={lessLabel}
                        />
                    ))}
                </div>

                {/* Cierre: panel morado con CTA interno (conserva link equity) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-[32px] md:rounded-[44px] mt-3 sm:mt-5 px-7 py-14 md:px-16 md:py-24 text-white"
                    style={{ background: "linear-gradient(135deg, #3d1839 0%, #592355 45%, #8a3c86 100%)" }}
                >
                    <div
                        aria-hidden
                        className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 65%)" }}
                    />
                    <div className="relative grid md:grid-cols-12 gap-8 items-end">
                        <p className="md:col-span-8 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                            {d.cta.text}
                        </p>
                        <div className="md:col-span-4 flex flex-col items-start md:items-end gap-5">
                            <a
                                href={`${p}/contacto`}
                                className="group inline-flex items-center gap-2 pl-7 pr-5 py-4 rounded-full bg-white text-neutral-900 text-base font-medium transition-transform duration-300 hover:scale-[1.03]"
                            >
                                {d.cta.button}
                                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a
                                href={`${p}/proyectos`}
                                className="text-sm text-white/75 border-b border-white/30 pb-0.5 transition-colors hover:text-white md:text-right"
                            >
                                {d.crossProjects}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
