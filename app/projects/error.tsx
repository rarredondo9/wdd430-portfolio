'use client';

import Link from "next/link";
import { useEffect } from "react";

export default function ProjectsError({
    error,
    reset,
}:{
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('An uncaught error occured:', error);
    }, [error]);

    return (
        <div className="mx-auto mt-16 max-w-xl rounded-lg border border-rose-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-stone-900"> Something went worng!</h1>
            <p className="mt-3 text-stone-700">An unexpected error ocurred. Please try again later.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={reset}
                    className="rounded-md bg-rose-700 px-4 py-2 font-semibold text-white hover:bg-rose-800">
                        Try Again
                </button>
                <Link 
                    href="/projects"
                    className="rounded-md bg-rose-300 px-4 py-2 font-semibold text-rose-700 hover:bg-rose-50">
                        Go Back to Projects
                    </Link>
            </div>
        </div>
    );
}