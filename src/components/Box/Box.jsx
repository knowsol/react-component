import React from "react";
import styled, { css } from "styled-components";

const variants = {
    bgline: css`
        background-color: ${({ theme }) => theme.color.secondary.c50};
        border: 4px solid ${({ theme }) => theme.color.neutral[300]};
        border-radius: ${({ theme }) => theme.border.radius.large};
        width: 100%;
    `,
    bg: css`
        background-color: ${({ theme }) => theme.color.secondary.c50};
        border: 4px solid transparent;
        border-radius: ${({ theme }) => theme.border.radius.large};
        width: 100%;
    `,
    outline: css`
        background-color: ${({ theme }) => theme.color.pure.white};
        border: 4px solid ${({ theme }) => theme.color.neutral[300]};
        border-radius: ${({ theme }) => theme.border.radius.large};
        width: 100%;
    `,
    normal: css`
        background-color: ${({ theme }) => theme.color.pure.white};
        border: 4px solid transparent;
        width: 100%;
    `,
};

const StyledBox = styled.div`
    ${({ $variant }) => variants[$variant] || variants.normal}
    padding: ${({ $padding }) => $padding || "0"};
    margin: ${({ $margin }) => $margin || "0"};
`;

function Box({ variant = "normal", padding, margin, children }) {
    return (
        <StyledBox $variant={variant} $padding={padding} $margin={margin}>
            {children}
        </StyledBox>
    );
}

export default Box;
