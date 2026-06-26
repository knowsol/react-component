import styled from "styled-components";
import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled.main`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
`;

const BackBar = styled.div`
    padding: ${({ theme }) => theme.spacing[40]} 100px;
    border-top: 1px solid ${({ theme }) => theme.color.neutral[300]};
    display: flex;
    justify-content: center;
`;

const BackButton = styled(Link)`
    padding: 12px 40px;
    border: 1px solid ${({ theme }) => theme.color.neutral[400]};
    border-radius: ${({ theme }) => theme.border.radius.small};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.color.neutral[800]};
    transition: border-color 0.15s ease, color 0.15s ease;
    &:hover {
        border-color: ${({ theme }) => theme.color.secondary[500]};
        color: ${({ theme }) => theme.color.secondary[500]};
    }
`;

function Layout() {
    const { pathname } = useLocation();
    const isMain = pathname === "/main";

    return (
        <Wrapper>
            <Header />
            <Main>
                <Outlet />
                {!isMain && (
                    <BackBar>
                        <BackButton to="/main">← 뒤로가기</BackButton>
                    </BackBar>
                )}
            </Main>
            <Footer />
        </Wrapper>
    );
}

export default Layout;
