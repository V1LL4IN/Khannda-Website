'use client';

// MonolithCanvas.tsx — <Canvas> ortográfico del monolito. Se importa SOLO vía
// next/dynamic ssr:false desde index.tsx: el chunk de three jamás entra al JS
// inicial ni compite con la hidratación o el LCP.

import React, { useLayoutEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MonolithInstances } from './MonolithInstances';

// Cámara ortográfica = look técnico/blueprint. Zoom en función de la altura
// del contenedor para que la torre siempre ocupe ~85% del alto.
function ResponsiveOrthoCamera() {
    const camera = useRef<THREE.OrthographicCamera>(null);
    const size = useThree((s) => s.size);
    const invalidate = useThree((s) => s.invalidate);

    useLayoutEffect(() => {
        const cam = camera.current;
        if (!cam) return;
        cam.zoom = THREE.MathUtils.clamp(size.height / 26, 18, 40);
        cam.lookAt(0, 0.5, 0);
        cam.updateProjectionMatrix();
        invalidate();
    }, [size, invalidate]);

    return (
        <OrthographicCamera
            ref={camera}
            makeDefault
            position={[12, 9, 12]}
            near={0.1}
            far={60}
        />
    );
}

export interface MonolithCanvasProps {
    isDark: boolean;
    compact: boolean;
    containerRef: React.RefObject<HTMLElement | null>;
    onReady?: () => void;
}

export default function MonolithCanvas({ isDark, compact, containerRef, onReady }: MonolithCanvasProps) {
    return (
        <Canvas
            frameloop="demand"
            dpr={[1, compact ? 1.5 : 1.75]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'low-power',
                failIfMajorPerformanceCaveat: true,
            }}
            style={{ pointerEvents: 'none', background: 'transparent' }}
            onCreated={() => {
                // 1 rAF tras el primer render para que el crossfade nunca
                // muestre un canvas aún vacío.
                requestAnimationFrame(() => onReady?.());
            }}
        >
            <ResponsiveOrthoCamera />

            {isDark ? (
                <hemisphereLight color="#3a3a44" groundColor="#0a0a0c" intensity={0.85} />
            ) : (
                <hemisphereLight color="#ffffff" groundColor="#d8d5cf" intensity={0.9} />
            )}
            {/* Key light: en light mode sube a 1.35 para que la torre neutra no
                se funda con el fondo #fafaf7. */}
            <directionalLight position={[6, 10, 4]} color="#ffffff" intensity={isDark ? 1.1 : 1.35} />
            {/* Rim púrpura de marca — sustituye luces dinámicas y shaders. */}
            <directionalLight position={[-8, 4, -6]} color="#8a3c86" intensity={isDark ? 0.55 : 0.22} />

            <MonolithInstances isDark={isDark} compact={compact} containerRef={containerRef} />
        </Canvas>
    );
}
