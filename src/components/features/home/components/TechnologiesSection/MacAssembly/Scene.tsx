"use client";

// Escena WebGL de MacAssembly. Se importa SOLO vía next/dynamic (ssr:false)
// para que three.js no entre en el bundle inicial.
//
// Línea de tiempo (progreso de scroll 0→1):
//   0.00–0.12  piezas flotando en vista explosionada
//   0.12–0.58  ensamblaje escalonado: base → teclado → teclas → trackpad → tapa → panel
//   0.50–0.78  la cámara pasa de 3/4 superior a vista frontal
//   0.60–0.75  la pantalla se enciende
//   0.66–0.95  los logos del stack vuelan y encajan en la pantalla
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { TECH_ICONS, type TechIcon } from "./techIcons";

export interface SceneProps {
    progress: MotionValue<number>;
    isDark: boolean;
    /** false = canvas congelado (fuera de pantalla). */
    active: boolean;
}

// ── Helpers de animación ────────────────────────────────────────────────
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10); // smootherstep
const lerp = THREE.MathUtils.lerp;

// PRNG determinista: el mismo "desorden" en cada visita.
function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ── Dimensiones del portátil (unidades de escena) ───────────────────────
const W = 3.2; // ancho
const D = 2.2; // fondo
const BASE_H = 0.09;
const LID_H = 2.1;
const LID_T = 0.06;
const TOP = BASE_H / 2; // cara superior de la base
const KEY_COLS = 14;
const KEY_ROWS = 5;
const KEY_PITCH = 0.2;
const KEY_SIZE = 0.168;
const KEY_COUNT = KEY_COLS * KEY_ROWS;

const PURPLE = "#8a3c86";

