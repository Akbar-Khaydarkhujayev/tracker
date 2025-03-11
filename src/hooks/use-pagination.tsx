import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function usePagination() {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(16);

    const renderPaginationItems = () => {
        const items = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === page + 1} // Adjusted condition
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(i - 1); // Adjusted setPage
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        isActive={1 === page + 1} // Adjusted condition
                        onClick={(e) => {
                            e.preventDefault();
                            setPage(0); // Adjusted setPage
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (page > 2) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            const startPage = Math.max(2, page - 1);
            const endPage = Math.min(totalPages - 1, page + 3);

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === page + 1} // Adjusted condition
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(i - 1); // Adjusted setPage
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (page < totalPages - 3) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        isActive={totalPages === page + 1} // Adjusted condition
                        onClick={(e) => {
                            e.preventDefault();
                            setPage(totalPages - 1); // Adjusted setPage
                        }}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    const pagination = (
        <Pagination className="my-3">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={(e) => {
                            e.preventDefault();
                            if (page > 0) setPage(page - 1);
                        }}
                    />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <PaginationNext
                        onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages - 1) setPage(page + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );

    return {
        pagination,
        page,
        setPage,
        totalPages,
        setTotalPages,
        limit,
        setLimit,
    };
}
