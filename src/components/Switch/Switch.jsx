import { useState } from "react";
import styled from "styled-components";

// 트랙(알약형 배경). enabled ON은 파랑, enabled OFF는 연회색, disabled는 회색 고정.
const Track = styled.button`
    position: relative;
    flex-shrink: 0;
    width: 64px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: ${({ theme }) => theme.border.radius.round};
    background-color: ${({ theme, $on, $disabled }) => {
        if ($disabled) return theme.color.neutral[400];
        return $on ? theme.color.secondary[500] : theme.color.neutral[300];
    }};
    cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
    transition: background-color 0.2s ease;
`;

// 동그란 손잡이. ON이면 오른쪽, OFF면 왼쪽으로 미끄러진다.
const Knob = styled.span`
    position: absolute;
    top: 3px;
    left: ${({ $on }) => ($on ? "37px" : "3px")};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${({ theme, $disabled }) => ($disabled ? theme.color.neutral[50] : theme.color.pure.white)};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: left 0.2s ease;
`;

// ON/OFF 라벨. 손잡이 반대쪽(ON=왼쪽, OFF=오른쪽)에 표시.
const StateText = styled.span`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({ $on }) => ($on ? "left: 11px;" : "right: 10px;")}
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme, $on, $disabled }) => {
        if ($disabled) return theme.color.neutral[600];
        return $on ? theme.color.pure.white : theme.color.neutral[600];
    }};
`;

// ON/OFF 토글 스위치. disabled면 표시 그대로 고정되고 클릭을 무시한다.
// on을 넘기면 controlled(내부 state 없이 onChange로만 알림), 안 넘기면 defaultOn 기준 uncontrolled.
function Switch({ on: onProp, defaultOn = false, disabled = false, onChange }) {
    const [internalOn, setInternalOn] = useState(defaultOn);
    const on = onProp !== undefined ? onProp : internalOn;

    const toggle = () => {
        if (disabled) return;
        const next = !on;
        if (onProp === undefined) setInternalOn(next);
        onChange?.(next);
    };

    return (
        <Track type="button" role="switch" aria-checked={on} disabled={disabled} $on={on} $disabled={disabled} onClick={toggle}>
            <StateText $on={on} $disabled={disabled}>
                {on ? "ON" : "OFF"}
            </StateText>
            <Knob $on={on} $disabled={disabled} />
        </Track>
    );
}

export default Switch;
