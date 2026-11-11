"use client";

// Visuales por caso: capturas reales de cada proyecto dentro de un mockup
// (DeviceMockup). Los sistemas internos se muestran con datos de demostración
// y marca genérica; los sitios públicos, tal como son.
import React from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { DeviceMockup } from "./DeviceMockup";

interface VisualProps {
    isDark: boolean;
    /** true = sin animaciones (prefers-reduced-motion). */
    still: boolean;
}

type CaseKey = "finance" | "fitness" | "altus";

interface ScreenshotOptions {
    /** Incluye el teléfono con la vista móvil. */
    mobile?: boolean;
    /** La captura usa datos ficticios: muestra la etiqueta que lo aclara. */
    demo?: boolean;
    /** Primer panel: carga la captura con prioridad. */
    priority?: boolean;
}

const screenshotVisual = (slug: string, caseKey: CaseKey, { mobile = false, demo = false, priority = false }: ScreenshotOptions) => {
    const ScreenshotVisual = ({ isDark, still }: VisualProps) => {
        const { t } = useLanguage();
        const { labels, showcase } = t.projects;
        return (
            <DeviceMockup
                slug={slug}
                mobile={mobile}
                priority={priority}
                alt={`${labels.screenshot}: ${showcase[caseKey].sector}`}
                note={demo ? labels.demoData : undefined}
                isDark={isDark}
                still={still}
            />
        );
    };
    return ScreenshotVisual;
};

export const CASE_VISUALS = {
    // Los dos sistemas de gestión no tienen vista móvil: solo escritorio.
    finance: screenshotVisual("coop", "finance", { demo: true, priority: true }),
    fitness: screenshotVisual("gym", "fitness", { demo: true }),
    altus: screenshotVisual("altus", "altus", { mobile: true }),
} as const;
