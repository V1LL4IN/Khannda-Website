"use client";

// Escena WebGL del hero: una imagen generada con IA + su mapa de profundidad.
// Se importa SOLO vía next/dynamic (ssr:false) para que three.js no entre en
// el bundle inicial.
//
// Un único quad a pantalla completa. Por cada píxel se lanza un rayo desde
// una cámara virtual contra el relieve que describe el mapa de profundidad
// (blanco = cerca), de modo que:
//   - el cursor desplaza la cámara → paralaje real entre planos;
//   - el foco sigue la profundidad que hay bajo el cursor (desenfoque por
//     distancia al plano enfocado);
//   - el scroll acerca la cámara (dolly): lo cercano crece más rápido que lo
//     lejano y sale de cuadro desenfocado, mientras el foco viaja al fondo.
import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

export interface DepthSceneProps {
    /** Progreso de scroll del hero (0→1). */
    progress: MotionValue<number>;
    /** false = canvas congelado (fuera de pantalla). */
    active: boolean;
    /** Se llama una vez, cuando las texturas ya están en pantalla. */
    onReady?: () => void;
}

// ── Asset ───────────────────────────────────────────────────────────────
const IMAGE_ASPECT = 2752 / 1536;
const IMAGE_SRC = "/hero/modular.webp";
const IMAGE_SRC_SMALL = "/hero/modular-1600.webp";
const DEPTH_SRC = "/hero/modular-depth.webp";

// ── Encuadre (debe coincidir con el póster <img> de HeroSection) ────────
/** Sobre-escaneo: margen para que el paralaje no enseñe el borde. */
export const OVERSCAN = 1.05;
/** object-position horizontal: en apaisado deja aire a la izquierda para el
 *  titular; en vertical encuadra el enjambre lejano y el borde del racimo. */
export const LANDSCAPE_FOCUS_X = 0.15;
export const PORTRAIT_FOCUS_X = 0.48;
/** Punto (en coordenadas del plano) hacia el que avanza la cámara. */
const DOLLY_TARGET: [number, number] = [-0.06, 0.07];

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const fragmentShader = /* glsl */ `
varying vec2 vUv;

uniform sampler2D uImage;
uniform sampler2D uDepth;
uniform float uViewAspect;
uniform float uImageAspect;
uniform float uTexelRatio; // texels de imagen por píxel de pantalla, en reposo
uniform float uImageHeight; // alto de la textura en texels
uniform float uFocusX;     // object-position horizontal (0..1)
uniform vec2 uPointer;     // -1..1, y hacia arriba (suavizado)
uniform float uHover;      // 0..1: hay cursor sobre la escena
uniform float uFocus;      // profundidad enfocada (0 lejos .. 1 cerca)
uniform float uProgress;   // scroll 0..1
uniform float uIntro;      // 0..1: el relieve "crece" al cargar
uniform float uTime;
uniform vec2 uTarget;

const float OVERSCAN = ${OVERSCAN.toFixed(3)};
const float Z0 = 2.0;      // distancia inicial de la cámara (alto de imagen = 1)

// Ruido de gradiente intercalado: rompe el bandeado del ray-march y del blur
float ign(vec2 p) {
    return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

vec2 toUv(vec2 p) {
    return vec2(p.x / uImageAspect + 0.5, p.y + 0.5);
}

float depthAt(vec2 p) {
    return texture2D(uDepth, toUv(p)).r;
}

void main() {
    float e = uProgress * uProgress * (3.0 - 2.0 * uProgress);

    // Encuadre tipo object-fit: cover
    float cover = min(uViewAspect / uImageAspect, 1.0); // fracción visible del ancho
    vec2 halfExt = (uViewAspect < uImageAspect
        ? vec2(uViewAspect, 1.0)
        : vec2(uImageAspect, uImageAspect / uViewAspect)) * 0.5 / OVERSCAN;
    float centerX = ((1.0 - cover) * uFocusX + cover * 0.5 - 0.5) * uImageAspect;
    vec2 center = mix(vec2(centerX, 0.0), uTarget, e);

    // Relieve y cámara
    float H = uIntro * mix(0.27, 0.42, e);
    float Zc = mix(Z0, 1.0, e) + (1.0 - uIntro) * 0.14;
    float zRef = 0.5 * H; // plano que no se mueve al desplazar la cámara
    float zoom = (Zc - zRef) / (Z0 - zRef);

    vec2 drift = 0.03 * vec2(sin(uTime * 0.31), cos(uTime * 0.23));
    vec2 shift = (uPointer * vec2(0.22, 0.15) * uHover + drift) * uIntro * (1.0 - 0.55 * e);

    vec3 ro = vec3(center + shift, Zc);
    vec2 target = center + (vUv - 0.5) * 2.0 * halfExt * zoom;
    vec3 rd = vec3(target, zRef) - ro;

    // Ray-march desde el techo del relieve (z = H) hasta el fondo (z = 0)
    float inv = 1.0 / max(Zc - zRef, 1e-4);
    float tTop = (Zc - H) * inv;
    float tBot = Zc * inv;
    float dt = (tBot - tTop) / float(STEPS);
    float noise = ign(gl_FragCoord.xy);

    float tFree = tTop;                 // última muestra por encima del relieve
    float tHit = tBot;                  // primera muestra por debajo
    float t = tTop + dt * noise;
    for (int i = 0; i < STEPS; i++) {
        vec3 p = ro + rd * t;
        if (p.z <= depthAt(p.xy) * H) {
            tHit = t;
            break;
        }
        tFree = t;
        t += dt;
    }
    // Bisección: fija el impacto con precisión sub-paso (bordes limpios)
    for (int i = 0; i < 5; i++) {
        float tm = 0.5 * (tFree + tHit);
        vec3 p = ro + rd * tm;
        if (p.z <= depthAt(p.xy) * H) tHit = tm; else tFree = tm;
    }
    vec2 hit = (ro + rd * min(tHit, tBot)).xy;
    float d = depthAt(hit);

    // Profundidad de campo: disco de muestras rotado por píxel. Cada muestra
    // lee un mip acorde al radio, así el desenfoque queda liso con pocas tomas.
    float coc = max(abs(d - uFocus) - 0.07, 0.0);
    float radius = coc * mix(0.007, 0.018, e);
    float lod = log2(max(max(uTexelRatio * zoom, radius * uImageHeight * 0.45), 1.0));
    vec3 color = vec3(0.0);
    float angle = noise * 6.2831853;
    for (int i = 0; i < TAPS; i++) {
        float r = sqrt((float(i) + 0.5) / float(TAPS)) * radius;
        angle += 2.39996323;
        color += textureLod(uImage, toUv(hit + r * vec2(cos(angle), sin(angle))), lod).rgb;
    }
    color /= float(TAPS);

    // Luz suave que sigue al cursor; lo cercano la recoge más
    vec2 pointerPlane = vec2(centerX, 0.0) + uPointer * halfExt;
    vec2 q = hit - pointerPlane;
    float spot = exp(-dot(q, q) / 0.11) * (0.25 + 0.75 * d);
    color += color * spot * 0.38 * uHover * (1.0 - e);

    color += (ign(gl_FragCoord.xy + 17.0 * fract(uTime)) - 0.5) * 0.012;
    gl_FragColor = vec4(color, 1.0);
}`;

