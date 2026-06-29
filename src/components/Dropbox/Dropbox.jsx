import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { fieldBox, stateStyle, fieldStateStyle } from "../Field/fieldStyles";

const ICON = {
    down: "/assets/icons/arrow_down.svg",
    up: "/assets/icons/arrow_up.svg",
    chk: "/assets/icons/chk.svg",
    unChk: "/assets/icons/un_chk.svg",
};

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    min-width: 0;
`;

const Trigger = styled.div`
    ${fieldBox}
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: ${({ $locked }) => ($locked ? "default" : "pointer")};
    user-select: none;

    ${({ $placeholder, theme }) =>
        $placeholder &&
        css`
            color: ${theme.color.neutral[600]};
        `}
    /* 펼쳤을 때(active) 파란선. 잠금 상태는 열리지 않으니 $open이 안 들어오고,
       혹시 상태색이 있으면 아래 fieldStateStyle이 그 위를 덮는다. */
    ${({ $open }) =>
        $open &&
        css`
            ${stateStyle.focus}
        `}
    ${fieldStateStyle}
`;

// 선택값 표시 영역: 한 줄로 늘어놓고, 박스 폭을 넘치면 ...으로 잘린다.
const Value = styled.span`
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 20px;
`;

const Arrow = styled.img`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const Menu = styled.ul`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 10;
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.color.neutral[900]};
    background: ${({ theme }) => theme.color.pure.white};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
`;

const Option = styled.li`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.font.size.primary};
    line-height: 24px;
    letter-spacing: -0.3px;
    cursor: pointer;
    color: ${({ theme, $selected }) => ($selected ? theme.color.secondary[500] : theme.color.neutral[900])};

    &:hover {
        background-color: ${({ theme }) => theme.color.secondary.c100};
    }
`;

const OptionText = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const CheckIcon = styled.img`
    width: 20px;
    height: 20px;
    flex-shrink: 0;
`;

function Dropbox({ state, placeholder = "입력하세요", options = [], multiple = false, allLabel, value, defaultOpen = false, defaultChecked = [] }) {
    const disabled = state === "disabled";
    const readonly = state === "readonly";
    const locked = disabled || readonly || state === "error";
    const [open, setOpen] = useState(defaultOpen);
    const [selected, setSelected] = useState(value ?? null);
    const [checked, setChecked] = useState(defaultChecked);
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        return () => document.removeEventListener("mousedown", onPointerDown);
    }, [open]);

    const allChecked = multiple && options.length > 0 && options.every((o) => checked.includes(o));
    const checkedInOrder = multiple ? options.filter((o) => checked.includes(o)) : [];

    const toggleOpen = () => {
        if (locked) return; // disabled/readonly/error는 셀렉트 동작 없음
        setOpen((prev) => !prev);
    };

    const toggleAll = () => setChecked(allChecked ? [] : [...options]);

    const pick = (opt) => {
        if (multiple) {
            setChecked((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
            return;
        }
        setSelected(opt);
        setOpen(false);
    };

    const renderValue = () => {
        if (multiple) {
            if (allChecked) return allLabel; // 모두 선택 → "전체"
            if (checkedInOrder.length) return checkedInOrder.join(", "); // 선택1, 선택2, 선택3 ... (넘치면 …)
            return placeholder;
        }
        return selected || placeholder;
    };

    const isPlaceholder = multiple ? !allChecked && checkedInOrder.length === 0 : !selected;

    return (
        // 각 드롭다운이 독립 동작하도록, 내부 클릭의 mousedown 전파를 막아 다른 드롭다운이 닫히지 않게 한다.
        <Wrapper ref={ref} onMouseDown={(e) => e.stopPropagation()}>
            <Trigger $state={state} $open={open} $locked={locked} $placeholder={isPlaceholder} onClick={toggleOpen}>
                <Value>{renderValue()}</Value>
                <Arrow src={open ? ICON.up : ICON.down} alt="" aria-hidden />
            </Trigger>

            {open && !locked && (
                <Menu>
                    {multiple && allLabel != null && (
                        <Option $selected={allChecked} onClick={toggleAll}>
                            <CheckIcon src={allChecked ? ICON.chk : ICON.unChk} alt="" aria-hidden />
                            <OptionText>{allLabel}</OptionText>
                        </Option>
                    )}
                    {options.map((opt) => {
                        const isChecked = multiple && checked.includes(opt);
                        const isSelected = multiple ? isChecked : selected === opt;
                        return (
                            <Option key={opt} $selected={isSelected} onClick={() => pick(opt)}>
                                {multiple && <CheckIcon src={isChecked ? ICON.chk : ICON.unChk} alt="" aria-hidden />}
                                <OptionText>{opt}</OptionText>
                            </Option>
                        );
                    })}
                </Menu>
            )}
        </Wrapper>
    );
}

export default Dropbox;
