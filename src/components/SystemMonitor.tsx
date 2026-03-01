import React, { useEffect, useRef, useState } from 'react';
import { useModelState } from '../hooks/useModelState';

export const SystemMonitor = () => {
    const { loss, confidence, stage } = useModelState();
    const [history, setHistory] = useState<number[]>(new Array(40).fill(0.5));
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Update history
    useEffect(() => {
        setHistory(prev => {
            const next = [...prev.slice(1), loss];
            return next;
        });
    }, [loss]);

    // Draw Sparkline
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        ctx.strokeStyle = stage === 'unstable' ? '#ff4444' : '#60a5fa';
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        history.forEach((val, i) => {
            const x = (i / (history.length - 1)) * w;
            // Invert Y so high loss is high
            const y = h - (val * h * 0.8) - h * 0.1;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Scanline effect
        ctx.fillStyle = `rgba(0,0,0,0.1)`;
        for (let i = 0; i < h; i += 2) ctx.fillRect(0, i, w, 1);

    }, [history, stage]);

    return (
        <div className="fixed bottom-8 right-8 z-40 font-mono text-xs tracking-widest pointer-events-none mix-blend-difference select-none hidden md:block">
            <div className="flex flex-col items-end gap-1 mb-2">
                <div className={`flex items-center gap-2 ${stage === 'unstable' ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${stage === 'converged' ? 'bg-blue-400' : 'bg-red-500'}`} />
                    <span className="uppercase">SYS.STATUS: {stage}</span>
                </div>
                <div className="text-gray-500">LOSS: {loss.toFixed(6)}</div>
                <div className="text-gray-500">CONF: {(confidence * 100).toFixed(1)}%</div>
            </div>

            <div className={`relative border border-white/10 bg-black/40 backdrop-blur-sm w-48 h-24 p-2 pt-6 rounded ${stage !== 'converged' ? 'animate-pulse' : ''}`}>
                <div className="absolute top-2 left-2 text-[10px] text-gray-500 uppercase tracking-widest">
                    Training Graph
                </div>
                <canvas ref={canvasRef} width={170} height={64} className="w-full h-full opacity-80" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
            </div>

            <div className="mt-1 text-[10px] text-gray-600 text-right">
                MODEL ID: KOLAM-V3 // NEURAL ARCHIVE
            </div>
        </div>
    );
};
