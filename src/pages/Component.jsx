import { Page, Column, Section } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import InputGroup from "@/components/Input/InputGroup";
import InputButton from "@/components/Input/InputButton";
import DropBoxGroup from "@/components/Dropbox/DropBoxGroup";
import { FieldControl, FieldGroup } from "@/components/Field/FieldGroup";
import SearchGroup from "@/components/Searchbox/SearchGroup";
import EmailGroup from "@/components/Email/EmailGroup";
import styled from "styled-components";
import TextareaGroup from "@/components/Textarea/TextareaGroup";
import FileUpload from "@/components/File/FileUpload";
import DatepickerGroup from "@/components/DatePicker/DatepickerGroup";
import TimepickerGroup from "@/components/Timepicker/TimepickerGroup";
import DateTimePicker from "@/components/DateTimePicker/DateTimePicker";
import CheckGroup from "@/components/Checkbox/CheckGroup";
import SwitchGroup from "@/components/Switch/SwitchGroup";
import ChipGroup from "@/components/Chip/ChipGroup";
import Step from "@/components/Step/Step";
import AlertGroup from "@/components/Alert/AlertGroup";
import LnbTree from "@/components/Tree/LnbTree";
import LayerPopupGroup from "@/components/LayerPopup/LayerPopupGroup";
import { IconSidebar } from "@/components/Sidebar";

const InputGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1.5fr;
    gap: ${({ theme }) => theme.spacing[40]};
    align-items: start;

    & > * {
        min-width: 0;
    }
`;

const DateTimeSpan = styled.div`
    grid-column: 1 / -1;
    min-width: 0;
`;

const SidebarPreview = styled.div`
    width: 270px;
    height: 420px;
    display: flex;
    align-items: stretch;
    padding-top: 16px;
    overflow: hidden;
    background: ${({ theme }) => theme.color.secondary.c50};
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.small};
`;

const InputButtonColumn = styled(Column)`
    width: 125%;
`;

function InputButtonGuide() {
    return (
        <InputButtonColumn $mt={24}>
            <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                Input + Button
            </Heading>
            <FieldGroup label="타이틀">
                <FieldControl minWidth="0">
                    <InputButton />
                </FieldControl>
            </FieldGroup>
        </InputButtonColumn>
    );
}

function Component() {
    return (
        <Page $gap={0}>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Input Field
                </Heading>
                <InputGrid>
                    <InputGroup />
                    <DropBoxGroup />
                    <SearchGroup />
                    <EmailGroup />
                    <TextareaGroup />
                    <FileUpload />
                    <InputButtonGuide />
                    <DatepickerGroup />
                    <TimepickerGroup />
                    <DateTimeSpan>
                        <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                            DateTimePicker
                        </Heading>
                        <DateTimePicker startDate="2026-07-14" startTime="16:00" endDate="2026-07-24" endTime="18:00" />
                    </DateTimeSpan>
                </InputGrid>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Selection Controls
                </Heading>
                <Column $mt={20}>
                    <CheckGroup />
                    <SwitchGroup />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Status
                </Heading>
                <Column $mt={40}>
                    <ChipGroup />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Step
                </Heading>
                <Column $mt={40}>
                    <Step />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Alert
                </Heading>
                <Column $mt={40}>
                    <AlertGroup />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Layer Popup
                </Heading>
                <Column $mt={40}>
                    <LayerPopupGroup />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Menu
                </Heading>
                <Column $mt={40}>
                    <LnbTree />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Sidebar
                </Heading>
                <Column $mt={40}>
                    <SidebarPreview>
                        <IconSidebar panelWidth="214px" />
                    </SidebarPreview>
                </Column>
            </Section>
        </Page>
    );
}

export default Component;
