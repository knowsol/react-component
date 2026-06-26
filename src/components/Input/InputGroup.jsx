import { Column, RowCenter, Label, Required } from "@/styles/Common";
import styled from "styled-components";
import { Heading } from "../Title/Title";
import Input from "./Input";

function InputGroup({ title, rows }) {
    return (
        <Column $gap={16} $margin={24}>
            <Heading as="p" variant=" lineLarge" size="medium">
                {title}
            </Heading>
            {rows.map((r) => (
                <RowCenter key={r.label} $gap={8}>
                    <Label>
                        {r.label} {r.required && <Required>*</Required>}
                    </Label>
                    <Input state={r.state} placeholder={r.placeholder} />
                </RowCenter>
            ))}
        </Column>
    );
}
export default InputGroup;
