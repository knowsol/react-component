import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import { Row, RowCenter } from "@/styles/Common";

const RadioTitle = styled.p`
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 160%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.neutral[900]};
`;

// 아이콘 + 글씨 전체를 클릭 영역으로. enabled는 pointer, disabled는 default 커서.
const RadioRow = styled(RowCenter)`
    cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
    user-select: none;
`;

function getIconName(disabled, checked) {
    if (disabled) return checked ? "dis_chk_rad" : "dis_unchk_rad";
    return checked ? "chk_rad" : "unchk_rad";
}

// 옵션은 문자열과 객체({ label, value, disabled }) 둘 다 받는다.
const normalizeOption = (opt) => (opt !== null && typeof opt === "object" ? opt : { label: String(opt), value: opt });

// 라디오 그룹: options 중 하나를 선택하면 나머지는 해제된다.
// value를 넘기면 controlled(내부 state 없이 onChange로만 알림), 안 넘기면 defaultValue 기준 uncontrolled.
// disabled(그룹 전체) 또는 옵션별 disabled 항목은 클릭을 무시한다.
function Radio({ options = [], value: valueProp, defaultValue = null, disabled = false, onChange }) {
    const items = options.map(normalizeOption);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selected = valueProp !== undefined ? valueProp : internalValue;

    const pick = (item) => {
        if (disabled || item.disabled) return;
        if (valueProp === undefined) setInternalValue(item.value);
        onChange?.(item.value);
    };

    return (
        <Row $gap={20} role="radiogroup">
            {items.map((item) => {
                const itemDisabled = disabled || item.disabled;
                const checked = selected === item.value;
                return (
                    <RadioRow key={item.value} $gap={4} $disabled={itemDisabled} role="radio" aria-checked={checked} onClick={() => pick(item)}>
                        <Icon name={getIconName(itemDisabled, checked)} size="medium" />
                        <RadioTitle>{item.label}</RadioTitle>
                    </RadioRow>
                );
            })}
        </Row>
    );
}

export default Radio;
