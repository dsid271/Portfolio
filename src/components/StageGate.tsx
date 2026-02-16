import { useModelState } from "../hooks/useModelState";

export default function StageGate() {
    const state = useModelState();

    if (state.stage === "init") {
        return <p className="mt-8 text-xs tracking-[0.4em] opacity-40 uppercase animate-pulse">Initializing Parameters</p>;
    }

    if (state.stage === "training") {
        return <p className="mt-8 text-xs tracking-[0.4em] opacity-60 uppercase animate-pulse">Training Model...</p>;
    }

    if (state.stage === "unstable") {
        return <span style={{ color: "#ff7a7a" }}>OVERFITTING — RE-TRAIN REQUIRED</span>;
    }


    return <p className="mt-8 text-xs tracking-[0.4em] text-green-400 uppercase">Model Converged</p>;
}
