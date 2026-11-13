'use client';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(pageNumber: number): string {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-6">
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className="font-semibold text-rose-700 hover:underline">
                    ← Previous
                </Link>
            ) : (
                <span aria-disabled="true" className="text-stone-400">← Previous</span> 
            )}

            <span className="text-stone-700">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className="font-semibold text-rose-700 hover:underline">
                Next →
                </Link>
            ): (
                <span aria-disabled="true" className="text-stone-400">Next →</span>
            )}
        </nav>
    );
}