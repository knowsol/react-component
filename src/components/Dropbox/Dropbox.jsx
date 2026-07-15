import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { fieldBox, stateStyle, fieldStateStyle } from "../Field/fieldStyles";
import { Icon } from "@/components/Icon/Icon";
import { ICON } from "@/components/Icon/IconData";

const resolveColorToken = (theme, colorToken) => colorToken?.split(".").reduce((color, key) => color?.[key], theme.color);

const Wrapper = styled.div`
    position: relative;
    width: ${({ $bare, $triggerFullWidth }) => ($triggerFullWidth ? "100%" : $bare ? "auto" : "100%")};
    min-width: 0;
`;

const Trigger = styled.div`
    ${({ $bare }) => !$bare && fieldBox}

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: ${({ $locked }) => ($locked ? "default" : "pointer")};
    user-select: none;

    color: ${({ theme, $placeholder, $focused, $focusTextColorToken }) =>
        ($focused && resolveColorToken(theme, $focusTextColorToken)) || ($placeholder ? theme.color.neutral[600] : theme.color.neutral[900])};
    /* 펼쳤을 때(active) 파란선. bare는 테두리가 없어 생략. 잠금 상태는 열리지 않으니 $open이 안 들어오고,
       혹시 상태색이 있으면 아래 fieldStateStyle이 그 위를 덮는다. */
    ${({ $open, $bare }) =>
        $open &&
        !$bare &&
        css`
            ${stateStyle.focus}
        `}
    ${({ $bare }) => !$bare && fieldStateStyle()}
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
    transition: all 0.3s ease;
    transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

// 커스텀 트리거(버튼 등)를 감싸는 슬롯. 클릭만 받고 모양은 children이 결정한다.
const TriggerSlot = styled.span`
    display: inline-flex;
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
    cursor: pointer;
`;

const Menu = styled.ul`
    position: absolute;
    /* dropUp이면 트리거 위로(bottom 기준), 아니면 아래로(top 기준) 펼친다. */
    ${({ $dropUp }) => ($dropUp ? "bottom: calc(100% + 4px);" : "top: calc(100% + 4px);")}
    z-index: 10;
    /* 단독: 트리거 폭에 꽉. bare: 좁은 트리거 기준 오른쪽 정렬 + 옵션 길이에 맞춤.
       커스텀 트리거(버튼): 왼쪽 정렬 + 최소 트리거 폭, 옵션 길이만큼. */
    ${({ $bare, $custom }) =>
        $custom
            ? css`
                  left: 0;
                  min-width: 100%;
                  width: max-content;
              `
            : $bare
              ? css`
                    right: 0;
                    left: auto;
                    min-width: 160px;
                    width: max-content;
                `
              : css`
                    left: 0;
                    width: 100%;
                `}
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
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 24px;
    letter-spacing: -0.3px;
    cursor: pointer;
    color: ${({ theme, $selected, $selectedColorToken }) =>
        $selected ? (resolveColorToken(theme, $selectedColorToken) ?? theme.color.secondary[500]) : theme.color.neutral[900]};

    &:hover {
        background-color: ${({ theme }) => theme.color.secondary.c100};
    }
