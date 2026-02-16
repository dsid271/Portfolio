import { Point } from "./kolamField";
import { isKolamMoveValid } from "./kolamRules";

export function snapToKolam(
    current: Point,
    desired: Point,
    anchors: Point[]
): { point: Point; valid: boolean } {
    let closest = current;
    let minDist = Infinity;
    let valid = false;

    for (const p of anchors) {
        const d = distance(p, desired);
        if (d < minDist && isKolamMoveValid(current, p)) {
            minDist = d;
            closest = p;
            valid = true;
        }
    }

    return { point: closest, valid };
}

function distance(a: Point, b: Point) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
