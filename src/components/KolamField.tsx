import React, { useRef, useEffect, useState } from 'react';
import { useModelState } from '../hooks/useModelState';
import { useAppStore } from '../store/useAppStore';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {
    getSectionView,
    lerpAngle,
    PARTICLE_CONFIG,
    BRAIN_SCALE,
    BRAIN_OFFSET_Y,
    LERP_SPEED,
    MOUSE_RADIUS,
    KOLAM_RING_RADII,
} from './brainConfig';

// ─── Types ───────────────────────────────────────────────────────────

interface Particle {
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    targetX: number; targetY: number; targetZ: number;
    kolamX: number; kolamY: number; kolamZ: number;
    brainX: number; brainY: number; brainZ: number;
    radius: number;
    dist: number;
    isThinking: boolean;
}

interface Bubble {
    x: number; y: number;
    vx: number; vy: number;
    size: number;
    opacity: number;
}

// ─── Component ───────────────────────────────────────────────────────

export const KolamField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { confidence, stage } = useModelState();
    const currentSection = useAppStore(s => s.currentSection);

    const particles = useRef<Particle[]>([]);
    const bubbles = useRef<Bubble[]>([]);

    const [fullVertices, setFullVertices] = useState<{ x: number; y: number; z: number }[]>([]);
    const [modelLoaded, setModelLoaded] = useState(false);

    const viewState = useRef({
        shiftX: 0,
        shiftY: 0,
        scale: 1,
        rotY: 0,
        dispersal: 0,
        target: { tX: 0, tY: 0, tS: 1, tR: 0, tD: 0 },
    });

    // ── Platform detection (once at mount) ──────────────────────────
    const isMobile = window.innerWidth < 768;
    const cfg = isMobile ? PARTICLE_CONFIG.mobile : PARTICLE_CONFIG.desktop;

    // On mobile the kolam rings are scaled to stay within the viewport
    const ringScale = isMobile ? window.innerWidth / 800 : 1;

    const mousePos = useRef({ x: -1000, y: -1000 });

    // ── Load OBJ model ──────────────────────────────────────────────
    useEffect(() => {
        const loader = new OBJLoader();
        loader.load(process.env.PUBLIC_URL + '/BrainUVs.obj', (object) => {
            const vertices: { x: number; y: number; z: number }[] = [];
            object.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const posAttribute = (child as THREE.Mesh).geometry.attributes.position;
                    for (let i = 0; i < posAttribute.count; i++) {
                        vertices.push({
                            x: posAttribute.getX(i),
                            y: posAttribute.getY(i),
                            z: posAttribute.getZ(i),
                        });
                    }
                }
            });
            // Shuffle for visual randomness
            for (let i = vertices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [vertices[i], vertices[j]] = [vertices[j], vertices[i]];
            }
            setFullVertices(vertices);
            setModelLoaded(true);
        });
    }, []);

    // ── Initialise particles & bubbles ──────────────────────────────
    useEffect(() => {
        if (!modelLoaded || fullVertices.length === 0) return;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Bubbles (ambient background dust)
        const bb: Bubble[] = [];
        for (let i = 0; i < cfg.bubbles; i++) {
            bb.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: 0.5 + Math.random() * 1.5,
                opacity: 0.05 + Math.random() * 0.15,
            });
        }
        bubbles.current = bb;

        // Sort vertices by distance — outer shell gets priority
        const verticesWithDist = fullVertices
            .map(v => ({ ...v, dist: Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) }))
            .sort((a, b) => b.dist - a.dist);

        // Build particles
        const pts: Particle[] = [];
        for (let i = 0; i < cfg.active; i++) {
            const ringIdx = i % 3;
            const ringRadius = KOLAM_RING_RADII[ringIdx] * ringScale;
            const angle = (i / (cfg.active / 3)) * Math.PI * 2;
            const kX = width / 2 + Math.cos(angle) * ringRadius;
            const kY = height / 2 + Math.sin(angle) * ringRadius;

            // Preferential sampling: 80% from outer shell
            const vIdx = i < cfg.active * 0.8
                ? Math.floor(Math.random() * (verticesWithDist.length * 0.4))
                : Math.floor(Math.random() * verticesWithDist.length);

            const v = verticesWithDist[vIdx];
            pts.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: (Math.random() - 0.5) * 400,
                vx: 0, vy: 0, vz: 0,
                targetX: kX, targetY: kY, targetZ: 0,
                kolamX: kX, kolamY: kY, kolamZ: 0,
                brainX: width / 2 + v.z * BRAIN_SCALE,
                brainY: height / 2 - v.y * BRAIN_SCALE + BRAIN_OFFSET_Y,
                brainZ: v.x * BRAIN_SCALE,
                radius: (0.7 + Math.random() * 0.8) * (v.dist > 50 ? 1.2 : 1.0),
                dist: v.dist,
                isThinking: i < cfg.thinkingNodes,
            });
        }
        particles.current = pts;

        // Resize handler
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [modelLoaded, fullVertices, cfg.active, cfg.bubbles, cfg.thinkingNodes, ringScale]);

    // ── Section view targets ────────────────────────────────────────
    useEffect(() => {
        const view = getSectionView(currentSection, isMobile);
        viewState.current.target = {
            tX: view.shiftX,
            tY: view.shiftY,
            tS: view.scale,
            tR: view.rotation,
            tD: view.dispersal,
        };
    }, [currentSection, isMobile]);

    // ── Render loop ─────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let frameId: number;

        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            const isUnstable = stage === 'unstable';
            const isConverged = stage === 'converged';
            const morphFactor = Math.max(0, Math.min(1, (confidence - 0.55) * 3));

            // ── Interpolate view state ──────────────────────────
            const vs = viewState.current;
            const vt = vs.target;
            vs.shiftX += (vt.tX - vs.shiftX) * LERP_SPEED;
            vs.shiftY += (vt.tY - vs.shiftY) * LERP_SPEED;
            vs.scale += (vt.tS - vs.scale) * LERP_SPEED;
            vs.rotY = lerpAngle(vs.rotY, vt.tR, LERP_SPEED);
            vs.dispersal += (vt.tD - vs.dispersal) * LERP_SPEED;

            // ── Background ──────────────────────────────────────
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            const grad = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, width / 1.2,
            );
            grad.addColorStop(0, isUnstable ? 'rgba(50, 0, 0, 0.4)' : 'rgba(15, 15, 30, 0.3)');
            grad.addColorStop(1, 'black');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // ── Ambient bubbles ─────────────────────────────────
            const bb = bubbles.current;
            ctx.fillStyle = 'rgba(100, 150, 255, 1)';
            for (let i = 0; i < bb.length; i++) {
                const b = bb[i];
                b.x += b.vx; b.y += b.vy;
                if (b.x < 0) b.x = width; if (b.x > width) b.x = 0;
                if (b.y < 0) b.y = height; if (b.y > height) b.y = 0;
                ctx.globalAlpha = b.opacity;
                ctx.fillRect(b.x, b.y, b.size, b.size);
            }
            ctx.globalAlpha = 1.0;

            // ── Particles ───────────────────────────────────────
            const pts = particles.current;
            if (!pts.length) { frameId = requestAnimationFrame(render); return; }

            // Kolam-state optimisation: ease in particle count
            const currentActiveCount = Math.floor(
                cfg.minKolam + (pts.length - cfg.minKolam) * (morphFactor * morphFactor),
            );

            // Spatial grid for connection line lookups
            const maxDist = 25 + morphFactor * 10;
            const maxZDist = 12;
            const cellSize = maxDist * 1.5;
            const cols = Math.ceil(width / cellSize);
            const rows = Math.ceil(height / cellSize);
            const grid: number[][] = Array.from({ length: cols * rows }, () => []);

            // Deterministic rotation (no oscillation)
            const totalRot = vs.rotY;
            const cosR = Math.cos(totalRot);
            const sinR = Math.sin(totalRot);

            for (let i = 0; i < currentActiveCount; i++) {
                const p = pts[i];

                // ── Kolam ring position ─────────────────────────
                const ringIdx = i % 3;
                let angle = (i / (currentActiveCount / 3)) * Math.PI * 2
                    + Date.now() * 0.0004 * (ringIdx + 1) * (ringIdx % 2 === 0 ? 1 : -1);
                let ringRadius = KOLAM_RING_RADII[ringIdx] * ringScale;

                if (isUnstable) {
                    angle += Math.sin(Date.now() * 0.003 + i) * 1.5;
                    ringRadius += Math.cos(Date.now() * 0.01 + i * 0.5) * 50 * ringScale
                        + (Math.random() - 0.5) * 20;
                }

                p.kolamX = width / 2 + Math.cos(angle) * ringRadius;
                p.kolamY = height / 2 + Math.sin(angle) * ringRadius;

                // ── Brain position (rotated) ────────────────────
                const v = fullVertices[i % fullVertices.length];
                const bX = v.z * BRAIN_SCALE;
                const bY = -v.y * BRAIN_SCALE + BRAIN_OFFSET_Y;
                const bZ = v.x * BRAIN_SCALE;

                const rotX = bX * cosR - bZ * sinR;
                const rotZ = bX * sinR + bZ * cosR;

                const finalBX = (width / 2) + rotX * vs.scale + vs.shiftX;
                const finalBY = (height / 2) + bY * vs.scale + vs.shiftY;
                const finalBZ = rotZ * vs.scale;

                // Dispersal (only non-zero during unstable/specific sections)
                const dispX = vs.dispersal > 0.5 ? (Math.random() - 0.5) * vs.dispersal : 0;
                const dispY = vs.dispersal > 0.5 ? (Math.random() - 0.5) * vs.dispersal : 0;

                // Morph between kolam and brain
                p.targetX = p.kolamX * (1 - morphFactor) + (finalBX + dispX) * morphFactor;
                p.targetY = p.kolamY * (1 - morphFactor) + (finalBY + dispY) * morphFactor;
                p.targetZ = p.kolamZ * (1 - morphFactor) + finalBZ * morphFactor;

                // Spring physics
                const spring = isUnstable ? 0.005 : (morphFactor > 0.8 ? 0.04 : 0.015);
                p.vx += (p.targetX - p.x) * spring;
                p.vy += (p.targetY - p.y) * spring;
                p.vz += (p.targetZ - p.z) * spring;

                const damping = 0.88;
                p.vx *= damping; p.vy *= damping; p.vz *= damping;

                // Chaos only in unstable state
                if (isUnstable) {
                    p.vx += (Math.random() - 0.5) * 6;
                    p.vy += (Math.random() - 0.5) * 6;
                    p.vz += (Math.random() - 0.5) * 6;
                }

                // Mouse repulsion (desktop only)
                if (!isMobile) {
                    const mDx = p.x - mousePos.current.x;
                    const mDy = p.y - mousePos.current.y;
                    const mDSq = mDx * mDx + mDy * mDy;
                    if (mDSq < MOUSE_RADIUS * MOUSE_RADIUS) {
                        const f = (MOUSE_RADIUS - Math.sqrt(mDSq)) / MOUSE_RADIUS;
                        p.vx += mDx * f * 0.05;
                        p.vy += mDy * f * 0.05;
                    }
                }

                p.x += p.vx; p.y += p.vy; p.z += p.vz;

                // Build spatial grid for connection lookups
                const gx = Math.floor(p.x / cellSize);
                const gy = Math.floor(p.y / cellSize);
                if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
                    grid[gy * cols + gx].push(i);
                }
            }

            // ── Background vertex mask (desktop only) ───────────
            if (cfg.bgMask > 0) {
                const bgThreshold = 0.85;
                if (morphFactor > bgThreshold) {
                    const normalizedFactor = (morphFactor - bgThreshold) / (1 - bgThreshold);
                    const easedAlpha = normalizedFactor * normalizedFactor * (3 - 2 * normalizedFactor);

                    for (let i = 0; i < cfg.bgMask; i++) {
                        const v = fullVertices[i];
                        const bX = v.z * BRAIN_SCALE;
                        const bY = -v.y * BRAIN_SCALE + BRAIN_OFFSET_Y;
                        const bZ = v.x * BRAIN_SCALE;
                        const maskRotX = bX * cosR - bZ * sinR;
                        const maskRotZ = bX * sinR + bZ * cosR;

                        // Depth culling: skip back-facing vertices
                        if (maskRotZ > 0) continue;

                        // Depth-based alpha
                        const depthAlpha = Math.min(1, (-maskRotZ) / 200);
                        ctx.fillStyle = '#60a5fa';
                        ctx.globalAlpha = easedAlpha * 0.25 * (0.3 + 0.7 * depthAlpha);
                        ctx.fillRect(
                            width / 2 + maskRotX * vs.scale + vs.shiftX,
                            height / 2 + bY * vs.scale + vs.shiftY,
                            1, 1,
                        );
                    }
                    ctx.globalAlpha = 1.0;
                }
            }

            // ── Connection lines + neuron pulses ────────────────
            ctx.lineWidth = 0.55;
            for (let i = 0; i < currentActiveCount; i++) {
                const p = pts[i];
                const gx = Math.floor(p.x / cellSize);
                const gy = Math.floor(p.y / cellSize);

                const isOuter = p.dist > 45;
                const maxConns = isOuter ? 15 : 4;
                const adaptiveMaxDist = isOuter ? maxDist * 1.65 : maxDist;
                const activeMaxZ = isOuter ? maxZDist * 0.8 : maxZDist;

                let conns = 0;
                for (let nx = gx - 1; nx <= gx + 1; nx++) {
                    for (let ny = gy - 1; ny <= gy + 1; ny++) {
                        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                            for (const nIdx of grid[ny * cols + nx]) {
                                if (nIdx <= i || conns >= maxConns) continue;
                                const p2 = pts[nIdx];
                                if (Math.abs(p.z - p2.z) > activeMaxZ) continue;
                                const dx = p.x - p2.x, dy = p.y - p2.y, dSq = dx * dx + dy * dy;

                                if (dSq < adaptiveMaxDist * adaptiveMaxDist) {
                                    const distRatio = Math.sqrt(dSq) / adaptiveMaxDist;
                                    const alph = (1 - distRatio) * (0.04 + morphFactor * 0.7);

                                    ctx.beginPath();
                                    ctx.moveTo(p.x, p.y);
                                    ctx.lineTo(p2.x, p2.y);
                                    ctx.lineWidth = isOuter ? 0.35 : 0.45;

                                    if (isUnstable) {
                                        ctx.strokeStyle = `rgba(255, 60, 60, ${alph})`;
                                    } else if (isConverged) {
                                        ctx.strokeStyle = `rgba(90, 180, 255, ${alph})`;
                                    } else {
                                        ctx.strokeStyle = `rgba(255, 255, 255, ${alph * 0.6})`;
                                    }
                                    ctx.stroke();

                                    // Neuron data pulses
                                    const signalFreq = isOuter ? 128 : 1024;
                                    if (isConverged && (i + nIdx) % signalFreq === 0) {
                                        ctx.save();
                                        const speed = 0.0015;
                                        const progress = (Date.now() * speed + (i * 0.1)) % 1;

                                        const sX = p.x + (p2.x - p.x) * progress;
                                        const sY = p.y + (p2.y - p.y) * progress;
                                        const trailLen = 0.18;
                                        const tX = p.x + (p2.x - p.x) * Math.max(0, progress - trailLen);
                                        const tY = p.y + (p2.y - p.y) * Math.max(0, progress - trailLen);

                                        ctx.globalCompositeOperation = 'lighter';

                                        ctx.beginPath();
                                        ctx.moveTo(tX, tY);
                                        ctx.lineTo(sX, sY);
                                        ctx.lineWidth = 2.8;
                                        ctx.strokeStyle = `rgba(60, 130, 240, ${alph * 0.6})`;
                                        ctx.stroke();

                                        ctx.beginPath();
                                        ctx.moveTo(tX, tY);
                                        ctx.lineTo(sX, sY);
                                        ctx.lineWidth = 1.0;
                                        ctx.strokeStyle = `rgba(255, 255, 255, ${alph * 1.8})`;
                                        ctx.stroke();

                                        ctx.restore();
                                    }

                                    conns++;
                                    ctx.lineWidth = 0.55;
                                }
                            }
                        }
                    }
                }
            }

            // ── Particle dots ───────────────────────────────────
            for (let i = 0; i < currentActiveCount; i++) {
                const p = pts[i];
                const thk = p.isThinking && isConverged
                    ? (Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5)
                    : 0;
                const sz = p.radius * (isUnstable ? 1.8 : 0.8) * (1 + thk * 2.5);

                ctx.beginPath();
                ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);

                if (thk > 0.4) {
                    ctx.fillStyle = '#fff';
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#60a5fa';
                } else if (isUnstable) {
                    ctx.fillStyle = '#ff4444';
                    ctx.shadowBlur = 0;
                } else {
                    ctx.fillStyle = isConverged
                        ? '#60a5fa'
                        : `rgba(220, 220, 220, ${0.4 + morphFactor * 0.4})`;
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            }

            frameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(frameId);
    }, [confidence, stage, modelLoaded, fullVertices, currentSection, isMobile, ringScale, cfg.bgMask, cfg.minKolam]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                background: 'black',
            }}
        />
    );
};
