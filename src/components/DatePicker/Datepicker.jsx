import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import AirDatepickerLib from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeKoLib from "air-datepicker/locale/ko";
import { fieldBox, fieldStateStyle, bareInput } from "../Field/fieldStyles";
import { Icon } from "@/components/Icon/Icon";

const AirDatepicker = AirDatepickerLib?.default ?? AirDatepickerLib;
const localeKo = localeKoLib?.default ?? localeKoLib;
const RANGE_ERROR_RESET_DELAY = 1200;
const RANGE_ERROR_MESSAGE = "시작일은 종료일보다 늦을 수 없습니다.";

const DatepickerPopupStyle = createGlobalStyle`
    .ds-datepicker.air-datepicker {
        --adp-font-family: ${({ theme }) => theme.font.sans};
        --adp-font-size: ${({ theme }) => theme.font.size.small};
        --adp-color: ${({ theme }) => theme.color.neutral[900]};
        --adp-color-secondary: ${({ theme }) => theme.color.neutral[600]};
        --adp-color-other-month: ${({ theme }) => theme.color.neutral[600]};
        --adp-color-other-month-hover: ${({ theme }) => theme.color.neutral[600]};
        --adp-color-current-date: ${({ theme }) => theme.color.secondary[500]};
        --adp-color-disabled: ${({ theme }) => theme.color.neutral[500]};
        --adp-day-name-color: ${({ theme }) => theme.color.neutral[900]};
        --adp-day-name-color-hover: ${({ theme }) => theme.color.neutral[900]};
        --adp-background-color-hover: ${({ theme }) => theme.color.secondary[100]};
        --adp-background-color-active: ${({ theme }) => theme.color.secondary[100]};
        --adp-cell-background-color-hover: ${({ theme }) => theme.color.secondary[100]};
        --adp-cell-background-color-selected: ${({ theme }) => theme.color.secondary[500]};
        --adp-cell-background-color-selected-hover: ${({ theme }) => theme.color.secondary[500]};
        --adp-cell-background-color-in-range: ${({ theme }) => theme.color.secondary[100]};
        --adp-cell-background-color-in-range-hover: ${({ theme }) => theme.color.secondary[100]};
        --adp-cell-border-color-in-range: ${({ theme }) => theme.color.secondary[500]};
        --adp-border-color: ${({ theme }) => theme.color.neutral[300]};
        --adp-border-color-inline: ${({ theme }) => theme.color.neutral[300]};
        --adp-border-radius: ${({ theme }) => theme.border.radius.xsmall};
        --adp-cell-border-radius: ${({ theme }) => theme.border.radius.xsmall};
        box-sizing: border-box;
        z-index: 1000;
    }

    .ds-datepicker.-custom-position- .air-datepicker--pointer {
        top: calc(var(--adp-pointer-size) / -2);
        left: var(--ds-pointer-left, var(--adp-pointer-offset));
    }

    .ds-datepicker.-custom-position- .air-datepicker--pointer::after {
        transform: rotate(315deg);
    }

    .ds-datepicker.air-datepicker.ds-datepicker--error {
        --adp-border-color: ${({ theme }) => theme.color.semantic.error};
        --adp-border-color-inline: ${({ theme }) => theme.color.semantic.error};
        border-color: ${({ theme }) => theme.color.semantic.error};
    }

    .ds-datepicker.ds-datepicker--error .air-datepicker--pointer::after {
        border-color: ${({ theme }) => theme.color.semantic.error};
    }

    .ds-datepicker .air-datepicker-cell {
        color: ${({ theme }) => theme.color.neutral[900]};
		border-color: ${({ theme }) => theme.color.neutral[800]};  }

    .ds-datepicker .air-datepicker-cell.-day-.-other-month-,
    .ds-datepicker .air-datepicker-cell.-year-.-other-decade- {
        color: ${({ theme }) => theme.color.neutral[600]};
    }

    .ds-datepicker .air-datepicker-cell.-focus-:not(.-selected-):not(.-range-from-):not(.-range-to-):not(.-disabled-) {
        background: ${({ theme }) => theme.color.secondary[100]};
        color: ${({ theme }) => theme.color.neutral[900]};
    }

    .ds-datepicker .air-datepicker-cell.-in-range-:not(.-disabled-) {
        background: ${({ theme }) => theme.color.secondary[100]};
        color: ${({ theme }) => theme.color.neutral[900]};
    }

    .ds-datepicker .air-datepicker-cell.-selected-,
    .ds-datepicker .air-datepicker-cell.-selected-.-current-,
    .ds-datepicker .air-datepicker-cell.-selected-.-focus-,
    .ds-datepicker .air-datepicker-cell.-range-from-,
    .ds-datepicker .air-datepicker-cell.-range-to- {
        background: ${({ theme }) => theme.color.secondary[500]};
        border-color: ${({ theme }) => theme.color.secondary[500]};
        color: ${({ theme }) => theme.color.pure.white};
    }

    .ds-datepicker .air-datepicker-cell.-disabled-,
    .ds-datepicker .air-datepicker-cell.-disabled-.-focus- {
        background: transparent;
        color: ${({ theme }) => theme.color.neutral[500]};
    }
`;

