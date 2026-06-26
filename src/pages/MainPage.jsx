import React from "react";
import styled from "styled-components";
import Card from "@/components/Card/Basic/Card";
import { cardMenu } from "@/components/Card/Basic/cardMenuData";

const Wrap = styled.div`
    width: 100%;
    padding: 80px 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing[24]};
`;
const Name = styled.span`
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.color.neutral[900]};
`;
const Desc = styled.span`
    font-size: ${({ theme }) => theme.font.size.small};
    color: ${({ theme }) => theme.color.neutral[600]};
`;
const Path = styled.span`
    margin-top: ${({ theme }) => theme.spacing[8]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    color: ${({ theme }) => theme.color.secondary[500]};
`;

function MainPage() {
    return (
        <Wrap>
            {cardMenu.map((m) => (
                <Card key={m.path} to={m.path}>
                    <Name>{m.name}</Name>
                    <Desc>{m.desc}</Desc>
                    <Path>{m.path}</Path>
                </Card>
            ))}
        </Wrap>
    );
}

export default MainPage;
