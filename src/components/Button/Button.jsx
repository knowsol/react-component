import styled, { css } from "styled-components";

const variants = {
    primary: css`
        padding: 10px 24px;
        min-width: ${({ $minWidth }) => $minWidth ?? "240px"};
        font-size: ${({ theme }) => theme.font.size.medium};
        font-weight: ${({ theme }) => theme.font.weight.medium};
        line-height: 26px;
        letter-spacing: -0.02em;
        border: 1px solid transparent;
        border-radius: ${({ theme }) => theme.border.radius.small};
    `,
    secondary: css`
        padding: 10px 20px;
        min-width: ${({ $minWidth }) => $minWidth ?? "80px"};
        font-size: ${({ theme }) => theme.font.size.primary};
        font-weight: ${({ theme }) => theme.font.weight.regular};
        line-height: 24px;
        letter-spacing: -0.02em;
        border: 1px solid transparent;
        border-radius: ${({ theme }) => theme.border.radius.xsmall};
    `,
    tertiary: css`
        padding: 2px 4px;
        min-width: ${({ $minWidth }) => $minWidth ?? "0"};
        font-size: ${({ theme }) => theme.font.size.xsmall};
        font-weight: ${({ theme }) => theme.font.weight.regular};
        line-height: 22px;
        letter-spacing: -0.02em;
        border: 1px solid transparent;
        border-radius: ${({ theme }) => theme.border.radius.xsmall};
    `,
};

const resolveColorToken = (theme, colorToken) => {
    if (!colorToken) return undefined;

    return colorToken.split(".").reduce((color, key) => color?.[key], theme.color);
};

const solidColor = ({ theme, $variant, $colorToken }) => resolveColorToken(theme, $colorToken) ?? ($variant === "primary" ? theme.color.brand.blue : theme.color.secondary[500]);

const solidHoverColor = (props) => `color-mix(in srgb, ${solidColor(props)} 88%, ${props.theme.color.pure.black})`;
const solidActiveColor = (props) => `color-mix(in srgb, ${solidColor(props)} 76%, ${props.theme.color.pure.black})`;

const solidKind = css`
    background-color: ${solidColor};
    border-color: ${solidColor};
    color: ${({ theme }) => theme.color.pure.white};
    transition:
        background-color 160ms ease,
        border-color 160ms ease;

    @media (hover: hover) and (pointer: fine) {
        &:not(:disabled):hover {
            background-color: ${solidHoverColor};
            border-color: ${solidHoverColor};
        }
    }

    &:not(:disabled):active {
        background-color: ${solidActiveColor};
        border-color: ${solidActiveColor};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.color.neutral[500]};
        border-color: ${({ theme }) => theme.color.neutral[500]};
        color: ${({ theme }) => theme.color.pure.white};
    }
`;

