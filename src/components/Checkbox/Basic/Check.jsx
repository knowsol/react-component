import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import { RowCenter } from "@/styles/Common";

const CheckTitle = styled.p`
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 160%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.neutral[900]};
`;

// 아이콘 + 글씨 전체를 클릭 영역으로. enabled는 pointer, disabled는 default 커서.
const CheckRow = styled(RowCenter)`
    cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
    user-select: none;
`;

// Icon 컴포넌트는 name으로 아이콘을 조회하므로, 상태별 아이콘 name을 돌려준다.
function getIconName(disabled, checked) {
    if (disabled) return checked ? "dis_chk" : "dis_unchk";
    return checked ? "chk" : "unchk";
}

export function CheckControl({ checked = false, disabled = false, size = "medium", "aria-label": ariaLabel, onChange }) {
    const toggle = () => {
        if (!disabled) onChange?.(!checked);
    };

    return (
        <CheckRow $gap={4} $disabled={disabled} onClick={toggle} role="checkbox" aria-checked={checked} aria-label={ariaLabel}>
            <Icon name={getIconName(disabled, checked)} size={size} />
        </CheckRow>
    );
}

// 라벨 딸린 체크. checked를 넘기면 controlled(내부 state 없이 onChange로만 알림),
// 안 넘기면 defaultChecked 기준 uncontrolled.
function Check({ label, checked: checkedProp, defaultChecked = false, disabled = false, onChange }) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const checked = checkedProp !== undefined ? checkedProp : internalChecked;

    const toggle = () => {
        if (disabled) return;
        const next = !checked;
        if (checkedProp === undefined) setInternalChecked(next);
        onChange?.(next);
    };

    return (
        <CheckRow $gap={4} $disabled={disabled} onClick={toggle}>
            <CheckControl checked={checked} disabled={disabled} aria-label={label} />
            <CheckTitle>{label}</CheckTitle>
        </CheckRow>
    );
}

export default Check;
