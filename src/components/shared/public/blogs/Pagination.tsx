"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center space-x-4">
            <button
                disabled={currentPage <= 1}
                onClick={() => changePage(currentPage - 1)}
                className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-foreground">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage >= totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="px-4 py-2 bg-accent text-white rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};
