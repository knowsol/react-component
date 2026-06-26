import styled from "styled-components";
import ColorCard from "@/components/Card/Color/ColorCard";
import colorSections from "@/components/Card/Basic/cardData";
import { Page, Column, Section, SectionTitle } from "@/styles/Common";
import { Heading, Text } from "@/components/Title/Title";

const CardRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    gap: 40px;
`;

function Color() {
    return (
        <Page>
            {colorSections.map((section) => (
                <Section key={section.title}>
                    <Column>
                        <SectionTitle as="h4" $size="small">
                            {section.title}
                        </SectionTitle>
                        <Text $size="small">{section.desc}</Text>
                    </Column>
                    <CardRow>
                        {section.colors.map((c) => (
                            <ColorCard key={c.name} name={c.name} color={c.color} />
                        ))}
                    </CardRow>
                </Section>
            ))}
        </Page>
    );
}

export default Color;
