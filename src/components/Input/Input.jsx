import React from "react";
import styled from "styled-components";
import { fieldBox, fieldStateStyle } from "../Field/fieldStyles";

const InputStyle = styled.input`
    ${fieldBox}
    flex: 1;
    max-width: 100%;

    &::placeholder {
        color: ${({ theme }) => theme.color.neutral[600]};
    }

    ${fieldStateStyle}
`;

function Input({ state, ...rest }) {
    return <InputStyle $state={state} disabled={state === "disabled"} readOnly={state === "readonly"} {...rest} />;
}

export default Input;
