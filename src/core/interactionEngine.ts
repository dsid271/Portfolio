import { modelState, notify } from "./modelState";
import { idleFrames } from "./rafLoop";

let lastX = 0;
let lastY = 0;
let lastTime = performance.now();
let smoothedVelocity = 0;
let interactionAge = 0;

export function registerInteraction() {
    window.addEventListener("mousemove", (e) => {
        /* ------------------------------
           Init → Training
        ------------------------------ */
        if (modelState.stage === "init") {
            modelState.stage = "training";
        }

        /* ------------------------------
           Unstable → Retraining
        ------------------------------ */
        if (modelState.stage === "unstable") {
            interactionAge = 0;
            smoothedVelocity = 0;
            modelState.stage = "training";
        }

        /* ------------------------------
           Reset idle counter
        ------------------------------ */
        idleFrames.value = 0;

        const now = performance.now();

        /* ------------------------------
           First interaction guard
        ------------------------------ */
        if (interactionAge === 0) {
            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = now;
            interactionAge++;
            return;
        }

        const dt = now - lastTime;
        if (dt <= 0) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.hypot(dx, dy);
        const velocity = distance / dt;

        smoothedVelocity = smoothedVelocity * 0.85 + velocity * 0.15;

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;

        interactionAge++;

        /* ------------------------------
           Warm-up grace period
        ------------------------------ */
        if (interactionAge < 40) {
            modelState.confidence += 0.005; // 4x slower warm-up
            modelState.loss -= 0.005;
            clampState();
            notify();
            return;
        }

        /* ------------------------------
           Velocity bands
        ------------------------------ */
        const CALM = 0.45;
        const CHAOTIC = 1.5;

        if (smoothedVelocity < CALM) {
            modelState.calmness += 1;
            modelState.confidence += 0.006; // Much slower gain
            modelState.loss -= 0.008;
        } else if (smoothedVelocity > CHAOTIC) {
            modelState.calmness = 0;
            modelState.confidence -= 0.025;
            modelState.loss += 0.03;
        }

        notify();
        clampState();
    });

    /* ------------------------------
       SCROLL = CALM ACTIVITY
       Scrolling helps converge the model (like slow mouse),
       but prevents overfit while user is exploring.
    ------------------------------ */
    let lastScrollTime = 0;
    window.addEventListener("scroll", () => {
        const now = performance.now();

        // Throttle to ~30fps
        if (now - lastScrollTime < 33) return;
        lastScrollTime = now;

        // Reset idle counter - scrolling = activity
        idleFrames.value = 0;

        // Cap stability frames to prevent overfit while scrolling
        // (allows convergence but not the final explosion)
        modelState.stabilityFrames = Math.min(modelState.stabilityFrames, 400);

        // Init → Training
        if (modelState.stage === "init") {
            modelState.stage = "training";
        }

        // Unstable → back to training
        if (modelState.stage === "unstable") {
            modelState.stage = "training";
        }

        // Scrolling = calm activity, HELPS convergence (always)
        modelState.confidence += 0.004;
        modelState.loss -= 0.003;
        modelState.calmness += 1;

        clampState();
        notify();
    }, { passive: true });
}

function clampState() {
    modelState.confidence = clamp(modelState.confidence, 0, 1);
    modelState.loss = clamp(modelState.loss, 0, 1);
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

/* ------------------------------
   Discrete penalty (Kolam errors)
------------------------------ */
export function penalizeInvalidKolamMove() {
    modelState.loss += 0.05;
    modelState.confidence -= 0.08;
    modelState.calmness = 0;

    modelState.loss = clamp(modelState.loss, 0, 1);
    modelState.confidence = clamp(modelState.confidence, 0, 1);
    notify();
}
