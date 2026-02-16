# 🧠 Interactive Portfolio — Convergence-Driven Kolam System

## Overview

This project is an **experimental interactive portfolio** built with **React + TypeScript** that behaves like a learning system.
The UI does not respond instantly — it **converges** based on user intent, movement precision, and calm interaction.

The core idea:

> *The interface “learns” the user before revealing itself.*

The system uses:

* A **global model state** (confidence, loss, calmness, stage)
* **Mouse velocity analysis**
* **Kolam-inspired spatial snapping**
* **Progressive UI revelation**
* **Stochastic → deterministic transitions**

This is **not a typical portfolio** — it is a state-driven experience.

---

## Core Concepts

### 1. Model State (Global Brain)

File: `core/modelState.ts`

```ts
export type ModelStage = "init" | "training" | "converged" | "unstable";

export const modelState = {
    confidence: 0,        // 0 → 1
    loss: 1,              // 1 → 0
    calmness: 0,          // increases with slow motion
    stabilityFrames: 0,   // frames spent converged
    stage: "init" as ModelStage
};
```

**Meaning**

* `confidence`: how much the system trusts the user
* `loss`: how chaotic / error-prone interaction is
* `calmness`: accumulated slow, deliberate motion
* `stage`: macro behavior gate

---

## 2. RAF Loop (Passive Learning & Stabilization)

File: `core/rafLoop.ts`

Purpose:

* Slowly stabilizes the system over time
* Handles **stage transitions**
* Rewards **idle calmness**
* Prevents instant convergence

Key behaviors:

* Loss decays slowly every frame
* Confidence grows only when stable
* Convergence requires sustained confidence
* Idle time after convergence reinforces lock-in

The RAF loop **never handles interaction directly** — it only observes state.

---

## 3. Interaction Engine (Active Learning)

File: `core/interactionEngine.ts`

Purpose:

* Translates mouse motion into learning signals
* Resets idle counter
* Penalizes chaotic or invalid interaction
* Gradually transitions `init → training → converged`

### Mechanics

* Mouse velocity is smoothed (EMA)
* Very fast movement increases loss
* Slow movement increases calmness & confidence
* A warm-up grace period prevents early punishment
* Invalid Kolam snaps explicitly penalize state

```ts
export function penalizeInvalidKolamMove() {
    modelState.loss += 0.05;
    modelState.confidence -= 0.08;
    modelState.calmness = 0;
}
```

This ensures **precision matters**.

---

## 4. Kolam System (Spatial Constraint Engine)

### Kolam Field

File: `core/kolamField.ts`

* Generates fixed anchor points in Kolam-like symmetry
* These anchors define **valid spatial states**

### Kolam Snap

File: `core/kolamSnap.ts`

* Given current position + desired drag
* Finds nearest valid anchor
* Returns `{ point, valid }`

Invalid snaps:

* Still move visually
* But penalize the model

This creates a **tactile learning loop**:

> You learn where the system wants you to go.

---

## 5. Project Cards (Post-Convergence Interaction)

File: `components/ProjectCard.tsx`

Rules:

* Cards are **not draggable until converged**
* Opacity reflects model confidence
* Dragging outside Kolam logic reduces trust
* Cards reinforce spatial discipline

This ensures:

* Projects feel *earned*, not dumped on screen
* Early users aren’t overwhelmed

---

## 6. Glitch Typography (Stochastic → Deterministic)

### Problem Solved

Random characters felt unstable and never “finished”.

### Solution

Each character **freezes independently** once correct.

Key ideas:

* `useRef<boolean[]>` stores per-character lock state
* Characters never regress once frozen
* A **slow internal render clock** (interval) is used
* Locking is monotonic and perceivable

Result:

* Letters stabilize one by one
* The title “locks” decisively
* The user feels convergence

This logic lives inside `ProjectTitle`.

---

## 7. UI Phases (Critical for Immersion)

### Phase 0 — Orientation (NEW, REQUIRED)

Visible on load:

* Instructional text:

  > “Move slowly.”
  > *Precision reveals structure.*
* No projects
* No glitching
* Background barely visible

Purpose:

* Removes confusion
* Frames the experience
* Sets expectations

---

### Phase 1 — Training

* Project **labels only** (no cards)
* Text begins glitching
* Background shows faint motion
* User experiments and learns pacing

---

### Phase 2 — Converged

* Full project cards appear
* Dragging enabled
* Typography locks
* Background becomes still

---

### Phase 3 — Post-Convergence

* About section fades in
* Contact appears after first valid Kolam interaction
* Everything feels intentional and calm

⚠️ **No traditional navbar**
Navigation is earned, not clicked.

---

## 8. Three.js Background (Design Spec)

### Why Three.js

* Anime.js is for UI micro-tweens
* Three.js supports **spatial meaning**

### What NOT to do

* No fast particles
* No camera movement
* No noise shaders
* Noo continuous animation

### Recommended Background

**Kolam-Inspired Wireframe Lattice**

* Static grid of points + lines
* Very slow opacity breathing
* Jitter only when `stage === "unstable"`
* Nearly frozen when `converged`

### State Mapping

| Model State | Background Behavior |
| ----------- | ------------------- |
| init        | almost invisible    |
| training    | subtle motion       |
| unstable    | distortion/jitter   |
| converged   | crisp, static       |

### Technical Rules

* Three.js canvas is:

  * `position: fixed`
  * `pointer-events: none`
  * rendered **behind React**
* Reads from `modelState`
* Owns **no logic**

---

## 9. Why This Works

This system:

* Rewards patience
* Penalizes chaos
* Teaches through feedback
* Builds narrative without text walls

It is:

* A portfolio
* A systems demo
* A metaphor for ML training
* A personality signal

---

## 10. Next Implementation Order (Important)

1. Add **Orientation Phase UI**
2. Gate project visibility by `modelState.stage`
3. Implement Three.js Kolam lattice (minimal)
4. Add About & Contact as **state-based reveals**
5. Polish copy (very minimal, calm)

---

## Final Note

This project is **not unfinished** —
it is **missing the on-ramp**, not the engine.

Everything difficult is already solved.
