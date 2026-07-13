import { RowCenter, FieldLabel, Required } from "@/styles/Common";
import styled, { css } from "styled-components";

const helpColor = {
    error: (theme) => theme.color.semantic.error,
    success: (theme) => theme.color.semantic.success,
    info: (theme) => theme.color.semantic.info,
};

const FIELD_CONTROL_MIN_WIDTH = "0";

// 라벨 + 컨트롤이 한 줄. $reserve는 드롭다운이 펼쳐졌을 때 아래 여백 확보용(메뉴가 absolute라 레이아웃을 안 밀어서).
// eslint-disable-next-line react-refresh/only-export-components -- styled 컴포넌트를 룰이 컴포넌트로 인식 못 함
export const FieldRow = styled(RowCenter)`
    flex-direction: ${({ $direction }) => ($direction === "column" ? "column" : "row")};
    align-items: ${({ $direction }) => ($direction === "column" ? "stretch" : "flex-start")};
    margin-bottom: ${({ $reserve }) => ($reserve ? `${$reserve}px` : "0")};

    ${({ $direction }) =>
        $direction === "column" &&
        css`
            ${FieldLabel} {
                min-width: 0;
                min-height: auto;
                font-size: ${({ theme }) => theme.font.size.small};
                line-height: 22px;
            }
        `}
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[8]};
    flex: ${({ $width }) => ($width ? `0 0 ${$width}` : "1 1 auto")};
    width: ${({ $width }) => $width || "auto"};
    min-width: ${({ $minWidth, $width }) => $width || $minWidth};
`;

const HelpText = styled.p`
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    line-height: 18px;
    letter-spacing: -0.3px;
    color: ${({ theme, $state }) => (helpColor[$state] ? helpColor[$state](theme) : theme.color.neutral[600])};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

// 컨트롤 1개 + 안내/에러 문구 묶음. Input/Dropbox/Search/Email 어떤 컨트롤이든 children으로 받는다.
export function FieldControl({ state, helptext, width, minWidth = FIELD_CONTROL_MIN_WIDTH, children }) {
    return (
        <Field $width={width} $minWidth={minWidth}>
            {children}
            {helptext && <HelpText $state={state}>{helptext}</HelpText>}
        </Field>
    );
}

// 라벨 + (컨트롤 영역). 컨트롤 영역은 children으로 받아 단일/다중(드롭박스 2열) 모두 수용.
export function FieldGroup({ label, required, reserve, direction, gap, className, children }) {
    return (
        <FieldRow className={className} $gap={gap ?? (direction === "column" ? 4 : 8)} $reserve={reserve} $direction={direction}>
            <FieldLabel>
                {label} {required && <Required>*</Required>}
            </FieldLabel>
            {children}
        </FieldRow>
    );
}
