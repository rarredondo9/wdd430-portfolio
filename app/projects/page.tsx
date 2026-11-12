import { Suspense } from "react";
import ProjectsFromDb from "@/components/ProjectsFromDb";

export default function ProjectsOverview() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Projects Overview</h1>
            <p className="text-lg text-stone-700 mb-10">
                Here you can find the different kinds of projects I have worked on. Use the menu above to see my open source and school projects.
            </p>
            <Suspense fallback={<p role="status" className="text-stone-700">Loading projects...</p>}>
                <ProjectsFromDb />
            </Suspense>            
        </section>
    );
}