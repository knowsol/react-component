import { css } from "styled-components";

// Input · Dropbox · (Search · Email …) 공통 상태 색. 컴포넌트마다 적용 방식(:focus / $open 등)은
// 각자 다르지만, 상태별 "색"은 여기 한 곳에서만 관리한다.
export const stateStyle = {
    focus: css`
        border-color: ${({ theme }) => theme.color.secondary[500]};
    `,
    hover: css`
        border-color: ${({ theme }) => theme.color.secondary[500]};
    `,
    disabled: css`
        border-color: ${({ theme }) => theme.color.neutral[300]};
        background-color: ${({ theme }) => theme.color.neutral[50]};
        color: ${({ theme }) => theme.color.neutral[500]};
        /* WebKit/Blink는 disabled input의 author color를 무시하므로 text-fill-color로 지정 (div엔 무해) */
        -webkit-text-fill-color: ${({ theme }) => theme.color.neutral[500]};
    `,
    readonly: css`
        border-color: ${({ theme }) => theme.color.neutral[300]};
        background-color: ${({ theme }) => theme.color.neutral[50]};
    `,
    error: css`
        border-color: ${({ theme }) => theme.color.semantic.error};
    `,
    success: css`
        border-color: ${({ theme }) => theme.color.semantic.success};
    `,
    info: css`
        border-color: ${({ theme }) => theme.color.semantic.info};
    `,
};

// hover/focus 시 파란선 + 명시적 상태색(error/disabled/readonly…)이 그 위를 덮는 공통 규칙.
// 상태색을 &:hover/&:focus까지 적용해 파란선을 이기므로, 컴포넌트별 잠금 게이팅이 따로 필요 없다.
// (active 표시 방식만 다름: input은 네이티브 :focus[아래 포함], dropbox는 $open[컴포넌트에서 추가])
export const fieldStateStyle = css`
    &:hover {
        ${stateStyle.hover}
    }
    &:focus {
        ${stateStyle.focus}
    }
    ${({ $state }) =>
        $state &&
        css`
            &,
            &:hover,
            &:focus {
                ${stateStyle[$state]}
            }
        `}
`;

// 입력/셀렉트 박스의 공통 프레임. styled.input / styled.div 어디든 ${fieldBox}만 깔면 된다.
export const fieldBox = css`
    width: 100%;
    min-width: 0;
    min-height: 38px;
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 24px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.color.neutral[900]};
    background-color: ${({ theme }) => theme.color.pure.white};
    outline: none;
`;
