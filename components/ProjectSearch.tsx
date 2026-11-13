'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="mb-8">
            <label htmlFor="project-search" className="sr-only">
                Search projects
            </label>
            <input 
                id="project-search"
                type="search"
                placeholder="Search projects by title, description, or technology..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-md border border-rose-200 bg-white px-4 py-2 text-stone-900 placeholder:text-stone-500 focus:border-rode-400 focus:outline-none focus:ring-rose-200"
                />
        </div>
    );
}