const Box = styled.div`
    ${fieldBox}
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    width: ${({ $width }) => $width || "100%"};
    flex: ${({ $grow }) => ($grow ? "1 1 0" : "0 0 auto")};
    cursor: pointer;

    ${fieldStateStyle("&:focus-within")}
`;

const RangeWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: ${({ $width }) => $width || "100%"};
    min-width: 0;
`;

const RangeSeparator = styled.span`
    flex: 0 0 auto;
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.small};
`;

const RangeStack = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    width: ${({ $width }) => $width || "100%"};
    min-width: 0;
`;

const RangeHelpText = styled.p`
    ${({ $overlay }) =>
        $overlay &&
        `
            position: absolute;
            top: var(--range-help-top, calc(100% + 4px));
            left: 0;
            z-index: 30;
        `}
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    line-height: 18px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.color.semantic.error};
`;

const InlinePickerWrap = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing[4]};

    .ds-datepicker.air-datepicker {
        position: static;
        width: 100%;
    }
`;

const InlinePickerInput = styled.input`
    display: none;
`;

const FloatingHelpText = styled.p`
    position: fixed;
    top: ${({ $top }) => $top}px;
    left: ${({ $left }) => $left}px;
    z-index: 1001;
    width: ${({ $width }) => $width}px;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    line-height: 18px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.color.semantic.error};
    pointer-events: none;
`;

const DateInput = styled.input`
    ${bareInput}
    cursor: pointer;
