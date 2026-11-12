import { Suspense } from "react";
import ProjectsFromDb from "@/components/ProjectsFromDb";

export default function OpenSourceProjects() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Open Source Projects</h1>
            <p className="text-lg text-stone-700 mb-10">
               Projects I have shared publicly on Github for others to use and learn from.
            </p>
            <Suspense fallback={<p role="status" className="text-stone-700">Loading projects...</p>}>
                <ProjectsFromDb type="opensource" />
            </Suspense>            
        </section>
    );
}