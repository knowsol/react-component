import { Page, Section } from "@/styles/Common";
import ButtonGroup from "@/components/Button/ButtonGroup";
import { buttonSections } from "@/components/Button/buttonData";

const Buttons = () => {
    return (
        <Page>
            {buttonSections.map((section) => (
                <Section key={section.title}>
                    <ButtonGroup {...section} />
                </Section>
            ))}
        </Page>
    );
};

export default Buttons;
