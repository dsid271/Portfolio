import { modelState, notify } from "./modelState";

export function triggerOverfit() {
    if (modelState.stage !== "converged") return;

    modelState.stage = "unstable";
    modelState.confidence *= 0.6;
    modelState.loss += 0.2;
    modelState.stabilityFrames = 0;
    notify();
}
