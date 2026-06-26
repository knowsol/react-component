import styled from "styled-components";

const CardStyle = styled.div`
    width: 225px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 16px;
`;
const CardImgBox = styled.div`
    width: 100%;
    height: 222px;
    border-radius: 16px 16px 0 0;
    background-color: ${({ $color }) => $color};
`;
const CardContentBox = styled.div`
    width: 100%;
    padding: 24px 16px;
`;
const Name = styled.p`
    font-size: ${({ theme }) => theme.font.title.xsmall};
    font-weight: 600;
    color: ${({ theme }) => theme.color.neutral[900]};
`;
const Code = styled.p`
    margin-top: 4px;
    font-size: ${({ theme }) => theme.font.title.xsmall};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-weight: 400;
`;

function ColorCard({ name, color }) {
    return (
        <CardStyle>
            <CardImgBox $color={color} />
            <CardContentBox>
                <Name>{name}</Name>
                <Code>{color}</Code>
            </CardContentBox>
        </CardStyle>
    );
}

export default ColorCard;
