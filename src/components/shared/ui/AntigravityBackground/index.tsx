'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { AntigravityBackgroundProps } from './AntigravityBackground.types';

export const AntigravityBackground = ({
    className,
    ringRadius = 100,
    ringThickness = 600,
    particleCount = 80,
    particleRows = 25,
    particleSize = 2,
    particleColor = '#ffffff',
    animate = true,
    background = 'transparent',
}: AntigravityBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const rotationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let cx = 0;
        let cy = 0;
        let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            cx = width / 2;
            cy = height / 2;
            dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const drawFrame = () => {
            ctx.clearRect(0, 0, width, height);

            if (background !== 'transparent') {
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, width, height);
            }

            const ringStep = particleRows > 1 ? ringThickness / (particleRows - 1) : 0;
            const angleStep = (Math.PI * 2) / particleCount;
            const rotation = rotationRef.current;

            ctx.fillStyle = particleColor;

            for (let r = 0; r < particleRows; r++) {
                const radius = ringRadius + r * ringStep;
                // Subtle radial opacity falloff so the outer rings dissolve
                const t = particleRows > 1 ? r / (particleRows - 1) : 0;
                const alpha = 0.18 + 0.55 * Math.pow(1 - Math.abs(t - 0.35), 2.2);
                ctx.globalAlpha = Math.max(0.05, Math.min(0.85, alpha));

                // Offset alternate rings by half-angle so dots stagger like Antigravity
                const ringOffset = (r % 2 === 0 ? 0 : angleStep / 2) + rotation * (1 + r * 0.012);

                for (let i = 0; i < particleCount; i++) {
                    const angle = i * angleStep + ringOffset;
                    const x = cx + Math.cos(angle) * radius;
                    const y = cy + Math.sin(angle) * radius;
                    if (x < -particleSize || x > width + particleSize || y < -particleSize || y > height + particleSize) continue;
                    ctx.beginPath();
                    ctx.arc(x, y, particleSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        };

        const loop = () => {
            if (animate) rotationRef.current += 0.0008;
            drawFrame();
            rafRef.current = requestAnimationFrame(loop);
        };

        resize();
        drawFrame();
        rafRef.current = requestAnimationFrame(loop);

        const onResize = () => {
            resize();
            drawFrame();
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [animate, background, particleColor, particleCount, particleRows, particleSize, ringRadius, ringThickness]);

    return (
        <canvas
            ref={canvasRef}
            className={cn('h-full w-full block', className)}
            aria-hidden
        />
    );
};
