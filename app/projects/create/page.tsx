import ProjectForm from "@/components/ProjectForm";
import { createProject } from "@/lib/actions";

export default function CreateProjectPage() {
    return (
        <section>
            <h1 className="mb-6 text-3xl font-bold">Add a Project</h1>
            <ProjectForm action={createProject} submitLabel="Create Project" />
        </section>
    );
}