import styled from "styled-components";
import { Heading } from "../Title/Title";
import { FieldGroup, FieldControl } from "../Field/FieldGroup";
import Datepicker from "./Datepicker";
import { DatepickerGroups, TitleDatepickerGroups } from "./datepickerData";
import { Row, Column } from "@/styles/Common";

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

const LegendColumn = styled(Column)`
    width: 120px;
    flex: 0 0 120px;
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

const DateState = styled.span`
    font-size: ${({ theme }) => theme.font.size.small};
    color: ${({ theme }) => theme.color.neutral[900]};
    letter-spacing: -0.02em;
`;

const DateNumBox = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.small};
    font-size: ${({ theme }) => theme.font.size.small};
    background-color: ${({ theme, $bg }) => $bg(theme)};
    color: ${({ theme, $fg }) => $fg(theme)};
`;

const LEGEND = [
    { n: 1, bg: (t) => t.color.pure.white, fg: (t) => t.color.neutral[900], label: "Default" },
    { n: 2, bg: (t) => t.color.pure.white, fg: (t) => t.color.neutral[600], label: "Outside" },
    { n: 3, bg: (t) => t.color.secondary[100], fg: (t) => t.color.neutral[900], label: "Hover" },
    { n: 4, bg: (t) => t.color.secondary[500], fg: (t) => t.color.pure.white, label: "Selected" },
];

function DatepickerGroup() {
    return DatepickerGroups.map(({ title, rows }) => (
        <Wrap key={title}>
            <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                {title}
            </Heading>
            <DateGrid>
                <StateColumn $gap={16}>
                    {rows.map((r) => (
                        <FieldGroup key={r.label} label={r.label} required={r.required}>
                            <FieldControl state={r.state} helptext={r.helptext} width="138px">
                                <Datepicker state={r.state} placeholder={r.placeholder} defaultValue={r.defaultValue} />
                            </FieldControl>
                        </FieldGroup>
                    ))}
                </StateColumn>

                {TitleDatepickerGroups.map((m) => (
                    <ModeColumn key={m.title} $gap={8} $range={m.range}>
                        <DateHeader>{m.title}</DateHeader>
                        <FieldControl state={m.state} helptext={m.helptext}>
                            <Datepicker state={m.state} placeholder={m.placeholder} defaultValue={m.defaultValue} range={m.range} view={m.view} visible />
                        </FieldControl>
                    </ModeColumn>
                ))}

                <LegendColumn $gap={12}>
                    {LEGEND.map((l) => (
                        <Row key={l.n} $gap={12}>
                            <DateNumBox $bg={l.bg} $fg={l.fg}>
                                {l.n}
                            </DateNumBox>
                            <DateState>: {l.label}</DateState>
                        </Row>
                    ))}
                </LegendColumn>
            </DateGrid>
        </Wrap>
    ));
}

export default DatepickerGroup;
