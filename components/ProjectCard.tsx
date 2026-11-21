import Link from "next/link";
import { deleteProject } from "@/lib/actions";

interface ProjectCardProps {
    id?: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    yearCompleted?: number | null;
}

export default function ProjectCard({ id, title, description, technologies, link, yearCompleted }:ProjectCardProps) {
    return (
        <article className="p-4 border-1-4 border-rose-400 bg-white rounded">
            <h3 className="text-xl font-bold mb-2 text-stone-900">{title}</h3>
            <p className="text-stone-700 mb-3">{description}</p>
            <p className="text-sm text-stone-700">
                <strong>Technologies:</strong> {technologies.join(', ')}
            </p>
            {yearCompleted && (
                <p className="text-sm text-stone-700">
                    <strong>Completed:</strong> {yearCompleted}
                </p>
            )}
            {link && (
                <p className="mt-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-rose-700 hover:underline">
                        View Project
                    </a>
                </p>
            )}

            {id !== undefined && (
                <div className="mt-4 flex gap-3">
                    <Link href={`/projects/${id}/edit`}
                    className="rounded-md border border-rose-300 px-3 py-1 text-sm font-semibold text-rose-700 hover:bg-rose-50">
                        Edit<span className="sr-only"> {title}</span>
                    </Link>
                    <form action={deleteProject.bind(null, id)}>
                        <button type="submit"
                        className="rounded-md border border-red-300 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50">
                            Delete<span className="sr-only"> {title}</span>
                        </button>
                    </form>
                </div>
            )}
        </article>
    );
}