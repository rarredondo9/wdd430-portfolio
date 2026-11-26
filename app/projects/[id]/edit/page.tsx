import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";
import type { Metadata } from "next";

export async function generateMetadata(props: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await props.params;
    const project = await getProjectById(Number(id));

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return { title: `Edit ${project.title}` };
}

export default async function EditProjectPage(props: {
    params: Promise<{ id: string}>;
}) {
    const { id } = await props.params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId) || projectId < 1) {
        notFound();
    }

    const project = await getProjectById(projectId);

    if (!project) {
        notFound();
    }

    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <section>
            <h1 className="mb-6 text-3xl font-bold">Edit Project</h1>
            <ProjectForm action={updateProjectWithId} project={project} submitLabel="Save Changes" />
        </section>
    );
}