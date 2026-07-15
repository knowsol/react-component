import { useMemo, useState } from "react";
import styled from "styled-components";
import Dropbox from "@/components/Dropbox/Dropbox";
import { Icon } from "@/components/Icon/Icon";

const resolveColorToken = (theme, colorToken) => colorToken?.split(".").reduce((color, key) => color?.[key], theme.color);

const PaginationBar = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing[24]};
    padding-top: ${({ theme }) => theme.spacing[12]};
`;

const PageSize = styled.div`
    width: fit-content;
    max-width: 120px;
    height: 28px;
`;

const PageSizeTrigger = styled.button`
    width: 100%;
    height: 100%;
    min-height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.spacing[8]};
    padding: 0 ${({ theme }) => theme.spacing[8]} 0 ${({ theme }) => theme.spacing[12]};
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    background: ${({ theme }) => theme.color.pure.white};
    color: ${({ theme }) => theme.color.neutral[800]};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 20px;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: 2px;
    }
`;

const Controls = styled.nav`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[4]};
`;

const PageButton = styled.button`
    position: relative;
    min-width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${({ theme }) => theme.spacing[4]};
    border: 0;
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    background: transparent;
    color: ${({ theme, $active, $activeColorToken }) =>
        $active ? (resolveColorToken(theme, $activeColorToken) ?? theme.color.secondary[500]) : theme.color.neutral[500]};
    font-size: ${({ theme }) => theme.font.size.primary};
    line-height: 18px;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: transparent;
        pointer-events: none;
    }

    &:hover::after,
    &:focus-visible::after,
    &:active::after {
        background: rgba(0, 0, 0, 0.2);
    }

    &:disabled::after {
        background: transparent;
    }

    &:disabled {
        opacity: 0.45;
    }
`;

const PageButtonContent = styled.span`
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const getPageSizeLabel = (size) => `${size}개씩`;

const getVisiblePages = ({ currentPage, pageCount, maxPageButtons }) => {
    const visibleCount = Math.min(pageCount, maxPageButtons);
    const halfCount = Math.floor(visibleCount / 2);
    const startPage = Math.min(Math.max(1, currentPage - halfCount), Math.max(1, pageCount - visibleCount + 1));

    return Array.from({ length: visibleCount }, (_, index) => startPage + index);
};

const clampPage = (page, pageCount) => Math.min(pageCount, Math.max(1, page));

function ArrowButton({ type, disabled, onClick }) {
    const iconName = {
        first: "first_page",
        prev: "prev_page",
        next: "next_page",
        last: "last_page",
    }[type];
    const label = {
        first: "첫 페이지",
        prev: "이전 페이지",
        next: "다음 페이지",
        last: "마지막 페이지",
    }[type];

    return (
        <PageButton type="button" disabled={disabled} aria-label={label} onClick={onClick}>
            <PageButtonContent>
                <Icon name={iconName} size="primary" />
            </PageButtonContent>
        </PageButton>
    );
}

function Pagination({
    page,
    defaultPage = 1,
    pageSize,
    defaultPageSize = 100,
    pageSizeOptions = [10, 50, 100, 1000],
    totalCount,
    totalPages,
    maxPageButtons = 10,
    showPageSize = true,
    showFirstLast = true,
    activeColorToken,
    pageSizeSelectedColorToken,
    ariaLabel = "pagination",
    onPageChange,
    onPageSizeChange,
    onChange,
}) {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
    const currentPageSize = pageSize ?? internalPageSize;
    const numericTotalCount = Number(totalCount);
    const rawPageCount = totalPages ?? (Number.isFinite(numericTotalCount) ? Math.ceil(numericTotalCount / currentPageSize) : 1);
    const pageCount = Math.max(1, rawPageCount);
    const currentPage = clampPage(page ?? internalPage, pageCount);
    const pages = useMemo(() => getVisiblePages({ currentPage, pageCount, maxPageButtons }), [currentPage, pageCount, maxPageButtons]);
    const pageSizeItems = pageSizeOptions.map((size) => ({ label: getPageSizeLabel(size), value: size }));
    const currentPageSizeLabel = getPageSizeLabel(currentPageSize);

    const changePage = (nextPage) => {
        const safePage = clampPage(nextPage, pageCount);

        if (page == null) setInternalPage(safePage);
        onPageChange?.(safePage);
        onChange?.({ page: safePage, pageSize: currentPageSize });
    };

    const changePageSize = (nextSize) => {
        if (!Number.isFinite(nextSize)) return;

        if (pageSize == null) setInternalPageSize(nextSize);
        if (page == null) setInternalPage(1);
        onPageSizeChange?.(nextSize);
        onPageChange?.(1);
        onChange?.({ page: 1, pageSize: nextSize });
    };

    return (
        <PaginationBar>
            {showPageSize ? (
                <PageSize>
                    <Dropbox
                        value={currentPageSize}
                        options={pageSizeItems}
                        dropUp
                        triggerFullWidth
                        selectedColorToken={pageSizeSelectedColorToken}
                        onSelect={changePageSize}
                        trigger={(open, selectedLabel) => (
                            <PageSizeTrigger type="button" aria-expanded={open}>
                                {selectedLabel || currentPageSizeLabel}
                                <Icon name="down" size="24px" />
                            </PageSizeTrigger>
                        )}
                    />
                </PageSize>
            ) : (
                <span />
            )}
            <Controls aria-label={ariaLabel}>
                {showFirstLast && <ArrowButton type="first" disabled={currentPage === 1} onClick={() => changePage(1)} />}
                <ArrowButton type="prev" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} />
                {pages.map((pageNumber) => {
                    const active = pageNumber === currentPage;

                    return (
                        <PageButton
                            key={pageNumber}
                            type="button"
                            $active={active}
                            $activeColorToken={activeColorToken}
                            aria-current={active ? "page" : undefined}
                            onClick={() => changePage(pageNumber)}
                        >
                            <PageButtonContent>{pageNumber}</PageButtonContent>
                        </PageButton>
                    );
                })}
                <ArrowButton type="next" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} />
                {showFirstLast && <ArrowButton type="last" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)} />}
            </Controls>
            <span />
        </PaginationBar>
    );
}

export default Pagination;
