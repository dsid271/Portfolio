import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '../data/resume';
import { useAppStore } from '../store/useAppStore';
import { Marquee } from './Marquee';
import { Hero } from './shared/Hero';
import { About } from './shared/About';
import { SelectedWork } from './shared/SelectedWork';
import { Contact } from './shared/Contact';

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
                <Hero variant="desktop" />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
                    <span className="font-mono text-xs tracking-widest">SCROLL</span>
                </div>
            </section>

            <Section index={1} title="ARCHITECT">
                <About variant="desktop" />
            </Section>

            <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-md py-8">
                <Marquee items={["NEURAL ARCHITECT", "CREATIVE DEVELOPER", "SYSTEM DESIGNER", "AI ENGINEER"]} speed={15} />
            </div>

            <Section index={2} title="PROJECTS">
                <SelectedWork variant="desktop" />
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
                    <Contact variant="desktop" />
                </div>

                <footer className="w-full py-10 flex justify-between items-end text-gray-800 font-mono text-[10px] uppercase tracking-widest pr-64">
                    <div>{new Date().getUTCFullYear()} © ARCHIVE-001</div>
                    <div>AUTONOMOUS SYSTEM // V.3.0.0</div>
                </footer>
            </section>

        </div>
    );
};
