import { useRef, useState } from "react";
import styled from "styled-components";
import { fieldBox, fieldStateStyle, bareInput } from "../Field/fieldStyles";
import { Icon, IconButton } from "@/components/Icon/Icon";

// div는 :focus를 못 받으므로 포커스 파란선은 :focus-within으로 처리한다.
const Box = styled.div`
    ${fieldBox}
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: text;

    ${fieldStateStyle("&:focus-within")}
`;

const SearchInput = styled.input`
    ${bareInput}
`;

function Search({ state, placeholder, defaultValue = "", ...rest }) {
    const disabled = state === "disabled";
    const readonly = state === "readonly";
    const locked = disabled || readonly;

    const [value, setValue] = useState(defaultValue);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    // state="focus"는 데모용 강제 포커스 → 실제 포커스와 동일하게 취급.
    const isFocused = focused || state === "focus";
    // 값이 있고, 편집 가능하고, 포커스 상태일 때만 X 노출.
    const showClear = !!value && !locked && isFocused;

    const clear = () => {
        setValue("");
        inputRef.current?.focus();
    };

    return (
        <Box $state={state}>
            <SearchInput
                ref={inputRef}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readonly}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...rest}
            />
            {showClear && <IconButton name="clear" onMouseDown={(e) => e.preventDefault()} onClick={clear} aria-label="지우기" />}
            <Icon name="search" />
        </Box>
    );
}

export default Search;
