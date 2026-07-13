import { useEffect, useId, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import Button from "@/components/Button/Button";

const overlayJustifyContent = {
    center: "center",
    left: "flex-start",
    right: "flex-end",
};

let scrollLockCount = 0;
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";
let previousRootOverflow = "";

const lockDocumentScroll = () => {
    if (scrollLockCount === 0) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;

        previousBodyOverflow = document.body.style.overflow;
        previousBodyPaddingRight = document.body.style.paddingRight;
        previousRootOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
        document.documentElement.style.overflow = "hidden";
    }

    scrollLockCount += 1;
};

const unlockDocumentScroll = () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);

    if (scrollLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.paddingRight = previousBodyPaddingRight;
        document.documentElement.style.overflow = previousRootOverflow;
    }
};

const LayerOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: ${({ $zIndex }) => $zIndex};
    display: flex;
    align-items: ${({ $placement }) => ($placement === "center" ? "center" : "stretch")};
    justify-content: ${({ $placement }) => overlayJustifyContent[$placement] ?? overlayJustifyContent.center};
    padding: ${({ theme, $placement }) => ($placement === "center" ? theme.spacing[32] : "0")};
    overflow: hidden;
    overscroll-behavior: contain;
    background: rgba(0, 0, 0, 0.35);
`;

const LayerDialog = styled.div`
    position: relative;
    width: min(100%, ${({ $width }) => $width});
    height: ${({ $placement }) => ($placement === "center" ? "auto" : "100vh")};
    min-height: ${({ $minHeight }) => $minHeight};
    max-height: ${({ $placement }) => ($placement === "center" ? "calc(100vh - 64px)" : "100vh")};
    padding: ${({ $padding }) => $padding};
    display: flex;
    flex-direction: column;
    align-items: ${({ $contentMode }) => ($contentMode === "custom" ? "stretch" : "center")};
    justify-content: ${({ $contentMode }) => ($contentMode === "custom" ? "flex-start" : "center")};
    overflow-y: ${({ $placement }) => ($placement === "center" ? "auto" : "hidden")};
    outline: none;
    border-radius: ${({ theme, $placement }) => ($placement === "center" ? theme.border.radius.medium : "0")};
    background: ${({ theme }) => theme.color.pure.white};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${({ theme }) => theme.icon.medium};
    height: ${({ theme }) => theme.icon.medium};
    padding: 0;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.color.neutral[900]};
    cursor: pointer;
`;

const CloseIcon = styled.svg`
    width: ${({ theme }) => theme.icon.medium};
    height: ${({ theme }) => theme.icon.medium};
    flex-shrink: 0;
`;

const LayerContent = styled.div`
    width: 100%;
    max-width: 100%;
    ${({ theme, $contentMode }) =>
        $contentMode === "custom"
            ? css`
                  flex: 1 1 auto;
                  min-height: 0;
                  color: ${theme.color.neutral[900]};
                  font-size: ${theme.font.size.primary};
                  font-weight: ${theme.font.weight.regular};
                  line-height: 24px;
                  letter-spacing: 0;
                  text-align: left;
                  white-space: normal;
              `
            : css`
                  color: ${theme.color.neutral[900]};
                  font-size: ${theme.font.size.xl};
                  font-weight: ${theme.font.weight.semibold};
                  line-height: 32px;
                  letter-spacing: -0.02em;
                  text-align: center;
                  white-space: pre-line;
              `}
`;

const ActionRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[8]};
    margin-top: 32px;
`;

const normalizeAction = (action) => ({
    variant: "primary",
    kind: "solid",
    minWidth: "154px",
    height: "48px",
    padding: "0 24px",
    closeOnClick: true,
    ...action,
});

function LayerPopup({
    open = false,
    width = "400px",
    minHeight = "136px",
    zIndex = 1000,
    title,
    children,
    actions,
    cancelText,
    confirmText = "확인",
    placement = "center",
    padding = "48px 40px 32px",
    contentMode = "message",
    onCancel,
    onConfirm,
    onClose,
    showClose = true,
    closeOnOverlay = false,
    closeOnEsc = true,
    closeLabel = "닫기",
    ariaLabel,
    className,
}) {
    const titleId = useId();
    const dialogRef = useRef(null);
    const resolvedActions = useMemo(() => {
        if (actions === false) return [];
        if (Array.isArray(actions)) return actions.map(normalizeAction);

        return [
            cancelText &&
                normalizeAction({
                    label: cancelText,
                    kind: "outline",
                    onClick: onCancel,
                }),
            confirmText &&
                normalizeAction({
                    label: confirmText,
                    kind: "solid",
                    onClick: onConfirm,
                }),
        ].filter(Boolean);
    }, [actions, cancelText, confirmText, onCancel, onConfirm]);

    useEffect(() => {
        if (!open || !closeOnEsc) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose?.(event);
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeOnEsc, onClose, open]);

    useEffect(() => {
        if (!open) return undefined;

        const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 0);
        return () => window.clearTimeout(focusTimer);
    }, [open]);

    useEffect(() => {
        if (!open || typeof document === "undefined") return undefined;

        lockDocumentScroll();
        return unlockDocumentScroll;
    }, [open]);

    if (!open || typeof document === "undefined") return null;

    const handleOverlayClick = (event) => {
        if (closeOnOverlay && event.target === event.currentTarget) onClose?.(event);
    };

    const handleActionClick = (action, event) => {
        action.onClick?.(event);
        if (action.closeOnClick) onClose?.(event, action);
    };

    const popup = (
        <LayerOverlay $zIndex={zIndex} $placement={placement} onClick={handleOverlayClick}>
            <LayerDialog
                ref={dialogRef}
                className={className}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabel ? undefined : titleId}
                tabIndex={-1}
                $width={width}
                $minHeight={minHeight}
                $placement={placement}
                $padding={padding}
                $contentMode={contentMode}
                onClick={(event) => event.stopPropagation()}
            >
                {showClose && (
                    <CloseButton type="button" aria-label={closeLabel} onClick={onClose}>
                        <CloseIcon viewBox="0 0 21 21" fill="none" aria-hidden="true" focusable="false">
                            <path d="M20 0.353546L0 20.3535" stroke="currentColor" strokeLinejoin="round" />
                            <path d="M0 0.353546L20 20.3535" stroke="currentColor" strokeLinejoin="round" />
                        </CloseIcon>
                    </CloseButton>
                )}
                <LayerContent id={titleId} $contentMode={contentMode}>
                    {children ?? title}
                </LayerContent>
                {resolvedActions.length > 0 && (
                    <ActionRow>
                        {resolvedActions.map((action, index) => (
                            <Button
                                key={action.key ?? `${action.label ?? action.children}-${index}`}
                                variant={action.variant}
                                kind={action.kind}
                                minWidth={action.minWidth}
                                width={action.width}
                                height={action.height}
                                padding={action.padding}
                                disabled={action.disabled}
                                onClick={(event) => handleActionClick(action, event)}
                                aria-label={action.ariaLabel}
                            >
                                {action.children ?? action.label}
                            </Button>
                        ))}
                    </ActionRow>
                )}
            </LayerDialog>
        </LayerOverlay>
    );

    return createPortal(popup, document.body);
}

export default LayerPopup;
