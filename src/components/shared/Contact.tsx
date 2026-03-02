import React from 'react';
import { resumeData } from '../../data/resume';

export function Contact({ variant }: { variant: 'desktop' | 'mobile' }) {
    if (variant === 'mobile') {
        return (
            <>
                <div className="text-xs font-mono tracking-[0.35em] text-gray-400 uppercase mb-8">Contact</div>
                <h2 className="text-4xl font-black tracking-tight uppercase leading-tight">
                    Let&apos;s build
                    <br />
                    something sharp.
                </h2>
                <a
                    href={`mailto:${resumeData.about.contact.email}`}
                    className="mt-10 inline-block text-lg font-bold border-b-2 border-blue-500 pb-1 text-blue-300"
                >
                    {resumeData.about.contact.email}
                </a>
                <div className="mt-10 flex gap-6 text-gray-400 font-mono text-xs uppercase tracking-widest">
                    <a href={`https://${resumeData.about.contact.github}`} target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                    <a href={`https://${resumeData.about.contact.linkedin}`} target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>
            </>
        );
    }

    return (
        <>
            <span className="font-mono text-xs text-red-500 mb-8 tracking-[0.3em]">04 / TERMINATE</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-12 uppercase max-w-4xl">
                READY TO <span className="text-blue-500">OVERFIT</span> YOUR NEXT BIG CHALLENGE?
            </h2>
            <a
                href={`mailto:${resumeData.about.contact.email}`}
                className="text-2xl md:text-5xl font-bold border-b-4 border-blue-500 pb-2 hover:text-blue-500 transition-all"
            >
                {resumeData.about.contact.email}
            </a>
            <div className="flex gap-8 mt-16 text-gray-500 font-mono text-sm uppercase tracking-widest">
                <a href={`https://${resumeData.about.contact.github}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    GitHub
                </a>
                <a
                    href={`https://${resumeData.about.contact.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                >
                    LinkedIn
                </a>
            </div>
        </>
    );
}
