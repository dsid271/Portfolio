import { create } from 'zustand';

interface AppState {
    currentSection: number;
    introFinished: boolean;
    onboardingOpen: boolean;
    setSection: (idx: number) => void;
    setIntroFinished: (done: boolean) => void;
    openOnboarding: () => void;
    closeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentSection: 0,
    introFinished: false,
    onboardingOpen: false,
    setSection: (idx) => set({ currentSection: idx }),
    setIntroFinished: (done) => set({ introFinished: done }),
    openOnboarding: () => set({ onboardingOpen: true }),
    closeOnboarding: () => set({ onboardingOpen: false }),
}));
