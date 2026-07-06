"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Globe, Code2, Terminal, Layers, Server, Database, Cloud, Cpu,
    Sparkles
} from 'lucide-react';

interface TechItemProps {
    name: string;
    icon: React.ReactNode;
    color: string;
    delay: number;
}

const TechItem = ({ name, icon, color, delay }: TechItemProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        className={cn(
            "flex flex-col items-center justify-center gap-2 p-4 rounded-xl",
            "bg-white/5 border border-white/10 backdrop-blur-sm",
            "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
            "cursor-default group"
        )}
    >
        <div className={cn("p-3 rounded-lg", color)}>
            {icon}
        </div>
        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {name}
        </span>
    </motion.div>
);

import { useLanguage } from '@/providers/LanguageProvider';

export const TechStackScreen = () => {
    const { t } = useLanguage();
    const technologies = [
        { name: "Next.js", icon: <Globe size={24} className="text-white" />, color: "bg-black", delay: 0.1 },
        { name: "React", icon: <Code2 size={24} className="text-cyan-400" />, color: "bg-cyan-500/20", delay: 0.15 },
        { name: "TypeScript", icon: <Terminal size={24} className="text-blue-400" />, color: "bg-blue-500/20", delay: 0.2 },
        { name: "Tailwind", icon: <Layers size={24} className="text-teal-400" />, color: "bg-teal-500/20", delay: 0.25 },
        { name: "Node.js", icon: <Server size={24} className="text-green-400" />, color: "bg-green-500/20", delay: 0.3 },
        { name: "PostgreSQL", icon: <Database size={24} className="text-indigo-400" />, color: "bg-indigo-500/20", delay: 0.35 },
        { name: "AWS", icon: <Cloud size={24} className="text-orange-400" />, color: "bg-orange-500/20", delay: 0.4 },
        { name: "n8n", icon: <Cpu size={24} className="text-rose-400" />, color: "bg-rose-500/20", delay: 0.45 },
    ];

    return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-purple-950/50 to-neutral-900 relative overflow-hidden flex flex-col">
            {/* Subtle gradient orbs (radial-gradient: sin coste de filtro GPU) */}
            <div className="absolute top-0 left-1/4 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 right-1/4 w-48 h-48" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.17) 0%, transparent 70%)' }} />

            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-400" />
                    <span className="text-sm font-medium text-white/90">{t.technologies.stackScreen.header}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col justify-center">
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                    {technologies.map((tech, idx) => (
                        <TechItem
                            key={idx}
                            name={tech.name}
                            icon={tech.icon}
                            color={tech.color}
                            delay={tech.delay}
                        />
                    ))}
                </div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center mt-6 text-white/60 text-sm"
                >
                    {t.technologies.stackScreen.tagline}
                </motion.p>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                <span>{t.technologies.stackScreen.footer}</span>
                <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {t.technologies.stackScreen.updated}
                </span>
            </div>
        </div>
    );
};
