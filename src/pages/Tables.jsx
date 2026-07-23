import styled from "styled-components";
import { Page, Column, Section, Table, Tbody, Td, Th, Thead } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import TableHeaderGuide from "@/components/Table/TableHeaderGuide";
import TableContents from "@/components/Table/TableContents";
import Tooltip from "@/components/Tooltip/Tooltip";

const TooltipExampleTable = styled(Table)`
    table-layout: fixed;
    border-top: 0;
`;

const TooltipHeaderCell = styled(Th)`
    height: 36px;
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[12]};
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[400]};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
`;

const TooltipBodyCell = styled(Td)`
    position: relative;
    height: 50px;
    padding: 0;
    color: ${({ theme }) => theme.color.neutral[800]};
    font-size: ${({ theme }) => theme.font.size.primary};
    line-height: 24px;
    overflow: visible;

    &:hover,
    &:focus-within {
        z-index: 2;
    }
`;

const CellTooltip = styled(Tooltip)`
    width: 100%;
    min-height: 50px;
    align-self: stretch;
    align-items: center;
    justify-content: center;
`;

const TooltipCellValue = styled.span`
    width: 100%;
    min-height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: help;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: -2px;
    }
`;

const tooltipTitle = "툴팁제목입니다툴팁제목입니다";
const tooltipContent = "툴팁입니다툴팁입니다툴팁입니다툴팁입니다툴팁입니다툴팁입니다";
const tooltipColumns = [
    { key: "first", label: "title" },
    { key: "second", label: "title" },
    { key: "third", label: "title" },
    { key: "fourth", label: "title" },
];
const tooltipRows = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    first: "가나다",
    second: "가나다",
    third: "가나다",
    fourth: index + 1,
}));

const Tables = () => {
    return (
        <Page>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Header
                </Heading>
                <Column $mt={40}>
                    <TableHeaderGuide />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Contents
                </Heading>
                <Column $mt={40}>
                    <TableContents />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Tooltip
                </Heading>
                <Column $mt={40}>
                    <TooltipExampleTable>
                        <colgroup>
                            {tooltipColumns.map((column) => (
                                <col key={column.key} style={{ width: "25%" }} />
                            ))}
                        </colgroup>
                        <Thead>
                            <tr>
                                {tooltipColumns.map((column) => (
                                    <TooltipHeaderCell key={column.key}>{column.label}</TooltipHeaderCell>
                                ))}
                            </tr>
                        </Thead>
                        <Tbody>
                            {tooltipRows.map((row) => (
                                <tr key={row.id}>
                                    {tooltipColumns.map((column) => (
                                        <TooltipBodyCell key={column.key} $align="center">
                                            <CellTooltip title={tooltipTitle} content={tooltipContent} placement="bottom" maxWidth="240px">
                                                <TooltipCellValue tabIndex={0} aria-label={`${row[column.key]} 툴팁 보기`}>
                                                    {row[column.key]}
                                                </TooltipCellValue>
                                            </CellTooltip>
                                        </TooltipBodyCell>
                                    ))}
                                </tr>
                            ))}
                        </Tbody>
                    </TooltipExampleTable>
                </Column>
            </Section>
        </Page>
    );
};

export default Tables;
