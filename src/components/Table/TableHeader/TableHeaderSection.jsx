import styled from "styled-components";
import TableActions from "./TableActions";
import TableTitle from "./TableTitle";

const Row = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing[24]};
    padding: ${({ $padding }) => $padding};

    ${({ $line, theme }) =>
        $line &&
        `
            border-bottom: 1px solid ${theme.color.neutral[800]};
        `}
`;

function TableHeaderSection({ title, required, count, desc, actions, selects, right, children, line = true, padding = "38px 0 8px", className }) {
    const rightContent = right ?? children ?? <TableActions actions={actions} selects={selects} />;

    return (
        <Row className={className} $line={line} $padding={padding}>
            <TableTitle title={title} required={required} count={count} desc={desc} />
            {rightContent}
        </Row>
    );
}

export default TableHeaderSection;
