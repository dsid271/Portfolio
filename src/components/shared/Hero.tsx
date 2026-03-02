import React from 'react';
import { resumeData } from '../../data/resume';

export function Hero({ variant }: { variant: 'desktop' | 'mobile' }) {
    if (variant === 'mobile') {
        return (
            <div className="min-h-[100svh] flex flex-col justify-center">
                <div className="text-left">
                    <div className="text-xs font-mono tracking-[0.35em] text-blue-400 uppercase mb-4">Portfolio</div>
                    <h1 className="text-5xl font-black tracking-tight leading-[0.95] uppercase">
                        {resumeData.hero.name}
                    </h1>
                    <div className="mt-6">
                        <div
                            className="text-base uppercase tracking-[0.25em] text-blue-300 font-medium"
                            style={{ transform: 'scaleX(1.08)', transformOrigin: 'left' }}
                        >
                            {resumeData.hero.title}
                        </div>
                        <p className="mt-4 text-base text-gray-300 leading-relaxed">{resumeData.hero.tagline}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="pointer-events-auto"
            style={{
                transform: 'translate3d(0, calc(var(--lenis-scroll, 0px) * -0.06), 0)'
            }}
        >
            <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none mb-4 uppercase">
                {resumeData.hero.name.split(' ')[0]}
            </h1>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-gray-400 mb-8 uppercase">
                {resumeData.hero.name.split(' ').slice(1).join(' ')}
            </h2>
            {resumeData.hero.title ? (
                <p
                    className="text-xl md:text-2xl uppercase text-blue-400 mt-4 tracking-[0.25em] font-medium"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        transform: 'scaleX(1.25)',
                    }}
                >
                    {resumeData.hero.title}
                </p>
            ) : null}
        </div>
    );
}
