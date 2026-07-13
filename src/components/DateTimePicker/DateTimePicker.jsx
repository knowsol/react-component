import { useState } from "react";
import styled from "styled-components";
import Datepicker from "../DatePicker/Datepicker";
import Timepicker from "../Timepicker/Timepicker";
import { Row, Column } from "@/styles/Common";

// 날짜+시간 범위 선택: [시작날짜][시작시간] ~ [종료날짜][종료시간].
// 각 칸은 기존 Datepicker(캘린더)·Timepicker(시간 슬라이더)를 그대로 조합해 독립 동작한다.
const Wrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

// [날짜][시간] 한 쌍은 붙여서 한 묶음으로.
const Pair = styled(Row)`
    gap: 8px;
`;

const Separator = styled.span`
    flex: 0 0 auto;
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.small};
`;

function DateTimePicker({ state, startDate, startTime, endDate, endTime, dateWidth = "150px", timeWidth = "120px" }) {
    // 시작시간을 추적해 종료시간의 하한(min)으로 넘긴다 → 종료시간이 시작시간보다 이를 수 없다.
    const [start, setStart] = useState(startTime);

    return (
        <Wrap>
            <Column $mt={24}>
                <Row $gap={8}>
                    <Pair>
                        <Datepicker state={state} defaultValue={startDate} placeholder="YYYY-MM-DD" width={dateWidth} />
                        <Timepicker state={state} defaultValue={startTime} placeholder="00:00" width={timeWidth} onChange={setStart} />
                    </Pair>
                    <Separator>~</Separator>
                    <Pair>
                        <Datepicker state={state} defaultValue={endDate} placeholder="YYYY-MM-DD" width={dateWidth} />
                        <Timepicker state={state} defaultValue={endTime} placeholder="00:00" width={timeWidth} min={start} />
                    </Pair>
                </Row>
            </Column>
        </Wrap>
    );
}

export default DateTimePicker;
