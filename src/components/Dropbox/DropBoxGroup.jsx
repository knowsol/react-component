import { Column } from "@/styles/Common";
import styled from "styled-components";
import { Heading } from "../Title/Title";
import { FieldGroup, FieldControl } from "../Field/FieldGroup";
import Dropbox from "./Dropbox";

const OPTION_HEIGHT = 44; // 옵션 1줄 높이(패딩 10+10 + line-height 24)

// 드롭박스 전용: 한 행에 박스가 1~2개 가로로(Focus 행은 단일/멀티 2개).
const Boxes = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: ${({ theme }) => theme.spacing[24]};
    flex: 1;
    min-width: 0;
`;

function DropBoxGroup({ title, rows }) {
    return (
        <Column $mt={24}>
            <Heading as="p" $size="xsmall" $line $padding="38px 0 8px">
                {title}
            </Heading>
            {rows.map((r) => {
                // defaultOpen 메뉴가 펼쳐진 만큼 아래 여백을 확보(absolute 메뉴라 다음 행을 가리지 않도록).
                const openRows = r.boxes
                    .filter((b) => b.defaultOpen)
                    .map((b) => b.options.length + (b.allLabel != null ? 1 : 0));
                const reserve = openRows.length ? Math.max(...openRows) * OPTION_HEIGHT + 20 : 0;
                return (
                    <FieldGroup key={r.label} label={r.label} required={r.required} reserve={reserve}>
                        <Boxes>
                            {r.boxes.map((b, i) => (
                                <FieldControl key={i} state={b.state} helptext={b.helptext}>
                                    <Dropbox {...b} />
                                </FieldControl>
                            ))}
                        </Boxes>
                    </FieldGroup>
                );
            })}
        </Column>
    );
}

export default DropBoxGroup;