// ── Texturas generadas en canvas ────────────────────────────────────────
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function makeTileTexture(icon: TechIcon) {
    const S = 320;
    const c = document.createElement("canvas");
    c.width = c.height = S;
    const ctx = c.getContext("2d")!;
    // Ficha oscura con borde fino (esquinas amplias tipo icono de app)
    roundRect(ctx, 4, 4, S - 8, S - 8, 72);
    ctx.fillStyle = "#17141a";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.stroke();
    // Logo
    ctx.fillStyle = icon.color;
    if (icon.path) {
        const k = 5.4; // 24px → ~130px
        ctx.save();
        ctx.translate(S / 2 - 12 * k, 62);
        ctx.scale(k, k);
        ctx.fill(new Path2D(icon.path));
        ctx.restore();
    } else {
        ctx.font = "800 84px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(icon.name, S / 2, 128);
    }
    // Nombre
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "500 34px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(icon.name, S / 2, 250);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}

function makeScreenTexture() {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 640;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#0c0a0e";
    ctx.fillRect(0, 0, c.width, c.height);
    const g1 = ctx.createRadialGradient(300, 200, 0, 300, 200, 620);
    g1.addColorStop(0, "rgba(138,60,134,0.75)");
    g1.addColorStop(1, "rgba(138,60,134,0)");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, c.width, c.height);
    const g2 = ctx.createRadialGradient(820, 520, 0, 820, 520, 520);
    g2.addColorStop(0, "rgba(89,35,85,0.8)");
    g2.addColorStop(1, "rgba(89,35,85,0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, c.width, c.height);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

// ── Portátil ────────────────────────────────────────────────────────────
function Laptop({ progress, isDark }: Omit<SceneProps, "active">) {
    const root = useRef<THREE.Group>(null);
    const base = useRef<THREE.Group>(null);
    const deck = useRef<THREE.Mesh>(null);
    const keys = useRef<THREE.InstancedMesh>(null);
    const trackpad = useRef<THREE.Mesh>(null);
    const lid = useRef<THREE.Group>(null);
    const panel = useRef<THREE.Group>(null);
    const screenMat = useRef<THREE.MeshBasicMaterial>(null);
    const tiles = useRef<(THREE.Mesh | null)[]>([]);
    const smooth = useRef(0);
    const pointer = useThree((s) => s.pointer);
    const viewportWidth = useThree((s) => s.viewport.width);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Posición final de cada tecla + su desorden inicial
    const keyData = useMemo(() => {
        const rnd = mulberry32(7);
        const arr: { x: number; z: number; lift: number; delay: number; spin: number }[] = [];
        for (let r = 0; r < KEY_ROWS; r++) {
            for (let c = 0; c < KEY_COLS; c++) {
                arr.push({
                    x: (c - (KEY_COLS - 1) / 2) * KEY_PITCH,
                    z: -0.86 + r * KEY_PITCH,
                    lift: 0.7 + rnd() * 1.1,
                    delay: (c / KEY_COLS) * 0.1 + rnd() * 0.05,
                    spin: (rnd() - 0.5) * 2.4,
                });
            }
        }
        return arr;
    }, []);

    // Rejilla 4×2 de logos sobre la pantalla + punto de partida de cada uno
    const tileData = useMemo(() => {
        const rnd = mulberry32(21);
        return TECH_ICONS.map((icon, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            return {
                icon,
                end: new THREE.Vector3((col - 1.5) * 0.66, LID_H / 2 + (0.5 - row) * 0.7, LID_T / 2 + 0.03),
                start: new THREE.Vector3((rnd() - 0.5) * 7, LID_H / 2 + (rnd() - 0.5) * 4.5, 2.6 + rnd() * 2.4),
                rot: new THREE.Euler((rnd() - 0.5) * 2.2, (rnd() - 0.5) * 2.2, (rnd() - 0.5) * 1.6),
            };
        });
    }, []);

    const tileTextures = useMemo(() => TECH_ICONS.map(makeTileTexture), []);
    const screenTexture = useMemo(makeScreenTexture, []);
    useEffect(
        () => () => {
            tileTextures.forEach((t) => t.dispose());
            screenTexture.dispose();
        },
        [tileTextures, screenTexture]
    );

    useLayoutEffect(() => {
        smooth.current = progress.get();
    }, [progress]);

    const metal = isDark ? "#7c7c86" : "#d4d4da";
    const keyColor = isDark ? "#101013" : "#1c1c20";

    useFrame((state, delta) => {
        // Amortigua el scroll para que el movimiento no dé saltos
        smooth.current += (progress.get() - smooth.current) * (1 - Math.exp(-delta * 7));
        const p = smooth.current;
        const t = state.clock.elapsedTime;
        const float = 1 - ease(seg(p, 0.12, 0.55)); // flotación solo mientras está desarmado

        // Vista: 3/4 superior → frontal
        const view = ease(seg(p, 0.5, 0.78));
        if (root.current) {
            // En pantallas estrechas se aleja para que quepa completo; en anchas
            // se desplaza a la derecha para dejar sitio al texto.
            const wide = viewportWidth > 5.2;
            const fit = Math.min(1, viewportWidth / 4.6);
            const scale = fit * lerp(wide ? 0.66 : 0.56, wide ? 1.22 : 1, view);
            root.current.scale.setScalar(scale);
            root.current.rotation.y = lerp(-0.72, 0, view) + pointer.x * 0.08 + Math.sin(t * 0.4) * 0.02;
            root.current.rotation.x = lerp(0.52, 0.1, view) - pointer.y * 0.04;
            root.current.position.x = wide ? lerp(1.0, 0.75, view) : 0;
            root.current.position.y = lerp(-0.75, -1.05, view) * scale + (wide ? 0 : 0.75);
        }

        // Base
        const a0 = ease(seg(p, 0.12, 0.32));
        if (base.current) base.current.position.y = lerp(-1.0, 0, a0) + Math.sin(t * 0.9) * 0.04 * float;

        // Plano del teclado
        const a1 = ease(seg(p, 0.2, 0.38));
        if (deck.current) deck.current.position.y = TOP + 0.004 + lerp(0.45, 0, a1) + Math.sin(t * 0.9 + 1) * 0.04 * float;

        // Teclas (instancias)
        if (keys.current) {
            for (let i = 0; i < KEY_COUNT; i++) {
                const k = keyData[i];
                const a = ease(seg(p, 0.26 + k.delay, 0.42 + k.delay));
                dummy.position.set(k.x, TOP + 0.02 + lerp(k.lift, 0, a) + Math.sin(t * 1.1 + i) * 0.03 * (1 - a), k.z);
                dummy.rotation.set((1 - a) * k.spin, (1 - a) * k.spin * 0.6, 0);
                dummy.updateMatrix();
                keys.current.setMatrixAt(i, dummy.matrix);
            }
            keys.current.instanceMatrix.needsUpdate = true;
        }

        // Trackpad
        const a2 = ease(seg(p, 0.3, 0.46));
        if (trackpad.current) {
            trackpad.current.position.y = TOP + 0.004 + lerp(0.5, 0, a2) + Math.sin(t * 0.9 + 2) * 0.04 * float;
            trackpad.current.position.z = 0.66 + lerp(1.0, 0, a2);
        }

        // Tapa
        const a3 = ease(seg(p, 0.36, 0.56));
        if (lid.current) {
            lid.current.position.set(0, TOP + lerp(1.0, 0, a3) + Math.sin(t * 0.9 + 3) * 0.05 * float, -D / 2 + 0.04 + lerp(-1.4, 0, a3));
            lid.current.rotation.x = lerp(-0.75, -0.19, a3);
        }

        // Panel de la pantalla
        const a4 = ease(seg(p, 0.42, 0.6));
        if (panel.current) panel.current.position.z = LID_T / 2 + 0.002 + lerp(0.9, 0, a4);

        // Encendido
        if (screenMat.current) screenMat.current.opacity = ease(seg(p, 0.6, 0.75));

        // Logos
        tileData.forEach((d, i) => {
            const m = tiles.current[i];
            if (!m) return;
            const a = ease(seg(p, 0.66 + i * 0.018, 0.82 + i * 0.018));
            m.position.lerpVectors(d.start, d.end, a);
            m.rotation.set(d.rot.x * (1 - a), d.rot.y * (1 - a), d.rot.z * (1 - a));
            (m.material as THREE.MeshBasicMaterial).opacity = seg(a, 0, 0.35);
            m.visible = a > 0.001;
        });
    });

    return (
        <group ref={root}>
            {/* Base de aluminio */}
            <group ref={base}>
                <RoundedBox args={[W, BASE_H, D]} radius={0.04} smoothness={6} bevelSegments={6}>
                    <meshStandardMaterial color={metal} metalness={0.92} roughness={0.34} />
                </RoundedBox>
            </group>

            {/* Hueco del teclado */}
            <mesh ref={deck} position={[0, TOP + 0.004, -0.46]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[KEY_COLS * KEY_PITCH + 0.06, KEY_ROWS * KEY_PITCH + 0.06]} />
                <meshStandardMaterial color="#0b0b0d" metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Teclas */}
            <instancedMesh ref={keys} args={[undefined, undefined, KEY_COUNT]} frustumCulled={false}>
                <boxGeometry args={[KEY_SIZE, 0.028, KEY_SIZE]} />
                <meshStandardMaterial color={keyColor} metalness={0.1} roughness={0.55} />
            </instancedMesh>

            {/* Trackpad */}
            <mesh ref={trackpad} position={[0, TOP + 0.004, 0.66]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.15, 0.66]} />
                <meshStandardMaterial color={metal} metalness={0.85} roughness={0.22} />
            </mesh>

            {/* Tapa (pivota en la bisagra trasera) */}
            <group ref={lid} position={[0, TOP, -D / 2 + 0.04]} rotation={[-0.19, 0, 0]}>
                <RoundedBox args={[W, LID_H, LID_T]} radius={0.028} smoothness={6} bevelSegments={6} position={[0, LID_H / 2, 0]}>
                    <meshStandardMaterial color={metal} metalness={0.92} roughness={0.34} />
                </RoundedBox>

                <group ref={panel} position={[0, LID_H / 2, LID_T / 2 + 0.002]}>
                    {/* Marco negro */}
                    <mesh>
                        <planeGeometry args={[W - 0.1, LID_H - 0.1]} />
                        <meshStandardMaterial color="#050506" metalness={0.4} roughness={0.25} />
                    </mesh>
                    {/* Imagen de pantalla (se enciende con el scroll) */}
                    <mesh position={[0, 0.01, 0.002]}>
                        <planeGeometry args={[W - 0.22, LID_H - 0.26]} />
                        <meshBasicMaterial ref={screenMat} map={screenTexture} transparent opacity={0} toneMapped={false} />
                    </mesh>
                </group>

                {/* Logos del stack */}
                {tileData.map((d, i) => (
                    <mesh
                        key={d.icon.name}
                        ref={(m) => {
                            tiles.current[i] = m;
                        }}
                        visible={false}
                    >
                        <planeGeometry args={[0.56, 0.56]} />
                        <meshBasicMaterial map={tileTextures[i]} transparent opacity={0} toneMapped={false} depthWrite={false} />
                    </mesh>
                ))}
            </group>

            {/* Luz morada de acento bajo el equipo */}
            <pointLight position={[0, 0.6, 1.2]} intensity={2.2} color={PURPLE} distance={5} />
        </group>
    );
}

