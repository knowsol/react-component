import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";

const EmptyWrap = styled.div`
    min-height: ${({ $minHeight }) => $minHeight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[8]};
`;

const EmptyText = styled.p`
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 24px;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.neutral[600]};
`;

function EmptyTable({ text = "등록된 데이터가 없습니다", iconName = "no_data", minHeight = "150px", children }) {
    return (
        <EmptyWrap role="status" $minHeight={minHeight}>
            {iconName && <Icon name={iconName} size="xlarge" />}
            <EmptyText>{children ?? text}</EmptyText>
        </EmptyWrap>
    );
}

export default EmptyTable;
