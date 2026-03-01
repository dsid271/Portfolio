import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const ScrollManager = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on('scroll', (e: { scroll: number; velocity: number }) => {
            document.documentElement.style.setProperty('--lenis-scroll', `${e.scroll}px`);
            document.documentElement.style.setProperty('--lenis-velocity', `${e.velocity}px`);
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // Logic only component
};
