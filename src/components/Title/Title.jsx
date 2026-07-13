import styled, { css } from "styled-components";
import { Column } from "@/styles/Common";

const titleStyle = {
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

// 선 두께는 사이즈에 따라 자동 결정 (큰 제목 2px, 작은 제목 1px)
const lineWidth = {
    large: "2px",
    medium: "2px",
    primary: "1px",
    small: "1px",
    xsmall: "1px",
};

// eslint-disable-next-line react-refresh/only-export-components -- styled 컴포넌트를 룰이 컴포넌트로 인식 못 함
export const Heading = styled.h1`
    ${({ $size }) => titleStyle[$size]}
    ${({ $line, $size, $padding }) =>
        $line &&
        css`
            display: flex;
            flex-direction: column;
            padding: ${$padding ?? "38px 0 24px"};
            border-bottom: ${lineWidth[$size] ?? "1px"} solid
                ${({ theme }) => theme.color.neutral[900]};
        `}
`;

// eslint-disable-next-line react-refresh/only-export-components -- styled 컴포넌트를 룰이 컴포넌트로 인식 못 함
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
