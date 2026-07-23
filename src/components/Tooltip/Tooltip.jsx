import { cloneElement, isValidElement, useId } from "react";
import styled, { css } from "styled-components";

const placementStyles = {
    top: css`
        bottom: calc(100% + ${({ theme }) => theme.spacing[8]});
        left: 50%;
        transform: translateX(-50%);
    `,
    right: css`
        top: 50%;
        left: calc(100% + ${({ theme }) => theme.spacing[8]});
        transform: translateY(-50%);
    `,
    bottom: css`
        top: calc(100% + ${({ theme }) => theme.spacing[8]});
        left: 50%;
        transform: translateX(-50%);
    `,
    left: css`
        top: 50%;
        right: calc(100% + ${({ theme }) => theme.spacing[8]});
        transform: translateY(-50%);
    `,
};

const TooltipBubble = styled.span`
    position: absolute;
    z-index: 100;
    width: max-content;
    max-width: ${({ $maxWidth }) => $maxWidth};
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    background: ${({ theme }) => theme.color.neutral[800]};
    color: ${({ theme }) => theme.color.pure.white};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
    text-align: left;
    white-space: normal;
    overflow-wrap: anywhere;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition:
        opacity 120ms ease,
        visibility 120ms ease;

    ${({ $placement }) => placementStyles[$placement] ?? placementStyles.top}
`;

const TooltipTitle = styled.span`
    display: block;
    color: ${({ theme }) => theme.color.semantic.error};
    font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const TooltipContent = styled.span`
    display: block;
`;

const TooltipRoot = styled.span`
    position: relative;
    display: inline-flex;
    align-self: flex-start;

    &:hover ${TooltipBubble},
    &:focus-within ${TooltipBubble} {
        opacity: 1;
        visibility: visible;
    }
`;

function Tooltip({ title, content, placement = "top", maxWidth = "240px", id, className, children }) {
    const generatedId = useId();
    const tooltipId = id ?? `tooltip-${generatedId}`;

    if (content == null || content === "") return children;

    const trigger = isValidElement(children)
        ? cloneElement(children, {
              "aria-describedby": [children.props["aria-describedby"], tooltipId].filter(Boolean).join(" "),
          })
        : (
              <span tabIndex={0} aria-describedby={tooltipId}>
                  {children}
              </span>
          );

    return (
        <TooltipRoot className={className}>
            {trigger}
            <TooltipBubble id={tooltipId} role="tooltip" $placement={placement} $maxWidth={maxWidth} data-placement={placement}>
                {title && <TooltipTitle>{title}</TooltipTitle>}
                <TooltipContent>{content}</TooltipContent>
            </TooltipBubble>
        </TooltipRoot>
    );
}

export default Tooltip;
