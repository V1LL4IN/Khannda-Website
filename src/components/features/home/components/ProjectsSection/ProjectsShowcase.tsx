"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { ScrollModel } from "@/components/shared/ui/ScrollModel";

type CaseKey = "finance" | "fitness" | "retail";

// Un modelo 3D holográfico por caso (GLB generados con Higgsfield).
const MODELS: Record<CaseKey, { src: string; poster: string; glow: "purple" | "cyan" | "mixed" }> = {
    finance: { src: "/models/vault.glb", poster: "/models/vault.webp", glow: "mixed" },
    fitness: { src: "/models/kettlebell.glb", poster: "/models/kettlebell.webp", glow: "purple" },
    retail: { src: "/models/academy.glb", poster: "/models/academy.webp", glow: "cyan" },
};

const KEYS: CaseKey[] = ["finance", "fitness", "retail"];

/** Esquinas tipo HUD para el panel. */
const Corners = ({ isDark }: { isDark: boolean }) => (
    <>
        {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((pos) => (
            <span
                key={pos}
                aria-hidden
                className={cn("absolute w-4 h-4 pointer-events-none", pos, isDark ? "border-cyan-300/50" : "border-purple-500/40")}
            />
        ))}
    </>
);

export function ProjectsShowcase() {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const [active, setActive] = useState<CaseKey>("finance");
    const current = t.projects.showcase[active];
    const model = MODELS[active];
    const index = KEYS.indexOf(active);

    return (
        <div className="max-w-5xl mx-auto w-full">
            {/* Selector de caso */}
            <div role="tablist" className="flex flex-row items-center justify-start overflow-auto no-visible-scrollbar max-w-full w-full mb-6">
                {KEYS.map((key) => (
                    <button
                        key={key}
                        role="tab"
                        aria-selected={active === key}
                        onClick={() => setActive(key)}
                        className="relative px-4 py-2 rounded-full shrink-0"
                    >
                        {active === key && (
                            <motion.div
                                layoutId="projects-active-tab"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                className={cn(
                                    "absolute inset-0 rounded-full border",
                                    isDark
                                        ? "bg-white/[0.06] border-cyan-300/30 shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                                        : "bg-white border-purple-300 shadow-md"
                                )}
                            />
                        )}
                        <span
                            className={cn(
                                "relative block font-medium transition-colors",
                                active === key
                                    ? isDark ? "text-white" : "text-neutral-900"
                                    : isDark ? "text-neutral-400 hover:text-white" : "text-neutral-500 hover:text-neutral-900"
                            )}
                        >
                            {t.projects.showcase[key].title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Panel holográfico */}
            <div
                role="tabpanel"
                className={cn(
                    "relative overflow-hidden rounded-2xl border",
                    isDark
                        ? "border-white/10 bg-neutral-950/70 shadow-[0_0_80px_-20px_rgba(168,85,247,0.45)]"
                        : "border-black/10 bg-white shadow-xl"
                )}
            >
                {/* Rejilla de fondo */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                        backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(ellipse at 30% 50%, black 10%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse at 30% 50%, black 10%, transparent 70%)",
                    }}
                />
                <Corners isDark={isDark} />

                <div className="relative grid md:grid-cols-2 items-center gap-2 md:gap-6 p-6 md:p-10">
                    {/* Modelo 3D — rota con el scroll y sigue al cursor */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.35 }}
                        >
                            <ScrollModel
                                src={model.src}
                                poster={model.poster}
                                glow={model.glow}
                                alt={current.title}
                                turns={1.25}
                                className="w-full aspect-square max-w-[420px] mx-auto"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Ficha del caso */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35 }}
                        >
                            <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] mb-3", isDark ? "text-cyan-300/80" : "text-purple-700")}>
                                {String(index + 1).padStart(2, "0")} / {String(KEYS.length).padStart(2, "0")} · {current.sector}
                            </p>
                            <p className={cn("text-3xl md:text-4xl font-bold tracking-tight mb-5", isDark ? "text-white" : "text-neutral-900")}>
                                {current.title}
                            </p>
                            <ul className="space-y-2.5 mb-6">
                                {current.results.map((result, i) => (
                                    <li key={i} className={cn("flex gap-3 text-sm leading-relaxed", isDark ? "text-neutral-300" : "text-neutral-700")}>
                                        <span
                                            aria-hidden
                                            className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                                        />
                                        {result}
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex flex-wrap gap-1.5 mb-7">
                                {current.stack.map((tech) => (
                                    <li
                                        key={tech}
                                        className={cn(
                                            "px-2.5 py-1 rounded-[3px] font-mono text-[11px] border",
                                            isDark ? "border-white/10 bg-white/[0.04] text-neutral-300" : "border-black/10 bg-neutral-50 text-neutral-700"
                                        )}
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={`#caso-${active}`}
                                className={cn(
                                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                                    isDark
                                        ? "border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-300/40"
                                        : "border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                                )}
                            >
                                {t.work.viewCase} ↓
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
