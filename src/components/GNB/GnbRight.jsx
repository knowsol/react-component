import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RowCenter, IconButton } from "@/styles/Common";
import { gnbRightData } from "./gnbData";
import { Icon } from "../Icon/Icon";

const RightText = styled.span`
    color: ${({ theme }) => theme.color.neutral[800]};
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
`;
const TimeText = styled.span`
    color: ${({ theme }) => theme.color.neutral[700]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
`;

const Divider = styled.span`
    width: 1px;
    height: 12px;
    background-color: ${({ theme }) => theme.color.neutral[400]};
`;

const LoginTime = styled.div`
    border-radius: 100px;
    background-color: ${({ theme }) => theme.color.secondary.c200};
    min-width: 123px;
    height: 24px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[4]};
`;
const KeepButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    color: ${({ theme }) => theme.color.option.state2};
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    line-height: 18px;
`;

function parseTimerValue(value) {
    const [minutes = "0", seconds = "0"] = value.split(":");

    return Number(minutes) * 100 + Number(seconds);
}

function formatTimerValue(value) {
    const minutes = Math.floor(value / 100);
    const seconds = value % 100;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function decreaseTimerValue(value) {
    if (value <= 0) return 0;

    const minutes = Math.floor(value / 100);
    const seconds = value % 100;

    if (seconds > 0) return value - 1;
    if (minutes <= 0) return 0;

    return (minutes - 1) * 100 + 59;
}

const INITIAL_LOGIN_TIME = parseTimerValue(gnbRightData.time);

function GnbRight() {
    const navigate = useNavigate();
    const [loginTime, setLoginTime] = useState(INITIAL_LOGIN_TIME);

    useEffect(() => {
        const timerId = setInterval(() => {
            setLoginTime((current) => decreaseTimerValue(current));
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const resetLoginTime = () => {
        setLoginTime(INITIAL_LOGIN_TIME);
    };

    const handleLogout = () => {
        navigate("/main");
    };

    return (
        <RowCenter $gap={8}>
            {gnbRightData.center.map((center) => (
                <RightText key={center}>{center}</RightText>
            ))}
            <Divider aria-hidden />
            <RightText>업무담당자 : {gnbRightData.managerName}</RightText>
            <LoginTime>
                <Icon name="time" $size="xsmall" />
                <TimeText>{formatTimerValue(loginTime)}</TimeText>
                <KeepButton type="button" onClick={resetLoginTime}>
                    {gnbRightData.loginkeep}
                </KeepButton>
            </LoginTime>
            <IconButton type="button" $size="xlarge" aria-label="메뉴">
                <Icon name="menu_group" $size="xlarge" />
            </IconButton>
            <IconButton type="button" $size="xlarge" aria-label="로그아웃" onClick={handleLogout}>
                <Icon name="logout" $size="xlarge" />
            </IconButton>
        </RowCenter>
    );
}

export default GnbRight;
