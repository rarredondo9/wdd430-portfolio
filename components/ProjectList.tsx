import ProjectCard from "./ProjectCard";

interface Project {
    id?: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    yearCompleted?: number | null;
}

interface ProjectListProps {
    projects: Project[];
    canEdit?: boolean;
}

export default function ProjectList({ projects, canEdit }: ProjectListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.title} {...project} canEdit={canEdit} />
            ))}
        </section>
    );
}