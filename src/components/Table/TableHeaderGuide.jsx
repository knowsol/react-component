import { useState } from "react";
import styled from "styled-components";
import Box from "@/components/Box/Box";
import { Icon } from "@/components/Icon/Icon";
import { RowCenter, FormItemsRow } from "@/styles/Common";
import { tableHeaderData } from "./TableHeader/tableHeaderData";
import SearchFilter from "../SearchFilter/SearchFilter";
import BookmarkButton from "./TableHeader/BookmarkButton";
import TableHeaderSection from "./TableHeader/TableHeaderSection";

const HeaderCard = styled.div`
    display: grid;
    grid-template-columns: minmax(80px, 0.06fr) minmax(0, 1fr);
    min-height: 360px;
`;

const CardLabel = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.secondary.c50};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    padding: 10px;
    border-radius: ${({ theme }) => theme.border.radius.large} 0 0 ${({ theme }) => theme.border.radius.large};
`;

const CardContainer = styled.div`
    min-width: 0;
    padding: ${({ theme }) => theme.spacing[32]} ${({ theme }) => theme.spacing[56]};
    background-color: ${({ theme }) => theme.color.pure.white};
`;

const HeaderPreview = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[24]};
`;

const PageTitle = styled.h5`
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 24px;
`;

const Breadcrumbs = styled.nav`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    min-height: 24px;
`;

const Breadcrumb = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;

    & + &::before {
        content: "";
        width: ${({ theme }) => theme.icon.xsmall};
        height: ${({ theme }) => theme.icon.xsmall};
        background-color: ${({ theme }) => theme.color.neutral[600]};
        mask: url("/assets/icons/arrow_right.svg") center / contain no-repeat;
        -webkit-mask: url("/assets/icons/arrow_right.svg") center / contain no-repeat;
    }
`;

const ApprovalLine = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    width: 520px;
    min-height: 42px;
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[800]};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 24px;
    cursor: pointer;
    user-select: none;
`;

function TableHeaderGuide() {
    const [approvalChecked, setApprovalChecked] = useState(tableHeaderData.approvalLine.checked);

    return (
        <>
            <Box variant="outline">
                <HeaderCard>
                    <CardLabel>Basic</CardLabel>
                    <CardContainer>
                        <HeaderPreview>
                            <FormItemsRow $gap={24} $justify="space-between">
                                <RowCenter $gap={4}>
                                    <PageTitle>{tableHeaderData.pageTitle}</PageTitle>
                                    <BookmarkButton defaultActive={tableHeaderData.bookmarked} />
                                </RowCenter>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Icon name="home" size="xsmall" />
                                    {tableHeaderData.breadcrumbs.map((breadcrumb, index) => (
                                        <Breadcrumb key={`${breadcrumb}-${index}`}>{breadcrumb}</Breadcrumb>
                                    ))}
                                </Breadcrumbs>
                            </FormItemsRow>

                            {tableHeaderData.rows.map((row) => (
                                <TableHeaderSection key={row.title} {...row} />
                            ))}

                            <ApprovalLine onClick={() => setApprovalChecked((current) => !current)}>
                                <Icon name={approvalChecked ? "chkbx" : "unChkbx"} size="medium" />
                                {tableHeaderData.approvalLine.label}
                            </ApprovalLine>
                        </HeaderPreview>
                    </CardContainer>
                </HeaderCard>
            </Box>
            <Box variant="outline">
                <HeaderCard>
                    <CardLabel>검색영역이 있을 경우</CardLabel>
                    <CardContainer>
                        <SearchFilter />
                    </CardContainer>
                </HeaderCard>
            </Box>
        </>
    );
}

export default TableHeaderGuide;
