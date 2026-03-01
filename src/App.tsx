import React, { useEffect } from 'react';
import { KolamField } from './components/KolamField';
import { ScrollManager } from './components/ScrollManager';
import { Layout } from './components/Layout';
import { SystemMonitor } from './components/SystemMonitor';
import { OnboardingOverlay } from './components/OnboardingOverlay';
import { HelpButton } from './components/HelpButton';
import { CustomCursor } from './components/CustomCursor';
import { startRafLoop } from './core/rafLoop';
import { registerInteraction } from './core/interactionEngine';

function App() {
    useEffect(() => {
        registerInteraction();
        startRafLoop();
    }, []);

    return (
        <div className="relative bg-black w-full min-h-screen text-white">
            <ScrollManager />

            {/* 3D Background - Fixed */}
            <div className="fixed inset-0 z-0">
                <KolamField />
            </div>

            {/* Content Layer - Scrollable */}
            <Layout />

            {/* HUD Layer */}
            <SystemMonitor />
            <HelpButton />
            <CustomCursor />
            <OnboardingOverlay />

            {/* Grain Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}

export default App;
