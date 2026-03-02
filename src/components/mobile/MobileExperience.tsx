import React from 'react';
import { ScrollManager } from '../ScrollManager';
import { MobileLayout } from './MobileLayout';

export function MobileExperience() {
    return (
        <div className="relative bg-black w-full min-h-screen text-white">
            <ScrollManager smoothWheel smoothTouch={false} />

            <MobileLayout />
        </div>
    );
}
