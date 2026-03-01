import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
    const ringRef = useRef<HTMLDivElement>(null);

    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 }); // Smoothed for ring
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Basic "hover" detection for interactive elements
            const target = e.target as HTMLElement;
            const el = target.closest('a,button,[role="button"],input,textarea,select');
            const styleCursor = window.getComputedStyle(target).cursor;
            const isClickable = Boolean(el) || styleCursor === 'pointer' || styleCursor === 'grab' || styleCursor === 'grabbing';
            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', moveMouse);

        const tick = () => {
            // Smoothly move the ring towards the mouse
            const ringLerp = isHovering ? 0.22 : 0.16;
            const dx = mousePos.current.x - ringPos.current.x;
            const dy = mousePos.current.y - ringPos.current.y;

            // Only update if there's meaningful movement to save CPU
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                ringPos.current.x += dx * ringLerp;
                ringPos.current.y += dy * ringLerp;
                if (ringRef.current) {
                    ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${isHovering ? 1.35 : 1})`;
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

    return (
        <div
            ref={ringRef}
            style={{
                position: 'fixed',
                top: -18,
                left: -18,
                width: 36,
                height: 36,
                borderRadius: '999px',
                border: `1px solid ${isHovering ? 'rgba(96, 165, 250, 0.95)' : 'rgba(255, 255, 255, 0.45)'}`,
                boxShadow: isHovering
                    ? '0 0 0 1px rgba(96, 165, 250, 0.18), 0 0 22px rgba(96, 165, 250, 0.18)'
                    : 'none',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'border-color 180ms ease, transform 180ms cubic-bezier(0.23, 1, 0.32, 1)',
                mixBlendMode: 'difference'
            }}
        />
    );
};
