'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ParticleFieldProps } from './AntigravityBackground.types';

// Khannda purple palette tuned for the rim-active state.
const COLOR_A = new THREE.Color('#8a3c86');
const COLOR_B = new THREE.Color('#c87bbf');
const COLOR_C = new THREE.Color('#592355');

// Idle colors blend almost into each background so out-of-halo dashes feel quiet.
const COLOR_IDLE_LIGHT = new THREE.Color('#cfc8c4');
const COLOR_IDLE_DARK = new THREE.Color('#22202a');

const VERTEX_SHADER = /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;

    attribute vec3 aOffset;
    attribute float aRandom;
    attribute float aBaseAngle;

    varying vec2 vUv;
    varying float vRim;
    varying vec2 vPos;

    #define PI 3.14159265359

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    mat2 rotate2d(float a) {
        return mat2(cos(a), sin(a), -sin(a), cos(a));
    }

    void main() {
        vUv = uv;
        vec3 pos = aOffset;

        // --- 1. Alive flow: every particle drifts in a curl-like field.
        float driftSpeed = uTime * 0.15;
        float dx = sin(driftSpeed + pos.y * 0.5) + sin(driftSpeed * 0.5 + pos.y * 2.0);
        float dy = cos(driftSpeed + pos.x * 0.5) + cos(driftSpeed * 0.5 + pos.x * 2.0);
        pos.x += dx * 0.25;
        pos.y += dy * 0.25;

        // --- 2. Jellyfish halo: a breathing ring at radius ~2.2 around the cursor.
        vec2 relToMouse = pos.xy - uMouse;
        float distFromMouse = length(relToMouse);
        float angleToMouse = atan(relToMouse.y, relToMouse.x);
        float shapeFactor = noise(vec2(angleToMouse * 2.0, uTime * 0.1));
        float breath = sin(uTime * 0.8);
        float radius = 2.2 + breath * 0.3 + shapeFactor * 0.5;
        float rim = smoothstep(1.8, 0.0, abs(distFromMouse - radius));

        // --- 3. Soft outward push when the halo expands.
        vec2 pushDir = normalize(relToMouse + vec2(0.0001, 0.0));
        float pushAmt = (breath * 0.5 + 0.5) * 0.5;
        pos.xy += pushDir * pushAmt * rim;
        pos.z += rim * 0.3 * sin(uTime);

        // --- 4. Sizing: tiny baseline + visible bloom at the rim.
        float baseSize = 0.012 + sin(uTime + pos.x) * 0.003;
        float activeSize = 0.055;
        float scale = baseSize + rim * activeSize;
        float stretch = rim * 0.02;

        vec3 transformed = position;
        transformed.x *= (scale + stretch);
        transformed.y *= scale * 0.85;

        // --- 5. Rotation: keep random base angle when idle, blend toward radial near rim.
        //     This is the key fix vs. the original — particles don't all point at the cursor.
        float angle = mix(aBaseAngle, angleToMouse, rim);
        transformed.xy = rotate2d(angle) * transformed.xy;

        vRim = rim;
        vPos = pos.xy;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
    }
`;

const FRAGMENT_SHADER = /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorIdle;
    uniform float uIdleAlpha;
    uniform float uActiveAlpha;

    varying vec2 vUv;
    varying float vRim;
    varying vec2 vPos;

    void main() {
        // Rounded-rectangle (super-ellipse) silhouette so dashes have soft pill caps.
        vec2 p = abs(vUv - 0.5) * 2.0;
        float d = pow(pow(p.x, 2.6) + pow(p.y, 2.6), 1.0 / 2.6);
        float silhouette = 1.0 - smoothstep(0.8, 1.0, d);
        if (silhouette < 0.01) discard;

        // Dynamic color shift across the Khannda palette.
        float t = uTime * 1.2;
        float p1 = sin(vPos.x * 0.8 + t);
        float p2 = sin(vPos.y * 0.8 + t * 0.8 + p1);
        vec3 active = mix(uColorA, uColorB, p1 * 0.5 + 0.5);
        active = mix(active, uColorC, p2 * 0.5 + 0.5);

        vec3 color = mix(uColorIdle, active, smoothstep(0.1, 0.8, vRim));
        float alpha = silhouette * mix(uIdleAlpha, uActiveAlpha, vRim);

        gl_FragColor = vec4(color, alpha);
    }
`;

