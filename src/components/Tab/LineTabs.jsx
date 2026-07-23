import { useState } from "react";
import styled from "styled-components";
import { Row } from "@/styles/Common";

const LineTab = styled.button`
    padding: 10px 0;
    border: 0;
    background: transparent;
    font-size: ${({ theme }) => theme.font.size.base};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 18px;
    letter-spacing: -0.02em;
    color: ${({ theme, $active }) => ($active ? theme.color.neutral[900] : theme.color.neutral[500])};
    /* 비활성도 투명 밑줄을 깔아 활성/비활성 높이를 맞춘다. */
    border-bottom: 2px solid ${({ theme, $active }) => ($active ? theme.color.neutral[900] : "transparent")};
    cursor: pointer;
`;

// 탭은 문자열과 객체({ label, value }) 둘 다 받는다.
const normalizeTab = (tab) => (tab !== null && typeof tab === "object" ? tab : { label: String(tab), value: tab });

function LineTabs({ tabs = [], value: valueProp, defaultValue, onChange }) {
    const items = tabs.map(normalizeTab);
    const [internalValue, setInternalValue] = useState(defaultValue !== undefined ? defaultValue : (items[0]?.value ?? null));
    const selected = valueProp !== undefined ? valueProp : internalValue;

    const pick = (item) => {
        if (valueProp === undefined) setInternalValue(item.value);
        onChange?.(item.value);
    };

    return (
        <Row $gap={16} role="tablist">
            {items.map((item) => {
                const active = selected === item.value;
                return (
                    <LineTab key={item.value} type="button" role="tab" aria-selected={active} $active={active} onClick={() => pick(item)}>
                        {item.label}
                    </LineTab>
                );
            })}
        </Row>
    );
}

export default LineTabs;
