// MonolithPlaceholder.tsx — ilustración SVG dimétrica del monolito, generada
// desde el MISMO layout que la escena 3D (paridad de silueta garantizada).
// Se renderiza en SSR, sirve de fallback permanente (reduced-motion / sin
// WebGL) y de base del crossfade cuando el canvas monta.

import React from 'react';
import { buildMonolithLayout, buildOccupancySet, type MonolithLayout } from './monolithLayout';

const K = 16; // px por unidad de mundo
const COS = 0.866; // proyección dimétrica 2:1
const SIN = 0.5;

type P2 = [number, number];

function project([x, y, z]: [number, number, number]): P2 {
    return [(x - z) * COS * K, ((x + z) * SIN - y) * K];
}

function pathFrom(points: P2[], ox: number, oy: number): string {
    return (
        points
            .map(([u, v], i) => `${i === 0 ? 'M' : 'L'}${(u + ox).toFixed(1)} ${(v + oy).toFixed(1)}`)
            .join('') + 'Z'
    );
}

// Sombras por cara para los acentos púrpura (fijos: funcionan en ambos temas).
function shadeAccent(hex: string, factor: number): string {
    const n = parseInt(hex.slice(1), 16);
    const ch = (v: number) =>
        Math.max(0, Math.min(255, Math.round(v * factor)))
            .toString(16)
            .padStart(2, '0');
    return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
}

interface Face {
    d: string;
    fill: string;
}

function buildFaces(layout: MonolithLayout): { faces: Face[]; viewBox: string } {
    const occ = buildOccupancySet(layout);
    const has = (gx: number, gy: number, gz: number) => occ.has(`${gx},${gy},${gz}`);
    const h = layout.blockSize / 2;

    // Orden pintor: atrás → adelante, abajo → arriba.
    const sorted = [...layout.cells].sort(
        (a, b) => a.gx + a.gz - (b.gx + b.gz) || a.gy - b.gy
    );

    const quads: Array<{ pts: P2[]; fill: string }> = [];
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;

    for (const cell of sorted) {
        const [x, y, z] = cell.home;
        const top = !has(cell.gx, cell.gy + 1, cell.gz);
        const right = !has(cell.gx + 1, cell.gy, cell.gz);
        const left = !has(cell.gx, cell.gy, cell.gz + 1);
        if (!top && !right && !left) continue; // celda interior, invisible

        const corner = (sx: number, sy: number, sz: number): P2 =>
            project([x + sx * h, y + sy * h, z + sz * h]);

        const cellQuads: Array<{ pts: P2[]; kind: 'top' | 'left' | 'right' }> = [];
        if (top) cellQuads.push({ pts: [corner(-1, 1, -1), corner(1, 1, -1), corner(1, 1, 1), corner(-1, 1, 1)], kind: 'top' });
        if (right) cellQuads.push({ pts: [corner(1, 1, -1), corner(1, 1, 1), corner(1, -1, 1), corner(1, -1, -1)], kind: 'right' });
        if (left) cellQuads.push({ pts: [corner(-1, 1, 1), corner(1, 1, 1), corner(1, -1, 1), corner(-1, -1, 1)], kind: 'left' });

        for (const q of cellQuads) {
            for (const [u, v] of q.pts) {
                if (u < minU) minU = u;
                if (u > maxU) maxU = u;
                if (v < minV) minV = v;
                if (v > maxV) maxV = v;
            }
            const fill = cell.isAccent
                ? shadeAccent(cell.colorDark, q.kind === 'top' ? 1.15 : q.kind === 'left' ? 0.92 : 0.78)
                : `var(--blk-${q.kind})`;
            quads.push({ pts: q.pts, fill });
        }
    }

    const pad = K;
    const ox = -minU + pad;
    const oy = -minV + pad;
    const w = maxU - minU + pad * 2;
    const hgt = maxV - minV + pad * 2;

    const faces: Face[] = quads.map((q) => ({ d: pathFrom(q.pts, ox, oy), fill: q.fill }));

    return { faces, viewBox: `0 0 ${w.toFixed(0)} ${hgt.toFixed(0)}` };
}

// Generados UNA vez en scope de módulo (Node en SSR, cliente al hidratar).
const DESKTOP = buildFaces(buildMonolithLayout({ compact: false }));
const COMPACT = buildFaces(buildMonolithLayout({ compact: true }));

interface MonolithPlaceholderProps {
    compact?: boolean;
    className?: string;
}

export function MonolithPlaceholder({ compact = false, className }: MonolithPlaceholderProps) {
    const { faces, viewBox } = compact ? COMPACT : DESKTOP;
    return (
        <svg
            viewBox={viewBox}
            className={className}
            aria-hidden="true"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
        >
            {faces.map((f, i) => (
                <path key={i} d={f.d} fill={f.fill} />
            ))}
        </svg>
    );
}
