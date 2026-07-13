import { Heading } from "@/components/Title/Title";
import { Page, Section, Column } from "@/styles/Common";
import Gnb from "@/components/GNB/GNB";

const GNB = () => {
    return (
        <Page>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    GNB
                </Heading>
                <Column $mt={40}>
                    <Gnb />
                </Column>
            </Section>
        </Page>
    );
};

export default GNB;
