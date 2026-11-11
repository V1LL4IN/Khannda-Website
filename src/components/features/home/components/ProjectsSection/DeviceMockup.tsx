"use client";

// Mockup de producto: ventana de navegador con la captura de escritorio y un
// teléfono superpuesto con la vista móvil. Las capturas viven en
// /public/projects y se toman del sistema real con datos de demostración.
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "-80px" } as const;

// Tamaño de las capturas (CSS px; los archivos están a 2x)
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

interface DeviceMockupProps {
    /** Nombre base en /public/projects: `${slug}-desktop.webp` y `${slug}-mobile.webp`. */
    slug: string;
    /** false = solo escritorio (el sistema no tiene vista móvil). */
    mobile?: boolean;
    /** true = primer panel, visible sin scroll: carga la captura con prioridad. */
    priority?: boolean;
    alt: string;
    /** Etiqueta corta sobre el mockup (p. ej. "Datos de demostración"). */
    note?: string;
    isDark: boolean;
    /** true = sin animación de entrada (prefers-reduced-motion). */
    still: boolean;
}

export function DeviceMockup({ slug, mobile = true, priority = false, alt, note, isDark, still }: DeviceMockupProps) {
    return (
        <div className="absolute inset-0 flex items-center justify-center p-4 pt-12 pb-20 sm:p-7 sm:pt-14 sm:pb-20 lg:p-8 lg:pb-16">
            <div className="relative w-full max-w-[680px]">
                {/* Escritorio */}
                <motion.div
                    initial={still ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.8, ease: EASE }}
                    className={cn(
                        mobile ? "w-[92%]" : "w-full",
                        "overflow-hidden rounded-[10px] sm:rounded-[14px] border",
                        isDark
                            ? "border-white/10 bg-[#232327] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
                            : "border-black/[0.08] bg-[#f4f4f6] shadow-[0_24px_60px_-24px_rgba(40,20,50,0.35)]"
                    )}
                >
                    <div className="flex items-center gap-[5px] px-3 h-6 sm:h-7" aria-hidden>
                        <span className="size-[7px] sm:size-2 rounded-full bg-[#ff5f57]" />
                        <span className="size-[7px] sm:size-2 rounded-full bg-[#febc2e]" />
                        <span className="size-[7px] sm:size-2 rounded-full bg-[#28c840]" />
                    </div>
                    <Image
                        src={`/projects/${slug}-desktop.webp`}
                        alt={alt}
                        width={DESKTOP.width}
                        height={DESKTOP.height}
                        sizes="(min-width: 1024px) 45vw, 90vw"
                        priority={priority}
                        className="block w-full h-auto"
                    />
                </motion.div>

                {/* Móvil */}
                {mobile && <motion.div
                    initial={still ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
                    className={cn(
                        "absolute right-0 -bottom-[9%] w-[23%] p-[1.1%] rounded-[15%/7%]",
                        "bg-[#101014] shadow-[0_20px_44px_-14px_rgba(0,0,0,0.55)]",
                        isDark && "ring-1 ring-white/15"
                    )}
                >
                    <Image
                        src={`/projects/${slug}-mobile.webp`}
                        alt=""
                        width={MOBILE.width}
                        height={MOBILE.height}
                        sizes="(min-width: 1024px) 12vw, 24vw"
                        className="block w-full h-auto rounded-[12%/5.6%]"
                    />
                </motion.div>}
            </div>

            {note && (
                <p
                    className={cn(
                        "absolute top-4 left-4 lg:top-5 lg:left-5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.16em]",
                        isDark ? "bg-white/[0.06] text-neutral-400" : "bg-neutral-100 text-neutral-500"
                    )}
                >
                    {note}
                </p>
            )}
        </div>
    );
}
