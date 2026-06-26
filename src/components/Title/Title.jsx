import styled, { css } from "styled-components";
import { Column } from "@/styles/Common";

const titleStyle = {
    lineLarge: css`
        display: flex;
        flex-direction: column;
        padding: 38px 0 24px;
        font-size: ${({ theme }) => theme.font.title.medium};
        font-weight: 500;
        border-bottom: 2px solid ${({ theme }) => theme.color.neutral[900]};
    `,
    large: css`
        font-size: ${({ theme }) => theme.font.title.big};
        font-weight: 900;
        line-height: normal;
    `,
    medium: css`
        font-size: ${({ theme }) => theme.font.title.medium};
        font-weight: 500;
    `,
    primary: css`
        font-size: ${({ theme }) => theme.font.title.primary};
        font-weight: 500;
    `,
    small: css`
        font-size: ${({ theme }) => theme.font.title.small};
        font-weight: 400;
    `,
    xsmall: css`
        font-size: ${({ theme }) => theme.font.title.xsmall};
        font-weight: 400;
    `,
};

// 설명 텍스트 변형 (사이즈 + 색을 함께 묶음)
const textStyle = {
    large: css`
        font-size: ${({ theme }) => theme.font.title.small};
        font-weight: 400;
        color: ${({ theme }) => theme.color.neutral[900]};
        letter-spacing: -0.48px;
    `,
    small: css`
        font-size: ${({ theme }) => theme.font.title.xsmall};
        font-weight: 400;
        color: ${({ theme }) => theme.color.neutral[600]};
    `,
};

export const Heading = styled.h1`
    ${({ $size }) => titleStyle[$size]}
`;

export const Text = styled.p`
    ${({ $size }) => textStyle[$size]}
`;

function Title({ size = "large", data }) {
    return (
        <Column>
            <Heading $size={size}>{data.main}</Heading>
            {data.sub && <Text $size="large">{data.sub}</Text>}
        </Column>
    );
}

export default Title;
