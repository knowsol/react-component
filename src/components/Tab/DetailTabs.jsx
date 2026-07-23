import { useState } from "react";
import styled from "styled-components";

const DetailTabsWrap = styled.div`
    width: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.color.neutral[900]};
`;

const DetailTabsList = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing[4]};
    min-width: 0;
`;

const DetailTabButton = styled.button`
    min-width: 68px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${({ theme }) => theme.spacing[16]};
    border: 2px solid ${({ theme, $active }) => ($active ? theme.color.neutral[900] : "transparent")};
    border-bottom-color: ${({ theme, $active }) => ($active ? theme.color.pure.white : "transparent")};
    border-radius: ${({ theme }) => theme.border.radius.small} ${({ theme }) => theme.border.radius.small} 0 0;
    margin-bottom: ${({ $active }) => ($active ? "-2px" : "0")};
    background: ${({ theme }) => theme.color.pure.white};
    color: ${({ theme, $active }) => ($active ? theme.color.neutral[900] : theme.color.neutral[600])};
    font-size: ${({ theme }) => theme.font.size.base};
    font-weight: ${({ theme, $active }) => ($active ? theme.font.weight.bold : theme.font.weight.regular)};
    line-height: 18px;
    letter-spacing: -0.02em;
    white-space: nowrap;
    cursor: pointer;

    &:focus-visible {
        position: relative;
        z-index: 1;
        outline: 2px solid ${({ theme }) => theme.color.secondary[300]};
        outline-offset: 2px;
    }
`;

const normalizeTab = (tab) => (tab !== null && typeof tab === "object" ? tab : { label: String(tab), value: tab });

function DetailTabs({ tabs = [], value: valueProp, defaultValue, onChange, ariaLabel = "상세 탭" }) {
    const items = tabs.map(normalizeTab);
    const [internalValue, setInternalValue] = useState(defaultValue !== undefined ? defaultValue : (items[0]?.value ?? null));
    const selected = valueProp !== undefined ? valueProp : internalValue;

    const pick = (item) => {
        if (valueProp === undefined) setInternalValue(item.value);
        onChange?.(item.value, item);
    };

    return (
        <DetailTabsWrap>
            <DetailTabsList role="tablist" aria-label={ariaLabel}>
                {items.map((item) => {
                    const active = selected === item.value;

                    return (
                        <DetailTabButton key={item.value} type="button" role="tab" aria-selected={active} $active={active} onClick={() => pick(item)}>
                            {item.label}
                        </DetailTabButton>
                    );
                })}
            </DetailTabsList>
        </DetailTabsWrap>
    );
}

export default DetailTabs;
