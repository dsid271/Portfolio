import { useEffect, useRef, useState } from "react";
import { useModelState } from "../hooks/useModelState";

const TARGET = "SIDHARTHA D";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function HeroText() {
    const [, force] = useState(0);
    const frozen = useRef<boolean[]>([]);
    const state = useModelState();

    useEffect(() => {
        let id: NodeJS.Timeout;
        const tick = () => {
            force(v => v + 1);
            const delay = 70 + Math.random() * 100; // Throttled for hardware safety
            id = setTimeout(tick, delay);
        };
        tick();
        return () => clearTimeout(id);
    }, []);

    // Reset frozen state if confidence drops too low (system reset)
    useEffect(() => {
        if (state.confidence < 0.05 && frozen.current.some((f: boolean) => f)) {
            frozen.current = [];
        }
    }, [state.confidence]);

    const renderText = () => {
        return TARGET.split("").map((char, i) => {
            if (char === " ") return " ";

            // LCP Optimization: Settle first 3 characters much faster
            const lcpBoost = i < 3 ? 0.3 : 0;
            // Introduce high-frequency flicker: even if frozen, occasionally randomize
            const isFlickering = Math.random() < (0.01 * (1 - state.confidence));

            if (frozen.current[i] && !isFlickering) return char;

            // Progressive unlock threshold: boosted by LCP and confidence
            const threshold = Math.max(0, (state.confidence + lcpBoost - i * 0.02) * 1.5);
            const correct = Math.random() < threshold;

            if (correct && !isFlickering) {
                frozen.current[i] = true;
                return char;
            }

            // High confidence prevents randomizing unless flickering
            if (state.confidence > 0.99 && !isFlickering) return char;

            return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");
    };

    return (
        <div style={{
            minHeight: '1.2em',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            willChange: 'transform, opacity'
        }}>
            <h1 className="text-7xl font-orbitron font-bold tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] select-none">
                {renderText()}
            </h1>
        </div>
    );
}
