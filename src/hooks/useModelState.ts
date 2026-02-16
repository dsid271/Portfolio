import { useSyncExternalStore } from "react";
import { getSnapshot, subscribe } from "../core/modelState";

export function useModelState() {
    return useSyncExternalStore(subscribe, getSnapshot);
}
