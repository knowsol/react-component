import { Link } from "react-router-dom";
import styled from "styled-components";

const CardShell = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[8]};
    padding: ${({ theme }) => theme.spacing[32]};
    border: 1px solid ${({ theme }) => theme.color.neutral[300]};
    border-radius: ${({ theme }) => theme.border.radius.large};
    background-color: ${({ theme }) => theme.color.pure.white};
    transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;

    &[href] {
        cursor: pointer;
    }
    &[href]:hover {
        border-color: ${({ theme }) => theme.color.secondary[500]};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
`;

function Card({ to, children, ...rest }) {
    if (to) {
        return (
            <CardShell as={Link} to={to} {...rest}>
                {children}
            </CardShell>
        );
    }
    return <CardShell {...rest}>{children}</CardShell>;
}

export default Card;
