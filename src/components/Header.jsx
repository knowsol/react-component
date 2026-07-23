import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GnbLeft from "@/components/GNB/GnbLeft";
import Title from "@/components/Title/Title";
import titleData from "@/components/Title/titleData";

const HeaderBox = styled.header`
    background-color: ${({ theme }) => theme.color.secondary.c50};
    padding: 80px 100px 16px;
    display: flex;
    gap: 16px;
    flex-direction: column;
`;

const Header = () => {
    const { pathname } = useLocation();
    const current = titleData.find((item) => item.path === pathname);

    return (
        <HeaderBox>
            <GnbLeft homePath="/admin" />
            {current && <Title size="large" data={current} />}
        </HeaderBox>
    );
};

export default Header;
