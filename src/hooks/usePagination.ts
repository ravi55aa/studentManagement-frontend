import { FetchFn, TPaginationState } from "@/types/paginationTypes";
import { useState } from "react";

export function usePagination(fetchFn: FetchFn, limit: number = 10) {
    const [pagination, setPagination] = useState<TPaginationState>({
        page: 1,
        total: 0,
        totalPages: 0,
    });

    const goToPage = async (newPage: number) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;

        setPagination((prev) => ({ ...prev, page: newPage }));
        await fetchFn({ page: newPage, limit }); // always correct page
    };

    const nextPage = () => goToPage(pagination.page + 1);
    const prevPage = () => goToPage(pagination.page - 1);

    return {
        pagination,
        setPagination, // use this when API returns total, totalPages
        nextPage,
        prevPage,
    };
}