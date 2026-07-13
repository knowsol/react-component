import styled from "styled-components";
import Switch from "./Switch";
import { switchData } from "./switchData";
import { Row, Column } from "@/styles/Common";

const GroupTitle = styled.p`
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.color.neutral[900]};
`;

function SwitchGroup() {
    return (
        <Row $gap={40}>
            {switchData.map((group) => (
                <Column key={group.title} $gap={8}>
                    <GroupTitle>{group.title}</GroupTitle>
                    <Row $gap={8}>
                        {group.items.map((item, index) => (
                            <Switch key={index} {...item} />
                        ))}
                    </Row>
                </Column>
            ))}
        </Row>
    );
}

export default SwitchGroup;
