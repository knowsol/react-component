import { Column, Page, Section } from "@/styles/Common";
import { Heading } from "@/components/Title/Title";
import LayerPopupGroup from "@/components/LayerPopup/LayerPopupGroup";

function Layerpop() {
    return (
        <Page>
            <Section>
                <Heading as="h4" $size="medium" $line>
                    Layer Popup
                </Heading>
                <Column $mt={40}>
                    <LayerPopupGroup />
                </Column>
            </Section>
        </Page>
    );
}

export default Layerpop;
