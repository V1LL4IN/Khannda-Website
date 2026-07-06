// src/components/shared/ui/ScrollReveal.tsx
'use client';

import React from 'react';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    /**
     * Delay in seconds before animation starts
     */
    delay?: number;
    /**
     * Duration of the animation in seconds
     */
    duration?: number;
    /**
     * Animation direction: 'up', 'down', 'left', 'right', or 'none' (fade only)
     */
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    /**
     * Distance to travel in pixels
     */
    distance?: number;
    /**
     * Whether to animate only once or every time element enters viewport
     */
    once?: boolean;
    /**
     * Viewport margin for triggering animation
     */
    viewportMargin?: string;
}

// Defaults afinados para respuesta ágil: entrada corta (0.45s), desplazamiento
// sutil (32px) y una sola animación por elemento (once) — re-animar en cada
// re-entrada al viewport hacía sentir la página lenta.
const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className,
    delay = 0,
    duration = 0.45,
    direction = 'up',
    distance = 32,
    once = true,
    viewportMargin = '-50px',
}) => {
    const prefersReducedMotion = useReducedMotion();

    // Calculate initial position based on direction
    const getInitialPosition = () => {
        if (prefersReducedMotion) return { x: 0, y: 0 };

        switch (direction) {
            case 'up':
                return { x: 0, y: distance };
            case 'down':
                return { x: 0, y: -distance };
            case 'left':
                return { x: distance, y: 0 };
            case 'right':
                return { x: -distance, y: 0 };
            case 'none':
            default:
                return { x: 0, y: 0 };
        }
    };

    const variants: Variants = {
        hidden: {
            opacity: 0,
            ...getInitialPosition(),
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0 : duration,
                delay: prefersReducedMotion ? 0 : delay,
                ease: [0.25, 0.4, 0.25, 1], // Smooth cubic-bezier
            },
        },
    };

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: viewportMargin }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
