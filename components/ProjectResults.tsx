import ProjectList from "./ProjectList";
import Pagination from "./Pagination";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";
import Link from "next/link";
import { auth } from "@/auth";

interface ProjectResultsProps {
    searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function ProjectResults({ searchParams }: ProjectResultsProps) {
    const params = await searchParams;
    const session = await auth();
    const isOwner = Boolean(session?.user);

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
        {isOwner && (
            <Link 
                href="/projects/create"
                className="mb-6 inline-block rounded-md bg-rose-700 px-4 py-2 font-semibold text-white hover:bg-rose-800">
                    + Add Project
                </Link>
        )}

        {projects.length === 0 ? (
            <p className="text-stone-700">
                {query ? `No projects match "${query}".` : 'No projects found.'}
            </p>
        ) : (
            <ProjectList projects={projects} canEdit={isOwner} />
        )}
        <Pagination totalPages={totalPages} />
            </>
    );
}