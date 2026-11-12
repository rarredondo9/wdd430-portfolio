import { connection } from "next/server";
import ProjectList from "./ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function SchoolProjectList() {

    const projects = await getProjects('school');

    if (projects.length === 0) {
        return <p className="text-stone-700">No school projects found.</p>;
    }

    return <ProjectList projects={projects} />;
}