import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import { Row, Required } from "@/styles/Common";

const TitleText = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 24px;
`;

const TitleRow = styled(Row)`
    flex-wrap: wrap;
`;

const MetaText = styled.span`
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
`;

const DescText = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
`;

function TableTitle({ title, required, count, desc, descIconName = "tableinfo", hideDescIcon = false }) {
    return (
        <TitleRow $gap={4} $align="flex-end">
            <TitleText>
                {title}
                {required && (
                    <Required as="span" aria-hidden="true">
                        *
                    </Required>
                )}
            </TitleText>
            {count != null && <MetaText>{count}</MetaText>}
            {desc && (
                <DescText>
                    {!hideDescIcon && <Icon name={descIconName} size="xsmall" />}
                    {desc}
                </DescText>
            )}
        </TitleRow>
    );
}

export default TableTitle;
