import React from 'react';
import { resumeData } from '../../data/resume';

export function About({ variant }: { variant: 'desktop' | 'mobile' }) {
    if (variant === 'mobile') {
        return (
            <>
                <div className="text-xs font-mono tracking-[0.35em] text-gray-400 uppercase mb-8">System Concept</div>
                <h2 className="text-3xl font-black tracking-tight uppercase leading-tight">
                    Calm interaction.
                    <br />
                    Clear intent.
                </h2>
                <p className="mt-6 text-base text-gray-300 leading-relaxed">
                    This portfolio is designed as an interaction system on desktop. On mobile, it becomes a cinematic narrative: concise, readable, and focused on work.
                </p>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                    Explore the desktop version for the experimental training loop and live system monitor.
                </p>
            </>
        );
    }

    return (
        <div className="space-y-12 max-w-2xl">
            <p className="text-2xl md:text-4xl text-gray-100 leading-tight font-light tracking-tight">{resumeData.about.bio}</p>
            <div className="flex flex-wrap gap-4 pt-8">
                {resumeData.skills.languages.map((lang) => (
                    <span
                        key={lang}
                        className="px-6 py-2 border border-white/10 rounded-full text-xs font-mono text-gray-500 uppercase tracking-widest"
                    >
                        {lang}
                    </span>
                ))}
            </div>
        </div>
    );
}
