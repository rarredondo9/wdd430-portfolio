import { Suspense } from "react";
import ProjectsFromDb from "@/components/ProjectsFromDb";

export default function SchoolProjects() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">School Projects</h1>
            <p className="text-lg text-stone-700 mb-10">
               Projects I have built for my web development classes at BYU-Idaho
            </p>
            <Suspense fallback={<p role="status" className="text-stone-700">Loading projects...</p>}>
                <ProjectsFromDb type="school" />
            </Suspense>            
        </section>
    );
}