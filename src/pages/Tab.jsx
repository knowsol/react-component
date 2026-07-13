import { Page, Column, Section } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import LineTabs from "@/components/Tab/LineTabs";
import DetailTabs from "@/components/Tab/DetailTabs";
import { detailTabData, tabData } from "@/components/Tab/tabData";

function Tab() {
    return (
        <Page $gap={0}>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Tab
                </Heading>
                <Column $mt={40}>
                    <LineTabs tabs={tabData} />
                </Column>
                <Column $mt={40}>
                    <DetailTabs tabs={detailTabData} />
                </Column>
            </Section>
        </Page>
    );
}

export default Tab;
