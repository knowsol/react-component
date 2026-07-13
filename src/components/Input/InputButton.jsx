import styled from "styled-components";
import Button from "@/components/Button/Button";
import Input from "./Input";

const resolveGap = (theme, value) => theme.spacing[value] ?? value;

const InputButtonStyle = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme, $gap }) => resolveGap(theme, $gap)};
    width: 100%;
    min-width: 0;
`;

const InputSlot = styled.div`
    flex: 1 1 auto;
    min-width: 0;
`;

const ActionButton = styled(Button)`
    flex: 0 0 auto;
`;

function InputButton({
    state,
    placeholder = "입력하세요",
    defaultValue,
    value,
    onChange,
    buttonText = "버튼",
    buttonProps = {},
    inputProps = {},
    gap = 8,
}) {
    const { children: buttonChildren, ...restButtonProps } = buttonProps;
    const inputValueProps = value !== undefined ? { value, onChange } : { defaultValue, onChange };

    return (
        <InputButtonStyle $gap={gap}>
            <InputSlot>
                <Input state={state} placeholder={placeholder} {...inputValueProps} {...inputProps} />
            </InputSlot>
            <ActionButton variant="secondary" kind="solid" minWidth="auto" height="36px" {...restButtonProps}>
                {buttonChildren ?? buttonText}
            </ActionButton>
        </InputButtonStyle>
    );
}

export default InputButton;
