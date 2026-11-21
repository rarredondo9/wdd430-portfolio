import { Suspense } from "react";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectResults from "@/components/ProjectResults";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import Link from "next/link";

export default function ProjecsOverview({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) {
    return ( 
        <section>
            <h1 className="text-3xl fotn-bold mb-4">Projects Overview</h1>
            <Link 
             href="/projects/create"
             className="mb-6 inline-block roundedn-md bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-800">
                +Add Project
             </Link>
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