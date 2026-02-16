import { useRef, useEffect, useState } from "react";
import { Project } from "../core/projects";
import { useModelState } from "../hooks/useModelState";
import { generateKolamPoints } from "../core/kolamField";
import { penalizeInvalidKolamMove } from "../core/interactionEngine";
import { snapToKolam } from "../core/kolamSnap";

const anchors = generateKolamPoints(4);

export default function ProjectCard({ project }: { project: Project }) {
    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const state = useModelState();

    // Physics state
    const pos = useRef(project.anchor);
    const vel = useRef({ x: 0, y: 0 });
    const targetPos = useRef(project.anchor);
    const [displayPos, setDisplayPos] = useState(project.anchor);

    const isDraggingRef = useRef(false);
    const mouseOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let frame: number;

        const tick = () => {
            if (!isDraggingRef.current) {
                // Spring physics: F = -k*x - d*v
                const k = 0.15; // Normalized stiffness
                const d = 0.65; // Low multiplier = HIGH damping (stops wiggle)

                const dx = pos.current.x - targetPos.current.x;
                const dy = pos.current.y - targetPos.current.y;

                const ax = -k * dx;
                const ay = -k * dy;

                vel.current.x = (vel.current.x + ax) * d;
                vel.current.y = (vel.current.y + ay) * d;

                pos.current.x += vel.current.x;
                pos.current.y += vel.current.y;

                setDisplayPos({ ...pos.current });
            }
            frame = requestAnimationFrame(tick);
        };

        tick();
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el || state.stage !== "converged") return;

        const onMouseDown = (e: MouseEvent) => {
            isDraggingRef.current = true;
            setDragging(true);
            const rect = el.getBoundingClientRect();
            mouseOffset.current = {
                x: e.clientX - rect.left - rect.width / 2,
                y: e.clientY - rect.top - rect.height / 2
            };
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;

            const parentRect = el.parentElement?.getBoundingClientRect();
            if (!parentRect) return;

            // Raw follow
            const desiredX = e.clientX - parentRect.left - parentRect.width / 2 - mouseOffset.current.x;
            const desiredY = e.clientY - parentRect.top - parentRect.height / 2 - mouseOffset.current.y;

            pos.current = { x: desiredX, y: desiredY };
            setDisplayPos({ x: desiredX, y: desiredY });

            // Update snap target
            const snap = snapToKolam(targetPos.current, pos.current, anchors);
            targetPos.current = snap.point;

            if (!snap.valid) penalizeInvalidKolamMove();
        };

        const onMouseUp = () => {
            isDraggingRef.current = false;
            setDragging(false);
        };

        el.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            el.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        };
    }, [state.stage]);

    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${displayPos.x}px), calc(-50% + ${displayPos.y}px))`,
                padding: "16px 20px",
                border: "1px solid rgba(255,255,255,0.15)",
                opacity: state.stage === "converged" ? 1 : 0.25,
                cursor: state.stage === "converged" ? (dragging ? "grabbing" : "grab") : "not-allowed",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(10px)",
                zIndex: dragging ? 100 : 1,
                userSelect: "none",
                transition: "opacity 0.4s"
            }}
        >
            <ProjectTitle title={project.title} />
            <ProjectDescription text={project.description} />
        </div>
    );
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ProjectTitle({ title }: { title: string }) {
    const frozen = useRef<boolean[]>([]);
    const [, forceRender] = useState(0);
    const state = useModelState();

    const isLocked =
        state.stage === "converged" ||
        state.confidence > 0.92;

    // Stable frame clock
    useEffect(() => {
        if (isLocked) return;

        const id = setInterval(() => {
            forceRender(v => v + 1);
        }, 150); // Balanced for stability

        return () => clearInterval(id);
    }, [isLocked]);

    return (
        <div style={{ minHeight: '1.2em', willChange: 'transform' }}>
            <h2 style={{ fontSize: "0.9rem", letterSpacing: "0.15em", margin: 0 }}>
                {title.split("").map((c, i) => {
                    if (c === " ") return " ";

                    const isFlickering = Math.random() < 0.05 * (1 - state.confidence);

                    if (isLocked && !isFlickering) {
                        frozen.current[i] = true;
                        return c;
                    }

                    if (frozen.current[i] && !isFlickering) return c;

                    const threshold = Math.min(
                        1,
                        Math.max(0, (state.confidence - 0.4) * 2.5 - i * 0.03)
                    );

                    const correct = Math.random() < threshold;

                    if (correct && !isFlickering) frozen.current[i] = true;

                    return (correct && !isFlickering)
                        ? c
                        : CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")}
            </h2>
        </div>
    );
}

function ProjectDescription({ text }: { text: string }) {
    const state = useModelState();
    if (state.confidence < 0.85) return null;

    return (
        <p style={{ marginTop: "8px", fontSize: "0.75rem", opacity: 0.7 }}>
            {text}
        </p>
    );
}
