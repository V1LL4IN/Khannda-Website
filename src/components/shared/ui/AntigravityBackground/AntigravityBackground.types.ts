export type AntigravityBackgroundProps = {
    className?: string;
    /** Inner ring radius in px (closest ring to center). Default 100. */
    ringRadius?: number;
    /** Radial span from innermost to outermost ring in px. Default 600. */
    ringThickness?: number;
    /** Particles per concentric ring. Default 80. */
    particleCount?: number;
    /** Number of concentric rings. Default 25. */
    particleRows?: number;
    /** Dot size in px. Default 2. */
    particleSize?: number;
    /** Dot color (CSS color string). Default "#ffffff". */
    particleColor?: string;
    /** Whether to slowly rotate the field. Default true. */
    animate?: boolean;
    /** Background color behind the dots. Default "transparent". */
    background?: string;
};
