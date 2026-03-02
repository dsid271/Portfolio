import React from 'react';
import { Hero } from '../shared/Hero';
import { SelectedWork } from '../shared/SelectedWork';
import { About } from '../shared/About';
import { Contact } from '../shared/Contact';

function Section({
    children,
    minHeightClassName = "",
    dividerTop = false,
}: {
    children: React.ReactNode;
    minHeightClassName?: string;
    dividerTop?: boolean;
}) {
    return (
        <section className={`${dividerTop ? 'border-t border-white/5' : ''} ${minHeightClassName} w-full px-6 py-16`}>
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
                    'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.04), transparent 60%)',
            }}
        >
            <Section minHeightClassName="min-h-[100svh]">
                <Hero variant="mobile" />
            </Section>

            <Section>
                <SelectedWork variant="mobile" />
            </Section>

            <Section dividerTop>
                <About variant="mobile" />
            </Section>

            <Section dividerTop>
                <Contact variant="mobile" />
            </Section>
        </main>
    );
}
