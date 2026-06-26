import React from "react";
import styled, { css } from "styled-components";

const stateStyle = {
    focus: css`
        border-color: ${({ theme }) => theme.color.secondary[500]};
        color: ${({ theme }) => theme.color.neutral[900]};
        outline: none;
    `,
    hover: css`
        border-color: ${({ theme }) => theme.color.secondary[500]};
    `,
    disabled: css`
        background-color: ${({ theme }) => theme.color.neutral[50]};
        color: ${({ theme }) => theme.color.neutral[500]};
        outline: none;
        &:hover {
            border-color: ${({ theme }) => theme.color.neutral[300]};
        }
    `,
    readonly: css`
        background-color: ${({ theme }) => theme.color.neutral[50]};
        color: ${({ theme }) => theme.color.neutral[900]};
        outline: none;
        &:hover {
            border-color: ${({ theme }) => theme.color.neutral[300]};
        }
    `,
    error: css`
        border-color: ${({ theme }) => theme.color.semantic.error};
        color: ${({ theme }) => theme.color.neutral[900]};
        outline: none;
    `,
    success: css`
        border-color: ${({ theme }) => theme.color.semantic.success};
        color: ${({ theme }) => theme.color.neutral[900]};
        outline: none;
    `,
    info: css`
        border-color: ${({ theme }) => theme.color.semantic.info};
        color: ${({ theme }) => theme.color.neutral[900]};
        outline: none;
    `,
};

const InputStyle = styled.input`
    max-width: 100%;
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.neutral[900]};
    line-height: 24px;
    letter-spacing: -0.3px;
    background-color: ${({ theme }) => theme.color.pure.white};

    &::placeholder {
        color: ${({ theme }) => theme.color.neutral[600]};
    }

    &:focus {
        ${stateStyle.focus}
    }
    &:hover {
        ${stateStyle.hover}
    }
    &:disabled {
        ${stateStyle.disabled}
    }
    &:read-only {
        ${stateStyle.readonly}
    }

    ${({ $state }) => $state && stateStyle[$state]}
`;

function Input({ state, ...rest }) {
    return <InputStyle $state={state} {...rest} />;
}

export default Input;
