import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useModelState } from "../hooks/useModelState";
import { useAppStore } from "../store/useAppStore";

const STORAGE_KEY = "kolam_onboarding_dismissed_v1";

export function OnboardingOverlay() {
    useModelState();
    const introFinished = useAppStore(s => s.introFinished);
    const setIntroFinished = useAppStore(s => s.setIntroFinished);
    const onboardingOpen = useAppStore(s => s.onboardingOpen);
    const closeOnboarding = useAppStore(s => s.closeOnboarding);

    const [seenBefore, setSeenBefore] = useState(true);

    useEffect(() => {
        try {
            setSeenBefore(window.localStorage.getItem(STORAGE_KEY) === "1");
        } catch {
            setSeenBefore(false);
        }
    }, []);

    const isVisible = useMemo(() => {
        if (onboardingOpen) return true;
        if (introFinished) return false;
        return !seenBefore;
    }, [introFinished, onboardingOpen, seenBefore]);

    const dismiss = useCallback(() => {
        closeOnboarding();
        setIntroFinished(true);
        try {
            window.localStorage.setItem(STORAGE_KEY, "1");
        } catch {
        }
    }, [closeOnboarding, setIntroFinished]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="w-full max-w-2xl border border-white/10 bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-10 text-center">
                    <div className="font-mono text-[10px] tracking-[0.35em] text-blue-400 uppercase mb-3">
                        Interactive Onboarding
                    </div>

                    <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
                        Move slowly. Precision reveals structure.
                    </h1>

                    <p className="mt-4 text-sm md:text-base text-gray-300 leading-relaxed">
                        This portfolio learns from your interaction.
                        Calm movement increases confidence. Chaotic movement increases loss.
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="border border-white/10 rounded-xl p-4 bg-black/30">
                            <div className="font-mono text-xs tracking-widest text-gray-200 uppercase">
                                Look at the background
                            </div>
                            <div className="mt-2 text-sm text-gray-400">
                                The Kolam field morphs into a brain as the system converges.
                            </div>
                        </div>

                        <div className="border border-white/10 rounded-xl p-4 bg-black/30">
                            <div className="font-mono text-xs tracking-widest text-gray-200 uppercase">
                                Watch the corner graph
                            </div>
                            <div className="mt-2 text-sm text-gray-400">
                                Bottom-right HUD shows stage, confidence, and a live loss curve.
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={dismiss}
                            className="px-6 py-3 rounded-full bg-blue-500 text-white text-sm font-mono tracking-widest uppercase hover:bg-blue-400 transition-colors"
                        >
                            Begin
                        </button>
                        <button
                            type="button"
                            onClick={dismiss}
                            className="text-[11px] text-gray-500 font-mono tracking-widest uppercase hover:text-gray-300 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
