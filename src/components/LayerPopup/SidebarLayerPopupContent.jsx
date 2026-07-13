import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button/Button";
import Dropbox from "@/components/Dropbox/Dropbox";
import { FieldControl, FieldGroup } from "@/components/Field/FieldGroup";
import Input from "@/components/Input/Input";
import InputButton from "@/components/Input/InputButton";
import Search from "@/components/Searchbox/Search";
import LineTabs from "@/components/Tab/LineTabs";
import TableHeaderSection from "@/components/Table/TableHeader/TableHeaderSection";
import Textarea from "@/components/Textarea/Textarea";
import { Heading } from "@/components/Title/Title";
import { Column, FieldLabel } from "@/styles/Common";

const dropOptions = ["가나다", "옵션1", "옵션2"];
const tabs = [
    { label: "Tap_on", value: "on" },
    { label: "Tap_off", value: "off" },
];

const PopupTitle = styled(Heading)`
    color: ${({ theme }) => theme.color.neutral[900]};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 32px;
`;

const PopupLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;
`;

const PopupHeader = styled(Column)`
    flex: 0 0 auto;
`;

const PopupScrollArea = styled.div`
    flex: 1 1 auto;
    min-height: 0;
    margin-top: ${({ theme }) => theme.spacing[16]};
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: ${({ theme }) => theme.border.radius.round};
        background: #ddd;
    }

    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-button:single-button,
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:increment {
        display: none !important;
        appearance: none;
        -webkit-appearance: none;
        width: 0;
        height: 0;
        border: 0;
        background: transparent;
    }
`;

const PopupSections = styled(Column)`
    padding-right: ${({ theme }) => theme.spacing[24]};
`;

const PopupFooter = styled.div`
    flex: 0 0 auto;
    margin-top: ${({ theme }) => theme.spacing[24]};
`;

const FieldGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: ${({ theme }) => theme.spacing[24]};
    row-gap: ${({ theme }) => theme.spacing[24]};
`;

const PopupField = styled(FieldGroup)`
    min-width: 0;

    ${FieldLabel} {
        padding: 0;
    }
`;

const FullPopupField = styled(PopupField)`
    grid-column: 1 / -1;
`;

function SidebarLayerPopupContent({ onClose }) {
    const [activeTab, setActiveTab] = useState("on");
    const showPopupContent = activeTab === "on";

    return (
        <PopupLayout>
            <PopupHeader $gap={24}>
                <PopupTitle as="h2" $size="small">
                    Popup 2st
                </PopupTitle>
                <LineTabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
            </PopupHeader>

            {showPopupContent && (
                <>
                    <PopupScrollArea role="tabpanel">
                        <PopupSections $gap={24}>
                            <Column as="section" $gap={24}>
                                <TableHeaderSection title="제목" required padding="16px 0 8px" />
                                <FieldGrid>
                                    <PopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Dropbox defaultValue="가나다" options={dropOptions} />
                                        </FieldControl>
                                    </PopupField>
                                    <PopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Search defaultValue="가나다" />
                                        </FieldControl>
                                    </PopupField>
                                    <FullPopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Input defaultValue="가나다" />
                                        </FieldControl>
                                    </FullPopupField>
                                    <PopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Search defaultValue="가나다" />
                                        </FieldControl>
                                    </PopupField>
                                    <PopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <InputButton placeholder="입력하세요" buttonText="버튼" />
                                        </FieldControl>
                                    </PopupField>
                                </FieldGrid>
                            </Column>

                            <Column as="section" $gap={24}>
                                <TableHeaderSection title="제목" padding="16px 0 8px" />
                                <FieldGrid>
                                    <FullPopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Input defaultValue="가나다" />
                                        </FieldControl>
                                    </FullPopupField>
                                    <FullPopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Dropbox defaultValue="가나다" options={dropOptions} />
                                        </FieldControl>
                                    </FullPopupField>
                                    <FullPopupField label="타이틀" direction="column" gap="8px">
                                        <FieldControl>
                                            <Textarea aria-label="타이틀" marginTop={0} gap={4} minHeight="84px" resize="none" padding="10px 12px" />
                                        </FieldControl>
                                    </FullPopupField>
                                </FieldGrid>
                            </Column>
                        </PopupSections>
                    </PopupScrollArea>

                    <PopupFooter>
                        <Button variant="primary" kind="solid" width="100%" height="48px" onClick={onClose}>
                            버튼
                        </Button>
                    </PopupFooter>
                </>
            )}
        </PopupLayout>
    );
}

export default SidebarLayerPopupContent;
