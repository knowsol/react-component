import React from "react";
import { Table, Thead, Tbody, Th, Td } from "@/styles/Common";
import styled, { css } from "styled-components";

const styleTd = {
    H1: css`
        font-size: ${({ theme }) => theme.font.size.xl};
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 32px;
        letter-spacing: -0.48px;
        color: ${({ theme }) => theme.color.neutral[800]};
    `,
    H2: css`
        font-size: ${({ theme }) => theme.font.size.medium};
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 26px;
        letter-spacing: -0.32px;
        color: ${({ theme }) => theme.color.neutral[800]};
    `,
    H3: css`
        font-size: ${({ theme }) => theme.font.size.medium};
        font-weight: ${({ theme }) => theme.font.weight.medium};
        line-height: 24px;
        letter-spacing: -0.32px;
        color: ${({ theme }) => theme.color.neutral[800]};
    `,
    Body1: css`
        font-size: ${({ theme }) => theme.font.size.medium};
        font-weight: ${({ theme }) => theme.font.weight.bold};
        line-height: 26px;
        letter-spacing: -0.36px;
        color: ${({ theme }) => theme.color.neutral[800]};
    `,
    Body2: css`
        font-size: ${({ theme }) => theme.font.size.small};
        font-weight: ${({ theme }) => theme.font.weight.medium};
        line-height: 22px;
        letter-spacing: -0.28px;
        color: ${({ theme }) => theme.color.neutral[800]};
    `,
    Caption1: css`
        font-size: ${({ theme }) => theme.font.size.xsmall};
        font-weight: ${({ theme }) => theme.font.weight.semibold};
        line-height: 18px;
        letter-spacing: -0.24px;
        color: ${({ theme }) => theme.color.neutral[800]};
    `,
    Link: css`
        font-size: ${({ theme }) => theme.font.size.primary};
        line-height: 24px;
        letter-spacing: -0.32px;
        color: ${({ theme }) => theme.color.primary[500]};
        text-decoration-line: underline;
        text-decoration-color: ${({ theme }) => theme.color.primary[500]};
        text-underline-offset: 3px;
    `,
};
const ScaleText = styled.p`
    ${({ $scale }) => styleTd[$scale]}
`;
function TypoTable({ head, body }) {
    return (
        <Table>
            <Thead>
                <tr>
                    {head.map((h, i) => {
                        const isLast = i === head.length - 1;
                        const span = isLast ? body[0].length - head.length + 1 : 1;
                        return (
                            <Th key={i} colSpan={span} $align={isLast ? "left" : "center"}>
                                {h}
                            </Th>
                        );
                    })}
                </tr>
            </Thead>
            <Tbody>
                {body.map((row, i) => {
                    const scale = row[0]; // 그 행의 Scale 이름
                    return (
                        <tr key={i}>
                            {row.map((cell, j) => {
                                const isLastCol = j === row.length - 1;
                                const styled = j === 0 || isLastCol; // Scale 칸 + 샘플 칸만 스타일
                                const align = j >= head.length - 1 ? "left" : "center";
                                return (
                                    <Td key={j} $align={align}>
                                        {styled ? <ScaleText $scale={scale}>{cell}</ScaleText> : cell}
                                    </Td>
                                );
                            })}
                        </tr>
                    );
                })}
            </Tbody>
        </Table>
    );
}

export default TypoTable;
