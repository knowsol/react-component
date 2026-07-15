import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { fieldBox, fieldStateStyle, stateStyle } from "../Field/fieldStyles";
import { Icon } from "@/components/Icon/Icon";
import { ICON } from "@/components/Icon/IconData";

const MIN_STEP = 10;
const RANGE_VALIDATE_DELAY = 800; // 스피너 조작이 멈춘 뒤, 최종값을 검증하기까지 기다리는 시간(ms)
const RANGE_ERROR_MESSAGE = "시작시간은 종료시간보다 늦을 수 없습니다.";

const RANGE_ERROR_RESET_DELAY = 3000;
const TIMEPICKER_CLOSE_DELAY = 800;

const pad = (n) => String(n).padStart(2, "0");

function parseTime(value) {
    if (typeof value !== "string") return null;

    const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;

    const h = Number(match[1]);
    const m = Number(match[2]);
    if (h > 23 || m > 59) return null;

    return { h, m: (Math.round(m / MIN_STEP) * MIN_STEP) % 60 };
}

function splitRangeValue(value) {
    if (Array.isArray(value)) return [value[0] || "", value[1] || ""];

    if (typeof value === "string" && value.includes("~")) {
        const [start = "", end = ""] = value.split(/\s*~\s*/);
        return [start, end];
    }

    return [value || "", ""];
}

function splitRangePlaceholder(placeholder) {
    if (Array.isArray(placeholder)) return [placeholder[0] || "", placeholder[1] || ""];

    if (typeof placeholder === "string" && placeholder.includes("~")) {
        const [start = "", end = ""] = placeholder.split(/\s*~\s*/);
        return [start, end];
    }

    return [placeholder, placeholder];
}

const toMinutes = (time) => time.h * 60 + time.m;
const formatTime = (time) => `${pad(time.h)}:${pad(time.m)}`;

function isBeforeStartTime(endValue, startValue) {
    const start = parseTime(startValue);
    const end = parseTime(endValue);

    return Boolean(start && end && toMinutes(end) < toMinutes(start));
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

const Box = styled.div`
    ${fieldBox}
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 8px 6px 12px;
    cursor: pointer;

    ${({ $open }) => $open && stateStyle.focus}
    ${fieldStateStyle("&:focus-within")}
`;

const TimeFieldShell = styled.div`
    width: ${({ $width }) => $width || "100%"};
    flex: ${({ $grow }) => ($grow ? "1 1 0" : "0 0 auto")};
    min-width: 0;
`;

const TimeText = styled.span`
    flex: 1;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.font.size.primary};
    line-height: 22px;
    color: ${({ theme, $placeholder }) => ($placeholder ? theme.color.neutral[600] : theme.color.neutral[900])};
`;

const RangeWrap = styled.div`
    display: flex;
    align-items: ${({ $visible }) => ($visible ? "flex-start" : "center")};
    gap: 8px;
    width: 100%;
    min-width: 0;
`;

const RangeStack = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    width: ${({ $width }) => $width || "100%"};
    min-width: 0;
`;

const RangeSeparator = styled.span`
    flex: 0 0 auto;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.small};
`;

const RangeHelpText = styled.p`
    ${({ $overlay, $popupOpen }) =>
        $overlay &&
        `
            position: absolute;
            top: ${$popupOpen ? "calc(100% + 104px)" : "calc(100% + 4px)"};
            left: 0;
            z-index: 30;
        `}
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    line-height: 18px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.color.semantic.error};
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

const Popup = styled.div`
    position: ${({ $inline }) => ($inline ? "static" : "fixed")};
    top: ${({ $top }) => $top}px;
    left: ${({ $left }) => $left}px;
    z-index: ${({ $inline }) => ($inline ? "auto" : 1000)};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: ${({ $minWidth }) => $minWidth}px;
    margin-top: ${({ $inline }) => ($inline ? "4px" : "0")};
    padding: 8px 14px;
    background: ${({ theme }) => theme.color.pure.white};
    border: 1px solid ${({ theme, $state }) => ($state === "error" ? theme.color.semantic.error : theme.color.neutral[300])};
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: default;
`;

const SpinnerCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
`;

const StepBtn = styled.button`
    display: inline-flex;
    padding: 2px 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    line-height: 1;
