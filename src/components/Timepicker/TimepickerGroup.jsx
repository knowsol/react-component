import styled from "styled-components";
import { Heading } from "../Title/Title";
import { FieldGroup, FieldControl } from "../Field/FieldGroup";
import Timepicker from "./Timepicker";
import { TimepickerGroups, TitleTimepickerGroups } from "./timepickerData";
import { Column } from "@/styles/Common";

const Wrap = styled.div`
    grid-column: 1 / -1;
    min-width: 0;
`;

const DateGrid = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 32px;
    flex-wrap: wrap;
    margin-top: 24px;
`;

const StateColumn = styled(Column)`
    width: 260px;
    flex: 0 0 260px;
`;

const ModeColumn = styled(Column)`
    width: ${({ $range }) => ($range ? "340px" : "240px")};
    flex: 0 0 ${({ $range }) => ($range ? "340px" : "240px")};
`;

const DateHeader = styled.p`
    width: 100%;
    background-color: ${({ theme }) => theme.color.option.state7};
    color: ${({ theme }) => theme.color.pure.white};
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.border.radius.small};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 20px;
    text-align: center;
`;

function TimepickerGroup() {
    return TimepickerGroups.map(({ title, rows }) => (
        <Wrap key={title}>
            <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                {title}
            </Heading>
            <DateGrid>
                <StateColumn $gap={16}>
                    {rows.map((r) => (
                        <FieldGroup key={r.label} label={r.label} required={r.required}>
                            <FieldControl state={r.state} helptext={r.helptext} width="135px">
                                <Timepicker state={r.state} placeholder={r.placeholder} defaultValue={r.defaultValue} />
                            </FieldControl>
                        </FieldGroup>
                    ))}
                </StateColumn>

                {TitleTimepickerGroups.map((m) => {
                    const isRange = Boolean(m.range || m.state === "error");

                    return (
                        <ModeColumn key={m.title} $gap={8} $range={isRange}>
                            <DateHeader>{m.title}</DateHeader>
                            <FieldControl state={m.state} helptext={m.helptext}>
                                <Timepicker key={`${m.title}-${isRange ? "range" : "single"}`} state={m.state} placeholder={m.placeholder} defaultValue={m.defaultValue} range={isRange} view={m.view} visible />
                            </FieldControl>
                        </ModeColumn>
                    );
                })}
            </DateGrid>
        </Wrap>
    ));
}

export default TimepickerGroup;
