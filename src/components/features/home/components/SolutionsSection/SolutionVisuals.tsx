"use client";

// Visuales abstractos por solución (SVG animado, sin WebGL).
import React from "react";
import { motion } from "framer-motion";

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

/** Automatización: un flujo de nodos conectados por el que viaja un pulso. */
export const AutomationVisual = ({ isDark, still }: VisualProps) => {
    const node = isDark ? "#232327" : "#f1f1f4";
    const stroke = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)";
    const paths = [
        "M92 120 C140 120 140 60 188 60",
        "M92 120 C140 120 140 180 188 180",
        "M252 60 C300 60 300 120 348 120",
        "M252 180 C300 180 300 120 348 120",
    ];
    const nodes = [
        { x: 28, y: 88, accent: false },
        { x: 188, y: 28, accent: false },
        { x: 188, y: 148, accent: false },
        { x: 348, y: 88, accent: true },
    ];
    return (
        <svg viewBox="0 0 440 240" className="w-full h-full" aria-hidden>
            {paths.map((d, i) => (
                <g key={d}>
                    <motion.path
                        d={d}
                        fill="none"
                        stroke={PURPLE}
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={inView}
                        transition={{ duration: 1, delay: 0.3 + (i > 1 ? 0.6 : 0), ease: EASE }}
                    />
                    {!still && (
                        <circle r="5" fill={PURPLE_LIGHT}>
                            <animateMotion dur="2.4s" begin={`${1.6 + (i % 2) * 0.5 + (i > 1 ? 1.2 : 0)}s`} repeatCount="indefinite" path={d} />
                        </circle>
                    )}
                </g>
            ))}
            {nodes.map((n, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
                    style={{ transformOrigin: `${n.x + 32}px ${n.y + 32}px` }}
                >
                    <rect x={n.x} y={n.y} width="64" height="64" rx="20" fill={n.accent ? "url(#auto-accent)" : node} stroke={n.accent ? "none" : stroke} strokeWidth="1.5" />
                    <circle cx={n.x + 32} cy={n.y + 32} r="7" fill={n.accent ? "#fff" : PURPLE} />
                </motion.g>
            ))}
            <defs>
                <linearGradient id="auto-accent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={PURPLE_DARK} />
                    <stop offset="1" stopColor={PURPLE} />
                </linearGradient>
            </defs>
        </svg>
    );
};

/** Desarrollo: una ventana web y un móvil cuyo contenido se va construyendo. */
export const DevelopmentVisual = ({ isDark }: VisualProps) => {
    const frame = isDark ? "#232327" : "#f1f1f4";
    const stroke = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)";
    const bar = isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.13)";
    const lines = [
        { y: 78, w: 150, accent: true },
        { y: 100, w: 210, accent: false },
        { y: 122, w: 180, accent: false },
        { y: 144, w: 120, accent: false },
        { y: 176, w: 90, accent: true },
    ];
    return (
        <svg viewBox="0 0 440 240" className="w-full h-full" aria-hidden>
            {/* Ventana */}
            <rect x="30" y="24" width="300" height="192" rx="22" fill={frame} stroke={stroke} strokeWidth="1.5" />
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={54 + i * 16} cy="46" r="4.5" fill={i === 0 ? PURPLE : bar} />
            ))}
            {lines.map((l, i) => (
                <motion.rect
                    key={l.y}
                    x="54"
                    y={l.y}
                    height={l.accent ? 12 : 8}
                    rx={l.accent ? 6 : 4}
                    fill={l.accent ? PURPLE : bar}
                    initial={{ width: 0 }}
                    whileInView={{ width: l.w }}
                    viewport={inView}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.14, ease: EASE }}
                />
            ))}
            {/* Móvil */}
            <motion.g
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
                <rect x="296" y="64" width="112" height="168" rx="24" fill={isDark ? "#111113" : "#ffffff"} stroke={PURPLE} strokeWidth="2" />
                <rect x="312" y="84" width="80" height="54" rx="12" fill="url(#dev-accent)" />
                <rect x="312" y="150" width="80" height="8" rx="4" fill={bar} />
                <rect x="312" y="166" width="56" height="8" rx="4" fill={bar} />
                <rect x="312" y="194" width="80" height="20" rx="10" fill={PURPLE} />
            </motion.g>
            <defs>
                <linearGradient id="dev-accent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={PURPLE_DARK} />
                    <stop offset="1" stopColor={PURPLE_LIGHT} />
                </linearGradient>
            </defs>
        </svg>
    );
};

/** Consultoría: una tendencia que sube hasta dar en el objetivo. */
export const ConsultingVisual = ({ isDark }: VisualProps) => {
    const ring = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
    const grid = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
    return (
        <svg viewBox="0 0 440 240" className="w-full h-full" aria-hidden>
            {[60, 110, 160, 210].map((y) => (
                <line key={y} x1="24" x2="416" y1={y} y2={y} stroke={grid} strokeWidth="1" />
            ))}
            {/* Objetivo */}
            {[54, 36, 18].map((r, i) => (
                <motion.circle
                    key={r}
                    cx="340"
                    cy="74"
                    r={r}
                    fill={i === 2 ? PURPLE : "none"}
                    stroke={i === 2 ? "none" : i === 1 ? PURPLE : ring}
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
                    style={{ transformOrigin: "340px 74px" }}
                />
            ))}
            {/* Tendencia */}
            <motion.path
                d="M36 204 L110 176 L170 188 L236 136 L286 120 L340 74"
                fill="none"
                stroke="url(#cons-line)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={inView}
                transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
            />
            {[
                [110, 176],
                [170, 188],
                [236, 136],
                [286, 120],
            ].map(([x, y], i) => (
                <motion.circle
                    key={x}
                    cx={x}
                    cy={y}
                    r="6"
                    fill={isDark ? "#19191c" : "#ffffff"}
                    stroke={PURPLE}
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.25, ease: EASE }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                />
            ))}
            <defs>
                <linearGradient id="cons-line" x1="0" x2="1">
                    <stop offset="0" stopColor={PURPLE_DARK} />
                    <stop offset="1" stopColor={PURPLE_LIGHT} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const SOLUTION_VISUALS = {
    automation: AutomationVisual,
    development: DevelopmentVisual,
    consulting: ConsultingVisual,
} as const;
