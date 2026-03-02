# 🧠 Interactive Portfolio — Convergence-Driven Kolam System

## Awwwards Submission Summary

An **interactive portfolio** that behaves like a learning system: the interface does not “open” immediately. Instead, it **converges** based on your interaction quality (calmness, precision, and stability).

**Highlights**

* **Convergence-driven UI** (state gates what becomes visible)
* **Kolam-inspired spatial constraints** (valid vs invalid snaps)
* **Stochastic → deterministic typography** (characters lock independently)
* **3D background reacts to state** via `@react-three/fiber` (no UI logic inside the scene)

**Stack**

* React + TypeScript (Create React App)
* Zustand (global model state)
* Three.js / React Three Fiber
* Framer Motion
* Interact.js

**Links**

* Live: `https://dsid271.github.io/Portfolio`

---

## Quickstart

### Prerequisites

* Node.js (LTS recommended)
* npm (ships with Node)

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

### Production build

```bash
npm run build
```

### Tests

```bash
npm test
```

### Deploy (GitHub Pages)

This repo is configured for GitHub Pages via `gh-pages`.

```bash
npm run deploy
```

Notes:

* The `homepage` is set in `package.json`.
* The deploy command uses `gh-pages -d build --remote Portfolio`.

## Overview

This project is an **experimental interactive portfolio** built with **React + TypeScript** that behaves like a learning system.
The UI does not respond instantly — it **converges** based on user intent, movement precision, and calm interaction.

---

## Dual Experience Architecture (Desktop vs Mobile)

This portfolio intentionally renders **two different UI trees** depending on pointer type:

- Desktop: interactive lab + training engine + live system HUD
- Mobile: cinematic, scroll-first portfolio with a lightweight runtime

### Device Detection

Mobile detection is **pointer-based** (not width-based):

- `src/hooks/useIsMobile.ts`
- Uses `window.matchMedia("(pointer: coarse)")`
- Reactive (listens to media query changes)

### Root Split

`src/App.tsx` renders one of:

- `src/components/desktop/DesktopExperience.tsx`
- `src/components/mobile/MobileExperience.tsx`

### Desktop Experience (unchanged interactive system)

Desktop keeps the experimental system intact:

- Training engine: `registerInteraction()` (mousemove/scroll signals)
- Passive learning loop: `startRafLoop()` (stage FSM + stabilization)
- HUD graph: `SystemMonitor`
- Onboarding overlay: `OnboardingOverlay`
- Custom cursor
- Lenis smooth scrolling with `smoothTouch: true`

### Mobile Experience (lightweight, no engine cost)

Mobile is a separate tree designed for performance:

- No `SystemMonitor`
- No onboarding overlay
- No training engine calls
- No global RAF learning loop
- Lenis uses native touch momentum (`smoothTouch: false`)

#### Three.js / KolamField Exclusion

`KolamField` (three.js + OBJ loading + canvas) is **desktop-only** and is **not imported or mounted** in the mobile tree.
This keeps three.js unreachable from the mobile component graph.

---

## Shared Content Components

Content is centralized and reused across both experiences:

- `src/components/shared/Hero.tsx`
- `src/components/shared/SelectedWork.tsx`
- `src/components/shared/About.tsx`
- `src/components/shared/Contact.tsx`

Desktop wraps these in the experimental layout.
Mobile wraps these in a clean narrative layout.

---

## Mobile Polish Notes (Performance-First)

Constraints followed throughout mobile refinement:

- No three.js
- No canvas
- No new dependencies
- No blur filters
- No heavy shadows
- No continuous scroll listeners

Implemented refinements:

- Safe-area padding via `env(safe-area-inset-*)` in `MobileLayout`
- Authored section rhythm (hero stays `100svh`, other sections use intentional padding)
- Controlled lighting system (single top-weighted atmospheric gradient)
- Hero bottom fade overlay to soften transition into content
- Selected Work card reveal tuned for subtle premium motion (opacity + small translate only)
- Constrained reading width (`max-w-[28rem]`) + left-aligned titles for slight asymmetry
- Card edges disciplined (max `rounded-2xl`, borders only, no shadows)

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

File: `src/core/modelState.ts`

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

File: `src/core/rafLoop.ts`

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

File: `src/core/interactionEngine.ts`

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

File: `src/core/kolamField.ts`

* Generates fixed anchor points in Kolam-like symmetry
* These anchors define **valid spatial states**

### Kolam Snap

File: `src/core/kolamSnap.ts`

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

File: `src/components/ProjectCard.tsx`

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
* No continuous animation

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