`;

const StepArrow = styled.img`
    width: 20px;
    height: 20px;
    transform: ${({ $down }) => ($down ? "rotate(180deg)" : "none")};
`;

const Num = styled.span`
    min-width: 26px;
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.medium};
    line-height: 26px;
    color: ${({ theme }) => theme.color.neutral[900]};
`;

const Colon = styled.span`
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.medium};
    line-height: 26px;
    padding: 0 2px;
`;

function TimeField({ state, popupState = state, placeholder = "HH:MM", defaultValue, value, width, grow, min, onChange, visible = false, onOpenChange, onPopupPositionChange }) {
    const disabled = state === "disabled";
    const readonly = state === "readonly";
    const locked = disabled || readonly;
    const isControlled = value !== undefined;
    const ref = useRef(null);
    const popupRef = useRef(null);
    const closeTimerRef = useRef(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, minWidth: 160 });

    const minTime = useMemo(() => parseTime(min), [min]);
    const clamp = useCallback(
        (time) => {
            if (!time) return null;
            return minTime && toMinutes(time) < toMinutes(minTime) ? { ...minTime } : time;
        },
        [minTime],
    );

    const getTime = useCallback((nextValue) => clamp(parseTime(nextValue)), [clamp]);
    const [internalTime, setInternalTime] = useState(() => getTime(defaultValue));
    const [openState, setOpenState] = useState(false);
    const time = isControlled ? getTime(value) : clamp(internalTime);
    const open = visible || openState;

    const updatePopupPosition = useCallback(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const popupHeight = popupRef.current?.getBoundingClientRect().height ?? 96;
        const next = {
            top: Math.round(rect.bottom + 4),
            left: Math.round(rect.left),
            minWidth: Math.max(160, Math.round(rect.width)),
        };

        setPopupPosition((current) => (current.top === next.top && current.left === next.left && current.minWidth === next.minWidth ? current : next));
        onPopupPositionChange?.({
            top: next.top,
            bottom: Math.round(next.top + popupHeight),
            left: next.left,
            width: next.minWidth,
        });
    }, [onPopupPositionChange]);

    useEffect(() => {
        if (!open || visible) return;

        const onDown = (event) => {
            if (ref.current?.contains(event.target) || popupRef.current?.contains(event.target)) return;
            setOpenState(false);
        };

        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open, visible]);

    useEffect(() => {
        onOpenChange?.(open);
    }, [onOpenChange, open]);

    useEffect(() => {
        if (open) return;
        onPopupPositionChange?.(null);
    }, [onPopupPositionChange, open]);

    useLayoutEffect(() => {
        if (!open || locked) return;

        updatePopupPosition();
        const rafId = window.requestAnimationFrame(updatePopupPosition);

        const handlePositionChange = () => {
            window.requestAnimationFrame(updatePopupPosition);
        };
        const scrollParents = getScrollParents(ref.current);

        scrollParents.forEach((parent) => parent.addEventListener("scroll", handlePositionChange, { passive: true }));
        window.addEventListener("resize", handlePositionChange, { passive: true });
        window.addEventListener("orientationchange", handlePositionChange, { passive: true });

        return () => {
            window.cancelAnimationFrame(rafId);
            scrollParents.forEach((parent) => parent.removeEventListener("scroll", handlePositionChange));
            window.removeEventListener("resize", handlePositionChange);
            window.removeEventListener("orientationchange", handlePositionChange);
        };
    }, [locked, onPopupPositionChange, open, updatePopupPosition]);

    useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

    const applyTime = (nextTime) => {
        const clampedTime = clamp(nextTime);
        if (!clampedTime) return;

        if (!isControlled) setInternalTime(clampedTime);
        onChange?.(formatTime(clampedTime));

        if (!visible) {
            window.clearTimeout(closeTimerRef.current);
            closeTimerRef.current = window.setTimeout(() => setOpenState(false), TIMEPICKER_CLOSE_DELAY);
        }
    };

    // 파싱되는 유효 시간은 스피너 형식(formatTime)으로, 파싱 안 되는 원문(데모용 "99:99" 등)은 그대로 노출한다.
    const rawValue = isControlled ? value : defaultValue;
    const displayText = time ? formatTime(time) : rawValue;
    const cur = time || { h: 0, m: 0 };
    const bumpHour = (delta) => applyTime({ h: (cur.h + delta + 24) % 24, m: cur.m });
    const bumpMin = (delta) => applyTime({ h: cur.h, m: (cur.m + delta * MIN_STEP + 60) % 60 });

    const toggleOpen = () => {
        if (locked) return;
        updatePopupPosition();
        setOpenState((prev) => (visible ? true : !prev));
    };

    const popup = open && !locked && (
        <Popup ref={popupRef} $inline={visible} $state={popupState} $top={popupPosition.top} $left={popupPosition.left} $minWidth={popupPosition.minWidth} onClick={(event) => event.stopPropagation()}>
            <SpinnerCol>
                <StepBtn type="button" onClick={() => bumpHour(1)} aria-label="시 올림">
                    <StepArrow src={ICON.spinnerTime} alt="" aria-hidden />
                </StepBtn>
                <Num>{pad(cur.h)}</Num>
                <StepBtn type="button" onClick={() => bumpHour(-1)} aria-label="시 내림">
                    <StepArrow src={ICON.spinnerTime} $down alt="" aria-hidden />
                </StepBtn>
            </SpinnerCol>
            <Colon>:</Colon>
            <SpinnerCol>
                <StepBtn type="button" onClick={() => bumpMin(1)} aria-label="분 올림">
                    <StepArrow src={ICON.spinnerTime} alt="" aria-hidden />
                </StepBtn>
                <Num>{pad(cur.m)}</Num>
                <StepBtn type="button" onClick={() => bumpMin(-1)} aria-label="분 내림">
                    <StepArrow src={ICON.spinnerTime} $down alt="" aria-hidden />
                </StepBtn>
            </SpinnerCol>
        </Popup>
    );

    return (
        <TimeFieldShell $width={width} $grow={grow}>
            <Box ref={ref} $state={state} $open={open} onClick={toggleOpen}>
                <TimeText $placeholder={!displayText}>{displayText || placeholder}</TimeText>
                <Icon name="time" size="medium" />
            </Box>
            {popup && (visible ? popup : createPortal(popup, document.body))}
        </TimeFieldShell>
    );
}

function TimeRangePicker({ state, placeholder, defaultValue, width, className, visible, showHelpText }) {
    const initialValue = useMemo(() => splitRangeValue(defaultValue), [defaultValue]);
    const rangePlaceholder = useMemo(() => splitRangePlaceholder(placeholder), [placeholder]);
    const [startValue, setStartValue] = useState(initialValue[0]);
    const [endValue, setEndValue] = useState(initialValue[1]);
    // 초기값이 이미 잘못된 범위면(Error 데모) 처음부터 에러를 노출한다. 이후 조작은 디바운스로 최종값만 검증.
    const [rangeError, setRangeError] = useState(() => Boolean(initialValue[1]) && isBeforeStartTime(initialValue[1], initialValue[0]));
    // 스피너를 올리고 내리는 "도중"의 중간값은 무시하고, 조작이 멈춘 최종값만 검증하기 위해
    // 최신 start/end를 ref로 추적하고, 마지막 변경 후 일정 시간이 지나면 그때 한 번만 판단한다.
    const latestRef = useRef({ start: initialValue[0], end: initialValue[1] });
    const validateTimerRef = useRef(null);
    const errorTimerRef = useRef(null);
    const rangeStackRef = useRef(null);
    const [popupOpenState, setPopupOpenState] = useState({ start: false, end: false });
    const [popupPositionState, setPopupPositionState] = useState({ start: null, end: null });
    const [helpPosition, setHelpPosition] = useState({ top: 0, left: 0, width: 0 });
    const popupOpen = popupOpenState.start || popupOpenState.end;
    const handleStartOpenChange = useCallback((open) => {
        setPopupOpenState((current) => ({ ...current, start: open }));
    }, []);
    const handleEndOpenChange = useCallback((open) => {
        setPopupOpenState((current) => ({ ...current, end: open }));
    }, []);
    const handleStartPopupPositionChange = useCallback((position) => {
        setPopupPositionState((current) => ({ ...current, start: position }));
    }, []);
    const handleEndPopupPositionChange = useCallback((position) => {
        setPopupPositionState((current) => ({ ...current, end: position }));
    }, []);

    const updateHelpPosition = useCallback(() => {
        const stackRect = rangeStackRef.current?.getBoundingClientRect();
        if (!stackRect) return;

        const activePopupPosition = popupPositionState.end || popupPositionState.start;
        const next = {
            top: Math.round((activePopupPosition?.bottom ?? stackRect.bottom) + 4),
            left: Math.round(stackRect.left),
            width: Math.max(160, Math.round(stackRect.width)),
        };

        setHelpPosition((current) => (current.top === next.top && current.left === next.left && current.width === next.width ? current : next));
    }, [popupPositionState.end, popupPositionState.start]);

    useLayoutEffect(() => {
        if (!rangeError || visible) return;

        updateHelpPosition();
        const rafId = window.requestAnimationFrame(updateHelpPosition);

        window.addEventListener("resize", updateHelpPosition);
        window.addEventListener("orientationchange", updateHelpPosition);
        window.addEventListener("scroll", updateHelpPosition, true);

        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("resize", updateHelpPosition);
            window.removeEventListener("orientationchange", updateHelpPosition);
            window.removeEventListener("scroll", updateHelpPosition, true);
        };
    }, [rangeError, updateHelpPosition, visible]);

    const scheduleValidation = useCallback(() => {
        window.clearTimeout(validateTimerRef.current);
        window.clearTimeout(errorTimerRef.current);
        validateTimerRef.current = window.setTimeout(() => {
            const { start, end } = latestRef.current;
            const invalid = Boolean(end) && isBeforeStartTime(end, start);
            setRangeError(invalid);

            if (invalid) {
                errorTimerRef.current = window.setTimeout(() => {
                    latestRef.current.end = "";
                    setEndValue("");
                    setRangeError(false);
                    errorTimerRef.current = null;
                }, RANGE_ERROR_RESET_DELAY);
            }
        }, RANGE_VALIDATE_DELAY);
    }, []);

    useEffect(
        () => () => {
            window.clearTimeout(validateTimerRef.current);
            window.clearTimeout(errorTimerRef.current);
        },
        [],
    );

    const handleStartChange = (nextValue) => {
        latestRef.current.start = nextValue;
        setStartValue(nextValue);
        setRangeError(false); // 다시 조작을 시작하면 에러를 숨기고, 멈춘 뒤 최종값으로 다시 판단
        scheduleValidation();
    };

    const handleEndChange = (nextValue) => {
        latestRef.current.end = nextValue;
        setEndValue(nextValue);
        setRangeError(false);
        scheduleValidation();
    };

    const startState = rangeError ? "error" : state;

    return (
        <RangeStack ref={rangeStackRef} className={className} $width={width}>
            <RangeWrap $visible={visible}>
                <TimeField
                    state={startState}
                    popupState={startState}
                    value={startValue}
                    placeholder={rangePlaceholder[0]}
                    grow
                    visible={visible}
                    onChange={handleStartChange}
                    onOpenChange={handleStartOpenChange}
                    onPopupPositionChange={handleStartPopupPositionChange}
                />
                <RangeSeparator>~</RangeSeparator>
                <TimeField state={state} value={endValue} placeholder={rangePlaceholder[1]} grow onChange={handleEndChange} onOpenChange={handleEndOpenChange} onPopupPositionChange={handleEndPopupPositionChange} />
            </RangeWrap>
            {rangeError && showHelpText && visible && (
                <RangeHelpText $overlay={!visible} $popupOpen={popupOpen}>
                    {RANGE_ERROR_MESSAGE}
                </RangeHelpText>
            )}
            {rangeError &&
                showHelpText &&
                !visible &&
                createPortal(
                    <FloatingHelpText $top={helpPosition.top} $left={helpPosition.left} $width={helpPosition.width || 160}>
                        {RANGE_ERROR_MESSAGE}
                    </FloatingHelpText>,
                    document.body,
                )}
        </RangeStack>
    );
}

function Timepicker({ state, placeholder = "00:00", defaultValue, range = false, width, className, min, onChange, visible = false, showHelpText = true }) {
    if (range) {
        return <TimeRangePicker key={`${defaultValue || ""}-${placeholder || ""}`} state={state} placeholder={placeholder} defaultValue={defaultValue} width={width} className={className} visible={visible} showHelpText={showHelpText} />;
    }

    return <TimeField state={state} defaultValue={defaultValue} placeholder={placeholder} width={width} min={min} onChange={onChange} visible={visible} />;
}

export default Timepicker;
