import styled from "styled-components";
import { fieldBox, fieldStateStyle } from "../Field/fieldStyles";

const InputStyle = styled.input`
    ${fieldBox}
    flex: 1;
    max-width: 100%;
    font-size: ${({ theme }) => theme.font.size.primary};
    color: ${({ theme }) => theme.color.neutral[900]};
    &::placeholder {
        color: ${({ theme }) => theme.color.neutral[600]};
    }

    ${fieldStateStyle()}
`;

function Input({ state, ...rest }) {
    return <InputStyle $state={state} disabled={state === "disabled"} readOnly={state === "readonly"} {...rest} />;
}

export default Input;
