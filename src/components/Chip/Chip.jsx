import styled from "styled-components";

// PILL: 색 채운 알약형 라벨.
const ChipTrack = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 60px;
    padding: 3px 12px;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
    letter-spacing: -0.02em;
    border-radius: 100px;
    background-color: ${({ $bg }) => $bg};
    color: ${({ $color }) => $color};
`;

// DOT: 색 점 + 텍스트.
const DotWrap = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: ${({ theme }) => theme.font.size.small};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.neutral[700]};
`;

const Dot = styled.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: ${({ $dot }) => $dot};
`;

const Chip = ({ children, bg, color, dot, variant = "pill" }) => {
    if (variant === "dot") {
        return (
            <DotWrap>
                <Dot $dot={dot} />
                {children}
            </DotWrap>
        );
    }

    return (
        <ChipTrack $bg={bg} $color={color}>
            {children}
        </ChipTrack>
    );
};

export default Chip;
