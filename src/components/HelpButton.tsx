import React from "react";
import { useAppStore } from "../store/useAppStore";

export function HelpButton() {
    const openOnboarding = useAppStore(s => s.openOnboarding);

    return (
        <button
            type="button"
            onClick={openOnboarding}
            className="fixed top-6 right-6 z-[55] w-8 h-8 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:border-white/30 transition-colors font-mono text-sm leading-none"
            aria-label="Help"
        >
            ?
        </button>
    );
}
