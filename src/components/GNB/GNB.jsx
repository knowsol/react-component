import styled from "styled-components";
import GnbLeft from "./GnbLeft";
import GnbRight from "./GnbRight";

const GnbBar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 68px;
    padding: 17px 20px;
    background-color: ${({ theme, $bg }) => $bg || theme.color.secondary.c50};
`;

function Gnb({ homePath = "/admin", onLogout, logoutPath }) {
    return (
        <GnbBar>
            <GnbLeft homePath={homePath} />
            <GnbRight onLogout={onLogout} logoutPath={logoutPath} />
        </GnbBar>
    );
}

export default Gnb;
