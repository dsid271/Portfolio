import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const ScrollManager = ({
    smoothWheel = true,
    smoothTouch = true,
}: {
    smoothWheel?: boolean;
    smoothTouch?: boolean;
}) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel,
            smoothTouch,
        } as unknown as ConstructorParameters<typeof Lenis>[0]);

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
    }, [smoothTouch, smoothWheel]);

    return null; // Logic only component
};