const kinds = {
    solidDeep: solidKind,
    solid: solidKind,
    outline: css`
        background-color: ${({ theme }) => theme.color.pure.white};
        border-color: ${({ theme, $variant }) => ($variant === "primary" ? theme.color.neutral[900] : theme.color.neutral[400])};
        color: ${({ theme }) => theme.color.neutral[900]};
        transition: background-color 160ms ease;

        @media (hover: hover) and (pointer: fine) {
            &:not(:disabled):hover {
                background-color: ${({ theme }) => theme.color.neutral[50]};
            }
        }

        &:not(:disabled):active {
            background-color: ${({ theme }) => theme.color.neutral[300]};
        }

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[50]};
            border-color: ${({ theme }) => theme.color.neutral[400]};
            color: ${({ theme }) => theme.color.neutral[600]};
        }
    `,
    outlineBlue: css`
        background-color: ${({ theme }) => theme.color.pure.white};
        border-color: ${({ theme }) => theme.color.secondary[500]};
        color: ${({ theme }) => theme.color.secondary[500]};
        transition: background-color 160ms ease;

        @media (hover: hover) and (pointer: fine) {
            &:not(:disabled):hover {
                background-color: ${({ theme }) => theme.color.secondary[20]};
            }
        }

        &:not(:disabled):active {
            background-color: ${({ theme }) => theme.color.secondary[100]};
        }

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[50]};
            border-color: ${({ theme }) => theme.color.neutral[500]};
            color: ${({ theme }) => theme.color.neutral[500]};
        }
    `,
    selected: css`
        background-color: ${({ theme }) => theme.color.secondary[100]};
        border-color: ${({ theme }) => theme.color.secondary[500]};
        color: ${({ theme }) => theme.color.neutral[900]};

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[50]};
            border-color: ${({ theme }) => theme.color.neutral[300]};
            color: ${({ theme }) => theme.color.neutral[500]};
        }
    `,
    readonly: css`
        background-color: ${({ theme }) => theme.color.neutral[50]};
        border-color: ${({ theme }) => theme.color.neutral[300]};
        color: ${({ theme }) => theme.color.neutral[600]};
        cursor: default;
    `,
    gray: css`
        background-color: ${({ theme }) => theme.color.neutral[300]};
        border-color: ${({ theme }) => theme.color.neutral[300]};
        color: ${({ theme }) => theme.color.neutral[700]};

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[50]};
            border-color: ${({ theme }) => theme.color.neutral[50]};
            color: ${({ theme }) => theme.color.neutral[500]};
        }
    `,
    iconBox: css`
        min-width: ${({ $minWidth }) => $minWidth ?? "0"};
        padding: 6px;
        background-color: ${({ theme }) => theme.color.primary[100]};
        border-color: ${({ theme }) => theme.color.secondary[500]};
        border-radius: 4px;
        transition:
            background-color 160ms ease,
            border-color 160ms ease;

        @media (hover: hover) and (pointer: fine) {
            &:not(:disabled):hover {
                background-color: ${({ theme }) => `color-mix(in srgb, ${theme.color.primary[500]} 18%, transparent)`};
                border-color: ${({ theme }) => `color-mix(in srgb, ${theme.color.secondary[500]} 88%, ${theme.color.pure.black})`};
            }
        }

        &:not(:disabled):active {
            background-color: ${({ theme }) => `color-mix(in srgb, ${theme.color.primary[500]} 26%, transparent)`};
            border-color: ${({ theme }) => `color-mix(in srgb, ${theme.color.secondary[500]} 76%, ${theme.color.pure.black})`};
        }

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[50]};
            border-color: transparent;
        }
    `,
    text: css`
        background-color: transparent;
        border-color: transparent;
        color: ${({ theme }) => theme.color.secondary[500]};

        &:disabled {
            color: ${({ theme }) => theme.color.neutral[500]};
        }
    `,
    link: css`
        background-color: transparent;
        border-color: transparent;
        color: ${({ theme }) => theme.color.secondary[500]};
        text-decoration: underline;
        text-underline-offset: 3px;

        &:disabled {
            color: ${({ theme }) => theme.color.neutral[500]};
        }
    `,
    more: css`
        padding: 3px 10px;
        min-width: ${({ $minWidth }) => $minWidth ?? "0"};
        background-color: ${({ theme }) => theme.color.neutral[900]};
        border-color: ${({ theme }) => theme.color.neutral[900]};
        color: ${({ theme }) => theme.color.pure.white};
        font-size: ${({ theme }) => theme.font.size.xsmall};

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[400]};
            border-color: ${({ theme }) => theme.color.neutral[400]};
            color: ${({ theme }) => theme.color.pure.white};
        }
    `,
    moreLine: css`
        padding: 3px 10px;
        min-width: ${({ $minWidth }) => $minWidth ?? "0"};
        background-color: ${({ theme }) => theme.color.pure.white};
        border-color: ${({ theme }) => theme.color.neutral[300]};
        color: ${({ theme }) => theme.color.neutral[900]};
        font-size: ${({ theme }) => theme.font.size.xsmall};

        &:disabled {
            background-color: ${({ theme }) => theme.color.neutral[50]};
            border-color: transparent;
            color: ${({ theme }) => theme.color.neutral[500]};
        }
    `,
};

const defaultKind = {
    primary: "solid",
    secondary: "outline",
    tertiary: "text",
};

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ $gap }) => $gap ?? "4px"};
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;

    ${({ $variant }) => variants[$variant] || variants.primary}
    ${({ $kind }) => kinds[$kind] || kinds.solid}

    ${({ $padding }) => $padding && `padding: ${$padding};`}
    ${({ $margin }) => $margin && `margin: ${$margin};`}
    ${({ $width }) => $width && `width: ${$width}; min-width: ${$width};`}
    ${({ $minWidth }) => $minWidth && `min-width: ${$minWidth};`}
    ${({ $height }) => $height && `height: ${$height};`}
    ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}

    &:disabled {
        cursor: default;
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: 2px;
    }
`;

const ButtonBetween = styled(StyledButton)`
    justify-content: space-between;
`;

function Button({ type = "button", variant = "primary", kind, between = false, disabled = false, padding, margin, width, minWidth, height, minHeight, gap, colorToken, children, ...buttonProps }) {
    const Component = between ? ButtonBetween : StyledButton;
    const resolvedKind = kind ?? defaultKind[variant] ?? defaultKind.primary;

    return (
        <Component
            type={type}
            $variant={variant}
            $kind={resolvedKind}
            $padding={padding}
            $margin={margin}
            $width={width}
            $minWidth={minWidth}
            $height={height}
            $minHeight={minHeight}
            $gap={gap}
            $colorToken={colorToken}
            disabled={disabled}
            {...buttonProps}
        >
            {children}
        </Component>
    );
}

export default Button;