`;

function parseDateValue(value, monthMode) {
    if (typeof value !== "string") return null;

    const match = value.trim().match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
    if (!match) return null;

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = monthMode ? 1 : Number(match[3] || 1);
    const date = new Date(year, month, day);

    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null;
    }

    return date;
}

function splitRangeValue(value) {
    if (Array.isArray(value)) {
        return [value[0] || "", value[1] || ""];
    }

    if (typeof value === "string" && value.includes("~")) {
        const [start = "", end = ""] = value.split(/\s*~\s*/);
        return [start, end];
    }

    return [value || "", ""];
}

function splitRangePlaceholder(placeholder) {
    if (Array.isArray(placeholder)) {
        return [placeholder[0] || "", placeholder[1] || ""];
    }

    if (typeof placeholder === "string" && placeholder.includes("~")) {
        const [start = "", end = ""] = placeholder.split(/\s*~\s*/);
        return [start, end];
    }

    return [placeholder, placeholder];
}

function getSelectedDates(value, monthMode) {
    const values = Array.isArray(value) || (typeof value === "string" && value.includes("~")) ? splitRangeValue(value) : [value];

    return values.map((item) => parseDateValue(item, monthMode)).filter(Boolean);
}

function getComparableTime(date, monthMode) {
    return new Date(date.getFullYear(), date.getMonth(), monthMode ? 1 : date.getDate()).getTime();
}

function isBeforeStartDate(date, startDate, monthMode) {
    return getComparableTime(date, monthMode) < getComparableTime(startDate, monthMode);
}

function formatDateValue(date, monthMode) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return monthMode ? `${year}-${month}` : `${year}-${month}-${day}`;
}

function getPickerClasses(state) {
    return ["ds-datepicker", state === "error" && "ds-datepicker--error"].filter(Boolean).join(" ");
}

function getScrollParents(node) {
    const parents = new Set([window]);
    let current = node?.parentElement;

    while (current && current !== document.body) {
        const { overflow, overflowX, overflowY } = window.getComputedStyle(current);

        if (/(auto|scroll|overlay)/.test(`${overflow}${overflowX}${overflowY}`)) {
            parents.add(current);
        }

        current = current.parentElement;
    }

    return [...parents];
}

function Datepicker({ state, placeholder = "날짜 선택", defaultValue, range = false, timepicker = false, view, visible = false, width, className }) {
    const disabled = state === "disabled";
    const readonly = state === "readonly";
    const locked = disabled || readonly;
    const inputRef = useRef(null);
    const inlineInputRef = useRef(null);
    const rangeEndInputRef = useRef(null);
    const dpRef = useRef(null);
    const singleBoxRef = useRef(null);
    const rangeStackRef = useRef(null);
    const rangeWrapRef = useRef(null);
    const rangeStartBoxRef = useRef(null);
    const rangeEndBoxRef = useRef(null);
    const activeRangeInputRef = useRef("start");
    const rangeStartDateRef = useRef(null);
    const rangeEndDateRef = useRef(null);
    const pendingSelectDateRef = useRef(null);
    const rangeErrorTimerRef = useRef(null);
    const [rangeValidationError, setRangeValidationError] = useState(false);
    const [rangeHelpPosition, setRangeHelpPosition] = useState({ top: 0, left: 0, width: 0 });
    const rangeValue = useMemo(() => splitRangeValue(defaultValue), [defaultValue]);
    const rangePlaceholder = useMemo(() => splitRangePlaceholder(placeholder), [placeholder]);

    const setRangeInputValues = useCallback((start = "", end = "") => {
        if (inputRef.current) inputRef.current.value = start;
        if (rangeEndInputRef.current) rangeEndInputRef.current.value = end;
    }, []);

    const syncRangeDatesFromInputs = useCallback((monthMode) => {
        rangeStartDateRef.current = parseDateValue(inputRef.current?.value, monthMode);
        rangeEndDateRef.current = parseDateValue(rangeEndInputRef.current?.value, monthMode);
    }, []);

    const clearRangeErrorTimer = useCallback(() => {
        if (!rangeErrorTimerRef.current) return;
        window.clearTimeout(rangeErrorTimerRef.current);
        rangeErrorTimerRef.current = null;
    }, []);

    const syncPickerSelection = useCallback(
        (datepicker, dates, startValue, endValue) => {
            window.setTimeout(async () => {
                datepicker.clear({ silent: true });
                if (dates.length) {
                    await datepicker.selectDate(dates, { silent: true });
                }
                datepicker.update({}, { silent: true });
                setRangeInputValues(startValue, endValue);
                window.setTimeout(() => {
                    setRangeInputValues(startValue, endValue);
                    // Air Datepicker는 시작 input에 붙어 있어 선택 후 시작칸으로 포커스가 돌아간다.
                    // 선택 중인 칸(종료면 종료 input)에 다시 포커스 → 그 칸이 "선택된" 것처럼 파란 테두리.
                    const activeInput = activeRangeInputRef.current === "end" ? rangeEndInputRef : inputRef;
                    activeInput.current?.focus();
                }, 0);
            }, 0);
        },
        [setRangeInputValues],
    );

    const showInvalidRangeSelection = useCallback(
        (datepicker, startDate, invalidEndDate, monthMode) => {
            const startValue = startDate ? formatDateValue(startDate, monthMode) : "";
            const invalidEndValue = formatDateValue(invalidEndDate, monthMode);

            clearRangeErrorTimer();
            rangeEndDateRef.current = invalidEndDate;
            setRangeInputValues(startValue, invalidEndValue);
            window.setTimeout(() => {
                setRangeInputValues(startValue, invalidEndValue);
            }, 0);
            setRangeValidationError(true);

            rangeErrorTimerRef.current = window.setTimeout(() => {
                rangeEndDateRef.current = null;
                setRangeInputValues(startValue, "");
                syncPickerSelection(datepicker, startDate ? [startDate] : [], startValue, "");
                setRangeValidationError(false);
                rangeErrorTimerRef.current = null;
            }, RANGE_ERROR_RESET_DELAY);
        },
        [clearRangeErrorTimer, setRangeInputValues, syncPickerSelection],
    );

    const positionPicker = useCallback(
        ({ $datepicker }) => {
            const POPUP_OFFSET = 4; // 입력칸과 캘린더 사이 간격
            const HELP_GAP = 4; // 캘린더와 helpText 사이 간격

            const apply = () => {
                const anchor = range ? rangeWrapRef.current : singleBoxRef.current;
                if (!anchor) return;

                if (visible) {
                    $datepicker.style.removeProperty("--adp-width");
                    $datepicker.style.removeProperty("--ds-pointer-left");
                    $datepicker.style.removeProperty("position");
                    $datepicker.style.removeProperty("left");
                    $datepicker.style.removeProperty("top");
                    anchor.style.marginBottom = "";
                    rangeStackRef.current?.style.removeProperty("--range-help-top");
                    return;
                }

                const pointerTarget =
                    range && activeRangeInputRef.current === "end" ? rangeEndBoxRef.current : rangeStartBoxRef.current || singleBoxRef.current || anchor;
                const anchorRect = anchor.getBoundingClientRect();
                const pointerRect = pointerTarget?.getBoundingClientRect() || anchorRect;
                // 입력칸 폭에 맞추되 최소 220px 보장.
                const popupWidth = Math.max(220, Math.round(anchorRect.width));
                const left = Math.round(anchorRect.left);
                const top = Math.round(anchorRect.bottom + POPUP_OFFSET);
                const pointerLeft = Math.round(pointerRect.left - anchorRect.left + pointerRect.width / 2 - 5);
                const clampedPointerLeft = Math.max(12, Math.min(popupWidth - 22, pointerLeft));

                $datepicker.style.setProperty("--adp-width", `${popupWidth}px`);
                $datepicker.style.setProperty("--ds-pointer-left", `${clampedPointerLeft}px`);
                $datepicker.style.position = "fixed";
                $datepicker.style.left = `${left}px`;
                $datepicker.style.top = `${top}px`;

                // 항상 열려있는(visible) 캘린더만 아래 공간을 확보한다(footer 등과 안 겹치게).
                // 클릭 팝업(라벨 필드)은 공간을 확보하지 않고 absolute로 겹쳐 떠서, 열려도 아래 인풋을 밀지 않는다.
                if (range && rangeStackRef.current) {
                    const pickerBottom = $datepicker.getBoundingClientRect().bottom;
                    const stackTop = rangeStackRef.current.getBoundingClientRect().top;
                    rangeStackRef.current.style.setProperty("--range-help-top", `${Math.max(0, Math.round(pickerBottom - stackTop + HELP_GAP))}px`);

                    const pickerRect = $datepicker.getBoundingClientRect();
                    setRangeHelpPosition((current) => {
                        const next = {
                            top: Math.round(pickerRect.bottom + HELP_GAP),
                            left: Math.round(anchorRect.left),
                            width: popupWidth,
                        };

                        return current.top === next.top && current.left === next.left && current.width === next.width ? current : next;
                    });
                } else {
                    anchor.style.marginBottom = "";
                }
            };

            // 즉시 + 다음 프레임 + 폰트 로드 후 재배치 — init 시 폰트 로드 전 stale 좌표로 간격이 어긋나는 것 방지.
            apply();
            requestAnimationFrame(apply);
            if (document.fonts?.ready) document.fonts.ready.then(apply);
        },
        [range, visible],
    );

    useEffect(() => {
        const pickerInput = visible ? inlineInputRef.current : inputRef.current;
        if (locked || !pickerInput) return;

        const monthMode = view === "months";
        const dateFormat = monthMode ? "yyyy-MM" : "yyyy-MM-dd";
        const selectedDates = getSelectedDates(defaultValue, monthMode);
        const initialRangeValue = splitRangeValue(defaultValue);
        rangeStartDateRef.current = parseDateValue(initialRangeValue[0], monthMode);
        rangeEndDateRef.current = parseDateValue(initialRangeValue[1], monthMode);

        dpRef.current = new AirDatepicker(pickerInput, {
            locale: localeKo,
            inline: visible,
            range,
            timepicker,
            view: view || "days",
            minView: monthMode ? "months" : "days",
            dateFormat,
            selectedDates: selectedDates.length ? selectedDates : false,
            multipleDatesSeparator: " ~ ",
            autoClose: !range && !visible,
            visible: false,
            offset: 0,
            classes: getPickerClasses(state),
            position: visible ? undefined : positionPicker,
            onBeforeSelect: ({ date }) => {
                pendingSelectDateRef.current = date;
                return true;
            },
            onSelect: ({ date, datepicker }) => {
                const selectedDate = pendingSelectDateRef.current || (Array.isArray(date) ? date[date.length - 1] : date);
                pendingSelectDateRef.current = null;
                if (!(selectedDate instanceof Date)) return;

                if (!range) {
                    if (visible && inputRef.current) {
                        inputRef.current.value = formatDateValue(selectedDate, monthMode);
                    }
                    return;
                }

                if (activeRangeInputRef.current === "end") {
                    const startDate = rangeStartDateRef.current;
                    if (startDate && isBeforeStartDate(selectedDate, startDate, monthMode)) {
                        showInvalidRangeSelection(datepicker, startDate, selectedDate, monthMode);
                        return;
                    }

                    rangeEndDateRef.current = selectedDate;
                    setRangeValidationError(false);
                    clearRangeErrorTimer();

                    const startValue = startDate ? formatDateValue(startDate, monthMode) : "";
                    const endValue = formatDateValue(selectedDate, monthMode);
                    const dates = startDate ? [startDate, selectedDate] : [selectedDate];

                    setRangeInputValues(startValue, endValue);
                    syncPickerSelection(datepicker, dates, startValue, endValue);
                    if (!visible) {
                        window.setTimeout(() => datepicker.hide?.(), 0);
                    }
                    return;
                }

                rangeStartDateRef.current = selectedDate;
                rangeEndDateRef.current = null;
                setRangeValidationError(false);
                clearRangeErrorTimer();

                const startValue = formatDateValue(selectedDate, monthMode);
                setRangeInputValues(startValue, "");
                syncPickerSelection(datepicker, [selectedDate], startValue, "");
            },
            onHide: (isFinished) => {
                if (!isFinished) return; // 숨김 애니메이션 끝난 뒤 여백 제거
                const anchor = range ? rangeWrapRef.current : singleBoxRef.current;
                if (anchor) anchor.style.marginBottom = "";
                rangeStackRef.current?.style.removeProperty("--range-help-top");
            },
        });

        const syncTimer = window.setTimeout(() => {
            setRangeInputValues(rangeValue[0], rangeValue[1]);
        }, 0);

        return () => {
            window.clearTimeout(syncTimer);
            clearRangeErrorTimer();
            dpRef.current?.destroy();
            dpRef.current = null;
        };
    }, [
        defaultValue,
        range,
        rangeValue,
        setRangeInputValues,
        syncPickerSelection,
        showInvalidRangeSelection,
        clearRangeErrorTimer,
        positionPicker,
        timepicker,
        locked,
        view,
        visible,
        state,
    ]);

    useEffect(() => {
        const picker = dpRef.current?.$datepicker;
        if (!picker) return;

        picker.classList.toggle("ds-datepicker--error", state === "error" || rangeValidationError);

        if (rangeValidationError && !visible) {
            window.requestAnimationFrame(() => {
                dpRef.current?.setPosition?.(positionPicker);
            });
        }
    }, [positionPicker, rangeValidationError, state, visible]);

    const showPicker = (target = "start") => {
        if (locked) return;
        const monthMode = view === "months";
        activeRangeInputRef.current = target;

        if (range && dpRef.current) {
            syncRangeDatesFromInputs(monthMode);

            const startDate = rangeStartDateRef.current;
            const endDate = rangeEndDateRef.current;
            const selectedDates = target === "end" && startDate && endDate ? [startDate, endDate] : [startDate].filter(Boolean);

            syncPickerSelection(dpRef.current, selectedDates, inputRef.current?.value || "", rangeEndInputRef.current?.value || "");
        }

        if (visible) {
            const focusInput = target === "end" ? rangeEndInputRef : inputRef;
            focusInput.current?.focus();
            return;
        }

        dpRef.current?.show();
        window.requestAnimationFrame(() => {
            dpRef.current?.setPosition?.(positionPicker);
        });
        // 선택한 칸에만 포커스가 가도록: 종료를 고를 땐 종료 input을, 아니면 시작/단독 input을 포커스.
        const focusInput = target === "end" ? rangeEndInputRef : inputRef;
        focusInput.current?.focus();
    };

    useEffect(() => {
        if (locked) return;

        const reposition = () => {
            window.requestAnimationFrame(() => {
                if (!dpRef.current?.visible) return;
                dpRef.current.setPosition?.(positionPicker);
            });
        };
        const scrollParents = getScrollParents(range ? rangeStackRef.current : singleBoxRef.current);

        scrollParents.forEach((parent) => parent.addEventListener("scroll", reposition, { passive: true }));
        window.addEventListener("resize", reposition, { passive: true });
        window.addEventListener("orientationchange", reposition, { passive: true });

        return () => {
            scrollParents.forEach((parent) => parent.removeEventListener("scroll", reposition));
            window.removeEventListener("resize", reposition);
            window.removeEventListener("orientationchange", reposition);
        };
    }, [locked, positionPicker, range]);

    if (range) {
        const startState = rangeValidationError ? "error" : state;
        const endState = state === "error" || rangeValidationError ? undefined : state;

        return (
            <>
                <DatepickerPopupStyle />
                <RangeStack ref={rangeStackRef} className={className} $width={width}>
                <RangeWrap ref={rangeWrapRef}>
                    <Box ref={rangeStartBoxRef} $state={startState} $grow onClick={() => showPicker("start")}>
                        <DateInput ref={inputRef} defaultValue={rangeValue[0]} placeholder={rangePlaceholder[0]} disabled={disabled} readOnly />
                        <Icon name="calendar" size="primary" />
                    </Box>
                    <RangeSeparator>~</RangeSeparator>
                    {/* error는 시작 input에만 표시(범위 에러는 시작칸 기준). disabled/readonly는 두 칸 모두 적용. */}
                    <Box ref={rangeEndBoxRef} $state={endState} $grow onClick={() => showPicker("end")}>
                        <DateInput ref={rangeEndInputRef} defaultValue={rangeValue[1]} placeholder={rangePlaceholder[1]} disabled={disabled} readOnly />
                        <Icon name="calendar" size="primary" />
                    </Box>
                </RangeWrap>
                    {visible && (
                        <InlinePickerWrap>
                            <InlinePickerInput ref={inlineInputRef} readOnly aria-hidden />
                        </InlinePickerWrap>
                    )}
                    {rangeValidationError &&
                        (visible ? (
                            <RangeHelpText>{RANGE_ERROR_MESSAGE}</RangeHelpText>
                        ) : (
                            createPortal(
                                <FloatingHelpText $top={rangeHelpPosition.top} $left={rangeHelpPosition.left} $width={rangeHelpPosition.width || 220}>
                                    {RANGE_ERROR_MESSAGE}
                                </FloatingHelpText>,
                                document.body,
                            )
                        ))}
                </RangeStack>
            </>
        );
    }

    return (
        <>
            <DatepickerPopupStyle />
            <Box ref={singleBoxRef} className={className} $state={state} $width={width} onClick={() => showPicker("start")}>
                <DateInput ref={inputRef} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} readOnly />
                <Icon name="calendar" size="primary" />
            </Box>
            {visible && (
                <InlinePickerWrap>
                    <InlinePickerInput ref={inlineInputRef} readOnly aria-hidden />
                </InlinePickerWrap>
            )}
        </>
    );
}

export default Datepicker;
