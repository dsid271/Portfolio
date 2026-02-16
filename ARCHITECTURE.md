# 🌀 Kolam-Driven Adaptive Interaction System

**Technical Architecture & Behavioral Spec**

## 0. Concept Overview

This project implements a **soft-state behavioral model** that simulates *learning, stability, and convergence* through user interaction.

It is **not ML**.
It is a **deterministic + stochastic control system** inspired by:

* Training loss / confidence curves
* Human motor calmness
* Cultural Kolam constraints (grid snapping & symmetry)
* UI convergence metaphors (glitch → clarity)

The UI **converges only when the user behaves calmly and correctly**.

---

## 1. Core State Model

### `modelState.ts`

```ts
export type ModelStage =
    | "init"
    | "training"
    | "converged"
    | "unstable";

export const modelState = {
    confidence: 0,          // [0,1] belief in correctness
    loss: 1,                // [0,1] error measure
    calmness: 0,            // accumulated low-velocity frames
    stabilityFrames: 0,     // frames spent converged
    stage: "init" as ModelStage
};
```

### Semantic meaning

| Field      | Meaning                                        |
| ---------- | ---------------------------------------------- |
| confidence | rises with calm, correct interaction           |
| loss       | rises with chaotic or invalid actions          |
| calmness   | inertia metric (prevents spam convergence)     |
| stage      | UI gatekeeper (controls locking & permissions) |

---

## 2. State Transitions (Authoritative)

**DO NOT transition stages anywhere else.**

### Stage logic (derived, not arbitrary)

| Condition                    | Stage                  |
| ---------------------------- | ---------------------- |
| confidence < 0.25            | `init`                 |
| 0.25 ≤ confidence < 0.75     | `training`             |
| confidence ≥ 0.75 AND stable | `converged`            |
| chaos spike / invalid moves  | `unstable` (temporary) |

> ⚠️ `unstable` is a *transient sink* — it must decay back to `training`.

---

## 3. RAF Loop (Passive Dynamics)

### Purpose

* Applies **time-based decay**
* Rewards **idle stability**
* Smooths values so interaction alone can’t brute-force convergence

### `rafLoop.ts`

```ts
import { modelState } from "./modelState";

export const idleFrames = { value: 0 };

export function startRafLoop() {
    function tick() {
        idleFrames.value++;

        // Passive decay
        modelState.loss *= 0.995;
        modelState.confidence *= 0.998;

        // Idle reward only AFTER convergence
        if (idleFrames.value > 120 && modelState.stage === "converged") {
            modelState.loss *= 0.99;
            modelState.confidence += 0.002;
        }

        clampState();

        // Stage inference
        if (modelState.confidence < 0.25) {
            modelState.stage = "init";
        } else if (modelState.confidence < 0.75) {
            modelState.stage = "training";
        } else {
            modelState.stage = "converged";
        }

        modelState.stabilityFrames =
            modelState.stage === "converged"
                ? modelState.stabilityFrames + 1
                : 0;

        requestAnimationFrame(tick);
    }

    tick();
}

function clampState() {
    modelState.confidence = clamp(modelState.confidence, 0, 1);
    modelState.loss = clamp(modelState.loss, 0, 1);
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}
```

---

## 4. Interaction Engine (Active Dynamics)

### Purpose

* Converts **human motion** → **model feedback**
* Velocity = chaos proxy
* Invalid geometry = semantic error

### `interactionEngine.ts`

```ts
import { modelState } from "./modelState";
import { idleFrames } from "./rafLoop";

let lastX = 0;
let lastY = 0;
let lastTime = performance.now();
let smoothedVelocity = 0;
let interactionAge = 0;

export function registerInteraction() {
    window.addEventListener("mousemove", (e) => {
        idleFrames.value = 0;

        if (modelState.stage === "init" || modelState.stage === "unstable") {
            modelState.stage = "training";
            interactionAge = 0;
        }

        const now = performance.now();
        const dt = now - lastTime;
        if (dt === 0) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const velocity = Math.hypot(dx, dy) / dt;

        smoothedVelocity = smoothedVelocity * 0.85 + velocity * 0.15;

        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;

        interactionAge++;

        // Warm-up grace period
        if (interactionAge < 40) {
            modelState.confidence += 0.02;
            modelState.loss -= 0.02;
            clampState();
            return;
        }

        const CALM = 0.25;
        const CHAOTIC = 1.2;

        if (smoothedVelocity < CALM) {
            modelState.calmness++;
            modelState.confidence += 0.015;
            modelState.loss -= 0.02;
        } else if (smoothedVelocity > CHAOTIC) {
            modelState.calmness = 0;
            modelState.confidence -= 0.025;
            modelState.loss += 0.03;
        }

        clampState();
    });
}

export function penalizeInvalidKolamMove() {
    modelState.loss += 0.05;
    modelState.confidence -= 0.08;
    modelState.calmness = 0;
    modelState.stage = "unstable";
    clampState();
}

function clampState() {
    modelState.confidence = clamp(modelState.confidence, 0, 1);
    modelState.loss = clamp(modelState.loss, 0, 1);
}

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}
```

---

## 5. Kolam System (Geometric Constraint Engine)

### Purpose

The Kolam is the **truth oracle**.

* Free dragging is allowed
* Only **valid Kolam points** reinforce confidence
* Violations punish sharply

### Components

| File              | Responsibility                       |
| ----------------- | ------------------------------------ |
| `kolamField.ts`   | Generates symmetric grid anchors     |
| `kolamSnap.ts`    | Snaps motion to nearest valid anchor |
| `ProjectCard.tsx` | Applies constraints to dragging      |

### Behavior

```ts
const snap = snapToKolam(pos, desired, anchors);

if (!snap.valid) {
    penalizeInvalidKolamMove();
}
```

Invalid moves:

* Increase loss
* Break calmness
* Trigger unstable stage

---

## 6. ProjectCard (UI Gatekeeping)

### Rules

* Cards are draggable **only when converged**
* Opacity reflects learning state
* Cursor reflects permission

```tsx
opacity: modelState.stage === "converged" ? 1 : 0.25
cursor: modelState.stage === "converged" ? "grab" : "not-allowed"
```

---

## 7. Title Convergence System (Glitch → Lock)

### Critical insight

**React renders are not time-based**
Randomization must be driven by a **stable clock**.

### Final Working Implementation

* Per-letter freeze (`useRef<boolean[]>`)
* Slow interval tick (~12 FPS)
* Letters lock progressively
* Once locked → never randomize again

(See `ProjectTitle` implementation you already integrated.)

---

## 8. Why Convergence Is Hard (By Design)

You cannot brute-force convergence because:

* Confidence decays passively
* Chaos penalizes harder than calm rewards
* Kolam violations reset stability
* Idle reward only applies *after* convergence

This mirrors **real learning systems**.

---

## 9. What “Converged” Means Here

Converged does **NOT** mean:

* Zero randomness
* Zero interaction
* Absolute stillness

It means:

* Predictable
* Stable
* Resistant to noise
* Visually coherent

---

## 10. Non-Goals (Important)

This system is NOT:

* Redux
* ML training
* Physics simulation
* State machine with explicit transitions

It is:

> **A continuous behavioral field**

---

## 11. Copilot Instructions (IMPORTANT)

> Treat `modelState` as authoritative global soft-state
> Never create local mirrors of confidence/loss
> Never transition stages outside rafLoop or interactionEngine
> Randomness must always be time-gated
> Kolam validity always overrides user intent