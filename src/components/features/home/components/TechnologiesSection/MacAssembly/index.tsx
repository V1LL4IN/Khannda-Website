"use client";

// MacAssembly — secuencia "scrollytelling": un portátil 3D se ensambla pieza
// por pieza con el scroll y termina mostrando el stack en su pantalla.
// - El escenario queda fijo (sticky) mientras se recorre la sección.
// - Sin WebGL o con prefers-reduced-motion se usa MacbookShowcase (estático).
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/LanguageProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { MacbookShowcase } from "../MacbookShowcase";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

// Tramo de scroll en el que se muestra cada texto
const STEP_RANGES: [number, number][] = [
    [0, 0.24],
    [0.24, 0.48],
    [0.48, 0.7],
    [0.7, 1.01],
];

function hasWebGL() {
    try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
        return false;
    }
}

export function MacAssembly() {
    const { t } = useLanguage();
    const { isDark } = useTheme();
    const reduceMotion = useReducedMotion();
    const track = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(0);
    const [inView, setInView] = useState(false);
    const [webgl, setWebgl] = useState(true);

    const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const i = STEP_RANGES.findIndex(([a, b]) => p >= a && p < b);
        if (i !== -1) setStep(i);
    });

    useEffect(() => setWebgl(hasWebGL()), []);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    if (reduceMotion || !webgl) {
        return (
            <div className="w-full -mb-[20vh]">
                <MacbookShowcase />
            </div>
        );
    }

    const b = t.technologies.details.benefits;
    const steps = [
        { title: b.performance.title, body: b.performance.description },
        { title: b.security.title, body: b.security.description },
        { title: b.scalability.title, body: b.scalability.description },
        // El stack se dibuja en un canvas: este texto es su única versión legible
        { title: t.technologies.stackScreen.header, body: t.technologies.stackScreen.list },
    ];

    return (
        <div ref={track} className="relative h-[420vh]">
            <div className="sticky top-0 h-screen px-3 sm:px-5 pt-20 pb-4">
                {/* Escenario: panel grande de esquinas amplias */}
                <div
                    className={cn(
                        "relative w-full h-full overflow-hidden rounded-[32px] md:rounded-[44px]",
                        isDark ? "bg-[#111113]" : "bg-[#f1f1f4]"
                    )}
                >
                    <div className="absolute inset-0">
                        <Scene progress={scrollYProgress} isDark={isDark} active={inView} />
                    </div>

                    {/* Textos por etapa — siempre en el DOM (SEO), solo cambia la opacidad */}
                    <div className="absolute left-6 right-20 bottom-8 md:left-12 md:right-auto md:bottom-12 md:w-[22rem] pointer-events-none">
                        <div className="relative h-40 md:h-44">
                            {steps.map((s, i) => (
                                <div
                                    key={i}
                                    aria-hidden={step !== i}
                                    className={cn(
                                        "absolute inset-x-0 bottom-0 transition-all duration-500 ease-out",
                                        step === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                                    )}
                                >
                                    <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em] mb-3", isDark ? "text-[#c87bbf]" : "text-[#8a3c86]")}>
                                        {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                                    </p>
                                    <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight mb-3", isDark ? "text-white" : "text-neutral-900")}>
                                        {s.title}
                                    </h2>
                                    <p className={cn("text-sm md:text-base leading-relaxed", isDark ? "text-neutral-400" : "text-neutral-600")}>
                                        {s.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicador de avance */}
                    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2" aria-hidden>
                        {steps.map((_, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "w-1 rounded-full transition-all duration-500",
                                    step === i ? "h-8 bg-[#8a3c86]" : cn("h-3", isDark ? "bg-white/15" : "bg-black/15")
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MacAssembly;
