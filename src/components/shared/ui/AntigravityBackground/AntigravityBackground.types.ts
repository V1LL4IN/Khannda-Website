export type AntigravityBackgroundProps = {
    className?: string;
    /** Inverts the palette and idle color for dark-mode pages. */
    isDark?: boolean;
    /** Grid columns. Default 100 (60 on mobile). */
    columns?: number;
    /** Grid rows. Default 55 (35 on mobile). */
    rows?: number;
    /** How fast the halo center catches up to the cursor (0..1). Default 0.06. */
    dragFactor?: number;
    /** [minDpr, maxDpr] for the canvas. Default [1, 2]. */
    dprRange?: [number, number];
};

export type ParticleFieldProps = {
    isDark: boolean;
    columns: number;
    rows: number;
    dragFactor: number;
};
