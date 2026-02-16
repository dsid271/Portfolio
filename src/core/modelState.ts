export type ModelStage = "init" | "training" | "converged" | "unstable";

export const modelState = {
    confidence: 0,
    stabilityFrames: 0,
    loss: 1,
    calmness: 0,
    stage: "init" as ModelStage
};

const listeners = new Set<() => void>();

let snapshot = { ...modelState };

export function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function notify() {
    snapshot = { ...modelState };
    listeners.forEach(l => l());
}

export function getSnapshot() {
    return snapshot;
}
