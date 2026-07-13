import { Column } from "@/styles/Common";
import { Heading } from "../Title/Title";
import { FieldGroup, FieldControl } from "../Field/FieldGroup";
import Search from "./Search";

function SearchGroup({ title, rows }) {
    return (
        <Column $mt={24}>
            <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                {title}
            </Heading>
            {rows.map((r) => (
                <FieldGroup key={r.label} label={r.label} required={r.required}>
                    <FieldControl state={r.state} helptext={r.helptext}>
                        <Search state={r.state} placeholder={r.placeholder} defaultValue={r.defaultValue} />
                    </FieldControl>
                </FieldGroup>
            ))}
        </Column>
    );
}
export default SearchGroup;
