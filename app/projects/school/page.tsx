import { Suspense } from "react";
import SchoolProjectList from "@/components/SchoolProjectList";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

export default function SchoolProjects() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">School Projects</h1>
            <p className="text-lg text-stone-700 mb-10">
               Projects I have built for my web development classes at BYU-Idaho
            </p>
            <Suspense fallback={<ProjectCardSkeleton count={3} />}>
                <SchoolProjectList />
            </Suspense>            
        </section>
    );
}