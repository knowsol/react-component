import { useState } from "react";
import styled from "styled-components";
import Gnb from "@/components/GNB/GNB";
import { IconSidebar } from "@/components/Sidebar";
import LayerPopup from "@/components/LayerPopup/LayerPopup";
import { layerPopData } from "@/components/LayerPopup/layerPopData";
import { sidebarLayerPopupProps } from "@/components/LayerPopup/sidebarLayerPopupData";
import SidebarLayerPopupContent from "@/components/LayerPopup/SidebarLayerPopupContent";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import Pagination from "@/components/Pagination/Pagination";
import TableContent from "@/components/Table/TableBody/TableContent";
import { tableContentColumns, tableContentRows, tableContentTotalCount } from "@/components/Table/TableBody/tableContentData";
import { tableHeaderData } from "@/components/Table/tableData";
import BookmarkButton from "@/components/Table/TableHeader/BookmarkButton";
import TableHeaderSection from "@/components/Table/TableHeader/TableHeaderSection";
import { Icon } from "@/components/Icon/Icon";

const AdminRoot = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.color.neutral[50]};
`;

const AdminBody = styled.div`
    flex: 1 1 auto;
    display: flex;
    min-height: 0;
`;

const ContentArea = styled.main`
    flex: 1 1 auto;
    min-width: 0;
    padding: 28px 32px 40px;
    background: ${({ theme }) => theme.color.pure.white};
    border-top-left-radius: 32px;
`;

const ContentHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[24]};
    margin-bottom: ${({ theme }) => theme.spacing[24]};
`;

const PageTitle = styled.h1`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 26px;
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

const Stack = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[8]};
`;

const ScrollBlock = styled.div`
    min-width: 0;
    overflow-x: auto;
`;

const adminTableHeader = tableHeaderData.rows[0];
const resultTableHeaderData = tableHeaderData.rows[2];
const confirmLayerPopup = layerPopData.find((popup) => popup.id === "confirm");

function Admin() {
    const [sidebarPopupOpen, setSidebarPopupOpen] = useState(false);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const closeSidebarPopup = () => setSidebarPopupOpen(false);
    const closeConfirmPopup = () => setConfirmPopupOpen(false);
    const resultTableHeader = {
        ...resultTableHeaderData,
        title: "검색결과",
        actions: resultTableHeaderData.actions.map((action, index) =>
            index === 0
                ? {
                      ...action,
                      ariaLabel: "검색결과 알림 열기",
                      onClick: () => setConfirmPopupOpen(true),
                  }
                : action,
        ),
    };

    return (
        <>
            <AdminRoot>
                <Gnb />
                <AdminBody>
                    <IconSidebar />
                    <ContentArea>
                        <ContentHeader>
                            <PageTitle>
                                {tableHeaderData.pageTitle}
                                <BookmarkButton defaultActive={tableHeaderData.bookmarked} />
                            </PageTitle>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Icon name="home" size="xsmall" />
                                {tableHeaderData.breadcrumbs.map((breadcrumb, index) => (
                                    <Breadcrumb key={`${breadcrumb}-${index}`}>{breadcrumb}</Breadcrumb>
                                ))}
                            </Breadcrumbs>
                        </ContentHeader>
                        <Stack>
                            <TableHeaderSection {...adminTableHeader} compact />
                            <ScrollBlock>
                                <SearchFilter />
                            </ScrollBlock>
                            <TableHeaderSection {...resultTableHeader} compact />
                            <TableContent columns={tableContentColumns} rows={tableContentRows} topBorder selectOnRowClick isRowClickable={(_, rowIndex) => rowIndex === 0} onRowClick={() => setSidebarPopupOpen(true)} />
                            <Pagination totalCount={tableContentTotalCount} />
                        </Stack>
                    </ContentArea>
                </AdminBody>
            </AdminRoot>
            <LayerPopup open={sidebarPopupOpen} {...sidebarLayerPopupProps} onClose={closeSidebarPopup}>
                <SidebarLayerPopupContent onClose={closeSidebarPopup} />
            </LayerPopup>
            {confirmLayerPopup && <LayerPopup open={confirmPopupOpen} closeOnOverlay {...confirmLayerPopup} onClose={closeConfirmPopup} />}
        </>
    );
}

export default Admin;