const damp = (current: number, target: number, rate: number, dt: number) =>
    current + (target - current) * (1 - Math.exp(-rate * dt));

function loadTexture(src: string, mipmaps = false) {
    return new Promise<THREE.Texture>((resolve, reject) => {
        new THREE.TextureLoader().load(
            src,
            (tex) => {
                // Sin gestión de color: el shader trabaja y escribe en sRGB tal cual
                tex.colorSpace = THREE.NoColorSpace;
                tex.generateMipmaps = mipmaps;
                tex.minFilter = mipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
                resolve(tex);
            },
            undefined,
            reject
        );
    });
}

/** Copia del mapa de profundidad en CPU, para saber qué hay bajo el cursor. */
function readDepthPixels(image: CanvasImageSource) {
    const w = 256;
    const h = Math.round(w / IMAGE_ASPECT);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(image, 0, 0, w, h);
    return { data: ctx.getImageData(0, 0, w, h).data, w, h };
}

function DepthPlane({ progress, onReady }: Omit<DepthSceneProps, "active">) {
    const { gl, size, viewport, invalidate } = useThree();
    const depthPixels = useRef<ReturnType<typeof readDepthPixels>>(null);
    const loaded = useRef(false);
    const announced = useRef(false);

    // Estado de interacción (fuera de React: se lee en cada frame)
    const pointer = useRef({ x: 0, y: 0, hover: 0 });
    const smooth = useRef({ x: 0, y: 0, hover: 0, focus: 0.5, progress: 0, intro: 0 });

    const coarse = useMemo(() => window.matchMedia("(pointer: coarse)").matches, []);

    const uniforms = useMemo(
        () => ({
            uImage: { value: null as THREE.Texture | null },
            uDepth: { value: null as THREE.Texture | null },
            uViewAspect: { value: 1 },
            uImageAspect: { value: IMAGE_ASPECT },
            uTexelRatio: { value: 1 },
            uImageHeight: { value: 1536 },
            uFocusX: { value: 0.5 },
            uPointer: { value: new THREE.Vector2() },
            uHover: { value: 0 },
            uFocus: { value: 0.5 },
            uProgress: { value: 0 },
            uIntro: { value: 0 },
            uTime: { value: 0 },
            uTarget: { value: new THREE.Vector2(...DOLLY_TARGET) },
        }),
        []
    );

    // Texturas
    useEffect(() => {
        let cancelled = false;
        const devicePx = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
        const imageSrc = devicePx > 1700 ? IMAGE_SRC : IMAGE_SRC_SMALL;
        let textures: THREE.Texture[] = [];

        Promise.all([loadTexture(imageSrc, true), loadTexture(DEPTH_SRC)])
            .then(([image, depth]) => {
                textures = [image, depth];
                if (cancelled) {
                    textures.forEach((tex) => tex.dispose());
                    return;
                }
                uniforms.uImage.value = image;
                uniforms.uImageHeight.value = (image.image as HTMLImageElement).height;
                uniforms.uDepth.value = depth;
                depthPixels.current = readDepthPixels(depth.image as CanvasImageSource);
                loaded.current = true;
                invalidate();
            })
            .catch(() => {
                // Sin texturas se queda el póster estático de HeroSection
            });

        return () => {
            cancelled = true;
            textures.forEach((tex) => tex.dispose());
        };
    }, [uniforms, invalidate]);

    // Cursor (solo punteros finos: en táctil la escena deriva sola)
    useEffect(() => {
        if (coarse) return;
        const el = gl.domElement;
        const onMove = (ev: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
            const inside = Math.abs(x) <= 1 && Math.abs(y) <= 1;
            pointer.current.hover = inside ? 1 : 0;
            if (inside) {
                pointer.current.x = x;
                pointer.current.y = y;
            }
        };
        const onLeave = () => {
            pointer.current.hover = 0;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, [gl, coarse]);

    useFrame((state, delta) => {
        if (!loaded.current) return;
        const dt = Math.min(delta, 0.1);
        const s = smooth.current;
        const u = uniforms;

        const aspect = size.width / size.height;
        const focusX = aspect < 1 ? PORTRAIT_FOCUS_X : LANDSCAPE_FOCUS_X;
        // Texels de imagen por píxel de pantalla con el encuadre en reposo
        const visibleRows = (aspect < IMAGE_ASPECT ? 1 : IMAGE_ASPECT / aspect) / OVERSCAN;
        u.uTexelRatio.value = (u.uImageHeight.value * visibleRows) / (size.height * viewport.dpr);

        s.intro = Math.min(1, s.intro + dt / 1.8);
        s.progress = damp(s.progress, progress.get(), 9, dt);
        s.hover = damp(s.hover, pointer.current.hover, 3, dt);
        s.x = damp(s.x, pointer.current.x, 4.5, dt);
        s.y = damp(s.y, pointer.current.y, 4.5, dt);

        // Foco: la profundidad bajo el cursor; al hacer scroll viaja al fondo
        let focusTarget = 0.5;
        const px = depthPixels.current;
        if (px && pointer.current.hover) {
            const cover = Math.min(aspect / IMAGE_ASPECT, 1);
            const centerU = (1 - cover) * focusX + cover * 0.5;
            const halfU = (aspect < IMAGE_ASPECT ? aspect / IMAGE_ASPECT : 1) * 0.5 / OVERSCAN;
            const halfV = (aspect < IMAGE_ASPECT ? 1 : IMAGE_ASPECT / aspect) * 0.5 / OVERSCAN;
            const uu = centerU + pointer.current.x * halfU;
            const vv = 0.5 - pointer.current.y * halfV;
            const ix = Math.min(px.w - 1, Math.max(0, Math.round(uu * (px.w - 1))));
            const iy = Math.min(px.h - 1, Math.max(0, Math.round(vv * (px.h - 1))));
            // El vacío del fondo no "tira" del foco: se queda en el racimo central
            const sample = px.data[(iy * px.w + ix) * 4] / 255;
            focusTarget = sample < 0.08 ? 0.5 : sample;
        }
        const e = s.progress * s.progress * (3 - 2 * s.progress);
        s.focus = damp(s.focus, focusTarget + (0.1 - focusTarget) * e, 2.5, dt);

        u.uViewAspect.value = aspect;
        u.uFocusX.value = focusX;
        u.uPointer.value.set(s.x, s.y);
        u.uHover.value = s.hover;
        u.uFocus.value = s.focus;
        u.uProgress.value = s.progress;
        u.uIntro.value = 1 - Math.pow(1 - s.intro, 3);
        u.uTime.value = state.clock.elapsedTime;

        if (!announced.current) {
            announced.current = true;
            onReady?.();
        }
    });

    return (
        <mesh frustumCulled={false}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                defines={coarse ? { STEPS: 18, TAPS: 10 } : { STEPS: 30, TAPS: 16 }}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

export default function DepthScene({ progress, active, onReady }: DepthSceneProps) {
    return (
        <Canvas
            flat
            dpr={[1, 1.5]}
            frameloop={active ? "always" : "never"}
            gl={{ antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0 }}
        >
            <DepthPlane progress={progress} onReady={onReady} />
        </Canvas>
    );
}
