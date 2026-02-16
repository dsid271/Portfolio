import { Point } from "./kolamField";

export function isContinuityValid(a: Point, b: Point) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return dx + dy <= 240;
}

export function isSymmetryValid(p: Point) {
    return Math.abs(p.x) === Math.abs(p.y) || p.x === 0 || p.y === 0;
}

export function isKolamMoveValid(from: Point, to: Point) {
    return isContinuityValid(from, to) && isSymmetryValid(to);
}
