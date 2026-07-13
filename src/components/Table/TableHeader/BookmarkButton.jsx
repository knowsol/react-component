import { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@/styles/Common";

const BookmarkIcon = styled.span`
    width: ${({ theme }) => theme.icon.primary};
    height: ${({ theme }) => theme.icon.primary};
    background-color: ${({ theme, $active }) => ($active ? "#FFD43B" : theme.color.neutral[400])};
    mask: url("/assets/icons/bookmark.svg") center / contain no-repeat;
    -webkit-mask: url("/assets/icons/bookmark.svg") center / contain no-repeat;
`;

function BookmarkButton({ defaultActive = false, active, onChange, label = "즐겨찾기" }) {
    const [internalActive, setInternalActive] = useState(defaultActive);
    const isControlled = active != null;
    const selected = isControlled ? active : internalActive;

    const handleClick = () => {
        const nextSelected = !selected;

        if (!isControlled) {
            setInternalActive(nextSelected);
        }

        onChange?.(nextSelected);
    };

    return (
        <IconButton type="button" $size="primary" aria-label={label} aria-pressed={selected} onClick={handleClick}>
            <BookmarkIcon $active={selected} />
        </IconButton>
    );
}

export default BookmarkButton;
