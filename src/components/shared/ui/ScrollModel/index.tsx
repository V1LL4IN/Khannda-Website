"use client";

// ScrollModel — modelo 3D (GLB generado con Higgsfield) que rota con el scroll.
// - El canvas WebGL se carga en diferido y solo se monta cerca del viewport.
// - Fuera de pantalla congela el render loop (frameloop "never").
// - Con prefers-reduced-motion o sin WebGL muestra el póster estático.
import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const ModelCanvas = dynamic(() => import("./ModelCanvas"), { ssr: false });

export interface ScrollModelProps {
    /** Ruta del .glb en /public. */
    src: string;
    /** Render estático (webp con fondo transparente) para carga, SSR y reduced-motion. */
    poster: string;
    alt: string;
    className?: string;
    turns?: number;
    tilt?: [number, number];
    size?: number;
    /** Halo holográfico detrás del modelo. */
    glow?: "purple" | "cyan" | "mixed";
    /** Si es false, solo muestra el póster (p. ej. pestañas no activas). */
    interactive?: boolean;
}

const GLOWS = {
    purple: "radial-gradient(circle at 50% 55%, rgba(168,85,247,0.35) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)",
    cyan: "radial-gradient(circle at 50% 55%, rgba(34,211,238,0.30) 0%, rgba(34,211,238,0.07) 40%, transparent 70%)",
    mixed: "radial-gradient(circle at 40% 50%, rgba(168,85,247,0.32) 0%, transparent 55%), radial-gradient(circle at 62% 60%, rgba(34,211,238,0.26) 0%, transparent 55%)",
};

function hasWebGL() {
    try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
        return false;
    }
}

export function ScrollModel({
    src,
    poster,
    alt,
    className,
    turns,
    tilt,
    size,
    glow = "mixed",
    interactive = true,
}: ScrollModelProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [mounted, setMounted] = useState(false); // canvas montado (una vez)
    const [inView, setInView] = useState(false); // render loop activo
    const [ready, setReady] = useState(false); // modelo cargado → ocultar póster
    const [webgl, setWebgl] = useState(true);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    useEffect(() => setWebgl(hasWebGL()), []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting) setMounted(true);
            },
            { rootMargin: "300px 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const onReady = useCallback(() => setReady(true), []);
    const use3D = interactive && webgl && !reduceMotion;

    return (
        <div ref={ref} className={cn("relative isolate", className)}>
            <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none" style={{ background: GLOWS[glow] }} />
            {/* Anillo holográfico de "base" */}
            <div
                aria-hidden
                className="absolute left-1/2 bottom-[8%] -translate-x-1/2 w-[55%] aspect-[4/1] rounded-[50%] -z-10 pointer-events-none border border-cyan-300/30 opacity-70"
                style={{ boxShadow: "0 0 40px rgba(168,85,247,0.35), inset 0 0 24px rgba(34,211,238,0.25)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={poster}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={cn(
                    "absolute inset-0 w-full h-full object-contain transition-opacity duration-700 select-none pointer-events-none",
                    use3D && ready ? "opacity-0" : "opacity-100"
                )}
            />
            {use3D && mounted && (
                <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
                    <ModelCanvas
                        src={src}
                        progress={scrollYProgress}
                        turns={turns}
                        tilt={tilt}
                        size={size}
                        active={inView}
                        onReady={onReady}
                    />
                </div>
            )}
        </div>
    );
}

export default ScrollModel;
