// ─── Rotation Constants ───────────────────────────────────────────────
// These represent the final Y-axis rotation for each named orientation.
// The brain model maps: model.z → screenX, model.x → depth.
// A rotation of 0 shows the RIGHT side, π/2 shows FRONT, etc.

export const ROTATIONS = {
    RIGHT: 0,
    FRONT: Math.PI / 2,
    LEFT: Math.PI,
    BACK: -Math.PI / 2,
} as const;

// ─── Section View Configuration ──────────────────────────────────────

export interface SectionView {
    shiftX: number;
    shiftY: number;
    scale: number;
    rotation: number;
    dispersal: number;
}

const DESKTOP_SECTIONS: SectionView[] = [
    // 0 — Hero: slight 3/4 dimensional look
    { shiftX: 0, shiftY: 0, scale: 1.0, rotation: ROTATIONS.FRONT + 0.25, dispersal: 0 },
    // 1 — Architect: symmetrical, confident
    { shiftX: -150, shiftY: -50, scale: 1.3, rotation: ROTATIONS.FRONT, dispersal: 0 },
    // 2 — Network: dynamic but stable
    { shiftX: 200, shiftY: 0, scale: 1.2, rotation: ROTATIONS.LEFT - 0.25, dispersal: 0 },
    // 3 — Evolution: clean and centered
    { shiftX: 0, shiftY: 100, scale: 1.0, rotation: ROTATIONS.FRONT, dispersal: 0 },
    // 4 — Contact: calm ending
    { shiftX: -350, shiftY: 0, scale: 0.9, rotation: ROTATIONS.FRONT, dispersal: 0 },
];

const MOBILE_SECTIONS: SectionView[] = [
    // 0 — Hero
    { shiftX: 0, shiftY: 0, scale: 0.75, rotation: ROTATIONS.FRONT + 0.2, dispersal: 0 },
    // 1 — Architect
    { shiftX: 0, shiftY: -20, scale: 0.85, rotation: ROTATIONS.FRONT, dispersal: 0 },
    // 2 — Network
    { shiftX: 0, shiftY: 0, scale: 0.8, rotation: ROTATIONS.LEFT, dispersal: 0 },
    // 3 — Evolution
    { shiftX: 0, shiftY: 40, scale: 0.7, rotation: ROTATIONS.FRONT, dispersal: 0 },
    // 4 — Contact
    { shiftX: 0, shiftY: 0, scale: 0.5, rotation: ROTATIONS.FRONT, dispersal: 0 },
];

export function getSectionView(section: number, isMobile: boolean): SectionView {
    const list = isMobile ? MOBILE_SECTIONS : DESKTOP_SECTIONS;
    return list[Math.min(section, list.length - 1)] ?? list[0];
}

// ─── Particle Budgets ────────────────────────────────────────────────

export const PARTICLE_CONFIG = {
    desktop: {
        active: 2800,
        minKolam: 800,
        bubbles: 1500,
        bgMask: 30000,
        thinkingNodes: 10,
    },
    mobile: {
        active: 800,
        minKolam: 250,
        bubbles: 400,
        bgMask: 0,        // disabled on mobile
        thinkingNodes: 5,
    },
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────

/** Shortest-path angle interpolation to prevent long spins. */
export function lerpAngle(current: number, target: number, factor: number): number {
    let diff = ((target - current + Math.PI) % (2 * Math.PI)) - Math.PI;
    // Handle negative modulo edge case
    if (diff < -Math.PI) diff += 2 * Math.PI;
    return current + diff * factor;
}

// ─── Rendering Constants ─────────────────────────────────────────────

export const BRAIN_SCALE = 2.5;
export const BRAIN_OFFSET_Y = 50;
export const LERP_SPEED = 0.06;
export const MOUSE_RADIUS = 120;
export const KOLAM_RING_RADII = [150, 230, 310] as const;
