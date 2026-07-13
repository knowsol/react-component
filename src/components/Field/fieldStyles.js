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

export const fieldStateStyle = (focus = "&:focus") => css`
    &:hover {
        ${stateStyle.hover}
    }
    ${focus} {
        ${stateStyle.focus}
    }
    ${({ $state }) =>
        $state &&
        css`
            &,
            &:hover,
            ${focus} {
                ${stateStyle[$state]}
            }
        `}
`;

// 복합 필드(Search·Email·File 등) 안에 들어가는 "벌거벗은" input.
// 프레임(fieldBox)은 바깥 래퍼 div가 갖고, 안쪽 input은 테두리·배경을 지워 그 안에 얹는다.
// (기본 Input은 input 자체가 박스라 이걸 쓰지 않고 fieldBox를 직접 깐다.)
export const bareInput = css`
    flex: 1;
    min-width: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: ${({ theme }) => theme.font.size.primary};
    color: ${({ theme }) => theme.color.neutral[900]};
    letter-spacing: inherit;

    &::placeholder {
        color: ${({ theme }) => theme.color.neutral[600]};
    }

    /* WebKit은 disabled input의 author color를 무시하므로 text-fill-color로 다시 지정 */
    &:disabled {
        cursor: default;
        -webkit-text-fill-color: ${({ theme }) => theme.color.neutral[500]};
    }
`;

// 입력/셀렉트 박스의 공통 프레임. styled.input / styled.div 어디든 ${fieldBox}만 깔면 된다.
export const fieldBox = css`
    width: 100%;
    min-width: 0;
    height: 36px;
    min-height: 36px;
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 22px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.color.neutral[900]};
    background-color: ${({ theme }) => theme.color.pure.white};
    outline: none;
    box-sizing: border-box;
`;
