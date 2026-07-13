import styled from "styled-components";

const resolveSpacing = (theme, value, fallback) => {
    if (value == null) return fallback;
    return theme.spacing[value] ?? value;
};

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap, theme.spacing[16])};
    margin: ${({ theme, $margin }) => resolveSpacing(theme, $margin, theme.spacing[0])};
    ${({ theme, $mt }) => {
        if ($mt == null) return "";
        return `margin-top: ${theme.spacing[$mt] ?? `${$mt}px`};`;
    }}
`;
export const CenterColumn = styled(Column)`
    align-items: center;
    width: 100%;
`;
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap, theme.spacing[32])};
    align-items: ${({ $align }) => $align ?? "flex-start"};
    justify-content: ${({ $justify }) => $justify ?? "flex-start"};
`;
export const RowCenter = styled(Row)`
    align-items: center;
`;

export const FormItemsRow = styled(Row)`
    display: flex;
    align-items: ${({ $align }) => $align ?? "flex-end"};
    flex-wrap: ${({ $wrap = "wrap" }) => $wrap};
    gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap, theme.spacing[8])};
    min-width: 0;
`;

export const FormGroupRow = styled.div`
    display: flex;
    align-items: ${({ $align = "stretch" }) => $align};
    gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap, theme.spacing[4])};
`;

export const FormItemColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ $align = "stretch" }) => $align};
    gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap, theme.spacing[4])};
    min-width: 0;
`;
export const Required = styled.div`
    color: ${({ theme }) => theme.color.semantic.error};
`;
export const Page = styled.div`
    padding: 80px 100px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme, $gap }) => resolveSpacing(theme, $gap, theme.spacing[48])};
    width: 100%;
`;
export const Section = styled.section`
    display: flex;
    flex-direction: column;
    & + & {
        margin-top: 100px;
    }
`;
export const SectionTitle = styled.h2`
    font-size: ${({ theme }) => theme.font.title.primary};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    letter-spacing: -0.64px;
    color: ${({ theme }) => theme.color.pure.black};
`;
export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: ${({ theme }) => theme.spacing[0]};
`;

export const Thead = styled.thead`
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[400]};
`;
export const Tbody = styled.tbody``;
export const Th = styled.th`
    padding: ${({ theme }) => theme.spacing[16]};
    text-align: ${({ $align }) => $align || "center"};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 24px;
    letter-spacing: -0.32px;
`;
export const Td = styled.td`
    padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[20]};
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[300]};
    text-align: ${({ $align }) => $align || "center"};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
`;
export const Label = styled.label`
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.neutral[700]};
    line-height: normal;
    display: flex;
    gap: ${({ theme }) => theme.spacing[4]};
`;
export const FieldLabel = styled(Label)`
    min-width: 100px;
    min-height: 38px;
    padding: 10px 6px 0 0;
    align-items: center;
`;
export const IconButton = styled.button`
    display: inline-flex;
    align-items: ${({ $align }) => $align ?? "center"};
    justify-content: center;
    width: ${({ theme, $size }) => theme.icon[$size] ?? $size ?? theme.icon.primary};
    height: ${({ theme, $size }) => theme.icon[$size] ?? $size ?? theme.icon.primary};
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;

    &:disabled {
        cursor: default;
        opacity: 0.4;
    }
`;
