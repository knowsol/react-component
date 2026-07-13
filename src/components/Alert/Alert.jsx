import styled from "styled-components";
import { RowCenter } from "@/styles/Common";

const AlertBox = styled.div`
    padding: 16px 12px;
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[24]};
    border: 2px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.small};
    background-color: ${({ theme }) => theme.color.secondary.c50};
`;

const AlertIcon = styled.img`
    width: ${({ theme }) => theme.icon.primary};
    height: ${({ theme }) => theme.icon.primary};
    flex-shrink: 0;
`;

const AlertTitle = styled.span`
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 160%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.neutral[900]};
`;

const AlertDesc = styled.span`
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 160%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.neutral[700]};
`;

// 안내 박스. icon은 이미지 src, 본문은 children으로 받는다.
function Alert({ icon, title, children }) {
    return (
        <AlertBox role="alert">
            <RowCenter $gap={4}>
                {icon && <AlertIcon src={icon} alt="" aria-hidden />}
                <AlertTitle>{title}</AlertTitle>
            </RowCenter>
            <AlertDesc>{children}</AlertDesc>
        </AlertBox>
    );
}

export default Alert;
