'use client';

import React, { useId } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import { cn } from '@/lib/utils';
import type { SparklesCoreProps } from './Sparkles.types';

const initEngine = async (engine: Engine) => {
    await loadSlim(engine);
};

export const SparklesCore = (props: SparklesCoreProps) => {
    const {
        id,
        className,
        background = 'transparent',
        minSize = 0.6,
        maxSize = 1.4,
        speed = 1,
        particleColor = '#ffffff',
        particleDensity = 100,
    } = props;

    const generatedId = useId();

    return (
        <ParticlesProvider init={initEngine}>
            <Particles
                id={id || generatedId}
                className={cn('h-full w-full', className)}
                options={{
                    background: { color: { value: background } },
                    fullScreen: { enable: false, zIndex: 1 },
                    fpsLimit: 120,
                    detectRetina: true,
                    particles: {
                        number: {
                            value: particleDensity,
                            density: { enable: true, width: 400, height: 400 },
                        },
                        color: { value: particleColor },
                        shape: { type: 'circle' },
                        opacity: {
                            value: { min: 0.1, max: 1 },
                            animation: {
                                enable: true,
                                speed,
                                sync: false,
                                startValue: 'random',
                            },
                        },
                        size: {
                            value: { min: minSize, max: maxSize },
                        },
                        move: {
                            enable: true,
                            speed: { min: 0.1, max: 1 },
                            direction: 'none',
                            random: true,
                            straight: false,
                            outModes: { default: 'out' },
                        },
                    },
                }}
            />
        </ParticlesProvider>
    );
};
