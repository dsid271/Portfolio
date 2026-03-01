import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '../data/resume';
import { useAppStore } from '../store/useAppStore';
import { Marquee } from './Marquee';

const Section = ({
    index,
    title,
    children,
    className = ""
}: {
    index: number;
    title: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -50% 0px" });
    const setSection = useAppStore(s => s.setSection);

    React.useEffect(() => {
        if (isInView) setSection(index);
    }, [isInView, index, setSection]);

    return (
        <section ref={ref} className={`relative flex flex-col md:flex-row min-h-screen py-24 ${className}`}>
            <div className="md:w-1/3 flex-shrink-0 md:h-screen md:sticky md:top-0 md:flex md:flex-col md:justify-center px-8 md:pl-16 z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="block font-mono text-xs text-blue-400 mb-2 tracking-[0.3em]">0{index} / INF</span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none mix-blend-difference">
                        {title}
                    </h2>
                </motion.div>
            </div>
            <div className="md:w-2/3 px-8 md:pr-24 pt-10 md:pt-48 pb-20">
                {children}
            </div>
        </section>
    );
};

export const Layout = () => {
    const heroRef = useRef(null);
    const heroInView = useInView(heroRef, { margin: "-20% 0px -50% 0px" });
    const contactRef = useRef(null);
    const contactInView = useInView(contactRef, { margin: "-20% 0px -50% 0px" });
    const setSection = useAppStore(s => s.setSection);

    useEffect(() => { if (heroInView) setSection(0); }, [heroInView, setSection]);
    useEffect(() => { if (contactInView) setSection(4); }, [contactInView, setSection]);

    return (
        <div className="relative w-full z-10 selection:bg-blue-500 selection:text-white">

            {/* HERO - Full Screen (section 0) */}
            <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center text-center pointer-events-none relative">
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
                        <p className="text-lg md:text-2xl font-light tracking-[0.3em] uppercase text-blue-400">
                            {resumeData.hero.title}
                        </p>
                    ) : null}
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
                    <span className="font-mono text-xs tracking-widest">SCROLL</span>
                </div>
            </section>

            <Section index={1} title="ARCHITECT">
                <div className="space-y-12 max-w-2xl">
                    <p className="text-2xl md:text-4xl text-gray-100 leading-tight font-light tracking-tight">
                        {resumeData.about.bio}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-8">
                        {resumeData.skills.languages.map(lang => (
                            <span key={lang} className="px-6 py-2 border border-white/10 rounded-full text-xs font-mono text-gray-500 uppercase tracking-widest">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
            </Section>

            <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-md py-8">
                <Marquee items={["NEURAL ARCHITECT", "CREATIVE DEVELOPER", "SYSTEM DESIGNER", "AI ENGINEER"]} speed={15} />
            </div>

            <Section index={2} title="PROJECTS">
                <div className="space-y-32">
                    {resumeData.projects.map((p, i) => (
                        <div key={i} className="group relative">
                            <span className="font-mono text-xs text-blue-500 mb-4 block tracking-widest uppercase">{p.subtitle}</span>
                            <h3 className="text-4xl md:text-6xl font-bold mb-6 group-hover:translate-x-4 transition-transform duration-500 ease-out italic">
                                {p.title}
                            </h3>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {p.stack.map(t => (
                                    <span key={t} className="text-[10px] uppercase border border-white/10 px-3 py-1 rounded-full text-gray-500">{t}</span>
                                ))}
                            </div>
                            <p className="text-gray-400 leading-relaxed max-w-xl text-lg mb-6">{p.description}</p>

                            {/* Project Links Rendering */}
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
            </Section>

            <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-md py-8">
                <Marquee items={resumeData.skills.tools} speed={40} reverse />
            </div>

            <Section index={3} title="EXPERIENCE">
                <div className="space-y-24">
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} className="group flex flex-col md:flex-row gap-8 items-baseline">
                            <span className="md:w-32 font-mono text-xs text-gray-600 tracking-tighter shrink-0">{exp.period}</span>
                            <div>
                                <h3 className="text-3xl font-bold mb-1 group-hover:text-blue-400 transition-colors uppercase">{exp.role}</h3>
                                <div className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono">{exp.company}</div>
                                <ul className="space-y-2 text-gray-400 border-l border-white/10 pl-6">
                                    {exp.achievements.map((ach, j) => <li key={j} className="text-sm">• {ach}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* CONTACT / TERMINATE - Full Screen Centered (section 4) */}
            <section ref={contactRef} className="min-h-screen w-full flex flex-col px-8">
                <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-24">
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
                        <a href={`https://${resumeData.about.contact.github}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                        <a href={`https://${resumeData.about.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>

                <footer className="w-full py-10 flex justify-between items-end text-gray-800 font-mono text-[10px] uppercase tracking-widest pr-64">
                    <div>{new Date().getUTCFullYear()} © ARCHIVE-001</div>
                    <div>AUTONOMOUS SYSTEM // V.3.0.0</div>
                </footer>
            </section>

        </div>
    );
};
