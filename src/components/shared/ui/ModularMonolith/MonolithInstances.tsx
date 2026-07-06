'use client';

// MonolithInstances.tsx — las ~500 piezas del monolito en UN instancedMesh
// (1 draw call). Tres comportamientos compuestos por frame:
//   1. TALLADO: el cursor abre un nicho — los bloques cercanos se hunden hacia
//      el interior de la torre y el borde del hueco se tiñe púrpura.
//   2. OBRA idle: celdas de frontera se construyen/desmontan una a una.
//   3. SCROLL: cizallado por filas con deriva +X (lejos del texto).
// frameloop='demand': el bucle solo corre mientras algo converge; en reposo,
// cero rAF.

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { buildMonolithLayout } from './monolithLayout';
import { useHeroPointer } from './useHeroPointer';
import { useHeroScrollProgress } from './useHeroScrollProgress';

const CARVE_RADIUS = 2.2;
const CARVE_SIGMA = 0.85;
const CARVE_DEPTH = 0.9;
const CONVERGE_EPS = 0.0015;
const SWEEP_AFTER_IDLE_MS = 6000;
const SWEEP_EVERY_MS = 7000;
const SWEEP_DURATION_MS = 1800;
const PULSE_DURATION_MS = 600;
const BUILD_TICK_MS = 1400;

const RIM_DARK = new THREE.Color('#c87bbf');
const RIM_LIGHT = new THREE.Color('#8a3c86');
const IDENTITY_Q = new THREE.Quaternion();

