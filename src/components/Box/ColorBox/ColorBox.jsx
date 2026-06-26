import React from "react";
import styled from "styled-components";

const ColorBoxStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 60px;
    width: 100%;
    background-color: ${({ $color }) => $color || "transparent"};
    border-radius: ${({ theme }) => theme.border.radius.large};
    margin-top: ${({ theme }) => theme.spacing[40]};
    & + & {
        margin-top: ${({ theme }) => theme.spacing[24]};
    }
`;
const ColorTitle = styled.span`
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.color.pure.white};
    line-height: 32px;
    letter-spacing: -0.48px;
`;
const ColorName = styled.span`
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.pure.white};
    line-height: normal;
    letter-spacing: -0.48px;
`;
function ColorBox({ title, name, color }) {
    return (
        <ColorBoxStyle $color={color}>
            <ColorTitle>{title}</ColorTitle>
            <ColorName>{name}</ColorName>
        </ColorBoxStyle>
    );
}

export default ColorBox;
