import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

export default function Loading() {
    return (
        <section className="animate-pulse">
            <div className="mb-4 h-9 w-2/3 rounded bg-stone-200" />
            <div className="mb-10 space-y-2">
                <div className="h-4 w-full rounded bg-stone-200" />
                <div className="h-4 w-4/5 rounded bg-stone-200" />
            </div>
            <ProjectCardSkeleton count={1} />
        </section>
    );
}