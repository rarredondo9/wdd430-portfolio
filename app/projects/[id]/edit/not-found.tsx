import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto mt-16 max-w-xl rounded-lg border border-rose-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-stone-900">Project Not Found</h1>
            <p className="mt-3 text-stone-700">The project you are looking for does not exist.</p>
            <div className="mt-6 flex justify-center">
                <Link 
                    href="/projects"
                    className="rounded-md border border-rose-300 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-50">
                        Back to Projects
                    </Link>
            </div>
        </div>
    );
}