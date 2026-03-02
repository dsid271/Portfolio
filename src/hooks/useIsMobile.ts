import { useEffect, useState } from "react";

export function useIsMobile() {
    const getIsMobile = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(pointer: coarse)").matches;
    };

    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        const mq = window.matchMedia("(pointer: coarse)");
        const onChange = () => setIsMobile(mq.matches);

        onChange();

        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", onChange);
            return () => mq.removeEventListener("change", onChange);
        }

        mq.addListener(onChange);
        return () => mq.removeListener(onChange);
    }, []);

    return isMobile;
}
