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

const BoxIcon = styled(Icon)`
    flex-shrink: 0;
`;

const CheckRow = styled(RowCenter)`
    cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
    user-select: none;
`;

const CheckButton = styled.button`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: 2px;
        border-radius: ${({ theme }) => theme.border.radius.xsmall};
    }
`;

const MixedBox = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${({ theme, $size }) => theme.icon[$size] ?? $size ?? theme.icon.medium};
    height: ${({ theme, $size }) => theme.icon[$size] ?? $size ?? theme.icon.medium};
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    background: ${({ theme }) => theme.color.secondary[500]};
    color: ${({ theme }) => theme.color.pure.white};

    &::after {
        content: "";
        width: 10px;
        height: 2px;
        border-radius: ${({ theme }) => theme.border.radius.round};
        background: currentColor;
    }
`;

function getIconName(disabled, checked, indeterminate) {
    if (indeterminate) return disabled ? "dis_unChkbx" : "unChkbx";
    if (disabled) return checked ? "dis_chkbx" : "dis_unChkbx";
    return checked ? "chkbx" : "unChkbx";
}

export function CheckboxControl({ checked = false, indeterminate = false, disabled = false, size = "medium", "aria-label": ariaLabel, onChange, ...buttonProps }) {
    const toggle = (event) => {
        event.stopPropagation();
        if (!disabled) onChange?.(!checked, event);
    };

    return (
        <CheckButton type="button" role="checkbox" aria-checked={indeterminate ? "mixed" : checked} aria-label={ariaLabel} disabled={disabled} onClick={toggle} {...buttonProps}>
            {indeterminate && !disabled ? <MixedBox $size={size} /> : <BoxIcon name={getIconName(disabled, checked, indeterminate)} size={size} $disabled={disabled} />}
        </CheckButton>
    );
}

// 라벨 딸린 박스형 체크박스. checked를 넘기면 controlled(내부 state 없이 onChange로만 알림),
// 안 넘기면 defaultChecked 기준 uncontrolled.
function Checkbox({ label, checked: checkedProp, defaultChecked = false, indeterminate = false, disabled = false, onChange }) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const checked = checkedProp !== undefined ? checkedProp : internalChecked;

    const change = (next) => {
        if (checkedProp === undefined) setInternalChecked(next);
        onChange?.(next);
    };

    return (
        <CheckRow $gap={4} $disabled={disabled}>
            <CheckboxControl checked={checked} indeterminate={indeterminate} disabled={disabled} aria-label={label} onChange={change} />
            <CheckTitle>{label}</CheckTitle>
        </CheckRow>
    );
}

export default Checkbox;
