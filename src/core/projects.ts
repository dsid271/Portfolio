import { Point } from "./kolamField";

export type Project = {
    id: string;
    title: string;
    description: string;
    anchor: Point;
};

export const projects: Project[] = [
    {
        id: "lupus",
        title: "LUPUS NEPHRITIS CLASSIFICATION",
        description: "Histopathology image classification using EfficientNetV2S.",
        anchor: { x: -240, y: -120 }
    },
    {
        id: "aqi",
        title: "AIR QUALITY PREDICTION",
        description: "Time-series AQI prediction using LSTM, GRU, TCN.",
        anchor: { x: 240, y: -120 }
    },
    {
        id: "federated",
        title: "FEDERATED LEARNING AT EDGE",
        description: "Efficient, privacy-preserving on-device training.",
        anchor: { x: 0, y: 240 }
    }
];
