import styled from "styled-components";
import { stepData } from "./stepData";

const StepWrapper = styled.div`
    position: relative;
    display: inline-flex;
    flex-direction: column;
`;

const StepLine = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 7px;
    z-index: -1;
    border-left: 2px solid ${({ theme }) => theme.color.neutral[300]};
`;

// 디자인 스펙: 아이콘 한 줄이 74px 높이. 간격은 gap 대신 이 높이가 만든다.
const StepRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 74px;
`;

const StepIcon = styled.img`
    width: 16px;
    height: 16px;
    flex-shrink: 0;
`;

const StepTitle = styled.span`
    font-size: ${({ theme }) => theme.font.size.primary};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 160%;
    letter-spacing: -0.02em;
`;

// 라벨은 children으로 받는다
function StepItem({ img, children }) {
    return (
        <StepRow>
            <StepIcon src={img} alt="" aria-hidden />
            <StepTitle>{children}</StepTitle>
        </StepRow>
    );
}

const Step = () => {
    return (
        <StepWrapper>
            <StepLine />
            {stepData.map((item) => (
                <StepItem key={item.title} img={item.img}>
                    {item.title}
                </StepItem>
            ))}
        </StepWrapper>
    );
};

export default Step;
