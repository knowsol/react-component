import { useMemo, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import TableContent from "./TableBody/TableContent";

function PaginatedTableContent({
    rows = [],
    defaultPage = 1,
    defaultPageSize = 10,
    pageSizeOptions = [10, 50, 100, 1000],
    paginationProps = {},
    ...tableContentProps
}) {
    const [pagination, setPagination] = useState({
        page: defaultPage,
        pageSize: defaultPageSize,
    });
    const totalCount = rows.length;
    const pageCount = Math.max(1, Math.ceil(totalCount / pagination.pageSize));
    const currentPage = Math.min(pagination.page, pageCount);
    const currentRows = useMemo(() => {
        const startIndex = (currentPage - 1) * pagination.pageSize;

        return rows.slice(startIndex, startIndex + pagination.pageSize);
    }, [currentPage, pagination.pageSize, rows]);

    const handlePaginationChange = (nextPagination) => {
        setPagination(nextPagination);
        paginationProps.onChange?.(nextPagination);
    };

    return (
        <>
            <TableContent {...tableContentProps} rows={currentRows} />
            {totalCount > 0 && (
                <Pagination
                    {...paginationProps}
                    page={currentPage}
                    pageSize={pagination.pageSize}
                    pageSizeOptions={pageSizeOptions}
                    totalCount={totalCount}
                    onChange={handlePaginationChange}
                />
            )}
        </>
    );
}

export default PaginatedTableContent;
