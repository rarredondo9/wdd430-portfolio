import ProjectList from "./ProjectList";
import Pagination from "./Pagination";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";

interface ProjectResultsProps {
    searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function ProjectResults({ searchParams }: ProjectResultsProps) {
    const params = await searchParams;

    const query = (params.query ?? '').trim().slice(0, 50);
    const requestedPage = Number(params.page);
    const currentPage = 
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const [projects, totalPages] = await Promise.all([
        fetchFilteredProjects(query, currentPage),
        fetchProjectsPages(query),
    ]);

    return (
        <>
        {projects.length === 0 ? (
            <p className="text-stone-700">
                {query ? `No projects match "${query}".` : 'No projects found.'}
            </p>
        ) : (
            <ProjectList projects={projects} />
        )}
        <Pagination totalPages={totalPages} />
            </>
    );
}