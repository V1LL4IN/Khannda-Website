'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { cn } from '@/lib/utils';
import { ParticleField } from './ParticleField';
import type { AntigravityBackgroundProps } from './AntigravityBackground.types';

const useIsMobile = () => {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const apply = () => setMobile(window.innerWidth < 768);
        apply();
        window.addEventListener('resize', apply);
        return () => window.removeEventListener('resize', apply);
    }, []);
    return mobile;
};

export const AntigravityBackground = ({
    className,
    isDark = false,
    columns,
    rows,
    dragFactor = 0.06,
    dprRange = [1, 2],
}: AntigravityBackgroundProps) => {
    const isMobile = useIsMobile();
    const cols = columns ?? (isMobile ? 60 : 100);
    const rowCount = rows ?? (isMobile ? 35 : 55);

    return (
        <div className={cn('h-full w-full block', className)} aria-hidden>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={dprRange}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ParticleField
                    isDark={isDark}
                    columns={cols}
                    rows={rowCount}
                    dragFactor={dragFactor}
                />
            </Canvas>
        </div>
    );
};
