import { useMemo, useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button/Button";
import { FormItemsRow } from "@/styles/Common";
import LayerPopup from "./LayerPopup";
import { layerPopData } from "./layerPopData";
import { sidebarLayerPopupProps } from "./sidebarLayerPopupData";
import SidebarLayerPopupContent from "./SidebarLayerPopupContent";

const SIDEBAR_POPUP_ID = "sidebar";

const DemoWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[16]};
`;

function LayerPopupGroup() {
    const [activePopupId, setActivePopupId] = useState(null);
    const activePopup = useMemo(() => layerPopData.find((item) => item.id === activePopupId), [activePopupId]);
    const closePopup = () => setActivePopupId(null);

    return (
        <DemoWrap>
            <FormItemsRow>
                {layerPopData.map((item) => (
                    <Button key={item.id} variant="secondary" kind="solid" height="36px" onClick={() => setActivePopupId(item.id)}>
                        {item.triggerText}
                    </Button>
                ))}
                <Button variant="secondary" kind="solid" height="36px" onClick={() => setActivePopupId(SIDEBAR_POPUP_ID)}>
                    사이드바 팝업
                </Button>
            </FormItemsRow>
            {activePopup && <LayerPopup open closeOnOverlay {...activePopup} onClose={closePopup} />}
            {activePopupId === SIDEBAR_POPUP_ID && (
                <LayerPopup open {...sidebarLayerPopupProps} onClose={closePopup}>
                    <SidebarLayerPopupContent onClose={closePopup} />
                </LayerPopup>
            )}
        </DemoWrap>
    );
}

export default LayerPopupGroup;
