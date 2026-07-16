import { useMemo, useState } from "react";
import styled from "styled-components";
import { CheckboxControl } from "@/components/Checkbox/Box/Checkbox";
import { Icon } from "@/components/Icon/Icon";
import { Table, Tbody, Td, Th, Thead } from "@/styles/Common";

const TableScroll = styled.div`
    width: 100%;
    max-height: ${({ $maxHeight }) => $maxHeight ?? "none"};
    overflow-x: auto;
    overflow-y: auto;
`;

const DataTable = styled(Table)`
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    border-top: 0;
    width: max-content;
    min-width: 100%;
`;

const Head = styled(Thead)`
    border-bottom: none;
`;

const HeaderCell = styled(Th)`
    position: sticky;
    top: 0;
    z-index: ${({ $fixed }) => ($fixed ? 4 : 3)};
    ${({ $fixed, $left }) => $fixed && `left: ${$left}px;`}
    box-sizing: border-box;
    height: 32px;
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[12]};
    background: ${({ theme }) => theme.color.pure.white};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
    letter-spacing: 0;
    white-space: nowrap;
    vertical-align: middle;
    border-bottom: 0;
    box-shadow:
        inset 0 1px ${({ theme }) => theme.color.neutral[900]},
        inset 0 -1px ${({ theme }) => theme.color.neutral[300]};
    border-right: 0;
`;

const BodyRow = styled.tr`
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

const BodyCell = styled(Td)`
    ${({ $fixed, $left }) =>
        $fixed &&
        `
            position: sticky;
            left: ${$left}px;
            z-index: 2;
        `}
    box-sizing: border-box;
    height: 36px;
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[12]};
    background: ${({ theme, $selected }) => ($selected ? theme.color.secondary[100] : theme.color.pure.white)};
    color: ${({ theme }) => theme.color.neutral[800]};
    font-size: ${({ theme }) => theme.font.size.primary};
    line-height: 24px;
    letter-spacing: 0;
    white-space: nowrap;
    vertical-align: middle;
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-right: ${({ $columnLine, $fixed, $lastFixed, theme }) => ($columnLine && (!$fixed || $lastFixed) ? `1px solid ${theme.color.neutral[300]}` : "0")};

    ${BodyRow}:hover & {
        background: ${({ theme }) => theme.color.secondary[100]};
    }

    ${({ $fixedDivider, theme }) =>
        $fixedDivider &&
        `
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 1px;
                height: 100%;
                background: ${theme.color.neutral[300]};
                pointer-events: none;
            }
        `}
`;

const TableIconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${({ theme }) => theme.icon.primary};
    height: ${({ theme }) => theme.icon.primary};
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: 2px;
        border-radius: ${({ theme }) => theme.border.radius.xsmall};
    }
`;

const CellInner = styled.div`
    width: 100%;
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: ${({ $align }) => ($align === "left" ? "flex-start" : $align === "right" ? "flex-end" : "center")};
`;

function normalizeSelectedRows(selectedRows) {
    if (!selectedRows) return [];
    if (selectedRows instanceof Set) return [...selectedRows];
    return selectedRows;
}

function getRowId(row, rowIndex, rowKey) {
    if (typeof rowKey === "function") return rowKey(row, rowIndex);
    return row[rowKey] ?? rowIndex;
}

function getColumnPixelWidth(column) {
    return Number.parseInt(column.width ?? column.minWidth, 10) || 0;
}

function getFixedColumnMap(columns, fixedColumns) {
    if (!fixedColumns) return {};

    let left = 0;

    return columns.reduce((map, column, index) => {
        if (!column.fixed) return map;

        map[column.key] = {
            left,
            divider: left > 0,
            last: !columns[index + 1]?.fixed,
        };
        left += getColumnPixelWidth(column);

        return map;
    }, {});
}

