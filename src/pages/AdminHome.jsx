import { useState } from "react";
import styled from "styled-components";
import LayerPopup from "@/components/LayerPopup/LayerPopup";
import { layerPopData } from "@/components/LayerPopup/layerPopData";
import { sidebarLayerPopupProps } from "@/components/LayerPopup/sidebarLayerPopupData";
import SidebarLayerPopupContent from "@/components/LayerPopup/SidebarLayerPopupContent";
import SearchFilter from "@/components/SearchFilter/SearchFilter";
import PaginatedTableContent from "@/components/Table/PaginatedTableContent";
import { tableContentColumns, tableContentRows } from "@/components/Table/TableBody/tableContentData";
import { tableHeaderData } from "@/components/Table/TableHeader/tableHeaderData";
import TableHeaderSection from "@/components/Table/TableHeader/TableHeaderSection";

const AdminHomeStack = styled.div`
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

function AdminHome() {
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
            <AdminHomeStack>
                <TableHeaderSection {...adminTableHeader} compact />
                <ScrollBlock>
                    <SearchFilter />
                </ScrollBlock>
                <TableHeaderSection {...resultTableHeader} compact />
                <PaginatedTableContent
                    columns={tableContentColumns}
                    rows={tableContentRows}
                    topBorder
                    selectOnRowClick
                    isRowClickable={(_, rowIndex) => rowIndex === 0}
                    onRowClick={() => setSidebarPopupOpen(true)}
                />
            </AdminHomeStack>
            <LayerPopup open={sidebarPopupOpen} {...sidebarLayerPopupProps} onClose={closeSidebarPopup}>
                <SidebarLayerPopupContent onClose={closeSidebarPopup} />
            </LayerPopup>
            {confirmLayerPopup && <LayerPopup open={confirmPopupOpen} closeOnOverlay {...confirmLayerPopup} onClose={closeConfirmPopup} />}
        </>
    );
}

export default AdminHome;
