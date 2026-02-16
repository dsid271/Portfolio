import HeroText from "../components/HeroText";
import StageGate from "../components/StageGate";
import ProjectCard from "../components/ProjectCard";
import { KolamField } from "../components/KolamField";
import { projects } from "../core/projects";
import { CustomCursor } from "../components/CustomCursor";

export default function Home() {
    return (
        <main
            style={{
                height: "100vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                cursor: "none"
            }}
        >
            <CustomCursor />
            <KolamField />
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <HeroText />
                <StageGate />
            </div>

            {projects.map(p => (
                <ProjectCard key={p.id} project={p} />
            ))}
        </main>
    );
}
