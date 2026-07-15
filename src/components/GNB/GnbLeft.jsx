import styled from "styled-components";
import { RowCenter } from "@/styles/Common";
import logoIconUrl from "@/assets/images/logo-icon.svg";
import { gnbLeftData } from "./gnbData";

const LogoIcon = styled.span`
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    background: url("${logoIconUrl}") center / contain no-repeat;
`;

const Brand = styled.span`
    display: inline-flex;
    align-items: center;
    font-size: 21px;
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 26px;
    letter-spacing: -0.02em;
`;

const BrandText = styled.span`
    color: ${({ theme, $brand }) => ($brand ? theme.color.brand.blue : theme.color.neutral[900])};
`;

const Role = styled.span`
    color: ${({ theme }) => theme.color.brand.blue};
    font-size: ${({ theme }) => theme.font.size.medium};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 20px;
`;

function GnbLeft() {
    return (
        <RowCenter $gap={12}>
            {gnbLeftData.map((item) => (
                <RowCenter key={item.id} $gap={12}>
                    {item.logo && <LogoIcon aria-hidden />}
                    {(item.main1 || item.main2) && (
                        <Brand>
                            {item.main1 && <BrandText $brand>{item.main1}</BrandText>}
                            {item.main2 && <BrandText>{item.main2}</BrandText>}
                        </Brand>
                    )}
                    {item.sub && <Role>{item.sub}</Role>}
                </RowCenter>
            ))}
        </RowCenter>
    );
}

export default GnbLeft;
