import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function OpenSourceProjects() {

    const projects = await getProjects('opensource');

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Open Source Projects</h1>
            <p className="text-lg text-stone-700 mb-10">
                Projects I have shared publicly on Github for others to use and learn from.
            </p>
            {projects.length === 0 ? (
                <p className="text-stone-700">No projects found.</p>
            ): (
                <ProjectList projects={projects} />
            )}
        </section>
    );
}