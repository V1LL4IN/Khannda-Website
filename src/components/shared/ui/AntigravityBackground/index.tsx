'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { AntigravityBackgroundProps } from './AntigravityBackground.types';

const PALETTE_LIGHT = ['#592355', '#712F6D', '#8a3c86', '#a059a0', '#c87bbf'];
const PALETTE_DARK = ['#c87bbf', '#a059a0', '#8a3c86', '#712F6D', '#9b59b6'];

type Particle = {
    homeX: number;
    homeY: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    targetAngle: number;
    color: string;
    alpha: number;
};

export const AntigravityBackground = ({
    className,
    isDark = false,
    particleCount = 700,
    particleLength = 6,
    particleWidth = 1.6,
    cursorRadius = 140,
    cursorForce = 0.6,
}: AntigravityBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });
    const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const palette = isDark ? PALETTE_DARK : PALETTE_LIGHT;
        let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

        const rand = (min: number, max: number) => Math.random() * (max - min) + min;

        const placeParticle = (p: Particle, w: number, h: number) => {
            // Slight edge bias: r² distribution from center means particles cluster outward
            const cx = w / 2;
            const cy = h / 2;
            const maxR = Math.hypot(cx, cy);
            const t = Math.sqrt(Math.random()); // r² -> sqrt for uniform area
            const r = t * maxR * 1.05;
            const a = Math.random() * Math.PI * 2;
            const x = cx + Math.cos(a) * r * (0.6 + Math.random() * 0.6);
            const y = cy + Math.sin(a) * r * (0.6 + Math.random() * 0.6);
            p.homeX = Math.max(0, Math.min(w, x));
            p.homeY = Math.max(0, Math.min(h, y));
            p.x = p.homeX;
            p.y = p.homeY;
        };

        const initParticles = (w: number, h: number) => {
            const arr: Particle[] = new Array(particleCount);
            for (let i = 0; i < particleCount; i++) {
                const p: Particle = {
                    homeX: 0, homeY: 0, x: 0, y: 0, vx: 0, vy: 0,
                    angle: rand(0, Math.PI * 2),
                    targetAngle: rand(0, Math.PI * 2),
                    color: palette[Math.floor(Math.random() * palette.length)],
                    alpha: rand(0.45, 0.95),
                };
                placeParticle(p, w, h);
                arr[i] = p;
            }
            particlesRef.current = arr;
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const w = Math.max(1, rect.width);
            const h = Math.max(1, rect.height);
            dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
            initParticles(w, h);
        };

        // Pseudo-curl flow field (cheap noise approximation)
        const flowAngle = (x: number, y: number, t: number) => {
            return (
                Math.sin(x * 0.0032 + t * 0.00028) * 1.4 +
                Math.cos(y * 0.0026 - t * 0.00022) * 1.4 +
                Math.sin((x + y) * 0.0014 + t * 0.00040) * 0.9
            );
        };

        const startTime = performance.now();

        const tick = () => {
            const { w, h } = sizeRef.current;
            const now = performance.now();
            const t = now - startTime;

            ctx.clearRect(0, 0, w, h);

            ctx.lineWidth = particleWidth;
            ctx.lineCap = 'round';

            const arr = particlesRef.current;
            const mouse = mouseRef.current;
            const r2 = cursorRadius * cursorRadius;
            const half = particleLength / 2;

            for (let i = 0; i < arr.length; i++) {
                const p = arr[i];

                // Flow-field velocity contribution (organic wave motion)
                const ang = flowAngle(p.x, p.y, t);
                p.vx += Math.cos(ang) * 0.025;
                p.vy += Math.sin(ang) * 0.025;

                // Soft pull back toward home position so particles don't drift away
                p.vx += (p.homeX - p.x) * 0.0008;
                p.vy += (p.homeY - p.y) * 0.0008;

                // Cursor repulsion — subtle. Quadratic falloff inside radius.
                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < r2 && d2 > 0.0001) {
                        const d = Math.sqrt(d2);
                        const strength = (1 - d / cursorRadius);
                        const push = strength * strength * cursorForce;
                        p.vx += (dx / d) * push;
                        p.vy += (dy / d) * push;
                    }
                }

                // Damping (water-like settling)
                p.vx *= 0.94;
                p.vy *= 0.94;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap softly at edges (so particles stay in frame)
                if (p.x < -20) p.x = w + 20;
                if (p.x > w + 20) p.x = -20;
                if (p.y < -20) p.y = h + 20;
                if (p.y > h + 20) p.y = -20;

                // Dash orientation eases toward velocity direction so they "flow"
                const speed = Math.hypot(p.vx, p.vy);
                if (speed > 0.02) {
                    p.targetAngle = Math.atan2(p.vy, p.vx);
                }
                // Shortest-arc lerp
                let da = p.targetAngle - p.angle;
                while (da > Math.PI) da -= Math.PI * 2;
                while (da < -Math.PI) da += Math.PI * 2;
                p.angle += da * 0.06;

                const cosA = Math.cos(p.angle);
                const sinA = Math.sin(p.angle);
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.moveTo(p.x - cosA * half, p.y - sinA * half);
                ctx.lineTo(p.x + cosA * half, p.y + sinA * half);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            rafRef.current = requestAnimationFrame(tick);
        };

        resize();
        rafRef.current = requestAnimationFrame(tick);

        const onResize = () => resize();
        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const onLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener('resize', onResize);
        // Listen on window so cursor over text/buttons still affects the field
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseout', onLeave);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseout', onLeave);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [isDark, particleCount, particleLength, particleWidth, cursorRadius, cursorForce]);

    return (
        <canvas
            ref={canvasRef}
            className={cn('h-full w-full block', className)}
            aria-hidden
        />
    );
};