function TableBody({
    columns = [],
    rows = [],
    rowKey = "id",
    selectedRowIds,
    defaultSelectedRowIds,
    onSelectedRowIdsChange,
    onRowClick,
    isRowClickable,
    selectOnRowClick = true,
    fixedColumns = false,
    columnLine = fixedColumns,
    maxHeight = "392px",
    topBorder = false,
}) {
    const defaultRows = useMemo(() => defaultSelectedRowIds ?? rows.filter((row) => row.checked).map((row, rowIndex) => getRowId(row, rowIndex, rowKey)), [defaultSelectedRowIds, rowKey, rows]);
    const [internalSelectedRows, setInternalSelectedRows] = useState(defaultRows);
    const selectedRows = selectedRowIds ?? internalSelectedRows;
    const selectedRowSet = useMemo(() => new Set(normalizeSelectedRows(selectedRows)), [selectedRows]);
    const fixedColumnMap = useMemo(() => getFixedColumnMap(columns, fixedColumns), [columns, fixedColumns]);
    const selectableRowIds = useMemo(() => rows.filter((row) => !row.disabled).map((row, rowIndex) => getRowId(row, rowIndex, rowKey)), [rowKey, rows]);
    const allSelected = selectableRowIds.length > 0 && selectableRowIds.every((rowId) => selectedRowSet.has(rowId));
    const partiallySelected = selectableRowIds.some((rowId) => selectedRowSet.has(rowId)) && !allSelected;

    const updateSelectedRows = (nextSelectedRows, meta) => {
        if (selectedRowIds == null) setInternalSelectedRows(nextSelectedRows);
        onSelectedRowIdsChange?.(nextSelectedRows, meta);
    };

    const toggleAllRows = () => {
        const nextSelectedRowSet = new Set(selectedRowSet);

        if (allSelected) {
            selectableRowIds.forEach((rowId) => nextSelectedRowSet.delete(rowId));
        } else {
            selectableRowIds.forEach((rowId) => nextSelectedRowSet.add(rowId));
        }

        updateSelectedRows([...nextSelectedRowSet], { type: "all", checked: !allSelected });
    };

    const toggleRow = (row, rowIndex) => {
        if (row.disabled) return;

        const rowId = getRowId(row, rowIndex, rowKey);
        const nextSelectedRowSet = new Set(selectedRowSet);
        const checked = !nextSelectedRowSet.has(rowId);

        if (checked) {
            nextSelectedRowSet.add(rowId);
        } else {
            nextSelectedRowSet.delete(rowId);
        }

        updateSelectedRows([...nextSelectedRowSet], { type: "row", row, rowId, checked });
    };

    const selectRow = (row, rowIndex) => {
        if (row.disabled) return;

        const rowId = getRowId(row, rowIndex, rowKey);
        if (selectedRowSet.has(rowId)) return;

        updateSelectedRows([...selectedRowSet, rowId], { type: "row-click", row, rowId, checked: true });
    };

    const renderHeaderCell = (column) => {
        if (column.headerRender) return column.headerRender(column);

        if (column.type === "check") {
            return <CheckboxControl checked={allSelected} indeterminate={partiallySelected} disabled={!selectableRowIds.length} size="medium" aria-label={allSelected ? "전체 선택 해제" : "전체 선택"} onChange={toggleAllRows} />;
        }

        return column.label;
    };

    const renderCell = (row, rowIndex, column) => {
        if (column.render) return column.render(row[column.key], row, column);

        if (column.type === "check") {
            const rowId = getRowId(row, rowIndex, rowKey);
            const selected = selectedRowSet.has(rowId);

            return <CheckboxControl checked={selected} disabled={row.disabled} size="medium" aria-label={selected ? "선택 해제" : "선택"} onChange={() => toggleRow(row, rowIndex)} />;
        }

        if (column.type === "icon") {
            return (
                <TableIconButton
                    type="button"
                    aria-label={column.ariaLabel ?? column.label}
                    onClick={(event) => {
                        event.stopPropagation();
                        column.onClick?.(row, column, event);
                    }}
                >
                    <Icon name={column.iconName} size="primary" />
                </TableIconButton>
            );
        }

        return row[column.key];
    };

    return (
        <TableScroll $maxHeight={maxHeight} $topBorder={topBorder}>
            <DataTable>
                <colgroup>
                    {columns.map((column) => (
                        <col key={column.key} style={{ width: column.width, minWidth: column.minWidth }} />
                    ))}
                </colgroup>
                <Head>
                    <tr>
                        {columns.map((column) => {
                            const fixed = fixedColumnMap[column.key];

                            return (
                                <HeaderCell key={column.key} $align={column.headerAlign ?? column.align} $fixed={Boolean(fixed)} $left={fixed?.left}>
                                    <CellInner $align={column.headerAlign ?? column.align}>{renderHeaderCell(column)}</CellInner>
                                </HeaderCell>
                            );
                        })}
                    </tr>
                </Head>
                <Tbody>
                    {rows.map((row, rowIndex) => {
                        const rowId = getRowId(row, rowIndex, rowKey);
                        const selected = selectedRowSet.has(rowId);
                        const selectableOnRowClick = selectOnRowClick && !row.disabled;
                        const rowClickable = (Boolean(onRowClick) || selectableOnRowClick) && (isRowClickable ? isRowClickable(row, rowIndex) : true);

                        const handleRowClick = (event) => {
                            if (selectableOnRowClick) selectRow(row, rowIndex);
                            onRowClick?.(row, rowIndex, event);
                        };

                        return (
                            <BodyRow key={rowId} $clickable={rowClickable} aria-selected={selected} onClick={rowClickable ? handleRowClick : undefined}>
                                {columns.map((column) => {
                                    const fixed = fixedColumnMap[column.key];

                                    return (
                                        <BodyCell key={column.key} $selected={selected} $align={column.align} $fixed={Boolean(fixed)} $left={fixed?.left} $lastFixed={fixed?.last} $fixedDivider={fixed?.divider} $columnLine={columnLine}>
                                            <CellInner $align={column.align}>{renderCell(row, rowIndex, column)}</CellInner>
                                        </BodyCell>
                                    );
                                })}
                            </BodyRow>
                        );
                    })}
                </Tbody>
            </DataTable>
        </TableScroll>
    );
}

export default TableBody;
