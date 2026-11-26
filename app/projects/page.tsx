import { Suspense } from "react";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectResults from "@/components/ProjectResults";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata =
    {title: 'Projects'};


export default function ProjectsOverview({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) {
    return ( 
        <section>
            <h1 className="text-3xl font-bold mb-4">Projects Overview</h1>
            <p className="text-lg text-stone-700 mb-10">
                Here you can find the different kinds of projects I have worked on. Use the menu above to see my open source and school projects. 
            </p>

            <Suspense fallback={<div className="mb-8 h-10" aria-hidden="true" />}>
                <ProjectSearch />
            </Suspense>

            <Suspense fallback={<ProjectCardSkeleton count={2} />}>
                <ProjectResults searchParams={searchParams} />
            </Suspense>
        </section>
    );
}