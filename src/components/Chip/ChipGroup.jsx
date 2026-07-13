import styled from "styled-components";
import Chip from "./Chip";
import { chipData } from "./chipData";

const ChipTable = styled.div`
    display: grid;
    grid-template-columns: 189px repeat(${chipData.length}, minmax(72px, 1fr));
    background-color: ${({ theme }) => theme.color.pure.white};
`;

const Cell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[300]};
    background-color: ${({ theme, $bg }) => ($bg ? theme.color.secondary.c50 : "transparent")};
    font-size: ${({ theme }) => theme.font.size.small};
    color: ${({ theme }) => theme.color.neutral[700]};
    line-height: 18px;
`;

const HeadCell = styled(Cell)`
    padding: 9px 12px;
    border-bottom: 1px solid ${({ theme }) => theme.color.neutral[400]};
    color: ${({ theme }) => theme.color.neutral[600]};
`;

const ChipGroup = () => {
    return (
        <ChipTable>
            <HeadCell>Level</HeadCell>
            {chipData.map((_, index) => (
                <HeadCell key={index}>{index + 1}</HeadCell>
            ))}

            {/* PILL 행 */}
            <Cell $bg>PILL</Cell>
            {chipData.map((item, index) => (
                <Cell key={index}>
                    <Chip bg={item.bg} color={item.color}>
                        {item.title}
                    </Chip>
                </Cell>
            ))}

            {/* DOT 행 */}
            <Cell $bg>DOT</Cell>
            {chipData.map((item, index) => (
                <Cell key={index}>
                    <Chip variant="dot" dot={item.dot}>
                        {item.title}
                    </Chip>
                </Cell>
            ))}
        </ChipTable>
    );
};

export default ChipGroup;
