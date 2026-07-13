import styled from "styled-components";
import { ICON } from "./IconData";

const Img = styled.img`
    width: ${({ theme, $size }) => theme.icon[$size] ?? $size ?? theme.icon.primary};
    height: ${({ theme, $size }) => theme.icon[$size] ?? $size ?? theme.icon.primary};
    flex-shrink: 0;
`;

export function Icon({ name, src, size = "primary", alt = "", ...rest }) {
    return <Img src={src ?? ICON[name]} $size={size} alt={alt} aria-hidden={alt ? undefined : true} {...rest} />;
}

const Button = styled.button`
    display: inline-flex;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
`;

export function IconButton({ name, size = "primary", ...rest }) {
    return (
        <Button type="button" {...rest}>
            <Icon name={name} size={size} />
        </Button>
    );
}
