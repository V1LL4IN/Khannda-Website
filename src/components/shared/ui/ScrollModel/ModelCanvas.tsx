"use client";

// Canvas WebGL de ScrollModel. Se importa SOLO vía next/dynamic (ssr:false)
// para que three.js no entre en el bundle inicial de ninguna página.
import React, { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

export interface ModelCanvasProps {
    src: string;
    /** Progreso de scroll 0→1 de la sección que contiene el modelo. */
    progress: MotionValue<number>;
    /** Vueltas completas en Y a lo largo del recorrido de scroll. */
    turns?: number;
    /** Inclinación inicial/final en X (radianes) — da sensación de "acercarse". */
    tilt?: [number, number];
    /** Tamaño normalizado del modelo (unidades de escena). */
    size?: number;
    /** Activo = renderiza frames; inactivo = canvas congelado (ahorra GPU). */
    active: boolean;
    onReady?: () => void;
}

function Model({
    src,
    progress,
    turns = 1,
    tilt = [0.35, -0.15],
    size = 2,
    onReady,
}: Omit<ModelCanvasProps, "active">) {
    const { scene } = useGLTF(src);
    const group = useRef<THREE.Group>(null);
    const pointer = useThree((s) => s.pointer);

    // Centra y escala el mesh a un tamaño común: cada GLB generado viene
    // con su propia escala/origen.
    const { object, scale } = useMemo(() => {
        const obj = scene.clone(true);
        const box = new THREE.Box3().setFromObject(obj);
        const dims = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        obj.position.sub(center);
        obj.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                if (mat && "envMapIntensity" in mat) {
                    // Brillo "cristal": menos rugoso, más reflejo del entorno.
                    mat.roughness = Math.min(mat.roughness ?? 1, 0.35);
                    mat.envMapIntensity = 1.6;
                }
            }
        });
        return { object: obj, scale: size / Math.max(dims.x, dims.y, dims.z) };
    }, [scene, size]);

    useLayoutEffect(() => {
        onReady?.();
    }, [onReady]);

    useFrame((state, delta) => {
        const g = group.current;
        if (!g) return;
        const p = progress.get();
        const t = state.clock.elapsedTime;
        const targetY = p * Math.PI * 2 * turns + pointer.x * 0.35;
        const targetX = THREE.MathUtils.lerp(tilt[0], tilt[1], p) - pointer.y * 0.2;
        // Amortiguado: el modelo "persigue" al scroll en vez de saltar.
        const k = 1 - Math.exp(-delta * 6);
        g.rotation.y += (targetY - g.rotation.y) * k;
        g.rotation.x += (targetX - g.rotation.x) * k;
        g.position.y = Math.sin(t * 1.1) * 0.08;
    });

    return (
        <group ref={group}>
            <primitive object={object} scale={scale} />
        </group>
    );
}

export default function ModelCanvas({ active, ...props }: ModelCanvasProps) {
    return (
        <Canvas
            dpr={[1, 1.75]}
            frameloop={active ? "always" : "never"}
            camera={{ position: [0, 0, 5], fov: 35 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
            <pointLight position={[-4, -2, 2]} intensity={18} color="#22d3ee" />
            <pointLight position={[4, 2, -2]} intensity={18} color="#c084fc" />
            <Suspense fallback={null}>
                <Model {...props} />
                {/* Entorno local (sin HDR remoto): paneles de luz para los reflejos del cristal */}
                <Environment resolution={128}>
                    {/* Cúpula clara: evita que los metales reflejen negro */}
                    <mesh scale={50}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color="#b7a6f5" side={THREE.BackSide} />
                    </mesh>
                    <Lightformer form="rect" intensity={3} position={[0, 3, 4]} scale={[6, 2, 1]} />
                    <Lightformer form="rect" intensity={2} color="#a855f7" position={[-4, 0, 1]} scale={[2, 6, 1]} />
                    <Lightformer form="rect" intensity={2} color="#22d3ee" position={[4, 0, 1]} scale={[2, 6, 1]} />
                    <Lightformer form="ring" intensity={1.5} position={[0, -3, 2]} scale={3} />
                </Environment>
            </Suspense>
        </Canvas>
    );
}
