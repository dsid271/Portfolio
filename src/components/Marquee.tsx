import React from 'react';

interface MarqueeProps {
    items: string[];
    speed?: number; // seconds for full loop
    className?: string;
    reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, speed = 20, className = "", reverse = false }) => {
    return (
        <div className={`relative flex overflow-hidden w-full select-none ${className}`}>
            {/* Wrapper for the seamless loop */}
            <div
                className={`flex min-w-full shrink-0 items-center justify-around gap-8 whitespace-nowrap py-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {items.map((item, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors cursor-default">
                        {item} &nbsp;•&nbsp;
                    </span>
                ))}
            </div>

            {/* Duplicate for seamless loop */}
            <div
                aria-hidden="true"
                className={`flex min-w-full shrink-0 items-center justify-around gap-8 whitespace-nowrap py-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {items.map((item, i) => (
                    <span key={`dup-${i}`} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors cursor-default">
                        {item} &nbsp;•&nbsp;
                    </span>
                ))}
            </div>
        </div>
    );
};
