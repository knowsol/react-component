import React from "react";
import { Page, Row, Column, Section, SectionTitle } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import InputGroup from "@/components/Input/InputGroup";
import { inputGroups } from "@/components/Input/inputData";
import styled from "styled-components";

const InputGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing[40]};
`;

function Component() {
    return (
        <Page>
            <Section>
                <Heading as="h4" $size="lineLarge">
                    Input Field
                </Heading>
                <InputGrid>
                    {inputGroups.map((g) => (
                        <InputGroup key={g.title} {...g} />
                    ))}
                </InputGrid>
            </Section>
        </Page>
    );
}

export default Component;
