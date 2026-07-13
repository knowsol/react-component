import Box from "@/components/Box/Box";
import { Text } from "@/components/Title/Title";
import styled from "styled-components";
import { Column, CenterColumn, Page, Section, SectionTitle } from "@/styles/Common";
import TypoTable from "@/components/Table/TypoTable";
import { typoTableHead, typoTableBody } from "@/components/Table/tableData";
import ColorBox from "@/components/Box/ColorBox/ColorBox";
import colorBoxData from "@/components/Box/ColorBox/colorBoxData";

const SmallBoxGroup = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 60px;
`;
const SmallBox = styled.div`
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.large};
    background-color: ${({ theme }) => theme.color.pure.white};
    padding: 40px 60px;
    font-size: ${({ theme }) => theme.font.title.big};
    font-weight: ${({ theme, $weight = "regular" }) => theme.font.weight[$weight]};
    color: ${({ theme }) => theme.color.neutral[900]};
`;
const FontTitle = styled.h3`
    font-size: 120px;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: normal;
    color: ${({ theme }) => theme.color.neutral[900]};
`;
const FontDesc = styled.p`
    font-size: ${({ theme }) => theme.font.size.large};
    color: ${({ theme }) => theme.color.neutral[900]};
`;
const TextColorBoxs = styled.ul`
    display: flex;
    gap: 88px;
    padding: 0 93px 0 100px;
`;
const TextColorBox = styled.li`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function Typography() {
    return (
        <Page $gap={0}>
            <Section>
                <Box variant="bgline" padding="96px 0 100px">
                    <CenterColumn $gap={20}>
                        <FontTitle>Pretendard</FontTitle>
                        <FontDesc>국문 , 영문 , 숫자 , 특수문자 (유니 코드 ) 는 Pretendard Font 를 동일하게 사용합니다.</FontDesc>
                    </CenterColumn>
                    <SmallBoxGroup>
                        <SmallBox $weight="semibold">Semibold</SmallBox>
                        <SmallBox $weight="medium">Medium</SmallBox>
                        <SmallBox $weight="regular">Regular</SmallBox>
                    </SmallBoxGroup>
                </Box>
            </Section>
            <Section>
                <TypoTable head={typoTableHead} body={typoTableBody} />
            </Section>
            <Section>
                <Column>
                    <SectionTitle as="h4" $size="small">
                        Fonts Color
                    </SectionTitle>
                    <Text $size="small">폰트 컬러는 텍스트의 가독성과 위계를 보장하며, 기본·보조·상태 색상을 일관된 규칙에 따라 사용합니다.</Text>
                    <Box variant="bg" padding="80px 0 100px" margin="24px 0 0">
                        <TextColorBoxs>
                            <TextColorBox>
                                <SectionTitle fontWeight={400}>Basic text Color</SectionTitle>
                                {colorBoxData.basic.map((item) => (
                                    <ColorBox key={item.name} title={item.title} name={item.name} color={item.color} />
                                ))}
                            </TextColorBox>
                            <TextColorBox>
                                <SectionTitle fontWeight={400}>Semantic text Color</SectionTitle>
                                {colorBoxData.semantic.map((item) => (
                                    <ColorBox key={item.name} title={item.title} name={item.name} color={item.color} />
                                ))}
                            </TextColorBox>
                        </TextColorBoxs>
                    </Box>
                </Column>
            </Section>
        </Page>
    );
}

export default Typography;
