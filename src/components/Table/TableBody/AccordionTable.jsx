import { Fragment, useId, useState } from "react";
import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import { Table, Tbody, Td, Th, Thead } from "@/styles/Common";

const AccordionTableElement = styled(Table)`
    table-layout: fixed;
`;

const AccordionHeaderCell = styled(Th)`
    box-sizing: border-box;
    height: 32px;
    padding: ${({ $toggle, theme }) => ($toggle ? 0 : `${theme.spacing[8]} ${theme.spacing[12]}`)};
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[300]};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
    letter-spacing: 0;
`;

const AccordionRow = styled.tr`
    cursor: pointer;

    &:hover > td,
    &:focus-within > td {
        background: ${({ theme }) => theme.color.secondary[100]};
    }
`;

const AccordionCell = styled(Td)`
    box-sizing: border-box;
    height: 50px;
    padding: ${({ $toggle, theme }) => ($toggle ? 0 : `${theme.spacing[8]} ${theme.spacing[12]}`)};
    color: ${({ theme }) => theme.color.neutral[800]};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 24px;
    letter-spacing: 0;
    text-align: ${({ $toggle }) => ($toggle ? "center" : "left")};
    transition: background-color 0.15s ease;
`;

const AccordionToggle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: inherit;
    text-align: left;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: 2px;
        border-radius: ${({ theme }) => theme.border.radius.xsmall};
    }
`;

const ArrowDownIcon = styled(Icon)`
    transform: rotate(${({ $expanded }) => ($expanded ? "180deg" : "0deg")});
    transition: transform 0.25s ease;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

const AccordionDetailCell = styled(Td)`
    height: 0;
    padding: 0;
    border-bottom: ${({ $expanded, theme }) => ($expanded ? `1px solid ${theme.color.neutral[300]}` : "0")};
    background: ${({ theme }) => theme.color.neutral[50]};
    color: ${({ theme }) => theme.color.neutral[800]};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    text-align: left;
`;

const DetailTransition = styled.div`
    display: grid;
    grid-template-rows: ${({ $expanded }) => ($expanded ? "1fr" : "0fr")};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    transition:
        grid-template-rows 0.25s ease,
        opacity 0.2s ease;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

const DetailOverflow = styled.div`
    min-height: 0;
    overflow: hidden;
`;

const DetailContent = styled.div`
    padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[16]} calc(var(--accordion-toggle-width) + ${({ theme }) => theme.spacing[12]});
`;

const DetailList = styled.ol`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    margin: 0;
    padding-left: ${({ theme }) => theme.spacing[20]};
    color: ${({ theme }) => theme.color.neutral[800]};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 24px;
`;

function AccordionTable({ columns = [], rows = [], rowKey = "id", defaultExpandedRowId }) {
    const accordionId = useId();
    const [expandedRowId, setExpandedRowId] = useState(defaultExpandedRowId ?? null);
    const toggleColumnWidth = columns.find((column) => column.type === "toggle")?.width ?? "60px";

    const toggleRow = (rowId) => {
        setExpandedRowId((currentRowId) => (currentRowId === rowId ? null : rowId));
    };

    return (
        <AccordionTableElement style={{ "--accordion-toggle-width": toggleColumnWidth }}>
            <colgroup>
                {columns.map((column) => (
                    <col key={column.key} style={{ width: column.width }} />
                ))}
            </colgroup>
            <Thead>
                <tr>
                    {columns.map((column) => {
                        const toggleColumn = column.type === "toggle";

                        return (
                            <AccordionHeaderCell key={column.key} $toggle={toggleColumn} $align={toggleColumn ? "center" : "left"} aria-label={toggleColumn ? "열기/닫기" : undefined}>
                                {column.label}
                            </AccordionHeaderCell>
                        );
                    })}
                </tr>
            </Thead>
            <Tbody>
                {rows.map((row, rowIndex) => {
                    const rowId = row[rowKey] ?? rowIndex;
                    const rowLabel = row.ariaLabel ?? row.category ?? rowId;
                    const expanded = expandedRowId === rowId;
                    const detailId = `${accordionId}-detail-${rowId}`;

                    return (
                        <Fragment key={rowId}>
                            <AccordionRow onClick={() => toggleRow(rowId)}>
                                {columns.map((column) => {
                                    const toggleColumn = column.type === "toggle";

                                    return (
                                        <AccordionCell key={column.key} $toggle={toggleColumn}>
                                            {toggleColumn ? (
                                                <AccordionToggle
                                                    type="button"
                                                    aria-label={`${rowLabel} ${expanded ? "접기" : "펼치기"}`}
                                                    aria-expanded={expanded}
                                                    aria-controls={detailId}
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        toggleRow(rowId);
                                                    }}
                                                >
                                                    <ArrowDownIcon name="down" size="24px" $expanded={expanded} />
                                                </AccordionToggle>
                                            ) : (
                                                row[column.key]
                                            )}
                                        </AccordionCell>
                                    );
                                })}
                            </AccordionRow>
                            <tr aria-hidden={!expanded}>
                                <AccordionDetailCell colSpan={columns.length} $expanded={expanded}>
                                    <DetailTransition $expanded={expanded}>
                                        <DetailOverflow>
                                            <DetailContent id={detailId} role="region" aria-label={`${rowLabel} 상세 내용`}>
                                                <DetailList>
                                                    {row.details?.map((detail, detailIndex) => (
                                                        <li key={`${rowId}-${detailIndex}`}>{detail}</li>
                                                    ))}
                                                </DetailList>
                                            </DetailContent>
                                        </DetailOverflow>
                                    </DetailTransition>
                                </AccordionDetailCell>
                            </tr>
                        </Fragment>
                    );
                })}
            </Tbody>
        </AccordionTableElement>
    );
}

export default AccordionTable;
