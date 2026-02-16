export type Point = { x: number; y: number };

export const KOLAM_GRID_SIZE = 120;

/**
 * Generate symmetry-valid anchor points
 * (radial + axial symmetry)
 */
export function generateKolamPoints(radius = 3): Point[] {
    const points: Point[] = [];

    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            if ((x + y) % 2 === 0) {
                points.push({
                    x: x * KOLAM_GRID_SIZE,
                    y: y * KOLAM_GRID_SIZE
                });
            }
        }
    }

    return points;
}