export const ParticleField = ({ isDark, columns, rows, dragFactor }: ParticleFieldProps) => {
    const meshRef = useRef<THREE.InstancedMesh | null>(null);
    const { gl, viewport } = useThree();

    const count = columns * rows;

    const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uColorA: { value: COLOR_A.clone() },
            uColorB: { value: COLOR_B.clone() },
            uColorC: { value: COLOR_C.clone() },
            uColorIdle: { value: (isDark ? COLOR_IDLE_DARK : COLOR_IDLE_LIGHT).clone() },
            uIdleAlpha: { value: isDark ? 0.32 : 0.55 },
            uActiveAlpha: { value: isDark ? 0.95 : 0.92 },
        }),
        // We intentionally only build this once; theme updates patched in below via useEffect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    // Keep idle color + alphas in sync with theme without rebuilding the material.
    useEffect(() => {
        uniforms.uColorIdle.value.copy(isDark ? COLOR_IDLE_DARK : COLOR_IDLE_LIGHT);
        uniforms.uIdleAlpha.value = isDark ? 0.32 : 0.55;
        uniforms.uActiveAlpha.value = isDark ? 0.95 : 0.92;
    }, [isDark, uniforms]);

    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms,
                vertexShader: VERTEX_SHADER,
                fragmentShader: FRAGMENT_SHADER,
                transparent: true,
                depthWrite: false,
            }),
        [uniforms],
    );

    // Populate per-instance attributes.
    useEffect(() => {
        if (!meshRef.current) return;
        const offsets = new Float32Array(count * 3);
        const randoms = new Float32Array(count);
        const baseAngles = new Float32Array(count);

        const gridWidth = 40;
        const gridHeight = 22;
        const jitter = 0.25;

        let i = 0;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const u = x / Math.max(1, columns - 1);
                const v = y / Math.max(1, rows - 1);
                const px = (u - 0.5) * gridWidth + (Math.random() - 0.5) * jitter;
                const py = (v - 0.5) * gridHeight + (Math.random() - 0.5) * jitter;
                offsets[i * 3] = px;
                offsets[i * 3 + 1] = py;
                offsets[i * 3 + 2] = 0;
                randoms[i] = Math.random();
                baseAngles[i] = Math.random() * Math.PI * 2;
                i++;
            }
        }

        const geom = meshRef.current.geometry;
        geom.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
        geom.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));
        geom.setAttribute('aBaseAngle', new THREE.InstancedBufferAttribute(baseAngles, 1));
    }, [count, columns, rows]);

    // Window-level mouse tracking — so the halo follows the cursor even when it
    // hovers DOM elements stacked above the canvas (headline, buttons).
    const mouseTarget = useRef({ x: 0, y: 0 });
    const hovering = useRef(true);

    useEffect(() => {
        const canvas = gl.domElement;

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            mouseTarget.current.x = (nx * viewport.width) / 2;
            mouseTarget.current.y = (ny * viewport.height) / 2;
        };
        const onLeave = () => {
            hovering.current = false;
        };
        const onEnter = () => {
            hovering.current = true;
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.body.addEventListener('mouseleave', onLeave);
        document.body.addEventListener('mouseenter', onEnter);
        return () => {
            window.removeEventListener('mousemove', onMove);
            document.body.removeEventListener('mouseleave', onLeave);
            document.body.removeEventListener('mouseenter', onEnter);
        };
    }, [gl, viewport.width, viewport.height]);

    useFrame(({ clock }) => {
        uniforms.uTime.value = clock.getElapsedTime();
        const tx = hovering.current ? mouseTarget.current.x : 0;
        const ty = hovering.current ? mouseTarget.current.y : 0;
        const c = uniforms.uMouse.value;
        c.x += (tx - c.x) * dragFactor;
        c.y += (ty - c.y) * dragFactor;
    });

    return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};
