import React from 'react';
import { Hero } from '../shared/Hero';
import { SelectedWork } from '../shared/SelectedWork';
import { About } from '../shared/About';
import { Contact } from '../shared/Contact';

function Section({
    children,
    minHeightClassName = "",
    dividerTop = false,
    paddingClassName = 'pt-20 pb-16',
}: {
    children: React.ReactNode;
    minHeightClassName?: string;
    dividerTop?: boolean;
    paddingClassName?: string;
}) {
    return (
        <section
            className={`${dividerTop ? 'border-t border-white/5' : ''} ${minHeightClassName} w-full px-6 ${paddingClassName}`}
        >
            <div className="max-w-xl mx-auto">{children}</div>
        </section>
    );
}

export function MobileLayout() {
    return (
        <main
            className="relative w-full z-10 overflow-x-hidden"
            style={{
                paddingTop: 'calc(1.5rem + env(safe-area-inset-top))',
                paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.02) 30%, rgba(0,0,0,0) 55%)',
            }}
        >
            <Section minHeightClassName="min-h-[100svh]" paddingClassName="py-16">
                <div className="relative min-h-[100svh]">
                    <Hero variant="mobile" />
                    <div
                        className="pointer-events-none absolute bottom-0 left-0 w-full"
                        style={{
                            height: 120,
                            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))',
                        }}
                    />
                </div>
            </Section>

            <Section paddingClassName="pt-24 pb-16">
                <SelectedWork variant="mobile" />
            </Section>

            <Section dividerTop paddingClassName="pt-20 pb-16">
                <About variant="mobile" />
            </Section>

            <Section dividerTop paddingClassName="pt-20 pb-24">
                <Contact variant="mobile" />
            </Section>
        </main>
    );
}