export default function Scene({ progress, isDark, active }: SceneProps) {
    return (
        <Canvas
            dpr={[1, 1.75]}
            frameloop={active ? "always" : "never"}
            camera={{ position: [0, 0.4, 9], fov: 30 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={isDark ? 0.6 : 0.7} />
            <directionalLight position={[4, 6, 5]} intensity={isDark ? 2.4 : 2.2} />
            <directionalLight position={[-5, 3, -2]} intensity={0.6} color={PURPLE} />
            <Laptop progress={progress} isDark={isDark} />
            <ContactShadows position={[0, -1.55, 0]} scale={12} blur={2.6} far={4} opacity={isDark ? 0.55 : 0.28} resolution={512} />
            {/* Estudio local (sin HDR remoto): paneles suaves para el reflejo del aluminio */}
            <Environment resolution={256}>
                <mesh scale={50}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color={isDark ? "#2c2c33" : "#e9e9ee"} side={THREE.BackSide} />
                </mesh>
                <Lightformer form="rect" intensity={isDark ? 4 : 4} position={[0, 6, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 6, 1]} />
                <Lightformer form="rect" intensity={isDark ? 1.5 : 2} position={[-6, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 3, 1]} />
                <Lightformer form="rect" intensity={isDark ? 1.5 : 2} position={[6, 1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 3, 1]} />
                <Lightformer form="rect" intensity={1.2} color={PURPLE} position={[0, 1, -6]} scale={[8, 3, 1]} />
            </Environment>
        </Canvas>
    );
}
