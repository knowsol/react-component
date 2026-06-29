import React from "react";
import { Page, Row, Column, Section, SectionTitle } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import InputGroup from "@/components/Input/InputGroup";
import { inputGroups } from "@/components/Input/inputData";
import DropBoxGroup from "@/components/Dropbox/DropBoxGroup";
import { dropData } from "@/components/Dropbox/dropData";
import styled from "styled-components";

const InputGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing[40]};
`;

// Input 1칸, Drop 2칸, (search·email 1칸씩). 가로 스크롤이 생기지 않도록 칸 폭에 맞춰 줄어든다.
const DropSpan = styled.div`
    grid-column: span 2;
    min-width: 0;
`;

function Component() {
    return (
        <Page>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Input Field
                </Heading>
                <InputGrid>
                    {inputGroups.map((g) => (
                        <InputGroup key={g.title} {...g} />
                    ))}
                    {dropData.map((g) => (
                        <DropSpan key={g.title}>
                            <DropBoxGroup {...g} />
                        </DropSpan>
                    ))}
                </InputGrid>
            </Section>
        </Page>
    );
}

export default Component;
