import { Page, Section } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import { Column } from "@/styles/Common";
import TableHeaderGuide from "@/components/Table/TableHeaderGuide";
import TableContents from "@/components/Table/TableContents";

const Tables = () => {
    return (
        <Page>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Header
                </Heading>
                <Column $mt={40}>
                    <TableHeaderGuide />
                </Column>
            </Section>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Contents
                </Heading>
                <Column $mt={40}>
                    <TableContents />
                </Column>
            </Section>
        </Page>
    );
};

export default Tables;
