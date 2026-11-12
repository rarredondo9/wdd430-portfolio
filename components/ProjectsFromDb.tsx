import { connection } from "next/server";
import ProjectList from "./ProjectList";
import { getProjects, type ProjectType } from "@/lib/projects-db";

interface ProjectsFromDbProps {
    type?: ProjectType;
}

export default async function ProjectsFromDb({ type }: ProjectsFromDbProps) {
    await connection();

    const projects = await getProjects(type);

    if (projects.length === 0) {
        return <p className="text-stone-700">No Projects found.</p>;
    }

    return <ProjectList projects={projects} />;
}