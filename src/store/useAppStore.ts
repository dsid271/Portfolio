import { create } from 'zustand';

interface AppState {
    currentSection: number;
    introFinished: boolean;
    setSection: (idx: number) => void;
    setIntroFinished: (done: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentSection: 0,
    introFinished: false,
    setSection: (idx) => set({ currentSection: idx }),
    setIntroFinished: (done) => set({ introFinished: done }),
}));
