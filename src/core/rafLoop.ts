import { modelState, notify } from "./modelState";
import { triggerOverfit } from "./overfit";

/**
 * Shared idle counter
 * Mutated by interactionEngine
 */
export const idleFrames = { value: 0 };

export function startRafLoop() {
    function tick() {
        idleFrames.value++;

        /* ------------------------------
           Passive stabilization (always)
        ------------------------------ */
        modelState.loss *= 0.995;
        if (idleFrames.value > 60) {
            modelState.confidence *= 0.998;
        }

        /* --------------------------------
           Idle reward AFTER convergence
        -------------------------------- */
        if (idleFrames.value > 120 && modelState.stage === "converged") {
            modelState.loss *= 0.99;
            modelState.confidence += 0.002;
        }

        /* ------------------------------
           Clamp
        ------------------------------ */
        modelState.loss = clamp(modelState.loss, 0, 1);
        modelState.confidence = clamp(modelState.confidence, 0, 1);
        notify();

        /* ------------------------------
           Stage transitions (FSM)
        ------------------------------ */
        if (modelState.stage !== "unstable") {
            if (modelState.stage === "converged") {
                // Stay converged unless clearly degraded
                if (
                    modelState.confidence < 0.6 ||
                    modelState.loss > 0.4
                ) {
                    modelState.stage = "training";
                }
            } else {
                // Not converged yet → normal promotion
                if (modelState.confidence < 0.25) {
                    modelState.stage = "init";
                } else if (
                    modelState.confidence < 0.8 ||
                    modelState.loss > 0.25
                ) {
                    modelState.stage = "training";
                } else {
                    modelState.stage = "converged";
                }
            }
        }
        notify();

        /* ------------------------------
           Stability tracking
        ------------------------------ */
        if (modelState.stage === "converged") {
            modelState.stabilityFrames++;
        } else {
            modelState.stabilityFrames = 0;
        }

        /* ------------------------------
           Overfitting detection
           ~8 seconds @ 60fps
        ------------------------------ */
        if (modelState.stabilityFrames > 480) {
            triggerOverfit();
        }

        requestAnimationFrame(tick);
    }

    tick();
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}