`;

const OptionText = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// 옵션은 문자열("선택1")과 객체({ label, value }) 둘 다 받는다. 내부에선 항상 {label, value}로 정규화.
const normalizeOption = (opt) => (opt !== null && typeof opt === "object" ? opt : { label: String(opt), value: opt });

function Dropbox({
    state,
    placeholder = "입력하세요",
    options = [],
    multiple = false,
    allLabel,
    value, // 단일 선택 controlled 값. 넘기면 내부 state를 쓰지 않고 onSelect로만 알린다.
    defaultValue = null, // 단일 선택 uncontrolled 초기값
    checked: checkedProp, // 다중 선택 controlled 값(배열). 넘기면 onChange로만 알린다.
    defaultChecked = [], // 다중 선택 uncontrolled 초기값
    defaultOpen = false,
    bare = false,
    trigger,
    triggerFullWidth = false,
    dropUp = false,
    focusTextColorToken,
    selectedColorToken,
    onSelect, // 단일 선택: (value, option) => void
    onChange, // 다중 선택: (checkedValues) => void
}) {
    const disabled = state === "disabled";
    const readonly = state === "readonly";
    const locked = disabled || readonly || state === "error";
    const [open, setOpen] = useState(defaultOpen);
    const [selected, setSelected] = useState(value !== undefined ? value : defaultValue);
    const [checkedState, setCheckedState] = useState(defaultChecked);
    const ref = useRef(null);
    const items = options.map(normalizeOption);
    const selectedValue = value !== undefined ? value : selected;
    const checkedValues = checkedProp !== undefined ? checkedProp : checkedState;
    // 선택값의 표시 라벨: 옵션에서 찾고, 없으면(데모의 임의 값 등) 값 자체를 그대로 보여준다.
    const selectedLabel = items.find((o) => o.value === selectedValue)?.label ?? (selectedValue != null ? String(selectedValue) : "");

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        return () => document.removeEventListener("mousedown", onPointerDown);
    }, [open]);

    const allChecked = multiple && items.length > 0 && items.every((o) => checkedValues.includes(o.value));
    const checkedInOrder = multiple ? items.filter((o) => checkedValues.includes(o.value)) : [];

    const toggleOpen = () => {
        if (locked) return; // disabled/readonly/error는 셀렉트 동작 없음
        setOpen((prev) => !prev);
    };

    // 다중 선택 변경: uncontrolled면 내부 state 갱신, controlled(checked prop)면 onChange로만 알린다.
    const changeChecked = (next) => {
        if (checkedProp === undefined) setCheckedState(next);
        onChange?.(next);
    };

    const toggleAll = () => changeChecked(allChecked ? [] : items.map((o) => o.value));

    const pick = (opt) => {
        if (multiple) {
            changeChecked(checkedValues.includes(opt.value) ? checkedValues.filter((v) => v !== opt.value) : [...checkedValues, opt.value]);
            return;
        }
        if (value === undefined) setSelected(opt.value);
        setOpen(false);
        onSelect?.(opt.value, opt);
    };

    const renderValue = () => {
        if (multiple) {
            if (allChecked) return allLabel; // 모두 선택 → "전체"
            if (checkedInOrder.length) return checkedInOrder.map((o) => o.label).join(", "); // 선택1, 선택2, 선택3 ... (넘치면 …)
            return placeholder;
        }
        return selectedLabel || placeholder;
    };

    const isPlaceholder = multiple ? !allChecked && checkedInOrder.length === 0 : !selectedLabel;

    return (
        // 각 드롭다운이 독립 동작하도록, 내부 클릭의 mousedown 전파를 막아 다른 드롭다운이 닫히지 않게 한다.
        <Wrapper ref={ref} $bare={bare || !!trigger} $triggerFullWidth={triggerFullWidth} onMouseDown={(e) => e.stopPropagation()}>
            {trigger ? (
                // 커스텀 트리거: 모양은 밖에서(Button 등), 열림/닫힘은 여기서.
                // 함수면 (open, 선택 라벨)을 넘겨줘서 화살표·라벨에 반영할 수 있게 한다.
                <TriggerSlot $fullWidth={triggerFullWidth} onClick={toggleOpen}>
                    {typeof trigger === "function" ? trigger(open, selectedLabel) : trigger}
                </TriggerSlot>
            ) : (
                <Trigger
                    $state={state}
                    $open={open}
                    $locked={locked}
                    $placeholder={isPlaceholder}
                    $bare={bare}
                    $focused={open || state === "focus"}
                    $focusTextColorToken={focusTextColorToken}
                    onClick={toggleOpen}
                >
                    <Value>{renderValue()}</Value>
                    <Arrow src={ICON.down} $open={open} alt="" aria-hidden />
                </Trigger>
            )}

            {open && !locked && (
                <Menu $bare={bare} $custom={!!trigger} $dropUp={dropUp}>
                    {multiple && allLabel != null && (
                        <Option $selected={allChecked} $selectedColorToken={selectedColorToken} onClick={toggleAll}>
                            <Icon $size="medium" src={allChecked ? ICON.chkbx : ICON.unChkbx} alt="" aria-hidden />
                            <OptionText>{allLabel}</OptionText>
                        </Option>
                    )}
                    {items.map((opt) => {
                        const isChecked = multiple && checkedValues.includes(opt.value);
                        const isSelected = multiple ? isChecked : selectedValue === opt.value;
                        return (
                            <Option key={opt.value} $selected={isSelected} $selectedColorToken={selectedColorToken} onClick={() => pick(opt)}>
                                {multiple && <Icon $size="medium" src={isChecked ? ICON.chkbx : ICON.unChkbx} alt="" aria-hidden />}
                                <OptionText>{opt.label}</OptionText>
                            </Option>
                        );
                    })}
                </Menu>
            )}
        </Wrapper>
    );
}

export default Dropbox;