const backOut = (t: number) => {
    const c1 = 1.70158;
    return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const cubicIn = (t: number) => t * t * t;

interface Tween {
    index: number;
    t0: number;
    dur: number;
    building: boolean;
}

interface Sweep {
    t0: number;
    worldX: number;
}

export interface MonolithInstancesProps {
    isDark: boolean;
    compact: boolean;
    containerRef: React.RefObject<HTMLElement | null>;
}

export function MonolithInstances({ isDark, compact, containerRef }: MonolithInstancesProps) {
    const invalidate = useThree((s) => s.invalidate);
    const mesh = useRef<THREE.InstancedMesh>(null);
    const group = useRef<THREE.Group>(null);

    const layout = useMemo(() => buildMonolithLayout({ compact }), [compact]);
    const cells = useMemo(() => [...layout.cells, ...layout.frontier], [layout]);
    const count = cells.length;
    const frontierStart = layout.cells.length;

    const buffers = useMemo(() => {
        const home = new Float32Array(count * 3);
        const carve = new Float32Array(count * 3);
        const buildScale = new Float32Array(count);
        const colorDark = new Float32Array(count * 3);
        const colorLight = new Float32Array(count * 3);
        const rowIndex = new Float32Array(count);
        const jitter = new Float32Array(count);
        const c = new THREE.Color();
        cells.forEach((cell, i) => {
            home.set(cell.home, i * 3);
            buildScale[i] = cell.isFrontier ? 0 : 1;
            c.set(cell.colorDark);
            colorDark.set([c.r, c.g, c.b], i * 3);
            c.set(cell.colorLight);
            colorLight.set([c.r, c.g, c.b], i * 3);
            rowIndex[i] = cell.rowIndex;
            jitter[i] = cell.jitter;
        });
        return { home, carve, buildScale, colorDark, colorLight, rowIndex, jitter };
    }, [cells, count]);

    const geometry = useMemo(
        () => new RoundedBoxGeometry(layout.blockSize, layout.blockSize, layout.blockSize, 2, 0.07),
        [layout.blockSize]
    );
    useEffect(() => () => geometry.dispose(), [geometry]);

    const tmp = useMemo(
        () => ({
            pos: new THREE.Vector3(),
            scl: new THREE.Vector3(),
            mat: new THREE.Matrix4(),
            plane: new THREE.Plane(),
            planePoint: new THREE.Vector3(0, 0.5, 0),
            raycaster: new THREE.Raycaster(),
            ndc: new THREE.Vector2(),
            hit: new THREE.Vector3(),
            viewDir: new THREE.Vector3(),
        }),
        []
    );

    const rt = useRef({
        tweens: [] as Tween[],
        frontierBuilt: [] as boolean[],
        sweep: null as Sweep | null,
        lastSweepEnd: 0,
        visible: true,
        pageVisible: true,
    });

    useEffect(() => {
        rt.current.frontierBuilt = new Array(count - frontierStart).fill(false);
        rt.current.tweens = [];
    }, [count, frontierStart]);

    const pointer = useHeroPointer(containerRef, invalidate);
    const scrollP = useHeroScrollProgress(() => invalidate());

    // instanceColor: atributo propio para poder escribir el array por frame.
    useEffect(() => {
        const m = mesh.current;
        if (!m) return;
        const attr = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
        attr.setUsage(THREE.DynamicDrawUsage);
        m.instanceColor = attr;
        m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    }, [count]);

    // Tema en caliente: repoblar colores base sin remount.
    useEffect(() => {
        const m = mesh.current;
        if (!m?.instanceColor) return;
        (m.instanceColor.array as Float32Array).set(isDark ? buffers.colorDark : buffers.colorLight);
        m.instanceColor.needsUpdate = true;
        invalidate();
    }, [isDark, buffers, invalidate, count]);

    // Suspensión fuera de viewport / pestaña oculta + latido idle.
    // El latido (único temporizador) dispara la obra y el sweep, y su
    // invalidate() periódico repara cualquier estado colgado (p.ej. el nicho
    // tallado cuando expira la ventana del cursor con el bucle ya dormido).
    // Deja de reprogramarse al ocultarse y se reanuda desde los handlers de
    // visibilidad — cero timers vivos mientras el hero no se ve.
    useEffect(() => {
        const el = containerRef.current;
        const state = rt.current;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let disposed = false;

        const tick = () => {
            timer = undefined;
            if (disposed || !state.visible || !state.pageVisible) return; // se reanuda al volver
            const now = performance.now();
            if (state.tweens.length < 2 && count > frontierStart) {
                const slot = Math.floor(Math.random() * (count - frontierStart));
                const index = frontierStart + slot;
                if (!state.tweens.some((t) => t.index === index)) {
                    const building = !state.frontierBuilt[slot];
                    state.frontierBuilt[slot] = building;
                    state.tweens.push({ index, t0: now, dur: building ? 500 : 400, building });
                }
            }
            if (
                !state.sweep &&
                now - pointer.current.lastMoveTs > SWEEP_AFTER_IDLE_MS &&
                now - state.lastSweepEnd > SWEEP_EVERY_MS
            ) {
                const gx = Math.floor(Math.random() * layout.grid.x);
                state.sweep = { t0: now, worldX: (gx - (layout.grid.x - 1) / 2) * layout.cellSize };
            }
            invalidate();
            schedule();
        };
        const schedule = () => {
            if (timer === undefined && !disposed) {
                timer = setTimeout(tick, BUILD_TICK_MS + (Math.random() - 0.5) * 600);
            }
        };
        const resume = () => {
            if (state.visible && state.pageVisible) {
                invalidate();
                schedule();
            }
        };

        const onVis = () => {
            state.pageVisible = !document.hidden;
            resume();
        };
        document.addEventListener('visibilitychange', onVis);
        let io: IntersectionObserver | undefined;
        if (el) {
            io = new IntersectionObserver(
                ([entry]) => {
                    state.visible = entry.isIntersecting;
                    resume();
                },
                { threshold: 0.05 }
            );
            io.observe(el);
        }
        schedule();

        return () => {
            disposed = true;
            document.removeEventListener('visibilitychange', onVis);
            io?.disconnect();
            if (timer !== undefined) clearTimeout(timer);
        };
    }, [containerRef, count, frontierStart, layout, pointer, invalidate]);

    useFrame((state, dtRaw) => {
        const m = mesh.current;
        const g = group.current;
        const run = rt.current;
        if (!m?.instanceColor || !g) return;
        if (!run.visible || !run.pageVisible) return; // sin invalidate → el bucle muere

        const now = performance.now();
        const dt = Math.min(dtRaw || 0.016, 1 / 30);

        const camera = state.camera;
        camera.getWorldDirection(tmp.viewDir); // "hacia dentro de la pantalla"

        // --- Fuentes de influencia de este frame (mundo) ---
        // La expiración (sweep, pulses) es incondicional: una fuente caducada
        // jamás debe sobrevivir como condición de keep-alive del bucle demand.
        const sources: Array<{ x: number; y: number; z: number; radius: number; force: number }> = [];

        if (pointer.current.inside && now - pointer.current.lastMoveTs < 4000) {
            tmp.ndc.set(pointer.current.x, pointer.current.y);
            tmp.raycaster.setFromCamera(tmp.ndc, camera);
            tmp.plane.setFromNormalAndCoplanarPoint(tmp.viewDir, tmp.planePoint);
            if (tmp.raycaster.ray.intersectPlane(tmp.plane, tmp.hit)) {
                sources.push({ x: tmp.hit.x, y: tmp.hit.y, z: tmp.hit.z, radius: CARVE_RADIUS, force: 1 });
            }
        }

        if (run.sweep) {
            const k = (now - run.sweep.t0) / SWEEP_DURATION_MS;
            if (k >= 1) {
                run.sweep = null;
                run.lastSweepEnd = now;
            } else {
                const halfY = layout.grid.y / 2 + 1;
                sources.push({
                    x: run.sweep.worldX,
                    y: -halfY + k * halfY * 2,
                    z: 0,
                    radius: CARVE_RADIUS,
                    force: 0.6,
                });
            }
        }

        if (pointer.current.pulses.length) {
            pointer.current.pulses = pointer.current.pulses.filter((p) => now - p.t0 < PULSE_DURATION_MS);
            for (const p of pointer.current.pulses) {
                const k = (now - p.t0) / PULSE_DURATION_MS;
                tmp.ndc.set(p.x, p.y);
                tmp.raycaster.setFromCamera(tmp.ndc, camera);
                tmp.plane.setFromNormalAndCoplanarPoint(tmp.viewDir, tmp.planePoint);
                if (tmp.raycaster.ray.intersectPlane(tmp.plane, tmp.hit)) {
                    sources.push({
                        x: tmp.hit.x,
                        y: tmp.hit.y,
                        z: tmp.hit.z,
                        radius: 2.4 * k,
                        force: (1 - k) * (1 - k),
                    });
                }
            }
        }

        // --- Tweens de obra (escala de celdas de frontera) ---
        if (run.tweens.length) {
            run.tweens = run.tweens.filter((tw) => {
                const k = Math.min(1, (now - tw.t0) / tw.dur);
                buffers.buildScale[tw.index] = tw.building ? backOut(k) : 1 - cubicIn(k);
                return k < 1;
            });
        }

        // --- Composición por instancia ---
        const p = scrollP.current;
        const { home, carve, buildScale, rowIndex, jitter } = buffers;
        const baseColor = isDark ? buffers.colorDark : buffers.colorLight;
        const rim = isDark ? RIM_DARK : RIM_LIGHT;
        const colorArr = m.instanceColor.array as Float32Array;
        const colorBlend = 1 - Math.exp(-4 * dt);
        let maxDelta = 0;
        let colorDirty = false;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const hx = home[i3];
            const hy = home[i3 + 1];
            const hz = home[i3 + 2];

            // 1. Objetivo de tallado acumulando fuentes.
            let tx = 0, ty = 0, tz = 0, rimAmt = 0;
            for (const src of sources) {
                const dx = hx - src.x;
                const dy = hy - src.y;
                const dz = hz - src.z;
                const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (d > src.radius) continue;
                const gs = Math.exp(-(d / CARVE_SIGMA) * (d / CARVE_SIGMA)) * src.force;
                const inv = d > 1e-4 ? 1 / d : 0;
                // 35% apertura radial + 65% hundimiento hacia el interior:
                // se talla un nicho, los bloques no huyen del cursor.
                const depth = CARVE_DEPTH * gs;
                tx += (dx * inv * 0.35 + tmp.viewDir.x * 0.65) * depth;
                ty += (dy * inv * 0.35 + tmp.viewDir.y * 0.65) * depth;
                tz += (dz * inv * 0.35 + tmp.viewDir.z * 0.65) * depth;
                const edge = 4 * gs * (1 - gs);
                if (edge > rimAmt) rimAmt = Math.min(1, edge);
            }

            // 2. Persecución exponencial (entrada rápida, retorno elástico).
            const entering = tx * tx + ty * ty + tz * tz >
                carve[i3] * carve[i3] + carve[i3 + 1] * carve[i3 + 1] + carve[i3 + 2] * carve[i3 + 2];
            const k = 1 - Math.exp(-(entering ? 5.5 : 3) * dt);
            const d0 = (tx - carve[i3]) * k;
            const d1 = (ty - carve[i3 + 1]) * k;
            const d2 = (tz - carve[i3 + 2]) * k;
            carve[i3] += d0;
            carve[i3 + 1] += d1;
            carve[i3 + 2] += d2;
            const delta = Math.abs(d0) + Math.abs(d1) + Math.abs(d2);
            if (delta > maxDelta) maxDelta = delta;

            // 3. Anillo del nicho: tinte púrpura en el borde, por instanceColor.
            const mix = rimAmt * 0.85;
            const cr = baseColor[i3] + (rim.r - baseColor[i3]) * mix;
            const cg = baseColor[i3 + 1] + (rim.g - baseColor[i3 + 1]) * mix;
            const cb = baseColor[i3 + 2] + (rim.b - baseColor[i3 + 2]) * mix;
            const e0 = (cr - colorArr[i3]) * colorBlend;
            const e1 = (cg - colorArr[i3 + 1]) * colorBlend;
            const e2 = (cb - colorArr[i3 + 2]) * colorBlend;
            if (Math.abs(e0) + Math.abs(e1) + Math.abs(e2) > 0.001) {
                colorArr[i3] += e0;
                colorArr[i3 + 1] += e1;
                colorArr[i3 + 2] += e2;
                colorDirty = true;
            }

            // 4. Despiece por scroll: cizalla por fila + deriva +X (lejos del H1).
            const sy = p * rowIndex[i] * 0.085;
            const sx = p * (0.3 + jitter[i] * 0.7) * 1.1;

            tmp.pos.set(hx + carve[i3] + sx, hy + carve[i3 + 1] + sy, hz + carve[i3 + 2]);
            const s = buildScale[i];
            tmp.scl.set(s, s, s);
            tmp.mat.compose(tmp.pos, IDENTITY_Q, tmp.scl);
            m.setMatrixAt(i, tmp.mat);
        }

        m.instanceMatrix.needsUpdate = true;
        if (colorDirty) m.instanceColor.needsUpdate = true;

        g.rotation.y = p * 0.15;
        g.scale.setScalar(1 - 0.12 * p);

        // Motor demand: pedir otro frame solo si algo sigue vivo.
        if (
            maxDelta > CONVERGE_EPS ||
            run.tweens.length > 0 ||
            run.sweep !== null ||
            pointer.current.pulses.length > 0 ||
            colorDirty
        ) {
            invalidate();
        }
    });

    return (
        <group ref={group}>
            <instancedMesh
                ref={mesh}
                args={[geometry, undefined, count]}
                frustumCulled={false}
            >
                <meshStandardMaterial
                    roughness={isDark ? 0.42 : 0.55}
                    metalness={isDark ? 0.35 : 0.12}
                />
            </instancedMesh>
        </group>
    );
}
