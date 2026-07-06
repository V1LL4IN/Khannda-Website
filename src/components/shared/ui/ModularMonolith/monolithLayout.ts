// monolithLayout.ts — geometría lógica del monolito, PURA (sin three).
// Única fuente de verdad para el SVG placeholder (SSR) y las instancias 3D:
// ambos consumen buildMonolithLayout(), así la silueta siempre coincide.

export interface MonolithCell {
    /** Coordenadas de retícula (enteras). */
    gx: number;
    gy: number;
    gz: number;
    /** Posición de reposo en unidades de mundo, torre centrada en origen. */
    home: [number, number, number];
    /** Color base por tema (hex). Los acentos púrpura son iguales en ambos. */
    colorDark: string;
    colorLight: string;
    isAccent: boolean;
    /** Celda de frontera: no ocupada al inicio; la "obra" idle la construye/desmonta. */
    isFrontier: boolean;
    /** Índice de fila (0 = base) para el cizallado por scroll. */
    rowIndex: number;
    /** Ruido estable [0,1) para deriva horizontal del despiece. */
    jitter: number;
}

export interface MonolithLayout {
    /** Celdas ocupadas desde el inicio (escala 1). */
    cells: MonolithCell[];
    /** Celdas de frontera (escala 0 inicial, solo animan en idle). */
    frontier: MonolithCell[];
    grid: { x: number; y: number; z: number };
    cellSize: number;
    blockSize: number;
}

const SEED = 2019; // año de fundación de Khannda — seed de marca, no mágica

// Paleta (ver lib/constants/colors.ts / globals.css)
const ACCENTS = ['#592355', '#712F6D', '#8a3c86'] as const;
const NEUTRAL_DARK = '#1b1b21';
const NEUTRAL_LIGHT = '#e8e6e1';

/**
 * Hash entero puro por coordenada (orden-independiente, estable en Node y
 * navegador). k separa canales: 1 = ocupación, 2 = acento, 3 = jitter.
 */
export function hash3(x: number, y: number, z: number, k: number): number {
    let h =
        SEED ^
        Math.imul(x + 113, 374761393) ^
        Math.imul(y + 157, 668265263) ^
        Math.imul(z + 271, 1103515245) ^
        Math.imul(k + 31, 1274126177);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
}

/** Escala la luminosidad de un hex multiplicando RGB (válido para casi-grises). */
function scaleHexLightness(hex: string, factor: number): string {
    const n = parseInt(hex.slice(1), 16);
    const ch = (v: number) =>
        Math.max(0, Math.min(255, Math.round(v * factor)))
            .toString(16)
            .padStart(2, '0');
    return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
}

export function buildMonolithLayout({ compact = false } = {}): MonolithLayout {
    const grid = compact ? { x: 6, y: 14, z: 3 } : { x: 8, y: 20, z: 4 };
    const cellSize = 1.0;
    const blockSize = 0.92;

    const half = {
        x: (grid.x - 1) / 2,
        y: (grid.y - 1) / 2,
        z: (grid.z - 1) / 2,
    };

    // Silueta escalonada: más porosa hacia arriba. Cuantizada a 1e-6 porque
    // Math.pow no garantiza el mismo último bit entre motores JS y este valor
    // debe producir la MISMA silueta en Node (SSR del SVG) y en el navegador.
    const prob = (gy: number) => {
        const yNorm = gy / (grid.y - 1);
        return Math.round((0.94 - 0.42 * Math.pow(yNorm, 1.4)) * 1e6) / 1e6;
    };

    const makeCell = (gx: number, gy: number, gz: number, isFrontier: boolean): MonolithCell => {
        const hAcc = hash3(gx, gy, gz, 2);
        const hJit = hash3(gx, gy, gz, 3);
        const yNorm = gy / (grid.y - 1);
        const isAccent = !isFrontier && hAcc < 0.1;
        const accent = ACCENTS[yNorm < 0.33 ? 0 : yNorm < 0.66 ? 1 : 2];
        const jitterFactor = 1 + (hJit - 0.5) * 0.1;
        return {
            gx,
            gy,
            gz,
            home: [(gx - half.x) * cellSize, (gy - half.y) * cellSize, (gz - half.z) * cellSize],
            colorDark: isAccent ? accent : scaleHexLightness(NEUTRAL_DARK, jitterFactor),
            colorLight: isAccent ? accent : scaleHexLightness(NEUTRAL_LIGHT, jitterFactor),
            isAccent,
            isFrontier,
            rowIndex: gy,
            jitter: hJit,
        };
    };

    const occupied = (gx: number, gy: number, gz: number): boolean => {
        if (gx < 0 || gy < 0 || gz < 0 || gx >= grid.x || gy >= grid.y || gz >= grid.z) return false;
        const hOcc = hash3(gx, gy, gz, 1);
        // Cimiento sólido con poros en las 3 filas base.
        if (gy <= 2) return hOcc <= 0.92;
        return hOcc < prob(gy);
    };

    const cells: MonolithCell[] = [];
    const frontier: MonolithCell[] = [];

    for (let gx = 0; gx < grid.x; gx++) {
        for (let gy = 0; gy < grid.y; gy++) {
            for (let gz = 0; gz < grid.z; gz++) {
                if (occupied(gx, gy, gz)) {
                    cells.push(makeCell(gx, gy, gz, false));
                    continue;
                }
                // Frontera: casi-ocupada y pegada a la estructura → candidata a
                // construirse/desmontarse en la animación idle de "obra".
                const hOcc = hash3(gx, gy, gz, 1);
                const nearMiss = gy > 2 && hOcc >= prob(gy) && hOcc < prob(gy) + 0.06;
                if (!nearMiss) continue;
                const hasNeighbor =
                    occupied(gx + 1, gy, gz) ||
                    occupied(gx - 1, gy, gz) ||
                    occupied(gx, gy + 1, gz) ||
                    occupied(gx, gy - 1, gz) ||
                    occupied(gx, gy, gz + 1) ||
                    occupied(gx, gy, gz - 1);
                if (hasNeighbor) frontier.push(makeCell(gx, gy, gz, true));
            }
        }
    }

    return { cells, frontier, grid, cellSize, blockSize };
}

/** Comprueba ocupación dentro de un layout ya construido (para caras del SVG). */
export function buildOccupancySet(layout: MonolithLayout): Set<string> {
    return new Set(layout.cells.map((c) => `${c.gx},${c.gy},${c.gz}`));
}
