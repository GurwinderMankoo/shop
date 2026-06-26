"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    currentPage: number;
    totalPages: number;
};

export default function CustomPagination({ currentPage, totalPages }: Props) {
    const router = useRouter();

    const searchParams = useSearchParams();


    const navigateTo = (page: number) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", String(page));

        router.push(`/products?${params.toString()}`);
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && navigateTo(currentPage - 1)}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            onClick={() => navigateTo(page)}
                            isActive={page === currentPage}
                            className="cursor-pointer"
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => currentPage < totalPages && navigateTo(currentPage + 1)}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}