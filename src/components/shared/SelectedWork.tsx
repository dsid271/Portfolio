import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../../data/resume';

export function SelectedWork({ variant }: { variant: 'desktop' | 'mobile' }) {
    if (variant === 'mobile') {
        return (
            <>
                <div className="max-w-[28rem] mx-auto">
                    <div className="text-xs font-mono tracking-[0.35em] text-gray-400 uppercase mb-8">Selected Work</div>
                </div>
                <div className="space-y-6 max-w-[28rem] mx-auto">
                    {resumeData.projects.map((p, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0.9, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px -15% 0px' }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="border border-white/10 rounded-2xl p-6 bg-black/60"
                        >
                            <div className="text-[10px] font-mono tracking-widest uppercase text-blue-400 mb-2">{p.subtitle}</div>
                            <h2 className="text-2xl font-bold tracking-tight leading-tight text-left">{p.title}</h2>
                            <p className="mt-3 text-[15px] text-gray-300 leading-relaxed">{p.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {p.stack.slice(0, 4).map((t) => (
                                    <span key={t} className="text-[10px] uppercase border border-white/10 px-3 py-1 rounded-full text-gray-400">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            {p.links && p.links.length > 0 ? (
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {p.links.slice(0, 2).map((link, linkIdx) => (
                                        <a
                                            key={linkIdx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-mono px-4 py-2 border border-blue-500/30 text-blue-300 active:bg-blue-500 active:text-white transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            ) : null}
                        </motion.article>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div className="space-y-32">
            {resumeData.projects.map((p, i) => (
                <div key={i} className="group relative">
                    <span className="font-mono text-xs text-blue-500 mb-4 block tracking-widest uppercase">{p.subtitle}</span>
                    <h3 className="text-4xl md:text-6xl font-bold mb-6 group-hover:translate-x-4 transition-transform duration-500 ease-out italic">
                        {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {p.stack.map((t) => (
                            <span key={t} className="text-[10px] uppercase border border-white/10 px-3 py-1 rounded-full text-gray-500">{t}</span>
                        ))}
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-xl text-lg mb-6">{p.description}</p>

                    {p.links && p.links.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-2">
                            {p.links.map((link, linkIdx) => (
                                <a
                                    key={linkIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-mono px-4 py-2 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="text-[10px]">▶</span> {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
