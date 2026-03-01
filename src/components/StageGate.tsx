import { useModelState } from "../hooks/useModelState";

export default function StageGate() {
    const state = useModelState();

    if (state.stage === "init") {
        return <p className="mt-8 text-xs tracking-[0.4em] opacity-40 uppercase animate-pulse">Move slowly to begin</p>;
    }

    if (state.stage === "training") {
        return <p className="mt-8 text-xs tracking-[0.4em] opacity-60 uppercase animate-pulse">Calibrating... keep it smooth</p>;
    }

    if (state.stage === "unstable") {
        return <p className="mt-8 text-xs tracking-[0.4em] text-red-300 uppercase animate-pulse">Too fast — slow down</p>;
    }


    return <p className="mt-8 text-xs tracking-[0.4em] text-green-400 uppercase">Model Converged</p>;
}
