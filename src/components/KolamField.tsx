import React, { useRef, useEffect, useState } from 'react';
import { useModelState } from '../hooks/useModelState';
import { useAppStore } from '../store/useAppStore';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

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

export const KolamField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { confidence, stage } = useModelState();
    const currentSection = useAppStore(s => s.currentSection);

    const particles = useRef<Particle[]>([]);
    const bubbles = useRef<Bubble[]>([]);

    const [fullVertices, setFullVertices] = useState<{ x: number, y: number, z: number }[]>([]);
    const [modelLoaded, setModelLoaded] = useState(false);

    const viewState = useRef({
        shiftX: 0,
        shiftY: 0,
        scale: 1,
        rotY: 0,
        dispersal: 0,
        target: { tX: 0, tY: 0, tS: 1, tR: 0, tD: 0 }
    });

    const numActiveParticles = 3050;
    const numThinkingNodes = 10;
    const numCanvasBubbles = 1500;

    const mousePos = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const loader = new OBJLoader();
        loader.load(process.env.PUBLIC_URL + '/BrainUVs.obj', (object) => {
            let vertices: { x: number, y: number, z: number }[] = [];
            object.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const geometry = (child as THREE.Mesh).geometry;
                    const posAttribute = geometry.attributes.position;
                    for (let i = 0; i < posAttribute.count; i++) {
                        vertices.push({
                            x: posAttribute.getX(i),
                            y: posAttribute.getY(i),
                            z: posAttribute.getZ(i)
                        });
                    }
                }
            });
            for (let i = vertices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [vertices[i], vertices[j]] = [vertices[j], vertices[i]];
            }
            setFullVertices(vertices);
            setModelLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (!modelLoaded || fullVertices.length === 0) return;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const bb: Bubble[] = [];
        for (let i = 0; i < numCanvasBubbles; i++) {
            bb.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: 0.5 + Math.random() * 1.5,
                opacity: 0.05 + Math.random() * 0.15
            });
        }
        bubbles.current = bb;

        // Preferential Sampling: Sort vertices by distance to favor the outer shell
        const verticesWithDist = fullVertices.map(v => ({
            ...v,
            dist: Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
        })).sort((a, b) => b.dist - a.dist); // Sort descending (outer first)

        const pts: Particle[] = [];
        for (let i = 0; i < numActiveParticles; i++) {
            const ringIdx = i % 3;
            const ringRadius = 150 + ringIdx * 80;
            const angle = (i / (numActiveParticles / 3)) * Math.PI * 2;
            const kX = width / 2 + Math.cos(angle) * ringRadius;
            const kY = height / 2 + Math.sin(angle) * ringRadius;

            // Bias: Use mostly outer vertices for the first 80% of particles
            let vIdx;
            if (i < numActiveParticles * 0.8) {
                vIdx = Math.floor(Math.random() * (verticesWithDist.length * 0.4));
            } else {
                vIdx = Math.floor(Math.random() * verticesWithDist.length);
            }

            const v = verticesWithDist[vIdx];
            const scale = 2.5;
            pts.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: (Math.random() - 0.5) * 400,
                vx: 0, vy: 0, vz: 0,
                targetX: kX, targetY: kY, targetZ: 0,
                kolamX: kX, kolamY: kY, kolamZ: 0,
                brainX: width / 2 + v.z * scale,
                brainY: height / 2 - v.y * scale + 50,
                brainZ: v.x * scale,
                radius: (0.7 + Math.random() * 0.8) * (v.dist > 50 ? 1.2 : 1.0),
                dist: v.dist,
                isThinking: i < numThinkingNodes,
            });
        }
        particles.current = pts;

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        const handleMouseMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [modelLoaded, fullVertices]);

    useEffect(() => {
        let tX = 0, tY = 0, tS = 1, tR = 0, tD = 0;
        switch (currentSection) {
            case 0: tX = 0; tY = 0; tS = 1.0; tR = 0; break;
            case 1: tX = -150; tY = -50; tS = 1.4; tR = 0.5; break;
            case 2: tX = 200; tY = 0; tS = 1.2; tR = 1.5; break;
            case 3: tX = 0; tY = 100; tS = 0.9; tR = 2.5; tD = 50; break;
            case 4: tX = 0; tY = 0; tS = 1.6; tR = 3.5; break;
            case 5: tX = 0; tY = 0; tS = 0.5; tR = 4.0; break;
        }
        viewState.current.target = { tX, tY, tS, tR, tD };
    }, [currentSection]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let frameId: number;
        const render = () => {
            const width = canvas.width;
            const height = canvas.height;
            const isUnstable = (stage === 'unstable');
            const isConverged = (stage === 'converged');
            const morphFactor = Math.max(0, Math.min(1, (confidence - 0.55) * 3));

            const vs = viewState.current;
            const vt = vs.target;
            const lerpVal = 0.08;
            vs.shiftX += (vt.tX - vs.shiftX) * lerpVal;
            vs.shiftY += (vt.tY - vs.shiftY) * lerpVal;
            vs.scale += (vt.tS - vs.scale) * lerpVal;
            vs.rotY += (vt.tR - vs.rotY) * lerpVal;
            vs.dispersal += (vt.tD - vs.dispersal) * lerpVal;

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 1.2);
            grad.addColorStop(0, isUnstable ? 'rgba(50, 0, 0, 0.4)' : 'rgba(15, 15, 30, 0.3)');
            grad.addColorStop(1, 'black');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            const bb = bubbles.current;
            ctx.fillStyle = 'rgba(100, 150, 255, 1)';
            for (let b of bb) {
                b.x += b.vx; b.y += b.vy;
                if (b.x < 0) b.x = width; if (b.x > width) b.x = 0;
                if (b.y < 0) b.y = height; if (b.y > height) b.y = 0;
                ctx.globalAlpha = b.opacity;
                ctx.fillRect(b.x, b.y, b.size, b.size);
            }
            ctx.globalAlpha = 1.0;

            const pts = particles.current;
            if (!pts.length) { frameId = requestAnimationFrame(render); return; }

            const maxDist = 25 + morphFactor * 10;
            const maxZDist = 12;
            const cellSize = maxDist * 1.5;
            const cols = Math.ceil(width / cellSize);
            const rows = Math.ceil(height / cellSize);
            const grid: number[][] = Array.from({ length: cols * rows }, () => []);

            // SHARED OSCILLATION for both layers
            const osc = Math.sin(Date.now() * 0.0006) * 0.12;
            const brainScale = 2.5;
            const offY = 50;

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                const ringIdx = i % 3;
                let angle = (i / (pts.length / 3)) * Math.PI * 2 + Date.now() * 0.0004 * (ringIdx + 1) * (ringIdx % 2 === 0 ? 1 : -1);
                let ringRadius = 150 + ringIdx * 80;
                if (isUnstable) {
                    angle += Math.sin(Date.now() * 0.003 + i) * 1.5;
                    ringRadius += Math.cos(Date.now() * 0.01 + i * 0.5) * 50 + (Math.random() - 0.5) * 20;
                }
                p.kolamX = width / 2 + Math.cos(angle) * ringRadius;
                p.kolamY = height / 2 + Math.sin(angle) * ringRadius;

                // Recalculate brain position with matching scale
                const v = fullVertices[i % fullVertices.length];
                const bX = v.z * brainScale;
                const bY = -v.y * brainScale + offY;
                const bZ = v.x * brainScale;

                // Apply oscillation + viewState rotation
                const totalRot = osc + vs.rotY;
                const cosR = Math.cos(totalRot), sinR = Math.sin(totalRot);
                const rotX = bX * cosR - bZ * sinR;
                const rotZ = bX * sinR + bZ * cosR;

                const finalBX = (width / 2) + rotX * vs.scale + vs.shiftX;
                const finalBY = (height / 2) + bY * vs.scale + vs.shiftY;
                const finalBZ = rotZ * vs.scale;

                const dispX = (Math.random() - 0.5) * vs.dispersal, dispY = (Math.random() - 0.5) * vs.dispersal;
                p.targetX = p.kolamX * (1 - morphFactor) + (finalBX + dispX) * morphFactor;
                p.targetY = p.kolamY * (1 - morphFactor) + (finalBY + dispY) * morphFactor;
                p.targetZ = p.kolamZ * (1 - morphFactor) + finalBZ * morphFactor;

                const spring = isUnstable ? 0.005 : (morphFactor > 0.8 ? 0.04 : 0.015);
                p.vx += (p.targetX - p.x) * spring; p.vy += (p.targetY - p.y) * spring; p.vz += (p.targetZ - p.z) * spring;
                p.vx *= 0.88; p.vy *= 0.88; p.vz *= 0.88;

                if (isUnstable) { p.vx += (Math.random() - 0.5) * 6; p.vy += (Math.random() - 0.5) * 6; p.vz += (Math.random() - 0.5) * 6; }
                const mDx = p.x - mousePos.current.x, mDy = p.y - mousePos.current.y, mDSq = mDx * mDx + mDy * mDy;
                if (mDSq < 120 * 120) { const f = (120 - Math.sqrt(mDSq)) / 120; p.vx += mDx * f * 0.05; p.vy += mDy * f * 0.05; }

                p.x += p.vx; p.y += p.vy; p.z += p.vz;
                const gx = Math.floor(p.x / cellSize), gy = Math.floor(p.y / cellSize);
                if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) grid[gy * cols + gx].push(i);
            }

            // BACKGROUND VERTEX MASK (faint cloud behind main particles)
            // Only appears during final lock-in stage (0.85 -> 1.0)
            const bgThreshold = 0.85;
            if (morphFactor > bgThreshold) {
                // Ease-in-out curve for "Video Editing" style smoothness
                const normalizedFactor = (morphFactor - bgThreshold) / (1 - bgThreshold);
                const easedAlpha = normalizedFactor * normalizedFactor * (3 - 2 * normalizedFactor);

                ctx.fillStyle = '#60a5fa';
                ctx.globalAlpha = easedAlpha * 0.25;
                const cosR = Math.cos(osc + vs.rotY), sinR = Math.sin(osc + vs.rotY);
                for (let i = 0; i < 30000; i++) {
                    const v = fullVertices[i];
                    const bX = v.z * brainScale;
                    const bY = -v.y * brainScale + offY;
                    const bZ = v.x * brainScale;
                    const rotX = bX * cosR - bZ * sinR;
                    ctx.fillRect(
                        width / 2 + rotX * vs.scale + vs.shiftX,
                        height / 2 + bY * vs.scale + vs.shiftY,
                        1, 1
                    );
                }
                ctx.globalAlpha = 1.0;
            }

            ctx.lineWidth = 0.55;
            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                const gx = Math.floor(p.x / cellSize), gy = Math.floor(p.y / cellSize);

                // Adaptive connectivity: Outer brain (cerebrum/cerebellum) gets more edges
                const isOuter = p.dist > 45;
                const maxConns = isOuter ? 15 : 4;
                const adaptiveMaxDist = isOuter ? maxDist * 1.65 : maxDist;
                const activeMaxZ = isOuter ? maxZDist * 0.8 : maxZDist; // Tighter Z-limit for outer shell to follow surface

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

                                    // Base connection line (consistent and thin)
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

                                    // NEURON DATA PULSES (Traveling Signals)
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

                                        // Additive blending for bloom
                                        ctx.globalCompositeOperation = 'lighter';

                                        // 1. Soft Glow (Outer Layer)
                                        ctx.beginPath();
                                        ctx.moveTo(tX, tY);
                                        ctx.lineTo(sX, sY);
                                        ctx.lineWidth = 2.8;
                                        ctx.strokeStyle = `rgba(60, 130, 240, ${alph * 0.6})`;
                                        ctx.stroke();

                                        // 2. High-Intensity Core (Inner Layer)
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

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                const thk = p.isThinking && isConverged ? (Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5) : 0;
                const sz = p.radius * (isUnstable ? 1.8 : 0.8) * (1 + thk * 2.5);
                ctx.beginPath(); ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
                if (thk > 0.4) { ctx.fillStyle = '#fff'; ctx.shadowBlur = 15; ctx.shadowColor = '#60a5fa'; }
                else if (isUnstable) { ctx.fillStyle = '#ff4444'; ctx.shadowBlur = 0; }
                else { ctx.fillStyle = isConverged ? '#60a5fa' : `rgba(220, 220, 220, ${0.4 + morphFactor * 0.4})`; ctx.shadowBlur = 0; }
                ctx.fill();
            }
            frameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(frameId);
    }, [confidence, stage, modelLoaded, fullVertices, currentSection]);

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'black' }} />;
};
