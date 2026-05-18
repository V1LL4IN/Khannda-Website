export type AntigravityBackgroundProps = {
    className?: string;
    /** Inverts the palette and base coloring for dark-mode pages. */
    isDark?: boolean;
    /** Number of dash particles. Default 700. */
    particleCount?: number;
    /** Dash length in px. Default 6. */
    particleLength?: number;
    /** Dash stroke width in px. Default 1.6. */
    particleWidth?: number;
    /** Radius (px) around the cursor where particles are repelled. Default 140. */
    cursorRadius?: number;
    /** Maximum displacement (px/frame) applied at the cursor center. Default 0.6 — kept subtle on purpose. */
    cursorForce?: number;
};
