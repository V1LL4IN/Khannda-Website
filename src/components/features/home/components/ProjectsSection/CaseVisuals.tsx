"use client";

// Visuales por caso: capturas reales del sistema (DeviceMockup) o, mientras
// no haya capturas, una ilustración abstracta en SVG animado.
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import { DeviceMockup } from "./DeviceMockup";

const PURPLE = "#8a3c86";
const PURPLE_LIGHT = "#c87bbf";
const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "-80px" } as const;

interface VisualProps {
    isDark: boolean;
    /** true = sin animaciones en bucle (prefers-reduced-motion). */
    still: boolean;
}

/** Captura real del sistema (escritorio + móvil) con datos de demostración. */
const screenshotVisual = (slug: string, caseKey: "finance" | "fitness") => {
    const ScreenshotVisual = ({ isDark, still }: VisualProps) => {
        const { t } = useLanguage();
        const { labels, showcase } = t.projects;
        return (
            <DeviceMockup
                slug={slug}
                alt={`${labels.screenshot}: ${showcase[caseKey].sector}`}
                note={labels.demoData}
                isDark={isDark}
                still={still}
            />
        );
    };
    return ScreenshotVisual;
};

export const FinanceVisual = screenshotVisual("coop", "finance");
export const FitnessVisual = screenshotVisual("gym", "fitness");

/** E-commerce: esfera de 24 horas siempre activa alrededor de la compra. */
export const RetailVisual = ({ isDark, still }: VisualProps) => {
    const idle = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
    return (
        <div className="relative w-full h-full flex items-center justify-center" aria-hidden>
            <svg viewBox="0 0 240 240" className="absolute h-full">
                {Array.from({ length: 24 }, (_, i) => {
                    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
                    const x1 = 120 + Math.cos(a) * 88;
                    const y1 = 120 + Math.sin(a) * 88;
                    const x2 = 120 + Math.cos(a) * 106;
                    const y2 = 120 + Math.sin(a) * 106;
                    return (
                        <motion.line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            strokeWidth="5"
                            strokeLinecap="round"
                            initial={{ stroke: idle }}
                            whileInView={{ stroke: PURPLE }}
                            viewport={inView}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                        />
                    );
                })}
                <motion.g
                    style={{ transformOrigin: "120px 120px" }}
                    animate={still ? undefined : { rotate: 360 }}
                    transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                >
                    <circle cx="120" cy="120" r="70" fill="none" stroke={PURPLE} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 10" />
                    <circle cx="190" cy="120" r="5" fill={PURPLE_LIGHT} />
                </motion.g>
            </svg>
            <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative w-[26%] aspect-square max-w-[104px] rounded-[30%] flex items-center justify-center text-white shadow-[0_12px_40px_-8px_rgba(138,60,134,0.7)]"
                style={{ background: "linear-gradient(135deg, #592355, #8a3c86)" }}
            >
                <ShoppingBag className="w-[46%] h-[46%]" strokeWidth={1.6} />
            </motion.div>
        </div>
    );
};

export const CASE_VISUALS = {
    finance: FinanceVisual,
    fitness: FitnessVisual,
    retail: RetailVisual,
} as const;
