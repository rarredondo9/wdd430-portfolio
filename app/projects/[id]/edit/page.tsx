import { notFound } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { updateProject } from "@/lib/actions";
import { getProjectById } from "@/lib/projects-db";

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