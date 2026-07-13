import styled from "styled-components";

const FooterWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 80px 100px;
    padding: 40px 0;
    border-top: 1px solid ${({ theme }) => theme.color.neutral[300]};
    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
`;

const FooterMenus = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 5px;
`;
const FooterLogo = styled.img`
    width: 110px;
    height: 30px;
    object-fit: cover;
    content: "";
    border: none;
`;
const Footer = () => {
    return (
        <FooterWrapper>
            <div>
                <FooterMenus>
                    <li>
                        <a href="#">개인정보처리방침</a>
                    </li>
                    <li>
                        <a href="#">이용약관</a>
                    </li>
                </FooterMenus>
                <FooterLogo src="/assets/images/logo.svg" alt="logo" />
            </div>
            <p>&copy; 2026 Knowwheresoft All rights reserved.</p>
        </FooterWrapper>
    );
};

export default Footer;
