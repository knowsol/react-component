import styled from "styled-components";
import Button from "@/components/Button/Button";
import Dropbox from "@/components/Dropbox/Dropbox";

const ActionArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[24]};
    min-width: 0;
`;

const ButtonGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
`;

const SelectGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[8]};
`;

const SelectLabel = styled.span`
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    line-height: 18px;
`;

const SelectBox = styled.div`
    width: ${({ $width }) => $width ?? "160px"};
`;

function TableActions({ actions = [], selects = [], children }) {
    if (!actions.length && !selects.length && !children) return null;

    return (
        <ActionArea>
            {children}
            {actions.length > 0 && (
                <ButtonGroup>
                    {actions.map((action, index) => {
                        const text = action.children ?? action.text;
                        const textLength = typeof text === "string" ? text.length : 0;

                        return (
                            <Button
                                key={action.key ?? `${action.text}-${index}`}
                                variant={action.variant ?? "secondary"}
                                kind={action.kind ?? "solid"}
                                disabled={action.disabled}
                                minWidth={action.minWidth ?? (textLength > 4 ? "88px" : "66px")}
                                width={action.width}
                                height={action.height ?? "36px"}
                                padding={action.padding}
                                onClick={action.onClick}
                                aria-label={action.ariaLabel}
                            >
                                {text}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            )}
            {selects.map((select, index) => {
                const controlled = select.value !== undefined && typeof select.onSelect === "function";

                return (
                    <SelectGroup key={select.key ?? `${select.value}-${index}`}>
                        {select.label && <SelectLabel>{select.label}</SelectLabel>}
                        <SelectBox $width={select.width}>
                            <Dropbox
                                value={controlled ? select.value : undefined}
                                defaultValue={controlled ? undefined : select.value}
                                options={select.options ?? []}
                                placeholder={select.placeholder}
                                onSelect={select.onSelect}
                            />
                        </SelectBox>
                    </SelectGroup>
                );
            })}
        </ActionArea>
    );
}

export default TableActions;
