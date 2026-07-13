import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import Button from "./Button";

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const RefreshIcon = styled(Icon)`
    ${({ $spinning }) =>
        $spinning &&
        css`
            animation: ${spin} 1s linear infinite;
        `}
`;

function RefreshButton({ duration = 3000, iconName = "refresh", iconSize = "primary", onClick, ...buttonProps }) {
    const [spinning, setSpinning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => () => window.clearTimeout(timerRef.current), []);

    const handleClick = (event) => {
        setSpinning(true);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setSpinning(false), duration);
        onClick?.(event);
    };

    return (
        <Button variant="secondary" kind="iconBox" width="36px" aria-label="검색 조건 초기화" onClick={handleClick} {...buttonProps}>
            <RefreshIcon name={iconName} size={iconSize} $spinning={spinning} />
        </Button>
    );
}

export default RefreshButton;
