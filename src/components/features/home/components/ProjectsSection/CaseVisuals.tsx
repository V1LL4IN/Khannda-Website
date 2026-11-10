"use client";

// Visuales abstractos por caso (SVG animado, sin WebGL). Son ilustraciones,
// no capturas del sistema: cuando haya capturas o videos reales, sustituyen
// a estos componentes en CASE_VISUALS.
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const PURPLE = "#8a3c86";
const PURPLE_LIGHT = "#c87bbf";
const PURPLE_DARK = "#592355";
const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "-80px" } as const;

interface VisualProps {
    isDark: boolean;
    /** true = sin animaciones en bucle (prefers-reduced-motion). */
    still: boolean;
}

/** Fintech: curva de saldo que crece sobre una rejilla contable. */
export const FinanceVisual = ({ isDark }: VisualProps) => {
    const line = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
    const curve = "M20 190 C70 180 90 150 130 146 S190 120 220 96 S290 70 340 36";
    return (
        <svg viewBox="0 0 360 230" className="w-full h-full" aria-hidden>
            {[40, 90, 140, 190].map((y) => (
                <line key={y} x1="20" x2="340" y1={y} y2={y} stroke={line} strokeWidth="1" />
            ))}
            <defs>
                <linearGradient id="fin-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={PURPLE} stopOpacity="0.38" />
                    <stop offset="1" stopColor={PURPLE} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="fin-line" x1="0" x2="1">
                    <stop offset="0" stopColor={PURPLE_DARK} />
                    <stop offset="1" stopColor={PURPLE_LIGHT} />
                </linearGradient>
            </defs>
            <motion.path
                d={`${curve} L340 190 Z`}
                fill="url(#fin-area)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 1, delay: 0.9 }}
            />
            <motion.path
                d={curve}
                fill="none"
                stroke="url(#fin-line)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={inView}
                transition={{ duration: 1.8, ease: EASE }}
            />
            <motion.circle
                cx="340"
                cy="36"
                r="8"
                fill={PURPLE_LIGHT}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.5, delay: 1.6, ease: EASE }}
                style={{ transformOrigin: "340px 36px" }}
            />
            {/* "Asientos" auditados */}
            {[0, 1, 2].map((i) => (
                <motion.rect
                    key={i}
                    x="20"
                    y={204 + i * 9}
                    height="4"
                    rx="2"
                    fill={isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.14)"}
                    initial={{ width: 0 }}
                    whileInView={{ width: 320 - i * 70 }}
                    viewport={inView}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
                />
            ))}
        </svg>
    );
};

/** Fitness: anillos de asistencia que se completan. */
export const FitnessVisual = ({ isDark }: VisualProps) => {
    const track = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
    const rings = [
        { r: 92, to: 0.86, color: PURPLE_LIGHT },
        { r: 68, to: 0.72, color: PURPLE },
        { r: 44, to: 0.58, color: PURPLE_DARK },
    ];
    return (
        <svg viewBox="0 0 240 240" className="w-full h-full" aria-hidden>
            <g transform="rotate(-90 120 120)">
                {rings.map((ring, i) => (
                    <g key={ring.r}>
                        <circle cx="120" cy="120" r={ring.r} fill="none" stroke={track} strokeWidth="17" />
                        <motion.circle
                            cx="120"
                            cy="120"
                            r={ring.r}
                            fill="none"
                            stroke={ring.color}
                            strokeWidth="17"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: ring.to }}
                            viewport={inView}
                            transition={{ duration: 1.6, delay: i * 0.15, ease: EASE }}
                        />
                    </g>
                ))}
            </g>
        </svg>
    );
};

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
