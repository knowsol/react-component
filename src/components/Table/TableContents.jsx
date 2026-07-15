import styled from "styled-components";
import Box from "@/components/Box/Box";
import PaginatedTableContent from "./PaginatedTableContent";
import TableContent from "./TableBody/TableContent";
import TableHeaderSection from "./TableHeader/TableHeaderSection";
import { emptyTableRows, tableContentColumns, tableContentRows } from "./TableBody/tableContentData";

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[48]};
`;

const TableBlock = styled.div`
    min-width: 0;
`;

function TableContents() {
    return (
        <Box variant="outline" padding="32px 56px">
            <ContentWrap>
                <TableBlock>
                    <TableHeaderSection title="데이터가 없는 경우" compact />
                    <TableContent columns={tableContentColumns} rows={emptyTableRows} />
                </TableBlock>
                <TableBlock>
                    <TableHeaderSection title="데이터가 있는 경우" compact />
                    <PaginatedTableContent columns={tableContentColumns} rows={tableContentRows} />
                </TableBlock>
                <TableBlock>
                    <TableHeaderSection title="열고정 테이블" compact />
                    <PaginatedTableContent columns={tableContentColumns} rows={tableContentRows} fixedColumns />
                </TableBlock>
            </ContentWrap>
        </Box>
    );
}

export default TableContents;
