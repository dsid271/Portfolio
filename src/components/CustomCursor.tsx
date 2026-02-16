import React, { useEffect, useRef, useState } from 'react';
import { useModelState } from '../hooks/useModelState';

export const CustomCursor: React.FC = () => {
    const state = useModelState();
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 }); // Smoothed for ring
    const trailPos = useRef({ x: 0, y: 0 }); // Lagged for trail
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Basic "hover" detection for interactive elements
            const target = e.target as HTMLElement;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'grab' ||
                window.getComputedStyle(target).cursor === 'grabbing' ||
                target.tagName === 'A' || target.tagName === 'BUTTON';
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', moveMouse);

        const tick = () => {
            // Smoothly move the ring towards the mouse
            const ringLerp = 0.15;
            const dx = mousePos.current.x - ringPos.current.x;
            const dy = mousePos.current.y - ringPos.current.y;

            // Only update if there's meaningful movement to save CPU
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                ringPos.current.x += dx * ringLerp;
                ringPos.current.y += dy * ringLerp;

                const trailLerp = 0.08;
                trailPos.current.x += (ringPos.current.x - trailPos.current.x) * trailLerp;
                trailPos.current.y += (ringPos.current.y - trailPos.current.y) * trailLerp;

                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
                }
                if (ringRef.current) {
                    const trailEl = ringRef.current.nextSibling as HTMLElement;
                    ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${isHovering ? 2 : 1})`;
                    if (trailEl) {
                        trailEl.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) scale(${isHovering ? 4 : 1.5})`;
                        const targetOpacity = (0.1 + (isHovering ? 0.3 : 0)).toString();
                        if (trailEl.style.opacity !== targetOpacity) {
                            trailEl.style.opacity = targetOpacity;
                        }
                    }
                }
            }

            frameId = requestAnimationFrame(tick);
        };
        let frameId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            cancelAnimationFrame(frameId);
        };
    }, [isHovering]);

    const getColor = () => {
        if (state.stage === 'unstable') return '#ff4444';
        if (state.stage === 'converged') return '#4ade80';
        return '#ffffff';
    };

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: -4,
                    left: -4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: getColor(),
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transition: 'background-color 0.3s'
                }}
            />
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: -20,
                    left: -20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `1px solid ${getColor()}`,
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: 0.4,
                    transition: 'border-color 0.3s, transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
            />
            {/* The Lagging Trail */}
            <div
                style={{
                    position: 'fixed',
                    top: -20,
                    left: -20,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: getColor(),
                    pointerEvents: 'none',
                    zIndex: 9997,
                    opacity: 0.1,
                    filter: 'blur(20px)',
                    transition: 'background-color 0.5s, transform 0.1s'
                }}
            />
        </>
    );
};
