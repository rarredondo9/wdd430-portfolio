interface ProjectCardSkeletonProps {
    count?: number;
}

export default function ProjectCardSkeleton({ count=-2 }: ProjectCardSkeletonProps) {
    return (
        <div 
        role="status"
        aria-label="Loading projects"
        className="grid animate-pulse gap-4 md:grid-cols-2"
        >
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="space-y-3 rounded border-1-4 border-rose-200 bg-white p-4">
                    <div className="h-6 w-2/3 rounded bg-stone-200" />
                    <div className="h-4 w-full rounded bg-stone-200" />
                    <div className="h-4 w-5/6 rounded bg-stone-200" />
                    <div className="h-3 w-1/2 rounded bg-stone-200" />
                </div>
            ))}
        </div>
    );
}